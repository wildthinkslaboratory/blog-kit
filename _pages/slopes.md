---
layout: post
title: Visualizing Slopes
date: 2020-02-07
smartdown: true
categories: calculus
comments: false
background: '/img/posts/change.JPG'
---

I've been thinking a lot about slopes as I put together my calculus app. In calculus we use slopes to measure how much the value of a function changes in relation to it's dependent variable.  What does that really mean and how can we build intuition about it?  We're all familiar with the **area model**. It's used in classrooms around the world as an intuitive geometric model of a product.  In this post I'm going to talk about the **slope model**.  Slopes give a visual way to show a ratio or quotient and they are an intuitive way to model rates of change.

### Modeling Rates and Ratios with Slopes

In the area model, we place two one dimensional quatities at $90^\circ$ to each other.  We extend these two lines into a two dimensional rectangle.  The area of the rectangle is the product of the two sides.  The slope model begins the same way with two orthagonal one dimensional lines.  Instead of forming a rectangle, we draw a third line to form a triangle.  The value  we are interested in in this geometric construction is the slope of the third line which is the quotient of the the two original quantities.   

![](/smartblog/img/posts/area_slope.svg)

The quotient $\frac{A}{B}$ can also be written as $\tan(a)$. In otherwords, we've mapped the quotient of two quantities onto an angle.  We tend to associate the area model with multiplication and slopes with quotients, but we can divide with the area model and you can multiply with the slope model by allowing our two starting dimensions to take on fractional values less than one.  

The slope model is great for describing ratios and rates.  Let's take a look at a problem.

#### --partialborder problem1

**Problem**

Ingrid drives from the city of Eugene to the city of Bend.  She travels 140 miles in 2.8 hours. Drag the red dot to show the ratio of 140 miles to 2.8 hours.  

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:400px;'>`;


// let height = 15;
// let width = height * (myDiv.offsetWidth * 0.6 / 600);

JXG.Options.axis.ticks.majorHeight = 40;
JXG.Options.layer['line'] = 5;
// create the board
let board0 = JXG.JSXGraph.initBoard('box', {boundingbox:[-2,200,4,-50], keepaspectratio:false, axis:false, showCopyright:false});

let xaxis = board0.create('axis', [[0, 0], [1,0]], 
      {name:'hours', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
      });
let yaxis = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'miles', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   



let x1 = board0.create('point', [0, 0], {name: '', color:'blue', fixed: true, size:3});


let p = board0.create('point', [0,0], {name:'', color:'red', size:6, visible:true, showInfoBox:false});

// snap p to grid
board0.on('update', function() {

  let snapY = Math.floor(p.Y() / 5) * 5;
  if ((p.Y() - snapY) > 2.5) { snapY += 5 }

  let snapX = Math.floor(10 * p.X()) / 10;
  if ((p.X() - snapX) > 0.05) { snapX += 0.10 }

  p.moveTo([snapX,snapY]);

});

let segment = board0.create('segment', [x1, p], {strokeColor:'blue', strokeWidth:3 });
let x2 = board0.create('point', [
  function() { return p.X(); },
  0 ], 
  {name:'', color:'blue', fixed:true, size:3 });

let rise = board0.create('segment', [p, x2], {strokeColor:'blue', dash:2, strokeWidth:3 });
let run = board0.create('segment', [x1, x2], {strokeColor:'blue', dash:2, strokeWidth:3 });
// let circle = board0.create('circle', [x1, p], { strokeColor:'black', strokeWidth:2 });

let slope = function() { return p.Y()/p.X(); }
let slopeText = board0.create('text', [
  function() {  return p.X() + p.X() / Math.sqrt(p.X() * p.X() + p.Y() * p.Y()) + 0.1; },
  function() {  return p.Y() + p.Y() / Math.sqrt(p.X() * p.X() + p.Y() * p.Y()); },
  function() { 
    if (p.X() == 0) { return 'Inf'; }
    return 'slope = ' + (p.Y() / p.X()).toFixed(2) + ' mph'; }], 
  {fontSize:16});

