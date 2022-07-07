# :::: notes
# --partialborder
When you adjust the right hand side of the rectangle array it will plot an $(x,y)$ point.  The value of $x$ matches the $x$ value of the right hand side of the rectangle array.  The $y$ value is the area of the rectangle array.
# --partialborder
# ::::

# :::: feedback
# --aliceblue
Please take a moment to fill out a short feedback form to help us improve this lesson!
[Leave Feedback](https://docs.google.com/forms/d/e/1FAIpQLScHS0uj7Kc-UmhGBbEFMO1N48VLXRXkv9qtdZ_mFXApDH_-GA/viewform?usp=sf_link)
# --aliceblue
# ::::

[note](::notes/button,transparent,draggable,closeable,center,outline,shadow) [clear](:=clear=true) [new color](:=incColor=true) [](:!pointColor)

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

let xlow = -13;
let xhigh = 13;
let ylow = -50;
let yhigh = 50;

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow], { xlabel:'x', ylabel:'f(x)'});
let F = new ProblemFunction(function(x) {  return -Math.pow(x,2)/8 + 5; }, 
  '', 3.5, [xlow,xhigh], [2,8]);
let F_id = workspace.addFunction(F);

let xint = new XInterval(workspace.board, -10, -5);
let slider = new IntSlider(xint.board, [xint.attachRightX, xint.attachY], [1, 100], 'N');
slider.setValue(20);
let rectangles = new RectangleArray(xint, F.f, slider, {});

let colors = ['red', 'blue', 'orange', 'green', 'pink', 'purple'];
let ci = 0;
let points = [];
rectangles.xint.x2.on('up', function() { 
  points.push(workspace.board.create('point', [ rectangles.xint.X2(), rectangles.area()], {
  	name:'', 
  	color:colors[ci], 
  	fixed:true} ));
});

////////////////////////////////////////////////////////////////////////////////////

let Atext = workspace.board.create('text', [
  xlow + 0.25 * (xhigh - xlow), 
  ylow + 0.8 * (yhigh - ylow),
  function() { return 'Total Area = ' + rectangles.area().toFixed(2); }], {
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

