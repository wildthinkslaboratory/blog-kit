---
title: Limit
smartdown: true
header: 'none'
---
### The Epsilon Delta Game

x [](:?myX) limit [](:?myLimit) [smaller epsilon](:=reduce=true) epsilon [](:!epsilon) delta [](:!delta)
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

let xlow = -0.5;
let xhigh = 0.5;
let ylow = -0.5;
let yhigh = 0.5;

let th = new BlueTheme();

JXG.Options.layer['functiongraph'] = 5;
let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow]);
let F = new ProblemFunction(
	function(x) { return x * Math.sin(1/x);}, 
	'', 3.5, [xlow,xhigh], [1]);
let F_id = workspace.addFunction(F);

let hole = workspace.board.create('point', [1,2], { name:'', strokeColor: '#AAAAAA', fillColor: '#FFFFFF', fillOpacity:0.4, size:4})

let limit = new EpsilonDeltaLimit(workspace.board, F.f, 0, 0);








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
  smartdown.setVariable('epsilon', limit.epsilon().toFixed(3));
  smartdown.setVariable('delta', limit.delta().toFixed(3));
});

smartdown.setVariable('epsilon', limit.epsilon().toFixed(3));
smartdown.setVariable('delta', limit.delta().toFixed(3));
smartdown.setVariable('reduce', false);
smartdown.setVariable('myLimit', limit.limit());
smartdown.setVariable('myX', limit.X());

this.dependOn = ['reduce', 'myLimit', 'myX'];  
this.depend = function() {
  
	if (env.reduce == true) {
		smartdown.setVariable('reduce', false);
		limit.reduceEpsilon();
	}
	else {
		limit.setX(parseFloat(env.myX));
		limit.setLimit(parseFloat(env.myLimit));
		workspace.board.update();
	}


};


```