let riseText = board0.create('text', [
  function() { if (x2.X() > x1.X()) { return x2.X() + 0.1; } 
         return x2.X() - 0.8; },
  function() { return p.Y()/2; },
  function() { return p.Y().toString() + ' miles'; }], 
  {fontSize:12, visible:true});

let runText = board0.create('text', [
  function() { return x2.X()/2; },
  -20,
  function() { return p.X().toFixed(1).toString() + ' hours'; }], {fontSize:12, visible:true});


```
What is Ingrid's average speed? [](:?speed) mph


```javascript/autoplay
smartdown.setVariable('speed', '');
this.dependOn = ['speed'];


this.depend = function() {
  if (env.speed === '50') {
    smartdown.showDisclosure('highfive','','transparent,bottomright,shadow');
    setTimeout(function () {
           smartdown.hideDisclosure('highfive','','');
      }, 3000);
  }
};
```

# :::: highfive
# --colorbox c1
High five! :raised_hand:
# --colorbox
# ::::


#### --partialborder

list of example questions that can be solved with the slope model.
Highlight how two quantities are changing in proportion to each other.
Liner models.  Look in math books for examples.
Thinking about how two values change together.

### Mapping Slopes to Reals and Reals to Slopes

There is a one to one mapping between the real number line and the set of all slopes. If we take the real number line

![](/smartblog/img/posts/realline.pdf)

we can draw each real number $m$ as a line passing through $(0,0)$ with slope $m$. 

![](/smartblog/img/posts/slopeline.pdf)

Positive values between $0$ and $1$ take up the first $50%$ of our quarter circle.  The range $\[1 \ldots 10 \]$ use approximately $43%$ and the range $\[10 \ldots + \infty \]$ is squished into the last $7%$.  Negative slopes are a mirrored across the $y$ axis. The function $\tan(x)$ maps a uniform range from $[0 \ldots \Pi]$ to these strangely skewed points. mapped onto a uniform range of angles.

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='left' style='height:600px; width:60%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:600px; width:39%; float:left; border: 1px solid gray;background:#CCEEFF;border-radius:8px;';></div>`;



let height = 15;
let width = height * (myDiv.offsetWidth * 0.6 / 600);

//JXG.Options.axis.ticks.majorHeight = 40;
JXG.Options.layer['line'] = 5;
// create the board
let board0 = JXG.JSXGraph.initBoard('left', {boundingbox:[-width,height,width,-height], keepaspectratio:true, axis:false, showCopyright:false});

let xaxis = board0.create('axis', [[0, 0], [1,0]], 
      {name:'', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
      });
let yaxis = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   



let x1 = board0.create('point', [0, 0], {name: '', color:'blue', fixed: true, size:3});

for (let i=1; i < 11; i += 9) {
  let s1 = board0.create('point', [ 
    Math.sqrt(95 / (i*i + 1)),
    i * Math.sqrt(95 / (i*i + 1)) ], 
    {visible:false});
  let s2 = board0.create('point', [ 
    Math.sqrt(105 / (i*i + 1)),
    i * Math.sqrt(105 / (i*i + 1)) ], 
    {visible:false});
  board0.create('line', [s1,s2],{strokeColor:'#BBBBBB', strokeWidth:1});

  let s3 = board0.create('point', [ 
    -Math.sqrt(95 / (i*i + 1)),
    i * Math.sqrt(95 / (i*i + 1)) ], 
    {visible:false});
  let s4 = board0.create('point', [ 
    -Math.sqrt(105 / (i*i + 1)),
    i * Math.sqrt(105 / (i*i + 1)) ], 
    {visible:false});
  board0.create('line', [s3,s4],{strokeColor:'#BBBBBB', strokeWidth:1});

  let sText1 = board0.create('text', [
  Math.sqrt(110.25 / (i*i + 1)),
  i * Math.sqrt(110.25 / (i*i + 1)),
  i ], 
  {fontSize:12, color:'black'});

  let sText2 = board0.create('text', [
  - Math.sqrt(110.25 / (i*i + 1)) - 1,
  i * Math.sqrt(110.25 / (i*i + 1)),
  -i ], 
  {fontSize:12, color:'black'});

}

