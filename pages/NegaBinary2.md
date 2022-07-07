#### Now You Try

Remember the main rule!
# --outlinebox main_rule
**The main rule:**
 Two purple **dots** on the right change into one blue negative **dot** or **antidot** in the box to the left.   $\fbox{$\circ$} \leftarrow \fbox{${\bullet \bullet}$} $
# --outlinebox

Let's write the number $2$.  We'll start by putting two dots into the rightmost box of the [**playable**](::playable/tooltip,transparent).
# :::: playable
# --partialborder
The interactive app below is called a **playable**.  Notice the thin gray bar above it.  You can reset the app by clicking on this band, once to stop the playable and again to start it.  When the playable is stopped you can see the playable's code.
# --partialborder
# ::::

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

const widthScale = 0.8;
const heightScale = 0.7;
const base = -2;               // set the base for the machine
const numberBoxes = 2;         // set how many boxes you want

const instructions = 'Drag a DOT to the left. (You can also drag it back to the right.)';
let popup = new Popup(p5, 0.03, 0.3,  0.25, 'BEGIN', '', 'BEGIN', instructions);

var dots1 = new dotlib.Dots(p5, this.div);  // create the dots and boxes machine

p5.setup = function() {                          // this function is called when you start the
                                                 // playable.
  dots1.addInstructions(popup);
  dots1.setup(base, numberBoxes);                 // initialize the machine with the base and number of boxes.
  var canvasWidth = p5.windowWidth * widthScale;  // set the size of the playable
  var canvasHeight = p5.windowHeight * heightScale;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();

  dots1.loadSounds();                             // load the sounds for the app
  dots1.turnOffRuleButton();                      // configure the machine the way we want it.
  dots1.turnOffAddDotButton();
  dots1.allowAddDots(false);
  dots1.allowRemoveDots(false);
  dots1.addDotsToBox(2,1,0);
  // EnergyHack to inhibit looping after 1 sec, this allows for popups to
  // fade in (which should really be a CSS function, and not involve P5JS.
  window.setTimeout(function() {
    p5.noLoop();
  }, 1000);
};


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth * widthScale;  // the size of the window.  It will rescale all the
  const canvasHeight = p5.windowHeight * heightScale;    // components to fit into the new window size.
  dots1.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {                           // this function gets called repeatedly in a loop.
  dots1.draw();                                   // The machine is redrawn multiple times a second.
}


p5.mousePressed = function()                     // this function is called everytime the user clicks the mouse
{
  // EnergyHack to enable looping for duration of drag.
  p5.loop();

  dots1.mousePressed();
}


p5.mouseDragged = function() {                   // this function is called everytime the user drags the mouse
  dots1.mouseDragged();
}


p5.mouseReleased = function() {                  // this function is called when the user releases the mouse
  dots1.mouseReleased();                          // button after a click.

  // EnergyHack to stop looping 5 sec after release.
  window.setTimeout(function() {
    p5.noLoop();
  }, 5000);
}
```

When we put two dots into this machine and drag one to the left, we get the code `-1` `0`.  We have one negative dot in the $-2$ box and no dots in the $1$ box.  That's $(-1)(-2) + (0)(1) = 2$.  So the code `-1` `0` represents the number $2$ but the problem is we weren't going to use negative signs in our code.  Let's fix that.
[Continue](/pages/NegaBinary3)
