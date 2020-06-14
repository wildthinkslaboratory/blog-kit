### The Chain Rule
So you know what the chain rule is and you know how to use it, but why does it work? We're going to work through an example and build some intuition.

# --outlinebox problem
**Problem:**
Find the derivative of $f(x) = \sin(x^2)$. 
# --outlinebox
We know that the function $f$ can be viewed as the composition of the two functions $g(x) = \sin(x)$ and $k(x) = x^2$, and we know how to take the derivative of both of these functions and apply the chain rule.  But instead let's go back and try using the definition of the derivative
$$f'(x)  =  \lim_{h \to 0}\frac{f(x+h) - f(x)}{h}.$$
For our particular function $f(x) = \sin(x^2)$, that means
$$f'(x) = \lim_{h \to 0}\frac{\sin((x + h)^2) - \sin(x^2)}{h}$$
How do we evaluate this limit?  What happens as $h$ gets very small? Next, we do some algebra on our limit.
$$
\begin{align}
f'(x) & = \lim_{h \to 0}\frac{\sin((x + h)^2) - \sin(x^2)}{h}  & \text{definition of derivative} \newline
& = \lim_{h \to 0}\frac{\sin((x + h)^2) - \sin(x^2)}{h} \cdot   \frac{(x+h)^2 - x^2}{(x+h)^2 - x^2} & \text{multiply by 1} \newline 
& = \lim_{h \to 0}\frac{\sin((x + h)^2) - \sin(x^2)}{(x+h)^2 - x^2} \cdot \frac{(x+h)^2 - x^2}{h}  & \text{assoc. prop. of multiplication}
\end{align}
$$
Now we have a limit that we can work with. We've taken the normal expression for the secant line
$$\frac{\sin((x + h)^2) - \sin(x^2)}{h}$$
and expressed it as the product of two new secant lines
$$\frac{\sin((x + h)^2) - \sin(x^2)}{(x+h)^2 - x^2} \cdot \frac{(x+h)^2 - x^2}{h} $$
Let's take a look at each of these three secant lines to see what's going on.
```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='leftCR' style='height:300px; width:32%; float:left; margin:1%; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='middleCR' style='height:300px; width:33%; float:left; margin:1%; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div></div><div id='rightCR' style='height:300px; width:33%; float:left; margin:1%; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div>`;


JXG.Options.text.useMathJax = true;

let xlow = -0.5;
let xhigh = 3.5;

//////////////////////////////////////////////////////////////////////////////////

// BOARD 1 

//////////////////////////////////////////////////////////////////////////////////
board1 = JXG.JSXGraph.initBoard('leftCR', {boundingbox:[xlow,2,xhigh,-2], showCopyright:false, keepaspectratio:false, axis:false});

///////////////////////////////////////////////////////    axes

let xaxis = board1.create('axis', [[0, 0], [1,0]], 
      {name:'x', 
      withLabel: false,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-20, 20]   // (in pixels)
      }
      });
xaxis.removeAllTicks();
board1.create('ticks', [xaxis, 1], {
  majorHeight:10, 
  strokeColor:'#AAA',
  drawLabels:true, 
  minorTicks:0
 }
);
let yaxis = board1.create('axis', [[0, 0], [0, 1]], 
      {name:'y', 
      withLabel: false, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });   
yaxis.removeAllTicks();
board1.create('ticks', [yaxis, 1], {
  majorHeight:10, 
  strokeColor:'#AAA',
  drawLabels:true, 
  minorTicks:0
 }
);


///////////////////////////////////////////////////////    SECANT

let title = board1.create('text',[
  0.6 * (xhigh - xlow) + xlow,
  1 * 4 - 2,
  function() { 
    return '\\[f(x) = \\sin(x^2)\\]';
  }], {fontSize:18});


let f = function(x) { return  Math.sin(x*x); };
let x = board1.create('point', [1,0], {name:'\\[x\\]', color:'#666688', fixed:true, size:6});
let fx = board1.create('point', [
  function() { return x.X(); }, 
  function() { return f(x.X()); }], 
  {name:'', color:'#666688', fixed:true});

