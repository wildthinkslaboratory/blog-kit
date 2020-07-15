---
title: 'Times Tables Circles'
smartdown: true
ogimage: /assets/images/calculus/circles.jpg
header: 'none'
---


# :::: intro
# --outlinebox int
This is a companion interactive for one of my favorite [Mathologer](https://www.youtube.com/channel/UC1_uAIS3r8Vu6JjXWvastJg) videos.  Watch the video and then play with the interactive app.  You can try integer and fractional values.
![halfwidth](https://www.youtube.com/watch?v=qhbuKbxJsk8)
# --outlinebox
# ::::

# :::: panel
# --aliceblue panelbox
[draw](:=redraw=true) [clear](:=clear=true)
number of points: [](:?points|number)  
multiply by: [](:?factor|number) 
[prepare a download](:=download=true) 
```javascript /autoplay/inline
this.div.innerHTML = `<a></a>`;

this.dependOn = ['imageForDownload'];
this.depend = function() {
  if (env.imageForDownload == '') {
    this.div.innerHTML = `<a></a>`;
  }
  else {
      this.div.innerHTML = `<a target="_blank" rel="noopener noreferrer" href=${env.imageForDownload}>download link</a>`;
  }

}

```
# --aliceblue
# ::::

```javascript /autoplay/kiosk
//smartdown.import=//cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js


//////////////////////////////////////////////////////////////////////////////////////////////////

// set up the div and the page

smartdown.showDisclosure('panel','','bottomright,draggable,shadow');
smartdown.showDisclosure('intro','','transparent,center,closeable,draggable,shadow,outline');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<canvas id="appCanvas"></canvas>`


let canvas = document.getElementById("appCanvas"); 
let context = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;



//////////////////////////////////////////////////////////////////////////////////////////////////

let pts = 200;
let multiplier = 2;
let nodeRadius = 4;
let radius = canvas.height * 0.45;
let centerX = canvas.width/2;
let centerY = canvas.height/2;

let nodes = [];

function generateCirclePoints() {
  nodes = [];
  for (let i=0; i < pts; i++) {
    let angle = (i / (pts/2)) * Math.PI;
    let x = (radius * Math.cos(angle)) + centerX; 
    let y = (radius * Math.sin(angle)) + centerY; 
    nodes.push({'id': i, 'x': x, 'y': y});
  }
}

function modFloat(n,divisor) {
  let remainder = n;
  while (remainder >= divisor) {
    remainder -= divisor
  }
  return remainder;
}


//////////////////////////////////////////////////////////////////////////////////////////////////

let nodeColor = 'rgb(20,20,20)';
let strokeColor = ['#EE2222', '#77FF44','#EE00FF','#00FF66','#4444FF','#7700FF','#88FF33'];


//////////////////////////////////////////////////////////////////////////////////////////////////


function draw() {

  let color = strokeColor[Math.floor(Math.random() * strokeColor.length)];
  context.lineWidth = 1;
  context.strokeStyle = color;
  for (let i=0; i < nodes.length; i++) { // draw the lines
    let j = modFloat(i * multiplier, nodes.length);
    let angle = (j / (pts/2)) * Math.PI;
    let x = (radius * Math.cos(angle)) + centerX; 
    let y = (radius * Math.sin(angle)) + centerY; 

    context.moveTo(nodes[i]['x'],nodes[i]['y']);
    context.lineTo(x,y);
    context.stroke();
  }

  context.fillStyle = nodeColor;
  for (let i=0; i < nodes.length; i++ ) {   // draw the nodes
    context.beginPath();
    context.arc(nodes[i]['x'], nodes[i]['y'], nodeRadius, 0, 2 * Math.PI);
    context.fill();
  }
}

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

//////////////////////////////////////////////////////////////////////////////////////////////////

// Event handling

window.addEventListener('resize', function(event){

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  draw();
});




smartdown.setVariable('points', pts);
smartdown.setVariable('factor', multiplier);
smartdown.setVariable('download', false);
smartdown.setVariable('redraw', false);
smartdown.setVariable('clear', false);
smartdown.setVariable('imageForDownload', '');

this.dependOn = ['download', 'redraw', 'clear'];
this.depend = function() {

  if (env.download == true) {
    smartdown.setVariable('download', false);

    const imgData = canvas.toDataURL("image/jpg");
    smartdown.setVariable('imageForDownload', imgData);
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
      generateCirclePoints();
      draw();
    }
    if (env.clear == true) {
      smartdown.setVariable('clear', false);
      clear();
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

// draw the starting fractal
generateCirclePoints();
clear();
draw();


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
