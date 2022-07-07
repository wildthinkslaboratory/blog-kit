### Another Way to Draw the Rectangles

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
Let's look at another way to draw the rectangles.  Imagine that our function $f(x)$ is the derivative of some other function $F(x)$.  
[Continue](/pages/ftc3)

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
//smartdown.import=/assets/libs/mapping.js

left.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

JXG.Options.text.useMathJax = true;

let xlow = -0.5;
let xhigh = 4;
let ylow = -8;
let yhigh = 40;

let a = 0;
let b = 3;
let n = 2;

let cs = new SteelTheme();

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });

let df = function(x) { return Math.pow(x,4)/8 + Math.pow(x,3)/12 - 3 * Math.pow(x,2) + 12;};
let f =  function(x) { return Math.pow(x,5)/40 + Math.pow(x,4)/48 - Math.pow(x,3) + 12* (x) + 15;  };
let F = new ProblemFunction(f, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let DF = new ProblemFunction(df, '', 4, [xlow,xhigh], []);
let DF_id = workspace.addFunction(DF);

let xintSR = new XInterval(workspace.board, a, b);

let slider = new IntSlider(xintSR.board, [xintSR.attachRightX, xintSR.attachY], [1, 50], 'N');
slider.setValue(n);

let secRectArray = new SecantRectArray(xintSR, F.f, slider, {
  annotations:'off',
  attachButtonVisible:false
});

secRectArray.secants.secants.setAttribute({
	strokecolor:cs.lightannote, 
    strokeWidth:1
});

secRectArray.rectangles.rectangles.setAttribute({
	fillOpacity: 0.01
});

//secRectArray.rectangles.hide();

let xint = new XInterval(workspace.board, 0, 1.5);

let secantRect = new SecantRectangle(xint,  F.f, { 
	annotations: 'on',
	snapMargin:0.5,
	change:'\\[f(c_i)(x_i - x_{i-1})\\]',
	units:'\\[(x_i - x_{i-1})\\]',
	rate:'\\[f(c_i)\\]',
	latexAdjustment: true,
	noUnitsNumber:true,
	noChangeNumber:true,
	noRateNumber:true,
	attachButtonVisible:false,
});

workspace.board.on('update', function() {
  workspace.onUpdate();
});


this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, window.innerHeight * 0.7);
};

this.sizeChanged();


this.dependOn = [];
this.depend = function() {

}
outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');




```