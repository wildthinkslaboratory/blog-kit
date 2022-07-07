# :::: panel
# --partialborder panelbox
##### Area Under the Curve
We have a function $f(x)$ and we'd like to find the [area under the curve](:=showIntegral=true) between $a$ and $b$.  **The Fundamental Theorem of Calculus** gives us a way to accurately compute this area.
[Continue](/pages/ftc2)
# --partialborder
# ::::

# :::: notes
# --outlinebox notebox
##### Notes Before You Begin
- This explanation currently may not display well on a small screen or mobile devices.  I'm still working on the `css`.
- Some pages are taking a little while to display. Not sure why. They will eventually show up.
- There are lots of $mouseovers$ and [buttons](::something/button,transparent,draggable,closeable,outline,center,shadow,lightbox) in the text.  They all do something so don't miss any.
- the intervals on the final two pages are draggable.  That means you can change the size of the $[a,b]$ interval by dragging the dots on the $x$ axis (when they show up).
# --outlinebox
# ::::

# :::: something
# --colorbox somethingbox
Something happens when you push a button.
# --colorbox
# ::::

```javascript /autoplay

const panelBox = document.getElementById('panel');
panelBox.classList.add('text-3-col-small-font');


//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');
// import the calc library
//smartdown.import=/assets/libs/calc.js
//smartdown.import=/assets/libs/mapping.js

smartdown.showDisclosure('notes','','transparent,draggable,closeable,outline,center,shadow');
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

let dfHighlight = workspace.board.create('functiongraph', [df, xlow, xhigh], 
{
  visible:false,
  strokeColor:'#55DDFF', 
  strokeWidth:4,
});

let textHighlight = workspace.board.create('text', [1,50,'mouseovers show you something in the drawing'], 
{
  fontSize:24,
  visible:false,
  color:'#55DDFF', 
  fixed:true,
});


// let xintSR = new XInterval(workspace.board, a, b);

let avert = workspace.board.create('segment',[[a,0], [a,df(a)]],
	{strokeColor:cs.darkAnnote, strokeWidth:1, visible: false});
let bvert = workspace.board.create('segment',[[b,0], [b,df(b)]],
	{strokeColor:cs.darkAnnote, strokeWidth:1, visible: false});
let aText = workspace.board.create('text',[a, -2, 'a'], 
	{fontSize:12, color:cs.darkAnnote, fixed:true, visible: false});
let bText = workspace.board.create('text',[b, 2, 'b'], 
	{fontSize:12, color:cs.darkAnnote, fixed:true, visible: false});

let integral = workspace.board.create('integral', [[a, b], workspace.functions[DF_id].graph],
  {
    visible:false, 
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
smartdown.setVariable('showIntegral', false);

this.dependOn = ['showIntegral'];
this.depend = function() {
  if (env.showIntegral == true) {
    smartdown.setVariable('showIntegral', false);
    integral.setAttribute({visible:true});
    avert.setAttribute({visible:true});
    bvert.setAttribute({visible:true});
    aText.setAttribute({visible:true});
    bText.setAttribute({visible:true});
  }

}

const formula0 = document.getElementById('MathJax-Element-4-Frame');
formula0.onmouseover = onAFFactory(formula0, showAFFactory([textHighlight]));
formula0.onmouseout = offAFFactory(formula0, hideAFFactory([textHighlight]));
formula0.classList.add('highlightOffNarrow');


const formula1 = document.getElementById('MathJax-Element-1-Frame');
formula1.onmouseover = onAFFactory(formula1, showAFFactory([dfHighlight]));
formula1.onmouseout = offAFFactory(formula1, hideAFFactory([dfHighlight]));
formula1.classList.add('highlightOffNarrow');


```