let graph_f = board1.create('functiongraph', [f,-10,10], {strokeColor:'#BBBBBB'});

let start_x_h = 0.65;

let x_h = board1.create('glider', 
  [x.X() + start_x_h, 0, xaxis], 
  {name:'\\[x + h\\]', size:6, color:'#EE5511', visible:true} ); 

let fx_h = board1.create('point', [
  function() { return x_h.X(); }, 
  function() { return f(x_h.X()); }], 
  {name:'', color:'#666688', fixed: true, size:3, visible:true});

let secant = board1.create('line', [fx, fx_h], {color:'#BBBBBB', strokeWidth:1, visible:true});
let segment = board1.create('segment', [fx, fx_h], {color:'#666688', strokeWidth:3, visible:true});

let secantSlope = function() { 
  if (x.X() == x_h.X()) { return "undef"; }
  return ((f(x.X()) - f(x_h.X()))/(x.X() - x_h.X())).toFixed(2).toString(); 
}


let secantSlopeText = board1.create('text',[
  function() { return x.X() + (x_h.X() - x.X())/2 - 0.9; },
  function() { return (f(x_h.X()) - f(x.X()))/2 + f(x.X()) - 0.1; },
  function(){ return 'slope = '+ secantSlope(); }], 
  {fontSize:12, visible:true});

let p = board1.create('point', [ 
  function() { return x_h.X(); }, 
  function() { return f(x.X());}], {visible:false});


let rise = board1.create('segment', 
  [fx_h, p], 
  {color:'black', strokeWidth:1, dash:2});

let run = board1.create('segment', 
  [fx, p], 
  {color:'black', strokeWidth:1, dash:2});

let riseText = board1.create('text', [
  function() { if (x_h.X() > x.X()) { return x_h.X() + 0.1; } 
         return x_h.X() - 1.5; },
  function() { return (f(x_h.X()) - f(x.X()))/2 + f(x.X()) + 0.3; },
  function() { return '\\[\\sin((x+h)^2) - \\sin(x^2)\\]'; }], 
  {fontSize:12, visible:false});

let runText = board1.create('text', [
  function() { return x.X() + (x_h.X() - x.X())/2; },
  function() { return f(x.X()) + 0.2; },
  'h'], {fontSize:12, visible:false});

let triangle = board1.create('polygon', [fx, fx_h, p], {
  fillColor:'#55DDFF', 
  fillOpacity: 50,
  borders: {strokeColor: 'yellow'}, 
  strokeWidth:3, visible:false});

let triangleOn = function() {
  triangle.setAttribute({visible:true});
  riseText.setAttribute({visible:true});
  runText.setAttribute({visible:true});
};

let triangleOff = function() {
  triangle.setAttribute({visible:false});
  riseText.setAttribute({visible:false});
  runText.setAttribute({visible:false});
};

window.triangleOff = triangleOff;
window.triangleOn  = triangleOn;


// board1.on('update', function() {
//   const xFloor = Math.floor(x.X());
//   if ((x.X() - xFloor) < 0.2) {
//     x.moveTo([xFloor, 0]);
//     return;
//   }
//   const xCeil = Math.ceil(x.X());
//   if ((xCeil - x.X()) < 0.2) {
//     x.moveTo([xCeil, 0]);
//     return;
//   }  
// });


//////////////////////////////////////////////////////////////////////////////////

// BOARD 2 

//////////////////////////////////////////////////////////////////////////////////

board2 = JXG.JSXGraph.initBoard('rightCR', {boundingbox:[xlow,11,xhigh,-4], showCopyright:false, keepaspectratio:false, axis:false});
board1.addChild(board2);

///////////////////////////////////////////////////////    axes

let xaxis2 = board2.create('axis', [[0, 0], [1,0]], 
      {name:'x', 
      withLabel: false,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-20, 20]   // (in pixels)
      }
      });
