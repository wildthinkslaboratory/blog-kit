### Sine Function

```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
// myDiv.style.width = '100%';
// myDiv.style.height = '100%';
// myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='left' style='height:600px; width:60%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:600px; width:39%; float:left; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div>`;

let color1 = '#FF5500';
let color2 = '#22EEEE';

// create the board
JXG.Options.axis.ticks.majorHeight = 40;
let board0 = JXG.JSXGraph.initBoard('right', {
  boundingbox:[-Math.PI * 2,2,Math.PI * 2,-2], 
  keepaspectratio:false, 
  axis:false, 
  showCopyright:false
});
let xaxis2 = board0.create('axis', 
  [[0, 0], [1,0]], {
  needsRegularUpdate: false, 
  ticks:{
    label:{offset:[-10,-10]},
    scale: Math.PI, 
    scaleSymbol: 'π'
    } 
 }
);
let yaxis2 = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   

let s = function(x) { return Math.sin(x); };
let sin = board0.create('functiongraph', [s,-Math.PI * 2, Math.PI * 2],{strokeColor:'#CCCCCC'});

let x = board0.create('glider', [0,0, xaxis2], {name:'', size:8, color:color1});

let fx = board0.create('point', [
  function() { return x.X(); }, 
  function() { return s(x.X()); }], {color:color1, name:''});

let segment = board0.create('segment', [x, fx], {strokeColor:color2, strokeWidth:7 });

let title = board0.create('text', [-4, 1.5, 'sin(x)'], {fontSize:24});

//JXG.Options.axis.ticks.majorHeight = 40;
JXG.Options.layer['line'] = 5;
// create the board
let board1 = JXG.JSXGraph.initBoard('left', {
	boundingbox:[-2,2,2,-2], 
	axis:true,
	keepaspectratio:false, 
	showCopyright:false});


let circle = board1.create('circle', [[0,0], [1,0]], { strokeColor:'#CCCCCC', strokeWidth:2, fixed:true});

let p2 = board1.create('point', [
	function() { return Math.cos(x.X()); },
	function() { return Math.sin(x.X()); }], { color:color1, name:''});

let inv1 = board1.create('point', [
	function() { return Math.cos(x.X()); },
	0], { visible:false });

let rise = board1.create('segment', [ inv1, p2], {strokeColor:color2,  strokeWidth:7 });

let hyp = board1.create('segment', [[0,0], p2], {strokeColor:'#555555',  strokeWidth:3 });

let run = board1.create('segment', [[0,0], inv1], {strokeColor:'#555555',  strokeWidth:3 });

board0.addChild(board1);

let pagePercent = 0.8;
let width = window.innerWidth * pagePercent * 0.49;

this.sizeChanged = function() {
  board0.resizeContainer(width,width);      
  board1.resizeContainer(width,width);
};

this.sizeChanged();


// this.dependOn = [''];
// this.depend = function() {

// };

```

### Cosine Function

```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='left2' style='height:600px; width:60%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right2' style='height:600px; width:39%; float:left; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div>`;

let color1 = '#FF5500';
let color2 = '#22EEEE';

// create the board
JXG.Options.axis.ticks.majorHeight = 40;
let board0 = JXG.JSXGraph.initBoard('right2', {boundingbox:[-Math.PI * 2,2,Math.PI * 2,-2], keepaspectratio:false, axis:false, showCopyright:false});
let xaxis2 = board0.create('axis', 
  [[0, 0], [1,0]], {
  needsRegularUpdate: false, 
  ticks:{
    label:{offset:[-10,-10]},
    scale: Math.PI, 
    scaleSymbol: 'π'
    } 
 }
);
let yaxis2 = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   

let s = function(x) { return Math.cos(x); };
let sin = board0.create('functiongraph', [s,-Math.PI * 2, Math.PI * 2],{strokeColor:'#CCCCCC'});

let x = board0.create('glider', [0,0, xaxis2], {name:'', size:8, color:color1});

let fx = board0.create('point', [
  function() { return x.X(); }, 
  function() { return s(x.X()); }], {color:color1, name:''});

let segment = board0.create('segment', [x, fx], {strokeColor:color2, strokeWidth:7 });

let title = board0.create('text', [-4, 1.5, 'cos(x)'], {fontSize:24});

//JXG.Options.axis.ticks.majorHeight = 40;
JXG.Options.layer['line'] = 5;
// create the board
let board1 = JXG.JSXGraph.initBoard('left2', {
	boundingbox:[-2,2,2,-2], 
	axis:true,
	keepaspectratio:false, 
	showCopyright:false});


let circle = board1.create('circle', [[0,0], [1,0]], { strokeColor:'#CCCCCC', strokeWidth:2, fixed:true });

let p2 = board1.create('point', [
	function() { return Math.cos(x.X()); },
	function() { return Math.sin(x.X()); }], { color:color1, name:''});

let inv1 = board1.create('point', [
	function() { return Math.cos(x.X()); },
	0], { visible:false });

let rise = board1.create('segment', [inv1,p2], {strokeColor:'#555555',  strokeWidth:3 });

let hyp = board1.create('segment', [[0,0], p2], {strokeColor:'#555555',  strokeWidth:3 });

let run = board1.create('segment', [[0,0], inv1], {strokeColor:color2,  strokeWidth:7 });

board0.addChild(board1);

let pagePercent = 0.8;
let width = window.innerWidth * pagePercent * 0.49;

this.sizeChanged = function() {
  board0.resizeContainer(width,width);      
  board1.resizeContainer(width,width);
};

this.sizeChanged();


// this.dependOn = [''];
// this.depend = function() {

// };

```