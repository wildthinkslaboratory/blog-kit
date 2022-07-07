# :::: intro
# --outlinebox int
#### Penrose Tiling
This is my first attempt at a Penrose Tiling generator.  I'm using the [Robinson triangle decomposition](https://en.wikipedia.org/wiki/Penrose_tiling#Robinson_triangle_decompositions) that is nicely described in a [Preshing on Programming](https://preshing.com/20110831/penrose-tiling-explained/) blog post.  There's lots of fiddling you can do to get different effects.  It's mostly different ways of applying color to a tiling.  Play around and see what happens.
# --outlinebox
# ::::

# :::: panel
# --outlinebox panelbox
divisions [](:-subs/0/8/1) [](:!subs) decomp[](:Xdecomp) B1[](:XB1) B2[](:XB2)
triangle sort: [](:-sort/0/3/1) [](:!sortString) [redraw triangles](:=redraw=true)  
----
low [](:-low1/8/256/8) high [](:-high1/8/256/8) scale [](:-scale1/1/40/1)
low [](:-low2/8/256/8) high [](:-high2/8/256/8) scale [](:-scale2/1/20/1) [redraw colors](:=newColors=true)
----
[open image in new tab](:=download=true) 
# --outlinebox 
# ::::


```javascript /autoplay/kiosk
//smartdown.import=/assets/libs/colorscheme.js

// this code is based on blog post https://preshing.com/20110831/penrose-tiling-explained/

// Triangles have three (x,y) points and a flag.  They are always isosceles, and are either
// 36,72,72 degree triangles or 108,36,36
class Triangle {
  constructor(points, flag) {
    this.points = points;
    this.flag = flag; // 0 is it's a 36,72,72 degree triangle and 1 if it's 108,36,36 degree
    this.color = '';
    this.visited = false;
  }
};

// general function for shallow copying of object. Keeps the associated methods.
function copyInstance (original) {
  let copied = Object.assign(
    Object.create(
      Object.getPrototypeOf(original)
    ),
    original
  );
  return copied;
}

let decomposition = false;
let b1 = false;
let b2 = false;
let b3 = false;

let goldenRatio = (1 + Math.sqrt(5)) / 2

// take a triangle and subdivide it into more triangles
function subdivide(t) {
  let result = [];

  // a 36,72,72 is subdivided into one 36,72,72 and one 108,36,36
  if (t.flag == 0) {   
    let A = t.points[0];     
    let B = t.points[1];
    let C = t.points[2];

    if (b1 == true) {
      const temp = B;
      B = C;
      C = temp;
    }

    let X = A[0] + (B[0] - A[0]) / goldenRatio;
    let Y = A[1] + (B[1] - A[1]) / goldenRatio;;
    result.push(new Triangle([[X,Y], C, A], 1));
    result.push(new Triangle([C, [X,Y], B], 0));
  }

  // a 108,36,36 is subdivided into one 36,72,72 and two 108,36,36
  else {
    let A = t.points[0];     
    let B = t.points[1];
    let C = t.points[2];

    if (b2 == true) {
      const temp = B;
      B = C;
      C = temp;
    }

    let X1 = B[0] + (A[0] - B[0]) / goldenRatio;
    let Y1 = B[1] + (A[1] - B[1]) / goldenRatio;
    let X2 = B[0] + (C[0] - B[0]) / goldenRatio;
    let Y2 = B[1] + (C[1] - B[1]) / goldenRatio;
    result.push(new Triangle([[X2,Y2], C, A], 1));
    result.push(new Triangle([[X1,Y1], [X2,Y2], B], 1));
    result.push(new Triangle([[X2,Y2], [X1,Y1], A], 0));
  }
  return result;
}

// take a triangle and subdivide it into more triangles
function subdivide2(t) {
  let result = [];

  // a 36,72,72 is subdivided into one 36,72,72 and one 108,36,36
  if (t.flag == 0) {   
    let A = t.points[0];     
    let B = t.points[1];
    let C = t.points[2];

    if (b1 == true) {
      const temp = B;
      B = C;
      C = temp;
    }

    let X = A[0] + (B[0] - A[0]) / goldenRatio;
    let Y = A[1] + (B[1] - A[1]) / goldenRatio;
    let X2 = A[0] + (C[0] - A[0])*(goldenRatio-1)/goldenRatio;
    let Y2 = A[1] + (C[1] - A[1])*(goldenRatio-1)/goldenRatio;



    result.push(new Triangle([[X2,Y2], A, [X,Y]], 1));
    result.push(new Triangle([C, [X,Y], [X2,Y2]], 0));
    result.push(new Triangle([C, [X,Y], B], 0));
  }

  // a 108,36,36 is subdivided into one 36,72,72 and two 108,36,36
  else {
    let A = t.points[0];     
    let B = t.points[1];
    let C = t.points[2];

    if (b2 == true) {
      const temp = B;
      B = C;
      C = temp;
    }

    // let X1 = B[0] + (A[0] - B[0]) / goldenRatio;
    // let Y1 = B[1] + (A[1] - B[1]) / goldenRatio;
    let X2 = B[0] + (C[0] - B[0])/goldenRatio;
    let Y2 = B[1] + (C[1] - B[1])/goldenRatio;
    result.push(new Triangle([[X2,Y2], C, A], 1));

    // result.push(new Triangle([[X1,Y1], [X2,Y2], B], 1));
    // result.push(new Triangle([[X2,Y2], [X1,Y1], A], 0));
    result.push(new Triangle([B, A, [X2,Y2]], 0));
  }
  return result;
}

// We start out with 10 large 36,72,72 triangles 
function startingTriangles(Xcenter, Ycenter) {
  let size = 1000;
  let step  = 2 * Math.PI / 10; 
  let shift = (Math.PI / 180.0) * -18;//Quick fix ;)

  for (let i = 0; i < 10;i++) {    
    let first = (i + (i+1)%2) * step + shift;
    let last = (i + i%2) * step + shift;

    if (b3 == true) {
      first = (i + 1) * step + shift;
      last = i * step + shift;
    }

    triangles.push(new Triangle([
      [Xcenter,Ycenter],
      [Xcenter + size * Math.cos(first), Ycenter + size * Math.sin(first)],
      [Xcenter + size * Math.cos(last), Ycenter + size * Math.sin(last)]],
      0));
  } 
}

// recursively subdivide the triangles
function subdivideTriangles() {
  let newTriangles = [];
  for (let i=0; i < triangles.length; i++) {
    if (decomposition == false) {
      newTriangles.push(...subdivide(triangles[i]));
    }
    else {
      newTriangles.push(...subdivide2(triangles[i]));
    }

  }
  triangles = newTriangles;
}

let triangles = [];



//////////////////////////////////////////////////////////////////////////////////////////////////

// set up the div and the page

smartdown.showDisclosure('panel','','transparent,bottomright,draggable,shadow');
smartdown.showDisclosure('intro','','transparent,topleft,closeable,draggable,shadow,outline');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<canvas id="appCanvas"></canvas>`

