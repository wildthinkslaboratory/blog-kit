When students finish their high school calculus classes, they will likely remember many of the short cut rules for how to take the derivative of different types of functions (definitely useful!).  They often don't remember how these rules were derived and they may not remember the Fundamental Theorem of Calculus or have any intuition as to why it is true.  In other words, they emerge from these classes without intuition or awe about the main ideas of calculus.  

I'm on a mission to make this better.  I want to make an interactive online Calculus Primer.  It will be an activity that you do before starting a calculus class that helps build the intuition for what's coming.  It will avoid calculus notations and terminology.  It will not contain messy algebra.  It will focus on geometric models and building intuition.  I have a tight time schedule since my oldest son will start his first calculus class this summer and I want to get him off to a good start.  This post is the first in a series.  I've got more ideas than I can fit into one post and I have just as many unanswered questions.  

### My First Idea: Geometric Intuition for The Fundamental Theorem of Calculus
Calculus is a fancy way of studying rates of change.  Kids start learning about rates in middle school.

# --outlinebox
**Example**
 If a kid eats three slices of pizza a day, how many slices will they eat in 5 days?  

**Solution**
The total pizza eaten is equal to the number of slices per day times the number of days.
$$15 = 3 \; \frac{\text{slices}}{\text{day}} \; \times 5 \; \text{days}$$
# --outlinebox

In this case, the amount of pizza is changing relative to the number of days. More generally, we have some quantity $Y$ that is changing relative to some other quantity $X$. The total change in $Y$ is equal to the rate of change $\frac{\Delta Y}{\Delta X}$  times the units of $X$.  In practice, I think the most intuitive rate of change problem to think about is a moving object.  The distance traveled by an object is equal to the rate (or speed) of the object times the time spent moving.
$$\text{distance} = \text{rate} \; \times \; \text{time}. $$
For now, let's assume we're talking about a moving car and just remember that all of this can be generalized to anything that has a rate of change.

So we're talking about a moving car, and we have this relationship $d = r \times t$, but there are two ways to write it and they each have a different geometric representation. If we know the rate and the time, then finding the distance is a multiplication problem which we can model as an area problem. [show area](:=speedToggle=true)  If the length and width of the rectangle have the values of *rate* and *time*, then the area of the rectangle will be the *distance* traveled.

Now imagine instead that we have the distance and the time and we want to find the rate. We write this formula as $r = \frac{d}{t}$.  Finding the rate in terms of distance and time is a division problem which we can model as the slope of a line. [show slope](:=distanceToggle=true)   

[Application Instructions](::instructions1/tooltip)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:400px;'>`;


JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-2,7,10,-1], keepaspectratio:true, axis:false});

var xaxis = board0.create('axis', [[0, 0], [1,0]], 
      {name:'time (s)', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
      });
var yaxis = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   

var speed = 1;
smartdown.setVariable('Speed', 1);
smartdown.setVariable('distanceToggle', false);
smartdown.setVariable('speedToggle', false);

 
var d = function(t) { return speed * t; };
var d_graph = board0.create('functiongraph', [d,-60,60], {strokeColor:'#DDDDDD', strokeWidth:2});
var s = function(x) { return speed; }
var s_graph = board0.create('functiongraph', [s,-60,60], {strokeColor:'#DDDDDD', strokeWidth:2});


var t1 = board0.create('glider', [2, 0, xaxis], {name: '', size:5});
var t2 = board0.create('glider', [4, 0, xaxis], {name: '', size:5, color:'green'});

