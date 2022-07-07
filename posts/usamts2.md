The USA Mathematical Talent Search [USAMTS](https://www.usamts.org) is a unique mathematical competition for middle school and high school students.  Previous competitions contain a treasure trove of challenging, thought provoking and remarkably accessible problems.  I'm writing some interactive apps for a few these problems so that it's easier for more people to get to the heart of each problem.  This problem is part of the 2019-2020 year problems, but it was in the first problem set and was due back in October 2019.  So it's too late for a submission and fair game for discussion.  This is the second problem I've presented.  You can find the previous USAMTS problem [here](/posts/usamts1).


### USAMTS 2019-2020 Problem Set 1 

**4/1/31.** A group of $100$ friends stands in a circle. Initially, one person has $2019$ mangos, and no one else has mangos. The friends split the mangos according to the following rules:
  - *sharing* : to share, a friend passes two mangos to the left and one mango to the right.
  - *eating* : the mangos must also be eaten and enjoyed. However, no friend wants to be selfish and eat too many mangos. Every time a person eats a mango, they must also pass another mango to the right.

A person may only *share* if they have at least three mangos, and they may only *eat* if they have at least two mangos. The friends continue sharing and eating, until so many mangos have been eaten that no one is able to share or eat anymore.

Show that there are exactly eight people stuck with mangos, which can no longer be shared or eaten.

##### Interactive App

It's hard to model all $100$ people in an app.  The mangos get really small and you don't really want to work $2019$ mangos around $100$ people, trust me.  This app starts with $12$ people and you can add as many mangos to the circle as you want.  Hover over the app instructions to get the full details. Currently this app doesn't work well on mobile devices.  I hope to improve the mobile experience soon.

# :::: app_instructions
- add mangos by clicking on the start box/person.
- drag a mango clockwise one box to share mangos.
- drag a mango counter clockwise one box to eat a mango.
- change the number of people with the slider and then reset the app by hitting the gray stop/play button above the app.  This will reset the app with the new number of people.

# ::::

```javascript /autoplay
  smartdown.setVariable('N', 12);
```

[Application Instructions](::app_instructions/tooltip) 
Number of People [](:-N/8/32/2) [](:!N)
```javascript /playable/autoplay/p5js

// import the dots library
//smartdown.import=/assets/libs/mangoDots.js

// this is the url for the background picture
const bgURL = '/assets/images/posts/andreBackground.svg';


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
//myDiv.style.border = '5px solid gray';
this.div.style.margin = '10px auto'; // shorthand for '10px auto 10px auto'
this.div.innerHTML = '';

const heightScale = 0.8;
const widthScale = 0.8;
const base = 2;               // set the base for the machine
const numberBoxes = 10;         // set how many boxes you want

var dots1 = new dotlib.Dots(p5, this.div);  // create the dots and boxes machine

p5.setup = function() {                          // this function is called when you start the
                                                 // playable.

  dots1.setup(env.N);                 // initialize with the base and number of boxes.
  const canvasHeight = p5.windowHeight * heightScale;
  const canvasWidth = p5.windowWidth * widthScale;  // set the size of the playable
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();

  dots1.loadSounds();                             // load the sounds for the app
 
  p5.noLoop();
  // EnergyHack to inhibit looping after 1 sec, this allows for popups to
  // fade in (which should really be a CSS function, and not involve P5JS.
  // window.setTimeout(function() {
  //   p5.noLoop();
  // }, 10000);
};


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasHeight = p5.windowHeight * heightScale;  // the size of the window.  It will rescale all the
  const canvasWidth = p5.windowWidth * widthScale;   // components to fit into the new window size.

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
  // window.setTimeout(function() {
  //   p5.noLoop();
  // }, 10000);
}

```

### Resources

If you liked this problem or want to check out some resources that might help you think about the problem, I suggest:

1. [Exploding Dots Interactive Web Experience](https://www.explodingdots.org/)
2. [G'Day Math: Exploding Dots Course](https://gdaymath.com/courses/exploding-dots/)

The following videos also might be helpful.

![halfwidth](https://www.youtube.com/watch?v=R4d2qQ7aeFg)

![halfwidth](https://www.youtube.com/watch?v=jvf6qXLaXAo)

This problem suggest other interesting questions.  For example, what is the minimum number of mangos you need to add to make sure every one gets to eat one?  How do you do the sharing and eating to make this happen?  If you come up with other interesting questions or have a bug report  please leave a comment.
