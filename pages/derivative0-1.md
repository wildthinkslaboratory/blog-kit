[Problem](::clue/button,transparent,draggable,closeable,lightbox,outline,center,shadow) [note](::notes/button,transparent,draggable,closeable,center,shadow,outline) [Drive!](:=play=true) [Submit Solution](:=compute=true)
velocity at $t=\sqrt{2}$ [](:?s1)  [Formatting Hints](::formatting/tooltip,transparent)

#### --outlinebox outer1

#### --outlinebox left1

#### --outlinebox


#### --outlinebox middle1

#### --outlinebox


#### --outlinebox right1
**Notation:**
function: $f(t) = t^2$
points: $(\sqrt{2}, 2)$,  $(\sqrt{2}+h, (\sqrt{2}+h)^2)$
distances: $h$ and $(\sqrt{2}+h)^2 - 2$ 
slope:   $$\frac{(\sqrt{2} + h)^2 - 2}{h}$$
  
1. Go [closer](:=reduce=true) to $h=0$.
2. Go [all the way](:=all=true) to $h=0$.

The secant slope as the secant gets smaller is represented by the limit
$$\lim_{h \to 0}\frac{(\sqrt{2} + h)^2 - 2}{h}$$ 


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
middle.classList.add('playable-3-col');

const right = document.getElementById('right1');
right.classList.remove('decoration-outlinebox');
right.classList.add('text-3-col');


//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');
// import the calc library
//smartdown.import=/assets/libs/calc.js
//smartdown.import=/assets/libs/mapping.js

JXG.Options.text.useMathJax = true;

let xint1 = Math.sqrt(2);

middle.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

let xlow1 = -3;
let xhigh1 = 3;
let ylow1 = -2;
let yhigh1 = 7;

let th = new BlueTheme();

