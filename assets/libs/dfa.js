/*

  5. scale strokeWidth with window
  8. error handling


*/


/////////////////////////////////////////////// COLOR SCHEME /////////////////////////////////////////////////

class Colors {
  constructor() {
    this.magenta =       [220, 70,  250];
    this.deepmagenta =   [120, 20,  180];
    this.blue =          [50,  200, 255];
    this.deepblue =      [10,  130, 180];
    this.yellow =        [250, 250,  20];
    this.gold =          [200, 160,  20];
    this.graymagenta =   [150, 140, 180];
    this.grayblue =      [130, 180, 180];
    this.tan =           [150, 150,  20];
    this.darkpurple =    [120, 90,  160];
    this.darkblue =      [130, 130, 160];
    this.brown =         [160, 120,  80];
    this.black =         [0,   0,     0];
    this.white =         [255, 255, 255];
    this.purple =        [200, 0,   255];
    this.cyan =          [0,   200, 255];
    this.darkbluegreen = [0,   100, 100];
    this.lightLilac =    [220, 220, 255];
    this.lime =          [90, 235,   90];
    this.darkGray =      [100, 100, 100];
    this.bottleGreen =   [30,  160,  90];
    this.wine =          [100,   0, 100];
    this.paleWine =      [230, 200, 200];
    this.tomato =        [255, 110, 100];
    this.deepred =       [200,  70,  70];
    this.graygreen =     [110, 150, 100];
    this.graytomato =    [180,  90,  90];
    this.darkgraygreen = [70, 130,   60];
    this.darkgrayred =   [160,  70,  70];
  }
}



class DFAAppColors {
  constructor(anf, ans, inf, ins, ac, tc, shl, adf) {
    this.activeFill = anf;
    this.activeStroke = ans;
    this.inactiveFill = inf;
    this.inactiveStroke = ins;
    this.arrow = ac;
    this.textColor = tc;
    this.highlight = shl;
    this.inputBox = [255,255,255];
    this.arcDotFill = adf;
    this.dfaBox = [255,255,255,10];
  }
}


/////////////////////////////////////////////// SOUND FILES /////////////////////////////////////////////////

let acceptSound = null;
let rejectSound = null;
const acceptSoundFile =  '../../assets/sounds/SmallGlockA.wav';
const rejectSoundFile =  '../../assets/sounds/cartoon004.wav';



/////////////////////////////////////////////// WINDOW RESIZING /////////////////////////////////////////////////


class WindowSizeVars {
  constructor() {
    this.boxX = 0;
    this.boxY = 0;
    this.boxW = 0;
    this.boxH = 0;
    this.inputX = 0;
    this.inputY = 0;
    this.inputW = 0;
    this.inputH = 0;
    this.canvasW = 0;
    this.canvasH = 0;
    this.inputXspacer = 30;
    this.inputTextSize = 0;
    this.inputIndent = 0;
    this.traceDiameter = 0;
    this.inputTextY = 0;
    this.traceY = 0;
    this.boxXmargin = 0;
    this.nodeDiameter = 0;
    this.labelTextSize = 0;
  }
}

function centerTextInCircle(p5, x,y,diameter,text) {
  const textW = p5.textWidth(text);
  const textH = p5.textAscent() * 0.8;
  const xoffset = (diameter - textW) / 2;
  const yoffset = (diameter - textH) / 2;
  return [x  - diameter/2 + xoffset, y + diameter/2 - yoffset];
}



////
// Coordinate transforms between box-relative and canvas-relative
// Convention: (x, y) are canvas coordinates. (rx, ry) are box coordinates
//////////////////////////////////////////////////////////////////////////////

function getCanvasRelativePos(rx, ry, win) {
  const result = {
    x: rx * win.boxW + win.boxX,
    y: ry * win.boxH + win.boxY
  };
  return result;
}

function getBoxRelativePos(x, y, win) {
  const result = {
    rx: (x - win.boxX) / win.boxW,
    ry: (y - win.boxY) / win.boxH
  };

  return result;
}



///////////////////////////////  ANIMATED ARC CLASS  //////////////////////////////////

// AnimatedArc is an arrow with an animation along the direction of 
// the arrow.  The first four values it's initialized are the same 
// initialization values you'd use in a p5.arc.  Then we add a label 
// for the arc and a direction (clockwise or counterclockwise) for the

