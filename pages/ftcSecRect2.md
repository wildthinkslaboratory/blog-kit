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

let cs = new SteelTheme();

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });

let df = function(x) { return Math.pow(x/2,4)/8 + Math.pow(x/2,3)/12 - 3 * Math.pow(x/2,2) + 12;};
let f =  function(x) { return Math.pow(x/2,5)/40 + Math.pow(x/2,4)/48 - Math.pow(x/2,3) + 12* (x/2) + 15;  };
let F = new ProblemFunction(f, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let DF = new ProblemFunction(df, '', 4, [xlow,xhigh], []);
let DF_id = workspace.addFunction(DF);

let xintSR = new XInterval(workspace.board, a, b);


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

