#### What's the code for -3?

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
const numberBoxes = 4;         // set how many boxes you want

var dots = new dotlib.Dots(p5, this.div);  // create the dots and boxes machine
const instructions = 'Click the rule button to activate the new rule';
const popup = new Popup(p5, 0.35, 0.15,  0.3, 'BEGIN', 'CLICK_RULE', 'BEGIN', instructions);
popup.setArrow(0.5, 0.1);

p5.setup = function() {                          // this function is called when you start the
                                                 // playable.
  dots.addInstructions(popup);
  dots.setup(base, numberBoxes);             // initialize the machine with the base and number of boxes.
  var canvasWidth = p5.windowWidth * widthScale;  // set the size of the playable
  var canvasHeight = p5.windowHeight * heightScale;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();

  dots.loadSounds();                             // load the sounds for the app
                                                 // configure the machine the way we want it.
  dots.addDotsToBox(3,0,0);
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
What's the code for $-3$? [](:?answer2)
That's $(-8) + 4 + 0 + 1 = -3$.
[Continue](/pages/NegaBinary5)

```javascript /autoplay
smartdown.setVariable('answer2', '');
this.dependOn = ['answer2'];


this.depend = function() {
  if (env.answer2 === '1101') {
    smartdown.showDisclosure('cool','','bottomright,transparent');
    setTimeout(function () {
           smartdown.hideDisclosure('cool','','bottomright,transparent');
      }, 3000);
//    setTimeout(function () {
//           smartdown.showDisclosure('d2', '', 'transparent');
//      }, 2000);
  }
};
```


# :::: cool
# --colorbox
Cool.
# --colorbox
# ::::