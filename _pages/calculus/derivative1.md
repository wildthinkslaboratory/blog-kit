---
title: Derivative
smartdown: true
header: 'none'
lesson: 'derivative'
ogimage: /assets/images/calculus/derivative.jpg
---

# :::: intro
We've been answering lots of interesting questions by making our secants really small. But it's not a very precise method and it wouldn't be fun if you didn't have an app to compute the tiny secant slopes.  The **derivative** is way to formalize this idea. We'll begin with an example and then give a general definition of the derivative.
# ::::

### Introduction to the Derivative

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
The position of the car is described by the function $f(t) = t^2$.  We can estimate the velocity of the car at some time $t$ with the slope of a secant line.  Here's an expression for the slope of the secant line. 
$$\frac{(t + h)^2 - t^2}{h}$$
As $h$ gets close to $0$ our estimate gets more precise, [*h* close to 0](:=close=true) but if $h$ goes all the way to $0$, our estimate is undefined. [*h* all the way to 0](:=gotozero=true) How do we let $h$ go all the way to $0$ without dividing by $0$? [Reset](:=reset=true)  

We can use the limit as $h$ goes to $0$.
$$\lim_{h \to 0} \frac{(t + h)^2 - t^2}{h}$$
We let $h$ get arbitrarily close to $0$ without ever reaching it. With a limit, we only care about what happens near $h=0$.  If our expression is undefined at $h=0$, it doesn't matter.

[Continue](/pages/derivative2)

#### --outlinebox
#### --outlinebox

 

```javascript /autoplay

const outer = document.getElementById('outer1');
const left = document.getElementById('left1');
const right = document.getElementById('right1');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');


//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');
// import the calc library
//smartdown.import=/assets/libs/calc.js
//smartdown.import=/assets/libs/mapping.js

smartdown.showDisclosure('intro','','closeable,draggable,center,lightbox');

left.innerHTML = `<div id='top' style='height:100px; width:100%; border:1px solid gray;background:#EEFFCC;border-radius:8px;'></div><div id='bottom' style='height:600px; width:100%; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div>`;

let xlow = -0.5;
let xhigh = 3;
let ylow = -3;
let yhigh = 8;

let workspace = new Workspace('bottom', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });
let F = new ProblemFunction(function(x) { return x * x; }, '', 4, [0,xhigh], []);
let F_id = workspace.addFunction(F);


let xint = new XInterval(workspace.board, 1,2);
let secant = new Secant(xint, F.f, {showUnits:true, 
  annotations:'on',  
  noChangeNumber:true,
  noUnitsNumber:true,
  change:'(t+h)^2 - t^2',
  units:'h',
  snapMargin:0.008
});
workspace.addElement(secant);

secant.xint.x1.setAttribute({name:'t'});
secant.xint.x2.setAttribute({name:'t + h'});

let triangle = workspace.board.create('polygon', [secant.f1, secant.f2, secant.p1], {
  fillColor:'#55DDFF', 
  fillOpacity: 50,
  strokeWidth:3, visible:false});

let t = workspace.board.create('glider', [0,0, workspace.xaxis], {name:'', face:'^', size:12, color:'green'});

let p = workspace.board.create('point', [
  function() { return t.X(); }, 
  function() { return F.f(t.X()); }], {color:'green', name:''});


let goClose = function() {
  if (secant.xint.X2() < secant.xint.X1()) {
    secant.xint.x2.moveTo([secant.xint.X1()-0.01, 0],2000);
  }
  else {
    secant.xint.x2.moveTo([secant.xint.X1()+0.01, 0],2000);
  }
}

let goToZero = function() {
  secant.xint.x2.moveTo([secant.xint.X1(), 0],500);
}

let resetSecant = function() {
  secant.xint.x1.moveTo([1,0]);
  secant.xint.x2.moveTo([2,0]);
};

/////////////////////////////////////////////////////////////////////////////////////////
// second board


let board1 = JXG.JSXGraph.initBoard('top', {boundingbox:[-6,5,36,-2], keepaspectratio:false, axis:false, showCopyright:false, showNavigation:false});

workspace.board.addChild(board1);

let xaxis1 = board1.create('axis', [[0, 0], [1,0]], 
  {name:'meters', 
    withLabel: true,
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, 20]   // (in pixels)
    }
  });

let yaxis1 = board1.create('axis', [[0, 0], [0, 1]], 
  {name:'', 
    withLabel: false, 
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-120, -20]   // (in pixels)
    },
    ticks: {visible:false}
  }); 


let carurl = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/9e01e8197b3bf685747ae134de3d75feb64ea6f4/car.png';
let car = board1.create('image',[carurl, [function() { return F.f(t.X()) -4 ; },-0.2], [4,2]]);


////////////////////////////////////////////////////////////////////////////////////

workspace.board.on('update', function() {
  workspace.onUpdate();
});


let heightPercent = 0.7;
let heightRatio = 1/6;

this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, (1-heightRatio) * window.innerHeight * heightPercent);
  board1.resizeContainer(left.offsetWidth, heightRatio * window.innerHeight * heightPercent);
};


this.sizeChanged();

smartdown.setVariable('close', false);
smartdown.setVariable('gotozero', false);
smartdown.setVariable('reset', false);

this.dependOn = ['close', 'gotozero', 'reset'];
this.depend = function() {
  if (env.close == true) {
    smartdown.setVariable('close',false);
    goClose();
  }
  if (env.gotozero == true) {
    smartdown.setVariable('gotozero', false);
    goToZero();
  }
  if (env.reset == true) {
    smartdown.setVariable('reset', false);
    resetSecant();
  }
};

//////////////////////////////////////////////////////////////// NOTATION MAPPING

outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');



// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-3-Frame');
formula1.onmouseover = onWideAFFactory(formula1, showAFFactory([triangle]));
formula1.onmouseout = offWideAFFactory(formula1, hideAFFactory([triangle]));
formula1.classList.add('highlightOffWide');


```