xaxis2.removeAllTicks();
board2.create('ticks', [xaxis2, 1], {
  majorHeight:10, 
  strokeColor:'#AAA',
  drawLabels:true, 
  minorTicks:0
 }
);
let yaxis2 = board2.create('axis', [[0, 0], [0, 1]], 
      {name:'y', 
      withLabel: false, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });   
yaxis2.removeAllTicks();
board2.create('ticks', [yaxis2, 1], {
  majorHeight:10, 
  strokeColor:'#AAA',
  drawLabels:true, 
  minorTicks:0
 }
);

///////////////////////////////////////////////////////    SECANT 2

let title2 = board2.create('text',[
  0.6 * (xhigh - xlow) + xlow,
  1 * 15 - 4,
  function() { 
    return '\\[k(x) = x^2\\]';
  }], {fontSize:18});


let f2 = function(x) { return  x * x; };
let x2 = board2.create('point', [1,0], {name:'\\[x\\]', color:'#666688', fixed:true, size:6});
let fx2 = board2.create('point', [
  function() { return x2.X(); }, 
  function() { return f2(x.X()); }], 
  {name:'', color:'#666688', fixed:true});

let graph_f2 = board2.create('functiongraph', [f2,-10,10], {strokeColor:'#BBBBBB'});

let x_h2 = board2.create('point', [
	function() { return x_h.X(); }, 
	0], 
  {name:'\\[x + h\\]', size:6, color:'#666688', visible:true} ); 

let fx_h2 = board2.create('point', [ 
  function() { return x_h.X(); }, 
  function() { return f2(x_h.X()); }], 
  {name:'', color:'#666688', fixed: true, size:3, visible:true});

let secant2 = board2.create('line', [fx2, fx_h2], {color:'#BBBBBB', strokeWidth:1, visible:true});
let segment2 = board2.create('segment', [fx2, fx_h2], {color:'#666688', strokeWidth:3, visible:true});


let secantSlope2 = function() { 
  if (x2.X() == x_h2.X()) { return "undef"; }
  return ((f2(x2.X()) - f2(x_h2.X()))/(x2.X() - x_h2.X())).toFixed(2).toString(); 
}


let secantSlopeText2 = board2.create('text',[
  function() { return x2.X() + (x_h2.X() - x2.X())/2 - 0.9; },
  function() { return (f2(x_h2.X()) - f2(x2.X()))/2 + f2(x2.X()); },
  function(){ return 'slope = '+ secantSlope2(); }], 
  {fontSize:12, visible:true});


let p2 = board2.create('point', [ 
  function() { return x_h2.X(); }, 
  function() { return f2(x2.X());}], 
  {visible:false});


let rise2 = board2.create('segment', 
  [fx_h2, p2], 
  {color:'black', strokeWidth:1, dash:2});

let run2 = board2.create('segment', 
  [fx2, p2], 
  {color:'black', strokeWidth:1, dash:2});

let riseText2 = board2.create('text', [
  function() { if (x_h2.X() > x2.X()) { return x_h2.X() + 0.1; } 
         return x_h2.X() - 1.5; },
  function() { return (f2(x_h2.X()) - f2(x2.X()))/2 + f2(x2.X()) + 1; },
  function() { return '\\[(x+h)^2 - x^2\\]'; }], 
  {fontSize:12, visible:false});

let runText2 = board2.create('text', [
  function() { return x2.X() + (x_h2.X() - x2.X())/2; },
  function() { return f2(x2.X()) - 0.2; },
  'h'], {fontSize:12, visible:false});

let triangle2 = board2.create('polygon', [fx2, fx_h2, p2], {
  fillColor:'#55DDFF', 
  fillOpacity: 50,
  borders: {strokeColor: 'yellow'}, 
  strokeWidth:3, visible:false});

let triangle2On = function() {
  triangle2.setAttribute({visible:true});
  riseText2.setAttribute({visible:true});
  runText2.setAttribute({visible:true});
};

let triangle2Off = function() {
  triangle2.setAttribute({visible:false});
  riseText2.setAttribute({visible:false});
  runText2.setAttribute({visible:false});
};

window.triangle2Off = triangle2Off;
window.triangle2On  = triangle2On;


