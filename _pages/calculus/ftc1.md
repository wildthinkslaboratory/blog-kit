---
title: Secant Rectangle
smartdown: true
header: 'none'
---
# :::: instructions2
Drag the slider to the left and right.
# ::::


[see object move](:=play=true) [show points](:=distanceToggle2=true) [show area](:=speedToggle2=true) [multiple periods](:=toggleArray=true)  [10 time periods](:=segments=10) [show rectangle curve](:=toggleCurveB=true) 
Number of Time Periods [](:-segments/1/100/1) [](:!segments) [Application Instructions](::instructions2/tooltip)

```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';

myDiv.innerHTML = `<div id='left' style='height:500px; width:80%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:500px; width:19%; float:left; border: 1px solid gray;background:#CCEEFF;border-radius:8px;';></div>`;

let xlow = -1;
let xhigh = 8;
let ylow = -4;
let yhigh = 16;


let workspace = new Workspace('left', [xlow,yhigh,xhigh,ylow],  
  { xlabel:'', ylabel:''});
let F = new ProblemFunction(function(t) { return Math.pow(t-4,4)/8 - 2 * (t-4) * (t-4) + 12; }, 
  'position of object', 6, [0,xhigh], []);
let F_id = workspace.addFunction(F);

let xintSR = new XInterval(workspace.board, 0, xhigh);
let slider = new IntSlider(xintSR.board, [xintSR.attachRightX, xintSR.attachY], [1, 100], 'N');
slider.setValue(4);
let secRectArray = new SecantRectArray(xintSR, F.f, slider, {
  annotations:'off',
  attachButtonVisible:false
});

// the derivative graph
// var s = function(t) { return 4 * Math.pow(t-4,3)/8 - 4 * (t-4); }
// var s_graph = board1.create('functiongraph', [s,0,8], {strokeColor:'purple', strokeWidth:4, visible:false});
// var sText = board1.create('text', [1.5,-2, 'Curve B'],{visible:false});


// let t = board1.create('point', [0,0], {visible:false});
// var p = board1.create('point', [
//   function() { return t.X(); }, 
//   function() { return d(t.X()); }], {color:'blue', name:''});

// var tinylines = board1.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:false}); 
// tinylines.updateDataArray = function() { 

//     let delta = 8/N;
//     let x = [];
//     let y = [];
//     for (let i=0; i <= 8.01; i += delta) {
//         x.push(i);
//         y.push(d(i));
//     }
//     this.dataX = x;
//     this.dataY = y;
// };


// var rectangles = board1.create('curve', [[0],[0]],{fillColor:'#7700FF', fillOpacity:0.3, visible:false});
// rectangles.updateDataArray = function() {

//     let delta = 8/N;
//     let x = [0];
//     let y = [0];
//     for (let i=0; i < 8; i += delta) {
//         let slope = (d(i + delta) - d(i)) / delta ;
//         x.push(i);  // four points of our rectangle
//         y.push(slope);

//         x.push(i + delta);
//         y.push(slope);

//         x.push(i + delta);
//         y.push(0);
//     }
//     this.dataX = x;
//     this.dataY = y;
// };

// var t1 = board1.create('point', [2, 0], {name: '', size:3, color:'blue', visible:false});
// var t2 = board1.create('point', [4, 0], {name: '', size:3, color:'blue', visible:false});

// var d1 = board1.create('point', [
//     function() { return t1.X(); },
//     function() { return d(t1.X()); } 
//   ], {name:'', color:'blue', fixed:true, size:2, visible:false});

// var d2 = board1.create('point', [
//     function() { return t2.X(); },
//     function() { return d(t2.X()); } 
//   ], {name:'', color:'blue', fixed:true, size:2, visible:false});

// var dline = board1.create('line', [d1, d2], {strokeColor:'blue', straightFirst:false, straightLast:false, visible:false});

// var d3 = board1.create('point', [
//     function() { return t2.X(); },
//     function() { return d(t1.X()); } 
//   ], {name:'', color:'blue', fixed:true, size:2, visible:false});

// var drise = board1.create('line', [d3, d2], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});
// var drun = board1.create('line', [d1, d3], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});

// var driseText = board1.create('text', [
//   function() { if (t2.X() > t1.X()) { return t2.X() + 0.1; } 
//          return t2.X() - 0.3; },
//   function() { return (d(t2.X()) - d(t1.X()))/2 + d(t1.X()); },
//   'd'], {fontSize:12, visible:false});

// var drunText = board1.create('text', [
//   function() { return t1.X() + (t2.X() - t1.X())/2; },
//   function() { if (t2.X() > t1.X()) { return d(t1.X()) - 0.5;} 
//                 return d(t1.X()) + 0.10; },
//   't'], {fontSize:12, visible:false});

// var dslopeText = board1.create('text', [
//   function() { if (t2.X() > t1.X()) { return t1.X() + (t2.X() - t1.X())/2 - 0.5; } 
//          return t1.X() + (t2.X() - t1.X())/2 + 0.2; },
//   function() { return (d(t2.X()) - d(t1.X()))/2 + d(t1.X()); },
//   'slope = r'], {fontSize:12, visible:false});

// var slope = (d(t2.X()) - d(t1.X())) / (t2.X() - t1.X());
// var s1 = board1.create('point', [t1.X(), slope], {name:'', fixed:true, visible:false});

// var s2 = board1.create('point', [t2.X(), slope], {name:'', fixed:true, visible:false});

// var srect = board1.create('polygon',[t1,s1,s2,t2],{fillColor:'#7700FF',visible:false});

// var slengthText = board1.create('text', [t1.X() + (t2.X() - t1.X())/2, slope + 0.8, 't'], {fontSize:12, visible:false});

// var sheightText = board1.create('text', [t2.X() + 0.1, slope/2, 'r'], {fontSize:12, visible:false});

// var sareaText = board1.create('text', [ t1.X() + (t2.X() - t1.X())/2,  slope/2 + 0.2, 'd'], {fontSize:12, visible:false});


let board2 = JXG.JSXGraph.initBoard('right', {boundingbox:[-1,16,2,-4], keepaspectratio:false, axis:false});

var board2Yaxis = board2.create('axis', [[0, 0], [0, 1]], 
      {name:'d', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });  

var board2Xaxis = board2.create('axis', [[0, 0], [1,0]], 
      {name:'', 
      withLabel: false,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-20, 20]   // (in pixels)
      },
      majorHeight:0
      });

board2Xaxis.removeAllTicks();

workspace.board.addChild(board2);

// var p2 = board2.create('point', [
//   1.2, 
//   function() { return p.Y(); }], {color:'blue', name:'', size:6});

// // let rocketurl = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/cab590371e4346929cf9096e53d163e772e1d132/rocket.png';
// // let rocket = board1.create('image',[rocketurl, [0.9,function() { return workspace.getArea() - 3000; }], [0.2,3000]]);

// // let p2 = board1.create('point',[1.2, 0],{visible:true});
// // let p3 = board1.create('point',[1.2, function() { return workspace.getArea(); }],{visible:false});

// // let dimensionLine = board1.create('segment', [p2,p3], {
// //   strokeColor:'#999999', 
// //   strokeWidth:2, 
// //   firstArrow:true, 
// //   lastArrow:true, 
// //   visible:true});

// // let dimensionText = board1.create('text', [
// //   1.3,
// //   function () { return workspace.getArea() / 2; },
// //   function() { return workspace.getArea().toFixed(0); }
// // ],{ strokeColor:'#999999', fontSize: 15, visible:true});


// smartdown.setVariable('segments', 3);
// var N = 3;
// var oldN = 3;
// smartdown.setVariable('distanceToggle2', false);
// smartdown.setVariable('speedToggle2', false);
// smartdown.setVariable('toggleArray', false);
// smartdown.setVariable('toggleCurveB', false);
// smartdown.setVariable('play', false);
// var speedOn = false;
// var distanceOn = false;


let widthPercent = 0.8;
let heightPercent = 0.7;
let widthRatio = 1/6;

this.sizeChanged = function() {     
  workspace.board.resizeContainer((1 - widthRatio - 0.01) * window.innerWidth * widthPercent, window.innerHeight * heightPercent);
  board2.resizeContainer(widthRatio * window.innerWidth * widthPercent,  window.innerHeight * heightPercent);
};


this.sizeChanged();


// var move = function() { 
//   t.moveTo([8,0],1000, {effect: '--', callback: function() {  t.moveTo([0,0]); } } ); 
// };

// // get the number of triangles from smartdown cell
// this.dependOn = ['segments','distanceToggle2','speedToggle2', 'toggleArray', 'toggleCurveB', 'play'];
// this.depend = function() {

//   board1.suspendUpdate();

//   if (env.play == true) {
//     smartdown.setVariable('play', false);
//     move();

//   }

//   if (env.distanceToggle2 == true && env.toggleArray == false) {
//     d1.setAttribute({visible:true});
//     d2.setAttribute({visible:true});
//     drise.setAttribute({visible:true});
//     drun.setAttribute({visible:true});
//     dline.setAttribute({visible:true});
//     driseText.setAttribute({visible:true});
//     drunText.setAttribute({visible:true});
//     dslopeText.setAttribute({visible:true});
//   }
  
//   if (env.speedToggle2 == true && env.toggleArray == false) {
//     smartdown.setVariable('segments', 4);
//   }

//   if (env.toggleArray == true) {
//     tinylines.setAttribute({visible:true});
//     rectangles.setAttribute({visible:true});
//     d1.setAttribute({visible:false});
//     d2.setAttribute({visible:false});
//   }

//   var P = parseInt(env.segments);
//   if (P != N) {
//     oldN = N;
//     N = P;    
//   }
  
//   if (N == 4) {
//     drise.setAttribute({visible:true});
//     drun.setAttribute({visible:true});
//     dline.setAttribute({visible:true});
//     driseText.setAttribute({visible:true});
//     drunText.setAttribute({visible:true});
//     dslopeText.setAttribute({visible:true});
//     srect.setAttribute({visible:true});
//     slengthText.setAttribute({visible:true});
//     sheightText.setAttribute({visible:true});
//     sareaText.setAttribute({visible:true});
//   }
//   else {
//     if (oldN == 4) {
//       drise.setAttribute({visible:false});
//       drun.setAttribute({visible:false});
//       dline.setAttribute({visible:false});
//       driseText.setAttribute({visible:false});
//       drunText.setAttribute({visible:false});
//       dslopeText.setAttribute({visible:false});
//       srect.setAttribute({visible:false});
//       slengthText.setAttribute({visible:false});
//       sheightText.setAttribute({visible:false});
//       sareaText.setAttribute({visible:false});
//     }
//   }

//   if (env.toggleCurveB == true) {
//     s_graph.setAttribute({visible:true});
//     sText.setAttribute({visible:true});
//   }

//   board1.unsuspendUpdate();
// };


```




