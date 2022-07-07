This post is the next iteration in my process to build a strategy for explaining complex mathematical problems, proofs and ideas.  My first attempt can be found [here](/posts/mathExplanations).  The basic idea is to break my explanation down into three parts: the high level ideas, a picture of the model, and symbolic reasoning. The explanation should present all three parts in an integrated way.  It should make sure the main ideas do not get lost in the details and it should help the reader map the symbolic statements to their meaning in the model.  

<!--more-->

My friend [Dan](https://doctorbud.com) gave me the idea of placing each of my three parts of an explanation into a different pane in of a [triptych](https://en.wikipedia.org/wiki/Triptych).  Triptychs are three paneled paintings that were common as altar paintings in the Middle Ages.

![halfwidth](https://upload.wikimedia.org/wikipedia/commons/b/bf/Annunciation_Triptych_%28Merode_Altarpiece%29_MET_DP273206.jpg)

In this second attempt at this explanation I'm going to try a two panel approach, but I'm not done experimenting and I may add another panel yet. I'm going to present the picture of the model in the first panel and combine the high level story with the symbolic reasoning into the second panel.  I'm adding a new **highlight** function that I hope will help readers maintain a mapping between the symbolic formulas and their meaning in the model.  Look for formulas with a gray back ground and hold your mouse over them to see the mapping.


### Finding the Derivative

#### --outlinebox outer1

#### --outlinebox left1

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');
myDiv = this.div;

myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:500px'>`;


JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-5,10,5,-3], showCopyright:false, keepaspectratio:false, axis:false});
board0.resizeContainer(myDiv.offsetWidth, myDiv.offsetHeight);

let xaxis = board0.create('axis', [[0, 0], [1,0]], 
      {name:'x', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-20, 20]   // (in pixels)
      }
      });
let yaxis = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'y', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });   

// parabala and it's derivative
let f = function(x) { return  x*x; };
let df = function(x) { return 2*x; }
let x = board0.create('glider', [2,0, xaxis], {name:'x', size:6});
let fx = board0.create('point', [
  function() { return x.X(); }, 
  function() { return f(x.X()); }], {name:'', color:'#222299', fixed:true});
let graph_f = board0.create('functiongraph', [f,-10,10], {strokeColor:'#999999'});
let graph_df = board0.create('functiongraph', [df,-10,10], {strokeColor:'#44AA44', visible:false});
let dfx = board0.create('point', [
  function() { return x.X(); }, 
  function() { return df(x.X()); }], {name:'', color:'#44AA44', fixed:true, visible:false});

// tangent line section
let tangent = board0.create('line', [
  function() { return f(x.X());},
  function() { return - df(x.X());},
  1], {color:'#222299', visible:true});
let tangentSlopeText = board0.create('text',[
  function() { return x.X() + 0.5; },
  function() { return f(x.X()) + 0.5;},
  function(){ return 'slope = '+ df(x.X()).toFixed(2); }], {fontSize:15, visible:true});


// Secant line section
// the slider point for the secant
let x_h = board0.create('glider', [x.X() + 3, 0, xaxis], {name:'x + h', size:6, color:'green', visible:false} ); 

let highlightFon = function() {
  graph_f.setAttribute({strokeColor:'#33FFFF', strokeWidth:3});
};

let highlightFoff = function() {
  graph_f.setAttribute({strokeColor:'#999999', strokeWidth:1});
};

window.highlightFoff = highlightFoff;
window.highlightFon = highlightFon;

this.sizeChanged = function() {      
  board0.resizeContainer(myDiv.offsetWidth, myDiv.offsetHeight);
};

 
```
#### --outlinebox


#### --outlinebox right1
We want to find the derivative of the function $f(x)=x^2$.  The derivative of a function tells us the **slope** of the tangent line to the function at different points.  But how do we find it?  There is no obvious formula for the slope of the tangent line. 

Drag the red dot to see the slope of the tangent line for different values of $x$.


#### --outlinebox
#### --outlinebox


```javascript /autoplay

smartdown.importCssCode(
`
.outer {
 
}

.left {
  padding-top: 10px; 
}

.right {
  padding-left: 20px;
  padding-right: 20px;
  font-size: 18px;
}

.highlightOn {
  background-color: #33FFFF;
  padding: 10px;
}

.highlightOff {
  background-color: #CCCCCC;
  padding: 10px;
}

@media (min-width: 800px) {
  .outer {
   
  }

  .left {
    width: 50%;
    display: inline-block;
    vertical-align: top;
  }

  .right {
    width: 48%;
    display: inline-block;
    vertical-align: top;
  }
}
`);


const outer = document.getElementById('outer1');
const left = document.getElementById('left1');
const right = document.getElementById('right1');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('outer');
left.classList.add('left');
right.classList.add('right');

