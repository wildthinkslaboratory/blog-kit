---
title: Fundamental Theorem of Calculus
smartdown: true
header: 'none'
lesson: 'ftc'
ogimage: /assets/images/calculus/ftc2.jpg
---


# :::: panel
# --partialborder panelbox
##### The Mean Value Theorem
We're going to use the mean value theorem to draw a rectangle.  We have a function $F$. Let's add a [secant](:=showSecant=true) over interval $[a,b]$. The mean value theorem tells us there is at least one point $c$ on $[a,b]$ where the tangent to the graph is parallel to the secant. [show c](:=showMean=true)

Here's the [derivative](:=showDerivative=true) of $F$, we'll call it $f$. We'll attach a [rectangle](:=showRect=true) to the derivative graph at the point $c$. The height of our rectangle is equal to $slope$ of our secant and the $area$ is the same as the secant's vertical rise.  If we didn't know the area of this rectangle, we could figure it out from the rise of the secant. More exercises exploring this relationship are [here](/pages/prelude).
[Continue](/pages/ftc4)
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



let cs = new SteelTheme();

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });

let df = function(x) { return Math.pow(x/2,4)/8 + Math.pow(x/2,3)/12 - 3 * Math.pow(x/2,2) + 12;};
let f =  function(x) { return Math.pow(x,5)/(40*16) + Math.pow(x,4)/(48*8) - Math.pow(x,3)/4 + 12* (x) + 15;  };
let F = new ProblemFunction(f, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let DF = new ProblemFunction(df, '', 4, [xlow,xhigh], []);
let DF_id = workspace.addFunction(DF);

workspace.functions[DF_id].graph.setAttribute({visible:false});

let fHighlight = workspace.board.create('functiongraph', [f, xlow, xhigh], 
{
  visible:false,
  strokeColor:'#55DDFF', 
  strokeWidth:4,
});


// let xintSR = new XInterval(workspace.board, a, b);
let sa = 2;
let sb = 4;


let avert = workspace.board.create('segment',[[sa,0], [sa,f(sa)]],
	{strokeColor:cs.lightAnnote, strokeWidth:1, visible: false});
let bvert = workspace.board.create('segment',[[sb,0], [sb,f(sb)]],
	{strokeColor:cs.lightAnnote, strokeWidth:1, visible: false});
let aText = workspace.board.create('text',[sa, -2, 'a'], 
	{fontSize:12, color:cs.darkAnnote, fixed:true, visible: false});
let bText = workspace.board.create('text',[sb, -2, 'b'], 
	{fontSize:12, color:cs.darkAnnote, fixed:true, visible: false});

let c = 3.02;
let slopeAtC = (f(sb) - f(sa))/ (sb-sa);
let point2 = workspace.board.create('point', [c+1, slopeAtC + f(c)], {name:'', fixed:true, visible:false});
let cpoint = workspace.board.create('point', [c,f(c)], {name:'', color:cs.lightAnnote, fixed:true, visible:false});
let cline = workspace.board.create('line', [cpoint, point2], 
	{ strokeColor:cs.lightAnnote, strokeWidth:1, visible: false });

let cvert = workspace.board.create('segment',[[c,0], [c,f(c)]],
	{strokeColor:cs.lightAnnote, strokeWidth:1, visible: false});
let cText = workspace.board.create('text',[c, -2, 'c'], 
	{fontSize:12, color:cs.darkAnnote, fixed:true, visible: false});


let xint = new XInterval(workspace.board, sa, sb);

let secantRect = new SecantRectangle(xint,  F.f, { 
	annotations: 'on',
	snapMargin:0.5,
  change:'F(b) - F(a)',
  units:'b - a',
  rate:'\\[\\frac{F(b) - F(a)}{b-a}\\]',
  noChangeNumber: true,
  noUnitsNumber: true,
  noRateNumber: true,
	attachButtonVisible:false,
});


secantRect.hide();

let rect1 = workspace.board.create('polygon', [[sa,0], [sa,df(c)], [sb,df(c)], [sb,0]], 
    {
      borders: { strokeColor: '#55DDFF', highlightStrokeColor: '#55DDFF'},
      fillColor:'#55DDFF', 
      highlightFillColor:'#55DDFF', 
      fillOpacity:1,
      highlightFillOpacity:1,
      hasInnerPoints:true,
      visible:false,
      vertices: {visible:false}
    });

let secantRise = workspace.board.create('segment',[[sb,f(sa)], [sb,f(sb)]],
  {
    strokeColor:'#55DDFF', 
    strokeWidth:4,
    firstArrow:true, 
    lastArrow:true, 
    visible:false
  });

let slope = workspace.board.create('segment',[[sa,f(sa)], [sb,f(sb)]],
  {
    strokeColor:'#55DDFF', 
    strokeWidth:4,
    visible:false
  });

let height = workspace.board.create('segment',[[sb + xint.Xerror,0], [sb + xint.Xerror,df(c)]],
  {
    strokeColor:'#55DDFF', 
    strokeWidth:4,
    firstArrow:true, 
    lastArrow:true, 
    visible:false
  });

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

smartdown.setVariable('showSecant', false);
smartdown.setVariable('showMean', false);
smartdown.setVariable('showDerivative', false);
smartdown.setVariable('showRect', false);
smartdown.setVariable('showNumbers', false);
smartdown.setVariable('showNotation', false);

this.dependOn = ['showSecant', 'showMean', 'showDerivative', 'showRect', 'showNumbers', 'showNotation'];
this.depend = function() {
  if (env.showSecant == true) {
    smartdown.setVariable('showSecant', false);
    secantRect.secant.show();
    avert.setAttribute({visible:true});
    bvert.setAttribute({visible:true});
    aText.setAttribute({visible:true});
    bText.setAttribute({visible:true});
  }

  if (env.showMean == true) {
    smartdown.setVariable('showMean', false);
    cvert.setAttribute({visible:true});
    cText.setAttribute({visible:true});
    cline.setAttribute({visible:true});
    cpoint.setAttribute({visible:true});
  }

  if (env.showDerivative == true) {
    smartdown.setVariable('showDerivative', false);
    workspace.functions[DF_id].graph.setAttribute({visible:true});
  }

  if (env.showRect == true) {
    smartdown.setVariable('showRect', false);
    secantRect.rectangle.show();
  }

  if (env.showNumbers == true) {
    smartdown.setVariable('showNumbers', false);
    secantRect.attr = { 
      annotations: 'on',
      snapMargin:0.5,
      attachButtonVisible:false,
    };
  }
  if (env.showNotation == true) {
    smartdown.setVariable('showNotation', false);
    
  }

}

const formula1 = document.getElementById('MathJax-Element-1-Frame');
formula1.onmouseover = onAFFactory(formula1, showAFFactory([fHighlight]));
formula1.onmouseout = offAFFactory(formula1, hideAFFactory([fHighlight]));
formula1.classList.add('highlightOffNarrow');

const formula2 = document.getElementById('MathJax-Element-8-Frame');
formula2.onmouseover = onAFFactory(formula2, showAFFactory([height, slope]));
formula2.onmouseout = offAFFactory(formula2, hideAFFactory([height, slope]));
formula2.classList.add('highlightOffNarrow');

const formula3 = document.getElementById('MathJax-Element-9-Frame');
formula3.onmouseover = onAFFactory(formula3, showAFFactory([rect1, secantRise]));
formula3.onmouseout = offAFFactory(formula3, hideAFFactory([rect1, secantRise]));
formula3.classList.add('highlightOffNarrow');


```

