### Quadratic Dot Generator Change
sjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mksjdkfjlkj. kskdjfjf f. d da'aoebio mk 

# :::: intro
# --outlinebox int
### Quadratic Dot Generator
This would contain references.
# --outlinebox
# ::::

# :::: panel
# --aliceblue

[prepare a download](:=download=true) 

```javascript /autoplay/inline
this.div.innerHTML = `<a></a>`;

this.dependOn = ['imageForDownload'];
this.depend = function() {
  if (env.imageForDownload == '') {
    this.div.innerHTML = `<a></a>`;
  }
  else {
      this.div.innerHTML = `<a target="_blank" rel="noopener noreferrer" href=${env.imageForDownload}>download link</a>`;
  }

}

```
# --aliceblue
# ::::

```javascript /autoplay/kiosk
//smartdown.import=//cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js


// smartdown.showDisclosure('panel','','bottomright,draggable,shadow');
// smartdown.showDisclosure('intro','','transparent,center,closeable,draggable,shadow,outline');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.style.background = '#FFF';
myDiv.innerHTML = `<canvas id="appCanvas"></canvas>`


let canvas = document.getElementById("appCanvas"); 
let context = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;


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

let suspendDepend = false;

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


 
 
// Generate the fractal image
function draw() {
  let rFactor = 0.01;

  for (let b = -2; b < 2; b += 0.01) {
    for (let c = -2; c < 2; c += 0.01) {
      const d = b*b - 4*c;
      if (d > 0) {
        const x = (-b + Math.sqrt(d)) / 2;
        const y = (-b - Math.sqrt(d)) / 2;
        const r = Math.sqrt(1 / Math.sqrt(d));
      
        // convert x,y to pixel position
        const xmin = -1;
        const xmax = 5
        if (x > xmin && x < xmax) {
          let pixelX = (x + -xmin) / (xmax - xmin) * canvas.width;
          let pixelY = (y + -xmin) / (xmax - xmin) * canvas.width;

          if (pixelY >= 0 && pixelY <= canvas.height) {
            context.beginPath();
            context.arc(pixelX, pixelY, r * rFactor, 0, 2 * Math.PI);
            context.fill();
            //console.log(x,y,r);
          }


        }

      }

    }
  }


}




function newColors() {
  generateColorSeed();
  generatePalette();
}

window.addEventListener('resize', function(event){

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  draw();
});

// pick a random julia seed from a list of good seeds
// then pick a random zoom level
draw();

// smartdown.setVariable('randomRedraw', false);
// smartdown.setVariable('color', false);
// smartdown.setVariable('zoomin', false);
// smartdown.setVariable('zoomout', false);
// smartdown.setVariable('up', false);
// smartdown.setVariable('down', false);
// smartdown.setVariable('left', false);
// smartdown.setVariable('right', false);
// smartdown.setVariable('download', false);
// smartdown.setVariable('randomSeed', false);
// smartdown.setVariable('A', seedA);
// smartdown.setVariable('B', seedB);
// smartdown.setVariable('redraw', false);
// smartdown.setVariable('imageForDownload', '');

// this.dependOn = ['randomRedraw','color','zoomin', 'zoomout','up', 'down','left','right','download', 'randomSeed', 'redraw'];
// this.depend = function() {

//   if (env.download == true) {
//     smartdown.setVariable('download', false);

//     const imgData = canvas.toDataURL("image/jpg");
//     smartdown.setVariable('imageForDownload', imgData);
//   }
//   else {
//     smartdown.setVariable('imageForDownload', '');
//     if (env.redraw == true) {
//       smartdown.setVariable('redraw', false);
//       seedA = parseFloat(env.A);  
//       seedB = parseFloat(env.B); 
//       console.log('seeds', seedA, seedB);
//       draw();
//     }


//     if (env.randomSeed == true) { 
//       useRandomSeed = true; 
//       zoom = 200;
//     }
//     else { useRandomSeed = false; }

//     if (env.randomRedraw == true) {
//       smartdown.setVariable('randomRedraw', false);
//       randomFractal();
//       draw();
//     }
//     if (env.color == true) {
//       smartdown.setVariable('color', false);
//       newColors();
//       draw();
//     }
//     if (env.zoomin == true) {
//       smartdown.setVariable('zoomin', false);
//       zoom += 100;
//       draw();
//     }
//     if (env.zoomout == true) {
//       smartdown.setVariable('zoomout', false);
//       zoom -= 100;
//       draw();
//     }
//     if (env.up == true) {
//       smartdown.setVariable('up', false);
//       pany -= 100;
//       draw();
//     }
//     if (env.down == true) {
//       smartdown.setVariable('down', false);
//       pany += 100;
//       draw();
//     }
//     if (env.left == true) {
//       smartdown.setVariable('left', false);
//       panx -= 100;
//       draw();
//     }
//     if (env.right == true) {
//       smartdown.setVariable('right', false);
//       panx += 100;
//       draw();
//     }
//   }


// }

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
