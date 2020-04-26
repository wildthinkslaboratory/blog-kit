---
title: Secant Rectangle
smartdown: true
header: 'none'
---

# :::: tour2
This time we start with a speed curve for a moving object. The **distance** is equal to the **rate** times the **time**, $d = r \times t$ and again we know two different geometric ways of showing this relationship.  [show relationship](:=showSR=true)  The height of the rectangle matches the speed of the object in the middle of the time period and the area of the rectangle estimates the distance traveled during the interval.  The matching secant floats up and down in the same interval.  We can't figure out where to place the secant vertically from just the speed graph alone.
[N](:=show3=true) 
# ::::

# :::: tour3
We can make more secants and rectangles over more intervals. [more intervals](:=showArray=true). Notice that each secant starts where the previous secant finishes, but the array of secants still floats up and down over the entire interval.  What happens when these time intervals get smaller?
number of intervals [](:-segments/1/100/1) [](:!segments) 
[N](:=show4=true)
# ::::

# :::: tour4
The secants define a new function that relates to our speed curve.  Each tiny secant cumulatively adds up the distance traveled during a small interval.  As these secants get smaller, this new curve becomes our position curve.  We still don't know where this curve lives vertically. Only when we add the information that the object is at position 12 at time $t=0$ can we determine where to anchor the shadow secant curver vertically. [actual position curve](:=showD=true)
number of intervals [](:-segments/1/100/1) [](:!segments)
[Continue](/pages/secantRectangle1)
# ::::

### The Shadow Secant Curve 
[N](:=show2=true)[see object move](:=play=true) Here is an object moving in space. 
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

let xlow = -1.5;
let xhigh = 8;
let ylow = -20;
let yhigh = 30;


let workspace = new Workspace('left', [xlow,yhigh,xhigh,ylow],  
  { xlabel:'time (s)', ylabel:'position (m)', colorTheme:'steel'});
let F = new ProblemFunction(function(t) { return 4 * Math.pow(t-4,3)/8 - 4 * (t-4); }, 
  'speed of object', 5, [0,xhigh], []);
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
SR.attachButton.toggle();
SR.xint.midY.moveTo([0,10]);
SR.hide();



let N = 4;
let xintSR = new XInterval(workspace.board, 0, xhigh);
let slider = new IntSlider(xintSR.board, [xintSR.attachRightX, xintSR.attachY], [1, 100], 'N');
slider.setValue(N);

let secRectArray = new SecantRectArray(xintSR, F.f, slider, {
  annotations:'off',
  attachButtonVisible:false
});
secRectArray.attachButton.toggle();
//secRectArray.xint.midY.moveTo([0,20]);
secRectArray.hide();


// the derivative graph 
var s = function(t) { return Math.pow(t-4,4)/8 - 2 * (t-4) * (t-4) + 12; };
var s_graph = workspace.board.create('functiongraph', [s,0,8], {strokeColor:'#4499FF', strokeWidth:4, visible:false});




let board2 = JXG.JSXGraph.initBoard('right', {boundingbox:[-1,16,2,-4], keepaspectratio:false, axis:false, showCopyright:false});

let board2Yaxis = board2.create('axis', [[0, 0], [0, 1]], 
      {name:'m', 
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
  function() { return s(p.X()); }], {color:orange, name:'', size:6});



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

smartdown.setVariable('show1', false);
smartdown.setVariable('play', false);
smartdown.setVariable('show2', false);
smartdown.setVariable('segments', 4);
smartdown.setVariable('showSR', false);
smartdown.setVariable('show3', false);
smartdown.setVariable('showArray', false);
smartdown.setVariable('show4', false);
smartdown.setVariable('showD', false);

// get the number of triangles from smartdown cell
this.dependOn = ['show1', 'play', 'segments', 'show2', 'showSR', 'show3', 'showArray', 'show4', 'showD'];
this.depend = function() {

  // if (env.show1 == true) {
  //   smartdown.setVariable('show1',false);
  //   smartdown.showDisclosure('tour1','','draggable,closeable,topright,shadow');
  //   smartdown.hideDisclosure('tour2','','');
  //   smartdown.hideDisclosure('tour3','','');
  //   smartdown.hideDisclosure('tour4','','');
  //   N = 4;
  //   smartdown.setVariable('segments', 4);
  //   secRectArray.hide();

  // }

  if (env.play == true) {
    smartdown.setVariable('play', false);
    move();

  }

  if (env.segments != N) {
    N = env.segments;
    secRectArray.slider.setValue(N);
  }

  if (env.show2 == true) {
    smartdown.setVariable('show2',false);
    smartdown.showDisclosure('tour2','','draggable,closeable,topright,shadow');
    //smartdown.hideDisclosure('tour1','','');
  }

  if (env.showSR == true) {
    SR.show();
    smartdown.setVariable('showSR', false);
  }

  if (env.show3 == true) {
    smartdown.setVariable('show3',false);
    smartdown.showDisclosure('tour3','','draggable,closeable,topright,shadow');
    smartdown.hideDisclosure('tour2','','');
  }


  if (env.showArray == true) {
    secRectArray.show();
    smartdown.setVariable('showArray', false);
    SR.hide();
  }

  if (env.show4 == true) {
    smartdown.setVariable('show4',false);
    smartdown.showDisclosure('tour4','','draggable,closeable,topright,shadow');
    smartdown.hideDisclosure('tour3','','');
    smartdown.showDisclosure('toolbar','','transparent');
  }

  if (env.showD == true) {
    smartdown.setVariable('showD', false);
    s_graph.setAttribute({visible:true});
  }
};


```




