### Everything has a Name and Symbols

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
All of the shapes and lines we've been using to solve problems have names and symbols.  Some of them will be familiar to you and some of them will be new.  

points $(x, f(x))$  and  $(x+h, f(x+h))$
function $f(x) = x^2 + 1$
distances $h$ and $f(x+h) - f(x)$ 
slope    $$\frac{f(x+h) - f(x)}{h}$$ 

Take a close look at these expressions. Mouse over them. Look at each forumula and try to envision in your mind where it belongs in the picture? Mapping the formulas onto the picture might be the hardest part of learning calculus so take your time and practice. 
[Continue](/pages/derivative0)

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

left.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

let xlow = -3;
let xhigh = 3;
let ylow = -3;
let yhigh = 9;

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });
let F = new ProblemFunction(function(x) { return 1 + x * x; }, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);


let xint = new XInterval(workspace.board, 1,2);
let secant = new Secant(xint, F.f, {
  showUnits:true, 
  annotations:'on', 
  noRateNumber:true, 
  noChangeNumber:true,
  noUnitsNumber:true,
  justLines:true
});
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


workspace.board.on('update', function() {
  workspace.onUpdate();
});


this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, window.innerHeight * 0.7);
};

this.sizeChanged();

outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');



// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-1-Frame');
formula1.onmouseover = onAFFactory(formula1, showAFFactory([f1]));
formula1.onmouseout = offAFFactory(formula1, hideAFFactory([f1]));
formula1.classList.add('highlightOffNarrow');


const formula2 = document.getElementById('MathJax-Element-2-Frame');
formula2.onmouseover = onAFFactory(formula2, showAFFactory([f2]));
formula2.onmouseout = offAFFactory(formula2, hideAFFactory([f2]));
formula2.classList.add('highlightOffNarrow');


const formula3 = document.getElementById('MathJax-Element-3-Frame');
formula3.onmouseover = onAFFactory(formula3, showAFFactory([fofX]));
formula3.onmouseout = offAFFactory(formula3, hideAFFactory([fofX]));
formula3.classList.add('highlightOffNarrow');


const formula4 = document.getElementById('MathJax-Element-4-Frame');
formula4.onmouseover = onAFFactory(formula4, showAFFactory([runLine]));
formula4.onmouseout = offAFFactory(formula4, hideAFFactory([runLine]));
formula4.classList.add('highlightOffNarrow');


const formula5 = document.getElementById('MathJax-Element-5-Frame');
formula5.onmouseover = onAFFactory(formula5, showAFFactory([riseLine]));
formula5.onmouseout = offAFFactory(formula5, hideAFFactory([riseLine]));
formula5.classList.add('highlightOffNarrow');


const formula6 = document.getElementById('MathJax-Element-6-Frame');
formula6.onmouseover = onWideAFFactory(formula6, showAFFactory([slopeLine,slopeText]));
formula6.onmouseout = offWideAFFactory(formula6, hideAFFactory([slopeLine,slopeText]));
formula6.classList.add('highlightOffWide');


```