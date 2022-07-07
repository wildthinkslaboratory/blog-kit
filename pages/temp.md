# :::: tour2
# --partialborder 
The **distance** traveled by the object is equal to the **rate** times the **time**, $d = r \times t.$ We know two different geometric ways of showing this relationship.  [show relationship](:=showSR=true) The slope of the secant tells us the average velocity between two time points.  The corresponding rectangle expresses the distance traveled as the product of the rate and the time.
[next](:=show3=true) 
# --partialborder 
# ::::

# :::: tour3
# --partialborder 
We can make more secants and rectangles over more intervals. [more intervals](:=showArray=true). What happens when these time intervals get smaller?
number of intervals [](:-segments/1/100/1) [](:!segments) 
[next](:=show4=true)
# --partialborder 
# ::::

# :::: tour4
# --partialborder 
The rectangles define a new function that relates to our original curve. [show shadow curve](:=showD=true)  Remember that the height of each skinny rectangle is the average velocity the object travels during a very short time period.  As these rectangles get skinnier, this new curve becomes our velocity curve.
number of intervals [](:-segments/1/100/1) [](:!segments)
[Continue](/pages/shadowSecantCurve)
# --partialborder 
# ::::

### Another way to do the Rectangles
number of intervals [](:-segments/1/100/1) [](:!segments) 
```javascript /autoplay

//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';

myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:800px; width:800px'>`;

let purple = '#DD44DD';
let orange = '#EE5500';

let xlow = -1.5;
let xhigh = 10;
let ylow = -8;
let yhigh = 16;


let workspace = new Workspace('box1', [xlow,yhigh,xhigh,ylow],  
  { xlabel:'time (s)', ylabel:'position (m)', colorTheme:'steel'});
let F = new ProblemFunction(function(t) { return Math.pow(t-4,4)/8 - 2 * (t-4) * (t-4) + 12; }, 
  'position of object', 5, [0,xhigh], []);

let F_id = workspace.addFunction(F);

// let t = workspace.board.create('point', [0,0], {visible:false});
// var p = workspace.board.create('point', [
//   function() { return t.X(); }, 
//   function() { return F.f(t.X()); }], {color:orange, name:''});

// the derivative graph
var s = function(t) { return 4 * Math.pow(t-4,3)/8 - 4 * (t-4); }
var s_graph = workspace.board.create('functiongraph', [s,0,8], {strokeColor:'#4499FF', strokeWidth:4, visible:true});



let N = 4;
let xintSR = new XInterval(workspace.board, 0, 8);

let slider = new IntSlider(xintSR.board, [xintSR.attachRightX, xintSR.attachY], [1, 100], 'N');
slider.setValue(N);

let secRectArray = new FTCArray(xintSR, F.f, s, slider, {
  annotations:'off',
  attachButtonVisible:false
});




let widthPercent = 0.8;
let heightPercent = 0.7;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};


this.sizeChanged();

smartdown.setVariable('segments',4);

// get the number of triangles from smartdown cell
this.dependOn = ['segments'];
this.depend = function() {

  if (env.segments != N) {
    N = env.segments;
    secRectArray.slider.setValue(N);
  }

};


```


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

let xlow = -0.5;
let xhigh = 4;
let ylow = -8;
let yhigh = 40;

let a = 0;
let b = 3;
let n = 6;

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


let widthPercent = 0.8;
let heightPercent = 0.7;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};


this.sizeChanged();

this.dependOn = [];
this.depend = function() {

}



```

