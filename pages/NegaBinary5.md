#### Play


Here's a fully working machine and here are some things for you to try.

- Work out the codes for $0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10$.
- Work out the codes for $-1, -2, -3, -4, -5, -6, -7, -8, -9, -10$.
- How is the code for each positive number $x$ related to the code for it's negation $-x$?  Can you construct one from the other?
- When we are working with a positive base, we often use one algorithm to do addition and then use a different algorithm to do subtraction.  Can you figure out a method for doing addition in negative binary?  Next, how would you use that same method for subtraction without needing to use any negative signs anywhere?
- Can you make up divisibility rules?  How can you tell if a number is divisible by $2$? When is it divisible by $3$?
- Is every number's $\lbrace 0, 1 \rbrace$ code unique?  If so, how would you prove it?



```javascript /autoplay/p5js

// import the dots library
//smartdown.import=/assets/libs/dots.js


// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg';


// Adjust the surrounding DIV(s) a little
const myDiv = this.div;                                  // This chunk of code is some HTML/CSS stuff
myDiv.style.position = 'relative';                       // to make the playable look pretty
myDiv.style['background-image'] = `url(${bgURL})`;
myDiv.style['background-repeat'] = 'no-repeat';
myDiv.style['background-size'] = 'cover';
myDiv.style.height = '100%';
myDiv.style.width = '100%';
myDiv.style.padding = '0';
myDiv.style.margin = '0';
myDiv.style.overflow = 'hidden';
myDiv.style.border = '5px solid gray';
this.div.style.margin = '10px auto'; // shorthand for '10px auto 10px auto'
this.div.innerHTML = '';

const widthScale = 0.80;
const heightScale = 0.7;
const base = -2;               // set the base for the machine
const numberBoxes = 6;         // set how many boxes you want

var dots = new dotlib.Dots(p5, this.div);  // create the dots and boxes machine


p5.setup = function() {                          // this function is called when you start the
                                                 // playable.
  dots.setup(base, numberBoxes);             // initialize the machine with the base and number of boxes.
  var canvasWidth = p5.windowWidth * widthScale;    // set the size of the playable
  var canvasHeight = p5.windowHeight * heightScale;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();

  dots.loadSounds();                             // load the sounds for the app
  // EnergyHack to inhibit looping after 1 sec, this allows for popups to
  // fade in (which should really be a CSS function, and not involve P5JS.
  window.setTimeout(function() {
    p5.noLoop();
  }, 1000);
};


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth * widthScale;  // the size of the window.  It will rescale all the
  const canvasHeight = p5.windowHeight * heightScale; // components to fit into the new window size.
  dots.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {                           // this function gets called repeatedly in a loop.
  dots.draw();                                   // The machine is redrawn multiple times a second.
}


p5.mousePressed = function()                     // this function is called everytime the user clicks the mouse
{
  // EnergyHack to enable looping for duration of drag.
  p5.loop();

  dots.mousePressed();
}


p5.mouseDragged = function() {                   // this function is called everytime the user drags the mouse
  dots.mouseDragged();
}


p5.mouseReleased = function() {                  // this function is called when the user releases the mouse
  dots.mouseReleased();                          // button after a click.

  // EnergyHack to stop looping 5 sec after release.
  window.setTimeout(function() {
    p5.noLoop();
  }, 5000);
}
```