const formula1 = document.getElementById('MathJax-Element-1-Frame');
formula1.onmouseover = logMouseOver;
formula1.onmouseout = logMouseOut;
formula1.classList.add('highlightOff');

function logMouseOver() {
  formula1.classList.add('highlightOn');
  formula1.classList.remove('highlightOff');
  highlightFon();
}

function logMouseOut() {
  formula1.classList.add('highlightOff');
  formula1.classList.remove('highlightOn');
  highlightFoff();
}

```


### Turning Secants into Tangents
#### --outlinebox outer2

#### --outlinebox left2

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.innerHTML = `<div id='box2' class='jxgbox' style='height:500px'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board1 = JXG.JSXGraph.initBoard('box2', {boundingbox:[-5,10,5,-3], showCopyright:false, keepaspectratio:false, axis:false});
board1.resizeContainer(myDiv.offsetWidth, myDiv.offsetHeight);

let xaxis = board1.create('axis', [[0, 0], [1,0]], 
      {name:'x', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-20, 20]   // (in pixels)
      }
      });
let yaxis = board1.create('axis', [[0, 0], [0, 1]], 
      {name:'y', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });   

// parabala and it's derivative
let f = function(x) { return  x*x; };
let df = function(x) { return 2*x; };
let x = board1.create('glider', [1,0, xaxis], {name:'x', fixed:false, size:6});
let fx = board1.create('point', [
  function() { return x.X(); }, 
  function() { return f(x.X()); }], {name:'', color:'#222299', fixed:true});
let graph_f = board1.create('functiongraph', [f,-10,10], {strokeColor:'#999999'});
let graph_df = board1.create('functiongraph', [df,-10,10], {strokeColor:'#44AA44', visible:false});
let dfx = board1.create('point', [
  function() { return x.X(); }, 
  function() { return df(x.X()); }], {name:'', color:'#44AA44', fixed:true, visible:false});


// Secant line section
// the slider point for the secant
let x_h = board1.create('glider', [x.X() + 2, 0, xaxis], {name:'x + h', size:6, color:'green', visible:true} ); 

// sliding point on parabala 
let fx_h = board1.create('point', [
                function() { return x_h.X(); }, 
                function() { return f(x_h.X()); }
          ], {name:'', color:'#222299', fixed: true, size:3, visible:true});

let secant = board1.create('line', [fx, fx_h], {color:'#222299', visible:true});
let secantSlope = function() { 
  if (x.X() == x_h.X()) { return "UNDEFINED: divide by zero"; }
  return ((f(x.X()) - f(x_h.X()))/(x.X() - x_h.X())).toFixed(3).toString(); 
}

let secantSlopeText = board1.create('text',[
  function() { return x.X() + (x_h.X() - x.X())/2 - 1.8; },
  function() { return f(x.X()) + (f(x_h.X()) - f(x.X()))/2;},
  function(){ return 'slope = '+ secantSlope(); }], {fontSize:15, visible:true});

let p = board1.create('point', [ 
  function() { return x_h.X(); }, 
  function() { return f(x.X());}], {visible:false});

let triangle = board1.create('polygon', [fx, fx_h, p], {
  fillColor:'#33FFFF', 
  fillOpacity: 50,
  borders: {strokeColor: 'yellow'}, 
  strokeWidth:3, visible:false});

let rise = board1.create('line', [fx_h, p], {color:'black', strokeWidth:1, straightFirst:false, straightLast:false, dash:2, visible:true});
let run = board1.create('line', [fx, p], {color:'black', strokeWidth:1, straightFirst:false, straightLast:false, dash:2, visible:true});
let riseText = board1.create('text', [
  function() { if (x_h.X() > x.X()) { return x_h.X() + 0.1; } 
         return x_h.X() - 1.5; },
  function() { return (f(x_h.X()) - f(x.X()))/2 + f(x.X()); },
  '(x+h)^2 - x^2'], {fontSize:12, visible:false});

let runText = board1.create('text', [
  function() { return x.X() + (x_h.X() - x.X())/2; },
  function() { return f(x.X()) - 0.1; },
  'h'], {fontSize:12, visible:false});

board1.on('update', function() {
  const xFloor = Math.floor(x.X());
  if ((x.X() - xFloor) < 0.2) {
    x.moveTo([xFloor, 0]);
    return;
  }
  const xCeil = Math.ceil(x.X());
  if ((xCeil - x.X()) < 0.2) {
    x.moveTo([xCeil, 0]);
    return;
  }  
});

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

let goClose = function() {
  if (x_h.X() < x.X()) {
    x_h.moveTo([x.X()-0.01, 0],2000);
  }
  else {
    x_h.moveTo([x.X()+0.01, 0],2000);
  }
}

