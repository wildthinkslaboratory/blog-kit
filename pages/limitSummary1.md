### Informal Limits

#### --outlinebox outer1

#### --outlinebox left1

#### --outlinebox


#### --outlinebox right1
We've looked at a few limit examples and we've developed this informal description of a limit:

# --outlinebox ob_limit
**Informal Description of a Limit**
Say we have a function $f(x)$.  The limit of $f(x)$ at some point $x=a$ is the value the function gets [close](:=reduce=true) to as $x$ gets very close but remains distinct from $a$.  
# --outlinebox

We learned that: 
1.  The limit at a point isn't always the same as the value of the function at that point.
2.  Sometimes the limit may not exist.

An informal understanding of limits sufficed in the study of calculus for 150 years.  Read this fabulous [quote from mathematician James Tanton](::tantonOnLimits/center,transparent,draggable,outline,shadow,closeable,scrollable) on this topic.

[How was this lesson?](::feedback/center,draggable,closeable,outline,shadow,transparent)
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

left.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

let xlow = -2;
let xhigh = 5;
let ylow = -2;
let yhigh = 5;

let th = new BlueTheme();

JXG.Options.layer['functiongraph'] = 5;
let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow], {xlabel:'', ylabel:''});
let F = new ProblemFunction(
	function(x) { return x + 1; }, 
	'', 3.5, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);

let limit = new ApproachLimit(workspace.board, F.f, 1, undefined);

let limitText = workspace.board.create('text', [1,-0.3, 'a'],{fontSize:18, anchorX:'middle'});

let asymptote = workspace.board.create('segment', [[1,0.2],[1,-0.2]], {strokeColor:'#DDD', stroteWidth:1})


/////////////////////////////////////////////////////////////////////////////////////////

// Event handling

this.div.onmousedown = function(e) { 
  
};


let heightPercent = 0.7;

this.sizeChanged = function() {
  workspace.board.resizeContainer(left.offsetWidth, window.innerHeight * heightPercent);
};


this.sizeChanged();


workspace.board.on('update', function() {
	limit.onUpdate();
  workspace.onUpdate();              // hook up workspace update functions
});


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

outer.classList.add('outer-multi-col');
left.classList.add('playable-2-col');
right.classList.add('text-2-col');


```






# :::: tantonOnLimits
# --partialborder
![icon](https://aperiodical.com/wp-content/uploads/2018/06/tanton-300x300.png)
**On the study of limits in highschool calculus:**
"... Many programs give the impression that this material is a precursor to rigor and technical precision, but, in the end, appeal to intuition over and over again. A student who thinks deeply is given the impression that a foundation is laid, but one with no cement or stone and therefore no real means to support a structure of any weight.
At this stage of the discussion, the notion of a “limit” should indeed be informal. In fact, the creators of calculus during the 1500s and 1600s did not think in terms of limits and found that intuition sufficed for the development at hand, compelling the subject onward in all its glory. It was only some 150 years later, after the subject was fully developed, that folk began to dig deeply into the foundations of the subject and begin to question beginning thoughts. What does it mean to be “continuous” exactly? What does a “leap of faith” really mean? Mathematicians at that time started to push the theory of calculus towards extreme situations (Does it work for the bizarre function that equals 1 for all rational numbers and 0 for all irrational numbers?) Troubles started to appear and so mathematicians had to resort to absolute technical clarity. French mathematician Augustine-Louis Cauchy (1789-1857) proposed the notion of a limit, and the full technical rigor for it was developed by Karl Weierstrass (1815-97).
The standard high-school curriculum does not present the problems that call for precise formulation of a limit, nor does it present the technical definition that goes with it! There is a half-hearted attempt to be “precise,” which, in the end is only confusing. "

From James Tanton's *Thinking Mathematics: Volume 6, Some Calculus*
# --partialborder
# ::::

# :::: feedback
# --aliceblue
Please take a moment to fill out a short feedback form to help us improve this lesson!
[Leave Feedback](https://docs.google.com/forms/d/e/1FAIpQLScHS0uj7Kc-UmhGBbEFMO1N48VLXRXkv9qtdZ_mFXApDH_-GA/viewform?usp=sf_link)
# --aliceblue
# ::::