let canvas = document.getElementById("appCanvas"); 
let context = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
let Xcenter = canvas.width/2;
let Ycenter = canvas.height/2;


//////////////////////////////////////////////////////////////////////////////////////////////////

// This section sets up colors and drawing functions

// We have two different color schemes.  One for 36,72,72 triangles and one for 108,36,36
// triangles
let cs0;
let cs1;

// this colors are iterate through a smooth range of colors
// this returns the next available color for each scheme
function getColor(tri) {
  if (tri.color !== '') {
    return tri.color;
  }
  if (tri.flag == 0) {
    cs0.inc();
    return cs0.getColor();
  }
  cs1.inc();
  return cs1.getColor();
}


function drawTriangle(tri) {
  context.fillStyle = getColor(tri);
  context.beginPath();
  context.moveTo(...tri.points[0]);
  context.lineTo(...tri.points[1]);
  context.lineTo(...tri.points[2]);
  context.fill();
}

function drawTriangles() {
  // set counters back to zero
  cs0.reset();
  cs1.reset();

  for (let i=0; i < triangles.length; i++) {
    drawTriangle(triangles[i]);
  }
}

function randomColor() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);

  return 'rgb(' + r + ',' + g + ',' + b + ')'; 
}

let palette1 = [];
let palette0 = [];

