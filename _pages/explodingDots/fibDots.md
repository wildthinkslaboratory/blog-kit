---
title: Fibonacci Dots 
smartdown: true
header: 'none'
lesson: 'fibonacci_dots'
ogimage: /assets/images/calculus/fibDots.jpg
---

# :::: intro
# --outlinebox int

[G'daymath](https://gdaymath.com/lessons/explodingdots/9-5-going-really-wild/)
[explodingdots.org](https://www.explodingdots.org/station/I9S9D)
$$\fbox{\phantom{\rule{.7ex}{.7ex}}}$$
$\fbox{$\bullet$} \framebox(30,30){} \leftarrow \fbox{${\bullet \bullet}$} $
# --outlinebox
# ::::


```javascript /autoplay/p5js/kiosk

// import the dots library
//smartdown.import=/assets/libs/fibDots.js


// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg';

smartdown.showDisclosure('intro','','transparent,topleft,closeable,draggable,shadow,outline');


// Adjust the surrounding DIV(s) a little
const myDiv = this.div;                                  
myDiv.style.background = '#88EEDD';
this.div.innerHTML = '';

const widthScale = 0.80;
const heightScale = 0.7;
const base = -2;               // set the base for the machine
const numberBoxes = 10;         // set how many boxes you want

let dots = new dotlib.Dots(p5, this.div);  // create the dots and boxes machine


p5.setup = function() {                          // this function is called when you start the
                                                 // playable.
  dots.setup(base, numberBoxes);             // initialize the machine with the base and number of boxes.

  let canvasWidth = window.innerWidth;    // set the size of the playable
  let canvasHeight = window.innerHeight;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();

  dots.loadSounds();                             // load the sounds for the app
  dots.turnOffRuleButton(); 

  // EnergyHack to inhibit looping after 1 sec, this allows for popups to
  // fade in (which should really be a CSS function, and not involve P5JS.
  // window.setTimeout(function() {
  //   p5.noLoop();
  // }, 30000);
};


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = window.innerWidth;  // the size of the window.  It will rescale all the
  const canvasHeight = window.innerHeight; // components to fit into the new window size.
  dots.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {                           // this function gets called repeatedly in a loop.
  dots.draw();                                   // The machine is redrawn multiple times a second.
}


p5.mousePressed = function()                     // this function is called everytime the user clicks the mouse
{
  // EnergyHack to enable looping for duration of drag.
//  p5.loop();

  dots.mousePressed();
}


p5.mouseDragged = function() {                   // this function is called everytime the user drags the mouse
  dots.mouseDragged();
}


p5.mouseReleased = function() {                  // this function is called when the user releases the mouse
  dots.mouseReleased();                          // button after a click.

  // EnergyHack to stop looping 5 sec after release.
  // window.setTimeout(function() {
  //   p5.noLoop();
  // }, 5000);
}
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
.
.
.
.



