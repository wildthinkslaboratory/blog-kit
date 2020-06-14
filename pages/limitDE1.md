# :::: success
# --partialborder
Success!  
$$\lim_{x \to 0} x \sin\left(\frac{1}{x}\right) = 0$$ 
Again, this game could continue for smaller and smaller intervals.  We'd like to be sure that Delta continues to counter Epsilon's moves.
[Continue](/pages/limitDE2)
# --partialborder
# ::::

# :::: clue
# --outlinebox 
You say that the limit as $x$ goes to $0$ of $x \sin\left(\frac{1}{x}\right)$ is [](:!suggestedLimit).

To prove your limit is correct, you have to counter every move made by Epsilon.  Epsilon will make smaller and smaller intervals around [](:!suggestedLimit).  You have to adjust the Delta interval around $0$ so that all the function values inside your interval are also inside Epsilon's interval.
[Play](:=play=true)
# --outlinebox 
# ::::

# :::: toolbar
# --aliceblue
Adjust the Delta interval so that all the function values inside your interval are also inside Epsilon's interval. 
# --aliceblue
# ::::


What is the limit of the function $f(x)= x \sin(\frac{1}{x})$ as $x$ goes to $0$? [](:?suggestedLimit) [closer](:=reduce=true) [all the way](:=all=true)
# :::: epsilon_turn
**Epsilon's Turn**
# ::::
# :::: delta_turn
**Delta's Turn** [Submit Turn](:=compute=true) [zoom in](:=zoom=true)
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

let xlow = -1;
let xhigh = 1;
let ylow = -1;
let yhigh = 1;

let th = new BlueTheme();

JXG.Options.layer['functiongraph'] = 5;
let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow], {xlabel:'', ylabel:''});
let F = new ProblemFunction(
	function(x) { 
		if (x == 0) { return 0; }
		return x * Math.sin(1/x);
	}, 
	'', 3.5, [xlow,xhigh], [1]);
let F_id = workspace.addFunction(F);

let approachLimit = new ApproachLimit(workspace.board, F.f, 0, undefined);
approachLimit.glider.moveTo([0.3,0]);

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
  approachLimit.onUpdate();
});


smartdown.setVariable('compute', false);
smartdown.setVariable('suggestedLimit', '');
smartdown.setVariable('play', false);
smartdown.setVariable('reduce', false);
smartdown.setVariable('all', false);
smartdown.setVariable('zoom', false);

let beginPlay = false;


this.dependOn = ['compute', 'suggestedLimit', 'play', 'reduce', 'all', 'zoom'];  
this.depend = function() {

	if (env.zoom == true) {
		smartdown.setVariable('zoom', false);
		workspace.board.zoomIn(0,0);
	}

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
		//smartdown.showDisclosure('toolbar','','center,transparent,draggable,closeable');
		smartdown.hideDisclosure('clue','','center,transparent,draggable,closeable,shadow');	
		smartdown.showDisclosure('delta_turn', '', 'transparent');
	
	}
	if (!beginPlay && env.suggestedLimit !== '') {
		beginPlay = true;
		approachLimit.hide();

		const limitValue = parseInt(env.suggestedLimit);

		limit = new EpsilonDeltaLimit(workspace.board, F.f, 0, limitValue);

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
		smartdown.showDisclosure('clue','','center,transparent,draggable,closeable,outline,lightbox,shadow');
	}

	if (env.compute == true) {
		smartdown.setVariable('compute', false);
		if (limit.checkDelta()) {
			instructions.setAttribute({visible:false});
			console.log(limit.epsilon());
			if (limit.epsilon() <= 0.025) {
				smartdown.showDisclosure('success', '', 'center,transparent,draggable,outline,closeable,shadow');
			}
			smartdown.hideDisclosure('delta_turn', '', '');
			smartdown.showDisclosure('epsilon_turn', '', 'transparent');
			limit.reduceEpsilon(3000, function() {
				smartdown.hideDisclosure('epsilon_turn', '', '');
				smartdown.showDisclosure('delta_turn', '', 'transparent');
			});
		}
		else {
			smartdown.showDisclosure('tryagain','','bottomright,transparent,colorbox');
	      	setTimeout(function () {
	        	smartdown.hideDisclosure('tryagain','','bottomright,colorbox');
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


