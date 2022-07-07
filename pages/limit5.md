# :::: success
# --partialborder
Success!
This function is undefined at $x=1$ and also the limit at $x=1$ doesn't exist.  
[Continue](/pages/limitSummary1)
# --partialborder
# ::::

# :::: formatting
# --partialborder format
- You can represent $\sqrt{x}$ as `sqrt(x)`.
- You can represent infinity $\infty$ as `inf` and negative infinity $-\infty$ as `-inf`.
# --partialborder
# ::::

# :::: note1 
# --partialborder
You can drag the blue slider to get close to $x=1$, but you can get super close and still not reach it by using the [closer](:=reduce=true) button multiple times.
# --partialborder
# ::::
### More Limits

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
Take a look at the following function. 
$$ 
f(x) = \frac{x+1}{x-1}
$$
What happens to the function near $x=1$?
1. Go [closer](:=reduce=true) to $x=1$.  
2. Go [all the way](:=all=true) to $x=1$.
[NOTE:](::note1/tooltip,transparent)

The value of the $f(x)$ is undefined when $x=1$.
The limit as $x$ gets close to $1$ from the right is [](:?s1). 
The limit as $x$ gets close to $1$ from the left is [](:?s2). 
[Formatting Hints](::formatting/tooltip,transparent)
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
let xhigh = 5;
let ylow = -48;
let yhigh = 50;

let th = new BlueTheme();

JXG.Options.layer['functiongraph'] = 5;
let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow], {xlabel:'', ylabel:''});
let F = new ProblemFunction(
	function(x) { 
		if (x == 1) return undefined;
		return (x + 1) / (x-1); 
	}, 
	'', 3.5, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let limit = new ApproachLimit(workspace.board, F.f, 1, undefined);

let asymptote = workspace.board.create('line', [[1,0.2],[1,-0.2]], {strokeColor:'#DDD', stroteWidth:1})


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
	limit.onUpdate();
  workspace.onUpdate();              // hook up workspace update functions
});




smartdown.setVariable('reduce', false);
smartdown.setVariable('all', false);

this.dependOn = ['reduce', 'all'];  
this.depend = function() {
  
	if (env.reduce == true) {
		smartdown.setVariable('reduce', false);
		const newFValue = F.f(limit.glider.X() + (1 - limit.glider.X()) / 2);
		while (newFValue < workspace.board.getBoundingBox()[3] || 
			newFValue > workspace.board.getBoundingBox()[1]) {
			workspace.board.zoomOut();	
		}
		limit.reduceDelta();
	}

	if (env.all == true) {
		smartdown.setVariable('all', false);
		limit.eliminateDelta();
	}


};

outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');


```


```javascript /autoplay
function removeEnterFromSmartdownString(name, smartdownVar) {
  if (smartdownVar[smartdownVar.length - 1] === '\n') {           
    smartdown.setVariable(name, smartdownVar.replace(/\s/g, ''));
  }
}

smartdown.setVariable('s1','');
smartdown.setVariable('s2','');
this.dependOn = ['s1', 's2'];  
this.depend = function() {
    removeEnterFromSmartdownString('s1', env.s1);
    removeEnterFromSmartdownString('s2', env.s2);  
	if (env.s1 == 'inf' && env.s2 == '-inf') {
		smartdown.showDisclosure('success','','center,transparent,draggable,closeable,outline,shadow');
	}

};
```