let slope_circle = board0.create('circle', [x1, [10,0]], { strokeColor:'#999999', strokeWidth:2 });


let p = board0.create('point', [4,4], {name:'', color:'red', size:6, visible:true, showInfoBox:false});

// // snap p to grid
// board0.on('update', function() {
//   let snapX = Math.floor(p.X());
//   let snapY = Math.floor(p.Y());
//   let delta = 0.5;

//   if ((p.X() - snapX) > delta) { snapX += 1 }
//   if ((p.Y() - snapY) > delta) { snapY += 1 }
//   p.moveTo([snapX,snapY]);

// });

let segment = board0.create('segment', [x1, p], {strokeColor:'blue', strokeWidth:3 });
let x2 = board0.create('point', [
  function() { return p.X(); },
  0 ], 
  {name:'', color:'blue', fixed:true, size:3 });

let rise = board0.create('segment', [p, x2], {strokeColor:'blue', dash:2, strokeWidth:3 });
let run = board0.create('segment', [x1, x2], {strokeColor:'blue', dash:2, strokeWidth:3 });
// let circle = board0.create('circle', [x1, p], { strokeColor:'black', strokeWidth:2 });

let slope = function() { return p.Y()/p.X(); }
let slopeText = board0.create('text', [
  function() {  return p.X() + p.X() / Math.sqrt(p.X() * p.X() + p.Y() * p.Y()); },
  function() {  return p.Y() + p.Y() / Math.sqrt(p.X() * p.X() + p.Y() * p.Y()); },
  function() { 
    if (p.X() == 0) { return 'Inf'; }
    return (p.Y() / p.X()).toFixed(2); }], 
  {fontSize:16});