function generatePalette(cs) {
  let palette = [];
  for (let i=0; i < cs.numberColors(); i++) {
    palette.push(cs.getColor());
    cs.bigInc();
  }
  return palette;

}


//////////////////////////////////////////////////////////////////////////////////////////////////

// since the smooth color scheme is applied linearly to the triangles, we can sort the triangles
// in different ways to get different effects.  So here we have a variety of sorting criteria

let sortStrings = ['none', 'radial', 'vertical', 'graph'];

// compare the triangle X values.  This gives a vertical gradient
function compareXValues(t1, t2) {
  if (t1.points[0][0] < t2.points[0][0]) return 1;
  if (t1.points[0][0] > t2.points[0][0]) return -1;

  return 0;
}

// this sorts on distance from the center of screen creating a radial gradient
function compareRadial(t1, t2) {
  let x1 = t1.points[0][0] - Xcenter;
  let y1 = t1.points[0][1] - Ycenter;
  let x2 = t2.points[0][0] - Xcenter;
  let y2 = t2.points[0][1] - Ycenter;

  if ((x1*x1 + y1*y1) > (x2*x2 + y2*y2)) return 1;
  if ((x1*x1 + y1*y1) < (x2*x2 + y2*y2)) return -1;

  return 0;
}

function pfloor(p) {
  return [Math.floor(p[0]), Math.floor(p[1])];
}

function samepoint(p1, p2) {
  return Math.floor(p1[0]) == Math.floor(p2[0]) && Math.floor(p1[1]) == Math.floor(p2[1]);
}

// two triangles are connected if they share two vertices and have the same flag
function connected(t1, t2) { 

  if (t1.flag !== t2.flag) {
    return false;
  }
  // there's six possible combinations to check
  let matches = 0;
  matches += samepoint(t1.points[0], t2.points[0]);
  matches += samepoint(t1.points[0], t2.points[1]);
  matches += samepoint(t1.points[0], t2.points[2]);

  matches += samepoint(t1.points[1], t2.points[0]);
  matches += samepoint(t1.points[1], t2.points[1]);
  matches += samepoint(t1.points[1], t2.points[2]);

  matches += samepoint(t1.points[2], t2.points[0]);
  matches += samepoint(t1.points[2], t2.points[1]);
  matches += samepoint(t1.points[2], t2.points[2]);

  return matches == 2;
}


let sortFunction = {
  0 : function() { },
  1 : function() { triangles.sort(compareRadial); },
  2 : function() { triangles.sort(compareXValues); },
  3 : function() { 
    indexTriangles(); 
    findComponents();
    colorComponents();
  }
}

let index = {};

function indexTriangles() {
  index = {};
  for (let i=0; i < triangles.length; i++) {
    for (let j=0; j < triangles[i].points.length; j++) {

      let point = pfloor(triangles[i].points[j]);
      //let point = triangles[i].points[j];

      if (point in index) {
        index[point].push(i);
      }
      else {
        index[point] = [i];
      }
    }
  }
}

function getNeighbors(tri) {

  let n = [];
  let c = [].concat(index[pfloor(tri.points[0])], index[pfloor(tri.points[1])], index[pfloor(tri.points[2])]);
  c = [...new Set(c)];  // remove duplicates

  for (let i=0; i < c.length; i++) {
    if (triangles[c[i]].flag == tri.flag) {
      if (connected(triangles[c[i]], tri) && !triangles[c[i]].visited) {
        n.push(c[i]);
      }
    }
  }

  return n;
}


let components = [];

function findComponents() {
  let ti = [...Array(triangles.length).keys()];
  components = [];

  while (ti.length > 0) {    // start exploring a component
    while (ti.length > 0 && triangles[ti[ti.length - 1]].visited == true) { ti.pop(); }  // pop any visited tris
    if (ti.length == 0) { break; }

    let open = [ti.pop()];
    let closed = [];

    while (open.length > 0) {
      let t = open.pop();
      closed.push(t);
      triangles[t].visited = true;
      open.push(...getNeighbors(triangles[t]));
    }
    components.push(closed);
  }
}


