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

let xlow = -1;
let xhigh = 5;
let ylow = -8;
let yhigh = 45;

let a = 1;
let b = 4;
let n = 4;

let cs = new SteelTheme();

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });

let df = function(x) { return Math.pow(x-1,4)/8 + Math.pow(x-1,3)/12 - 3 * Math.pow(x-1,2) + 12;};
let f =  function(x) { return Math.pow(x-1,5)/40 + Math.pow(x-1,4)/48 - Math.pow(x-1,3) + 12* (x-1) + 20;  };
let F = new ProblemFunction(f, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let DF = new ProblemFunction(df, '', 4, [xlow,xhigh], []);
let DF_id = workspace.addFunction(DF);

let N = 4;
let xintSR = new XInterval(workspace.board, a, b);

let slider = new IntSlider(xintSR.board, [xintSR.attachRightX, xintSR.attachY], [1, 50], 'N');
slider.setValue(n);

let secRectArray = new SecantRectArray(xintSR, F.f, slider, {
  annotations:'off',
  attachButtonVisible:false
});
//secRectArray.hide();

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