// create the board
JXG.Options.axis.ticks.majorHeight = 40;
let board1 = JXG.JSXGraph.initBoard('right', {boundingbox:[-Math.PI/2,60,Math.PI + 1,-60], keepaspectratio:false, axis:false, showCopyright:false});
let xaxis2 = board1.create('axis', 
  [[0, 0], [1,0]], {
  needsRegularUpdate: false, 
  ticks:{
    label:{offset:[-10,-10]},
    scale: Math.PI, 
    scaleSymbol: 'π'
    } 
 }
);
let yaxis2 = board1.create('axis', [[0, 0], [0, 1]], 
      {name:'', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   

// parabala and it's derivative
let f = function(x) { return  Math.tan(x); };
let angle = function() { 
  let x = p.Y()/p.X();
  if (x > 0) {
    return Math.atan(x); 
  }
  return Math.atan(x) + Math.PI; 
}
let graph_f = board1.create('functiongraph', [f,0,Math.PI]);
let tanPt = board1.create('point', [
  angle,
  function() { return f(angle()); }], 
  { name:''})


board0.addChild(board1);

// this.sizeChanged = function() {     
//   board1.resizeContainer(myDiv.offsetWidth * workspaceDivWidth, pictureDivHeight);
//   board2.resizeContainer(myDiv.offsetWidth * pictureDivWidth, pictureDivHeight);
// };

// this.dependOn = [''];
// this.depend = function() {

// };

```

### Using Slopes to Compute Average Rate of Change

### Using Slopes to Compute Instantaneous Rates of Change

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box2' class='jxgbox' style='height:500px;'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board2 = JXG.JSXGraph.initBoard('box2', {boundingbox:[-1,50,5,-4], keepaspectratio:false, axis:false});

var xaxis = board2.create('axis', [[0, 0], [1,0]], 
      {name:'time (s)', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
      });
var yaxis = board2.create('axis', [[0, 0], [0, 1]], 
      {name:'distance (m)', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   


 // parabala and it's derivative
var g = function(x) { return  x * x * x / 3; };
var graph_g = board2.create('functiongraph', [g,0,5], {strokeColor:'#7700FF', strokeWidth:2});
var gp = function(x) { return x * x; }
var graph_gp = board2.create('functiongraph', [gp,0,5], {strokeColor:'#0077FF', strokeWidth:2, visible:false});

// point x on axis we want to get derivative value
var x = board2.create('glider', [1, 0, xaxis], {name: 't', size:6, visible:false});

var gx = board2.create('point', [
    function() { return x.X(); },
    function() { return g(x.X()); } 
  ], {name:'', color:'blue', fixed:true, visible:false});

// the slider point for the secant
var x_h = board2.create('glider', [x.X() + 3, 0, xaxis], {name:'t + h', size:6, color:'green',visible:false} ); 
// sliding point on parabala 
var gx_h = board2.create('point', [
                function() { return x_h.X(); }, 
                function() { return g(x_h.X()); }
          ], {name:'', color: 'blue', fixed: true, size:3, visible:false});

// secant line
var secant = board2.create('line', [gx, gx_h], {strokeColor:'#FF5522', visible:false});
var secantSlope = function() { 
  if (x.X() == x_h.X()) { return "UNDEFINED: divide by zero"; }
  return ((g(x.X()) - g(x_h.X()))/(x.X() - x_h.X())).toFixed(3).toString(); 
}

// print the slope of the secant line
var slopeText = board2.create('text',[1,25,
  function(){ return 'Slope of Secant Line = '+ secantSlope(); }], {fontSize:20, visible:false});
var hText = board2.create('text',[1,20,
  function(){ return 'h = '+ (x_h.X() - x.X()).toFixed(3); }], {fontSize:20, visible:false});


var p1 = board2.create('point', [1,1], {name:'',visible:false, fixed:true, color:'orange'});
var p2 = board2.create('point', [2,4], {name:'',visible:false, fixed:true, color:'orange'});
var p3 = board2.create('point', [3,9], {name:'',visible:false, fixed:true, color:'orange'});

smartdown.setVariable('s31', '');
smartdown.setVariable('s32', '');
smartdown.setVariable('s33', '');
smartdown.setVariable('start2', false);
smartdown.setVariable('improve2', false);

this.dependOn = ['s31','s32','s33','start2', 'improve2'];
this.depend = function() {

    if (env.improve2 == true) {
      smartdown.setVariable('improve2', false);
      x_h.setPositionDirectly(JXG.COORDS_BY_USER, [x.X() + (x_h.X() - x.X())/2,0]); 
      x_h.prepareUpdate().update(true).updateRenderer();
      gx_h.prepareUpdate().update(true).updateRenderer();
    }

    if (env.start2 == true) {
      secant.setAttribute({visible:true});
      x.setAttribute({visible:true});
      gx.setAttribute({visible:true});
      x_h.setAttribute({visible:true});
      gx_h.setAttribute({visible:true});
      slopeText.setAttribute({visible:true});  
      hText.setAttribute({visible:true});    
    }

    if (env.s31 == 1) {
      p1.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s32 == 4) {
      p2.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s33 == 9) {
      p3.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s31 == 1 && env.s32 == 4 && env.s33 == 9) {
      graph_gp.setAttribute({visible:true});
      secant.setAttribute({visible:false});
      x.setAttribute({visible:false});
      gx.setAttribute({visible:false});
      x_h.setAttribute({visible:false});
      gx_h.setAttribute({visible:false});
      slopeText.setAttribute({visible:false});
      hText.setAttribute({visible:false});
    }
};

```
[Straight Line Approximation](:=start2=true) [Improve Approximation](:=improve2=true) [Application Notes](::instructions2/tooltip/transparent)

Find the rate of the car at these times.
Rate at time 1 [](:?s31) m/s
Rate at time 2 [](:?s32) m/s
Rate at time 3 [](:?s33) m/s

# :::: instructions2
Drag the red and green dots to the left and right. 
# ::::
