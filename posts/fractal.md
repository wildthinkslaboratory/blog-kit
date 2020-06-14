I've been really busy moving in to my new web page so not a lot of time for blogging.  Feel free to have a look around but it's mostly under construction right now.  A lot of the work is really tedious so I allowed myself a small fun project.  I've been thinking about fractals lately.  My thinking is strongly influenced by theoretical computer science and one of its most fundamental ideas is that immensely complex patterns arise from very simple generators or algorithms.  So I was thinking that fractals are a good metaphor for my website.  Also, [Mathigon](https://mathigon.org) just came out with a great new lesson on [fractals](https://mathigon.org/course/fractals/introduction) which I really enjoyed.    So I whomped together a little julia set app for fun.  It's like Bertie Bott's Every Flavour Beans.  You never know what your going to get.  Some times you just get a fart fractal.  Still, I can't stop clicking the **Again** button.

[Again](:=redraw=true) [new colors](:=color=true) [zoom in](:=zoomin=true) [zoom out](:=zoomout=true) [up](:=up=true) [down](:=down=true) [left](:=left=true) [right](:=right=true) [download pdf](:=download=true)
```javascript /playable/autoplay
//smartdown.import=//cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js



const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<canvas id="appCanvas"></canvas>`

let canvas = document.getElementById("appCanvas"); 
let context = canvas.getContext("2d");

canvas.width  = myDiv.offsetWidth;
canvas.height = window.innerHeight * 0.7;

let juliaSeeds = [ 
[-0.391,-0.587], 
[-0.4,-0.59], 
[-0.54, 0.54], 
[0.355, 0.355], 
[0.37, 0.1], 
[0, 0.8], 
[0.34, -0.05], 
[-0.54, 0.54], 
[0.355, 0.355], 
[0.37, 0.1],
[ -0.23697092928656072, 0.7419121059594294],
[0.10697324928270424,0.6010709065175586],
[-0.07804297167573648, 0.878422153994636],
[-0.04358606323629921, -0.6601708270598163],
[-0.7581522813239732, 0.07887261017004787],
[-0.6017411670967265, 0.5390473287347921],
[-0.19385539090162895, -0.6821881025217271],
[-0.7581636113124433, 0.17868928056086064],
[-0.4, 0.6],
[0.285,0.01]
];

let w = 64;
let maxW = 256/w;

// The maximum number of iterations per pixel
let maxiterations = w * 6;

// first we need to generate a random color scheme
let base = [0, 0, 0];  // a starting color rgb
let color_incs = [     // for each color in rgb
[0,0,0,0,0,0],             //    we have four increments which can be increasing
[0,0,0,0,0,0],             //    or decreasing
[0,0,0,0,0,0]
];


function generateColorSeed() {
  // generate random starting color
  base[0] = Math.floor(Math.random() * (maxW + 1)) * w;
  base[1] = Math.floor(Math.random() * (maxW + 1)) * w;
  base[2] = Math.floor(Math.random() * (maxW + 1)) * w;

  // randomly generate the increments
  for (let i=0; i < 3; i++) {
    let inc = base[i] / w;
    for (let j=0; j < 6; j++) {
      let up = Math.floor(Math.random() * 2);
      if ((inc == 0 || up) && inc != w) {
        color_incs[i][j] = Math.floor(Math.random() * ((maxW + 1) - inc));
      } 
      else {
        color_incs[i][j] = -Math.floor(Math.random() * (inc + 1));
      }
      inc += color_incs[i][j];
    }
  }
}


// Now we use the seed to generate the palette
// palette is just a list of rgb colors
// we need a color for every possible iteration
let palette = [];
let paletteSize = maxiterations;

function generatePalette() {
    // Calculate a gradient
    let ri = base[0];
    let gi = base[1];
    let bi = base[2];
    for (let i=0; i < paletteSize; i++) {
        palette[i] = { r:ri, g:gi, b:bi };

        if (i < 32) {
          ri += color_incs[0][0];
          gi += color_incs[1][0];
          bi += color_incs[2][0];
        } else if (i < 64) {
          ri += color_incs[0][1];
          gi += color_incs[1][1];
          bi += color_incs[2][1];
        } else if ( i < 96) {
          ri += color_incs[0][2];
          gi += color_incs[1][2];
          bi += color_incs[2][2];
        } else if ( i < 128) {
          ri += color_incs[0][3];
          gi += color_incs[1][3];
          bi += color_incs[2][3];
        } else if (i < 160) {
          ri += color_incs[0][4];
          gi += color_incs[1][4];
          bi += color_incs[2][4];
        } else {
          ri += color_incs[0][5];
          gi += color_incs[1][5];
          bi += color_incs[2][5];
        }
    }
}

let zoom = 500;

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
      color = {r:base[0],g:base[1],b:base[2]};
  } else {
      let index = Math.floor((it / (maxiterations)) * (maxiterations-1));
      color = palette[index];
  }

  // Apply the color

  let pixelindex = (y * canvas.width + x) * 4;
  imagedata.data[pixelindex] = color.r;
  imagedata.data[pixelindex+1] = color.g;
  imagedata.data[pixelindex+2] = color.b;
  imagedata.data[pixelindex+3] = 255;
}

let panx = 0;
let pany = 0;
 
// Generate the fractal image
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


// all the random elements in a function so we can reseed when
// we redraw
function randomFractal() {
  panx = 0;
  pany = 0;
  [seedA, seedB] = juliaSeeds[Math.floor(Math.random() * juliaSeeds.length)];
  zoom = 400 + Math.floor(Math.random() * 1000);
  generateColorSeed();
  generatePalette();
}

function newColors() {
  generateColorSeed();
  generatePalette();
}

window.addEventListener('resize', function(event){
  canvas.width  = myDiv.offsetWidth;
  canvas.height = window.innerHeight * 0.7;
  draw();
});

smartdown.setVariable('redraw', false);
smartdown.setVariable('color', false);
smartdown.setVariable('zoomin', false);
smartdown.setVariable('zoomout', false);
smartdown.setVariable('up', false);
smartdown.setVariable('down', false);
smartdown.setVariable('left', false);
smartdown.setVariable('right', false);
smartdown.setVariable('download', false);

this.dependOn = ['redraw','color','zoomin', 'zoomout','up','down','left','right','download'];
this.depend = function() {
	if (env.redraw == true) {
		smartdown.setVariable('redraw', false);
		randomFractal();
		draw();
	}
  if (env.color == true) {
    smartdown.setVariable('color', false);
    newColors();
    draw();
  }
  if (env.zoomin == true) {
    smartdown.setVariable('zoomin', false);
    zoom += 50;
    draw();
  }
  if (env.zoomout == true) {
    smartdown.setVariable('zoomout', false);
    zoom -= 50;
    draw();
  }
  if (env.up == true) {
    smartdown.setVariable('up', false);
    pany -= 50;
    draw();
  }
  if (env.down == true) {
    smartdown.setVariable('down', false);
    pany += 50;
    draw();
  }
  if (env.left == true) {
    smartdown.setVariable('left', false);
    panx -= 50;
    draw();
  }
  if (env.right == true) {
    smartdown.setVariable('right', false);
    panx += 50;
    draw();
  }
  if (env.download == true) {
    smartdown.setVariable('download', false);
    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF();

    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save("download.pdf");
  }

}



// pick a random julia seed from a list of good seeds
// then pick a random zoom level
randomFractal();
draw();

```