---
title: Limit
smartdown: true
lesson: 'more_limits'
header: 'none'
ogimage: /assets/images/calculus/limits.jpg
---


### The Epsilon Delta Game

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
We have a function $f(x)=3x$, and we think the limit as $x \to 2$ is $6$ $$\lim_{x \to 2} 3x = 6,$$ but how can we be sure? We'll test our limit by playing a game.  I'll take an interval around the limit $6$.  [my interval](:=showEpsilon=true) and you get an interval around the $x$ value $2$. [your interval](:=showDelta=true)  We'll take turns.  Everytime I pick an interval around the limit, you have to adjust your interval so that all the function values inside your interval are also inside my interval.  I'll do your first turn for you so you get the idea. [your first turn](:=yourFirst=true) If you can counter all my moves, then the limit is correct.

[my turn](:=myTurn=true) 
Take your turn and hit [Submit Turn](:=compute=true)
Repeat!

If you can always counter my move then the the limit is correct.
[Continue](/pages/limit4)

#### --outlinebox
#### --outlinebox

 

```javascript /autoplay

const outer = document.getElementById('outer1');
const left = document.getElementById('left1');
const right = document.getElementById('right1');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');


//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

left.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

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
limit.hide();
limit.setDeltaStrategy(function(x) { return x / 3; });



/////////////////////////////////////////////////////////////////////////////////////////

// Event handling

this.div.onmousedown = function(e) { 
  
};


let heightPercent = 0.7;

this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, window.innerHeight * heightPercent);
};


this.sizeChanged();


workspace.board.on('update', function() {
  workspace.onUpdate();              // hook up workspace update functions
});


smartdown.setVariable('showDelta', false);
smartdown.setVariable('showEpsilon', false);
smartdown.setVariable('yourFirst', false);
smartdown.setVariable('myTurn', false);
smartdown.setVariable('compute', false);


this.dependOn = ['showEpsilon', 'showDelta', 'yourFirst', 'myTurn', 'compute'];  
this.depend = function() {
  
	if (env.showDelta == true) {
		smartdown.setVariable('showDelta', false);
		limit.showDelta();
	}

	if (env.showEpsilon == true) {
		smartdown.setVariable('showEpsilon', false);
		limit.showEpsilon();
	}

	if (env.yourFirst == true) {
		smartdown.setVariable('yourFirst', false);
		limit.reduceDelta(1000);
	}

	if (env.myTurn == true) {
		console.log('my turn!')
		smartdown.setVariable('myTurn', false);
		limit.reduceEpsilon(1000);
	}

	if (env.compute == true) {
		smartdown.setVariable('compute', false);
		if (limit.delta() <= limit.epsilon() / 3) {
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
outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');


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

