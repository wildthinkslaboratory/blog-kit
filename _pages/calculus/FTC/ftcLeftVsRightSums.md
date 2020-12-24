---
title: Fundamental Theorem of Calculus
smartdown: true
header: 'none'
lesson: 'ftc'
ogimage: /assets/images/calculus/ftc1.jpg
---

### The Area Under a Curve 

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
Notice that these rectangles attach to the curve on the left side.  We could attach the rectangles on the [right](:=right=true) and then take the limit as $n$ goes to infinity. 
$$ \lim_{n \to \infty} \sum_{i=1}^{n} f(x_{i})(x_i - x_{i-1})$$ Notice that the limit still converges to the area under the curve.  When we [pick](:=pick=true) the height of a rectangle, we can use the left most value $f(x_{i-1})$, the right most value $f(x_i)$ or any value $f(c)$ where $c$ is inbetween $x_{i-1}$ and $x_i$.  All of these rectangle sums will approach the same limit as the number of rectangles goes to infinity.

Attach rectangles on the [left](:=left=true)
[Continue](/pages/ftc3)

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

left.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

JXG.Options.text.useMathJax = true;

let xlow = -1;
let xhigh = 5;
let ylow = -10;
let yhigh = 20;

let a = 1;
let b = 4;
let n = 6;

let cs = new SteelTheme();

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });

let df = function(x) { return Math.pow(x-2,4)/8 + Math.pow(x-2,3)/12 - 3 * (x-2) * (x-2) + 12;};
let f =  function(x) { return Math.pow(x-2,5)/40 + Math.pow(x-2,4)/48 - Math.pow(x-2,3) + 12* (x - 2) + 25;  };
let F = new ProblemFunction(df, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);
workspace.functions[F_id].graph.setAttribute({strokeColor:cs.darkAnnote, strokeWidth:2});

let aText = workspace.board.create('text',[a, -2, 'a'], {fontSize:12, color:cs.darkAnnote, fixed:true});
let bText = workspace.board.create('text',[b, -2, 'b'], {fontSize:12, color:cs.darkAnnote, fixed:true});

let s = workspace.board.create('slider',[[2,-5],[4,-5],[1,6,50]],
  {
    snapWidth:1, 
    precision:0,
  });

let riemannsumL = workspace.board.create('riemannsum',
              [df, function(){return s.Value();}, 'left', a, b],
              {fillColor:cs.highlightFill, 
                strokeColor:cs.highlightStroke,
                visible:true}
              );

let riemannsumR = workspace.board.create('riemannsum',
              [df, function(){return s.Value();}, 'right', a, b],
              {fillColor:cs.highlightFill, 
                strokeColor:cs.highlightStroke,
                visible:false}
              );


let rect1 = workspace.board.create('polygon', [[a+1,0], [a+1,df(a+1)], [a+2,df(a+1)], [a+2,0]], 
    {
      borders: { strokeColor: '#55DDFF', highlightStrokeColor: '#55DDFF'},
      fillColor:'#55DDFF', 
      highlightFillColor:'#55DDFF', 
      fillOpacity:1,
      highlightFillOpacity:1,
      hasInnerPoints:true,
      visible:false,
      vertices: {visible:false}
    });

let rect2 = workspace.board.create('polygon', [[a+1,0], [a+1,df(a+2)], [a+2,df(a+2)], [a+2,0]], 
    {
      borders: { strokeColor: '#55DDFF', highlightStrokeColor: '#55DDFF'},
      fillColor:'#55DDFF', 
      highlightFillColor:'#55DDFF', 
      fillOpacity:1,
      highlightFillOpacity:1,
      hasInnerPoints:true,
      visible:false,
      vertices: {visible:false}
    });

let rectC = workspace.board.create('polygon', [[a+1,0], [a+1,df(a+1.6)], [a+2,df(a+1.6)], [a+2,0]], 
    {
      borders: { strokeColor: '#55DDFF', highlightStrokeColor: '#55DDFF'},
      fillColor:'#55DDFF', 
      highlightFillColor:'#55DDFF', 
      fillOpacity:1,
      highlightFillOpacity:1,
      hasInnerPoints:true,
      visible:false,
      vertices: {visible:false}
    });


let height = workspace.board.create('segment',[[a + 1.6,0], [a + 1.6,df(a+1.6)]],
  {
    strokeColor: cs.darkAnnote, 
    strokeWidth:1,
    firstArrow:true, 
    lastArrow:true, 
    visible:false
  });

let cText = workspace.board.create('text',[a+1.6, -1, 'c'], {fontSize:12, color:cs.darkAnnote, fixed:true, visible:false});


workspace.board.on('update', function() {
  workspace.onUpdate();
});


this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, window.innerHeight * 0.7);
};

this.sizeChanged();

smartdown.setVariable('right', false);
smartdown.setVariable('left', false);
smartdown.setVariable('pick', false);

this.dependOn = ['right', 'left', 'pick'];
this.depend = function() {
  if (env.right == true) {
    smartdown.setVariable('right', false);
    riemannsumL.setAttribute({visible:false});
    riemannsumR.setAttribute({visible:true});
  }
  if (env.left == true) {
    smartdown.setVariable('left', false);
    riemannsumL.setAttribute({visible:true});
    riemannsumR.setAttribute({visible:false});
  }
  if (env.pick == true) {
    smartdown.setVariable('pick', false);
    s.setValue(3);
    workspace.board.update();
  }  
}
outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');


// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-3-Frame');
formula1.onmouseover = onAFFactory(formula1, showAFFactory([rect1]));
formula1.onmouseout = offAFFactory(formula1, hideAFFactory([rect1]));
formula1.classList.add('highlightOffNarrow');


const formula2 = document.getElementById('MathJax-Element-4-Frame');
formula2.onmouseover = onAFFactory(formula2, showAFFactory([rect2]));
formula2.onmouseout = offAFFactory(formula2, hideAFFactory([rect2]));
formula2.classList.add('highlightOffNarrow');

const formula3 = document.getElementById('MathJax-Element-5-Frame');
formula3.onmouseover = onAFFactory(formula3, showAFFactory([rectC, height, cText]));
formula3.onmouseout = offAFFactory(formula3, hideAFFactory([rectC, height, cText]));
formula3.classList.add('highlightOffNarrow');


```