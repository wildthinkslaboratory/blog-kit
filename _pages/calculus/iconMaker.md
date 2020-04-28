---
title: Blank Workspace Template 
header: 'none'
smartdown: true
---


```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:500px; width:500px'>`;

let xlow = -2;
let xhigh = 4;
let ylow = -4;
let yhigh = 20;

JXG.Options.text.display = 'internal';
let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow],{xlabel:'', ylabel:''});
let F = new ProblemFunction(function(x) {  return Math.exp(x); }, 
  '', 3.5, [-2,3], []);
let F_id = workspace.addFunction(F);

workspace.functions[F_id].graph.setAttribute({strokeWidth:3});

// let xint = new XInterval(workspace.board, 1,8);
// xint.x1.setAttribute({size:6});
// xint.x2.setAttribute({size:6});

// let slider = new IntSlider(xint.board, [xint.attachRightX, xint.attachY], [1, 100], 'N');
// slider.setValue(12);
// let SR = new SecantRectArray(xint, F.f, slider, { attachButtonVisible:false});
// workspace.addElement(SR);


// SR.rectangle.f1.setAttribute({color:'#4488DD', size:12});
// SR.rectangle.f2.setAttribute({color:'#4488DD', size:12});
// SR.secant.segment.setAttribute({strokeColor:'#4488DD', strokeWidth:12});
// SR.secant.f1.setAttribute({color:'#4488DD', size:12});
// SR.secant.f2.setAttribute({color:'#4488DD', size:12});


// let SR = new SecantRectangle(xint, F.f, { attachButtonVisible:false});
// workspace.addElement(SR);
// SR.rectangle.f1.setAttribute({color:'#4488DD', size:12});
// SR.rectangle.f2.setAttribute({color:'#4488DD', size:12});
// SR.secant.segment.setAttribute({strokeColor:'#4488DD', strokeWidth:12});
// SR.secant.f1.setAttribute({color:'#4488DD', size:12});
// SR.secant.f2.setAttribute({color:'#4488DD', size:12});

// let rectangle = new Rectangle(xint, F.f, { });
// workspace.addElement(rectangle);
// rectangle.rect.setAttribute({ borders: { strokeColor: '#FF0000'} });
// rectangle.f1.setAttribute({color:'#4488DD', size:12});
// rectangle.f2.setAttribute({color:'#4488DD', size:12});


// let secant = new Secant(xint, F.f, { });
// workspace.addElement(secant);
// secant.segment.setAttribute({strokeColor:'#4488DD', strokeWidth:12});
// secant.f1.setAttribute({color:'#4488DD', size:12});
// secant.f2.setAttribute({color:'#4488DD', size:12});



workspace.board.renderer.type = 'svg';
console.log(workspace.board.renderer.type);
let svg = new XMLSerializer().serializeToString(workspace.board.renderer.svgRoot);
console.log(svg);


/////////////////////////////////////////////////////////////////////////////////////////

// Event handling






```

