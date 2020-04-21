let headerDiv = document.getElementById("header-wrapper"); 
let appDiv = document.getElementById("header-app");

appDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;


let n = 50;

let xlow = -3;
let xhigh = 3;
let ylow = 0;
let yhigh = 5;

JXG.Options.axis.ticks.majorHeight = 20;
let board = JXG.JSXGraph.initBoard('box', {
	boundingbox:[xlow,yhigh,xhigh,ylow],
	axis:true,
	showCopyright:false
});

// some colors for random selection
let colors = ['#00FF77', '#FF7700', '#7700FF', '#FFFF00', '#2222FF', '#FF2222'];

// some random points
let p = [];
p.push(board.create('point',[-2.7,(Math.random()-0.1)*yhigh]));
p.push(board.create('point',[-1.4,(Math.random()-0.1)*yhigh/3]));
p.push(board.create('point',[0,(Math.random()-0.1)*yhigh/4]));
p.push(board.create('point',[1.4,(Math.random()-0.1)*yhigh/3]));
p.push(board.create('point',[2.7,(Math.random()-0.1)*yhigh]));

// we make a polynomial from the random points
let f = JXG.Math.Numerics.lagrangePolynomial(p);

let nfun = function() { return n; }
let lo = board.create('riemannsum',[f,nfun, 'lower',-3,3],
	{strokeColor: 'blue', fillColor:colors[Math.floor(Math.random()*colors.length)], fillOpacity:0.5});

let areaText = board.create('text',[1,-2, function(){ return 'Area of rectangles =' + lo.Value().toFixed(2); }], {fontSize:20});


this.sizeChanged = function() {
  board.resizeContainer(headerDiv.offsetWidth,  headerDiv.offsetHeight);  
};

this.sizeChanged();
