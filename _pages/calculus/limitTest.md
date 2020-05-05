---
title: Limit
smartdown: true
lesson: 'more_limits'
header: 'none'
ogimage: /assets/images/calculus/limits.jpg
---

# :::: clue
# --outlinebox 
You are Delta.  You have a function $f(x)=3x$, and you think $$\lim_{x \to 2} 3x = 6.$$  To prove your limit is correct, you have to counter every move made by Epsilon.  Epsilon will make smaller and smaller intervals around $6$.  You have to adjust the Delta interval so that all the function values inside your interval are also inside Epsilon's interval.
# --outlinebox 
# ::::

# :::: toolbar
# :::: epsilon_turn
### Epsilon's Turn
# ::::
# :::: delta_turn
### Delta's Turn
# ::::
Adjust the Delta interval so that all the function values inside your interval are also inside Epsilon's interval.
[Submit Turn](:=compute=true) 
# ::::

[?](::clue/button,transparent,draggable,closeable,center,shadow) [Play](:=play=true)
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
let xhigh = 4;
let ylow = -2;
let yhigh = 10;

let th = new BlueTheme();

JXG.Options.layer['functiongraph'] = 5;
let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow], {xlabel:'', ylabel:''});
let F = new ProblemFunction(
	function(x) { return 3 * x;}, 
	'', 3.5, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let limit = new EpsilonDeltaLimit(workspace.board, F.f, 2, 6);



let instructions = workspace.board.create('text', [
	function() { return limit.deltaP.X(); },
	function() { return limit.deltaP.Y() + 0.2; },
	'Drag the green dot to<br>adjust the Delta interval'
	], {visible:false, 
		fontSize:18, 
		anchorX:'right', 
		anchorY:'bottom', 
		cssClass:'instructions',
		highlightCssClass:'instructions_hl'});



/////////////////////////////////////////////////////////////////////////////////////////

// Event handling

this.div.onmousedown = function(e) { 
  
};



let widthPercent = 0.8;
let heightPercent = 0.7;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};

this.sizeChanged();


workspace.board.on('update', function() {
  workspace.onUpdate();              // hook up workspace update functions
});

smartdown.setVariable('myTurn', false);
smartdown.setVariable('compute', false);
smartdown.setVariable('play', false);

smartdown.showDisclosure('delta_turn', '', 'transparent');

this.dependOn = ['myTurn', 'compute', 'play'];  
this.depend = function() {
  
	if (env.play == true) {
		smartdown.setVariable('play', false);
		smartdown.showDisclosure('toolbar','','topright,draggable,closeable,shadow');
		instructions.setAttribute({visible:true});
	}

	if (env.myTurn == true) {
		smartdown.setVariable('myTurn', false);
		limit.reduceEpsilon(1000);
	}

	if (env.compute == true) {
		smartdown.setVariable('compute', false);
		if (limit.delta() <= limit.epsilon() / 3) {
			instructions.setAttribute({visible:false});
			smartdown.hideDisclosure('delta_turn', '', '');
			smartdown.showDisclosure('epsilon_turn', '', 'transparent');
			limit.reduceEpsilon(3000, function() {
				smartdown.hideDisclosure('epsilon_turn', '', '');
				smartdown.showDisclosure('delta_turn', '', 'transparent');
			});
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


