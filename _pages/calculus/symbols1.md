---
title: Everything has a Name and Symbols
smartdown: true
header: 'none'
---

### Everything has a Name and Symbols

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

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });
let F = new ProblemFunction(function(x) { return 1 + x * x / 2; }, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);


let xint = new XInterval(workspace.board, 1,3);
let secant = new Secant(xint, F.f, {showUnits:true, annotations:'on', justLines:true});
workspace.addElement(secant);

secant.xint.x1.setAttribute({name:'x'});
secant.xint.x2.setAttribute({name:'x + h'});

let f1 = workspace.board.create('point', [
  xint.X1,
  function() { return F.f(xint.X1()); }], 
  { fillColor: '#55DDFF', strokeColor:'#88CCEE', size:6 , name:'', visible:false});

let f2 = workspace.board.create('point', [
  xint.X2,
  function() { return F.f(xint.X2()); }
  ], { fillColor: '#55DDFF', strokeColor:'#88CCEE', size:6 , name:'', visible:false});

let fofX = workspace.board.create('functiongraph',[F.f,xlow,xhigh], { 
  strokeColor:'#55DDFF',
  strokeWidth:3,
  visible:false
})

let riseLine = workspace.board.create('segment', [secant.p1, secant.f2], 
    {
      strokeColor: '#55DDFF', 
      strokeWidth:5, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

let runLine = workspace.board.create('segment', [secant.p1, secant.f1], 
    {
      strokeColor: '#55DDFF', 
      strokeWidth:5, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

let slopeLine = workspace.board.create('segment', [secant.f1, secant.f2], 
    {
      strokeColor: '#55DDFF', 
      strokeWidth:6, 
      visible:false
    });

// some fabulous hackery to figure out the placement of the text
let fakeText = workspace.board.create('text', [0,ylow - 2,'slope of line'],{visible:true});
let tWidth = textWidth(fakeText, workspace.board);
let Xerror = (xhigh - xlow)/50;

let slopeText = workspace.board.create('text', [
  function() { return f1.X() + (f2.X() - f1.X())/2 - tWidth - Xerror; },
  function() { return f1.Y() + (f2.Y() - f1.Y())/2; },
  'slope of line'],
  {visible:false});


let showF1 = function() {
  f1.setAttribute({visible:true});
};
let hideF1 = function() {
  f1.setAttribute({visible:false});
};
window.showF1 = showF1;
window.hideF1 = hideF1;


let showF2 = function() {
  f2.setAttribute({visible:true});
};
let hideF2 = function() {
  f2.setAttribute({visible:false});
};
window.showF2 = showF2;
window.hideF2 = hideF2;


let showFun = function() {
  fofX.setAttribute({visible:true});
};
let hideFun = function() {
  fofX.setAttribute({visible:false});
};
window.showFun = showFun;
window.hideFun = hideFun;


let showRun = function() {
  runLine.setAttribute({visible:true});
};
let hideRun = function() {
  runLine.setAttribute({visible:false});
};
window.showRun = showRun;
window.hideRun = hideRun;


let showRise = function() {
  riseLine.setAttribute({visible:true});
};
let hideRise = function() {
  riseLine.setAttribute({visible:false});
};
window.showRise = showRise;
window.hideRise = hideRise;

let showSlope = function() {
  slopeLine.setAttribute({visible:true});
  slopeText.setAttribute({visible:true});
};
let hideSlope = function() {
  slopeLine.setAttribute({visible:false});
  slopeText.setAttribute({visible:false});
};
window.showSlope = showSlope;
window.hideSlope = hideSlope;


workspace.board.on('update', function() {
  workspace.onUpdate();
});


this.sizeChanged = function() {
  workspace.board.resizeContainer(myDiv.offsetWidth, myDiv.offsetHeight);
};

this.sizeChanged();


```
#### --outlinebox


#### --outlinebox right1
All of the shapes and lines we've been using to solve problems have names and symbols.  Some of them will be familiar to you and some of them will be new.  

points $(x, f(x))$  and  $(x+h, f(x+h))$
function $f(x) = x^2 + 1$
distances $h$ and $f(x+h) - f(x)$ 
slope    $$\frac{f(x+h) - f(x)}{h}$$ 

Here's the thing...  Look closely at these expressions. Mouse over them. Can you look at each forumula and envision in your mind where it belongs in the picture? Take your time. Mapping the formulas onto the picture might be the hardest part of learning calculus.  Especially if the only picture you have is in your head.  
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


// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-1-Frame');
formula1.onmouseover = logMouseOver;
formula1.onmouseout = logMouseOut;
formula1.classList.add('highlightOffNarrow');

function logMouseOver() {
  formula1.classList.remove('highlightOffNarrow');
  formula1.classList.add('highlightOnNarrow');
  window.showF1();
}

function logMouseOut() {
  formula1.classList.remove('highlightOnNarrow');
  formula1.classList.add('highlightOffNarrow');
  window.hideF1();
}

const formula2 = document.getElementById('MathJax-Element-2-Frame');
formula2.onmouseover = logMouseOver2;
formula2.onmouseout = logMouseOut2;
formula2.classList.add('highlightOffNarrow');

function logMouseOver2() {
  formula2.classList.remove('highlightOffNarrow');
  formula2.classList.add('highlightOnNarrow');
  window.showF2();
}

function logMouseOut2() {
  formula2.classList.remove('highlightOnNarrow');
  formula2.classList.add('highlightOffNarrow');
  window.hideF2();
}

const formula3 = document.getElementById('MathJax-Element-3-Frame');
formula3.onmouseover = logMouseOver3;
formula3.onmouseout = logMouseOut3;
formula3.classList.add('highlightOffNarrow');


function logMouseOver3() {
  formula3.classList.remove('highlightOffNarrow');
  formula3.classList.add('highlightOnNarrow');
  window.showFun();
}

function logMouseOut3() {
  formula3.classList.remove('highlightOnNarrow');
  formula3.classList.add('highlightOffNarrow');
  window.hideFun();
}

const formula4 = document.getElementById('MathJax-Element-4-Frame');
formula4.onmouseover = logMouseOver4;
formula4.onmouseout = logMouseOut4;
formula4.classList.add('highlightOffNarrow');

function logMouseOver4() {
  formula4.classList.remove('highlightOffNarrow');
  formula4.classList.add('highlightOnNarrow');
  window.showRun();
}

function logMouseOut4() {
  formula4.classList.remove('highlightOnNarrow');
  formula4.classList.add('highlightOffNarrow');
  window.hideRun();
}


const formula5 = document.getElementById('MathJax-Element-5-Frame');
formula5.onmouseover = logMouseOver5;
formula5.onmouseout = logMouseOut5;
formula5.classList.add('highlightOffNarrow');

function logMouseOver5() {
  formula5.classList.remove('highlightOffNarrow');
  formula5.classList.add('highlightOnNarrow');
  window.showRise();
}

function logMouseOut5() {
  formula5.classList.remove('highlightOnWide');
  formula5.classList.add('highlightOffNarrow');
  window.hideRise();
}

const formula6 = document.getElementById('MathJax-Element-6-Frame');
formula6.onmouseover = logMouseOver6;
formula6.onmouseout = logMouseOut6;
formula6.classList.add('highlightOffWide');

function logMouseOver6() {
  formula6.classList.remove('highlightOffWide');
  formula6.classList.add('highlightOnWide');
  window.showSlope();
}

function logMouseOut6() {
  formula6.classList.remove('highlightOnWide');
  formula6.classList.add('highlightOffWide');
  window.hideSlope();
}

```