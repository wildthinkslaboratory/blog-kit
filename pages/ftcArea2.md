### The Area Under a Curve 

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
We can improve our estimate by using [more rectangles](:=more=true). This makes our answer more accurate (and more tedious to compute). We can get an exact answer by taking the limit of this sum as $n$ goes to infinity.
$$\lim_{n \to \infty} \sum_{i=1}^{n} f(x_{i-1})(x_i - x_{i-1})$$
We call this an **integral** and we write it with the $\int$ symbol.
$$ \int_a^b f(x)dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_{i-1})(x_i - x_{i-1})$$
Now instead of adding up an insane number of areas, we need to solve this crazy limit.
[Continue](/pages/ftcLeftVsRightSums)

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

let aText = workspace.board.create('text',[a, -3, 'a'], {fontSize:12, color:cs.darkAnnote, fixed:true});
let bText = workspace.board.create('text',[b, -3, 'b'], {fontSize:12, color:cs.darkAnnote, fixed:true});

let s = workspace.board.create('slider',[[2,-5],[4,-5],[1,6,50]],
  {
    snapWidth:1, 
    precision:0,
    visible:false,
    baseline: {visible:false},
    highline: {visible:false},
    ticks: {visible:false},
    label: {visible:false}
  });

let riemannsum = workspace.board.create('riemannsum',
              [df, function(){return s.Value();}, 'left', a, b],
              {fillColor:cs.highlightFill, 
                strokeColor:cs.highlightStroke,
                visible:true}
              );

let xTexts = [];
let deltaX = (b-a)/n;
for (let i=0; i < n+1; i++) {
  xTexts.push(workspace.board.create('text', [a + i * deltaX, 0, 
    function() { return '\\[x_' + i.toString() + '\\]';} ], 
    {
      fontSize:12,
      visible:true
    }));
}



workspace.board.on('update', function() {
  workspace.onUpdate();
});


this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, window.innerHeight * 0.7);
};

this.sizeChanged();

smartdown.setVariable('more', false);

this.dependOn = ['more'];
this.depend = function() {
  if (env.more == true) {
    smartdown.setVariable('more', false);
    s.setAttribute({visible:true});
    s.baseline.setAttribute({visible:true});
    s.highline.setAttribute({visible:true});
    s.ticks.setAttribute({visible:true});
    s.label.setAttribute({visible:true});
    for (let i=0; i < n+1; i++) {
      xTexts[i].setAttribute({visible:false});
    }

    // aText.moveTo([a,-2]);
    // bText.moveTo([b,-2]);
  }
}
outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');




```