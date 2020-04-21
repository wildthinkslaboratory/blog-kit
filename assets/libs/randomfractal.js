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

let juliaSeeds = [ [-0.391,-0.587], [-0.4,-0.59], [-0.54, 0.54], [0.355, 0.355], [0.37, 0.1], [0, 0.8], 
[0.34, -0.05], [-0.54, 0.54], [0.355, 0.355], [0.37, 0.1],
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

// The maximum number of iterations per pixel
let maxiterations = 512;

let base = [0, 0, 0];


let color_incs = [
[0,0,0,0],
[0,0,0,0],
[0,0,0,0]
];

function generatePaletteSeed() {
  // generate random starting color
  base[0] = Math.floor(Math.random() * 3) * 128;
  base[1] = Math.floor(Math.random() * 3) * 128;
  base[2] = Math.floor(Math.random() * 3) * 128;

  for (let i=0; i < 3; i++) {
    let inc = base[i] / 128;
    for (let j=0; j < 4; j++) {
      let up = Math.floor(Math.random() * 2);
      if ((inc == 0 || up) && inc != 2) {
        color_incs[i][j] = Math.floor(Math.random() * (3 - inc));
      } 
      else {
        color_incs[i][j] = -Math.floor(Math.random() * (inc + 1));
      }
      inc += color_incs[i][j];
    }
  }
}

generatePaletteSeed();

// Palette array 
let palette = [];
let paletteSize = maxiterations;

function generatePaletteRainbow() {
    // Calculate a gradient
    let ri = base[0];
    let gi = base[1];
    let bi = base[2];
    for (let i=0; i < paletteSize; i++) {
        palette[i] = { r:ri, g:gi, b:bi };

        if (i < 128) {
          ri += color_incs[0][0];
          gi += color_incs[1][0];
          bi += color_incs[2][0];
        } else if (i < 256) {
          ri += color_incs[0][1];
          gi += color_incs[1][1];
          bi += color_incs[2][1];
        } else if ( i < 384) {
          ri += color_incs[0][2];
          gi += color_incs[1][2];
          bi += color_incs[2][2];
        } else {
          ri += color_incs[0][3];
          gi += color_incs[1][3];
          bi += color_incs[2][3];
        }
    }
}

generatePaletteRainbow();

// let seedA = Math.random() * 2 - 1;
// let seedB = Math.random() * 2 - 1;
// let seedA = -0.7581522813239732; 
// let seedB =  0.07887261017004787;
let [seedA, seedB] = juliaSeeds[Math.floor(Math.random() * juliaSeeds.length)];


let zoom = 400 + Math.floor(Math.random() * 1000);

// Generate the fractal image
function generateImage() {

    // Pan and zoom parameters
  let offsetx = -canvas.width/2;
  let offsety = -canvas.height/2;
  let panx = -100;
  let pany = 0;
 

  // Image Data (RGBA)
  let imagedata = context.createImageData(canvas.width, canvas.height);
  // Iterate over the pixels
  for (let y=0; y<canvas.height; y++) {
      for (let x=0; x<canvas.width; x++) {
          julia(x, y, maxiterations, imagedata, offsetx, offsety, panx, pany, zoom, seedA, seedB);
          //iterate(x, y, maxiterations, imagedata, offsetx, offsety, panx, pany, zoom);

      }
  }
  context.putImageData(imagedata,0,0);
}



// Calculate the color of a specific pixel
function julia(x, y, maxiterations, imagedata, offsetx, offsety, panx, pany, zoom, seedA, seedB) {


  // Convert the screen coordinate to a fractal coordinate
  let x0 = (x + offsetx + panx) / zoom;
  let y0 = (y + offsety + pany) / zoom;

  // Iteration letiables
  let a = x0; // imaginary number a + bi
  let b = y0;
  let a_temp = 0;
  let b_temp = 0;

  // Iterate
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
      let index = Math.floor((it / (maxiterations-1)) * 255);
      color = palette[index];
  }

  // Apply the color
  let pixelindex = (y * canvas.width + x) * 4;
  imagedata.data[pixelindex] = color.r;
  imagedata.data[pixelindex+1] = color.g;
  imagedata.data[pixelindex+2] = color.b;
  imagedata.data[pixelindex+3] = 255;
}


function draw() {
  generateImage();
}

draw();
// console.log('zoom', zoom);
// console.log('base', base);
// console.log('color scheme', color_incs);

window.addEventListener('resize', function(event){
  canvas.width  = headerDiv.offsetWidth;
  canvas.height = headerDiv.offsetHeight;
  draw();
});


})();
