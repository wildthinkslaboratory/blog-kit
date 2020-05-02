---
title: Limit
smartdown: true
header: 'none'
---
### Limits

Cases we need to manage
1. continuous function
2. single undefined point
3. single discontinuous point
4. limit from right and left different

[half way to point](:=reduce=true) [all the way to point](:=all=true) 
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
	function(x) { 
		if (x < 1) { return x; }
		return x + 1;
	}, 
	'', 3.5, [xlow,xhigh], [1]);
let F_id = workspace.addFunction(F);

let limit = new ApproachLimit(workspace.board, F.f, 1, 2);



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

