


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
[-0.108,-0.837],
[-0.455, 0.595],
[-0.2, -0.685],
[-0.76643, 0.1],
[-0.10, -0.8397],
[-0.749, 0.0229],
[-0.542, -0.4933],
[-0.626447, -0.403],
[-0.145, -0.8375],
[-0.49, 0.6],
[-0.4907, 0.6],
[0.301, 0.48788],
[-0.749, 0.042],
[-0.7511, 0.022],
[-0.552, -0.478]
];



class RGBColor {
  constructor(r,g,b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  byIndex(i) {  // 0 is red, 1 is green, 2 is blue
    switch (i) {
      case 0: return this.r;
      case 1: return this.g;
      case 2: return this.b;
    }
  }
}


class SmoothColorScheme {
  constructor(min, max, mod = 1, ns = 4, maxInc = 2) {
    this.min = min;
    this.max = max;
    this.mod = mod;
    this.maxInc = maxInc;
    this.incs = [[],[],[]];
    // take the 0-255 range and divide it into sections
    this.numSections = ns;
    this.sectionWidth = Math.floor((this.max - this.min + 1) / this.numSections);
    this.base = new RGBColor(                        // base color is random color
      Math.floor(Math.random() * this.numSections) * this.sectionWidth + this.min,
      Math.floor(Math.random() * this.numSections) * this.sectionWidth + this.min,
      Math.floor(Math.random() * this.numSections) * this.sectionWidth + this.min);
    this.current = new RGBColor(this.base.r, this.base.g, this.base.b);
    this.i = 0;
    this.up = true;

    // now we randomly generate increments that move up each RGB up or down
    for (let i=0; i < 3; i++) {   // for each of r,g,b

      let inc = Math.floor((this.base.byIndex(i) - this.min) / this.sectionWidth); // what section are we in?

      for (let j=0; j < 6; j++) {  
        let up = Math.floor(Math.random() * this.maxInc);
        if ((inc == 0 || up) && inc != this.numSections) {  // we have room to turn this color up
          this.incs[i].push(Math.floor(Math.random() * ((this.numSections + 1) - inc)));
        } 
        else {    // we'll turn this color down
          this.incs[i].push( -Math.floor(Math.random() * (inc + 1)));
        }
        inc += this.incs[i][j];
      }
    }
  }

  inc() {
    if ((this.i % this.mod) == 0) {
      let index = Math.floor(this.i / (this.sectionWidth * this.mod));
      if (this.up) {
        this.current.r += this.incs[0][index];
        this.current.g += this.incs[1][index];
        this.current.b += this.incs[2][index];
      }
      else {
        this.current.r -= this.incs[0][index];
        this.current.g -= this.incs[1][index];
        this.current.b -= this.incs[2][index];
      }
    }

    if (this.up) {
      this.i += 1;
    }
    else {
      this.i -= 1;
    }

    if (this.i == (6 * this.sectionWidth * this.mod)) {
      this.up = false;
      this.i -= 1;
    }

    if (this.i == 0) {
      this.up = true;
    }
  }

  getColor() {
    return 'rgb(' + this.current.r + ',' + this.current.g + ',' + this.current.b + ')';
  }

  numberColors() { return 6 * this.sectionWidth; }

  bigInc() { 
    for (let i=0; i < this.mod; i++) {
      this.inc();
    }
  }

  reset() {
    this.i = 0;
    this.current.r = this.base.r;
    this.current.g = this.base.g;
    this.current.b = this.base.b;  
    this.up = true;  
  }

}


///////////////////////////////////////////////////////////////////////////////////////

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    let mod = {
      exports: {}
    };
    factory(mod.exports);
    global.calclib = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.RGBColor = RGBColor;
  exports.SmoothColorScheme = SmoothColorScheme;
  exports.juliaSeeds = juliaSeeds;


});

