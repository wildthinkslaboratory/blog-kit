#### Choose your own alphabet

Type in an alphabet from your keyboard and then hit `Enter` to create your own alphabet. [note](::note/transparent,topright,closeable,draggable,shadow,outline)

[Enter an alphabet](:?Alphabet)
[Current alphabet](:!Alphabet)

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

const widthScale = 0.80;
const heightScale = 0.8;
const base = 2;               // set the base for the machine
const numberBoxes = 3;         // set how many boxes you want


let dots = new dotlib.Dots(p5, this.div);  // create the dots and boxes machine


p5.setup = function() {                          // this function is called when you start the
                                                 // playable. 
  dots.setup(base, numberBoxes, 'red');             // initialize the machine with the base and number of boxes. 
  var canvasWidth = p5.windowWidth * widthScale;    // set the size of the playable
  var canvasHeight = p5.windowHeight * heightScale;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();    

  smartdown.setVariable('Alphabet', '');                        

  dots.loadSounds();                             // load the sounds for the app 
};


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth * widthScale;   // the size of the window.  It will rescale all the 
  const canvasHeight = p5.windowHeight * heightScale; // components to fit into the new window size.
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



var A;    // this holds the alphabet string

this.dependOn = ['Alphabet'];
this.depend = function() {                       // this function is called when the alphabet changes to a new value
  A = env.Alphabet;
  if (A[A.length - 1] === '\n') {                // we only enter a new alphabet when the user hits enter  i.e. '\n'
    const cleanA = cleanUpAlphabet(A);           // the user may not have entered a valid alphabet to we clean it up
    smartdown.setVariable('Alphabet', cleanA.join(''));              // convert the alphabet from a string to an array of characters
    dots.setAlphabetSymbols(cleanA);             // add the alphabet to the machine
  }
};


function cleanUpAlphabet(a) {                                    // here's where we clean up the alphabet
  aNoWhiteSpace = a.replace(/\s/g, '');                          // remove any spaces, tabs or enter characters
  let newA = Array.from(new Set(aNoWhiteSpace.split('')));       // remove duplicate characters
  return newA;
}

```

##### Things to try
- The machine is initialized with the standard base $2$ alphabet `{01}`.  Set the machine to encode the number four.  It should show the code `100`.  Now change the alphabet to `{0123456789}`.  The code `100` will stay the same, but what is the new value for this code?  
- What happens if you choose the alphabet `{10}` (subtly different from the alphabet `{01}`)?  This will change the value AND the code.  You'll need to adjust the position of **dots** to get the code `100` back. What does the code `100` mean in this machine?  Note that usually we ignore any `0` symbols that are placed in front of a number.  In this case we ignore any  leading `1` symbols.  What other numbers could the code `100` stand for?
- I like the alphabet `{_o}`.  The underscore `_` for zero reminds me of an empty box and the `o` for one is like a little **dot**. 
- Experiment and come up with your very own number system.  Using all your exploding dots knowledge you can work out how to do addition, subtraction, multiplication  and division with it. 
[Continue](/pages/expDotsGodel4)

# :::: note
# --partialborder
This machine is only three boxes long, but imagine a machine like this one with a hundred boxes, or a million boxes.  You can begin to see how we could interpret an email, a book, a program or a proof as a number.
# --partialborder
# ::::
