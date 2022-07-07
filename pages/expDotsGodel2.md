#### Words are Numbers!  A Base 26 Machine


Here is the base $26$ machine from the video.  It uses the rule $1 \leftarrow 26$.  The **dots** are red and **antidots** are light blue.  Instead of using the standard number symbols `{0123456789}` to encode numbers, it uses the alphabet `{abcdefghijlmnopqrstuvwxyz}`.  


The machine below has been initilized with the string `cab`, which has a base $10$ value of $1353$.  Said another way, the base $10$ number $1353$ has the code `cab` in this base $26$ machine.  


```javascript /autoplay/p5js

// import the dots library
//smartdown.import=/assets/libs/dots.js


// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/0fe1c494e0a94243f3b6d10dd38ef2a341d92f95/bgRedCream-20.jpg';


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
myDiv.style.overflow = 'auto';

const widthScale = 0.80;
const heightScale = 0.8;
const base = 26;               // set the base for the machine
const numberBoxes = 3;         // set how many boxes you want

var dots = new dotlib.Dots(p5, this.div);  // create the dots and boxes machine


p5.setup = function() {                          // this function is called when you start the
                                                 // playable. 
  dots.setup(base, numberBoxes, 'red',true);     // initialize the machine with the base and number of boxes. 
  var canvasWidth = p5.windowWidth * widthScale;   // set the size of the playable
  var canvasHeight = p5.windowHeight * heightScale;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();                            

  dots.loadSounds();                             // load the sounds for the app
  dots.setAlphabetSymbols(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']);      
  dots.addDotsToBox(2,1,2);
  dots.addDotsToBox(1,1,0);             
};


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth * widthScale;   // the size of the window.  It will rescale all the 
  const canvasHeight = p5.windowHeight * heightScale;    // components to fit into the new window size.
  dots.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {                           // this function gets called repeatedly in a loop.
  dots.draw();                                   // The machine is redrawn multiple times a second.
}


p5.mousePressed = function()                     // this function is called everytime the user clicks the mouse
{
  dots.mousePressed();
}


p5.mouseDragged = function() {                   // this function is called everytime the user drags the mouse
  dots.mouseDragged();
}


p5.mouseReleased = function() {                  // this function is called when the user releases the mouse 
  dots.mouseReleased();                          // button after a click.
}


```


###### Things to try

- Which base $10$ number has the code `hi`? 
- What's the base $10$ value of your favorite three letter word?

[Continue](/pages/expDotsGodel3)