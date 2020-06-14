#### Transform the **Antidot**

Before we get rid of the antidot in our code for $2$, we need to learn a little bit about how this machine works.  Here's a short interactive tutorial.

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
We have a **dot** in the $4$ box, a **dot** in the  $-2$ box and nothing in the $1$ box.  That gives us $4 + \left(-2 \right) + 0 = 2$. Also, we learned a new rule:   $\fbox{$\bullet$} \fbox{$\bullet$} \leftarrow \fbox{$\phantom{\circ}$} \fbox{$\circ$}$ .  Now we can transform an **antidot** into **dots**.  (We can also use this trick to transform a **dot** into **antidots**.) In the next app we've added a rule button that toggles between the rules so you can use either one.
[Continue](/pages/NegaBinary4)

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



