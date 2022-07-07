# :::: intro
# --outlinebox int
### Julia Set Generator
We had a great time learning about fractals at [Mathigon's](https://mathigon.org) new [fractal page](https://mathigon.org/course/fractals/introduction).  It inspired us to make this Julia Set Generator. These fractals are generated from a list of seeds we've been curating, but you can enter your own seed or tweak one of the given seeds. Let us know if you find any great seeds so we can add them to our list. Enjoy!
# --outlinebox
# ::::

# :::: panel
# --aliceblue
[random fractal](:=randomFractal=true) [random seed](:=randomSeed=true) [random colors](:=color=true) [zoom in](:=zoomin=true) [zoom out](:=zoomout=true) [up](:=up=true) [down](:=down=true) [left](:=left=true) [right](:=right=true) 
**seed:** **A** [](:?A)  **B** [](:?B) [draw seed](:=redraw=true)
[open image in new tab](:=download=true) 
# --aliceblue
# ::::

```javascript /autoplay/kiosk
//smartdown.import=//cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js
//smartdown.import=/assets/libs/colorscheme.js


//////////////////////////////////////////////////////////////////////////////////////////////////

// set up the div and the page

smartdown.showDisclosure('panel','','bottomright,draggable,shadow');
smartdown.showDisclosure('intro','','transparent,center,closeable,draggable,shadow,outline');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<canvas id="appCanvas"></canvas>`


let canvas = document.getElementById("appCanvas"); 
let context = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;


let maxiterations = 64 * 6;


//////////////////////////////////////////////////////////////////////////////////////////////////

let scaleFactor = 1;
let cs = new SmoothColorScheme(0,255,scaleFactor);
let palette = [];
let paletteSize = maxiterations;


function generatePalette() {
  palette = [];
  for (let i=0; i < paletteSize; i++) {
    palette.push(new RGBColor(cs.current.r, cs.current.g, cs.current.b));
    cs.inc();
  }
}

function newColors() {
  cs = new SmoothColorScheme(0,255,scaleFactor);
  generatePalette();
}

//////////////////////////////////////////////////////////////////////////////////////////////////

// parameters for a fractal 
let zoom = 500;
let seedA = 0;
let seedB = 0;
let panx = 0;
let pany = 0;


let suspendDepend = false;

// set up to generate a random fractal
function generateFractalSeed() {
  panx = 0;   // center fractal at (0,0)
  pany = 0;
  let k = juliaSeeds[Math.floor(Math.random() * juliaSeeds.length)];
  seedA = k[0];   // random seed
  seedB = k[1];

  suspendDepend = true;
  smartdown.setVariable('A', seedA);  // update the UI with seed
  smartdown.setVariable('B', seedB);
  suspendDepend = false;

  zoom = 1000 + Math.floor(Math.random() * 1000);  // random zoom level
}


// Calculate the color of a specific pixel
function julia(x, y, maxiterations, imagedata, offsetx, offsety, panx, pany, zoom, seedA, seedB) {

  let x0 = (x + offsetx + panx) / zoom;  // Convert the screen coordinate to a fractal coordinate
  let y0 = (y + offsety + pany) / zoom;

  let a = x0; // imaginary number a + bi
  let b = y0;
  let a_temp = 0;
  let b_temp = 0;

  let it = 0;
  while (it < maxiterations && a_temp * a_temp + b_temp * b_temp <= 4) {
      a_temp = a * a - b * b + seedA;
      b_temp = 2 * a * b + seedB;
      a = a_temp;
      b = b_temp;
      it += 1;
  }

  // Get palette color based on the number of iterations
  let color;
  if (it == maxiterations) {
      color = {r:cs.base.r,g:cs.base.g,b:cs.base.b};
  } else {
      let index = Math.floor((it / (maxiterations)) * (maxiterations-1));
      color = {r: palette[index].r, g:palette[index].g, b:palette[index].b};
  }

  // Apply the color
  let pixelindex = (y * canvas.width + x) * 4;
  imagedata.data[pixelindex] = color.r;
  imagedata.data[pixelindex+1] = color.g;
  imagedata.data[pixelindex+2] = color.b;
  imagedata.data[pixelindex+3] = 255;
}



//////////////////////////////////////////////////////////////////////////////////////////////////


function draw() {
  // Pan and zoom parameters
  let offsetx = -canvas.width/2;
  let offsety = -canvas.height/2;

  // Image Data (RGBA)
  let imagedata = context.createImageData(canvas.width, canvas.height);
  // Iterate over the pixels
  for (let y=0; y<canvas.height; y++) {
      for (let x=0; x<canvas.width; x++) {
          julia(x, y, maxiterations, imagedata, offsetx, offsety, panx, pany, zoom, seedA, seedB);
      }
  }
  context.putImageData(imagedata,0,0);
}



//////////////////////////////////////////////////////////////////////////////////////////////////

// Event handling

window.addEventListener('resize', function(event){

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  draw();
});



smartdown.setVariable('randomFractal', false);
smartdown.setVariable('color', false);
smartdown.setVariable('zoomin', false);
smartdown.setVariable('zoomout', false);
smartdown.setVariable('up', false);
smartdown.setVariable('down', false);
smartdown.setVariable('left', false);
smartdown.setVariable('right', false);
smartdown.setVariable('download', false);
smartdown.setVariable('randomSeed', false);
smartdown.setVariable('A', seedA);
smartdown.setVariable('B', seedB);
smartdown.setVariable('redraw', false);

this.dependOn = ['randomFractal','color','zoomin', 'zoomout','up', 'down','left','right','download', 'randomSeed', 'redraw'];
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
    if (env.redraw == true) {
      smartdown.setVariable('redraw', false);
      seedA = parseFloat(env.A);  
      seedB = parseFloat(env.B); 
      draw();
    }


    if (env.randomSeed == true) { 
      console.log('randomSeed 1');
      smartdown.setVariable('randomSeed', false);
      generateFractalSeed();
      draw();
      console.log('randomSeed 2');
    }

    if (env.randomFractal == true) {
      smartdown.setVariable('randomFractal', false);
      generateFractalSeed();
      newColors();
      draw();
    }
    if (env.color == true) {
      smartdown.setVariable('color', false);
      newColors();
      draw();
    }
    if (env.zoomin == true) {
      smartdown.setVariable('zoomin', false);
      zoom += 10000000;
      console.log('zoom', Math.log2(zoom));
      draw();
    }
    if (env.zoomout == true) {
      smartdown.setVariable('zoomout', false);
      zoom -= 1000000;
      draw();
    }
    if (env.up == true) {
      smartdown.setVariable('up', false);
      pany -= 100000;
      draw();
    }
    if (env.down == true) {
      smartdown.setVariable('down', false);
      pany += 100000;
      draw();
    }
    if (env.left == true) {
      smartdown.setVariable('left', false);
      panx -= 100000;
      draw();
    }
    if (env.right == true) {
      smartdown.setVariable('right', false);
      panx += 100000;
      draw();
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

// draw the starting fractal

generateFractalSeed();
newColors();
draw();


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