//////////////////////////////////////////////////////////////////////////////////

// BOARD 3 

//////////////////////////////////////////////////////////////////////////////////


board3 = JXG.JSXGraph.initBoard('middleCR', {boundingbox:[xlow - 1,2,f2(xhigh),-2], showCopyright:false, keepaspectratio:false, axis:false});
board1.addChild(board3);

///////////////////////////////////////////////////////    axes

let xaxis3 = board3.create('axis', [[0, 0], [1,0]], 
      {name:'x', 
      withLabel: false,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-20, 20]   // (in pixels)
      }
      });
xaxis3.removeAllTicks();
board3.create('ticks', [xaxis3, 1], {
  majorHeight:10, 
  strokeColor:'#AAA',
  drawLabels:true, 
  minorTicks:0
 }
);
let yaxis3 = board3.create('axis', [[0, 0], [0, 1]], 
      {name:'y', 
      withLabel: false, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });   
yaxis3.removeAllTicks();
board3.create('ticks', [yaxis3, 1], {
  majorHeight:10, 
  strokeColor:'#AAA',
  drawLabels:true, 
  minorTicks:0
 }
);

///////////////////////////////////////////////////////    SECANT

let title3 = board3.create('text',[
  0.6 * (f2(xhigh) - xlow) + xlow,
  1 * 4 - 2,
  function() { return '\\[g(x) = \\sin(x)\\]'; }],
  {fontSize:18});

let f3 = function(x) { return  Math.sin(x); };
let x3 = board3.create('point', [f2(x.X()),0], { name:'\\[x^2\\]', color:'#666688', fixed:true, size:6});
let fx3 = board3.create('point', [
  function() { return x3.X(); }, 
  function() { return f3(x3.X()); }], {name:'', color:'#666688', fixed:true});
let graph_f3 = board3.create('functiongraph', [f3,xlow-1,f2(xhigh)], {strokeColor:'#BBBBBB'});

let x_h3 = board3.create('point', [
	function() { return f2(x_h.X()); }, 
	0], 
  {name:'\\[(x+h)^2\\]', size:6, color:'#666688', visible:true} ); 
 
let fx_h3 = board3.create('point', [ 
  function() { return x_h3.X(); }, 
  function() { return f3(x_h3.X()); }], 
  {name:'', color:'#666688', fixed: true, size:3, visible:true});

let secant3 = board3.create('line', [fx3, fx_h3], {color:'#BBBBBB', strokeWidth:1,  visible:true});
let segment3 = board3.create('segment', [fx3, fx_h3], {color:'#666688', strokeWidth:3, visible:true});


let secantSlope3 = function() { 
  if (x3.X() == x_h3.X()) { return "undef"; }
  return ((f3(x3.X()) - f3(x_h3.X()))/(x3.X() - x_h3.X())).toFixed(2).toString(); 
}


let secantSlopeText3 = board3.create('text',[
  function() { return x3.X() + (x_h3.X() - x3.X())/2 - 3; },
  function() { return (f3(x_h3.X()) - f3(x3.X()))/2 + f3(x3.X()) - 0.1; },
  function(){ return 'slope = '+ secantSlope3(); }], 
  {fontSize:12, visible:true});


let p3 = board3.create('point', [ 
  function() { return x_h3.X(); }, 
  function() { return f3(x3.X());}], 
  {visible:false});


let rise3 = board3.create('segment', 
  [fx_h3, p3], 
  {color:'black', strokeWidth:1, dash:2});
let run3 = board3.create('segment', 
  [fx3, p3], 
  {color:'black', strokeWidth:1, dash:2});

let riseText3 = board3.create('text', [
  function() { if (x_h3.X() > x3.X()) { return x_h3.X() + 0.5; } 
         return x_h3.X() - 1.5; },
  function() { return (f3(x_h3.X()) - f3(x3.X()))/2 + f3(x3.X()) + 0.2; },
  function() { return '\\[\\sin((x+h)^2) - \\sin(x^2)\\]'; }], 
  {fontSize:12, visible:false});

