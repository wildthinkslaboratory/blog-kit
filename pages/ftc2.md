# :::: panel
# --partialborder panelbox
##### Area Under the Curve
We begin by estimating the area with a bunch of [rectangles](:=showReimann=true).  Summing up these areas gives an estimate of the area under the curve.  We can make our estimate better by using more rectangles.
Rectangles: [](:-segments/1/50/1) [](:!segments) 
Notice that the rectangles attach to the curve on the [left](:=left=true).  We could also attach the rectangles on the [right](:=right=true).  Does this choice affect our estimate if we use a lot of rectangles?

All we need to do is add up the areas of an infinite number of tiny rectangles.  Let's explore a new way of attaching the rectangles that allows us to do just that.
[Continue](/pages/ftc3)
# --partialborder
# ::::


```javascript /autoplay

const panelBox = document.getElementById('panel');
panelBox.classList.add('text-3-col-small-font');


//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');
// import the calc library
//smartdown.import=/assets/libs/calc.js
//smartdown.import=/assets/libs/mapping.js

smartdown.showDisclosure('panel','','topright,draggable,shadow');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';

myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

JXG.Options.text.useMathJax = true;

let xlow = -1;
let xhigh = 8;
let ylow = -8;
let yhigh = 60;

let a = 1;
let b = 6;
let n = 5;

let cs = new SteelTheme();

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });

let df = function(x) { return Math.pow(x/2,4)/8 + Math.pow(x/2,3)/12 - 3 * Math.pow(x/2,2) + 12;};
let f =  function(x) { return Math.pow(x,5)/(40*16) + Math.pow(x,4)/(48*8) - Math.pow(x,3)/4 + 12* (x) + 15;  };
// let F = new ProblemFunction(f, '', 4, [xlow,xhigh], []);
// let F_id = workspace.addFunction(F);

let DF = new ProblemFunction(df, '', 4, [xlow,xhigh], []);
let DF_id = workspace.addFunction(DF);

let avert = workspace.board.create('segment',[[a,0], [a,df(a)]],
  {strokeColor:cs.darkAnnote, strokeWidth:1, visible: true});
let bvert = workspace.board.create('segment',[[b,0], [b,df(b)]],
  {strokeColor:cs.darkAnnote, strokeWidth:1, visible: true});
let aText = workspace.board.create('text',[a, -2, 'a'], 
  {fontSize:12, color:cs.darkAnnote, fixed:true, visible: true});
let bText = workspace.board.create('text',[b, 2, 'b'], 
  {fontSize:12, color:cs.darkAnnote, fixed:true, visible: true});

let integral = workspace.board.create('integral', [[a, b], workspace.functions[DF_id].graph],
  {
    visible:true, 
    fillColor:cs.highlightFill, 
    label: {visible:false}, 
    curveLeft: {visible:false},
    curveRight: {visible:false}
  });


// let xTexts = [];
// let xDividers = [];
// let deltaX = (b-a)/n;
// for (let i=0; i < n+1; i++) {
//   xTexts.push(workspace.board.create('text', [a + i * deltaX, 0, 
//     function() { return '\\[x_' + i.toString() + '\\]';} ], 
//     {
//       fontSize:12,
//       visible:true
//     }));
//   let xval = a + i * deltaX;
//   // xDividers.push(workspace.board.create('segment',[[xval,0], [xval,df(xval)]],{strokeColor:cs.darkAnnote, strokeWidth:1}))
// }

// let s = workspace.board.create('slider',[[2,-5],[4,-5],[1,6,50]],
//   {
//     visible: false,
//     snapWidth:1, 
//     precision:0,
//   });

let riemannsumL = workspace.board.create('riemannsum',
              [df, function(){return n;}, 'left', a, b],
              {fillColor:cs.highlightFill, 
                strokeColor:cs.highlightStroke,
                visible:false}
              );

let riemannsumR = workspace.board.create('riemannsum',
              [df, function(){return n;}, 'right', a, b],
              {fillColor:cs.highlightFill, 
                strokeColor:cs.highlightStroke,
                visible:false}
              );


// let xint = new XInterval(workspace.board, 2,3);

// let secantRect = new SecantRectangle(xint,  F.f, { 
// 	annotations: 'on',
// 	snapMargin:0.5,
// 	change:'distance',
// 	units:'time',
// 	rate:'rate',
// 	attachButtonVisible:false,
// });


// let slider = new IntSlider(xintSR.board, [xintSR.attachRightX, xintSR.attachY], [1, 50], 'N');
// slider.setValue(n);

// let secRectArray = new SecantRectArray(xintSR, F.f, slider, {
//   annotations:'off',
//   attachButtonVisible:false
// });

// secRectArray.secants.secants.setAttribute({
// 	strokecolor:cs.lightannote, 
//     strokeWidth:1
// });

// secRectArray.rectangles.rectangles.setAttribute({
// 	fillOpacity: 0.0
// });

workspace.board.on('update', function() {
  workspace.onUpdate();
});


let widthPercent = 0.8;
let heightPercent = 0.8;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};


this.sizeChanged();

smartdown.setVariable('showReimann', false);
smartdown.setVariable('segments', n);
smartdown.setVariable('right', false);
smartdown.setVariable('left', false);

this.dependOn = ['showReimann', 'segments', 'right', 'left'];
this.depend = function() {

  if (env.segments !== n) {
    n = env.segments;
    workspace.board.update();
  }
  if (env.showReimann == true) {
    smartdown.setVariable('showReimann', false);
    riemannsumL.setAttribute({visible:true});
    integral.setAttribute({visible:false});
    avert.setAttribute({visible:false});
    bvert.setAttribute({visible:false});
    aText.setAttribute({visible:false});
    bText.setAttribute({visible:false});
  }
  if (env.right == true) {
    smartdown.setVariable('right', false);
    riemannsumL.setAttribute({visible:false});
    riemannsumR.setAttribute({visible:true});
  }
  if (env.left == true) {
    smartdown.setVariable('left', false);
    riemannsumL.setAttribute({visible:true});
    riemannsumR.setAttribute({visible:false});
  }
}



```

