# :::: panel
# --partialborder panelbox
##### Fundamental Theorem of Calculus
Returning to our area under the curve problem.  Let's use our new way of drawing the rectangles.  First we find the [antiderivative](:=showAntiDer=true) of our function which we will call $F$. We divide it up into [secants](:=showSecants=true).  We attach each [rectangle](:=showRect=true) so the height of the rectangle matches the slope of it's corresponding secant and the area of the rectangle matches the [rise](:=showRises=true) of the secant.
Instead of adding up the areas of the rectangles, we can add up the rises of the secants. What happens as the number of rectangles gets large?
Rectangles: [](:-segments/1/50/1) [](:!segments) 
The area under the curve is equal to the [change](:=showTotal=true) in $F$ between $a$ and $b$.  
# --partialborder
# ::::

# :::: finish
# --partialborder finishbox
[Finish](::finish/button,transparent,closeable,draggable,center,outline,shadow)
To find the area under the curve $f$ between $a$ and $b$, we find the antiderivative of $f$, which we'll call $F$.  Then we find the change in $F$ between $a$ and $b$ which we write as $$F(b) - F(a).$$
That's it.  That's the area under the curve $f$ between $a$ and $b$.
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

smartdown.showDisclosure('panel','','topleft,draggable,shadow');

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
let n = 4;

let cs = new SteelTheme();

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });

let df = function(x) { return Math.pow(x/2,4)/8 + Math.pow(x/2,3)/12 - 3 * Math.pow(x/2,2) + 12;};
let f =  function(x) { return Math.pow(x,5)/(40*16) + Math.pow(x,4)/(48*8) - Math.pow(x,3)/4 + 12* (x) + 15;  };
let F = new ProblemFunction(f, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

workspace.functions[F_id].graph.setAttribute({visible:false});

let DF = new ProblemFunction(df, '', 4, [xlow,xhigh], []);
let DF_id = workspace.addFunction(DF);

let xintSR = new XInterval(workspace.board, a, b);


let integral = workspace.board.create('integral', [[a, b], workspace.functions[DF_id].graph],
  {
    visible:true, 
    fillColor:cs.highlightFill, 
    label: {visible:false}, 
    curveLeft: {visible:false},
    curveRight: {visible:false}
  });




let slider = new IntSlider(xintSR.board, [xintSR.attachRightX, xintSR.attachY], [1, 50], 'N');
slider.setValue(n);

let sra = new SecantRectArray(xintSR, F.f, slider, {
  annotations:'off',
  attachButtonVisible:false
});



sra.secants.secants.setAttribute({
	strokecolor:cs.lightannote, 
    strokeWidth:3
});


sra.rectangles.rectangles.setAttribute({ fillColor: '#55DDFF'});

let aGet = function() { return xintSR.X1(); };
let bGet = function() { return xintSR.X2(); };
let faGet = function() { return f(xintSR.X1()); };
let fbGet = function() { return f(xintSR.X2()); };

let avert = workspace.board.create('segment',[[a,0], [a,df(a)]],
  {strokeColor:cs.darkAnnote, strokeWidth:1, visible: true});
let bvert = workspace.board.create('segment',[[b,0], [b,df(b)]],
  {strokeColor:cs.darkAnnote, strokeWidth:1, visible: true});
let aText = workspace.board.create('text',[aGet, -2, 'a'], 
  {fontSize:12, color:cs.darkAnnote, fixed:true, visible: true});
let bText = workspace.board.create('text',[bGet, 
  function() { 
    if (xintSR.X2() > 4.8) { return 2; }
    return -2; 
  }, 
    'b'], 
  {fontSize:12, color:cs.darkAnnote, fixed:true, visible: true});

let totalRise = workspace.board.create('segment',[[
  function() { return xintSR.X2(); },
  function() { return f(xintSR.X1()); }], [
  function() { return xintSR.X2(); },
  function() { return f(xintSR.X2()); }]],
  {
    strokeColor:'#55DDFF', 
    strokeWidth:4,
    firstArrow:true, 
    lastArrow:true, 
    visible:false
  });

let riseText = workspace.board.create('text',[
  function() { return xintSR.X2() + 0.2; }, 
  function() { return f(xintSR.X1()) + (f(xintSR.X2())- f(xintSR.X1()))/2; }, 
  'F(b) - F(a)'], 
  {fontSize:18, color:cs.darkAnnote, fixed:true, visible: false});


let risesOn = false;
let rises = [];
function updateRises() {
  workspace.board.suspendUpdate();
  for (let i=0; i < rises.length; i++) {
    workspace.board.removeObject(rises[i]);
  }
  workspace.board.unsuspendUpdate(); 
  rises = [];

  let a = sra.xint.X1();
  let deltaX = sra.deltaPX();
  // make new rises
  for (let i=0; i < n; i += 1) {
    let x1 = a + i * deltaX;
    let x2 = a + (i+1) * deltaX;
    rises.push(workspace.board.create('segment',[[x2,f(x1)], [x2,f(x2)]],
    { strokeColor:'#55DDFF', strokeWidth:3, visible:true}));
  } 
}

function waitThenUpdateRises() {
  setTimeout(() => {  updateRises(); }, 2000);
}

workspace.board.on('update', function() {
  workspace.onUpdate();
  sra.onUpdate();
  if (risesOn) {
    waitThenUpdateRises();
  }
});

sra.hide();

let widthPercent = 0.8;
let heightPercent = 0.8;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};


this.sizeChanged();

smartdown.setVariable('showSecants', false);
smartdown.setVariable('showRect', false);
smartdown.setVariable('showAntiDer', false);
smartdown.setVariable('showRises', false);
smartdown.setVariable('showTotal', false);
smartdown.setVariable('segments', n);

this.dependOn = ['showSecants', 'showRect', 'showAntiDer', 'segments', 'showRises', 'showTotal'];
this.depend = function() {
  if (env.segments !== n) {
    n = env.segments;
    sra.slider.setValue(n);
    workspace.board.update();
  }

  if (env.showAntiDer == true) {
    smartdown.setVariable('showAntiDer', false);
    workspace.functions[F_id].graph.setAttribute({visible:true});
  }

  if (env.showRises == true) {
    smartdown.setVariable('showRises', false);
    risesOn = true;
    workspace.board.update();
  }

  if (env.showTotal == true) {
    smartdown.setVariable('showTotal', false);
    riseText.setAttribute({visible:true});
    totalRise.setAttribute({visible:true});
  }

  if (env.showSecants == true) {
    smartdown.setVariable('showSecants', false);
    integral.setAttribute({visible:false});
    avert.setAttribute({visible:false});
    bvert.setAttribute({visible:false});
    sra.secants.show();
    sra.slider.hide();
  }
  if (env.showRect == true) {
    smartdown.setVariable('showRect', false);
    sra.rectangles.show();
    sra.slider.hide();
  }
}



```