let runText3 = board3.create('text', [
  function() { return x3.X() + (x_h3.X() - x3.X())/2 - 0.5; },
  function() { return f3(x3.X()) + 0.4; },
  function() { return '\\[(x+h)^2 - x^2\\]'; }], 
  {fontSize:12, visible:false});

let triangle3 = board3.create('polygon', [fx3, fx_h3, p3], {
  fillColor:'#55DDFF', 
  fillOpacity: 50,
  borders: {strokeColor: 'yellow'}, 
  strokeWidth:3, visible:false});


let triangle3On = function() {
  triangle3.setAttribute({visible:true});
  riseText3.setAttribute({visible:true});
  runText3.setAttribute({visible:true});
};

let triangle3Off = function() {
  triangle3.setAttribute({visible:false});
  riseText3.setAttribute({visible:false});
  runText3.setAttribute({visible:false});
};

window.triangle3Off = triangle3Off;
window.triangle3On  = triangle3On;

let h1 = board1.create('segment', 
  [fx, p], 
  {color:'#55DDFF', strokeWidth:6, visible:false});

let h2 = board2.create('segment', 
  [fx2, p2], 
  {color:'#55DDFF', strokeWidth:6, visible:false});

let r11 = board1.create('segment', 
  [fx_h, p], 
  {color:'#55DDFF', strokeWidth:6, visible:false});

let r12 = board3.create('segment', 
  [fx_h3, p3], 
  {color:'#55DDFF', strokeWidth:6, visible:false});

let r21 = board3.create('segment', 
  [fx3, p3], 
  {color:'#55DDFF', strokeWidth:6, visible:false});

let r22 = board2.create('segment', 
  [fx_h2, p2], 
  {color:'#55DDFF', strokeWidth:6, visible:false});


let showH = function() {
  h1.setAttribute({visible:true});
  h2.setAttribute({visible:true});
};

let hideH = function() {
  h1.setAttribute({visible:false});
  h2.setAttribute({visible:false});
};

window.showH = showH;
window.hideH = hideH;

let showR1 = function() {
  r11.setAttribute({visible:true});
  r12.setAttribute({visible:true});
};

let hideR1 = function() {
  r11.setAttribute({visible:false});
  r12.setAttribute({visible:false});
};

window.showR1 = showR1;
window.hideR1 = hideR1;

let showR2 = function() {
  r21.setAttribute({visible:true});
  r22.setAttribute({visible:true});
};

let hideR2 = function() {
  r21.setAttribute({visible:false});
  r22.setAttribute({visible:false});
};

window.showR2 = showR2;
window.hideR2 = hideR2;


////////////////////////////////////////////////////////////////////////////

let multSlope = function() { 
  if (x3.X() == x_h3.X()) { return "undef"; }
  const s2 = ((f2(x2.X()) - f2(x_h2.X()))/(x2.X() - x_h2.X()));
  const s3 = ((f3(x3.X()) - f3(x_h3.X()))/(x3.X() - x_h3.X()));
  return (s2 * s3).toFixed(2).toString(); 
}

let productSlopeText = board1.create('text',[
  0.45 * (xhigh - xlow) + xlow,
  0.8 * 4 - 2,
  function(){ return 'slope2 * slope3 = '+ multSlope(); }], 
  {fontSize:15, visible:false});


let goClose = function() {
  if (x_h.X() < x.X()) {
    x_h.moveTo([x.X()-0.01, 0],1000);
  }
  else {
    x_h.moveTo([x.X()+0.01, 0],1000);
  }
}

let goToZero = function() {
  x_h.moveTo([x.X(), 0],200);
}

let resetSecant = function() {
  x_h.moveTo([x.X() + start_x_h, 0]);
  board1.update();
};

window.goClose = goClose;
window.goToZero = goToZero;
window.resetSecant = resetSecant;

this.sizeChanged = function() {
  console.log(myDiv.offsetWidth, myDiv.offsetHeight);
  board1.resizeContainer(myDiv.offsetWidth * 0.31, myDiv.offsetWidth * 0.33);
  board2.resizeContainer(myDiv.offsetWidth * 0.31, myDiv.offsetWidth * 0.33);
  board3.resizeContainer(myDiv.offsetWidth * 0.31, myDiv.offsetWidth * 0.33);
};