class AnimatedArc  { 
  constructor(p5playable,label,to, color) {
    this.x = 0;                  // arc is centered at this x,y           
    this.y = 0;
    this.a = 0;                  // width
    this.b = 0;                  // height
    this.p5 = p5playable;        // need to pass in p5
    this.label = label;          // transition function symbol 
    this.to = to;                // state this edge takes you to
    this.start = 0;              // angle at which we start traversal
    this.stop = 0;               // angle at which we stop traversal
    this.cclockwise = 0;         // the arc is traversed cclockwise or clockwise
    this.angle = 0;              // angle varies to create animation
    this.active = false;         // this bool turns animation on and off
    this.labelBelow = false;     // place the label below the arc or above the arc
    this.color = color;
  }

  // draw the arrow tips.  This is a lot of work
  // for some stupid arrow heads, but gotta have em.
  drawArrowTip() {
    this.p5.push();
    this.p5.fill(...this.color);
    const angle1 = this.cclockwise ? this.start : this.stop;
    const angle2 = angle1 + (this.cclockwise ? 0.2 : -0.2);
    const A = this.a/2;
    const B = this.b/2;
    let pt1X = this.x + A * Math.cos(angle1);  // point at tip of arrow
    let pt1Y = this.y + B * Math.sin(angle1);  
    let ptX = this.x + A * Math.cos(angle2);   // a guide point to help   
    let ptY = this.y + B * Math.sin(angle2); // us get the last two points
    const slope = (pt1Y - ptY)/(pt1X - ptX);
    const a = 3;
    const b = a / slope;
    let pt2X = ptX + a;  
    let pt2Y = ptY - b;
    let pt3X = ptX - a;  
    let pt3Y = ptY + b;   
    this.p5.triangle(pt1X,pt1Y,pt2X,pt2Y,pt3X,pt3Y);
    this.p5.pop();
  }
}




///////////////////////////////  NODE CLASS  //////////////////////////////////

// A DFA node has a position an can be an accept node.
class Node {
  constructor(p5playable, state, colors, win) {
    this.win = win;
    this.colors = colors;
    this.p5 = p5playable;
    this.rx = 0;
    this.ry = 0;
    this.state = state;
    this.accept = false;
    this.active = false;      // it can be active if we are visiting this node
    this.edges = [];          // it has outgoing transitions.
  }

  draw() {
    this.p5.push();
    this.p5.strokeWeight(4);

    if (this.active) {
      this.p5.stroke(...this.colors.activeStroke[this.state]);    // active nodes have a brighter color than inactive nodes
      this.p5.fill(...this.colors.activeFill[this.state]); 
    }
    else {
      this.p5.stroke(...this.colors.inactiveStroke[this.state]);
      this.p5.fill(...this.colors.inactiveFill[this.state]); 
    }

    const {x,y} = getCanvasRelativePos(this.rx, this.ry, this.win);   
    this.p5.ellipse(x,y,this.win.nodeDiameter,this.win.nodeDiameter);  // draw the node

    if ( this.accept === true ) {                 // if it is an accept node draw the smiley face
      const faceD = this.win.nodeDiameter * 0.8;
      const smileD = this.win.nodeDiameter * 0.5;
      const eyeD = this.win.nodeDiameter * 0.1;
      const eyeOff = eyeD;
      this.p5.ellipse(x,y,faceD, faceD);          
      this.p5.ellipse(x-eyeOff,y-eyeOff,eyeD,eyeD);
      this.p5.ellipse(x+eyeOff,y-eyeOff,eyeD,eyeD);  
      this.p5.arc(x,y,smileD,smileD,0,this.p5.PI);    
    }
    else {                                        // now we put the text in the node if it's not an accept
      if (this.active) {
        this.p5.fill(...this.colors.activeStroke[this.state]);
      }
      else {
        this.p5.fill(...this.colors.inactiveStroke[this.state]);
      }

      this.p5.textSize(this.win.nodeDiameter/2);
      const [cx, cy] = centerTextInCircle(this.p5,x,y,this.win.nodeDiameter,this.state.toString());
      this.p5.text(this.state.toString(),cx,cy);
    }
    this.p5.pop();
  } 


  // return the (x,y) coordinates of the node
  getPosition() {
    return getCanvasRelativePos(this.rx, this.ry, this.win);
  }
}






