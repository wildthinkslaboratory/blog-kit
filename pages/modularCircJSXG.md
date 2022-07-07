# :::: intro
# --outlinebox int
This is a companion interactive for one of my favorite [Mathologer](https://www.youtube.com/channel/UC1_uAIS3r8Vu6JjXWvastJg) videos.  Watch the video and then play with the interactive app.  You can try integer and fractional values.
![halfwidth](https://www.youtube.com/watch?v=qhbuKbxJsk8)
# --outlinebox
# ::::

# :::: panel
# --aliceblue panelbox
[draw](:=redraw=true) show numbers [](:XshowNumbers) 
number of points: [](:?points|number)  
multiply by: [](:?factor|number) 
[open image in new tab](:=download=true) 
# --aliceblue
# ::::

```javascript /autoplay/kiosk
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');


//////////////////////////////////////////////////////////////////////////////////////////////////

// set up the div and the page

smartdown.showDisclosure('panel','','bottomright,draggable,shadow');
//smartdown.showDisclosure('intro','','transparent,center,closeable,draggable,shadow,outline');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

let width = window.innerWidth;
let height = window.innerHeight;
console.log(width,height);


board = JXG.JSXGraph.initBoard('box', {
  axis:false, 
  keepaspectratio:false, 
  boundingbox:[-width,height,width,-height],
  showCopyright:false
});

let xaxis = board.create('axis', [[0, 0], [1,0]], {visible:false});
let yaxis = board.create('axis', [[0, 0], [0, 1]], {visible:false});



//////////////////////////////////////////////////////////////////////////////////////////////////


function modFloat(n,divisor) {
  let remainder = n;
  while (remainder >= divisor) {
    remainder -= divisor
  }
  return remainder;
}


// //////////////////////////////////////////////////////////////////////////////////////////////////

let nodeColor = 'rgb(20,20,20)';
let strokeColor = ['#EE2222', '#77FF44','#EE7733', '#3355FF','#00FF66','#4444FF','#7700FF','#88FF33', '#880066', '#669900', '#115577'];


// //////////////////////////////////////////////////////////////////////////////////////////////////

let pts = 40;
let multiplier = 2;
let radius = height * 0.9;
let nodes = [];
let lines = [];

function draw() {

  let cl = strokeColor[Math.floor(Math.random() * strokeColor.length)];

  for (let i=0; i < pts; i++) { // draw the nodes
    let angle = (i / (pts/2)) * Math.PI;
    let x1 = (radius * Math.cos(angle)); 
    let y1 = (radius * Math.sin(angle)); 
    nodes.push(board.create('point', [x1,y1], {color:'black', name:'', visible:false}));
  }

  for (let i=0; i < pts; i++) { // draw the lines
    let angle1 = (i / (pts/2)) * Math.PI;
    let x1 = (radius * Math.cos(angle1)); 
    let y1 = (radius * Math.sin(angle1)); 
    let j = modFloat(i * multiplier, pts);
    let angle2 = (j / (pts/2)) * Math.PI;
    let x2 = (radius * Math.cos(angle2)); 
    let y2 = (radius * Math.sin(angle2)); 
    lines.push(board.create('segment', [[x1,y1],[x2,y2]], {color:cl}));
  }


}


// //////////////////////////////////////////////////////////////////////////////////////////////////

// // Event handling


function clear() {
  board.removeObject(nodes);
  board.removeObject(lines);
}

this.sizeChanged = function() {
  board.resizeContainer(window.innerWidth, window.innerHeight);
};

this.sizeChanged();

draw();


smartdown.setVariable('points', pts);
smartdown.setVariable('factor', multiplier);
smartdown.setVariable('download', false);
smartdown.setVariable('redraw', false);
//smartdown.setVariable('showNumbers', showNums);

this.dependOn = ['download', 'redraw'];
this.depend = function() {

  if (env.download == true) {
    smartdown.setVariable('download', false);
    const svgText = new XMLSerializer().serializeToString(board.renderer.svgRoot);
    
    const blob = new Blob([svgText], { type: "image/svg+xml" });   // store in a Blob
    const url = URL.createObjectURL(blob);                         // create an URI pointing to blob
    const win = open(url);
    win.onload = (evt) => URL.revokeObjectURL(url);   // so the Garbage Collector can collect the blob
  }
  else {
    if (env.redraw == true) {
      smartdown.setVariable('redraw', false);
      if (env.factor > 300) {
        smartdown.setVariable('factor', 300);
      }
      if (env.points > 300) {
        smartdown.setVariable('points', 300);
      }
      if (env.points < 1) {
        smartdown.setVariable('points', 1);
      }
      pts = env.points;
      multiplier = env.factor;
      // showNums = env.showNumbers;
      clear();
      draw();
    }
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////




```
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
