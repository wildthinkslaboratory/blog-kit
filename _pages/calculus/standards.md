---
title: Blank Workspace Template 
header: 'none'
smartdown: true
---

# :::: note1
# --partialborder note
This is a note.  A note has extra information that is not required to complete the lesson.  It may be used to:
	- provide a written explanation of the ideas explored geometrically in the app.
	- it may provide 
[Close](::note1/button)
# --partialborder
# ::::

# :::: alert1
# --aliceblue alert
This is an alert.  This is crucial information about how the app works. 
# --aliceblue
# ::::

# :::: task1
# --outlinebox task
###### Question or Task
Pose a question to answer or describe a task to complete. 
# --outlinebox
# ::::

# :::: plain
This is a plain box with no inside formatting.
# ::::

#### Plain Box
A plain box is white popup.  
[task lightbox and shadow](::plain/center,draggable,closeable,transparent,outline,lightbox) 
[task no drag](::plain/center,transparent,shadow,lightbox) 
[task no shadow](::plain/center,transparent) 
[task lightbox](::plain/center,transparent,lightbox) 


#### Note
Maybe a note is closable with a button instead of the cross button.
[note](::note1/center,transparent)
[note](::note1/center,transparent,draggable,closeable,outline)
[note](::note1/center,transparent,draggable,closeable,outline,shadow)
[note](::note1/center,transparent,draggable,closeable,outline,lightbox)


[alert](::alert1/center,transparent)

#### Task
I think a task is always closable.  
[task lightbox and shadow](::task1/center,draggable,closeable,transparent,shadow,lightbox) 
[task no drag](::task1/center,transparent,shadow,lightbox) 
[task no shadow](::task1/center,transparent) 
[task lightbox](::task1/center,transparent,lightbox) 

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



