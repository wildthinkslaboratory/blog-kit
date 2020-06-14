# :::: notes
# --partialborder note
When you adjust the right hand side of the secant it will plot an $(x,y)$ point.  The value of $x$ matches the $x$ value of the left hand side of the secant.  The $y$ value is the slope of the secant.
# --partialborder
# ::::

# :::: feedback
# --aliceblue
Please take a moment to fill out a short feedback form to help us improve this lesson!
[Leave Feedback](https://docs.google.com/forms/d/e/1FAIpQLScHS0uj7Kc-UmhGBbEFMO1N48VLXRXkv9qtdZ_mFXApDH_-GA/viewform?usp=sf_link)
# --aliceblue
# ::::

[note](::notes/transparent,draggable,closeable,outline,center,shadow) [clear](:=clear=true) [new color](:=incColor=true) [](:!pointColor)

```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

smartdown.showDisclosure('feedback','','topright,draggable,closeable,outline,shadow,transparent');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:800px; width:800px'>`;

let xlow = -6;
let xhigh = 6;
let ylow = -13;
let yhigh = 50;

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow], { xlabel:'x', ylabel:'f(x)'});
let F = new ProblemFunction(function(x) {  return x * x + 1; }, 
  '', 3.5, [xlow,xhigh], [2,8]);
let F_id = workspace.addFunction(F);

let xint = new XInterval(workspace.board, 1, 4);
let secant = new Secant(xint, F.f, {});

let colors = ['red', 'blue', 'orange', 'green', 'pink', 'purple'];
let ci = 0;
let points = [];
secant.xint.x2.on('up', function() { 
  points.push(workspace.board.create('point', [ secant.xint.X1(), secant.slope()], {
  	name:'', 
  	color:colors[ci], 
  	fixed:true} ));
});

////////////////////////////////////////////////////////////////////////////////////

let Atext = workspace.board.create('text', [
  xlow + 0.25 * (xhigh - xlow), 
  ylow + 0.8 * (yhigh - ylow),
  function() { return 'Slope = ' + secant.slope().toFixed(2); }], {
  fontSize:20,
  visible:true
});


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


smartdown.setVariable('clear', false);
smartdown.setVariable('incColor', false);
smartdown.setVariable('pointColor', colors[ci]);

this.dependOn = ['clear', 'incColor'];
this.depend = function() {
	if (env.clear == true) {
		smartdown.setVariable('clear', false);
		for (let i=0; i < points.length; i++) {
			workspace.board.removeObject(points[i]);
		}
		points = [];
	}

	if (env.incColor == true) {
		smartdown.setVariable('incColor', false);
		if (ci < colors.length - 1) {
			ci += 1;
		}
		else {
			ci = 0;
		}
		smartdown.setVariable('pointColor', colors[ci]);
	}
};


```

