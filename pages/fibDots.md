# :::: intro
# --outlinebox int
This is a base Phi ($\Phi$) machine as described in [James Tanton's](https://en.wikipedia.org/wiki/James_Tanton) [exploding dots](https://gdaymath.com/courses/exploding-dots/) curriculum. There are descriptions of it [here](https://gdaymath.com/lessons/explodingdots/9-5-going-really-wild/) and [here](https://www.explodingdots.org/station/I9S9D).  For your convenience, I've included a description of it together with James' first six questions here.  
[Begin](:=rule=true)
# --outlinebox
# ::::

# :::: rule
# --outlinebox ob1
This machine has one rule that we can apply in either direction. Give it a try!
![](/assets/images/calculus/phirule.svg)
[Next](:=blabels=true)
# --outlinebox
# ::::

# :::: blabels
# --outlinebox ob1
We aren't sure exactly what base this rule produces, but for now let's label the boxes with powers of $x$.
![](/assets/images/calculus/phiboxes.svg)

[First Question](:=d2=true)
# --outlinebox
# ::::


# :::: d2
# --outlinebox ob2
**Question 1** Show that, in this machine, the number $1$ can be represented as $0.10101010101 \ldots$. (It can also be represented just as $1$!)
[Next Question](:=d3=true)
# --outlinebox
# ::::

# :::: d3
# --outlinebox ob3
**Question 2:** Show that the number $2$ can be represented as $10.01$.
[Next Question](:=d4=true)
# --outlinebox
# ::::

# :::: d4
# --outlinebox ob4
**Question 3:** Show that the number $3$ can be represented as $100.01$.
[Next Question](:=d5=true)
# --outlinebox
# ::::

# :::: d5
# --outlinebox ob5
**Question 4:** Explain why each number can be represented in terms of $0$s and $1$s with no two consecutive $1$s.
(**TOUGH:** Are such representations unique?)
[Next Question](:=d6=true)
# --outlinebox
# ::::

# :::: d6
# --outlinebox ob6
**Question 5:** Show that in this machine we need $x^{n+2}=x^{n+1}+x^n$ for all $n$.
[Next Question](:=d7=true)
# --outlinebox
# ::::

# :::: d7
# --outlinebox ob7
**Question 6:** Dividing throughout by $x^n$, this tells us that $x$ must be a number satisfying $x^2= x + 1$.  There are two numbers that work. What is the positive number that works?

[More Questions](:=d8=true)
# --outlinebox
# ::::

# :::: d8
# --outlinebox ob8
For more questions check out James' exploration of [weird machines](https://gdaymath.com/lessons/explodingdots/9-5-going-really-wild/) and scroll down to the section called **BASE PHI**.
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

smartdown.setVariable('rule', false);
smartdown.setVariable('blabels', false);
smartdown.setVariable('d2', false);
smartdown.setVariable('d3', false);
smartdown.setVariable('d4', false);
smartdown.setVariable('d5', false);
smartdown.setVariable('d6', false);
smartdown.setVariable('d7', false);
smartdown.setVariable('d8', false);

// get the number of triangles from smartdown cell
this.dependOn = ['rule', 'blabels', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'];
this.depend = function() {

  if (env.rule == true) {
    smartdown.setVariable('rule',false);
    smartdown.showDisclosure('rule','','transparent,outline,draggable,closeable,topleft,shadow');
    smartdown.hideDisclosure('intro','','');
  }

  if (env.blabels == true) {
    smartdown.setVariable('blabels',false);
    smartdown.showDisclosure('blabels','','transparent,outline,draggable,closeable,topleft,shadow');
    smartdown.hideDisclosure('rule','','');
  }

  if (env.d2 == true) {
    smartdown.setVariable('d2',false);
    smartdown.showDisclosure('d2','','transparent,outline,draggable,closeable,topleft,shadow');
    smartdown.hideDisclosure('blabels','','');
  }

  if (env.d3 == true) {
    smartdown.setVariable('d3',false);
    smartdown.showDisclosure('d3','','transparent,outline,draggable,closeable,topleft,shadow');
    smartdown.hideDisclosure('d2','','');
  }

  if (env.d4 == true) {
    smartdown.setVariable('d4',false);
    smartdown.showDisclosure('d4','','transparent,outline,draggable,closeable,topleft,shadow');
    smartdown.hideDisclosure('d3','','');
  }

  if (env.d5 == true) {
    smartdown.setVariable('d5',false);
    smartdown.showDisclosure('d5','','transparent,outline,draggable,closeable,topleft,shadow');
    smartdown.hideDisclosure('d4','','');
  }

  if (env.d6 == true) {
    smartdown.setVariable('d6',false);
    smartdown.showDisclosure('d6','','transparent,outline,draggable,closeable,topleft,shadow');
    smartdown.hideDisclosure('d5','','');
  }

  if (env.d7 == true) {
    smartdown.setVariable('d7',false);
    smartdown.showDisclosure('d7','','transparent,outline,draggable,closeable,topleft,shadow');
    smartdown.hideDisclosure('d6','','');
  }

  if (env.d8 == true) {
    smartdown.setVariable('d8',false);
    smartdown.showDisclosure('d8','','transparent,outline,draggable,closeable,topleft,shadow');
    smartdown.hideDisclosure('d7','','');
  }

};


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