this.sizeChanged();

smartdown.setVariable('slopeProduct', multSlope());

board1.on('update', function() {
  smartdown.setVariable('slopeProduct', multSlope());
});

```

#### --outlinebox outer1


#### --outlinebox left1
$$\frac{\sin((x + h)^2) - \sin(x^2)}{h}$$
#### --outlinebox

#### --outlinebox middle1
$$\frac{\sin((x + h)^2) - \sin(x^2)}{(x + h)^2 - x^2}$$
#### --outlinebox

#### --outlinebox right1
$$\frac{(x + h)^2 - x^2}{h} $$
#### --outlinebox
#### --outlinebox





```javascript /autoplay

smartdown.importCssCode(
`

.highlightOnWide {
  background-color: #55DDFF;
  padding: 16px;
  border-radius: 5px;
  border: 1px solid #66CCEE;
}

.highlightOffWide {
  background-color: #EEF9FF;
  padding: 16px;
  border-radius: 5px;
  border: 1px solid #DDE9EE;
}

.highlightOnNarrow {
  background-color: #55DDFF;
  padding: 2px 6px;
  border-radius: 5px;
  border: 1px solid #88CCEE;
}

.highlightOffNarrow {
  background-color: #EEF9FF;
  padding: 2px 6px;
  border-radius: 5px;
  border: 1px solid #DDE9EE;
}
.outer {

}

.left {
  font-size: 18px; 
}

.middle {
  font-size: 18px;
}

.right {
  font-size: 18px;
}


@media (min-width: 800px) {
  .outer {
      height: 10vh;   
  }

  .left {
    width: 32%;
    display: inline-block;
    vertical-align: top;
  }

  .middle {
    width: 32%;
    display: inline-block;
    vertical-align: top;
  }

  .right {
    width: 32%;
    display: inline-block;
    vertical-align: top;
  }
}
`);


// grab the three caption divs and change their css
const outer = document.getElementById('outer1');
const left = document.getElementById('left1');
const middle = document.getElementById('middle1');
const right = document.getElementById('right1');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
middle.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('outer');
left.classList.add('left');
middle.classList.add('left');
right.classList.add('right');


// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-12-Frame');
formula1.onmouseover = logMouseOver;
formula1.onmouseout = logMouseOut;
formula1.classList.add('highlightOffWide');

function logMouseOver() {
  formula1.classList.remove('highlightOffWide');
  formula1.classList.add('highlightOnWide');
  window.triangleOn();
}

function logMouseOut() {
  formula1.classList.remove('highlightOnWide');
  formula1.classList.add('highlightOffWide');
  triangleOff();
}

const formula2 = document.getElementById('MathJax-Element-13-Frame');
formula2.onmouseover = logMouseOver2;
formula2.onmouseout = logMouseOut2;
formula2.classList.add('highlightOffWide');

function logMouseOver2() {
  formula2.classList.remove('highlightOffWide');
  formula2.classList.add('highlightOnWide');
  window.triangle3On();
}

function logMouseOut2() {
  formula2.classList.remove('highlightOnWide');
  formula2.classList.add('highlightOffWide');
  triangle3Off();
}

const formula3 = document.getElementById('MathJax-Element-14-Frame');
formula3.onmouseover = logMouseOver3;
formula3.onmouseout = logMouseOut3;
formula3.classList.add('highlightOffWide');

function logMouseOver3() {
  formula3.classList.remove('highlightOffWide');
  formula3.classList.add('highlightOnWide');
  window.triangle2On();
}

function logMouseOut3() {
  formula3.classList.remove('highlightOnWide');
  formula3.classList.add('highlightOffWide');
  triangle2Off();
}

const formula4 = document.getElementById('MathJax-Element-15-Frame');
formula4.onmouseover = logMouseOver4;
formula4.onmouseout = logMouseOut4;
formula4.classList.add('highlightOffNarrow');

