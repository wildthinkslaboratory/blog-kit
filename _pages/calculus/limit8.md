---
title: Limit
smartdown: true
lesson: 'more_limits'
header: 'none'
ogimage: /assets/images/calculus/limits.jpg
---

# :::: clue
# --outlinebox 
Try playing the epsilon / delta game with this piecewise function
$$ 
f(x) = \begin{cases} 
      	-(x-1)^2 + 2 & x < 2  \newline
      	x & x \geq 2 
   \end{cases}
$$
and the following limit
$$
\lim_{x \to 2} f(x) = 2
$$
# --outlinebox 
# ::::

#### Play Again
[?](::clue/button,transparent,draggable,closeable,center,shadow) [my turn](:=myTurn=true) Take your turn and hit [Submit Turn](:=compute=true) Repeat!
```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:800px; width:800px'>`;

let xlow = -2;
let xhigh = 5;
let ylow = -2;
let yhigh = 5;

let th = new BlueTheme();

JXG.Options.layer['functiongraph'] = 5;
let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow]);
let F = new ProblemFunction(
	function(x) { 
		if (x < 2) {
			return -(x-1) * (x-1) + 2;
		}
		return x;
	}, 
	'', 3.5, [xlow,xhigh], [2]);
let F_id = workspace.addFunction(F);

let limit = new EpsilonDeltaLimit(workspace.board, F.f, 2, 2);








/////////////////////////////////////////////////////////////////////////////////////////

// Event handling

this.div.onmousedown = function(e) { 
  
};



let widthPercent = 0.8;
let heightPercent = 0.6;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};

this.sizeChanged();


workspace.board.on('update', function() {
  workspace.onUpdate();              // hook up workspace update functions
});

smartdown.setVariable('myTurn', false);
smartdown.setVariable('compute', false);


this.dependOn = ['myTurn', 'compute'];  
this.depend = function() {
  
	if (env.myTurn == true) {
		console.log('my turn!')
		smartdown.setVariable('myTurn', false);
		limit.reduceEpsilon(1000);
	}

	if (env.compute == true) {
		smartdown.setVariable('compute', false);
		// check all three possible endpoints
		let lowerBound = limit.lValue - limit.epsilon();
		let upperBound = limit.lValue + limit.epsilon();

		if (lowerBound <= 1 &&
			lowerBound <= limit.f(limit.xValue - limit.delta()) &&
			upperBound >= limit.f(limit.xValue + limit.delta())) {
			smartdown.showDisclosure('success','','bottomright,transparent,colorbox,shadow');
	      	setTimeout(function () {
	        	smartdown.hideDisclosure('success','','bottomright,colorbox,shadow');
	      	}, 3000);
		}
		else {
			smartdown.showDisclosure('tryagain','','bottomright,transparent,colorbox,shadow');
	      	setTimeout(function () {
	        	smartdown.hideDisclosure('tryagain','','bottomright,colorbox,shadow');
	      	}, 3000);
		}
	}
};


```
# :::: success
# --colorbox
Great Move!
# --colorbox
# ::::

# :::: tryagain
# --colorbox
Try again.
# --colorbox
# ::::


