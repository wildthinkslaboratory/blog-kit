(function() {

// Get the canvas and context
let headerDiv = document.getElementById("header-wrapper"); 
let appDiv = document.getElementById("header-app");
let canvas = document.createElement('canvas');
canvas.id = 'header-canvas';
appDiv.appendChild(canvas);

let context = canvas.getContext("2d");

canvas.width  = headerDiv.offsetWidth;
canvas.height = headerDiv.offsetHeight;
// our favorite julia seeds
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
[ -0.23697, 0.74191],
[ 0.10697,0.60107],
[-0.07804, 0.87842],
[-0.043586, -0.660170],
[-0.758152,  0.078872],
[-0.601741,  0.539047],
[-0.193855, -0.682188],
[-0.4, 0.6],
[ 0.285,0.01],
[-0.741196, -0.219623],
[ 0.301018,  0.544373],
[-0.018460, -0.855408],
[-0.912870, -0.292224],
[ 0.403483,  0.245145],
[-0.223401,  0.663145],    
[-0.354799,  0.649040],
[-0.562154, -0.490506],
[ 0.279178,  0.485608],
[-0.108845, -0.839491],
[ 0.248667,  0.550450],
[ 0.372236,  0.281562],
[-0.215368, -0.645294],
[-0.457105, -0.591589],
[ 0.032369, -0.678670],
[ 0.080918,  0.647938],
[-0.528820, -0.592274],
[-0.626447, -0.432047],
[-0.580706,  0.503872],
[-0.770593,  0.016029],
[-0.493384, -0.546958],
[-0.540198, -0.527884],
[-0.326370, -0.655075],
[-0.76643,   0.22774],
[-0.15789,  -0.83622],
[-0.70183,  -0.25442],
[0.37518,   0.18675],
[-0.64606, -0.38310],
[-0.81586, 0.27934],
[-0.54393, -0.54383],
[-0.11345, 0.66000],
[-0.10884, -0.838],
[-0.55, -0.4785],
[-0.025, -0.8],
[-0.75, 0.016029],
[-0.626447,-0.407],
[-0.10884, -0.837],
[-0.108,-0.837],
[-0.455, 0.595],
[-0.2, -0.685],
[-0.76643, 0.1]
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

// parameters for a fractal 
let zoom = 500;
let useRandomSeed = false;
let seedA = 0;
let seedB = 0;
let panx = 0;
let pany = 0;


// all the random elements in a function so we can reseed when
// we randomRedraw
function randomFractal() {
  panx = 0;
  pany = 0;
  if (useRandomSeed) {                 // use a random seed
    seedA = (Math.random() * 2 - 1).toFixed(5);
    seedB = (Math.random() * 2 - 1).toFixed(5);
  }
  else {                               // use a seed from our list
    let k = juliaSeeds[Math.floor(Math.random() * juliaSeeds.length)];
    seedA = k[0];
    seedB = k[1];
  }

  zoom = 400 + Math.floor(Math.random() * 1000);
  generateColorSeed();
  generatePalette();
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


window.addEventListener('resize', function(event){
  canvas.width  = headerDiv.offsetWidth;
  canvas.height = headerDiv.offsetHeight;
  draw();
});

// pick a random julia seed from a list of good seeds
// then pick a random zoom level
randomFractal();
draw();



})();
