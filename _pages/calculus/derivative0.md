---
title: Derivative
smartdown: true
header: 'none'
lesson: 'derivative'
ogimage: /assets/images/calculus/derivative.jpg
---

# :::: intro
We've been answering lots of interesting questions by making our secants really small. But it's not a very precise method and it wouldn't be fun if you didn't have an app to compute the tiny secant slopes.  The **derivative** is way to formalize this idea. We'll begin with an example and then give a general definition of the derivative.
# ::::

##### The Derivative When $t=2$
# :::: the_question
[?](::clue/center,transparent,draggable,closeable,shadow) The limit of the slope of the secant $\lim_{h \to 0} \frac{(2 + h)^2 - 2^2}{h}$ is [](:?s1). 
The velocity of the car at $t=2$ is [](:?s2).
# ::::
#### --outlinebox outer1

#### --outlinebox left1

#### --outlinebox


#### --outlinebox middle1
On the left is a secant on the interval between $2$ and $2+h$. The slope of this secant line is 
$$\frac{(2 + h)^2 - 2^2}{h}$$
The value $h$ is the width of our secant interval.  To find the speed at point $t=2$, we want the slope of the secant line when $h=0$.  Unfortunately, the slope is undefined when $h=0$.  So instead, we'll take the limit as $h$ goes to $0$.   
1. Go [closer](:=reduce=true) to $h=0$.
2. Go [all the way](:=all=true) to $h=0$.

The limit as $h$ goes to $0$ is [](:?s1)

#### --outlinebox


#### --outlinebox right1


#### --outlinebox

#### --outlinebox

 

```javascript /autoplay

const outer = document.getElementById('outer1');
outer.classList.remove('decoration-outlinebox');
outer.classList.add('outer-multi-col');

const left = document.getElementById('left1');
left.classList.remove('decoration-outlinebox');
left.classList.add('playable-3-col');

const middle = document.getElementById('middle1');
middle.classList.remove('decoration-outlinebox');
middle.classList.add('text-3-col');

const right = document.getElementById('right1');
right.classList.remove('decoration-outlinebox');
right.classList.add('playable-3-col');


//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');
// import the calc library
//smartdown.import=/assets/libs/calc.js
//smartdown.import=/assets/libs/mapping.js

smartdown.showDisclosure('intro','','closeable,draggable,center,lightbox');


right.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

let xlow1 = -2;
let xhigh1 = 2;
let ylow1 = -2;
let yhigh1 = 8;

let th = new BlueTheme();

let workspace1 = new Workspace('box', [xlow1,yhigh1,xhigh1,ylow1], {xlabel:'h', ylabel:''});
let F1 = new ProblemFunction(
	function(h) { return 4 + h; }, 
	'', 3.5, [xlow1,xhigh1], []);
let F_id1 = workspace1.addFunction(F1);

let limit = new ApproachLimit(workspace1.board, F1.f, 0, undefined);

let limitExpression = workspace1.board.create('functiongraph',[F1.f,xlow1,xhigh1], { 
  strokeColor:'#55DDFF',
  strokeWidth:4,
  visible:false
});

limit.glider.moveTo([1,0]);

let hLine = workspace1.board.create('segment', [[0,0], limit.glider], 
    {
      strokeColor: '#55DDFF', 
      strokeWidth:5, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });


//////////////////////////////////////////////////////////////////////////////////////////


left.innerHTML = `<div id='top' style='height:100px; width:100%; border:1px solid gray;background:#EEFFCC;border-radius:8px;'></div><div id='bottom' style='height:600px; width:100%; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div>`;

let xlow2 = -1;
let xhigh2 = 6;
let ylow2 = -3;
let yhigh2 = 30;

let workspace2 = new Workspace('bottom', [xlow2,yhigh2,xhigh2,ylow2],{ xlabel:'time (s)', ylabel:'distance(m)', colorTheme:'steel' });
let F2 = new ProblemFunction(function(x) { return x * x; }, '', 4, [0,xhigh2], []);
let F_id2 = workspace2.addFunction(F2);

workspace2.xaxis.removeAllTicks();

workspace1.board.addChild(workspace2.board);

let xint = new XInterval(workspace2.board, 2,3);
xint.x1.setAttribute({fixed:true});
let secant = new Secant(xint, F2.f, {showUnits:true, 
  annotations:'on',  
  noChangeNumber:true,
  noUnitsNumber:true,
  change:'(2+h)^2 - 2^2',
  units:'h',
  snapMargin:0.008,
  precision: 3
});
workspace2.addElement(secant);

secant.xint.x1.setAttribute({name:'2'});
secant.xint.x2.setAttribute({name:'2 + h'});

