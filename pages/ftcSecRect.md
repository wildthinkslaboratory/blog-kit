### Reviewing Secants and Rectangles 

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
Derivatives tell us the slope of [tiny](:=animate=true), tiny secants and integrals sum up [tiny](:=animate=true), tiny rectangles. In our earlier section on [secants and rectangles](/pages/prelude) we saw that every secant has a matching rectangle.  They are two different ways of expressing the same information.  For example, the slope of the secant may tell us the rate of change as a ratio of distance over time $r = \frac{d}{t}$.  The area of the corresponding rectangle tells us the distance as a product of the rate and the time $d = r \cdot t$.  Slopes and areas are inverses of each other.    

If for some reason I [didn't know](:=hideArea=true) the area of the rectangle, I could infer the area from the height of the $secant$.

[show area](:=showArea=true)

[Continue](/pages/ftcArea)

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
let b = 3;
let n = 6;

let cs = new SteelTheme();

let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{ xlabel:'', ylabel:'', colorTheme:'steel' });


let df = function(x) { return Math.pow(x-2,4)/8 + Math.pow(x-2,3)/12 - 3 * (x-2) * (x-2) + 12;};
let f =  function(x) { return Math.pow(x-2,5)/40 + Math.pow(x-2,4)/48 - Math.pow(x-2,3) + 12* (x - 2) + 25;  };
let F = new ProblemFunction(f, '', 4, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let DF = new ProblemFunction(df, '', 4, [xlow,xhigh], []);
let DF_id = workspace.addFunction(DF);

let xint = new XInterval(workspace.board, a,b);

let secantRect = new SecantRectangle(xint,  F.f, { 
	annotations: 'on',
	snapMargin:0.5,
	change:'distance',
	units:'time',
	rate:'rate',
	attachButtonVisible:false,
});

let shx = function() { return secantRect.xint.X2(); };
let sh1 = function() { return secantRect.secant.fx1(); }
let sh2 = function() { return secantRect.secant.fx2(); }

let secant_height = workspace.board.create('segment',[[shx,sh1], [shx,sh2]],
  {
    strokeColor:'#55DDFF', 
    strokeWidth:4,
    firstArrow:true, 
    lastArrow:true, 
    visible:false
  });

workspace.board.on('update', function() {
  workspace.onUpdate();
});


this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, window.innerHeight * 0.7);
};

smartdown.setVariable('hideArea', false);
smartdown.setVariable('showArea', false);

this.sizeChanged();


this.dependOn = ['hideArea', 'showArea'];
this.depend = function() {
	if (env.hideArea == true) {
		smartdown.setVariable('hideArea', false);
		secantRect.rectangle.turnOffAnnotations();
	}	
	if (env.showArea == true) {
		smartdown.setVariable('showArea', false);
		secantRect.rectangle.turnOnAnnotations();
	}
}
outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');



// set up highlight mapping for formulas.  connect them with their
// model highlight
const formula1 = document.getElementById('MathJax-Element-3-Frame');
formula1.onmouseover = onAFFactory(formula1, showAFFactory([secant_height]));
formula1.onmouseout = offAFFactory(formula1, hideAFFactory([secant_height]));
formula1.classList.add('highlightOffNarrow');



```