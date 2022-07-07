### Differentials

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
$dx$[](:?dx|number) [set dx](:=setdx=true)
$dy$[](:!dy)
$f(a+dx) - f(a)  = \Delta y$ [](:!delta)
[zoom in](:=zoom=true)
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

let xlow = -1.5;
let xhigh = 9;
let ylow = -10;
let yhigh = 81;



let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });
let F = new ProblemFunction(function(x) { return x*x; }, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let xint = new XInterval(workspace.board, 5,7);
xint.x1.setAttribute({name:'a', fixed:true});
xint.x2.setAttribute({name:'a + dx'});

// get the color scheme for our extra workspace objects
let colors = new SteelTheme();

// tangent stuff 
let d = function(x) { return 2*x; }
let dline = function(x) { d(xint.x1.X()) * (x - xint.x1.X()) + F.f(xint.x1.X()); }

let f1 = workspace.board.create('point', [
  function() { return xint.x1.X(); },
  function() { return F.f(xint.x1.X()); }], 
  {name:'', color:colors.stroke});

let dy = workspace.board.create('point', [
  function() { return xint.x2.X(); },
  function() { return d(xint.x1.X()) * (xint.x2.X() - xint.x1.X()) + F.f(xint.x1.X()); }],
  {name:'', color:colors.stroke});

let f1_s = workspace.board.create('point', [
  function() { return xint.x2.X(); },
  function() { return F.f(xint.x1.X()); }], 
  {name:'', color:colors.stroke, visible:false});


let tangent = workspace.board.create('line', [f1, dy], {color:colors.stroke, visible:true});

let f2 = workspace.board.create('point', [
  function() { return xint.x2.X(); },
  function() { return F.f(xint.x2.X()); }],
  {name:'', color:colors.stroke});


let runLine = workspace.board.create('segment', [f1, f1_s], 
    {
      strokeColor: '#55DDFF', 
      strokeWidth:5, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

let dxLine = workspace.board.create('segment', [f1_s,dy], 
    {
      strokeColor: '#55DDFF', 
      strokeWidth:5, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

let fxLine = workspace.board.create('segment', [f1_s,f2], 
    {
      strokeColor: '#55DDFF', 
      strokeWidth:5, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

let runLineDot = workspace.board.create('segment', [f1, f1_s], 
    {
      strokeColor: colors.stroke, 
      strokeWidth:1, 
      dash:2,
      visible:true
    });

let fxLineDot = workspace.board.create('segment', [f1_s,f2], 
    {
      strokeColor: colors.stroke, 
      strokeWidth:1, 
      dash:2,
      visible:true
    });

workspace.board.on('update', function() {
  workspace.onUpdate();
  xint.onUpdate();
  smartdown.setVariable('dx', (f1_s.X() - f1.X()).toFixed(4));
  smartdown.setVariable('dy', (dy.Y() - f1.Y()).toFixed(4));
  smartdown.setVariable('delta', (f2.Y() - f1.Y()).toFixed(4));

});


this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, window.innerHeight * 0.7);
};

this.sizeChanged();

smartdown.setVariable('zoom', false);
smartdown.setVariable('dx', 2);
smartdown.setVariable('dy', 0);
smartdown.setVariable('delta', 0);
smartdown.setVariable('setdx', false);
workspace.board.update();

this.dependOn = ['zoom', 'setdx'];
this.depend = function() {
  if (env.zoom == true) {
    smartdown.setVariable('zoom', false);
    workspace.board.zoomIn(5,F.f(5));
  }

  if (env.setdx == true) {
    smartdown.setVariable('setdx', false);
    xint.x2.moveTo([xint.x1.X() + env.dx,0]);
  }

};

// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-1-Frame');
formula1.onmouseover = onAFFactory(formula1, showAFFactory([runLine]));
formula1.onmouseout = offAFFactory(formula1, hideAFFactory([runLine]));
formula1.classList.add('highlightOff');


const formula2 = document.getElementById('MathJax-Element-2-Frame');
formula2.onmouseover = onAFFactory(formula2, showAFFactory([dxLine]));
formula2.onmouseout = offAFFactory(formula2, hideAFFactory([dxLine]));
formula2.classList.add('highlightOff');

const formula3 = document.getElementById('MathJax-Element-3-Frame');
formula3.onmouseover = onAFFactory(formula3, showAFFactory([fxLine]));
formula3.onmouseout = offAFFactory(formula3, hideAFFactory([fxLine]));
formula3.classList.add('highlightOff');


```


