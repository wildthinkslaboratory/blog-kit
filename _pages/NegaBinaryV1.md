---
title: Negative Binary 
background: ''
smartdown: true
---

# --outlinebox notice
**Notice:**
This page builds on James Tanton's Exploding Dots curriculum. If you're new to exploding dots, checkout these amazing pages: [G'Day Math! Exploding Dots](http://gdaymath.com/courses/exploding-dots/) and [Global Math Week Exploding Dots](https://www.explodingdots.org).  Then come back here and continue the journey.
# --outlinebox


So you've learned how to write numbers in [base 2 (binary) ](http://gdaymath.com/lessons/explodingdots/1-2-1-leftarrow-2-machine/), and you know how to write numbers in [base 3](http://gdaymath.com/lessons/explodingdots/2-3-explaining-machines/) as well as the usual way in [base 10](http://gdaymath.com/lessons/explodingdots/1-4-1-leftarrow-10-machine/).  Here's another cool way to write down numbers.  It's called [**negative binary**](::negbin/tooltip) and we can write all of the integers with it, both negative and positive, using only the symbols `0` and `1`.  Here's the catch.  We aren't going to use any negative signs, `-`, in front of a number to say that it's negative.  Here's a video from Goldfish and Robin that will show you how to get started.

# :::: negbin
**Negative Binary** represents numbers in base -2. Both positive and negative numbers are represented with the symbols `0` and `1` without the use of a minus sign `-`.
# ::::

![fullwidth](https://youtu.be/ZN1iXkyuIi8)

# Now You Try

Remember the main rule!
# --outlinebox main_rule
**The main rule:**
 Two purple **dots** on the right change into one blue negative **dot** or **antidot** in the box to the left.   $\fbox{$\circ$} \leftarrow \fbox{${\bullet \bullet}$} $
# --outlinebox

Let's write the number $2$.  We'll start by putting two dots into the rightmost box of the [**playable**](::playable/tooltip).
# :::: playable
The interactive app below is called a **playable**.  Notice the thin gray bar above it.  You can reset the app by clicking on this band, once to stop the playable and again to start it.  When the playable is stopped you can see the playable's code.
# ::::

```javascript /playable/autoplay/p5js

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
const heightScale = 0.8;
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

# Transform the **Antidot**

Before we get rid of the antidot in our code for $2$, we need to learn a little bit about how this machine works.  Here's a short interactive tutorial.

```javascript /playable/autoplay/p5js

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
const heightScale = 0.8;
const base = -2;               // set the base for the machine
const numberBoxes = 3;         // set how many boxes you want

var dots = new dotlib.Dots(p5, this.div);  // create the dots and boxes machine

const instructions1 = "Now let's fix that ANTIDOT.  Try adding 0 to the middle box by adding both a DOT and an ANTIDOT.  Now you can drag an ANTIDOT to the left.";

let popup1 = new Popup(p5, 0.03, 0.2,  0.25, 'DRAG_DOT_OUT', 'DRAG_LEFT', 'DOT_ANNIHILATE', instructions1);
const instructions2 = 'No more ANTIDOT!';
let popup2 = new Popup(p5, 0.03, 0.45,  0.2, 'DRAG_LEFT', 'FADE_OUT', 'DRAG_DOT_OUT', instructions2);

p5.setup = function() {                          // this function is called when you start the
                                                 // playable.
  dots.addInstructions(popup1);
  dots.addInstructions(popup2);
  dots.setup(base, numberBoxes, 'green', true);  // initialize the machine with the base and number of boxes.
  var canvasWidth = p5.windowWidth * widthScale;  // set the size of the playable
  var canvasHeight = p5.windowHeight * heightScale;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();

  dots.loadSounds();                             // load the sounds for the app
  dots.turnOffRuleButton();                      // configure the machine the way we want it.
  dots.setUpDotsAfterTutorial(1,0,1);
  // EnergyHack to inhibit looping after 1 sec, this allows for popups to
  // fade in (which should really be a CSS function, and not involve P5JS.
  window.setTimeout(function() {
    p5.noLoop();
  }, 1000);
};


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth * widthScale;  // the size of the window.  It will rescale all the
  const canvasHeight = p5.windowHeight * heightScale;    // components to fit into the new window size.
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

So the code for the number $2$ is [](:?answer1)

```javascript /autoplay
smartdown.setVariable('answer1', '');
this.dependOn = ['answer1'];


this.depend = function() {
  if (env.answer1 === '110') {
    smartdown.showDisclosure('highfive','','bottomright,transparent');
    setTimeout(function () {
           smartdown.hideDisclosure('highfive','','bottomright');
      }, 3000);
//     setTimeout(function () {
 //          smartdown.showDisclosure('d1', '', 'transparent');
//      }, 3000);
  }
};
```

# :::: highfive
# --colorbox
High five! :raised_hand:
# --colorbox
# ::::



We have a **dot** in the $4$ box, a **dot** in the  $-2$ box and nothing in the $1$ box.  That gives us $4 + \left(-2 \right) + 0 = 2$.

Also, we learned a new rule:   $\fbox{$\bullet$} \fbox{$\bullet$} \leftarrow \fbox{$\phantom{\circ}$} \fbox{$\circ$}$ .  Now we can transform an **antidot** into **dots**.  (We can also use this trick to transform a **dot** into **antidots**.) In the next app we've added a rule button that toggles between the rules so you can use either one.


## What's the code for -3?



```javascript /playable/autoplay/p5js

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
const heightScale = 0.8;
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

That's $(-8) + 4 + 0 + 1 = -3$.



## Play


Here's a fully working machine and here are some things for you to try.

- Work out the codes for $0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10$.
- Work out the codes for $-1, -2, -3, -4, -5, -6, -7, -8, -9, -10$.
- How is the code for each positive number $x$ related to the code for it's negation $-x$?  Can you construct one from the other?
- When we are working with a positive base, we often use one algorithm to do addition and then use a different algorithm to do subtraction.  Can you figure out a method for doing addition in negative binary?  Next, how would you use that same method for subtraction without needing to use any negative signs anywhere?
- Can you make up divisibility rules?  How can you tell if a number is divisible by $2$? When is it divisible by $3$?
- Is every number's $\lbrace 0, 1 \rbrace$ code unique?  If so, how would you prove it?



```javascript /playable/autoplay/p5js

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
const heightScale = 0.8;
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