function logMouseOver4() {
  formula4.classList.remove('highlightOffNarrow');
  formula4.classList.add('highlightOnNarrow');
  window.showH();
}

function logMouseOut4() {
  formula4.classList.remove('highlightOnNarrow');
  formula4.classList.add('highlightOffNarrow');
  window.hideH();
}

const formula5 = document.getElementById('MathJax-Element-16-Frame');
formula5.onmouseover = logMouseOver5;
formula5.onmouseout = logMouseOut5;
formula5.classList.add('highlightOffNarrow');

function logMouseOver5() {
  formula5.classList.remove('highlightOffNarrow');
  formula5.classList.add('highlightOnNarrow');
  window.showR1();
}

function logMouseOut5() {
  formula5.classList.remove('highlightOnNarrow');
  formula5.classList.add('highlightOffNarrow');
  window.hideR1();
}

const formula6 = document.getElementById('MathJax-Element-17-Frame');
formula6.onmouseover = logMouseOver6;
formula6.onmouseout = logMouseOut6;
formula6.classList.add('highlightOffNarrow');

function logMouseOver6() {
  formula6.classList.remove('highlightOffNarrow');
  formula6.classList.add('highlightOnNarrow');
  window.showR2();
}

function logMouseOut6() {
  formula6.classList.remove('highlightOnNarrow');
  formula6.classList.add('highlightOffNarrow');
  window.hideR2();
}


// code for the limit buttons
smartdown.setVariable('close', false);
smartdown.setVariable('gotozero', false);
smartdown.setVariable('reset', false);

this.dependOn = ['close', 'gotozero', 'reset'];
this.depend = function() {
  if (env.close == true) {
    smartdown.setVariable('close',false);
    window.goClose();
  }
  if (env.gotozero == true) {
    smartdown.setVariable('gotozero', false);
    window.goToZero();
  }
  if (env.reset == true) {
    smartdown.setVariable('reset', false);
    window.resetSecant();
    }
};
```

#### --outlinebox outer2
#### --outlinebox left2
[*h* close to 0](:=close=true) [*h* all the way to 0](:=gotozero=true) [Reset](:=reset=true) 
You can also drag the orange dot in the leftmost box. 

[Guided Tour](:=t1=true)
#### --outlinebox
#### --outlinebox right2

# :::: d1
Let's look at some of these quantities in our secants $h$, $\sin((x + h)^2) - \sin(x^2)$, and $(x + h)^2 - x^2$.
[Close](::d1) [Next](:=t2=true)
# ::::

# :::: d2
Notice that the product of slopes in the right two boxes is equal to the slope in the first box. Try dragging the orange dot in the first box to see different values.
[slope2 * slope3](:!slopeProduct)
[Back](:=t1=true) [Next](:=t3=true)
# ::::



# :::: d3
In the right most box, as $h$ goes to $0$, we know how to evaluate this limit. It's the derivative of $k(x) = x^2$.
$$\lim_{h \to 0}\frac{(x + h)^2 - x^2}{h} = 2x$$
[Back](:=t2=true) [Next](:=t4=true)
# ::::

# :::: d4
In the middle box, as $h$ goes to $0$ the secant gets close to a tangent line on the function $g(x) = \sin(x)$, but it's evaluated at $x^2$, not $x$. The derivative of the $\sin$ is the $\cos$ so we have
$$\lim_{h \to 0}\frac{\sin((x + h)^2) - \sin(x^2)}{(x + h)^2 - x^2} = \cos(x^2)$$
[Back](:=t3=true) [Next](:=t5=true)
# ::::

# :::: d5
When $h=0$ the slopes are all are undefined.  But this is ok.  We're taking the limit so we only care about what happens when $h$ close to $0$.
[Back](:=t4=true) [Next](:=t6=true)
# ::::

# :::: d6
But there is a problem. The value of $(x+h)^2 - x^2$ could be zero in other places then $h=0$.  For example, if $x=1$ and $h=-2$ the slope of this secant is undefined. This can be solved with a delta epsilon argument.  [See argument](https://en.wikipedia.org/wiki/Chain_rule#First_proof)
[Back](:=t5=true) [Next](:=t7=true)
# ::::

# :::: d7
We can conclude that the derivative of our function $f(x) = \sin(x^2)$ is 
$$f'(x) = \cos(x^2) \cdot 2x$$
[Back](:=t6=true) [Close](::d7)
# ::::

#### --outlinebox
#### --outlinebox


# :::: secant1
This is the standard secant line from the definition of the derivative that we don't know how to solve. 
# ::::

# :::: secant2
This is a secant line on the graph of $g(x) = \sin(x)$, but the change in the $x$ value is different here. Instead of changing by $h$, it changes by $(x + h)^2 - x^2$.
# ::::

# :::: secant3
This is the secant line on the graph of $k(x) = x^2$. 
# ::::





```javascript /autoplay

