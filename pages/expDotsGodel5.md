## Mystery String Challenge
So Kurt Gödel took a bunch of strings that were originally intended as proofs and he interpreted them as numbers and then he studied their mathematical properties.  This led to him writing a mathematical definition of proof numbers.  I thought it might be fun to give you an interesting set of strings to interpret as numbers.  The following playable is a Deterministic Finite Automata (DFA).  Don't worry if you don't know what a DFA is.  All you need to know is that it eats up strings.    

Some strings it likes and some strings it doesn't like. If you were to collect all the strings it likes (or accepts) into a set, how would you describe those strings?  If you followed Gödel's example and you interpreted the strings as numbers, what base would you use and what alphabet?  Do your string numbers have any interesting mathematical properties?  It can be helpful to go through all possible strings, starting with the shortest strings first.



# :::: instructions
# --partialborder
- The machine only eats strings made with the letters `a` and `b`.  
- Enter a string in the box below and type `Enter` to load the string. 
- Each time you click the mouse the machine will consume another letter.
- If the machine ends on the happy *yellow* state, the machine will accept the string and play a **ding**. 
- If the machine ends on any other state, the machine will reject the string and play a **honk**.
# --partialborder
# ::::

Enter a {ab} string: [](:?Input)  [Instructions](::instructions/tooltip,transparent)
[alphabet](:!Input)

```javascript /autoplay/p5js

// import the dots library
//smartdown.import=/assets/libs/dfa.js


// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/0fe1c494e0a94243f3b6d10dd38ef2a341d92f95/bgRedCream-20.jpg';


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

const machine = {
  nodes : 3,
  edges : [ [0,1], [2,0], [1,2] ],
  accept : [0],
  alphabet : ['a','b']
};


let dfa = new dfalib.DFA(p5, machine);

p5.preload = function() {
  dfa.loadSounds();
}

p5.setup = function() {                          // this function is called when you start the
                                                 // playable.  
  p5.windowResized();
  dfa.setup();      
  smartdown.setVariable('Input', '');          // set the input string to empty string
}



p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth * widthScale;  // the size of the window.  It will rescale all the 
  const canvasHeight = p5.windowHeight * heightScale; // components to fit into the new window size.
  dfa.windowResized(canvasWidth, canvasHeight); 
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {                           // this function gets called repeatedly in a loop.
  dfa.draw();                                 // The machine is redrawn multiple times a second.
}


p5.mousePressed = function() {                   // this function is called everytime the user clicks the mouse
  dfa.mousePressed();
}



var I;    // this holds the input string

this.dependOn = ['Input'];
this.depend = function() {                       // this function is called when the input changes to a new value
  I = env.Input;
  if (I[I.length - 1] === '\n') {                // we only enter a new input when the user hits enter  i.e. '\n'
    const cleanI = cleanInput(I);                // the user may not have entered a valid string so we clean it up
    smartdown.setVariable('Input', cleanI);      // convert the alphabet from a string to an array of characters
    dfa.restart(I);                              // add the input to the machine
  }
};


function cleanInput(i) {                                // here's where we clean up the input
  i = i.replace(/\s/g, '');                             // remove any spaces, tabs or enter characters
  if (!/^[ab]*$/.test(i)) {
    alert('String can only contain letters a and b.');
    return '';
  }
  return i;
}


```



 Have you figured out what property these strings all share?  Notice that this machine is actually symmetrical.  That means if the machine likes a string `aabb` then it will also like the reverse of that string `bbaa`.  So reversing a string preserves the property that all the accepted strings share.  How can you explain that?



## What's Next?  Gödel's Incompleteness Theorem Part 2?

The next part of Gödel's proof is a variation of Georg Cantor's proof that you can't map a set to its powerset.  The background concepts for Cantor's proof are amazingly few and simple for a proof that has such far reaching consequences.  We just need to understand a little bit about functions and functional mappings and we need to know what a power set is.  His proof uses something called *diagonalization* and I think it's a good candidate for an interactive web exploration.  I'll put that on my list of things I want to build.  Stay tuned.