let goToZero = function() {
  x_h.moveTo([x.X(), 0],500);
}

let resetSecant = function() {
  x.moveTo([1,0]);
  x_h.moveTo([3,0]);
};

window.goClose = goClose;
window.goToZero = goToZero;
window.resetSecant = resetSecant;

this.sizeChanged = function() {      
  board1.resizeContainer(myDiv.offsetWidth, myDiv.offsetHeight);
};

 
```
#### --outlinebox

#### --outlinebox right2
We can easily write an expression for the slope of the secant line. 
$$\frac{(x + h)^2 - x^2}{h}$$

You can investigate what happens when $h$ gets very small by dragging the green dot towards the red dot or by using these buttons. [*h* close to 0](:=close=true) [*h* all the way to 0](:=gotozero=true) [Reset](:=reset=true)  You can also drag the red dot.

When $h$ gets close to $0$, the secant line becomes very close to the tangent line.  The slope of this secant line will be very close to the slope of the tangent line. 

Try to guess the slope of the tangent line
when $x=1$ [](:?s1)
when $x=2$ [](:?s2)

If the distance between the points goes all the way to zero, then the slope of the secant is undefined due to division by zero. 


#### --outlinebox
#### --outlinebox


### Taking the Limit
The derivative of a function $f(x)$ is defined as the limit of the slope of the secant as $h$ goes to $0$.  
$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$
The value of the limit is determined by what happens when $h$ is very near $0$, not what happens when $h=0$.  In this way we avoid the problem of dividing by $0$.

To solve the limit for the function $f(x) = x^2$, we need to do some algebra.
$$
\begin{align}
f'(x) & = \lim_{h \to 0} \frac{(x + h)^2 - x^2}{h} & \newline
& = \lim_{h \to 0} \frac{x^2 + 2hx + h^2 - x^2}{h}  & \textrm{expand $(x+h)^2$} \newline 
& = \lim_{h \to 0} \frac{2hx + h^2}{h} & \textrm{combine like terms}  \newline
& = \lim_{h \to 0} 2x + h & \textrm{cancel $h$ terms}  \newline
\end{align}
$$
All of this assumes that the value $h$ gets infinitely close to $0$ without ever reaching it.
```javascript /autoplay
const outer = document.getElementById('outer2');
const left = document.getElementById('left2');
const right = document.getElementById('right2');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('outer');
left.classList.add('left');
right.classList.add('right');

const formula2 = document.getElementById('MathJax-Element-3-Frame');
formula2.onmouseover = logMouseOver3;
formula2.onmouseout = logMouseOut3;
formula2.classList.add('highlightOff');

function logMouseOver3() {
  formula2.classList.remove('highlightOff');
  formula2.classList.add('highlightOn');
  window.triangleOn();
}

function logMouseOut3() {
  formula2.classList.remove('highlightOn');
  formula2.classList.add('highlightOff');
  triangleOff();
}

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

```javascript /autoplay
smartdown.setVariable('s1', '');
this.dependOn = ['s1'];
this.depend = function() {
  if (env.s1 == '2') {
    smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
    setTimeout(function () {
         smartdown.hideDisclosure('correct','','bottomright'); 
    }, 3000);
  }
};
```

```javascript /autoplay
smartdown.setVariable('s2', '');
this.dependOn = ['s2'];
this.depend = function() {
  if (env.s2 == '4') {
    smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
    setTimeout(function () {
         smartdown.hideDisclosure('correct','','bottomright'); 
    }, 3000);
  }

};
```
#### --outlinebox outer3

#### --outlinebox left3

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');
myDiv = this.div;

myDiv.innerHTML = `<div id='box3' class='jxgbox' style='height:500px'>`;


JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board2 = JXG.JSXGraph.initBoard('box3', {boundingbox:[-5,10,5,-3], showCopyright:false, keepaspectratio:false, axis:false});
board2.resizeContainer(myDiv.offsetWidth, myDiv.offsetHeight);

let xaxis = board2.create('axis', [[0, 0], [1,0]], 
      {name:'x', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-20, 20]   // (in pixels)
      }
      });
let yaxis = board2.create('axis', [[0, 0], [0, 1]], 
      {name:'y', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });   

// parabala and it's derivative
let f = function(x) { return  x*x; };
let df = function(x) { return 2*x; }
let x = board2.create('glider', [2,0, xaxis], {name:'x', size:6});
let fx = board2.create('point', [
  function() { return x.X(); }, 
  function() { return f(x.X()); }], {name:'', color:'#222299', fixed:true});
let graph_f = board2.create('functiongraph', [f,-10,10], {strokeColor:'#999999'});
let graph_df = board2.create('functiongraph', [df,-10,10], {strokeColor:'green', visible:true});
let dfx = board2.create('point', [
  function() { return x.X(); }, 
  function() { return df(x.X()); }], {name:'', color:'green', fixed:true, visible:true});