///////////////////////////////  DFA WRAPPER  //////////////////////////////////



// A DFA just has a state and some nodes
function DFA(p5playable, m)  {
  let p5 = p5playable;          // we pass in the p5 library to give dfa library access to it
  let machine = m;              // machine holds the dfa description/transition function
  let state = 0;                // keeps track of current state
  let nodes = [];               // list of nodes
  let inTransition = false;     // a transition takes time.  Wait till it's done to update datastructures


  let presses = 0;              // keep track of the number of mouse presses
  const animationSpeed = 0.1;   // bigger is faster
  let endOfInput = false;       // have we reached the end of input string?
  let input = '';               // the input string
  let stateTrace = [];          // the state trace or configuration path of the computation

  let win = new WindowSizeVars();  // this holds all the variables that are resized then the window size changes


  const c = new Colors();                                        // app coloring this needs to be organized into color schemes 
  const activeNodeFill = [c.yellow, c.lime, c.tomato];           // so a user can choose a scheme.
  const activeNodeStroke = [c.gold, c.bottleGreen, c.deepred];
  const inactiveNodeFill = [c.tan, c.graygreen, c.graytomato];
  const inactiveNodeStroke = [c.brown, c.darkgraygreen, c.darkgrayred];
  const arrowColor = c.black;
  const textColor = c.black;
  const stringHighlight = [100,100,100,100];
  const arcDotFill = c.tomato;
  const colors = new DFAAppColors(activeNodeFill, activeNodeStroke, inactiveNodeFill, inactiveNodeStroke, arrowColor, textColor, stringHighlight, arcDotFill);
 

  //////////////////// BUILD THE MAIN DATA STRUCTURES  //////////////////////////
                           
  const n = machine.nodes;
  for (let i=0; i < n; i++) {                            // create the nodes
    nodes.push(new Node(p5, i, colors, win));
  }
  nodes[0].active = true;
  for (let i=0; i < machine.accept.length; i++) {        // set the accept nodes
    nodes[machine.accept[i]].accept = true;
  }

  for (let from=0; from < machine.edges.length; from++) {  // for each node
    for (let sym=0; sym < machine.edges[from].length; sym++) { // for each input symbol
      const symbol = machine.alphabet[sym];              
      const to = machine.edges[from][sym];
      nodes[from].edges.push(new AnimatedArc(p5,symbol,to, colors.arrow));  // add the edge
    }
  }

  //////////////////////////////////////////////////////////////////////////////////


  function cleanInput(i) {                                // here's where we clean up the input
    i = i.replace(/\s/g, '');                             // remove any spaces, tabs or enter characters
    i = i.replace(/[^ab]/g, '');
    if (!/^[ab]*$/.test(i)) {
      alert('String can only contain letters a and b.');
      return '';
    }
    return i;
  }



  function positionNodes() {                            // position the nodes in the box
    const n = nodes.length;
    const distBetweenNodes = (win.boxW - 2 * win.boxXmargin)/n;
    const x = win.boxX + win.boxXmargin + distBetweenNodes/2;
    const y = win.boxY + win.boxH/2;
    for (let i=0; i < n; i++) {
      const {rx, ry} = getBoxRelativePos(x + distBetweenNodes * i, y, win);
      nodes[i].rx = rx;
      nodes[i].ry = ry;
    }
  }


  function positionEdges() {         // this is a bitch and needs refining.  will document later when I clean it up.

    for (let n=0; n < nodes.length; n++) {          // walk each node
      for (let s=0; s < nodes[n].edges.length; s++) {     // walk each transition (indexed by symbol)
        let node = nodes[n];
        const from = node.getPosition();
        const to = nodes[node.edges[s].to].getPosition();

        if (from.x === to.x) {         // from and to are same node
          node.edges[s].x = from.x; 
          node.edges[s].a = win.nodeDiameter/2. ;
          node.edges[s].y = from.y - win.nodeDiameter/2;
          node.edges[s].b = win.nodeDiameter;
          node.edges[s].start =  p5.PI;
          node.edges[s].stop =   2* p5.PI; 
          node.edges[s].angle = p5.PI; 
        }
        else {
          const width = p5.abs(from.x - to.x);
          node.edges[s].x = p5.min(from.x, to.x) + width/2;   
          node.edges[s].a = width;
          node.edges[s].y = from.y;
          node.edges[s].b = 2 * win.nodeDiameter;
          const vert_comp = win.nodeDiameter/node.edges[s].b;
          const theta = Math.asin(-vert_comp);
          if (n > node.edges[s].to) {
            node.edges[s].start =  0;
            node.edges[s].stop =   p5.PI + theta; 
            node.edges[s].angle = 0; 
            node.edges[s].labelBelow = true;
          }
          else {
            node.edges[s].start =  p5.PI;
            node.edges[s].stop =   2* p5.PI + theta; 
            node.edges[s].angle = p5.PI - theta; 
          }
        }
        node.edges[s].cclockwise = false;  
      } 
    }
  }




  function drawMachine() {
    p5.push();
    p5.fill(...colors.dfaBox);                      // draw a background rect
    p5.noStroke();
    p5.rect(win.boxX, win.boxY, win.boxW, win.boxH, 10);
    
    p5.fill(...colors.arrow);                     // draw the start arrow
    p5.stroke(...colors.arrow);
    p5.textSize(win.labelTextSize);
    let {x, y} = nodes[0].getPosition();
    const xoffset = win.nodeDiameter/2;
    p5.text('start',x-xoffset -70,y-3);
    p5.line(x-xoffset - 70,y, x-xoffset,y);
    p5.triangle(x-xoffset, y, x-xoffset - 5, y-5, x - xoffset-5, y+5);
    p5.pop();

    for (let i=0; i < nodes.length; i++) {   // draw the transitions first
      for (let j=0; j < nodes[i].edges.length; j++) {  // draw each node's 
        drawArc(i,j);                            // transitions
      }
    }

    for (let i=0; i < nodes.length; i++) {   // draw the nodes
      nodes[i].draw();
    }
  }


  // this is called when the edge/arc animation is finished
  // We change the DFA state and reset the animation
  function endTransition(n,e) {
    let edge = nodes[n].edges[e];
    if (edge.cclockwise) { edge.angle = edge.stop; }  // reset edge animation
    else { edge.angle = edge.start;}

    edge.active = false;             // deactivate the edge and the node
    nodes[n].active = false; 

    state = machine.edges[n][e];     // update the state to the new state
    nodes[state].active = true;      // make the new state/node active
    
    if (presses === input.length) {  // check if we've processed the whole input
      if (nodes[state].accept) {     // and play the appropriate sound if we have
        if (acceptSound.isLoaded()) {
          acceptSound.play();
        }
        else {
          console.log('accept sound not loaded');
        }
      }
      else {
        rejectSound.play();
      }
    }
    stateTrace.push(state);          // add a new state to the state trace/configuration path
    inTransition = false;
  }





  // This is the edge animation.  We pass in the node and edge
  // This info is passed on to the endTransition function if 
  // this edge is active so we can change the state.
  // it's weird to do this in a draw function but the actual 
  // DFA state change is triggered by the animation ending.
  function drawArc(n,e) {
    p5.push();
    p5.noFill();                              // draw the edge
    let edge = nodes[n].edges[e];
    
    p5.arc(edge.x, edge.y, edge.a, edge.b, edge.start, edge.stop);
    
    edge.drawArrowTip();                       // draw the arrow tip
    
    p5.textSize(win.labelTextSize);            // draw the label
    p5.fill(...colors.arrow);
    let y = edge.y + (edge.labelBelow ? edge.b/2 + 29: -edge.b/2 - 5);
    p5.text(edge.label,edge.x-8,y);

    if (edge.active) {                    // if edge is active draw the animation
      p5.noStroke();
      p5.fill(...colors.arcDotFill);
      const A = edge.a/2;
      const B = edge.b/2;
      const x = edge.x + A * Math.cos(edge.angle);
      const y = edge.y + B * Math.sin(edge.angle);
      p5.ellipse(x,y,10,10);           // draw a dot on the arc

      if (!edge.cclockwise) {          // increment position of the dot
        edge.angle += animationSpeed;   // end the transition if we've
        if (edge.angle > edge.stop) {   // reached end of arc
          endTransition(n,e); 
        }
      }
      else {
        edge.angle -= animationSpeed;
        if (edge.angle < edge.start) { endTransition(n,e); }
      }
    }
    p5.pop();
  }


  // start a transition between states
  // identify the current state and activate the appropriate
  // transition arrow
  function startTransition(c) {
    inTransition = true;
    const i = machine.alphabet.indexOf(c);    // convert c into a number
    if (i != -1) {
      nodes[state].edges[i].active = true;      // should be some error handling here
    }
  }


  function drawInputBox() {
    p5.push();
    p5.fill(...colors.inputBox);
    p5.noStroke();
    p5.rect(win.inputX,win.inputY,win.inputW,win.inputH);
    p5.pop();
  }


  this.draw = function() {  // self explanatory
    drawMachine();
    drawInput();
  };


  this.restart = function(i) {  // this is called when user enters a new input string
    input = cleanInput(i);      // reset all the data structures
    stateTrace = [0];
    presses = 0;
    
    for (let i=1; i < nodes.length; i++) {  // deactivate nodes
      nodes[i].active = false;
    }
    nodes[0].active = true;             // activate start node
    state = 0;                          // set state
    endOfInput = false;
  };


  this.setup = function() {  
    positionNodes();
    positionEdges();
    p5.createCanvas(win.canvasW,win.canvasH);
  };


  this.loadSounds = function() {
    acceptSound = p5.loadSound(acceptSoundFile);
    rejectSound = p5.loadSound(rejectSoundFile);
  };



  // draw the string from the input box on the screen
  function drawInput() {

    drawInputBox();                                       // first we draw the input box

    p5.push();                                            // draw the state trace/ configuration path
    p5.strokeWeight(1);
    for (let i=0; i < stateTrace.length; i++) {
      p5.stroke(...colors.activeStroke[stateTrace[i]]);
      p5.fill(...colors.activeFill[stateTrace[i]]); 
      const x = win.inputX + win.inputIndent - win.inputXspacer/3 + win.inputXspacer * i ;
      p5.ellipse(x,win.traceY,win.traceDiameter, win.traceDiameter); 
    }
                          
    p5.fill(...colors.textColor);                          // draw the input string
    p5.textSize(win.inputTextSize);
    let x = win.inputX + win.inputIndent;
    for (let i=0; i < input.length; i++) {
      p5.text(input[i], x + win.inputXspacer*i, win.inputTextY);
    }

    p5.fill(...colors.highlight);                          // draw the progress boxes over input
    p5.noStroke();
    const y = win.inputTextY - win.inputTextSize;
    for (let i = 0; i < stateTrace.length - 1; i++) {
      const x = win.inputX + win.inputIndent - win.inputXspacer/4;
      p5.rect(x + i * win.inputXspacer, y, win.inputXspacer - 4, win.inputTextSize + 8,5);
    }
    p5.pop();
  }


  this.windowResized = function(width, height) {   // adjust measurements when window is resized
    win.canvasW = width;
    win.canvasH = height;

    const minHeight = 200;
    if (win.canvasH < minHeight) {
      win.canvasH = minHeight;
    }

    win.inputIndent = win.canvasW * 0.05;
    win.boxW = win.canvasW * 0.6;
    win.boxH = win.canvasH * 0.5;
    win.inputW = win.canvasW;
    win.inputH = win.canvasH * 0.2;

    win.inputX = 0;
    win.boxX = (width - win.boxW) / 2;

    win.inputY = win.canvasH * 0.1;
    win.boxY = win.canvasH * 0.4;

    win.traceDiameter = win.inputH * 0.3;
    win.inputTextSize = win.inputH * 0.3;
    win.inputXspacer = win.traceDiameter + 10;

    win.inputTextY = win.inputY + win.inputH * 0.85;
    win.traceY = win.inputY + win.inputH * 0.15 + win.traceDiameter/2;
    win.boxXmargin = win.boxW * 0.1;

    win.nodeDiameter = win.boxH * 0.3;
    win.labelTextSize = win.nodeDiameter * 0.2;
    positionEdges();
  };


  this.mousePressed = function() {      // each time the mouse is pressed we consume another character in the input string
    if (!inTransition) {
      let validS = !!input;
      if (validS && presses < input.length) {  
        startTransition(input[presses]);
        p5.redraw();
        if (presses < input.length+1) {  // stop drawing boxes when we get to end
          presses += 1;                  // of the string
        }
      } 
    }
  };

}





(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    let mod = {
      exports: {}
    };
    factory(mod.exports);
    global.dfalib = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.DFA = DFA;

});


