---
title: Blank Workspace Template 
header: 'none'
smartdown: true
---
This is text to make the width of the container wider.  This might lead to the popups being centered properly.  We'll see if it works.  I think I needs to be a little longer.
# :::: note1
# --aliceblue note
This is a note.  A note has extra information that is not required to complete the lesson.  It may be used to:
	- provide a written explanation of the ideas explored geometrically in the app.
	- it may provide 
[Close](::note1/button)
# --aliceblue
# ::::

# :::: alert1
# --aliceblue alert
This is an alert.  This is crucial information about how the app works. 
# --aliceblue
# ::::

# :::: task1
# --aliceblue task
###### Question or Task
Pose a question to answer or describe a task to complete. 
# --aliceblue
# ::::

[note](::note1/center,transparent)
[alert](::alert1/center,transparent)
[task](::task1/center,draggable,transparent) 

[note through variable](:=showNote=true) 
[alert through variable](:=showAlert=true) 
[task through variable](:=showTask=true) 




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

//smartdown.import=/assets/libs/mapping.js

let note = new Note(document, 'note1', 'note');
let alert = new Alert(document, 'alert1', 'alert');
let task = new Task(document, 'task1', 'task');

smartdown.setVariable('showNote', false);
smartdown.setVariable('showAlert', false);
smartdown.setVariable('showTask', false);

this.dependOn = ['showTask', 'showNote', 'showAlert'];
this.depend = function() {

	if (env.showTask == true) {
		smartdown.setVariable('showTask', false);
		smartdown.showDisclosure('task1', '', 'transparent,center,draggable');
		task.wrapper.style.left = "25%";
	}

	if (env.showNote == true) {
		smartdown.setVariable('showNote', false);
		smartdown.showDisclosure('note1', '', 'transparent,center');
		note.wrapper.style.left = "10%";
	}

	if (env.showAlert == true) {
		smartdown.setVariable('showAlert', false);
		smartdown.showDisclosure('alert1', '', 'transparent,center');
		alert.wrapper.style.left = "25%";
	}



}
```