let triangle = workspace2.board.create('polygon', [secant.f1, secant.f2, secant.p1], {
  fillColor:'#55DDFF', 
  fillOpacity: 50,
  strokeWidth:3, visible:false});

let hWidth = workspace2.board.create('segment', [secant.p1, secant.f1], 
    {
      strokeColor: '#55DDFF', 
      strokeWidth:5, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

let t = workspace2.board.create('glider', [0,0, workspace2.xaxis], 
	{name:'', face:'^', size:12, color:'green'});

let p = workspace2.board.create('point', [
  function() { return t.X(); }, 
  function() { return F2.f(t.X()); }], {color:'green', name:''});



/////////////////////////////////////////////////////////////////////////////////////////
// second board


let board1 = JXG.JSXGraph.initBoard('top', {boundingbox:[-6,5,36,-2], keepaspectratio:false, axis:false, showCopyright:false, showNavigation:false});

workspace2.board.addChild(board1);

let xaxis1 = board1.create('axis', [[0, 0], [1,0]], 
  {name:'meters', 
    withLabel: true,
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, 20]   // (in pixels)
    }
  });

let yaxis1 = board1.create('axis', [[0, 0], [0, 1]], 
  {name:'', 
    withLabel: false, 
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-120, -20]   // (in pixels)
    },
    ticks: {visible:false}
  }); 


let carurl = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/9e01e8197b3bf685747ae134de3d75feb64ea6f4/car.png';
let car = board1.create('image',[carurl, [function() { return F2.f(t.X()) -4 ; },-0.2], [4,2]]);


////////////////////////////////////////////////////////////////////////////////////



//workspace2.board.addChild(workspace.board);

/////////////////////////////////////////////////////////////////////////////////////////

// Event handling

workspace1.board.on('update', function() {
	limit.onUpdate();
	workspace1.onUpdate();
});

workspace2.board.on('update', function() {
	xint.x2.moveTo([limit.glider.X() + 2,0]);
	let delta = Math.abs(4 - secant.slope());
	let pr = 2;
	while (Math.floor(delta * Math.pow(10,pr)) == 0) {
	  pr += 1;
	}
	secant.precision = pr;
	workspace2.onUpdate();
});


let heightPercent = 0.6;
let heightRatio = 1/6;

this.sizeChanged = function() {
  workspace1.board.resizeContainer(right.offsetWidth, window.innerHeight * heightPercent);
  workspace2.board.resizeContainer(left.offsetWidth, (1-heightRatio) * heightPercent * window.innerHeight);
  board1.resizeContainer(left.offsetWidth, heightRatio * window.innerHeight * heightPercent);
};


this.sizeChanged();

smartdown.setVariable('reduce', false);
smartdown.setVariable('all', false);

this.dependOn = ['reduce', 'all'];  
this.depend = function() {
  
	if (env.reduce == true) {
		smartdown.setVariable('reduce', false);
		limit.reduceDelta();		
	}

	if (env.all == true) {
		smartdown.setVariable('all', false);
		limit.eliminateDelta();
	}
};


// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-6-Frame');
formula1.onmouseover = onWideAFFactory(formula1, showAFFactory([triangle, limitExpression]));
formula1.onmouseout = offWideAFFactory(formula1, hideAFFactory([triangle, limitExpression]));
formula1.classList.add('highlightOffWide');

const formula2 = document.getElementById('MathJax-Element-7-Frame');
formula2.onmouseover = onAFFactory(formula2, showAFFactory([hLine, hWidth]));
formula2.onmouseout = offAFFactory(formula2, hideAFFactory([hLine, hWidth]));
formula2.classList.add('highlightOffNarrow');

```

# :::: clue
# --outlinebox question
###### Car Ride
The position of the car is described by the function $f(t) = t^2$.  Find the velocity of the car at time $t=2$?  
# --outlinebox
# ::::

# :::: success
# --partialborder
Success!
The instantaneous speed of the car at time $t=2$ is defined as the limit of the slope of the secant line
$$\lim_{h \to 0}\frac{(2 + h)^2 - 2^2}{h}.$$ 
The idea of a **limit** got us out of a jam here.  This limit of the slope of the secant line is called the **derivative** and we've evaluated it at $t=2$.  
[Continue](/pages/derivative1)
# --partialborder
# ::::


```javascript /autoplay

smartdown.setVariable('s1','');

this.dependOn = ['s1'];  
this.depend = function() {
  
  if (env.s1 == '4') {
    smartdown.showDisclosure('success','','center,transparent,draggable,closeable,shadow');
  }

};
```