function colorComponents() {

  let colors = {};

  for (let i=0; i < components.length; i++) {
    let flag = triangles[components[i][0]].flag;

    if (!(components[i].length in colors)) {
      let color = palette1[Math.floor(Math.random() * palette1.length)];
      if (flag == 0) {
        color = palette0[Math.floor(Math.random() * palette0.length)];
      }
      colors[components[i].length] = color;
    }

    let color = colors[components[i].length];
    for (let j=0; j < components[i].length; j++) {
      triangles[components[i][j]].color = color; 
    }
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////


function buildTriangleArray(subs) {
  triangles = [];
  components = [];
  startingTriangles(Xcenter,Ycenter);   // create the starting triangles
  for (i=0; i < subs; i++) {               // recursively subdivide into more triangles
    subdivideTriangles();
  }
  if (oldSort != 0) {
    sortFunction[oldSort]();        // sort the triangles for application of color
  }

}


//////////////////////////////////////////////////////////////////////////////////////////////////

// Event handling

window.addEventListener('resize', function(event){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  Xcenter = canvas.width/2;
  Ycenter = canvas.height/2;

  drawTriangles();
});



smartdown.setVariable('download', false);
smartdown.setVariable('redraw', false);
smartdown.setVariable('newColors', false);
smartdown.setVariable('decomp', false);
smartdown.setVariable('B1', false);
smartdown.setVariable('B2', false);
smartdown.setVariable('B3', false);
smartdown.setVariable('sort', '1');
smartdown.setVariable('sortString', sortStrings[env.sort]);
smartdown.setVariable('low1', 0);
smartdown.setVariable('low2', 0);
smartdown.setVariable('high1', 256);
smartdown.setVariable('high2', 256);
smartdown.setVariable('scale1', 40);
smartdown.setVariable('scale2', 40);
smartdown.setVariable('subs', 8);

let oldSubs = 8;
let oldSort = 1;

// We have two different color schemes.  One for 36,72,72 triangles and one for 108,36,36
// triangles
cs1 = new SmoothColorScheme(env.low1,env.high1,env.scale1);
cs0 = new SmoothColorScheme(env.low2,env.high2,env.scale2);

palette1 = generatePalette(cs1);
cs1.reset();
palette0 = generatePalette(cs0);
cs0.reset();

buildTriangleArray(oldSubs);
drawTriangles();                      // draw the triangles


this.dependOn = ['download', 'redraw', 'newColors', 'sort'];
this.depend = function() {

  if (env.download == true) {
    smartdown.setVariable('download', false);

    const imgData = canvas.toDataURL("image/jpg");
    let iframe = "<iframe width='100%' height='100%' src='" + imgData + "'></iframe>"
    let x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();

  }
  else {
    smartdown.setVariable('imageForDownload', '');

    if (env.sort != oldSort) {
      oldSort = env.sort;
      smartdown.setVariable('sortString', sortStrings[env.sort]);
    }

    if (env.redraw == true) {
      smartdown.setVariable('redraw', false);

      decomposition = env.decomp;
      b1 = env.B1;
      b2 = env.B2;
      b3 = env.B3;
      oldSubs = env.subs;

      buildTriangleArray(oldSubs);
      drawTriangles();
      
    }

    if (env.newColors == true) {
      smartdown.setVariable('newColors', false);
      if (env.low1 >= env.high1) {
        smartdown.setVariable('high1', env.low1 + 8);
      }
      if (env.low2 >= env.high2) {
        smartdown.setVariable('high2', env.low2 + 8);
      }
      cs1 = new SmoothColorScheme(env.low1,env.high1,env.scale1);
      cs0 = new SmoothColorScheme(env.low2,env.high2,env.scale2);
      palette1 = generatePalette(cs1);
      cs1.reset();
      palette0 = generatePalette(cs0);
      cs0.reset();

      if (env.sort == 3) {
        colorComponents();
      }
      drawTriangles();
    }


  }


}

```
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
