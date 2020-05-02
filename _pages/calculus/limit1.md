---
title: Limit
smartdown: true
lesson: 'limit'
header: 'none'
---

# :::: success
Success! 
[Continue](/pages/secant4)
# ::::

# :::: keeptrying
Keep trying. 
# ::::

# :::: clue
# --outlinebox
### A Weird Function
We've graphed the function
$$ 
  f(x) =
  \begin{cases}
  	x + 1 & \text{$x < 2$ or $x > 2$} \newline
    4 & \text{if $x=2$} 
  \end{cases}
$$
It's a sort of contrived function. I'm not sure where it would be useful in real life to define a function like this but we'll use it here to illustrate a point.  

It's a valid function.  The limit at a point and the function value at that point don't have to agree.
# --outlinebox
# ::::


[?](::clue/button,transparent,draggable,closeable,center,shadow) Go [closer](:=reduce=true) to $x=1$.  Go [all the way](:=all=true) to $x=1$.
What value does $f$ get close to near $x=1$? [](:?s1)  
What is the value of $f(x)$ at $x=1$? [](:?s2) 
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
let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow], {xlabel:'', ylabel:''});
let F = new ProblemFunction(
	function(x) { return x + 1; }, 
	'', 3.5, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let limit = new ApproachLimit(workspace.board, F.f, 2, 4);



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
	limit.onUpdate();
  workspace.onUpdate();              // hook up workspace update functions
});


smartdown.setVariable('reduce', false);
smartdown.setVariable('all', false);

this.dependOn = ['reduce', 'all'];  
this.depend = function() {
  
	if (env.reduce == true) {
		smartdown.setVariable('reduce', false);
		limit.reduceDelta();		
	}

	if (env.all == true) {
		smartdown.setVariable('all', false);
		limit.eliminateDelta();
	}


};


```

