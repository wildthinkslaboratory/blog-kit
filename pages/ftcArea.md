### The Area Under a Curve 

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
We want to find the area underneath the curve $f(x)$ between the values $a$ and $b$ on the x-axis.  We can estimate the area by [dividing](:=divide=true) it up into small rectangles and then adding up the area of the rectangles. The area of any single rectangle is just it's height $f(x_{i-1})$ times it's width $(x_i - x_{i-1})$.  The area of the first rectangle is $f(x_0)(x_1 - x_0)$ and the sum of all the rectangles is
$$
f(x_0)(x_1 - x_0) + f(x_1)(x_2 - x_1) + \cdots + f(x_5)(x_6 - x_5)
$$ 
The sigma $\sum$ notation gives us a shorthand way to write this sum.  
$$\sum_{i=1}^{6} f(x_{i-1})(x_i - x_{i-1})$$

[Continue](/pages/ftcArea2)

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
let ylow = -8;
let yhigh = 45;

let a = 1;
let b = 4;
let n = 6;

let cs = new SteelTheme();

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });

let df = function(x) { return Math.pow(x-2,4)/8 + Math.pow(x-2,3)/12 - 3 * (x-2) * (x-2) + 12;};
let f =  function(x) { return Math.pow(x-2,5)/40 + Math.pow(x-2,4)/48 - Math.pow(x-2,3) + 12* (x - 2) + 25;  };
let F = new ProblemFunction(f, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let DF = new ProblemFunction(df, '', 4, [xlow,xhigh], []);
let DF_id = workspace.addFunction(DF);

let fHighlight = workspace.board.create('functiongraph', [df, xlow, xhigh], 
{
  visible:false,
  strokeColor:'#55DDFF', 
  strokeWidth:4,
});

// let ftemp = workspace.board.create('functiongraph', [f, xlow, xhigh], 
// {
//   visible:true,
//   strokeColor:'#55DDFF', 
//   strokeWidth:4,
// });

let integral = workspace.board.create('integral', [[a, b], workspace.functions[DF_id].graph],
  {
    visible:true, 
    fillColor:cs.highlightFill, 
    label: {visible:false}, 
    curveLeft: {visible:false},
    curveRight: {visible:false}
  });

let avert = workspace.board.create('segment',[[a,0], [a,df(a)]],{strokeColor:cs.darkAnnote, strokeWidth:1});
let bvert = workspace.board.create('segment',[[b,0], [b,df(b)]],{strokeColor:cs.darkAnnote, strokeWidth:1});
let aText = workspace.board.create('text',[a, -3, 'a'], {fontSize:12, color:cs.darkAnnote, fixed:true});
let bText = workspace.board.create('text',[b, -3, 'b'], {fontSize:12, color:cs.darkAnnote, fixed:true});

let riemannsum = workspace.board.create('riemannsum',
              [df, function(){return n;}, 'left', a, b],
              {fillColor:cs.highlightFill, 
                strokeColor:cs.highlightStroke,
                visible:false}
              );

let xTexts = [];
let deltaX = (b-a)/n;
for (let i=0; i < n+1; i++) {
  xTexts.push(workspace.board.create('text', [a + i * deltaX, 0, 
    function() { return '\\[x_' + i.toString() + '\\]';} ], 
    {
      fontSize:12,
      visible:false
    }));
}

let height = workspace.board.create('segment',[[a - 0.1,0], [a - 0.1,df(a)]],
  {
    strokeColor:'#55DDFF', 
    strokeWidth:4,
    firstArrow:true, 
    lastArrow:true, 
    visible:false
  });

let width = workspace.board.create('segment',[[a, df(a)+1], [a+deltaX,df(a)+1]],
  {
    strokeColor:'#55DDFF', 
    strokeWidth:4,
    firstArrow:true, 
    lastArrow:true, 
    visible:false
  });

let rect1 = workspace.board.create('polygon', [[a,0], [a,df(a)], [a+0.5,df(a)], [a+0.5,0]], 
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

workspace.board.on('update', function() {
  workspace.onUpdate();
});


this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, window.innerHeight * 0.7);
};

this.sizeChanged();

smartdown.setVariable('divide', false);

this.dependOn = ['divide'];
this.depend = function() {
  if (env.divide == true) {
    smartdown.setVariable('divide', false);
    integral.setAttribute({visible:false});
    avert.setAttribute({visible:false});
    bvert.setAttribute({visible:false});
    riemannsum.setAttribute({visible:true});
    for (let i=0; i < n+1; i++) {
      xTexts[i].setAttribute({visible:true});
    }

    // aText.moveTo([a,-2]);
    // bText.moveTo([b,-2]);
  }

}
outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');



// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-4-Frame');
formula1.onmouseover = onAFFactory(formula1, showAFFactory([height]));
formula1.onmouseout = offAFFactory(formula1, hideAFFactory([height]));
formula1.classList.add('highlightOffNarrow');


const formula2 = document.getElementById('MathJax-Element-5-Frame');
formula2.onmouseover = onAFFactory(formula2, showAFFactory([width]));
formula2.onmouseout = offAFFactory(formula2, hideAFFactory([width]));
formula2.classList.add('highlightOffNarrow');

const formula3 = document.getElementById('MathJax-Element-1-Frame');
formula3.onmouseover = onAFFactory(formula3, showAFFactory([fHighlight]));
formula3.onmouseout = offAFFactory(formula3, hideAFFactory([fHighlight]));
formula3.classList.add('highlightOffNarrow');

const formula4 = document.getElementById('MathJax-Element-6-Frame');
formula4.onmouseover = onAFFactory(formula4, showAFFactory([rect1]));
formula4.onmouseout = offAFFactory(formula4, hideAFFactory([rect1]));
formula4.classList.add('highlightOffNarrow');

```