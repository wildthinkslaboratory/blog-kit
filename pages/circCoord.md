# :::: intro
# --outlinebox int
### Circular Coordinates
This interactive is based on a [blog post](https://www.johndcook.com/blog/2020/11/09/some-mathematical-art/) by John D. Cook.  It's a parametric plot using **circular coordinates** as described in the article [Circular Coordinates and Computer Drawn Designs](https://www.tandfonline.com/doi/abs/10.1080/0025570X.1979.11976777) by Elliot Tanis and Lee Kuivinen. 

Given a function $f(t)$, we plot
$$x(t) = \frac{2t(f(t))^2}{t^2 + f(t)^2}$$
$$y(t) = \frac{2t^2f(t)}{t^2 + f(t)^2}$$

Play around and see what you can make.  
# --outlinebox
# ::::

# :::: formatting
# --outlinebox tips
##### Formatting Tips for Functions
Enter a single variable function using variable `x`.  Functions need to be written in javascript.  You can use parentheses `()`, the standard arithmetic operators `+`, `-`, `*`, and `\` and also javascript `Math` functions.

| Expression  | Javascript |
| ----------- | ----------- |
| $x^2 + 10x$          | `x * x + 10 * x`       |
| $x^5$                | `Math.exp(x,5)`      |
| $\frac{\sin(x)}{x}$  | `Math.sin(x) / x`    |

You can find a list of javascript **Math** functions [here](https://www.w3schools.com/jsref/jsref_obj_math.asp).
# --outlinebox
# ::::

# :::: panel
# --aliceblue panelbox
[new colors](:=newColors=true) [redraw curves](:=redraw=true) [export image](:=download=true) show axes[](:XshowAxes)
function $f$: [](:?curveFunction) [formatting tips](:=showTips=true)
number of curves (max 50): [](:?numberCurves|number)
[](:?tLow|number) $ < t < $ [](:?tHigh|number) 
# --aliceblue
# ::::

```javascript /autoplay/kiosk
//smartdown.import=//cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
//smartdown.import=/assets/libs/colorscheme.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');


//////////////////////////////////////////////////////////////////////////////////////////////////


smartdown.showDisclosure('intro','','transparent,topright,closeable,draggable,shadow,outline');
smartdown.showDisclosure('panel','','bottomleft,draggable,shadow');

// set up the div and the page
const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

let numCurves = 10;
let t1 = -20;
let t2 = 20;
let curves = [];
let fstring = 'Math.tan(x)';

board = JXG.JSXGraph.initBoard('box', {
  axis:false, 
  keepaspectratio:true, 
  boundingbox:[-20,10,20,-10],
  showCopyright:false
});

let xaxis = board.create('axis', [[0, 0], [1,0]], {visible:false});
let yaxis = board.create('axis', [[0, 0], [0, 1]], {visible:false});

let cs = new SmoothColorScheme(0,255,1);

function draw() {
  curves = [];
  let colorJump = cs.numberColors() / (2 * numCurves);

  const start = - Math.floor(numCurves/2);
  const end = Math.ceil(numCurves/2);
  console.log(numCurves, start, end);
  for (let i=start; i < end; i++) {
    let ftemp = function(t) { return Math.sin(t) + i; }
    let f = new Function('x', 'return ' + fstring + ' + ' + i + ';');
    let xt = function(t) { return (2 * t * f(t) * f(t)) / (t * t + f(t) * f(t)); }
    let yt = function(t) { return (2 * t * t * f(t)) /    (t * t + f(t) * f(t)); }
    let color = cs.getColor();
    for (let j=0; j < colorJump-1; j++) { cs.bigInc(); }
    curves.push(board.create('curve',[ xt, yt, t1, t2], {strokeColor:color,strokeWidth:2}));
  }
}


function clear() {
  board.removeObject(curves);
}

this.sizeChanged = function() {
  board.resizeContainer(window.innerWidth, window.innerHeight);
};

this.sizeChanged();

draw();

smartdown.setVariable('download', false);
smartdown.setVariable('redraw', false);
smartdown.setVariable('newColors', false);
smartdown.setVariable('showTips', false);
smartdown.setVariable('imageForDownload', '');
smartdown.setVariable('tLow', t1);
smartdown.setVariable('tHigh', t2);
smartdown.setVariable('numberCurves', numCurves);
smartdown.setVariable('curveFunction', fstring);
smartdown.setVariable('showAxes', true);

this.dependOn = ['download', 'redraw', 'newColors', 'showTips', 'showAxes'];
this.depend = function() {

  if (env.download == true) {
    smartdown.setVariable('download', false);
    const svgText = new XMLSerializer().serializeToString(board.renderer.svgRoot);
    //smartdown.setVariable('imageForDownload', png);
    // store in a Blob
    const blob = new Blob([svgText], { type: "image/svg+xml" });
    // create an URI pointing to that blob
    const url = URL.createObjectURL(blob);
    const win = open(url);
    // so the Garbage Collector can collect the blob
    win.onload = (evt) => URL.revokeObjectURL(url);


  }
  else {

    if (env.showAxes == true) {
      xaxis.setAttribute({'visible':true});
      yaxis.setAttribute({'visible':true});
    }
    else {
      xaxis.setAttribute({'visible':false});
      yaxis.setAttribute({'visible':false});
    }
    if (env.showTips == true) {
      smartdown.setVariable('showTips', false);
      smartdown.showDisclosure('formatting','','transparent,center,closeable,draggable,shadow,outline');
    }
    if (env.newColors == true) {
      smartdown.setVariable('newColors', false);
      cs = new SmoothColorScheme(0,255,1);
      clear();
      draw();
    }
    if (env.redraw == true) {
      smartdown.setVariable('redraw', false);
      t1 = env.tLow;
      t2 = env.tHigh;
      numCurves = Math.floor(env.numberCurves);
      numCurves = Math.min(numCurves, 50);
      numCurves = Math.max(numCurves, 1);
      smartdown.setVariable('numberCurves', numCurves);
      fstring = env.curveFunction;
      clear();
      cs.reset();
      draw();
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////


```
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
