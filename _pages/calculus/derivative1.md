---
title: Derivative 1
smartdown: true
header: 'none'
---

# :::: intro
We've been answering lots of interesting questions by making our secants really small. But it's not a very precise method and it wouldn't be fun if you didn't have an app to compute the tiny secant slopes.  The **derivative** is way to formalize this idea. We'll begin with an example and then give a general definition of the derivative.
# ::::

### Introduction to the Derivative

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
Consider the function $f(x) = x^2$.  Here's an expression for the slope of the secant line. 
$$\frac{(x + h)^2 - x^2}{h}$$
As $h$ gets close to $0$ our estimate of the rate gets more precise, [*h* close to 0](:=close=true) but if $h$ goes all the way to $0$, our estimate is undefined. [*h* all the way to 0](:=gotozero=true) How do we let $h$ go all the way to $0$ without dividing by $0$?
[Reset](:=reset=true)  

We use the limit as $h$ goes to $0$.
$$\lim_{h \to 0} \frac{(x + h)^2 - x^2}{h}$$
With a limit, we only care about what happens near $h=0$.  If our expression is undefined at $h=0$, it doesn't matter.

[Continue](/pages/derivative1)

#### --outlinebox
#### --outlinebox

 

```javascript /autoplay

const outer = document.getElementById('outer1');
const left = document.getElementById('left1');
const right = document.getElementById('right1');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('outer');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');


//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');
// import the calc library
//smartdown.import=/assets/libs/calc.js
//smartdown.import=/assets/libs/mapping.js

smartdown.showDisclosure('intro','','closeable,draggable,center,lightbox');


left.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

let xlow = -3;
let xhigh = 3;
let ylow = -3;
let yhigh = 8;

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });
let F = new ProblemFunction(function(x) { return x * x; }, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);


let xint = new XInterval(workspace.board, 1,2);
let secant = new Secant(xint, F.f, {showUnits:true, 
  annotations:'on',  
  noChangeNumber:true,
  noUnitsNumber:true,
  change:'(x+h)^2 - x^2',
  units:'h',
  snapMargin:0.008
});
workspace.addElement(secant);

secant.xint.x1.setAttribute({name:'x'});
secant.xint.x2.setAttribute({name:'x + h'});

let triangle = workspace.board.create('polygon', [secant.f1, secant.f2, secant.p1], {
  fillColor:'#55DDFF', 
  fillOpacity: 50,
  strokeWidth:3, visible:false});


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


workspace.board.on('update', function() {
  workspace.onUpdate();
});


this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, window.innerHeight * 0.7);
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

outer.classList.add('outer');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');



// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-2-Frame');
formula1.onmouseover = onWideAFFactory(formula1, showAFFactory([triangle]));
formula1.onmouseout = offWideAFFactory(formula1, hideAFFactory([triangle]));
formula1.classList.add('highlightOffWide');


```