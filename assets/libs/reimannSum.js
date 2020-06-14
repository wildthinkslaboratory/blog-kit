let headerDiv = document.getElementById("header-wrapper"); 
let appDiv = document.getElementById("header-app");

appDiv.innerHTML = `<div id='box' class='jxgbox' style='height:200px;background:#CCCCCC'>`;


let n = 80;

let xlow = -3;
let xhigh = 3;
let ylow = 0;
let yhigh = 5;

JXG.Options.axis.ticks.majorHeight = 20;
let board = JXG.JSXGraph.initBoard('box', {
	boundingbox:[xlow,yhigh,xhigh,ylow],
	axis:true,
	showCopyright:false,
	showNavigation:false,
});

// some colors for random selection
let colors = ['#00FFFF', '#FF5500', '#0044FF', '#00FF00', '#FF00FF'];

// some random points
let p = [];
p.push(board.create('point',[-2.7,(Math.random()-0.05)*yhigh]));
p.push(board.create('point',[-1.4,(Math.random()-0.1)*yhigh/3]));
p.push(board.create('point',[0,(Math.random()-0.2)*yhigh/4]));
p.push(board.create('point',[1.4,(Math.random()-0.1)*yhigh/3]));
p.push(board.create('point',[2.7,(Math.random()-0.05)*yhigh]));

// we make a polynomial from the random points
let f = JXG.Math.Numerics.lagrangePolynomial(p);

let nfun = function() { return n; }
let lo = board.create('riemannsum',[f,nfun, 'lower',-3,3],
	{strokeColor: '#555555', fillColor:colors[Math.floor(Math.random()*colors.length)], fillOpacity:0.5});

let areaText = board.create('text',[1,-2, function(){ return 'Area of rectangles =' + lo.Value().toFixed(2); }], {fontSize:20});

window.addEventListener('resize', function(event){
  board.resizeContainer(headerDiv.offsetWidth,  headerDiv.offsetHeight);
});

board.resizeContainer(headerDiv.offsetWidth,  headerDiv.offsetHeight);