let dfText = board2.create('text',[
  function() { return x.X() - 1.4; },
  function() { return df(x.X()) + 0.3;},
  function(){ return '('+ x.X().toFixed(2) + ',' + df(x.X()).toFixed(2) + ')'; }], {fontSize:15, visible:true});

// tangent line section
let tangent = board2.create('line', [
  function() { return f(x.X());},
  function() { return - df(x.X());},
  1], {color:'#222299', visible:true});
let tangentSlopeText = board2.create('text',[
  function() { return x.X() + 0.3; },
  function() { return f(x.X()) + 0.3;},
  function(){ return 'slope = '+ df(x.X()).toFixed(2); }], {fontSize:15, visible:true});


// Secant line section
// the slider point for the secant
let x_h = board2.create('glider', [x.X() + 3, 0, xaxis], {name:'x + h', size:6, color:'green', visible:false} ); 

let highlightDFon = function() {
  graph_df.setAttribute({strokeColor:'#33FFFF', strokeWidth:3});
};

let highlightDFoff = function() {
  graph_df.setAttribute({strokeColor:'green', strokeWidth:1});
};

window.highlightDFon = highlightDFon;
window.highlightDFoff = highlightDFoff;

this.sizeChanged = function() {      
  board2.resizeContainer(myDiv.offsetWidth, myDiv.offsetHeight);
};

 
```
#### --outlinebox


#### --outlinebox right3
Finally, we note that for very small values of $h$, the value of 
$$\lim_{h \to 0} 2x + h$$ becomes $2x$.  
So the derivative of $f(x) = x^2$ is 
$$f'(x) = 2x$$

Drag the red dot to verify that the function $f'(x) = 2x$ gives the slope of the tangent line.

When the derivative $f'(x)$ is positive the function $f(x)$ [[](:!increasing)](::pulldown1/tooltip). When the derivative is negative the function [[](:!decreasing)](::pulldown2/tooltip). When the derivative is zero the function [[](:!minimum)](::pulldown3/tooltip).
#### --outlinebox
#### --outlinebox


# :::: pulldown1
[](:Xa1) is increasing
[](:Xa2) is decreasing
[](:Xa3) has a minimum
# ::::

# :::: pulldown2
[](:Xa4) is increasing
[](:Xa5) is decreasing
[](:Xa6) has a minimum
# ::::

# :::: pulldown3
[](:Xa7) is increasing
[](:Xa8) is decreasing
[](:Xa9) has a minimum
# ::::


```javascript /autoplay
smartdown.setVariable('a1', false);
smartdown.setVariable('a2', false);
smartdown.setVariable('a3', false);
smartdown.setVariable('increasing', '________');

this.dependOn = ['a1', 'a2', 'a3'];

this.depend = function() {
  if (env.a1 == true && env.a2 == false && env.a3 == false) {
      smartdown.setVariable('increasing', 'is increasing');
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    } 
  };
```


```javascript /autoplay
smartdown.setVariable('a4', false);
smartdown.setVariable('a5', false);
smartdown.setVariable('a6', false);
smartdown.setVariable('decreasing', '________');

this.dependOn = ['a4', 'a5', 'a6'];

this.depend = function() {
  if (env.a4 == false && env.a5 == true && env.a6 == false) {
      smartdown.setVariable('decreasing', 'is decreasing');
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    } 
  };
```


```javascript /autoplay
smartdown.setVariable('a7', false);
smartdown.setVariable('a8', false);
smartdown.setVariable('a9', false);
smartdown.setVariable('minimum', '________');

this.dependOn = ['a7', 'a8', 'a9'];

this.depend = function() {
  if (env.a7 == false && env.a8 == false && env.a9 == true) {
      smartdown.setVariable('minimum', 'has a minimum');
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    } 
  };
```


```javascript /autoplay

const outer = document.getElementById('outer3');
const left = document.getElementById('left3');
const right = document.getElementById('right3');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('outer');
left.classList.add('left');
right.classList.add('right');

const formula3 = document.getElementById('MathJax-Element-25-Frame');
formula3.onmouseover = logMouseOver4;
formula3.onmouseout = logMouseOut4;
formula3.classList.add('highlightOff');

function logMouseOver4() {
  formula3.classList.remove('highlightOff');
  formula3.classList.add('highlightOn');
  window.highlightDFon();
}

function logMouseOut4() {
  formula3.classList.remove('highlightOn');
  formula3.classList.add('highlightOff');
  window.highlightDFoff();
}

```
# :::: correct
# --colorbox right
correct! :grinning:
# --colorbox
# ::::




