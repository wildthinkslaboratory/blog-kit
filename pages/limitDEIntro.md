# :::: success
# --partialborder
Success!  

To fully prove that $$\lim_{x \to 2} 3x = 6,$$ we would need to show that Delta can counter any move that Epsilon makes, no matter how close Epsilon's interval gets to $6$.  That would take an infinite number of steps.  Later we'll find a shorter way of proving limits.


[Continue](/pages/limitDE1)
# --partialborder
# ::::

# :::: clue
# --outlinebox 
You say that the limit as $x$ goes to $2$ of $3x$ is [](:!suggestedLimit).

To prove your limit is correct, you have to counter every move made by Epsilon.  Epsilon will make smaller and smaller intervals around [](:!suggestedLimit).  You have to adjust the Delta interval around $2$ so that all the function values inside your interval are also inside Epsilon's interval.
[Play](:=play=true)
# --outlinebox 
# ::::

# :::: hint
# --partialborder
Adjust the Delta interval so that all the function values inside your interval are also inside Epsilon's interval. 
# --partialborder
# ::::


What is the limit of the function $f(x)=3x$ as $x$ goes to $2$? [](:?suggestedLimit) [closer](:=reduce=true) [all the way](:=all=true)
# :::: epsilon_turn
**Epsilon's Turn**
# ::::
# :::: delta_turn
**Delta's Turn** [Submit Turn](:=compute=true) 
# ::::
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
	'', 3.5, [xlow,xhigh], [2]);
let F_id = workspace.addFunction(F);

let approachLimit = new ApproachLimit(workspace.board, F.f, 2, 6);
approachLimit.glider.moveTo([1,0]);

let limit;
let instructions;



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
smartdown.setVariable('suggestedLimit', '');
smartdown.setVariable('play', false);
smartdown.setVariable('reduce', false);
smartdown.setVariable('all', false);
let beginPlay = false;


this.dependOn = ['compute', 'suggestedLimit', 'play', 'all', 'reduce'];  
this.depend = function() {

	if (env.reduce == true) {
		smartdown.setVariable('reduce', false);
		approachLimit.reduceDelta();		
	}

	if (env.all == true) {
		smartdown.setVariable('all', false);
		approachLimit.eliminateDelta();
	}

	if (env.play == true) {
		smartdown.setVariable('play', false);
		smartdown.hideDisclosure('clue','','center,transparent,draggable,closeable,shadow');	
		smartdown.showDisclosure('delta_turn', '', 'transparent');
	
	}
	if (!beginPlay && env.suggestedLimit !== '') {
		beginPlay = true;
		approachLimit.hide();
		const limitValue = parseInt(env.suggestedLimit);

		limit = new EpsilonDeltaLimit(workspace.board, F.f, 2, limitValue);

		instructions = workspace.board.create('text', [
			function() { return limit.deltaP.X(); },
			function() { return limit.deltaP.Y() + 0.2; },
			'Drag the green dot to<br>adjust the Delta interval'
			], {visible:true, 
				fontSize:18, 
				anchorX:'right', 
				anchorY:'bottom', 
				cssClass:'jsxgraph-instructions',
				highlightCssClass:'jsxgraph-instructions'});
		smartdown.showDisclosure('clue','','center,transparent,draggable,closeable,shadow,lightbox,outline');
	}

	if (env.compute == true) {
		smartdown.setVariable('compute', false);
		if (limit.checkDelta()) {
			instructions.setAttribute({visible:false});
			if (limit.epsilon() <= 0.2) {
				smartdown.showDisclosure('success', '', 'center,transparent,draggable,closeable,outline,shadow');
			}
			smartdown.hideDisclosure('delta_turn', '', '');
			smartdown.showDisclosure('epsilon_turn', '', 'transparent');
			limit.reduceEpsilon(3000, function() {
				smartdown.hideDisclosure('epsilon_turn', '', '');
				smartdown.showDisclosure('delta_turn', '', 'transparent');
			});
		}
		else {
			smartdown.showDisclosure('tryagain','','bottomright,closeable,outline,draggable,transparent');
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


