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
let multiplier = 2.4;
let nodeRadius = 4;
let radius = canvas.height * 0.45;
let centerX = canvas.width/2;
let centerY = canvas.height/2;
let delta = canvas.height/50;
let showNums = true;

let nodes = [];

function fontsizeFromPoints(pts) {
  // 1 - 300 mapped to 16 to 6
  return Math.floor(8 + (10 - (pts/300 * 10)));
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
let strokeColor = ['#EE2222', '#77FF44','#EE7733', '#3355FF','#00FF66','#4444FF','#7700FF','#88FF33', '#880066', '#669900', '#115577'];


//////////////////////////////////////////////////////////////////////////////////////////////////


function draw() {

  let color = strokeColor[Math.floor(Math.random() * strokeColor.length)];
  context.lineWidth = 1;
  context.strokeStyle = color;

  for (let i=0; i < pts; i++) { // draw the lines
    let angle1 = (i / (pts/2)) * Math.PI;
    let x1 = (radius * Math.cos(angle1)) + centerX; 
    let y1 = (radius * Math.sin(angle1)) + centerY; 
    let j = modFloat(i * multiplier, pts);
    let angle2 = (j / (pts/2)) * Math.PI;
    let x2 = (radius * Math.cos(angle2)) + centerX; 
    let y2 = (radius * Math.sin(angle2)) + centerY; 

    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
  }

  context.fillStyle = nodeColor;
  context.strokeStyle = nodeColor;

  let fontsize = fontsizeFromPoints(pts);
  context.font = fontsize + "px Arial";

  for (let i=0; i < pts; i++) { // draw the nodes
    let angle = (i / (pts/2)) * Math.PI;
    let x1 = (radius * Math.cos(angle)) + centerX; 
    let y1 = (radius * Math.sin(angle)) + centerY; 
    context.beginPath();
    context.arc(x1, y1, nodeRadius, 0, 2 * Math.PI);
    context.fill();



    if ( showNums) {
      let x2 = ((radius + delta + fontsize/2) * Math.cos(angle)) + centerX; 
      let y2 = ((radius + delta + fontsize/2) * Math.sin(angle)) + centerY; 
      let text = i.toString();
      context.fillText(i, 
        x2 - context.measureText(text).width/2, 
        y2 + fontsize/2);      
    }
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
  radius = canvas.height * 0.45;
  centerX = canvas.width/2;
  centerY = canvas.height/2;
  delta = canvas.height/50;
  clear();
  draw();
});




smartdown.setVariable('points', pts);
smartdown.setVariable('factor', multiplier);
smartdown.setVariable('download', false);
smartdown.setVariable('redraw', false);
smartdown.setVariable('showNumbers', showNums);

this.dependOn = ['download', 'redraw'];
this.depend = function() {

  if (env.download == true) {
    smartdown.setVariable('download', false);

    const imgData = canvas.toDataURL("image/jpg");
    let iframe = "<iframe width='100%' height='100%' src='" + imgData + "'></iframe>"
    let x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
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
      showNums = env.showNumbers;
      clear();
      draw();
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

// draw the starting fractal
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