var d1 = board0.create('point', [
    function() { return t1.X(); },
    function() { return d(t1.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var d2 = board0.create('point', [
    function() { return t2.X(); },
    function() { return d(t2.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var dline = board0.create('line', [d1, d2], {strokeColor:'blue', straightFirst:false, straightLast:false, visible:false});

var d3 = board0.create('point', [
    function() { return t2.X(); },
    function() { return d(t1.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var drise = board0.create('line', [d3, d2], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});
var drun = board0.create('line', [d1, d3], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});

var driseText = board0.create('text', [
  function() { if (t2.X() > t1.X()) { return t2.X() + 0.2; } 
         return t2.X() - 0.8; },
  function() { return (d(t2.X()) - d(t1.X()))/2 + d(t1.X()); },
  'distance'], {fontSize:12, visible:false});

var drunText = board0.create('text', [
  function() { return t1.X() + (t2.X() - t1.X())/2; },
  function() { if (t2.X() > t1.X()) { return d(t1.X()) - 0.1;} 
                return d(t1.X()) + 0.3; },
  'time'], {fontSize:12, visible:false});

var dslopeText = board0.create('text', [
  function() { if (t2.X() > t1.X()) { return t1.X() + (t2.X() - t1.X())/2 - 1.5; } 
         return t1.X() + (t2.X() - t1.X())/2 + 0.2; },
  function() { return (d(t2.X()) - d(t1.X()))/2 + d(t1.X()); },
  'slope = rate'], {fontSize:12, visible:false});

var distanceOn = false;
var turnOffDistance = function() {
  d1.setAttribute({visible:false});
  d2.setAttribute({visible:false});
  dline.setAttribute({visible:false});
  drise.setAttribute({visible:false});
  driseText.setAttribute({visible:false});
  drun.setAttribute({visible:false});
  drunText.setAttribute({visible:false});
  dslopeText.setAttribute({visible:false});
}

var turnOnDistance = function() {
  d1.setAttribute({visible:true});
  d2.setAttribute({visible:true});
  dline.setAttribute({visible:true});
  drise.setAttribute({visible:true});
  driseText.setAttribute({visible:true});
  drun.setAttribute({visible:true});
  drunText.setAttribute({visible:true});
  dslopeText.setAttribute({visible:true});
}

var s1 = board0.create('point', [
    function() { return t1.X(); },
    s 
  ], {name:'', fixed:true, visible:false});

var s2 = board0.create('point', [
    function() { return t2.X(); },
    s
  ], {name:'', fixed:true, visible:false});

var srect = board0.create('polygon',[t1,s1,s2,t2],{fillColor:'#7700FF',visible:false});

var slengthText = board0.create('text', [
  function() { return t1.X() + (t2.X() - t1.X())/2 - 0.3; },
  function() { return speed + 0.3; },
  'time'], {fontSize:12, visible:false});

var sheightText = board0.create('text', [
  function() { if (t2.X() > t1.X()) { return t2.X() + 0.2; } 
                  return t2.X() - 0.3; },
  function() { return speed/2; },
  'rate'], {fontSize:12, visible:false});

var sareaText = board0.create('text', [
  function() { return t1.X() + (t2.X() - t1.X())/2 - 0.3; },
  function() { return speed/2 + 0.2; },
  'distance'], {fontSize:12, visible:false});

var speedOn = false;
var turnOffSpeed = function() {
  srect.setAttribute({visible:false});
  slengthText.setAttribute({visible:false});
  sheightText.setAttribute({visible:false});
  sareaText.setAttribute({visible:false});
}

var turnOnSpeed = function() {
  srect.setAttribute({visible:true});
  slengthText.setAttribute({visible:true});
  sheightText.setAttribute({visible:true});
  sareaText.setAttribute({visible:true});
}

this.dependOn = ['Speed','distanceToggle','speedToggle'];
this.depend = function() {
  if (env.distanceToggle == true) {
    if (distanceOn) { 
      turnOffDistance();
      distanceOn = false;
    }
    else {
      turnOnDistance();
      distanceOn = true;
    }
    smartdown.setVariable('distanceToggle',false);
  }
    
  if (env.speedToggle == true) {
    if (speedOn) { 
      turnOffSpeed();
      speedOn = false;
    }
    else {
      turnOnSpeed();
      speedOn = true;
    }
    smartdown.setVariable('speedToggle',false);
  }

  board0.suspendUpdate();
  speed = parseFloat(env.Speed);
  board0.unsuspendUpdate();
};

````
[show slope](:=distanceToggle=true) [show area](:=speedToggle=true) Rate [](:-Speed/0/3/0.1) [](:!Speed)

# :::: instructions1
- Drag the red and green dots to the left and the right to adjust the time period. 
- Click the buttons!
- Use the slider to adjust the speed.
# ::::

So slopes and areas are two different geometric ways of expressing the same relationship.  They are inverses, just like the multiplicaton and division that they model.  It's both obvious and at the same time strangely a lot to take in.  It's easy to see that the value of *time* is the same in both cases.  The value of *rate* is also the same, though in one case it's a slope and in the other is a vertical length.  Similarly, the values of *distance* are also the same.  In one case it's a vertical length and in the other its a two dimensional area.  Understanding this geometric relationship is at the heart of calculus and is the heart of the Fundamental Theorem of Calculus.  One goal for my interactive app is that students understand this relationship and can feel it in their gut. 


## Adding More Areas and Slopes

Here are two pictures showing an object that is moving in space.  [see object move](:=play=true)
The picture on the right shows the object moving up and down in space.  The picture on the left is a graph that shows the change in position over time.  Imagine we pick two points on the curve. [show points](:=distanceToggle2=true) The slope of the line through these points tells us the average speed traveled during that time period.  **There is always a corresponding rectangle that expresses the distance traveled as the product of the rate and the time.** [show area](:=speedToggle2=true) It's just two different geometric ways of expressing the same relationship. We can do this for multiple time periods. [multiple periods](:=toggleArray=true) We can make the time periods smaller. [10 time periods](:=segments=10)

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box2' class='jxgbox' style='height:500px;'>`;

myDiv.innerHTML = `<div id='left' style='height:500px; width:80%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:500px; width:19%; float:left; border: 1px solid gray;background:#CCEEFF;border-radius:8px;';></div>`;

let workspaceDivWidth = 0.80;
let pictureDivWidth = 0.19;
let pictureDivHeight = 500;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board1 = JXG.JSXGraph.initBoard('left', {boundingbox:[-1,16,8,-4], keepaspectratio:false, axis:false});

var xaxis = board1.create('axis', [[0, 0], [1,0]], 
      {name:'t', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-20, 20]   // (in pixels)
      }
      });
var yaxis = board1.create('axis', [[0, 0], [0, 1]], 
      {name:'d', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });   


var d = function(t) { return Math.pow(t-4,4)/8 - 2 * (t-4) * (t-4) + 12; };
var d_graph = board1.create('functiongraph', [d,0,8], {strokeColor:'#DDDDDD', strokeWidth:2});
var dText = board1.create('text', [1.5,7, 'Curve A']);
var s = function(t) { return 4 * Math.pow(t-4,3)/8 - 4 * (t-4); }
var s_graph = board1.create('functiongraph', [s,0,8], {strokeColor:'purple', strokeWidth:4, visible:false});
var sText = board1.create('text', [1.5,-2, 'Curve B'],{visible:false});
let t = board1.create('point', [0,0], {visible:false});
var p = board1.create('point', [
  function() { return t.X(); }, 
  function() { return d(t.X()); }], {color:'blue', name:''});

var tinylines = board1.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:false}); 
tinylines.updateDataArray = function() { 

    let delta = 8/N;
    let x = [];
    let y = [];
    for (let i=0; i <= 8.01; i += delta) {
        x.push(i);
        y.push(d(i));
    }
    this.dataX = x;
    this.dataY = y;
};


var rectangles = board1.create('curve', [[0],[0]],{fillColor:'#7700FF', fillOpacity:0.3, visible:false});
rectangles.updateDataArray = function() {

    let delta = 8/N;
    let x = [0];
    let y = [0];
    for (let i=0; i < 8; i += delta) {
        let slope = (d(i + delta) - d(i)) / delta ;
        x.push(i);  // four points of our rectangle
        y.push(slope);

        x.push(i + delta);
        y.push(slope);

        x.push(i + delta);
        y.push(0);
    }
    this.dataX = x;
    this.dataY = y;
};

var t1 = board1.create('point', [2, 0], {name: '', size:3, color:'blue', visible:false});
var t2 = board1.create('point', [4, 0], {name: '', size:3, color:'blue', visible:false});

var d1 = board1.create('point', [
    function() { return t1.X(); },
    function() { return d(t1.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var d2 = board1.create('point', [
    function() { return t2.X(); },
    function() { return d(t2.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var dline = board1.create('line', [d1, d2], {strokeColor:'blue', straightFirst:false, straightLast:false, visible:false});

var d3 = board1.create('point', [
    function() { return t2.X(); },
    function() { return d(t1.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var drise = board1.create('line', [d3, d2], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});
var drun = board1.create('line', [d1, d3], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});

var driseText = board1.create('text', [
  function() { if (t2.X() > t1.X()) { return t2.X() + 0.1; } 
         return t2.X() - 0.3; },
  function() { return (d(t2.X()) - d(t1.X()))/2 + d(t1.X()); },
  'd'], {fontSize:12, visible:false});

var drunText = board1.create('text', [
  function() { return t1.X() + (t2.X() - t1.X())/2; },
  function() { if (t2.X() > t1.X()) { return d(t1.X()) - 0.5;} 
                return d(t1.X()) + 0.10; },
  't'], {fontSize:12, visible:false});

var dslopeText = board1.create('text', [
  function() { if (t2.X() > t1.X()) { return t1.X() + (t2.X() - t1.X())/2 - 0.5; } 
         return t1.X() + (t2.X() - t1.X())/2 + 0.2; },
  function() { return (d(t2.X()) - d(t1.X()))/2 + d(t1.X()); },
  'slope = r'], {fontSize:12, visible:false});

var slope = (d(t2.X()) - d(t1.X())) / (t2.X() - t1.X());
var s1 = board1.create('point', [t1.X(), slope], {name:'', fixed:true, visible:false});

var s2 = board1.create('point', [t2.X(), slope], {name:'', fixed:true, visible:false});

var srect = board1.create('polygon',[t1,s1,s2,t2],{fillColor:'#7700FF',visible:false});

var slengthText = board1.create('text', [t1.X() + (t2.X() - t1.X())/2, slope + 0.8, 't'], {fontSize:12, visible:false});

var sheightText = board1.create('text', [t2.X() + 0.1, slope/2, 'r'], {fontSize:12, visible:false});

var sareaText = board1.create('text', [ t1.X() + (t2.X() - t1.X())/2,  slope/2 + 0.2, 'd'], {fontSize:12, visible:false});


let board2 = JXG.JSXGraph.initBoard('right', {boundingbox:[-1,16,2,-4], keepaspectratio:false, axis:false});

var board2Yaxis = board2.create('axis', [[0, 0], [0, 1]], 
      {name:'d', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });  

var board2Xaxis = board2.create('axis', [[0, 0], [1,0]], 
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

board1.addChild(board2);

var p2 = board2.create('point', [
  1.2, 
  function() { return p.Y(); }], {color:'blue', name:'', size:6});

// let rocketurl = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/cab590371e4346929cf9096e53d163e772e1d132/rocket.png';
// let rocket = board1.create('image',[rocketurl, [0.9,function() { return workspace.getArea() - 3000; }], [0.2,3000]]);

// let p2 = board1.create('point',[1.2, 0],{visible:true});
// let p3 = board1.create('point',[1.2, function() { return workspace.getArea(); }],{visible:false});

// let dimensionLine = board1.create('segment', [p2,p3], {
//   strokeColor:'#999999', 
//   strokeWidth:2, 
//   firstArrow:true, 
//   lastArrow:true, 
//   visible:true});

// let dimensionText = board1.create('text', [
//   1.3,
//   function () { return workspace.getArea() / 2; },
//   function() { return workspace.getArea().toFixed(0); }
// ],{ strokeColor:'#999999', fontSize: 15, visible:true});


smartdown.setVariable('segments', 3);
var N = 3;
var oldN = 3;
smartdown.setVariable('distanceToggle2', false);
smartdown.setVariable('speedToggle2', false);
smartdown.setVariable('toggleArray', false);
smartdown.setVariable('toggleCurveB', false);
smartdown.setVariable('play', false);
var speedOn = false;
var distanceOn = false;


this.sizeChanged = function() {     
  board1.resizeContainer(myDiv.offsetWidth * workspaceDivWidth, pictureDivHeight);
  board2.resizeContainer(myDiv.offsetWidth * pictureDivWidth, pictureDivHeight);
};

var move = function() { 
  t.moveTo([8,0],1000, {effect: '--', callback: function() {  t.moveTo([0,0]); } } ); 
};

// get the number of triangles from smartdown cell
this.dependOn = ['segments','distanceToggle2','speedToggle2', 'toggleArray', 'toggleCurveB', 'play'];
this.depend = function() {

  board1.suspendUpdate();

  if (env.play == true) {
    smartdown.setVariable('play', false);
    move();

  }

  if (env.distanceToggle2 == true && env.toggleArray == false) {
    d1.setAttribute({visible:true});
    d2.setAttribute({visible:true});
    drise.setAttribute({visible:true});
    drun.setAttribute({visible:true});
    dline.setAttribute({visible:true});
    driseText.setAttribute({visible:true});
    drunText.setAttribute({visible:true});
    dslopeText.setAttribute({visible:true});
  }
  
  if (env.speedToggle2 == true && env.toggleArray == false) {
    smartdown.setVariable('segments', 4);
  }

  if (env.toggleArray == true) {
    tinylines.setAttribute({visible:true});
    rectangles.setAttribute({visible:true});
    d1.setAttribute({visible:false});
    d2.setAttribute({visible:false});
  }

  var P = parseInt(env.segments);
  if (P != N) {
    oldN = N;
    N = P;    
  }
  
  if (N == 4) {
    drise.setAttribute({visible:true});
    drun.setAttribute({visible:true});
    dline.setAttribute({visible:true});
    driseText.setAttribute({visible:true});
    drunText.setAttribute({visible:true});
    dslopeText.setAttribute({visible:true});
    srect.setAttribute({visible:true});
    slengthText.setAttribute({visible:true});
    sheightText.setAttribute({visible:true});
    sareaText.setAttribute({visible:true});
  }
  else {
    if (oldN == 4) {
      drise.setAttribute({visible:false});
      drun.setAttribute({visible:false});
      dline.setAttribute({visible:false});
      driseText.setAttribute({visible:false});
      drunText.setAttribute({visible:false});
      dslopeText.setAttribute({visible:false});
      srect.setAttribute({visible:false});
      slengthText.setAttribute({visible:false});
      sheightText.setAttribute({visible:false});
      sareaText.setAttribute({visible:false});
    }
  }

  if (env.toggleCurveB == true) {
    s_graph.setAttribute({visible:true});
    sText.setAttribute({visible:true});
  }

  board1.unsuspendUpdate();
};


```
Number of Time Periods [](:-segments/1/100/1) [](:!segments) [Application Instructions](::instructions2/tooltip)


# :::: instructions2
Drag the slider to the left and right.
# ::::

As the time periods get very small, the rectangles define a new function that relates to our original curve.  It's related by the function $d = r \cdot t$.  [show rectangle curve](:=toggleCurveB=true) This function gives the height of our rectangles. Remember that the height of each skinny rectangle is the average speed the object travels during a very short time period.  As these rectangles get skinnier, this new curve becomes our speed curve.

So this gives you a small glimpse of how this idea might be developed.  It would need to be developed more slowly together with motivation for why you might be interested in slopes and areas in the first place and how slopes and areas relate to a function.  But this is the nucleus of an idea.





