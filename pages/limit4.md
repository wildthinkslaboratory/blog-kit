# :::: success
# --partialborder
Success!
For this function, the value gets close to 1 on the right side of $x=0$ and it gets close to $0$ on the left side of $x=0$.  Because the left and right limits at $x=0$ don't agree, we say that the limit at $x=0$ does not exist. 

[Continue](/pages/limit5)
# --partialborder
# ::::

# :::: note1 
# --partialborder
You can drag the blue slider to get close to $x=1$, but you can get super close and still not reach it by using the [closer](:=reduce=true) button multiple times.
# --partialborder
# ::::
### More Limits

#### --outlinebox outer1

#### --outlinebox left1


#### --outlinebox


#### --outlinebox right1
Take a look at the following function.  Nothing is happening at $x=2$.
$$ 
f(x) = \begin{cases} 
      	-x^2 & x < 0 \newline
      	x^2 + 1 & x >= 0 
   \end{cases}
$$
1. Go [closer](:=reduce=true) to $x=0$.  
2. Go [all the way](:=all=true) to $x=0$.
[NOTE:](::note1/tooltip,transparent)

The limit as $x$ gets close to $0$ from the right is [](:?s1). 
The limit as $x$ gets close to $0$ from the left is [](:?s2). 
The value at $x=0$ is [](:?s3)

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
let xhigh = 2;
let ylow = -4;
let yhigh = 4;

let th = new BlueTheme();

JXG.Options.layer['functiongraph'] = 5;
let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow], {xlabel:'', ylabel:''});
let F = new ProblemFunction(
	function(x) { 
		if (x >= 0) {
			return x*x + 1;
		}
		return - x * x; }, 
	'', 3.5, [xlow,xhigh], [0]);
let F_id = workspace.addFunction(F);

let limit = new ApproachLimit(workspace.board, F.f, 0, 1);
limit.glider.moveTo([1,0]);


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
smartdown.setVariable('s2','');
smartdown.setVariable('s3','');
this.dependOn = ['s1', 's2', 's3'];  
this.depend = function() {
    removeEnterFromSmartdownString('s1', env.s1);
    removeEnterFromSmartdownString('s2', env.s2);  
    removeEnterFromSmartdownString('s3', env.s3);  
	if (env.s1 == '1' && env.s2 == '0' && env.s3 == '1') {
		smartdown.showDisclosure('success','','center,transparent,draggable,closeable,outline,shadow');
	}

};
```

