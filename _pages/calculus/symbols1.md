---
title: Everything has a Name and Symbols
smartdown: true
headerapp: 'randomfractal.js'
header: 'narrow'
---


#### --outlinebox outer1

#### --outlinebox left1

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');
// import the calc library
//smartdown.import=/assets/libs/calc.js


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

let xlow = -5;
let xhigh = 5;
let ylow = -3;
let yhigh = 10;

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow], { xlabel:'x', ylabel:'y'});
let F = new ProblemFunction(function(x) { return 1 + x * x / 2; }, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);


let xint = new XInterval(workspace.board, 1,3);
let secant = new Secant(xint, F.f, {showUnits:true, annotations:'on'});
workspace.addElement(secant);

workspace.board.on('update', function() {
  workspace.onUpdate();
});


// let widthPercent = 0.8;
// let heightPercent = 0.7;


// this.sizeChanged = function() {
//   board.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);
// };

// this.sizeChanged();

// this.sizeChanged = function() {      
//   board0.resizeContainer(myDiv.offsetWidth, myDiv.offsetHeight);
// };

```
#### --outlinebox


#### --outlinebox right1
All of the shapes and lines we've been using to solve problems have names and symbols.  Some of them will be familiar to you and some of them will be new.  

points $(x, f(x))$  and  $(x+h, f(x+h))$
function $f(x) = x^2$
distances $h$ and $f(x+h) - f(x)$ 
slope    $$\frac{f(x+h) - f(x)}{h}$$ 



#### --outlinebox
#### --outlinebox

# --outlinebox warning
**WARNING**
Do not underestimate how much brain power is needed to keep track of the mapping between the things in the picture and the symbols we write on the page.  
# --outlinebox


```javascript /autoplay

const outer = document.getElementById('outer1');
const left = document.getElementById('left1');
const right = document.getElementById('right1');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('div-2-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');


// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-1-Frame');
formula1.onmouseover = logMouseOver;
formula1.onmouseout = logMouseOut;
formula1.classList.add('highlightOffNarrow');

function logMouseOver() {
  formula1.classList.remove('highlightOffNarrow');
  formula1.classList.add('highlightOnNarrow');
}

function logMouseOut() {
  formula1.classList.remove('highlightOnNarrow');
  formula1.classList.add('highlightOffNarrow');
}

const formula2 = document.getElementById('MathJax-Element-2-Frame');
formula2.onmouseover = logMouseOver2;
formula2.onmouseout = logMouseOut2;
formula2.classList.add('highlightOffNarrow');

function logMouseOver2() {
  formula2.classList.remove('highlightOffNarrow');
  formula2.classList.add('highlightOnNarrow');
}

function logMouseOut2() {
  formula2.classList.remove('highlightOnNarrow');
  formula2.classList.add('highlightOffNarrow');
}

const formula3 = document.getElementById('MathJax-Element-3-Frame');
formula3.onmouseover = logMouseOver3;
formula3.onmouseout = logMouseOut3;
formula3.classList.add('highlightOffNarrow');

function logMouseOver3() {
  formula3.classList.remove('highlightOffNarrow');
  formula3.classList.add('highlightOnNarrow');
}

function logMouseOut3() {
  formula3.classList.remove('highlightOnNarrow');
  formula3.classList.add('highlightOffNarrow');
}

const formula4 = document.getElementById('MathJax-Element-4-Frame');
formula4.onmouseover = logMouseOver4;
formula4.onmouseout = logMouseOut4;
formula4.classList.add('highlightOffNarrow');

function logMouseOver4() {
  formula4.classList.remove('highlightOffNarrow');
  formula4.classList.add('highlightOnNarrow');
}

function logMouseOut4() {
  formula4.classList.remove('highlightOnNarrow');
  formula4.classList.add('highlightOffNarrow');
}


const formula5 = document.getElementById('MathJax-Element-5-Frame');
formula5.onmouseover = logMouseOver5;
formula5.onmouseout = logMouseOut5;
formula5.classList.add('highlightOffWide');

function logMouseOver5() {
  formula5.classList.remove('highlightOffWide');
  formula5.classList.add('highlightOnWide');
}

function logMouseOut5() {
  formula5.classList.remove('highlightOnWide');
  formula5.classList.add('highlightOffWide');
}

const formula6 = document.getElementById('MathJax-Element-6-Frame');
formula6.onmouseover = logMouseOver6;
formula6.onmouseout = logMouseOut6;
formula6.classList.add('highlightOffWide');

function logMouseOver6() {
  formula5.classList.remove('highlightOffWide');
  formula5.classList.add('highlightOnWide');
}

function logMouseOut6() {
  formula5.classList.remove('highlightOnWide');
  formula5.classList.add('highlightOffWide');
}

```