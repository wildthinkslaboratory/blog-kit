---
title: Derivative
smartdown: true
header: 'none'
lesson: 'derivative'
ogimage: /assets/images/calculus/derivative.jpg
---

### The Definition of the Derivative

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
To find the **derivative** of the function $f(x)$, we take the slope of the secant $$\frac{f(x+h) - f(x)}{h}$$ and then take its limit as $h$ goes to $0$.
$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$   That means letting the secant get as small as we want without disappearing. [secant to tangent](:=toTangent=true) [Reset](:=reset=true)
The secant turns into a **tangent** line and the derivative function
$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$  
tells us the slope of the tangent line.
[Continue](/pages/derivative5)
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

left.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

let xlow = -0.5;
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
  change:'f(x+h) - f(x)',
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

// get the color scheme for our extra workspace objects
let colors = new SteelTheme();

// tangent stuff 
let d = function(x) { return 2*x; }
let df = workspace.board.create('functiongraph', [d, xlow, xhigh], {
  strokeColor:colors.verylightAnnote,
  highlightStrokeColor:colors.verylightAnnote,
  visible:false
});


let dfhighlight = workspace.board.create('functiongraph', [d, xlow, xhigh], 
    {
      strokeColor: '#55DDFF', 
      strokeWidth:6, 
      visible:false
    });


let t2 = workspace.board.create('glider', [1,0, workspace.xaxis], 
  {name:'', face:'^', size:12, color:colors.fill, visible:false});
let p2 = workspace.board.create('point', [
  function() { return t2.X(); }, 
  function() { return d(t2.X()); }], {color:colors.fill, name:'', visible:false});
let p3 = workspace.board.create('point', [
  function() { return t2.X(); }, 
  function() { return F.f(t2.X()); }], {color:colors.fill, name:'', visible:false});

let tangent = workspace.board.create('line', [
  function() { return F.f(t2.X());},
  function() { return - d(t2.X());},1], {color:colors.stroke, visible:false});


// some fabulous hackery to figure out the placement of the text
let fakeText = workspace.board.create('text', [0,ylow - 2,'slope = 2.02'],{visible:true});
let tWidth = textWidth(fakeText, workspace.board);
let Xerror = (xhigh - xlow)/50;

let tangentSlopeText = workspace.board.create('text',[
  function() { return t2.X() - tWidth - 3 * Xerror; },
  function() { return F.f(t2.X());},
  function(){ return 'slope = '+ d(t2.X()).toFixed(2); }], {
    color:colors.lightAnnote,
    fontSize:colors.fontSizeAnnote, 
    visible:false
  });



// animation secant into tangent
let animationTime = 2000;
let animationCallBack = function() {
  secant.hide();
  t2.setAttribute({visible:true});
  p3.setAttribute({visible:true});
  tangent.setAttribute({visible:true});
  tangentSlopeText.setAttribute({visible:true});
  df.setAttribute({visible:true});
  p2.setAttribute({visible:true});
  t2.setAttribute({visible:true});

};

let goClose = function() {
  t2.moveTo([secant.xint.x1.X(),0]);
  if (secant.xint.X2() < secant.xint.X1()) {
    secant.xint.x2.moveTo(
      [secant.xint.X1()-0.01, 0],
      animationTime, 
      {effect: '--', callback: animationCallBack } );
  }
  else {
    secant.xint.x2.moveTo(
      [secant.xint.X1()+0.01, 0],
      animationTime, 
      {effect: '--', callback: animationCallBack } );
  }
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


smartdown.setVariable('toTangent', false);
smartdown.setVariable('reset', false);
let derivativeOn = false;

this.dependOn = ['toTangent', 'reset'];
this.depend = function() {

  if (env.toTangent == true) {
    smartdown.setVariable('toTangent', false);
    goClose();
  }
  if (env.reset == true) {
    smartdown.setVariable('reset', false);
    resetSecant();
    secant.show();
    t2.setAttribute({visible:false});
    p3.setAttribute({visible:false});
    tangent.setAttribute({visible:false});
    tangentSlopeText.setAttribute({visible:false});
    secant.xint.x1.moveTo([1,0]);
    df.setAttribute({visible:false});
    p2.setAttribute({visible:false});
    t2.setAttribute({visible:false});
  }
};

outer.classList.add('outer');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');


// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-2-Frame');
formula1.onmouseover = onWideAFFactory(formula1, showAFFactory([triangle]));
formula1.onmouseout = offWideAFFactory(formula1, hideAFFactory([triangle]));
formula1.classList.add('highlightOffWide');


const formula2 = document.getElementById('MathJax-Element-6-Frame');
formula2.onmouseover = onWideAFFactory(formula2, showAFFactory([dfhighlight]));
formula2.onmouseout = offWideAFFactory(formula2, hideAFFactory([dfhighlight]));
formula2.classList.add('highlightOffWide');


```