smartdown.importCssCode(
`
.outer2 {
  height: 25vh;
}

.left2 {
  padding: 10px; 
  font-size: 18px;
}

.right2 {
  font-size: 18px;
  border: 2px solid gray;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
}


@media (min-width: 800px) {
  .outer2 {
   
  }

  .left2 {
    width: 30%;
    height: 100%;
    display: inline-block;
    vertical-align: top;
  }

  .right2 {
    width: 68%;
    height: 100%;
    display: inline-block;
    vertical-align: top; 
    overflow: scroll;
  }
}
`);


const outer = document.getElementById('outer2');
const left = document.getElementById('left2');
const right = document.getElementById('right2');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('outer2');
left.classList.add('left2');
right.classList.add('right2');


```


```javascript /autoplay
// these are the transitions for the guided tour

smartdown.setVariable('t1', false);
smartdown.setVariable('t2', false);
smartdown.setVariable('t3', false);
smartdown.setVariable('t4', false);
smartdown.setVariable('t5', false);
smartdown.setVariable('t6', false);
smartdown.setVariable('t7', false);


this.dependOn = ['t1', 't2', 't3', 't4', 't5', 't6', 't7'];
this.depend = function() {
  if (env.t1 == true) {
    console.log('t1 is true');
    smartdown.setVariable('t1',false);
    smartdown.showDisclosure('d1', '', 'transparent');
    smartdown.hideDisclosure('d2', '', 'transparent');
    smartdown.hideDisclosure('d3', '', 'transparent');
    smartdown.hideDisclosure('d4', '', 'transparent');
    smartdown.setVariable('t1',false);
  }
  if (env.t2 == true) {
    smartdown.setVariable('t2', false);
    smartdown.showDisclosure('d2', '', 'transparent');
    smartdown.hideDisclosure('d1', '', 'transparent');  
    smartdown.hideDisclosure('d3', '', 'transparent');  
  }
  if (env.t3 == true) {
    smartdown.setVariable('t3', false);
    smartdown.showDisclosure('d3', '', 'transparent');
    smartdown.hideDisclosure('d2', '', 'transparent');  
    smartdown.hideDisclosure('d4', '', 'transparent');  
  }
  if (env.t4 == true) {
    smartdown.setVariable('t4', false);
    smartdown.showDisclosure('d4', '', 'transparent');
    smartdown.hideDisclosure('d3', '', 'transparent');  
    smartdown.hideDisclosure('d5', '', 'transparent');  
  }
  if (env.t5 == true) {
    smartdown.setVariable('t5', false);
    smartdown.showDisclosure('d5', '', 'transparent');
    smartdown.hideDisclosure('d4', '', 'transparent');  
    smartdown.hideDisclosure('d6', '', 'transparent');  
  }
  if (env.t6 == true) {
    smartdown.setVariable('t6', false);
    smartdown.showDisclosure('d6', '', 'transparent');
    smartdown.hideDisclosure('d5', '', '');  
    smartdown.hideDisclosure('d7', '', '');  
  }
  if (env.t7 == true) {
    smartdown.setVariable('t7', false);
    smartdown.showDisclosure('d7', '', 'transparent');
    smartdown.hideDisclosure('d6', '', '');  
  }
};
 
```


