# :::: intro_note
# --partialborder
Playing an infinite game of Epsilon/Delta is not a practical way to prove a limit.  We're now adding the option of using a strategy instead of adjusting the Delta interval yourself.  For this limit we'll use the strategy of making the Delta interval $1/3$ the size of the Epsilon interval.
# --partialborder
# ::::


# :::: success
# --partialborder
Success!  
We'll be adding more pages soon to the Delta/Epsilon lesson.  We'll work on how to come up with a winning strategies.
[Continue](/pages/limitDE1)
# --partialborder
# ::::

# :::: clue
# --outlinebox 

# --outlinebox 
# ::::



Prove that the limit of the function $f(x)=3x$ as $x$ goes to $2$ is 6.
# :::: epsilon_turn
**Epsilon's Turn**
# ::::
# :::: delta_turn
**Delta's Turn** [Submit Turn](:=compute=true) Set delta to $\frac{1}{3}$ of epsilon.[use strategy](:=useStragegy=true)
# ::::
```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

smartdown.showDisclosure('intro_note','','transparent,draggable,closeable,center,outline,shadow,lightbox');

smartdown.showDisclosure('delta_turn', '', 'transparent');

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
	'', 3.5, [xlow,xhigh], [2]);
let F_id = workspace.addFunction(F);

let limit = new EpsilonDeltaLimit(workspace.board, F.f, 2, 6);
limit.setDeltaStrategy(function(x) { return x / 3; })



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


smartdown.setVariable('compute', false);
smartdown.setVariable('useStragegy', false);

this.dependOn = ['compute', 'useStragegy'];  
this.depend = function() {

	if (env.useStragegy == true) {
		smartdown.setVariable('useStragegy', false);
		limit.reduceDelta(3000);
	}

	if (env.compute == true) {
		smartdown.setVariable('compute', false);
		if (limit.checkDelta()) {
			if (limit.epsilon() <= 0.2) {
				smartdown.showDisclosure('success', '','center,transparent,draggable,closeable,outline,shadow');
			}
			smartdown.hideDisclosure('delta_turn', '', '');
			smartdown.showDisclosure('epsilon_turn', '', 'transparent');
			limit.reduceEpsilon(3000, function() {
				smartdown.hideDisclosure('epsilon_turn', '', '');
				smartdown.showDisclosure('delta_turn', '', 'transparent');
			});
		}
		else {
			smartdown.showDisclosure('tryagain','','bottomright,closeable,draggable,transparent');
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
Adjust the Delta interval so that all the function values inside your interval are also inside Epsilon's interval. 
# --colorbox
# ::::