let workspace1 = new Workspace('box', [xlow1,yhigh1,xhigh1,ylow1], {
  xlabel:'h (s)', 
  ylabel:'secant slope (m/s)',
  offsetX: [-30,20]
});
let F1 = new ProblemFunction(
	function(h) { return 2 * xint1 + h; }, 
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
let xhigh2 = 4;
let ylow2 = -3;
let yhigh2 = 16;


let workspace2 = new Workspace('bottom', [xlow2,yhigh2,xhigh2,ylow2],{ 
  xlabel:'time (s)', 
  ylabel:'distance(m)', 
  colorTheme:'steel',
  offsetX: [-50,20],
  offsetY: [20, 0]
});
let F2 = new ProblemFunction(function(x) { return x * x; }, '', 4, [0,xhigh2], []);
let F_id2 = workspace2.addFunction(F2);

workspace2.xaxis.removeAllTicks();

workspace1.board.addChild(workspace2.board);


let xint2 = Math.sqrt(2) + limit.glider.X();
let xint = new XInterval(workspace2.board, xint1, xint2);
xint.x1.setAttribute({fixed:true});
xint.turnOffSnapToGrid();
xint.x1.setAttribute({fixed:true});
let secant = new Secant(xint, F2.f, {showUnits:true, 
  annotations:'on',  
  noChangeNumber:true,
  noUnitsNumber:true,
  change:'\\[(\\sqrt{2} + h)^2 - 2 \\]',
  units:'h',
  snapMargin:0.008,
  precision: 3
});
workspace2.addElement(secant);

secant.xint.x1.setAttribute({name:'\\[\\sqrt{2}\\]'});
secant.xint.x2.setAttribute({name:'\\[\\sqrt{2} + h\\]'});



let t = workspace2.board.create('glider', [0,0, workspace2.xaxis], 
	{name:'', face:'^', size:12, color:'green'});

let p = workspace2.board.create('point', [
  function() { return t.X(); }, 
  function() { return F2.f(t.X()); }], {color:'green', name:''});


let f1 = workspace2.board.create('point', [
  xint.X1,
  function() { return F2.f(xint.X1()); }], 
  { fillColor: '#55DDFF', strokeColor:'#88CCEE', size:6 , name:'', visible:false});

let f2 = workspace2.board.create('point', [
  xint.X2,
  function() { return F2.f(xint.X2()); }
  ], { fillColor: '#55DDFF', strokeColor:'#88CCEE', size:6 , name:'', visible:false});

let fofX = workspace2.board.create('functiongraph',[F2.f,xlow2,xhigh2], { 
  strokeColor:'#55DDFF',
  strokeWidth:3,
  visible:false
})

let riseLine = workspace2.board.create('segment', [secant.p1, secant.f2], 
    {
      strokeColor: '#55DDFF', 
      strokeWidth:5, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

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

/////////////////////////////////////////////////////////////////////////////////////////
// second board


let board1 = JXG.JSXGraph.initBoard('top', {boundingbox:[-4,5,16,-2], keepaspectratio:false, axis:false, showCopyright:false, showNavigation:false});

workspace2.board.addChild(board1);

let xaxis1 = board1.create('axis', [[0, 0], [1,0]], 
  {name:'meters', 
    withLabel: true,
    label: {
      fontSize: 16,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-50, 20]   // (in pixels)
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
let car = board1.create('image',[carurl, [function() { return F2.f(t.X()) -2 ; },-0.2], [2,2]]);


////////////////////////////////////////////////////////////////////////////////////



//workspace2.board.addChild(workspace.board);

/////////////////////////////////////////////////////////////////////////////////////////

// Event handling

workspace1.board.on('update', function() {
	limit.onUpdate();
	workspace1.onUpdate();
});

workspace2.board.on('update', function() {
  secant.precision = limit.precision;
	xint.x2.moveTo([limit.glider.X() + xint1,0]);
	workspace2.onUpdate();
});

let move = function() { 
  t.moveTo([xhigh2,0],3000, {effect: '--'} ); 
}

let heightPercent = 0.6;
let heightRatio = 1/6;

this.sizeChanged = function() {
  workspace1.board.resizeContainer(middle.offsetWidth, window.innerHeight * heightPercent);
  workspace2.board.resizeContainer(left.offsetWidth, (1-heightRatio) * heightPercent * window.innerHeight);
  board1.resizeContainer(left.offsetWidth, heightRatio * window.innerHeight * heightPercent);
};


this.sizeChanged();

smartdown.setVariable('reduce', false);
smartdown.setVariable('all', false);
smartdown.setVariable('play', false);

this.dependOn = ['reduce', 'all', 'play'];  
this.depend = function() {
  
  if (env.play == true) {
    smartdown.setVariable('play', false);
    move();
  }

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

const formula1 = document.getElementById('MathJax-Element-3-Frame');
formula1.onmouseover = onAFFactory(formula1, showAFFactory([f1]));
formula1.onmouseout = offAFFactory(formula1, hideAFFactory([f1]));
formula1.classList.add('highlightOffNarrow');

const formula2 = document.getElementById('MathJax-Element-4-Frame');
formula2.onmouseover = onAFFactory(formula2, showAFFactory([f2]));
formula2.onmouseout = offAFFactory(formula2, hideAFFactory([f2]));
formula2.classList.add('highlightOffNarrow');

const formula22 = document.getElementById('MathJax-Element-2-Frame');
formula22.onmouseover = onAFFactory(formula22, showAFFactory([fofX]));
formula22.onmouseout = offAFFactory(formula22, hideAFFactory([fofX]));
formula22.classList.add('highlightOffNarrow');


const formula3 = document.getElementById('MathJax-Element-5-Frame');
formula3.onmouseover = onAFFactory(formula3, showAFFactory([hLine, hWidth]));
formula3.onmouseout = offAFFactory(formula3, hideAFFactory([hLine, hWidth]));
formula3.classList.add('highlightOffNarrow');


const formula4 = document.getElementById('MathJax-Element-6-Frame');
formula4.onmouseover = onAFFactory(formula4, showAFFactory([riseLine]));
formula4.onmouseout = offAFFactory(formula4, hideAFFactory([riseLine]));
formula4.classList.add('highlightOffNarrow');

const formula5 = document.getElementById('MathJax-Element-7-Frame');
formula5.onmouseover = onWideAFFactory(formula5, showAFFactory([triangle, limitExpression]));
formula5.onmouseout = offWideAFFactory(formula5, hideAFFactory([triangle, limitExpression]));
formula5.classList.add('highlightOffWide');


```



# :::: success
# --partialborder
Success!
The instantaneous speed of the car at time $t=\sqrt{2}$ is defined as the limit of the slope of the secant line as the secant interval gets really small
$$\lim_{h \to 0}\frac{(\sqrt{2} + h)^2 - 2}{h}=2\sqrt{2}$$ 
The slope of the secant is undefined at $h=0$, but the limit at $h=0$ exists.  The idea of a **limit** got us out of a jam here.  This limit of the slope of the secant line is called the **derivative** and we've evaluated it at $t=\sqrt{2}$.  
[Continue](/pages/derivative1)
# --partialborder
# ::::

# :::: clue
# --outlinebox question
###### Car Ride
The position of the car is defined by the function $f(t) = t^2$.  Find the velocity of the car when $t=\sqrt{2}$. 
# --outlinebox
# ::::

# :::: notes
# --partialborder note
###### Note 1
There's a lot of stuff on this page.  Take your time and don't rush.

###### Note 2
The speed of the car at $t=\sqrt{2}$ is not a whole number.  This makes it impossible to get the exact speed from looking at the graphs.  Instead, we can look at an expression for the slope of the secant line and take the limit as the secant gets very small.
$$\lim_{h \to 0}\frac{(\sqrt{2} + h)^2 - 2}{h}$$ 
With a little algebra, we can solve this limit and get an exact answer.
# --partialborder
# ::::

# :::: formatting
# --partialborder format
- You can represent $\sqrt{x}$ as `sqrt(x)`.
- You can represent infinity $\infty$ as `inf` and negative infinity $-\infty$ as `-inf`.
# --partialborder
# ::::

# :::: keeptrying
# --colorbox
[](:!hint) 
# --colorbox
# ::::

```javascript /autoplay
//smartdown.import=/assets/libs/mapping.js

smartdown.setVariable('s1','');
smartdown.setVariable('hint', 'Keep trying');
smartdown.setVariable('compute', false);

let answer = new ProblemAnswer(['2sqrt(2)', '2*sqrt(2)', '2 sqrt(2)', '2 * sqrt(2)', '2* sqrt(2)', '2 *sqrt(2)'], 
  [['contains','.','Your answer should not contain a decimal point']]
  );


this.dependOn = ['compute'];  
this.depend = function() {

  if (env.compute == true) {
    smartdown.setVariable('compute', false);
    if (answer.checkAnswer(env.s1)) {
      smartdown.showDisclosure('success','','center,transparent,draggable,closeable,outline,shadow');
    }
    else {
    smartdown.setVariable('hint', answer.checkHints(env.s1));
      smartdown.showDisclosure('keeptrying','','transparent,bottomright,shadow');
      setTimeout(function () {
        smartdown.hideDisclosure('keeptrying','','');
      }, 5000);
    }
  }
};
```

