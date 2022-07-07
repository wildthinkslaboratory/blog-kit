# :::: panel
# --aliceblue panelbox
Disclosable
# --aliceblue
# ::::


```javascript /autoplay



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
let F = new ProblemFunction(f, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let DF = new ProblemFunction(df, '', 4, [xlow,xhigh], []);
let DF_id = workspace.addFunction(DF);

let xintSR = new XInterval(workspace.board, a, b);

// let avert = workspace.board.create('segment',[[a,0], [a,df(a)]],{strokeColor:cs.darkAnnote, strokeWidth:1});
// let bvert = workspace.board.create('segment',[[b,0], [b,df(b)]],{strokeColor:cs.darkAnnote, strokeWidth:1});
// let aText = workspace.board.create('text',[a, -2, 'a'], {fontSize:12, color:cs.darkAnnote, fixed:true});
// let bText = workspace.board.create('text',[b, 1, 'b'], {fontSize:12, color:cs.darkAnnote, fixed:true});

// let integral = workspace.board.create('integral', [[a, b], workspace.functions[DF_id].graph],
//   {
//     visible:true, 
//     fillColor:cs.highlightFill, 
//     label: {visible:false}, 
//     curveLeft: {visible:false},
//     curveRight: {visible:false}
//   });


let xTexts = [];
let xDividers = [];
let deltaX = (b-a)/n;
for (let i=0; i < n+1; i++) {
  xTexts.push(workspace.board.create('text', [a + i * deltaX, 0, 
    function() { return '\\[x_' + i.toString() + '\\]';} ], 
    {
      fontSize:12,
      visible:true
    }));
  let xval = a + i * deltaX;
  // xDividers.push(workspace.board.create('segment',[[xval,0], [xval,df(xval)]],{strokeColor:cs.darkAnnote, strokeWidth:1}))
}

// let s = workspace.board.create('slider',[[2,-5],[4,-5],[1,6,50]],
//   {
//     snapWidth:1, 
//     precision:0,
//   });

// let riemannsumL = workspace.board.create('riemannsum',
//               [df, function(){return s.Value();}, 'left', a, b],
//               {fillColor:cs.highlightFill, 
//                 strokeColor:cs.highlightStroke,
//                 visible:false}
//               );

// let riemannsumR = workspace.board.create('riemannsum',
//               [df, function(){return s.Value();}, 'right', a, b],
//               {fillColor:cs.highlightFill, 
//                 strokeColor:cs.highlightStroke,
//                 visible:true}
//               );


let xint = new XInterval(workspace.board, 2,3);

let secantRect = new SecantRectangle(xint,  F.f, { 
	annotations: 'on',
	snapMargin:0.5,
	change:'distance',
	units:'time',
	rate:'rate',
	attachButtonVisible:false,
});


let slider = new IntSlider(xintSR.board, [xintSR.attachRightX, xintSR.attachY], [1, 50], 'N');
slider.setValue(n);

let secRectArray = new SecantRectArray(xintSR, F.f, slider, {
  annotations:'off',
  attachButtonVisible:false
});

secRectArray.secants.secants.setAttribute({
	strokecolor:cs.lightannote, 
    strokeWidth:1
});

secRectArray.rectangles.rectangles.setAttribute({
	fillOpacity: 0.0
});

workspace.board.on('update', function() {
  workspace.onUpdate();
});


let widthPercent = 0.8;
let heightPercent = 0.8;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};


this.sizeChanged();

this.dependOn = [];
this.depend = function() {

}



```

