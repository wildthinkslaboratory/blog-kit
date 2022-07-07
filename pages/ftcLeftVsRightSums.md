### The Area Under a Curve 

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
Notice that these rectangles attach to the curve on the left side.  We could attach the rectangles on the right. [right](:=right=true) [left](:=left=true)
If we attach the rectangles on the right and let the number of rectangles go to infinity we write the limit like this
$$ \lim_{n \to \infty} \sum_{i=1}^{n} f(x_{i})(x_i - x_{i-1})$$ 

Try increasing the number of rectangles.  You'll see that in both approaches the limit approaches the area under the curve. There are multiple ways we can define our rectangles to create a limit that gives us the area under the curve.
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

//workspace.functions[DF_id].graph.setAttribute({strokeColor:cs.darkAnnote, strokeWidth:2});

let aText = workspace.board.create('text',[a, -3, 'a'], {fontSize:12, color:cs.darkAnnote, fixed:true});
let bText = workspace.board.create('text',[b, -3, 'b'], {fontSize:12, color:cs.darkAnnote, fixed:true});

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

let xsOn = function() {
    for (let i=0; i < n+1; i++) {
      xTexts[i].setAttribute({visible:true});
    }
};

let xsOff = function() {
    for (let i=0; i < n+1; i++) {
      xTexts[i].setAttribute({visible:false});
    }
};

let sliderUpdate = function() {
  if (s.Value() == 6) { xsOn(); }
  else {
    xsOff();
  }
}

s.on('drag', sliderUpdate);

workspace.board.on('update', function() {
  workspace.onUpdate();
});


this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, window.innerHeight * 0.7);
};

this.sizeChanged();

smartdown.setVariable('right', false);
smartdown.setVariable('left', false);

this.dependOn = ['right', 'left'];
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
}
outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');




```