# :::: tour2
# --partialborder 
The **distance** traveled by the object is equal to the **rate** times the **time**, $d = r \times t.$ We know two different geometric ways of showing this relationship.  [show relationship](:=showSR=true) The slope of the secant tells us the average velocity between two time points.  The corresponding rectangle expresses the distance traveled as the product of the rate and the time.
[next](:=show3=true) 
# --partialborder 
# ::::

# :::: tour3
# --partialborder 
We can make more secants and rectangles over more intervals. [more intervals](:=showArray=true). What happens when these time intervals get smaller?
number of intervals [](:-segments/1/100/1) [](:!segments) 
[next](:=show4=true)
# --partialborder 
# ::::

# :::: tour4
# --partialborder 
The rectangles define a new function that relates to our original curve. [show shadow curve](:=showD=true)  Remember that the height of each skinny rectangle is the average velocity the object travels during a very short time period.  As these rectangles get skinnier, this new curve becomes our velocity curve.
number of intervals [](:-segments/1/100/1) [](:!segments)
[Continue](/pages/shadowSecantCurve)
# --partialborder 
# ::::

### The Shadow Rectangle Curve 
[notes](:=show2=true)[see object move](:=play=true) Here is an object moving in space. 

$$\lim_{n \to \infty} \sum_{i=1}^{n} f(x_{i-1})(x_i - x_{i-1})$$

$$ \int_a^b f(x)dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_{i-1})(x_i - x_{i-1})$$

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
let ylow = -4;
let yhigh = 16;


let workspace = new Workspace('left', [xlow,yhigh,xhigh,ylow],  
  { xlabel:'time (s)', ylabel:'position (m)', colorTheme:'steel'});
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
var s_graph = workspace.board.create('functiongraph', [s,0,8], {strokeColor:'#4499FF', strokeWidth:4, visible:false});




let board2 = JXG.JSXGraph.initBoard('right', {boundingbox:[-1,16,2,-4], keepaspectratio:false, axis:false, showCopyright:false, showNavigation:false});

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
  function() { return p.Y(); }], {color:orange, name:'', size:6});



let widthPercent = 0.8;
let heightPercent = 0.7;
let widthRatio = 1/6;

this.sizeChanged = function() {     
  workspace.board.resizeContainer((1 - widthRatio - 0.02) * window.innerWidth * widthPercent, window.innerHeight * heightPercent);
  board2.resizeContainer(widthRatio * window.innerWidth * widthPercent,  window.innerHeight * heightPercent);
};


this.sizeChanged();


let move = function() { 
  t.moveTo([8,0],1000, {effect: '--', callback: function() {  t.moveTo([0,0]); } } ); 
};

smartdown.setVariable('play', false);
smartdown.setVariable('show2', false);
smartdown.setVariable('segments', 4);
smartdown.setVariable('showSR', false);
smartdown.setVariable('show3', false);
smartdown.setVariable('showArray', false);
smartdown.setVariable('show4', false);
smartdown.setVariable('showD', false);

// get the number of triangles from smartdown cell
this.dependOn = ['play', 'segments', 'show2', 'showSR', 'show3', 'showArray', 'show4', 'showD'];
this.depend = function() {



  if (env.play == true) {
    smartdown.setVariable('play', false);
    move();

  }

  if (env.segments != N) {
    N = env.segments;
    secRectArray.slider.setValue(N);
    SR.hide();
  }

  if (env.show2 == true) {
    smartdown.setVariable('show2',false);
    smartdown.showDisclosure('tour2','','transparent,outline,draggable,closeable,topright,shadow');
    smartdown.hideDisclosure('tour3','','');
    smartdown.hideDisclosure('tour4','','');
  }

  if (env.showSR == true) {
    SR.show();
    smartdown.setVariable('showSR', false);
  }

  if (env.show3 == true) {
    smartdown.setVariable('show3',false);
    smartdown.showDisclosure('tour3','','transparent,outline,draggable,closeable,topright,shadow');
    smartdown.hideDisclosure('tour2','','');
  }


  if (env.showArray == true) {
    secRectArray.show();
    smartdown.setVariable('showArray', false);
  }

  if (env.show4 == true) {
    smartdown.setVariable('show4',false);
    smartdown.showDisclosure('tour4','','transparent,outline,draggable,closeable,topright,shadow');
    smartdown.hideDisclosure('tour3','','');
    smartdown.showDisclosure('toolbar','','transparent');
  }

  if (env.showD == true) {
    smartdown.setVariable('showD', false);
    s_graph.setAttribute({visible:true});
  }
};


```




