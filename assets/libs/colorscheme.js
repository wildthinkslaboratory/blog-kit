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
      this.current.r += this.incs[0][index];
      this.current.g += this.incs[1][index];
      this.current.b += this.incs[2][index];
    }

    this.i += 1;
    if (this.i == (6 * this.sectionWidth * this.mod)) {
      this.reset();
    }
  }

  getColor() {
    return 'rgb(' + this.current.r + ',' + this.current.g + ',' + this.current.b + ')';
  }

  reset() {
    this.i = 0;
    this.current.r = this.base.r;
    this.current.g = this.base.g;
    this.current.b = this.base.b;    
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


});

