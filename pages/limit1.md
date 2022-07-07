# :::: conclusion
# --partialborder 
You just found a **limit**! 

The function is undefined when $x=1$.  There's a tiny, tiny hole in the function there.  Still, to the left and the right of that tiny hole the function is getting super close to the value $2$.  We say that $2$ is the limit of the function as $x$ goes to $1$ and we write it like this
$$
\lim_{x \to 1} \frac{x^2 - 1}{x-1} = 2
$$
So the limit of a function at a point is not the same thing as the value of the function at that point. 
[Continue](/pages/limit3)
# --partialborder
# ::::

# :::: note1 
You can drag the blue slider to get close to $x=1$, but you can get super close and still not reach it by using the [closer](:=reduce=true) button multiple times.
# ::::
### Thinking about Limits

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
Here is a graph of the function
$$ 
f(x) = \frac{x^2 - 1}{x - 1}
$$
Something interesting is happening at $x=1$.  You can:
1. Go [closer](:=reduce=true) to $x=1$.  
2. Go [all the way](:=all=true) to $x=1$.
**NOTE:** You can drag the blue slider to get close to $x=1$, but you can get super close and still not reach it by using the [closer](:=reduce=true) button multiple times.

When $x=1$ the value of $f$ is undefined.  You can read more on the perils of dividing by zero [here](/pages/divideByZero#-blank).
When $x$ gets close to $1$, $f(x)$ is getting close to [](:?s1). 
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


```javascript /autoplay
function removeEnterFromSmartdownString(name, smartdownVar) {
  if (smartdownVar[smartdownVar.length - 1] === '\n') {           
    smartdown.setVariable(name, smartdownVar.replace(/\s/g, ''));
  }
}

smartdown.setVariable('s1','');
this.dependOn = ['s1'];  
this.depend = function() {
	removeEnterFromSmartdownString('s1', env.s1);
	
	if (env.s1 == '2') {
		smartdown.showDisclosure('conclusion','','center,transparent,closeable,draggable,outline,shadow');
	}


};
```

