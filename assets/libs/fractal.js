(function() {



// Get the canvas and context
let headerDiv = document.getElementById("header-wrapper"); 
let canvas = document.getElementById("header-canvas"); 
let context = canvas.getContext("2d");

canvas.width  = headerDiv.offsetWidth;
canvas.height = headerDiv.offsetHeight;

let juliaSeeds = [ [-0.391,-0.587], [-0.4,-0.59], [-0.54, 0.54], [0.355, 0.355], [0.37, 0.1], [0, 0.8], [0.34, -0.05], [-0.54, 0.54], [0.355, 0.355], [0.37, 0.1],
[ -0.23697092928656072, 0.7419121059594294],
[0.10697324928270424,0.6010709065175586],
[-0.07804297167573648, 0.878422153994636],
[-0.04358606323629921, -0.6601708270598163],
[-0.7581522813239732, 0.07887261017004787],
[-0.6017411670967265, 0.5390473287347921],
[-0.19385539090162895, -0.6821881025217271],
[-0.7581636113124433, 0.17868928056086064]
];

// The maximum number of iterations per pixel
let maxiterations = 340;



// Palette array 
let palette = [];
let basecolor = { r:0, g:0, b:0}; // Black
let paletteSize = 340;
// Generate palette
function generatePalette() {
    // Calculate a gradient
    let roffset = 0;
    let goffset = 0;
    let boffset = 0;
    for (let i=0; i<256; i++) {
        palette[i] = { r:roffset, g:goffset, b:boffset};

        if (i < 85) {
            boffset += 3;
        } else if (i<170) {
            roffset += 2;
            goffset += 2;
        } else  {
            roffset += 1;
            goffset += 1;
        }
    }
}

function generatePaletteRainbow() {
    // Calculate a gradient
    let roffset = 0;
    let goffset = 0;
    let boffset = 0;
    for (let i=0; i < paletteSize; i++) {
        palette[i] = { r:roffset, g:goffset, b:boffset };

        if (i < 51) {
          roffset += 5;
          goffset += 5;
          boffset += 5;
        } else if (i < 136) {
          goffset -= 3;  // rb
        } else if ( i < 221) {
          goffset += 3;
          boffset -= 3;  // rg
        } else {
          boffset += 2;  //gb
          roffset -= 2;
        }
    }
}

generatePaletteRainbow();

let [seedA, seedB] = juliaSeeds[Math.floor(Math.random() * juliaSeeds.length)];
let zoom = 500 + Math.floor(Math.random() * 500);

// Generate the fractal image
function generateImage() {

    // Pan and zoom parameters
  let offsetx = -canvas.width/2;
  let offsety = -canvas.height/2;
  let panx = -100;
  let pany = 0;
 
  // let seedA = Math.random() * 2 - 1;
  // let seedB = Math.random() * 2 - 1;
  // console.log(seedA,seedB);

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
function iterate(x, y, maxiterations, imagedata, offsetx, offsety, panx, pany, zoom) {


  // Convert the screen coordinate to a fractal coordinate
  let x0 = (x + offsetx + panx) / zoom;
  let y0 = (y + offsety + pany) / zoom;

  // Iteration letiables
  let a = 0; // imaginary number a + bi
  let b = 0;
  let a_temp = 0;
  let b_temp = 0;

  // Iterate
  let it = 0;
  while (it < maxiterations && a_temp * a_temp + b_temp * b_temp <= 4) {
      a_temp = a * a - b * b + x0;
      b_temp = 2 * a * b + y0;
      a = a_temp;
      b = b_temp;
      it += 1;
  }

  // Get palette color based on the number of iterations
  let color;
  if (it == maxiterations) {
      color = basecolor;
  } else {
      let index = Math.floor((it / (maxiterations-1)) * (paletteSize - 1));
      color = palette[index];
  }

  // Apply the color
  let pixelindex = (y * canvas.width + x) * 4;
  imagedata.data[pixelindex] = color.r;
  imagedata.data[pixelindex+1] = color.g;
  imagedata.data[pixelindex+2] = color.b;
  imagedata.data[pixelindex+3] = 255;
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
      color = basecolor;
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

window.addEventListener('resize', function(event){
  canvas.width  = headerDiv.offsetWidth;
  canvas.height = headerDiv.offsetHeight;
  draw();
});


})();
