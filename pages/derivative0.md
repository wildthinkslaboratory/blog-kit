### Small Secants Make Good Estimates

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
[Drive!](:=play=true)
Remember when we found the velocity of the car at a specific time from the car's position graph?  We used a secant to estimate it.   A very small secant over a very small time interval that included the time point gave a good estimate of the speed at that time.  The smaller we made the time interval, the better the estimate. 

At time $t=5$, the car's velocity is [](:?s1) m/s.
# :::: success
This method isn't very precise and we're sort of guessing.  Most of the answers so far have conveniently been whole numbers.  This won't usually be the case.  In the next problem, you will need to figure out a way to give an exact answer to the instantaneous speed question.
[Continue](/pages/derivative0-1)
# ::::


#### --outlinebox
#### --outlinebox

 

```javascript /autoplay

const outer = document.getElementById('outer1');
const left = document.getElementById('left1');
const right = document.getElementById('right1');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');


//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');
// import the calc library
//smartdown.import=/assets/libs/calc.js
//smartdown.import=/assets/libs/mapping.js


left.innerHTML = `<div id='top' style='height:100px; width:100%; border:1px solid gray;background:#EEFFCC;border-radius:8px;'></div><div id='bottom' style='height:600px; width:100%; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div>`;

let xlow = -1.5;
let xhigh = 9;
let ylow = -10;
let yhigh = 81;

let workspace = new Workspace('bottom', [xlow,yhigh,xhigh,ylow],{ 
  xlabel:'time (s)', 
  ylabel:'distance (m)', 
  colorTheme:'steel',
  offsetY: [20, 0] 
});
let F = new ProblemFunction(function(x) { return x * x; }, '', 4, [0,xhigh], []);
let F_id = workspace.addFunction(F);


let xint = new XInterval(workspace.board, 5,7);
let secant = new Secant(xint, F.f, {showUnits:true, 
  annotations:'on',  
  change:'m',
  units:'s',
  rate: 'm/s',
  annotationPosition:'after',
  snapMargin:0.008,
});

workspace.addElement(secant);

// secant.xint.x1.setAttribute({name:'t'});
// secant.xint.x2.setAttribute({name:'t + h'});

// let triangle = workspace.board.create('polygon', [secant.f1, secant.f2, secant.p1], {
//   fillColor:'#55DDFF', 
//   fillOpacity: 50,
//   strokeWidth:3, visible:false});

let t = workspace.board.create('glider', [0,0, workspace.xaxis], {name:'', face:'^', size:12, color:'green'});

let p = workspace.board.create('point', [
  function() { return t.X(); }, 
  function() { return F.f(t.X()); }], {color:'green', name:''});


// let goClose = function() {
//   if (secant.xint.X2() < secant.xint.X1()) {
//     secant.xint.x2.moveTo([secant.xint.X1()-0.01, 0],2000);
//   }
//   else {
//     secant.xint.x2.moveTo([secant.xint.X1()+0.01, 0],2000);
//   }
// }

// let goToZero = function() {
//   secant.xint.x2.moveTo([secant.xint.X1(), 0],500);
// }

// let resetSecant = function() {
//   secant.xint.x1.moveTo([1,0]);
//   secant.xint.x2.moveTo([2,0]);
// };

/////////////////////////////////////////////////////////////////////////////////////////
// second board


let board1 = JXG.JSXGraph.initBoard('top', {boundingbox:[-13.5,5,81,-2], keepaspectratio:false, axis:false, showCopyright:false, showNavigation:false});

workspace.board.addChild(board1);

let xaxis1 = board1.create('axis', [[0, 0], [1,0]], 
  {name:'meters', 
    withLabel: true,
    label: {
      fontSize: 16,
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
let car = board1.create('image',[carurl, [function() { return F.f(t.X()) -4 ; },-0.2], [4,2]]);


// ////////////////////////////////////////////////////////////////////////////////////

workspace.board.on('update', function() {
  workspace.onUpdate();
});


let heightPercent = 0.7;
let heightRatio = 1/6;

this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, (1-heightRatio) * window.innerHeight * heightPercent);
  board1.resizeContainer(left.offsetWidth, heightRatio * window.innerHeight * heightPercent);
};


this.sizeChanged();

let move = function() { 
  t.moveTo([8.9,0],3000, {effect: '--'} ); 
}

// smartdown.setVariable('close', false);
// smartdown.setVariable('gotozero', false);
// smartdown.setVariable('reset', false);
smartdown.setVariable('play', false);

this.dependOn = ['play'];
this.depend = function() {

  if (env.play == true) {
    smartdown.setVariable('play', false);
    move();
  }

//   if (env.close == true) {
//     smartdown.setVariable('close',false);
//     goClose();
//   }
//   if (env.gotozero == true) {
//     smartdown.setVariable('gotozero', false);
//     goToZero();
//   }
//   if (env.reset == true) {
//     smartdown.setVariable('reset', false);
//     resetSecant();
//   }
};




//////////////////////////////////////////////////////////////// NOTATION MAPPING

outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');



// // set up highlight mapping for formulas.  connect them with their
// // model highlight
// const formula1 = document.getElementById('MathJax-Element-3-Frame');
// formula1.onmouseover = onWideAFFactory(formula1, showAFFactory([triangle]));
// formula1.onmouseout = offWideAFFactory(formula1, hideAFFactory([triangle]));
// formula1.classList.add('highlightOffWide');


```

```javascript /autoplay
smartdown.setVariable('s1', '');

this.dependOn = ['s1'];
this.depend = function() {

    if (env.s1 == '10') {
      smartdown.showDisclosure('correct','','bottomright,transparent,colorbox,shadow');
      smartdown.showDisclosure('success', '', 'transparent');
      setTimeout(function () {
        smartdown.hideDisclosure('correct','','bottomright,colorbox,shadow');
      }, 3000);
    }
};
```
# :::: correct
# --colorbox
Correct!
# --colorbox
# ::::