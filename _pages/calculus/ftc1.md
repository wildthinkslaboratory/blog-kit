---
title: Secant Rectangle
smartdown: true
header: 'none'
---

# :::: tour1
Here is an object moving in space.  
[see object move](:=play=true)
[N](::tour2/closeable,draggable,topright,shadow)
# ::::

# :::: tour2
We know that the **distance** traveled is equal to the **rate** times the **time**, and we know two geometric ways of showing this relationship.  Rectangles and slopes are inverses of each other.   
[show relationship](:=showSR=true)
# ::::

# :::: tour3
The slope of our secant tells us the average speed traveled during a given interval.  The corresponding rectangle expresses the distance traveled as the product of the rate and the time.  What happens when these time intervals get smaller?
[multiple periods](:=toggleArray=true)  [10 time periods](:=segments=10) 

# ::::

# :::: tour4
Number of Time Periods [](:-segments/1/100/1) [](:!segments) 
As the time periods get very small, the rectangles define a new function that relates to our original curve.  It's related by the function $d = r \cdot t$.  [show rectangle curve](:=toggleCurveB=true) This function gives the height of our rectangles. Remember that the height of each skinny rectangle is the average speed the object travels during a very short time period.  As these rectangles get skinnier, this new curve becomes our speed curve.
# ::::

[Tour](::tour1/closeable,draggable,topright,shadow) 
[see object move](:=play=true) [show](:=showSR=true) [hide](:=hideSR=true) [show array](:=showArray=true) [hide array](:=hideArray=true) [derivative](:=showD=true)
[](:-segments/1/100/1) [](:!segments) 
```javascript /autoplay

//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';

myDiv.innerHTML = `<div id='left' style='height:500px; width:80%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:500px; width:19%; float:left; border: 1px solid gray;background:#EEFFFF;border-radius:8px;';></div>`;

let purple = '#DD44DD';
let orange = '#EE5500';

let xlow = -1;
let xhigh = 8;
let ylow = -4;
let yhigh = 16;


let workspace = new Workspace('left', [xlow,yhigh,xhigh,ylow],  
  { xlabel:'', ylabel:'', colorTheme:'steel'});
let F = new ProblemFunction(function(t) { return Math.pow(t-4,4)/8 - 2 * (t-4) * (t-4) + 12; }, 
  'position of object', 5, [0,xhigh], []);
let F_id = workspace.addFunction(F);

let t = workspace.board.create('point', [0,0], {visible:false});
var p = workspace.board.create('point', [
  function() { return t.X(); }, 
  function() { return F.f(t.X()); }], {color:orange, name:''});

let xint = new XInterval(workspace.board, 2, 4);
let SR = new SecantRectangle(xint, F.f, {
  annotations:'on',
  change:'d',
  rate:'r',
  units:'t',
  attachButtonVisible:false
});
SR.hide();

let N = 4;
let xintSR = new XInterval(workspace.board, 0, xhigh);
let slider = new IntSlider(xintSR.board, [xintSR.attachRightX, xintSR.attachY], [1, 100], 'N');
slider.setValue(N);
let secRectArray = new SecantRectArray(xintSR, F.f, slider, {
  annotations:'off',
  attachButtonVisible:false
});
secRectArray.hide();

// the derivative graph
var s = function(t) { return 4 * Math.pow(t-4,3)/8 - 4 * (t-4); }
var s_graph = workspace.board.create('functiongraph', [s,0,8], {strokeColor:'purple', strokeWidth:4, visible:false});




let board2 = JXG.JSXGraph.initBoard('right', {boundingbox:[-1,16,2,-4], keepaspectratio:false, axis:false, showCopyright:false});

let board2Yaxis = board2.create('axis', [[0, 0], [0, 1]], 
      {name:'d', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });  

let board2Xaxis = board2.create('axis', [[0, 0], [1,0]], 
      {name:'', 
      withLabel: false,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-20, 20]   // (in pixels)
      },
      majorHeight:0
      });

board2Xaxis.removeAllTicks();

workspace.board.addChild(board2);

let p2 = board2.create('point', [
  1.2, 
  function() { return p.Y(); }], {color:orange, name:'', size:6});








let widthPercent = 0.8;
let heightPercent = 0.7;
let widthRatio = 1/6;

this.sizeChanged = function() {     
  workspace.board.resizeContainer((1 - widthRatio - 0.01) * window.innerWidth * widthPercent, window.innerHeight * heightPercent);
  board2.resizeContainer(widthRatio * window.innerWidth * widthPercent,  window.innerHeight * heightPercent);
};


this.sizeChanged();


let move = function() { 
  t.moveTo([8,0],1000, {effect: '--', callback: function() {  t.moveTo([0,0]); } } ); 
};

smartdown.setVariable('play', false);
smartdown.setVariable('showSR', false);
smartdown.setVariable('hideSR', false);
smartdown.setVariable('showArray', false);
smartdown.setVariable('hideArray', false);
smartdown.setVariable('showD', false);
smartdown.setVariable('segments', 4);

// get the number of triangles from smartdown cell
this.dependOn = ['play', 'showSR', 'hideSR', 'showArray', 'hideArray', 'segments', 'showD'];
this.depend = function() {

  if (env.showSR == true) {
    SR.show();
    smartdown.setVariable('showSR', false);
  }

  if (env.hideSR == true) {
    SR.hide();
    smartdown.setVariable('hideSR', false);
  }

  if (env.showArray == true) {
    secRectArray.show();
    smartdown.setVariable('showArray', false);
  }

  if (env.hideArray == true) {
    secRectArray.hide();
    smartdown.setVariable('hideArray', false);
  }

  if (env.play == true) {
    smartdown.setVariable('play', false);
    move();

  }

  if (env.segments != N) {
    N = env.segments;
    secRectArray.slider.setValue(N);
  }

  if (env.showD == true) {
    smartdown.setVariable('showD', false);
    s_graph.setAttribute({visible:true});
  }
};


```




