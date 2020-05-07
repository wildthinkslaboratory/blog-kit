---
title: Blank Workspace Template 
header: 'none'
smartdown: true
---


# --aliceblue note
This is a note.  A note has extra information that is not required to complete the lesson.  It may be used to:
	- provide a written explanation of the ideas explored geometrically in the app.
	- it may provide 
# --aliceblue

# --aliceblue alert
This is an alert.  This is crucial information about how the app works. 
# --aliceblue

# --aliceblue task
###### Question or Task
Pose a question to answer or describe a task to complete.
# --aliceblue



```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:800px; width:800px'>`;

let xlow = -2;
let xhigh = 10;
let ylow = -2;
let yhigh = 20;


let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow]);


/////////////////////////////////////////////////////////////////////////////////////////

// Event handling

this.div.onmousedown = function(e) { 
  
};



let widthPercent = 0.8;
let heightPercent = 0.7;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};

this.sizeChanged();


workspace.board.on('update', function() {
  workspace.onUpdate();              // hook up workspace update functions
});





```

```javascript /autoplay

const note = document.getElementById('note');
note.classList.remove('decoration-aliceblue');
note.classList.add('note');

const alert = document.getElementById('alert');
alert.classList.remove('decoration-aliceblue');
alert.classList.add('alert');

const task = document.getElementById('task');
task.classList.remove('decoration-aliceblue');
task.classList.add('task');

```