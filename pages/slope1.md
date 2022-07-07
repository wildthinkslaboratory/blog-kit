Ingrid drives from the city of Eugene to the city of Bend.  She travels 140 miles in 2.8 hours. Drag the red dot to show the ratio of 140 miles to 2.8 hours.  

What is Ingrid's average speed? [](:?speed) mph


```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:400px;'>`;


// let height = 15;
// let width = height * (myDiv.offsetWidth * 0.6 / 600);

JXG.Options.axis.ticks.majorHeight = 40;
JXG.Options.layer['line'] = 5;
// create the board
let board0 = JXG.JSXGraph.initBoard('box', {boundingbox:[-2,200,4,-50], keepaspectratio:false, axis:false, showCopyright:false});

let xaxis = board0.create('axis', [[0, 0], [1,0]], 
      {name:'hours', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
      });
let yaxis = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'miles', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   



let x1 = board0.create('point', [0, 0], {name: '', color:'blue', fixed: true, size:3});


let p = board0.create('point', [0,0], {name:'', color:'red', size:6, visible:true, showInfoBox:false});

// snap p to grid
board0.on('update', function() {

  let snapY = Math.floor(p.Y() / 5) * 5;
  if ((p.Y() - snapY) > 2.5) { snapY += 5 }

  let snapX = Math.floor(10 * p.X()) / 10;
  if ((p.X() - snapX) > 0.05) { snapX += 0.10 }

  p.moveTo([snapX,snapY]);

});

let segment = board0.create('segment', [x1, p], {strokeColor:'blue', strokeWidth:3 });
let x2 = board0.create('point', [
  function() { return p.X(); },
  0 ], 
  {name:'', color:'blue', fixed:true, size:3 });

let rise = board0.create('segment', [p, x2], {strokeColor:'blue', dash:2, strokeWidth:3 });
let run = board0.create('segment', [x1, x2], {strokeColor:'blue', dash:2, strokeWidth:3 });
// let circle = board0.create('circle', [x1, p], { strokeColor:'black', strokeWidth:2 });

let slope = function() { return p.Y()/p.X(); }
let slopeText = board0.create('text', [
  function() {  return p.X() + p.X() / Math.sqrt(p.X() * p.X() + p.Y() * p.Y()) + 0.1; },
  function() {  return p.Y() + p.Y() / Math.sqrt(p.X() * p.X() + p.Y() * p.Y()); },
  function() { 
    if (p.X() == 0) { return 'Inf'; }
    return 'slope = ' + (p.Y() / p.X()).toFixed(2) + ' mph'; }], 
  {fontSize:16});

let riseText = board0.create('text', [
  function() { if (x2.X() > x1.X()) { return x2.X() + 0.1; } 
         return x2.X() - 0.8; },
  function() { return p.Y()/2; },
  function() { return p.Y().toFixed(0).toString() + ' miles'; }], 
  {fontSize:12, visible:true});

let runText = board0.create('text', [
  function() { return x2.X()/2; },
  -20,
  function() { return p.X().toFixed(1).toString() + ' hours'; }], {fontSize:12, visible:true});

let widthPercent = 0.8;
let heightPercent = 0.6;

this.sizeChanged = function() {
  board0.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);
};

this.sizeChanged();


```


```javascript /autoplay
function removeEnterFromSmartdownString(name, smartdownVar) {
  if (smartdownVar[smartdownVar.length - 1] === '\n') {           
    smartdown.setVariable(name, smartdownVar.replace(/\s/g, ''));
  }
}

smartdown.setVariable('speed', '');
this.dependOn = ['speed'];

this.depend = function() {
  removeEnterFromSmartdownString('speed', env.speed);
  if (env.speed === '50') {
    smartdown.showDisclosure('highfive','','transparent,bottomright,shadow');
    setTimeout(function () {
           smartdown.hideDisclosure('highfive','','');
      }, 3000);
  }
};
```

# :::: highfive
# --colorbox c1
High five! :raised_hand:
# --colorbox
# ::::

