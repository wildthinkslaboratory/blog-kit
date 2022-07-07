For me, a mathematical explanation has three parts: the high level ideas, a picture of the model, and symbolic reasoning. Following the symbolic reasoning in proofs and explanations requires effort and focus. When we are done, we may believe the derived statement is true, but we've forgotten what it actually means in relation to the model.  I'm trying to develop a strategy for explaining complex mathematical ideas that allows folks to maintain the mapping between the notational statements and their meaning along the way.


All three parts of an explanation are necessary.  The high level ideas tell us what we are doing and why we are doing it.  This is the story we are telling.  It's also the things we most want the reader to remember. The picture of the model is a description of the actual problem.  It's where the real understanding happens. The symbolic reasoning is where we write statements with mathematical notation and do inference and reasoning with those statements.  This could include algebra or logical proof steps.  


Currently, I write all my explanations using [smartdown](https://smartdown.site/#gallery/Home.md). For those of you not familiar with smartdown, it's an easy way for people who aren't front end web developers to write interactive web content.  It's free and easy to use.  Everything on this blog is written in smartdown. I'm trying to find a methodology for my process within the tools supplied by smartdown.  However, it's likely that this exploration will lead to the development of new smartdown tools. Explaining complex topics with challenging notation is not unique to the field of mathematics so lots of folks could benefit from tools for this kind of thing.  We begin with an example problem.  
# --outlinebox ob1
**Problem:**
Find the derivative of the function $f(x) = x^2$ using the definition of the derivative.
# --outlinebox

First we'll look at the three pieces of the explanation separately. 
### High Level Ideas
This explanation has three anchor ideas.

1. **Find the Derivative** -- We want to find the derivative for the function $f(x)=x^2$.
2. **Derivatives are Slopes** -- We want the reader to remember that derivatives are a description of slopes. The definition of the derivative begins with a generalized expression for the **slope** of a secant line and represents the slope of the tangent line.  
3. **Use a limit to turn a secant into a tangent** -- To make the definition work, we need to take the limit as the secant line gets very, very tiny and becomes a tangent.

### Symbolic Reasoning
Here's the symbolic reasoning we need to cover.  Most of it is algebra.
$$
\begin{align}
f'(x) & =  \lim_{h \to 0}\frac{f(x+h) - f(x)}{h} \\
& =  \lim_{h \to 0}\frac{(x + h)^2 - x^2}{h} \\
& =   \lim_{h \to 0} \frac{x^2 + 2hx + h^2 - x^2}{h} \\
& =   \lim_{h \to 0} \frac{2hx + h^2}{h} \\
& =   \lim_{h \to 0} 2x + h \\
& =   2x
\end{align}
$$

Just looking at it all alone without words or pictures drives home how disorienting the symbolic reasoning can  be even if it's clear and well written.

### Picture of the Model
I have two related pictures of the model I want to present.  The first is a picture showing a tangent line to the function, and the second showing a secant line.  The two pictures have many of the same components, so combining them into one picture would make the explanation easier to follow. 


#### Picture 1: Tangent Line
You can drag the red dot left and right to see different tangent lines.
```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box2' class='jxgbox' style='height:500px;'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box2', {boundingbox:[-5,10,20,-3], showCopyright:false, keepaspectratio:false, axis:false});

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
let df = function(x) { return 2 * x; }

let x = board0.create('glider', [1,0, xaxis], {name:'x', size:6});
let fx = board0.create('point', [
	function() { return x.X(); }, 
	function() { return f(x.X()); }], {name:'', color:'blue'})
let graph_f = board0.create('functiongraph', [f,-10,10], {strokeColor:'#999999'});
// let graph_df = board0.create('functiongraph', [df,-10,10],{strokeColor: '#11AA66', visible:true});
let tangent = board0.create('line', [
	function() { return f(x.X());},
	function() { return - df(x.X());},
	1]);

// print the slope of the secant line
let slopeText = board0.create('text',[
	function() { return x.X() + 0.5; },
	function() { return f(x.X()) + 0.5;},
	function(){ return 'slope = '+ df(x.X()).toFixed(2); }], {fontSize:15});


```
#### Picture 2: Secant Line
In this picture you can drag the green and red dots to see different secant lines.

```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box3' class='jxgbox' style='height:500px;'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box3', {boundingbox:[-5,10,20,-3], showCopyright:false, keepaspectratio:false, axis:false});

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
let df = function(x) { return 2 * x; }
let graph_f = board0.create('functiongraph', [f,-10,10], {strokeColor:'#999999'});
//let graph_df = board0.create('functiongraph', [df,-10,10],{strokeColor: '#11AA66', visible:true});

// point x on axis we want to get derivative value
let x = board0.create('glider', [1,0, xaxis], {name:'x', size:6});
let fx = board0.create('point', [ 
	function() { return x.X(); },
	function() { return f(x.X()); }], {name:'', color:'blue', fixed:true});

// the slider point for the secant
let x_h = board0.create('glider', [x.X() + 1, 0, xaxis], {name:'x + h', size:6, color:'green'} ); 

// sliding point on parabala 
let fx_h = board0.create('point', [
                function() { return x_h.X(); }, 
                function() { return f(x_h.X()); }
          ], {name:'', color: 'blue', fixed: true, size:3});

// secant line
let secant = board0.create('line', [fx, fx_h], {strokeColor:'blue'});
let secantSlope = function() { 
	if (x.X() == x_h.X()) { return "UNDEFINED: divide by zero"; }
	return ((f(x.X()) - f(x_h.X()))/(x.X() - x_h.X())).toFixed(3).toString(); 
}

let secantSlopeText = board0.create('text',[
	function() { return x.X() + (x_h.X() - x.X())/2 - 1.8; },
	function() { return f(x.X()) + (f(x_h.X()) - f(x.X()))/2;},
	function(){ return 'slope = '+ secantSlope(); }], {fontSize:15, visible:false});


let p = board0.create('point', [ 
	function() { return x_h.X(); }, 
	function() { return f(x.X());}], {visible:false});

let rise = board0.create('line', [fx_h, p], {color:'black', strokeWidth:1, straightFirst:false, straightLast:false, dash:2});
let run = board0.create('line', [fx, p], {color:'black', strokeWidth:1, straightFirst:false, straightLast:false, dash:2});
let riseText = board0.create('text', [
	function() { if (x_h.X() > x.X()) { return x_h.X() + 0.1; } 
				 return x_h.X() - 1.5; },
	function() { return (f(x_h.X()) - f(x.X()))/2 + f(x.X()); },
	'(x+h)^2 - x^2'], {fontSize:12});

let runText = board0.create('text', [
	function() { return x.X() + (x_h.X() - x.X())/2; },
	function() { return f(x.X()) - 0.3; },
	'h'], {fontSize:12});

this.sizeChanged = function() {      
  board0.resizeContainer(myDiv.offsetWidth, myDiv.offsetHeight);
};

 
```

### Putting it all Together
Here's my first prototype that attempts to maintain the mapping between the symbolic reasoning and the model. I'm using smartdown's [disclosables](https://smartdown.site/#gallery/Disclosables.md) to place the main ideas and symbolic reasoning next to the picture of the model.  I don't have very much control over the positioning of the disclosables so I've made them draggable.  There's a little black dot on each pop up that allows you to position them. It's also difficult to control the width of the pop ups.  A two column format might be a better solution with one column holding the picture and the second containing a slide show of the main anchor points.  Will talk to [Dan Keith](https://doctorbud.com) (the smartdown guy) about how to make this better.

This explanation is intended for students who are taking calculus and are familiar with calculus notation and ideas so many of the terms and notations aren't defined.  However, I think a non calculus student could still get the idea of what's happening here even if some of the notation and terms are unfamiliar.  

[start explanation](:=start=true) [derivative](:=transition4=true)
```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:500px;'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-5,10,20,-3], showCopyright:false, keepaspectratio:false, axis:false});
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
let df = function(x) { return 2 * x; }
let x = board0.create('glider', [1,0, xaxis], {name:'x', size:6});
let fx = board0.create('point', [
	function() { return x.X(); }, 
	function() { return f(x.X()); }], {name:'', color:'blue', fixed:true});
let graph_f = board0.create('functiongraph', [f,-10,10], {strokeColor:'#999999'});
let graph_df = board0.create('functiongraph', [df,-10,10], {strokeColor:'#44AA44', visible:false});
let dfx = board0.create('point', [
	function() { return x.X(); }, 
	function() { return df(x.X()); }], {name:'', color:'#44AA44', fixed:true, visible:false});

// tangent line section
let tangent = board0.create('line', [
	function() { return f(x.X());},
	function() { return - df(x.X());},
	1], {visible:true});
let tangentSlopeText = board0.create('text',[
	function() { return x.X() + 0.5; },
	function() { return f(x.X()) + 0.5;},
	function(){ return 'slope = '+ df(x.X()).toFixed(2); }], {fontSize:15, visible:true});


// Secant line section
// the slider point for the secant
let x_h = board0.create('glider', [x.X() + 1, 0, xaxis], {name:'x + h', size:6, color:'green', visible:false} ); 

// sliding point on parabala 
let fx_h = board0.create('point', [
                function() { return x_h.X(); }, 
                function() { return f(x_h.X()); }
          ], {name:'', color: 'blue', fixed: true, size:3, visible:false});

let secant = board0.create('line', [fx, fx_h], {strokeColor:'blue', visible:false});
let secantSlope = function() { 
	if (x.X() == x_h.X()) { return "UNDEFINED: divide by zero"; }
	return ((f(x.X()) - f(x_h.X()))/(x.X() - x_h.X())).toFixed(3).toString(); 
}

let secantSlopeText = board0.create('text',[
	function() { return x.X() + (x_h.X() - x.X())/2 - 1.8; },
	function() { return f(x.X()) + (f(x_h.X()) - f(x.X()))/2;},
	function(){ return 'slope = '+ secantSlope(); }], {fontSize:15, visible:false});

let p = board0.create('point', [ 
	function() { return x_h.X(); }, 
	function() { return f(x.X());}], {visible:false});

let rise = board0.create('line', [fx_h, p], {color:'black', strokeWidth:1, straightFirst:false, straightLast:false, dash:2, visible:false});
let run = board0.create('line', [fx, p], {color:'black', strokeWidth:1, straightFirst:false, straightLast:false, dash:2, visible:false});
let riseText = board0.create('text', [
	function() { if (x_h.X() > x.X()) { return x_h.X() + 0.1; } 
				 return x_h.X() - 1.5; },
	function() { return (f(x_h.X()) - f(x.X()))/2 + f(x.X()); },
	'(x+h)^2 - x^2'], {fontSize:12, visible:false});

let runText = board0.create('text', [
	function() { return x.X() + (x_h.X() - x.X())/2; },
	function() { return f(x.X()) - 0.3; },
	'h'], {fontSize:12, visible:false});


// board0.on('update', function() {
// 	//smartdown.setVariable('hvalue', (x_h.X() - x.X()).toFixed(3));
// });

let showTangent = function() {
	tangent.setAttribute({visible:true});
	tangentSlopeText.setAttribute({visible:true});
};

let hideTangent = function() {
	tangent.setAttribute({visible:false});
	tangentSlopeText.setAttribute({visible:false});
};

let showSecant = function() {
	x_h.setAttribute({visible:true});
	fx_h.setAttribute({visible:true});
	secant.setAttribute({visible:true});
	secantSlopeText.setAttribute({visible:true});
	rise.setAttribute({visible:true});
	run.setAttribute({visible:true});
	riseText.setAttribute({visible:true});
	runText.setAttribute({visible:true});
};

let hideSecant = function() {
	x_h.setAttribute({visible:false});
	fx_h.setAttribute({visible:false});
	secant.setAttribute({visible:false});
	secantSlopeText.setAttribute({visible:false});
	rise.setAttribute({visible:false});
	run.setAttribute({visible:false});
	riseText.setAttribute({visible:false});
	runText.setAttribute({visible:false});
};

let derivativeOn = false;
let showDerivative = function() {
	graph_df.setAttribute({visible:true});
	dfx.setAttribute({visible:true});
};

let hideDerivative = function() {
	graph_df.setAttribute({visible:false});
	dfx.setAttribute({visible:false});
};


this.sizeChanged = function() {      
  board0.resizeContainer(myDiv.offsetWidth, myDiv.offsetHeight);
};

smartdown.setVariable('start', false);
smartdown.setVariable('transition1', false);
smartdown.setVariable('transition2', false);
smartdown.setVariable('transition3', false);
smartdown.setVariable('transition4', false);
smartdown.setVariable('hValue', 1);

board0.on('update', function() {
	smartdown.setVariable('hValue', (x_h.X() - x.X()).toFixed(3));
});

this.dependOn = ['start', 'transition1', 'transition2', 'transition3', 'transition4'];
this.depend = function() {
	if (env.start == true) {
		smartdown.showDisclosure('mi1', '', 'bottomright,shadow,draggable');
		smartdown.hideDisclosure('mi2', '', 'bottomright,shadow,draggable');
		smartdown.hideDisclosure('mi3', '', 'bottomright,shadow,draggable');
		hideSecant();
		showTangent();
		smartdown.setVariable('start',false);
	}
	// board0.suspendUpdate();
	if (env.transition1 == true) {
		hideSecant();
		showTangent();
		smartdown.setVariable('transition1', false);
		smartdown.showDisclosure('mi1', '', 'bottomright,shadow,draggable');
		smartdown.hideDisclosure('mi2', '', 'bottomright,shadow,draggable');	
	}
	if (env.transition2 == true) {
		x.moveTo([1,0]);
		showSecant();
		hideTangent();
		smartdown.setVariable('transition2', false);
		smartdown.showDisclosure('mi2', '', 'bottomright,shadow,draggable');
		smartdown.hideDisclosure('mi1', '', 'bottomright,shadow,draggable');
		smartdown.hideDisclosure('mi3', '', 'bottomright,shadow,draggable');
	}
	if (env.transition3 == true) {
		smartdown.setVariable('transition3', false);
		smartdown.showDisclosure('mi3', '', 'bottomright,shadow,draggable');
		smartdown.hideDisclosure('mi2', '', 'bottomright,shadow,draggable');
	}
	if (env.transition4 == true) {
		if (derivativeOn) { hideDerivative(); }
		else { showDerivative(); }
		derivativeOn = !derivativeOn;
		smartdown.setVariable('transition4', false);
	}
	// board0.unsuspendUpdate();
};
 
```
### Conclusion

I plan to show this to Dan this week to give him a sense of what I want to achieve with these types of explanations.  The main goal is to keep all three parts of the explanation integrated so the reader never loses track of the big picture and the meaning of notational statements.  I hope to build and post an improved prototype soon.  Then I can easily integrate this approach into all my explanations.


# :::: mi1
### Finding the Derivative
We want to find a function that tells us the **slope** 
of the tangent line for the function $f(x)=x^2$.
Drag the red dot to see the slope of the tangent line.
[Next](:=transition2=true)
# ::::

# :::: mi2
### Derivatives are Slopes
The derivative definition starts with the **slope** of a secant line. 
See if you can understand why this expression describes the slope by 
looking at the picture.
$$\frac{(x + h)^2 - x^2}{h}$$
[Do some algebra](::algebra/button,transparent)
# :::: algebra
$$
\begin{align}
\frac{x^2 + 2hx + h^2 - x^2}{h} &  & \textrm{combine like terms}  \newline
\frac{2hx + h^2}{h}  &  & \textrm{cancel $h$ terms}   \newline
2x + h &
\end{align}
$$
The expression $2x + h$ represents the **slope** of the secant line 
for all values of $x$ and $h$.
# ::::
[Back](:=transition1=true) [Next](:=transition3=true)
# ::::

# :::: mi3
#### Turn a Secant into a Tangent
We can use a **limit** to turn a secant into a tangent.
If we drag the green dot $x+h$  towards the red $x$ dot 
- the value of $h$ gets very small. **h** = [](:!hValue) 
- the secant gets closer to the tangent 
- the slope of the secant $2x + h$ gets close to $2x$.

We write this as
$$f'(x) = \lim_{h \to 0} 2x + h = 2x$$
The derivative of $f(x) = x^2$ is the function
$$f'(x) = 2x$$
[Back](:=transition2=true) [Close](::mi3)
# ::::

# :::: pulldown1
[](:Xa1) price of tea in China
[](:Xa2) 10 meters
[](:Xa3) slope of the secant line
# ::::

```javascript/autoplay
smartdown.setVariable('a1', false);
smartdown.setVariable('a2', false);
smartdown.setVariable('a3', false);
smartdown.setVariable('secantSlope', '________');

this.dependOn = ['a1', 'a2', 'a3'];

this.depend = function() {
  if (env.a1 == false && env.a2 == false && env.a3 == true) {
      smartdown.setVariable('secantSlope', 'slope of the secant line');
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    } 
  };
```

# :::: correct
# --colorbox right
correct! :grinning:
# --colorbox
# ::::