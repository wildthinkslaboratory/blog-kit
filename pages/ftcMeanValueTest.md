```javascript /autoplay



//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');
// import the calc library
//smartdown.import=/assets/libs/calc.js
//smartdown.import=/assets/libs/mapping.js

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';

myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

JXG.Options.text.useMathJax = true;

let xlow = -1;
let xhigh = 8;
let ylow = -8;
let yhigh = 40;

let a = 1;
let b = 6;
let n = 3;

let cs = new SteelTheme();

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });

let df = function(x) { return Math.pow(x/2,4)/8 + Math.pow(x/2,3)/12 - 3 * Math.pow(x/2,2) + 12;};
let f =  function(x) { return Math.pow(x/2,5)/40 + Math.pow(x/2,4)/48 - Math.pow(x/2,3) + 12* (x/2) + 15;  };let F = new ProblemFunction(f, '', 4, [xlow,xhigh], []);
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
	fillOpacity: 0.05
});

//secRectArray.hide();

let xint = new XInterval(workspace.board, 1, 2);

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
//secantRect.hide();

workspace.board.on('update', function() {
  workspace.onUpdate();
});


let widthPercent = 0.8;
let heightPercent = 0.8;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};


this.sizeChanged();

this.dependOn = [];
this.depend = function() {

}



```

