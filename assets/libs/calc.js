const blue = '#66AAFF';
const brightblue = '#99DDFF';
const darkblue = '#3344AA';
const lightgray = '#CCCCCC';
const mediumgray = '#888888';
const darkgray = '#333333';
const darktomato = '#DD3333';
const tomato = '#FF2222'; 
const purpleblue = '#7766FF';
const lightpurpleblue  = '#EEEEFF';


class BlueTheme {
  constructor() {
    this.fill = blue;
    this.stroke = darkblue;
    this.highlightFill = brightblue;
    this.highlightStroke = darkblue;
    this.lightAnnote = mediumgray;
    this.darkAnnote = darkgray;
    this.verylightAnnote = lightgray;
    this.startPoint = 'green';
    this.endPoint = 'red';
    this.fontSizeAnnote = 15;
    this.strokeWidth = 4;
    this.strokeWidthAnnote = 2;
    this.accent1 = purpleblue;
    this.accent2 = lightpurpleblue;
    this.fillOpacity = 0.5;
    this.fill2 = '#FF66AA';
    this.stroke2 = '#DD4488';
  }
}

class SteelTheme {
  constructor() {
    this.fill = '#5555FF';
    this.stroke = '#666688';
    this.highlightFill = brightblue;
    this.highlightStroke = '#666688';
    this.lightAnnote = '#AAAACC';
    this.darkAnnote = darkgray;
    this.verylightAnnote = '#CCCCEE';
    this.startPoint = '#666688';
    this.endPoint = '#666688';
    this.fontSizeAnnote = 15;
    this.strokeWidth = 4;
    this.strokeWidthAnnote = 2;
    this.accent1 = purpleblue;
    this.accent2 = lightpurpleblue;
    this.fillOpacity = 0.2;
    this.fill2 = '#FF66AA';
    this.stroke2 = '#DD4488';
  }
}

let th = new BlueTheme();

let textWidth = function(t,b) {
  t.updateSize();
  let boundingBox = b.getBoundingBox();         
  let boardwidth = (boundingBox[2] - boundingBox[0]);  
  return t.getSize()[0] * boardwidth / b.canvasWidth;
}

let showAFFactory = function(elements) {
  return function() {
    for (let i=0; i < elements.length; i++) {
      elements[i].setAttribute({visible:true});
    }
  }
}

let hideAFFactory = function(elements) {
  return function() {
    for (let i=0; i < elements.length; i++) {
      elements[i].setAttribute({visible:false});
    }
  }
}

class Slider {
  constructor(board, [xf, yf], [low,high], name) {
    this.board = board;
    this.low = low;   // range of values the slider is allowed to take
    this.high = high;
    this.name = name; 
    let boundingBox = this.board.getBoundingBox();
    this.Yerror = (boundingBox[1] - boundingBox[3]) / 50;  
    this.Xerror = (boundingBox[2] - boundingBox[0]) / 50;
    this.xdeltaP = 3 * this.Xerror;
    this.Y = yf;      // position on the board
    this.X1 = xf;
    this.precision = 3;
    this.dead = false;  // a slider can be shared by multiple objects.
                        // we only want to delete it once

    this.X2 = this.X2.bind(this);             // bound functions that might need 
    this.gliderX = this.gliderX.bind(this);   // to be passed
    this.value = this.value.bind(this);
    this.stringValue = this.stringValue.bind(this);
    this.textX = this.textX.bind(this);

    this.l1 = this.board.create('segment', [[this.X1, this.Y], [this.X2, this.Y]], {
      strokeColor:'black', 
      strokeWidth:1,  
      visible:true
    });

    this.g = this.board.create('glider', [this.X1() + this.Xerror/4, this.Y(), this.l1], {
      name: '', 
      size:6, 
      strokeColor: 'black', 
      fillColor:'white',
      showInfoBox:false
    });

    this.l2 = this.board.create('segment', [[this.X1, this.Y], [this.gliderX, this.Y]], {
      strokeColor:'black', 
      strokeWidth:3,  
      visible:true
    });
    
    this.text = this.board.create('text', [this.textX, this.Y, this.stringValue], {fontSize:12});

  }

  X2() { return this.X1() + this.xdeltaP; }
  gliderX() { return this.g.X(); }
  textX() { return  this.X1() + this.xdeltaP + this.Xerror; }

  value() {
    let percent = (this.g.X() - this.X1()) / this.xdeltaP;
    return (this.low + (this.high - this.low) * percent).toFixed(this.precision);
  }

  stringValue() { return this.name + '        ' + this.value().toString(); }

  setValue(v) {
    if (v < this.low || v > this.high) return;
    let percent = (v - this.low)/(this.high - this.low);
    this.g.moveTo([this.X1() + percent * this.xdeltaP ,this.Y()]);
  }

  setPrecision(i) { this.precision = i; }

  delete() {
    if (!this.dead) {  // only delete it once
      this.board.removeObject(this.text);
      this.board.removeObject(this.l2);
      this.board.removeObject(this.g);
      this.board.removeObject(this.l1);
      this.dead = true;
    }
  }

  show() {
    this.l2.setAttribute({visible:true});
    this.g.setAttribute({visible:true});
    this.l1.setAttribute({visible:true});
  }

  hide() {
    this.l2.setAttribute({visible:false});
    this.g.setAttribute({visible:false});
    this.l1.setAttribute({visible:false});
  }
}


class IntSlider extends Slider {
  constructor(board, [xf, yf], [low,high], name) {
    super(board, [xf, yf], [low,high], name);
    this.value = this.value.bind(this); 
  }

  value() { return Math.floor(super.value()); }
}


class BoolButton extends Slider {
  constructor(board, [xf, yf], name) {
    super(board, [xf, yf], [0,2], name);
    this.state = false;
    this.xdeltaP = 0;
    this.toggleCallback = undefined;

    this.toggle = this.toggle.bind(this);
    this.showText = this.showText.bind(this);
    this.hideText = this.hideText.bind(this);
    
    this.g.on('up', this.toggle);
    this.g.on('over', this.showText);
    this.g.on('out', this.hideText);
    this.g.setAttribute({
      fillColor:th.accent2, 
      highlightFillColor:th.accent2,
      strokeColor:th.darkAnnote,
      highlightStrokeColor:th.darkAnnote
    });
    this.text.setAttribute({visible:false, strokeColor:th.lightAnnote});
  }


  stringValue() { 
    if (this.state) {
      return 'attach secant';
    }
    else {
      return 'attach rectangle';
    }
  }

  toggle() {
    if (this.state) {
      this.g.setAttribute({fillColor:th.accent2});
    }
    else {
      this.g.setAttribute({fillColor:th.accent1});
    }
    this.state = !this.state;
    if (this.toggleCallback !== undefined) { this.toggleCallback(); }
  }

  showText() {
    this.text.setAttribute({visible:true});
  }

  hideText() {
    this.text.setAttribute({visible:false});
  }
}

class BaseXInterval {
  constructor(b) {
    this.board = b;
    let boundingBox = this.board.getBoundingBox();         // I've added these errors here to 
    this.Yerror = (boundingBox[1] - boundingBox[3]) / 100;  // give the widgets access to them.
    this.Xerror = (boundingBox[2] - boundingBox[0]) / 100;  // like they have access to the board
    this.xline = this.board.create('line', [[0,0],[1,0]], {visible:false});  // x axis line
    this.x1 = undefined;
    this.x2 = undefined;
    this.vline = undefined;
    this.midY = undefined;
  }

  // getters
  X1() { return this.x1.X(); }
  X2() { return this.x2.X(); }
  units() { return this.x2.X() - this.x1.X(); }
  midX() {
    return this.x1.X() + this.units() / 2;
  }

  attachLeftX() { return this.X1() + this.Xerror; } 
  attachRightX() { return this.X2() + this.Xerror; }

  attachY() { return 2 * this.Yerror; }

  createMidLine() {
    // create a vertical glider at the midpoint of the interval
    this.vline = this.board.create('line', [[this.midX ,0], [this.midX, 1]], {visible:false});
    this.midY = this.board.create('glider', [this.midX(), 0, this.vline], {
      name: '', size:4, color:th.stroke, visible:false, showInfoBox:false});
  }

  // remove the interval from the board
  delete() {
    this.board.removeObject(this.xline);
    this.board.removeObject(this.x1);
    this.board.removeObject(this.x2);
    this.board.removeObject(this.vline);
    this.board.removeObject(this.midY);
  }

  show() {
    this.x1.setAttribute({visible:true});
    this.x2.setAttribute({visible:true});
  }

  hide() {
    this.x1.setAttribute({visible:false});
    this.x2.setAttribute({visible:false});
    this.midY.setAttribute({visible:false});
  }

  onUpdate() { }
}

/*
   This creates an interval on the X axis.  The interval can be resized with two gliders x1 and x2 on 
   the X axis.  There is also a vertical glider midY in the middle of the interval.
*/
class XInterval extends BaseXInterval {
  constructor(b, X1, X2) {
    super(b);
    this.snapToGrid = true;
    this.snapMargin = 0.05;
    this.index = -1;

    // create two gliders on the x axis
    this.x1 = b.create('glider', [X1,0,this.xline], {name: '', size:5, color:th.startPoint});
    this.x2 = b.create('glider', [X2,0,this.xline], {name: '', size:5, color:th.endPoint});

    // bind all functions that might be passed in a callback to this context
    this.X1 = this.X1.bind(this);
    this.X2 = this.X2.bind(this);
    this.attachLeftX = this.attachLeftX.bind(this);
    this.attachRightX = this.attachRightX.bind(this);
    this.attachY = this.attachY.bind(this);
    this.midX = this.midX.bind(this);
    this.units = this.units.bind(this);
    this.checkSnapToGrid = this.checkSnapToGrid.bind(this);
    this.checkSnap = this.checkSnap.bind(this);
    this.onUpdate = this.onUpdate.bind(this);

    this.createMidLine();
  }

  setSnapMargin(margin) { this.snapMargin = margin; }
  turnOffSnapToGrid() { this.snapToGrid = false; }

  // snap the interval endpoints to the integer grid
  checkSnapToGrid() {
    if (this.snapToGrid) {
      this.checkSnap(this.x1);
      this.checkSnap(this.x2);
    }
  }

  checkSnap(point) {
    let floor = Math.floor(point.X());           // are we close to the lower integer?
    if (point.X() < floor + this.snapMargin) {
      point.moveTo([floor,0]);
    }
    else {                                         // are we close to the higher integer?
      let ceiling = Math.ceil(point.X());
      if (point.X() > ceiling - this.snapMargin) {
        point.moveTo([ceiling,0]);
      }
    }
  }

  // call back function for the board on what to update for this object
  onUpdate() { this.checkSnapToGrid(); }

}

////////////////////////////////////////////////////////////////////////////////////////////

class XIntAFEndpoints extends BaseXInterval {
  constructor(board, AF1, AF2) {
    super(board);
    this.x1 = this.board.create('point', [AF1,0], {name: '', size:5, color:th.stroke});
    this.x2 = this.board.create('point', [AF2,0], {name: '', size:5, color:th.stroke});

    // bind all functions that might be passed in a callback to this context
    this.X1 = this.X1.bind(this);
    this.X2 = this.X2.bind(this);
    this.attachLeftX = this.attachLeftX.bind(this);
    this.attachRightX = this.attachRightX.bind(this);
    this.attachY = this.attachY.bind(this);
    this.midX = this.midX.bind(this);
    this.units = this.units.bind(this);
    this.onUpdate = this.onUpdate.bind(this);

    this.createMidLine();

  }


}

////////////////////////////////////////////////////////////////////////////////////////////

class XIntArrayElement extends BaseXInterval {
  constructor(board, xint, index, N) {
    super(board);
    this.xint = xint;
    this.index = index;
    this.N = N;
    this.snapped = false;

    // bind all functions that might be passed in a callback to this context
    this.X1 = this.X1.bind(this);
    this.X2 = this.X2.bind(this);
    this.attachLeftX = this.attachLeftX.bind(this);
    this.attachRightX = this.attachRightX.bind(this);
    this.attachY = this.attachY.bind(this);
    this.midX = this.midX.bind(this);
    this.units = this.units.bind(this);
    this.onUpdate = this.onUpdate.bind(this);

    this.x1 = this.board.create('point', [
      this.X1,
      0], {name: '', size:5, color:th.stroke});
    this.x2 = this.board.create('point', [
      this.X2,
      0], {name: '', size:5, color:th.stroke});


    this.createMidLine();

  }

  X1() {
    let deltaP = this.xint.units() / this.N;
    return this.xint.X1() + this.index * deltaP;
  }

  X2() {
    let deltaP = this.xint.units() / this.N;
    return this.xint.X1() + (this.index+1) * deltaP;   
  }
}
 
////////////////////////////////////////////////////////////////////////////////////////////

class BaseWidget {
  constructor(board, attr = {}) {
    this.attr = attr; 
    this.precision = 2;
    this.unitsText = undefined;
    this.changeText = undefined;
    this.rateText = undefined;
    this.board = board;
    let boundingBox = this.board.getBoundingBox();         
    this.boardwidth = (boundingBox[2] - boundingBox[0]);  
  

    if ('precision' in this.attr) {
      this.precision = this.attr['precision'];
    }
  }

  units() { return 0; }

  unitsTextVal() { 
    let t = '';
    let n = this.units().toFixed(this.precision).toString();
    if (this.attr != undefined) {
      if ('units' in this.attr) { t = this.attr['units']; }
      if ('noUnitsNumber' in this.attr && this.attr['noUnitsNumber'] == true) { n = ''; }
      if (t == '' || n == '') { return t + n; }
      if ('annotationPosition' in this.attr && this.attr['annotationPosition'] == 'after') {
        return n + ' ' + t;
      }
      return t + ' = ' +  n;
    }
    // if no attributes are specified, the default is to show the number
    return n;
  }

  changeTextVal() {
    let t = '';
    let n = this.change().toFixed(this.precision).toString();
    if (this.attr !== undefined) {
      if ('change' in this.attr) { t = this.attr['change']; }
      if ('noChangeNumber' in this.attr && this.attr['noChangeNumber'] == true) { n = ''; }
      if (t == '' || n == '') { return t + n; }
      if ('annotationPosition' in this.attr && this.attr['annotationPosition'] == 'after') {
        return n + ' ' + t;
      }
      return t + ' = ' +  n;
    }
    // if no attributes are specified, the default is to show the number
    return n;
  }

  rateTextVal() {
    let t = '';
    let n = this.rate().toFixed(this.precision).toString();
    if (this.attr !== undefined) {
      if ('rate' in this.attr) { t = this.attr['rate']; }
      if ('noRateNumber' in this.attr && this.attr['noRateNumber'] == true) { n = ''; }
      if (t == '' || n == '') { return t + n; }
      if ('annotationPosition' in this.attr && this.attr['annotationPosition'] == 'after') {
        return n + ' ' + t;
      }
      return t + ' = ' +  n;
    }
    // if no attributes are specified, the default is to show the number
    return n;
  }

  unitsTextX() { 
    let x = this.xint.midX(); 
    if ('latexAdjustment' in this.attr && this.attr['latexAdjustment'] == true) {
      x += 2 * this.xint.Xerror;
    }
    return x;
  }

  changeTextWidth() {
    if (this.changeText == undefined ) return 0;
    this.changeText.updateSize();
    return this.changeText.getSize()[0] * this.boardwidth / this.board.canvasWidth;
  }
  
  rateTextWidth() {
    if (this.rateText == undefined ) return 0;
    this.rateText.updateSize();
    return this.rateText.getSize()[0] * this.boardwidth / this.board.canvasWidth;
  }
}



class Segment extends BaseWidget {
  constructor (board, [x1,y1], [x2,y2], attr = {}) {
    super(board, attr);

    ///////////////////////////////////////////////////////  initialize data members
    let boundingBox = this.board.getBoundingBox();         
    this.Yerror = (boundingBox[1] - boundingBox[3]) / 100;  
    this.Xerror = (boundingBox[2] - boundingBox[0]) / 100;  
    this.snapMargin = 0.05;

    
    ///////////////////////////////////////////////////////  bind functions
    this.f2X = this.f2X.bind(this);
    this.f1Y = this.f1Y.bind(this);
    this.change = this.change.bind(this);
    this.units = this.units.bind(this);
    this.rate = this.rate.bind(this);
    this.midX = this.midX.bind(this);
    this.rateTextX = this.rateTextX.bind(this);
    this.rateTextY = this.rateTextY.bind(this);
    this.rateTextVal = this.rateTextVal.bind(this);
    this.rateTextWidth = this.rateTextWidth.bind(this);
    this.slopeString = this.slopeString.bind(this);
    this.changeTextX = this.changeTextX.bind(this);
    this.changeTextY = this.changeTextY.bind(this);
    this.changeTextVal = this.changeTextVal.bind(this);
    this.changeTextWidth = this.changeTextWidth.bind(this);
    this.unitsTextX = this.unitsTextX.bind(this);
    this.unitsTextY = this.unitsTextY.bind(this);
    this.unitsTextVal = this.unitsTextVal.bind(this);
    this.turnOnAnnotations = this.turnOnAnnotations.bind(this);
    this.turnOffAnnotations = this.turnOffAnnotations.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.checkSnap = this.checkSnap.bind(this);

    


    ///////////////////////////////////////////////////////  add components to JSXGraph board
    this.f1 = this.board.create('point', [
      x1, 
      y1], 
      {color: th.stroke, highlightColor: th.stroke, size:3, name:'', visible:true});

    this.f2 = this.board.create('point', [
      x2, 
      y2], 
      {color: th.stroke, highlightColor: th.stroke, size:3, name:'', visible:true});

    this.segment = this.board.create('segment', [this.f1, this.f2], {
      strokeColor: th.stroke, 
      highlightStrokeColor: th.stroke,
      strokeWidth: th.strokeWidth, 
      visible:true});

    this.rateText = this.board.create('text', [
      this.rateTextX,
      this.rateTextY,
      this.slopeString], 
      {strokeColor: th.lightAnnote, fontSize:th.fontSizeAnnote, visible:false});

    this.p1 = this.board.create('point',[ 
      this.f2X, 
      this.f1Y],
      {visible:false});

    this.riseLine = this.board.create('segment', [this.p1, this.f2], 
    {
      strokeColor: th.lightAnnote, 
      strokeWidth:th.strokeWidthAnnote, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

    this.changeText = this.board.create('text', [
      this.changeTextX,
      this.changeTextY,
      this.changeTextVal],
      {strokeColor: th.lightAnnote, fontSize: th.fontSizeAnnote, visible:false});

    this.runLine = this.board.create('segment', [this.p1, this.f1], 
      {
        strokeColor: th.lightAnnote, 
        strokeWidth:th.strokeWidthAnnote, 
        firstArrow:true, 
        lastArrow:true, 
        visible:false
      });

    this.unitsText = this.board.create('text', [
      this.midX,
      this.unitsTextY,
      this.unitsTextVal],{
        strokeColor: th.lightAnnote, 
        fontSize: th.fontSizeAnnote, 
        anchorX:'middle',
        visible:false});

    ///////////////////////////////////////////////////////  attribute settings

    if (!('annotations' in this.attr) || this.attr['annotations'] == 'mouseover') {
        this.segment.on('over', this.turnOnAnnotations);
        this.segment.on('out', this.turnOffAnnotations);
    }
    else if (this.attr['annotations'] == 'on') {
      this.turnOnAnnotations();
    }

    if ('snapMargin' in this.attr) {
      this.snapMargin = this.attr['snapMargin'];
    }
  }

  f2X() { return this.f2.X(); }
  f1Y() { return this.f1.Y(); }
  units() { return this.f2.X() - this.f1.X(); }
  midX() { return this.f1.X() + this.units() / 2; }
  run() { return this.units(); }
  rate() { return  this.change() / this.units(); }
  change() { return this.f2.Y() - this.f1.Y(); }

  setLineColor(c) { 
    this.segment.setAttribute({strokeColor:c, highlightStrokeColor:c}); 
    this.f1.setAttribute({color:c, highlightColor:c}); 
    this.f2.setAttribute({color:c, highlightColor:c}); 
  }

  onUpdate() { 
    this.checkSnap(this.f1);
    this.checkSnap(this.f2);
  } 

  checkSnap(point) {
    let floor = Math.floor(point.X());           // are we close to the lower integer?
    if (point.X() < floor + this.snapMargin) {
      point.moveTo([floor,point.Y()]);
    }
    else {                                         // are we close to the higher integer?
      let ceiling = Math.ceil(point.X());
      if (point.X() > ceiling - this.snapMargin) {
        point.moveTo([ceiling,point.Y()]);
      }
    }
    floor = Math.floor(point.Y());           // are we close to the lower integer?
    if (point.Y() < floor + this.snapMargin) {
      point.moveTo([point.X(),floor]);
    }
    else {                                         // are we close to the higher integer?
      let ceiling = Math.ceil(point.Y());
      if (point.Y() > ceiling - this.snapMargin) {
        point.moveTo([point.X(),ceiling]);
      }
    }
  }


  setAttribute(d) { 
    for (let key in d) {
      this.attr[key] = d[key]
    }
  }  

  // this is all for the slope string annotation
  rateTextX() { 
    if (this.f1.X() <= this.f2.X()) {
      return this.midX() - this.rateTextWidth() - 2 * this.Xerror; 
    }
    return this.midX() + 2 * this.Xerror; 
  }
  rateTextY() { 
    let y = this.f1.Y() + this.change() / 2; 
    if ('latexAdjustment' in this.attr && this.attr['latexAdjustment'] == true) {
      y += 2 * this.Yerror;
    }
    return y;
  }

  slopeString() { 
    let s = 'slope = ';
    if ('rate' in this.attr && 
      !('annotationPosition' in this.attr && this.attr['annotationPosition'] == 'after')) { s = ''; }
    if ('justLines' in this.attr && this.attr['justLines'] == true) { s = ''; }
    return s + this.rateTextVal();
  }

  
  changeTextX() { 
    if (this.f1.X() <= this.f2.X()) {
      return this.f2.X() + this.Xerror;
    }
    return this.f2.X() -this.changeTextWidth() - this.Xerror;
  }
  changeTextY() { return this.f1.Y() + this.change() / 2; }


  unitsTextY() { 
    if (this.f1.Y() <= this.f2.Y())  {
      return this.f1.Y() - 3 * this.Yerror; 
    }
    return this.f1.Y() + 3 * this.Yerror;     
  }


  // call back functions for annotations
  turnOnAnnotations() {
    this.rateText.setAttribute({visible:true});
    this.changeText.setAttribute({visible:true});
    this.riseLine.setAttribute({visible:true});  
    this.runLine.setAttribute({visible:true});
    this.unitsText.setAttribute({visible:true});
   
  }

  turnOffAnnotations() {
    this.rateText.setAttribute({visible:false});
    this.changeText.setAttribute({visible:false});
    this.riseLine.setAttribute({visible:false});
    this.runLine.setAttribute({visible:false});
    this.unitsText.setAttribute({visible:false});
  }



  delete() {
    this.board.removeObject(this.riseLine);
    this.board.removeObject(this.changeText);
    this.board.removeObject(this.runLine);
    this.board.removeObject(this.unitsText);
    this.board.removeObject(this.p1);
    this.board.removeObject(this.rateText);
    this.board.removeObject(this.segment);
    this.board.removeObject(this.f1);
    this.board.removeObject(this.f2);
  } 
}


////////////////////////////////////////////////////////////////////////////////////////////


class Secant extends BaseWidget {
  constructor (xint, F, attr = {}) {
    super(xint.board, attr);
    ///////////////////////////////////////////////////////  initialize data members
    this.xint = xint;
    this.f = F;
   
    ///////////////////////////////////////////////////////  bind functions
    this.fx1 = this.fx1.bind(this);
    this.fx2 = this.fx2.bind(this);
    this.rise = this.rise.bind(this);
    this.run = this.run.bind(this);
    this.slope = this.slope.bind(this);
    this.area = this.area.bind(this);
    this.units = this.units.bind(this);
    this.rate = this.rate.bind(this);
    this.change = this.change.bind(this);
    this.rateTextX = this.rateTextX.bind(this);
    this.rateTextY = this.rateTextY.bind(this);
    this.rateTextVal = this.rateTextVal.bind(this);
    this.slopeString = this.slopeString.bind(this);
    this.rateTextWidth = this.rateTextWidth.bind(this);
    this.changeTextX = this.changeTextX.bind(this);
    this.changeTextY = this.changeTextY.bind(this);
    this.changeTextVal = this.changeTextVal.bind(this);
    this.changeTextWidth = this.changeTextWidth.bind(this);
    this.unitsTextX = this.unitsTextX.bind(this);
    this.unitsTextY = this.unitsTextY.bind(this);
    this.unitsTextVal = this.unitsTextVal.bind(this);
    this.turnOnAnnotations = this.turnOnAnnotations.bind(this);
    this.turnOffAnnotations = this.turnOffAnnotations.bind(this);
    this.onUpdate = this.onUpdate.bind(this);

    


    ///////////////////////////////////////////////////////  add components to JSXGraph board
    this.f1 = this.board.create('point', [
      this.xint.X1, 
      this.fx1], 
      {color: th.stroke, highlightColor: th.stroke, size:3, name:'', visible:true});

    this.f2 = this.board.create('point', [
      this.xint.X2, 
      this.fx2], 
      {color: th.stroke, highlightColor: th.stroke, size:3, name:'', visible:true});

    this.line = this.board.create('line', [this.f1, this.f2], {
      strokeColor: th.verylightAnnote,  
      strokeWidth:1,
      highlightStrokeWidth:1,
      highlightStrokeColor: th.verylightAnnote,
      visible:false});

    this.segment = this.board.create('segment', [this.f1, this.f2], {
      strokeColor: th.stroke, 
      highlightStrokeColor: th.stroke,
      strokeWidth: th.strokeWidth, 
      visible:true});

    this.rateText = this.board.create('text', [
      this.rateTextX,
      this.rateTextY,
      this.slopeString], 
      {strokeColor: th.lightAnnote, fontSize:th.fontSizeAnnote, visible:false});

    this.p1 = this.board.create('point',[ 
      this.xint.X2, 
      this.fx1],
      {visible:false});

    this.riseLine = this.board.create('segment', [this.p1, this.f2], 
    {
      strokeColor: th.lightAnnote, 
      strokeWidth:th.strokeWidthAnnote, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

    this.changeText = this.board.create('text', [
      this.changeTextX,
      this.changeTextY,
      this.changeTextVal],
      {strokeColor: th.lightAnnote, fontSize: th.fontSizeAnnote, visible:false});

    this.runLine = this.board.create('segment', [this.p1, this.f1], 
      {
        strokeColor: th.lightAnnote, 
        strokeWidth:th.strokeWidthAnnote, 
        firstArrow:true, 
        lastArrow:true, 
        visible:false
      });

    this.unitsText = this.board.create('text', [
      this.unitsTextX,
      this.unitsTextY,
      this.unitsTextVal],{
        strokeColor: th.lightAnnote, 
        fontSize: th.fontSizeAnnote, 
        anchorX:'middle',
        visible:false});

    ///////////////////////////////////////////////////////  attribute settings

    this.setUpAnnotations();

    if ('snapMargin' in this.attr) {
      this.xint.setSnapMargin(this.attr['snapMargin']);
    }
  }

  fx1() { return this.f(this.xint.X1()); }
  fx2() { return this.f(this.xint.X2()); }
  run() { return this.xint.units(); }
  slope() { return  this.rise() / this.units(); }
  setLineColor(c) { 
    this.segment.setAttribute({strokeColor:c, highlightStrokeColor:c}); 
    this.f1.setAttribute({color:c, highlightColor:c}); 
    this.f2.setAttribute({color:c, highlightColor:c}); 
  }

  // interface functions
  area() { return 0; }
  rise() { return this.fx2() - this.fx1(); }
  units() { return this.run(); }
  rate() { return this.slope(); }
  change() { return this.rise(); }  
  onUpdate() { this.xint.onUpdate(); } 
  setAttribute(d) { 
    for (let key in d) {
      this.attr[key] = d[key]
    }
  }  


  // this is all for the slope string annotation
  rateTextX() { 
    if (this.xint.X1() <= this.xint.X2()) {
      return this.xint.midX() - this.rateTextWidth() - 2 * this.xint.Xerror; 
    }
    return this.xint.midX() + 2 * this.xint.Xerror; 
  }
  rateTextY() { 
    let y = this.fx1() + this.rise() / 2; 
    if ('latexAdjustment' in this.attr && this.attr['latexAdjustment'] == true) {
      y += 4 * this.xint.Yerror;
    }
    return y;
  }

  slopeString() { 
    if (this.units() == 0) {
      return 'slope = UNDEFINED';
    }
    let s = 'slope = ';
    if ('rate' in this.attr && 
      !('annotationPosition' in this.attr && this.attr['annotationPosition'] == 'after')) { s = ''; }
    if ('justLines' in this.attr && this.attr['justLines'] == true) { s = ''; }
    return s + this.rateTextVal();
  }
  
  
  // this is all for the rise string annotation
  changeTextX() { 
    if (this.xint.X1() <= this.xint.X2()) {
      return this.xint.X2() + this.xint.Xerror;
    }
    return this.xint.X2() -this.changeTextWidth() - this.xint.Xerror;
  }
  changeTextY() { 
    let y = this.fx1() + this.rise() / 2; 
    if ('latexAdjustment' in this.attr && this.attr['latexAdjustment'] == true) {
      y += 4 * this.xint.Yerror;
    }
    return y;
  }
  

  // this is all for the units string annotation
  unitsTextY() { 
    let y = this.f1.Y() + 3 * this.xint.Yerror; 
    if (this.f1.Y() <= this.f2.Y())  {
      y = this.f1.Y() - 3 * this.xint.Yerror; 
    }
    if ('latexAdjustment' in this.attr && this.attr['latexAdjustment'] == true) {
      y += 4 * this.xint.Yerror;
    }
    return y;       
  }

  // call back functions for annotations
  turnOnAnnotations() {
    this.rateText.setAttribute({visible:true});
    this.changeText.setAttribute({visible:true});
    this.riseLine.setAttribute({visible:true});
    this.line.setAttribute({visible:true});
    if ('showUnits' in this.attr && this.attr['showUnits'] == true) {
      this.runLine.setAttribute({visible:true});
      this.unitsText.setAttribute({visible:true});
    }
  }

  turnOffAnnotations() {
    this.rateText.setAttribute({visible:false});
    this.changeText.setAttribute({visible:false});
    this.riseLine.setAttribute({visible:false});
    this.line.setAttribute({visible:false});
    this.runLine.setAttribute({visible:false});
    this.unitsText.setAttribute({visible:false});
  }

  setUpAnnotations() {
    if (!('annotations' in this.attr) || this.attr['annotations'] == 'mouseover') {
        this.segment.on('over', this.turnOnAnnotations);
        this.segment.on('out', this.turnOffAnnotations);
    }
    else if (this.attr['annotations'] == 'on') {
      this.turnOnAnnotations();
    }
  }

  delete() {
    this.board.removeObject(this.riseLine);
    this.board.removeObject(this.changeText);
    this.board.removeObject(this.runLine);
    this.board.removeObject(this.unitsText);
    this.board.removeObject(this.p1);
    this.board.removeObject(this.rateText);
    this.board.removeObject(this.segment);
    this.board.removeObject(this.line);
    this.board.removeObject(this.f1);
    this.board.removeObject(this.f2);
    this.xint.delete();
  } 

  show() {
    this.xint.show();
    this.f1.setAttribute({visible:true});
    this.f2.setAttribute({visible:true});
    this.segment.setAttribute({visible:true});
    this.setUpAnnotations();
  }

  hide() {
    this.xint.hide();
    this.f1.setAttribute({visible:false});
    this.f2.setAttribute({visible:false});
    this.segment.setAttribute({visible:false});
    this.line.setAttribute({visible:false});
    this.rateText.setAttribute({visible:false});
    this.changeText.setAttribute({visible:false});
    this.riseLine.setAttribute({visible:false});
    this.unitsText.setAttribute({visible:false});
    this.runLine.setAttribute({visible:false});
  }
}



////////////////////////////////////////////////////////////////////////////////////////////


class Rectangle extends BaseWidget {
  constructor (xint, F, attr = { } ) {
    super(xint.board, attr);
    ///////////////////////////////////////////////////////  initialize data members
    this.xint = xint;
    this.f = F;
    
    ///////////////////////////////////////////////////////  bind functions
    this.height = this.height.bind(this);
    this.area = this.area.bind(this);
    this.units = this.units.bind(this);
    this.rate = this.rate.bind(this);
    this.change = this.change.bind(this);
    this.rise = this.rise.bind(this);
    this.changeTextX = this.changeTextX.bind(this);
    this.changeTextY = this.changeTextY.bind(this);
    this.changeTextVal = this.changeTextVal.bind(this);
    this.changeTextWidth = this.changeTextWidth.bind(this);
    this.hdX = this.hdX.bind(this);
    this.rateTextX = this.rateTextX.bind(this);
    this.rateTextY = this.rateTextY.bind(this);
    this.rateTextVal = this.rateTextVal.bind(this);
    this.wdY = this.wdY.bind(this);
    this.unitsTextX = this.unitsTextX.bind(this);
    this.unitsTextY = this.unitsTextY.bind(this);
    this.unitsTextVal = this.unitsTextVal.bind(this);
    this.turnOnAnnotations = this.turnOnAnnotations.bind(this);
    this.turnOffAnnotations = this.turnOffAnnotations.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    

    ///////////////////////////////////////////////////////  add components to JSXGraph board
    this.f1 = this.board.create('point', [
      this.xint.X1, 
      this.height], 
      {color: th.stroke, size:3, name:'', visible:false});

    this.f2 = this.board.create('point', [
      this.xint.X2, 
      this.height], 
      {color: th.stroke, size:3, name:'', visible:false});

    this.rect = this.board.create('polygon', [this.xint.x1, this.f1, this.f2, this.xint.x2], 
    {
      borders: { strokeColor: th.stroke, highlightStrokeColor: th.highlightStroke},
      fillColor:th.fill, 
      highlightFillColor:th.highlightFill, 
      fillOpacity:th.fillOpacity,
      highlightFillOpacity:th.fillOpacity,
      hasInnerPoints:true
    });

    this.changeText = this.board.create('text', [
      this.changeTextX,
      this.changeTextY,
      this.changeTextVal],
      { strokeColor: th.darkAnnote, 
        fontSize:th.fontSizeAnnote, 
        anchorX:'middle',
        visible:false });

    this.p1 = this.board.create('point',[
      this.hdX,
      this.height],
      {visible:false});

    this.p2 = this.board.create('point',[
      this.hdX,
      0],
      {visible:false});

    this.heightLine = this.board.create('segment', [this.p1, this.p2], 
    {
      strokeColor:th.lightAnnote, 
      strokeWidth:th.strokeWidthAnnote, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

    this.rateText = this.board.create('text', [
      this.rateTextX,
      this.rateTextY,
      this.rateTextVal],
      { 
        strokeColor:th.lightAnnote, 
        fontSize: th.fontSizeAnnote, visible:false});

    this.p3 = this.board.create('point',[
      this.xint.X1, 
      this.wdY],
      {visible:false});

    this.p4 = this.board.create('point',[
      this.xint.X2, 
      this.wdY],
      {visible:false});

    this.widthLine = this.board.create('segment', [this.p3,this.p4], 
    {
      strokeColor: th.lightAnnote, 
      strokeWidth:th.strokeWidthAnnote, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

    this.unitsText = this.board.create('text', [
      this.unitsTextX,
      this.unitsTextY,
      this.unitsTextVal],
      {
        strokeColor: th.lightAnnote, 
        fontSize: th.fontSizeAnnote, 
        anchorX:'middle',
        visible:false});


    ///////////////////////////////////////////////////////  attribute settings

    this.setUpAnnotations();

    if ('snapMargin' in this.attr) {
      this.xint.setSnapMargin(this.attr['snapMargin']);
    }
  }



  height() { return this.f(this.xint.midX()); }
  hdX() { 
    let margin = (this.xint.X1() < this.xint.X2()) ? this.xint.Xerror : - this.xint.Xerror;
    return this.xint.X2() +  margin; 
  }
  wdY() { 
    if (this.height() >= 0) { return this.height() + 2 * this.xint.Yerror; }
    return this.height() - 2 * this.xint.Yerror;
  }
  setFillColor(c) { this.rect.setAttribute({fillColor:c}); }

  // interface functions
  area() { return this.height() * this.xint.units(); }
  units() { return this.xint.units(); }
  rate() { return this.height(); }
  rise() { return 0; }
  change() { return this.area(); } 
  onUpdate() { this.xint.onUpdate(); } 
  setAttribute(d) { 
    for (let key in d) {
      this.attr[key] = d[key]
    }
  }  


  // this mangages the area text annotation
  changeTextX() { 
    let x = this.xint.midX(); 
    if ('latexAdjustment' in this.attr && this.attr['latexAdjustment'] == true) {
      x += 2 * this.xint.Xerror;
    }
    return x;
  }
  changeTextY() { 
    let y = this.height() / 2; 
    if ('latexAdjustment' in this.attr && this.attr['latexAdjustment'] == true) {
      y += 4 * this.xint.Yerror;
    }
    return y;  
  }


  // this mangages the height text annotation
  rateTextX() { 
    let x = this.hdX() - this.rateTextWidth() - this.xint.Xerror; 

    if (this.xint.X1() < this.xint.X2()) {
      x = this.hdX() + this.xint.Xerror;
    }

    if ('latexAdjustment' in this.attr && this.attr['latexAdjustment'] == true) {
      x += 0 * this.xint.Xerror;
    }
    return x;
  }

  rateTextY() { 
    let y = this.height() / 2;
    if ('latexAdjustment' in this.attr && this.attr['latexAdjustment'] == true) {
      y += 4 * this.xint.Yerror;
    }
    return y;  
  }


  // this mangages the width text annotation
  unitsTextY() { 
    let y = this.height() - 6 * this.xint.Yerror;
    if (this.rate() >= 0) { y = this.height() + 4 * this.xint.Yerror; } 

    if ('latexAdjustment' in this.attr && this.attr['latexAdjustment'] == true) {
      y += 4 * this.xint.Yerror;
    }
    return y;  
  }

  // call back functions for annotations
  turnOnAnnotations() {
    this.changeText.setAttribute({visible:true});
    this.rateText.setAttribute({visible:true});
    this.heightLine.setAttribute({visible:true});
    this.unitsText.setAttribute({visible:true});
    this.widthLine.setAttribute({visible:true}); 
  }

  turnOffAnnotations() {
    this.changeText.setAttribute({visible:false});
    this.rateText.setAttribute({visible:false});
    this.heightLine.setAttribute({visible:false});
    this.unitsText.setAttribute({visible:false});
    this.widthLine.setAttribute({visible:false}); 
  }
  

  delete() {
    this.board.removeObject(this.widthLine);
    this.board.removeObject(this.unitsText);
    this.board.removeObject(this.heightLine);
    this.board.removeObject(this.rateText);
    this.board.removeObject(this.p3);
    this.board.removeObject(this.p4);
    this.board.removeObject(this.p2);
    this.board.removeObject(this.p1);
    this.board.removeObject(this.changeText);
    this.board.removeObject(this.rect);
    this.board.removeObject(this.f1);
    this.board.removeObject(this.f2);
    this.xint.delete();
  }

  setUpAnnotations() {
    if (!('annotations' in this.attr) || this.attr['annotations'] == 'mouseover') {
        this.rect.on('over', this.turnOnAnnotations);
        this.rect.on('out', this.turnOffAnnotations);
    }
    else if (this.attr['annotations'] == 'on') {
      this.turnOnAnnotations();
    }
  }

  show() {
    this.xint.show();
    this.f1.setAttribute({visible:true});
    this.f2.setAttribute({visible:true});
    this.rect.setAttribute({visible:true});
    for (let i=0; i < this.rect.borders.length; i++) {
      this.rect.borders[i].setAttribute({visible:true});
    }
    this.setUpAnnotations();
  }

  hide() {
    this.xint.hide();
    this.f1.setAttribute({visible:false});
    this.f2.setAttribute({visible:false});
    this.rect.setAttribute({visible:false});
    for (let i=0; i < this.rect.borders.length; i++) {
      this.rect.borders[i].setAttribute({visible:false});
    }
    this.changeText.setAttribute({visible:false});
    this.heightLine.setAttribute({visible:false});
    this.rateText.setAttribute({visible:false});
    this.widthLine.setAttribute({visible:false});
    this.unitsText.setAttribute({visible:false});
  }

}

////////////////////////////////////////////////////////////////////////////////////////////

// a rectangle with an adjustable height
class AdjHeightRectangle extends Rectangle {
  constructor(xint, F, attr) {
    super(xint,F, attr);
    this.xint.midY.setAttribute({visible:true});
    this.setHeight(this.units() / 2);
    this.height = this.height.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  height() { return this.xint.midY.Y(); }
  setHeight(h) { this.xint.midY.moveTo([this.xint.midX(),h]); }

  snapToFunction() {
      let currentH = this.height();
      let functionH = this.f(this.xint.midX());
      if (currentH <= functionH + 3 * this.xint.Yerror && currentH >= functionH - 3 * this.xint.Yerror) {
        this.setHeight(functionH);
      }
  }

  onUpdate() {
    this.snapToFunction();
    super.onUpdate();
  }
} 

////////////////////////////////////////////////////////////////////////////////////////////


class SecantRectangle {
  constructor (xint, F, attr = { } ) {

    ///////////////////////////////////////////////////////  initialize data members
    this.xint = xint;
    this.f = F;
    this.attr = attr;

    ///////////////////////////////////////////////////////  bind functions
    this.rectangleFunction = this.rectangleFunction.bind(this);
    this.secantFunction = this.secantFunction.bind(this);
    this.turnOnAnnotations = this.turnOnAnnotations.bind(this);
    this.turnOffAnnotations = this.turnOffAnnotations.bind(this);
    this.area = this.area.bind(this);
    this.change = this.change.bind(this);
    this.units = this.units.bind(this);
    this.rise = this.rise.bind(this);

    ///////////////////////////////////////////////////////  data members with callbacks
    this.attachButton = new BoolButton(this.xint.board, [this.xint.attachLeftX, this.xint.attachY], 'attach',); 
    this.rectangle = new Rectangle(xint, this.rectangleFunction, attr);
    this.secant = new Secant(xint, this.secantFunction, attr);
    this.secant.setAttribute({showUnits:false})
    this.xint.midY.setAttribute({visible:true});

    ///////////////////////////////////////////////////////  attribute settings
    if (!('annotations' in this.attr) || this.attr['annotations'] == 'mouseover') {
      this.rectangle.rect.on('over', this.turnOnAnnotations);
      this.rectangle.rect.on('out', this.turnOffAnnotations);
      this.secant.segment.on('over', this.turnOnAnnotations);
      this.secant.segment.on('out', this.turnOffAnnotations);
    }
    else if (this.attr['annotations'] == 'on') {
      this.turnOnAnnotations();
    }
    else if (this.attr['annotations'] == 'secant') {
      this.secant.segment.on('over', this.secant.turnOnAnnotations);
      this.secant.segment.on('out', this.secant.turnOffAnnotations);
    } 
    else if (this.attr['annotations'] == 'rectangle') {
      this.secant.segment.on('over', this.rectangle.turnOnAnnotations);
      this.secant.segment.on('out', this.rectangle.turnOffAnnotations);
      this.rectangle.rect.on('over', this.rectangle.turnOnAnnotations);
      this.rectangle.rect.on('out', this.rectangle.turnOffAnnotations);
    }

    if ('attachButtonVisible' in this.attr && this.attr['attachButtonVisible'] == false) {
      this.attachButton.hide();
    }

  }

  slope() { return this.secant.slope(); }

  // interface functions
  area() { return this.rectangle.area(); }
  units() { return this.xint.units(); }
  rise() { return this.secant.rise(); }
  change() { return this.area(); }
  onUpdate() { this.xint.onUpdate(); } 
  setAttribute(d) { 
    for (let key in d) {
      this.attr[key] = d[key]
    }
  }  

  rectangleFunction() { 
    if (this.attachButton.state) {
      return this.f(this.xint.midX());      // height of rectangle is f is rateCurve
    }
    return  (this.f(this.xint.X2()) - this.f(this.xint.X1())) / this.xint.units();  // slope of secant 
  }

  secantFunction(x) {
    if (this.attachButton.state) {
      if (x == this.xint.X1()) { return this.xint.midY.Y(); }
      else { return this.xint.midY.Y() + this.f(this.xint.midX()) * this.xint.units(); }
    }
    return this.f(x);
  }

  turnOnAnnotations() {
      this.rectangle.turnOnAnnotations();
      this.secant.turnOnAnnotations();
  }

  turnOffAnnotations() {
      this.rectangle.turnOffAnnotations();
      this.secant.turnOffAnnotations();
  }

  delete() {
    this.rectangle.delete();
    this.secant.delete();
    this.xint.delete();
    if (this.attachButton != undefined) {
      this.attachButton.delete();
    } 
  }

  show() {
    this.secant.show();
    this.xint.midY.setAttribute({visible:true});
    this.rectangle.show();
  }
  hide() {
    this.secant.hide();
    this.rectangle.hide();
  }
}


////////////////////////////////////////////////////////////////////////////////////////////

// so this is a weird class with a fairly specific purpose
// I'm not going to fully extend it to implement the full Widget Interface
// we'll see how things develop 
class SecRectAdjArray extends BaseWidget {
  constructor(board, xint, F, N, attr) {
    super(board,attr);

    ///////////////////////////////////////////////////////  initialize data members
    this.xint = xint;
    this.elements = [];  
    this.N = N;
    this.snapMargin = 0.5;


    ///////////////////////////////////////////////////////  bind functions
    this.onUpdate = this.onUpdate.bind(this);
    this.X2 = this.X2.bind(this);
    this.changeStart = this.changeStart.bind(this);
    this.area = this.area.bind(this);
    this.change = this.change.bind(this);
    this.changeTextX = this.changeTextX.bind(this);
    this.changeTextY = this.changeTextY.bind(this);
    this.changeTextVal = this.changeTextVal.bind(this);  

    ///////////////////////////////////////////////////////  add components to JSXGraph board

    // an array of secant/rectangles
    for (let i = 0; i < N; i++) {
      let arrayXint = new XIntArrayElement(this.board, this.xint, i, N);
      this.elements.push(new SecantRectangle(arrayXint,F,attr));
      this.elements[this.elements.length - 1].attachButton.toggle();
    }

    // we do this so you can see the parent interval colors
    this.elements[0].xint.x1.setAttribute({visible:false});
    this.elements[this.elements.length-1].xint.x2.setAttribute({visible:false});

    // we have an extra annotation line that shows the 
    // accumulated change of all the secants
    this.p = this.board.create('point', [
      this.X2,
      this.changeStart], {visible:false});

    this.riseLine = this.board.create('segment', [
      this.elements[this.elements.length-1].secant.f2, 
      this.p], 
    {
      strokeColor: th.lightAnnote, 
      strokeWidth:th.strokeWidthAnnote, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

    this.changeText = this.board.create('text', [
      this.changeTextX,
      this.changeTextY,
      this.changeTextVal],
      {strokeColor: th.lightAnnote, fontSize: th.fontSizeAnnote, visible:false});

  }


  // these functions are needed callbacks for placing jsxgraph objects.
  X2() { return this.xint.X2(); }
  changeStart() { return this.elements[0].secant.fx1(); }


  // interface functions
  area() {
    let sum = 0;
    for (let i=0; i < this.elements.length; i++) {
      sum += this.elements[i].area();
    }
    return sum;
  }

  change() { return this.area(); }

  onUpdate() {                                         // first we snap together secants that are close
    for (let i=0; i < this.elements.length - 1; i++) {
      this.checkSecantSnap(i);
    }

    let allSnapped = true;                             // check to see if they are all snapped
    for (let i=0; i < this.elements.length - 1 && allSnapped; i++) {
      if (!this.elements[i].snapped) { allSnapped = false; }
    }

    if (allSnapped) {                                 // if they are all snapped then we turn on annotation
      this.riseLine.setAttribute({visible:true});
      this.changeText.setAttribute({visible:true});
    }
    else {
      this.riseLine.setAttribute({visible:false});
      this.changeText.setAttribute({visible:false});
    }

    this.xint.onUpdate();                           // update parent interval so it snaps to grid
  }

  // these are for placing the annotation
  changeTextX() { return this.xint.X2() + this.xint.Xerror; }
  changeTextY() { return this.changeStart() + this.change() / 2; }

  // snap the secants together
  checkSecantSnap(index) {
    let element = this.elements[index];
    let nextElement = this.elements[index + 1];
    let end = element.xint.midY.Y() + element.secant.change();
    let nextBegin = nextElement.xint.midY.Y();

    if (Math.abs(nextBegin - end) <  + this.snapMargin) {   // are we close beginning of next segment?
      element.xint.midY.moveTo([element.xint.midY.X(), nextBegin - element.secant.change()]);
      element.snapped = true;
    }
    else { 
      element.snapped = false;
    }
  }

  delete() {
    this.board.removeObject(this.changeText);
    this.board.removeObject(this.riseLine);
    this.board.removeObject(this.p);
    while (this.elements.length > 0) {
      let e = this.elements.pop();
      e.delete();
    }
    this.xint.delete();
  }
}

////////////////////////////////////////////////////////////////////////////////////////////


class RectangleArray extends BaseWidget {
  constructor(xint, F, slider, attr = { }) {
    super(xint.board, attr);
    ///////////////////////////////////////////////////////  initialize data members
    this.xint = xint;
    this.f = F;
    this.total_area = 0;
    this.slider = slider;

    ///////////////////////////////////////////////////////  bind functions
    this.updateDataArray = this.updateDataArray.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.area = this.area.bind(this);
    this.rise = this.rise.bind(this);
    this.units = this.units.bind(this);
    this.change = this.change.bind(this);
    this.changeTextX = this.changeTextX.bind(this);
    this.changeTextY = this.changeTextY.bind(this);
    this.changeTextVal = this.changeTextVal.bind(this);
    this.turnOnAnnotations = this.turnOnAnnotations.bind(this);
    this.turnOffAnnotations = this.turnOffAnnotations.bind(this);
    

    ///////////////////////////////////////////////////////  data members with callbacks
    this.rectangles = this.board.create('curve', [[0],[0]], {
      strokeColor: th.stroke,
      fillColor:th.fill, 
      fillOpacity:th.fillOpacity, 
      highlightStrokeColor:th.highlightStroke,
      highlightFillColor:th.highlightFill, 
      highlightFillOpacity:th.fillOpacity, 
      highlightStrokeWidth:1,
      hasInnerPoints:true
    });

    this.changeText = this.board.create('text', [
      this.changeTextX,
      this.changeTextY,
      this.changeTextVal],
      { strokeColor: th.lightAnnote, fontSize:th.fontSizeAnnote, visible:false });

    ///////////////////////////////////////////////////////  attribute settings
    this.rectangles.updateDataArray = this.updateDataArray;

    this.setUpAnnotations();

    if ('snapMargin' in this.attr) {
      this.xint.setSnapMargin(this.attr['snapMargin']);
    }
  }


  // interface functions
  area() { return this.total_area; }
  rise() { return 0; }
  units() { return this.xint.units(); }
  change() { return this.area(); }
  onUpdate() { this.xint.onUpdate(); } 
  setAttribute(d) { 
    for (let key in d) {
      this.attr[key] = d[key]
    }
  }  

  updateDataArray() {
    this.total_area = 0;
    let x1 = this.xint.X1();
    let x2 = this.xint.X2();
    let deltaP = (x2 - x1) / this.slider.value();
    let x = [x1];
    let y = [0];
    let lastRect = x2 - deltaP + 0.01;
    for (let i=x1; i < lastRect; i += deltaP) {

      let height = this.f(i + deltaP/2);
      x.push(i);  // four points of our rectangle
      y.push(height);

      x.push(i + deltaP);
      y.push(height);

      x.push(i + deltaP);
      y.push(0);

      this.total_area += deltaP * height;
    }

    this.rectangles.dataX = x;
    this.rectangles.dataY = y;
  }

  // manage the placement of area text
  changeTextX() { return this.xint.X2() + this.xint.Xerror; }
  changeTextY() { return this.f(this.xint.X2()) / 2; }

  
  // call back functions for annotations
  turnOnAnnotations() {
    this.changeText.setAttribute({visible:true});
  }
  turnOffAnnotations() {
    this.changeText.setAttribute({visible:false});
  }

  delete() {
    this.board.removeObject(this.rectangles);
    this.board.removeObject(this.changeText);
    this.slider.delete();
    this.xint.delete();
  }

  setUpAnnotations() {
    if (!('annotations' in this.attr) || this.attr['annotations'] == 'mouseover') {
      this.rectangles.on('over', this.turnOnAnnotations);
      this.rectangles.on('out', this.turnOffAnnotations);
    }
    else if (this.attr['annotations'] == 'on') {
      this.turnOnAnnotations();
    }
  }

  show() {
    this.slider.show();
    this.xint.show();
    this.rectangles.setAttribute({visible:true});
    this.setUpAnnotations();
  }

  hide() {
    this.slider.hide();
    this.xint.hide();
    this.rectangles.setAttribute({visible:false});
  }
}


////////////////////////////////////////////////////////////////////////////////////////////



class SecantArray extends BaseWidget {
  constructor(xint, F, slider, attr = { }) {
    super(xint.board, attr);

    ///////////////////////////////////////////////////////  initialize data members
    this.xint = xint;
    this.f = F;  
    this.total_area = 0;
    this.slider = slider;

    ///////////////////////////////////////////////////////  bind functions
    this.updateDataArray = this.updateDataArray.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.area = this.area.bind(this);
    this.rise = this.rise.bind(this);
    this.units = this.units.bind(this);
    this.change = this.change.bind(this);
    this.fx1 = this.fx1.bind(this);
    this.fx2 = this.fx2.bind(this);
    this.changeTextX = this.changeTextX.bind(this);
    this.changeTextY = this.changeTextY.bind(this);
    this.changeTextVal = this.changeTextVal.bind(this);
    this.turnOnAnnotations = this.turnOnAnnotations.bind(this);
    this.turnOffAnnotations = this.turnOffAnnotations.bind(this);


    ///////////////////////////////////////////////////////  data members with callbacks
    this.secants = this.board.create('curve', [[0],[0]], { 
      strokecolor:th.stroke, 
      strokeWidth:th.strokeWidth,
      highlightStrokeColor:th.stroke,
      highlightStrokeWidth:th.strokeWidth
    }); 

    this.f2 = this.board.create('point', [
      this.xint.X2, 
      this.fx2], 
      {visible:false});

    this.p1 = this.board.create('point',[ 
      this.xint.X2, 
      this.fx1],
      {visible:false});

    this.riseLine = this.board.create('segment', [this.p1, this.f2], 
    {
      strokeColor: th.darkAnnote, 
      strokeWidth:th.strokeWidthAnnote, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

    this.changeText = this.board.create('text', [
      this.changeTextX,
      this.changeTextY,
      this.changeTextVal],
      {strokeColor: th.lightAnnote, fontSize: th.fontSizeAnnote, visible:false});

    ///////////////////////////////////////////////////////  attribute settings

    this.secants.updateDataArray = this.updateDataArray;

    this.setUpAnnotations();

    if ('snapMargin' in this.attr) {
      this.xint.setSnapMargin(this.attr['snapMargin']);
    }
  }

  fx1() { return this.secants.dataY[0]; }
  fx2() { return this.secants.dataY[this.secants.dataY.length - 1]; }

  // interface functions
  area() { return 0; }
  rise() { return this.fx2() - this.fx1(); }
  units() { return this.xint.units(); }
  change() { return this.rise(); }
  onUpdate() { this.xint.onUpdate(); } 
  setAttribute(d) { 
    for (let key in d) {
      this.attr[key] = d[key]
    }
  }  

  // this is all for the rise string annotation
  changeTextX() { return this.xint.X2() + this.xint.Xerror/2;}
  changeTextY() { return this.fx1() + this.rise() / 2; }


  updateDataArray() {
    let x1 = this.xint.X1();
    let x2 = this.xint.X2();
    let deltaP = (x2-x1) / this.slider.value();
    let x = [];
    let y = [];
    let lastPoint = x2 + 0.01;
    for (let i=x1; i <= lastPoint; i += deltaP) {
      x.push(i);
      y.push(this.f(i));
    }
    this.secants.dataX = x;
    this.secants.dataY = y;
  }

  // call back functions for annotations
  turnOnAnnotations() {
    this.riseLine.setAttribute({visible:true});
    this.changeText.setAttribute({visible:true});
  }
  turnOffAnnotations() {
    this.riseLine.setAttribute({visible:false});
    this.changeText.setAttribute({visible:false});
  }

  delete() {
    this.board.removeObject(this.secants);
    this.board.removeObject(this.p1);
    this.board.removeObject(this.f2);
    this.board.removeObject(this.riseLine);
    this.board.removeObject(this.changeText);
    this.slider.delete();
    this.xint.delete();
  }

  setUpAnnotations() {
    if (!('annotations' in this.attr) || this.attr['annotations'] == 'mouseover') {
      this.secants.on('over', this.turnOnAnnotations);
      this.secants.on('out', this.turnOffAnnotations);
    }
    else if (this.attr['annotations'] == 'on') {
      this.turnOnAnnotations();
    }
  }

  show() {
    this.slider.show();
    this.xint.show();
    this.secants.setAttribute({visible:true});
    this.setUpAnnotations();
  }

  hide() {
    this.xint.hide();
    this.slider.hide();
    this.secants.setAttribute({visible:false});
    this.riseLine.setAttribute({visible:false});
    this.changeText.setAttribute({visible:false});
  }

}


////////////////////////////////////////////////////////////////////////////////////////////


class SecantRectArray {
  constructor(xint, F, slider, attr = {}) {
    ///////////////////////////////////////////////////////  initialize data members
    this.board = xint.board;
    this.xint = xint;
    this.f = F;
    this.attr = attr;
    this.precision = 2;
    let boundingBox = this.board.getBoundingBox();
    this.boardwidth = (boundingBox[2] - boundingBox[0]);  
    this.slider = slider;

    ///////////////////////////////////////////////////////  bind functions
    this.rectangleFunction = this.rectangleFunction.bind(this);
    this.updateSecantData = this.updateSecantData.bind(this);
    this.turnOnAnnotations = this.turnOnAnnotations.bind(this);
    this.turnOffAnnotations = this.turnOffAnnotations.bind(this);
    this.deltaPX = this.deltaPX.bind(this);
    this.constant = this.constant.bind(this);
    this.switchFunctions = this.switchFunctions.bind(this);
    this.area = this.area.bind(this);
    this.rise = this.rise.bind(this);
    this.units = this.units.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.change = this.change.bind(this);

    ///////////////////////////////////////////////////////  data members with callback functions
    this.attachButton = new BoolButton(this.xint.board, [this.xint.attachLeftX, this.xint.attachY], 'attach',); 
    this.rectangles = new RectangleArray(xint, this.rectangleFunction, this.slider, this.attr);
    this.secants = new SecantArray(xint, this.f, this.slider, this.attr);
    this.xint.midY.setAttribute({visible:true});

    ///////////////////////////////////////////////////////  attribute settings

    this.setUpAnnotations();

    if ('precision' in this.attr) {
      this.precision = this.attr['precision'];
    }

    if ('snapMargin' in this.attr) {
      this.xint.setSnapMargin(this.attr['snapMargin']);
    }

    if ('attachButtonVisible' in this.attr && this.attr['attachButtonVisible'] == false) {
      this.attachButton.g.setAttribute({visible:false});
      this.attachButton.l1.setAttribute({visible:false});
      this.attachButton.l2.setAttribute({visible:false});
    }

    this.attachButton.toggleCallback = this.switchFunctions;
  }


  // interface functions
  area() { return this.rectangles.area(); }
  rise() { return this.secants.rise(); }
  units() { return this.xint.units(); }
  change() { return this.rise(); }
  onUpdate() { this.xint.onUpdate(); } 
  setAttribute(d) { 
    for (let key in d) {
      this.attr[key] = d[key]
    }
  }  
  

  rectangleFunction(x) { 
    if (this.attachButton.state) {
      return this.f(x);      // rectangle curve is attached
    }
    let dx = this.deltaPX();
    return  (this.f(x + dx/2) - this.f(x - dx/2)) / dx;  // slope of secant 
  }

  // helper functions for updateSecantData
  deltaPX() { return this.xint.units() / this.slider.value(); }
  constant() { return this.xint.midY.Y(); }

  updateSecantData() {
    let x1 = this.xint.X1();
    let deltaP = this.deltaPX();
    let x = [x1];
    let y = [this.constant()];
    let cum = 0;
    for (let i=1; i <= this.slider.value(); i += 1) {
      let newX = x1 + i * deltaP;
      x.push(newX);
      cum += this.f(newX - deltaP/2) * deltaP;  // first get the area of current rectangle
      y.push(cum + this.constant());                      // sum of all rectangles so far.
    }
    this.secants.secants.dataX = x;
    this.secants.secants.dataY = y;
  }

  switchFunctions() {
    if (this.attachButton.state) {
      this.secants.secants.updateDataArray = this.updateSecantData; 
    } else {
      this.secants.secants.updateDataArray = this.secants.updateDataArray; 
    }
  }

  turnOnAnnotations() {
      this.rectangles.turnOnAnnotations();
      this.secants.turnOnAnnotations();
  }
  turnOffAnnotations() {
      this.rectangles.turnOffAnnotations();
      this.secants.turnOffAnnotations();
  }

  delete() {
    this.rectangles.delete();
    this.secants.delete();
    this.xint.delete();
    this.slider.delete();
    this.attachButton.delete();
  }

  setUpAnnotations() {
    if (!('annotations' in this.attr) || this.attr['annotations'] == 'mouseover') {
      this.rectangles.rectangles.on('over', this.turnOnAnnotations);
      this.rectangles.rectangles.on('out', this.turnOffAnnotations);
      this.secants.secants.on('over', this.turnOnAnnotations);
      this.secants.secants.on('out', this.turnOffAnnotations);
    }
    else if (this.attr['annotations'] == 'on') {
      this.turnOnAnnotations();
    }
    else if (this.attr['annotations'] == 'secant') {
      this.secants.secants.on('over', this.secants.turnOnAnnotations);
      this.secants.secants.on('out', this.secants.turnOffAnnotations);
    }
  }

  show() {
    this.rectangles.show();
    this.secants.show();
    this.xint.midY.setAttribute({visible:true});
    this.setUpAnnotations();
  }

  hide() {
    this.secants.hide();
    this.rectangles.hide();
  }
}

////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////


class EpsilonDeltaLimit {
  constructor(board, F, xVal, lVal, attr = {}) {

    ///////////////////////////////////////////////////////  initialize data members
    this.board = board;
    this.f = F;
    this.xValue = xVal;               // the x value we are taking the limit at
    this.lValue = lVal;               // limit at x
    this.attr = attr;
    this.deltaStrategy = undefined;   // strategy for reducing delta in response to epsilon
    this.yaxis = this.board.create('line', [[0,0],[0,1]], {visible:false});  // y axis line
    this.xaxis = this.board.create('line', [[0,0],[1,0]], {visible:false});  // x axis line

    let bb = this.board.getBoundingBox();  // get the board dimensions
    let ylow = bb[3];
    let yhigh = bb[1];
    let xlow = bb[0];
    let xhigh = bb[2];
    let firstDelta = (xhigh - xlow) * 0.2;
    let firstEpsilon = (yhigh - ylow) * 0.1;
    this.Yerror = (bb[1] - bb[3]) / 100;  // give the widgets access to them.
    this.Xerror = (bb[2] - bb[0]) / 100;  // like they have access to the board


    this.deltaP = this.board.create('glider', [this.xValue - firstDelta, 0, this.xaxis], {
      color:th.startPoint, size:4, name:'' });
    this.epsilonP = this.board.create('glider', [0,this.lValue - firstEpsilon ,this.yaxis], {
      color:th.stroke2, size:4, name:''});

    ///////////////////////////////////////////////////////  bind functions
    this.limit = this.limit.bind(this);
    this.X = this.X.bind(this);
    this.leftB = this.leftB.bind(this);
    this.rightB = this.rightB.bind(this);
    this.lowerB = this.lowerB.bind(this);
    this.upperB = this.upperB.bind(this);
    this.onUpdate = this.onUpdate.bind(this);


    ///////////////////////////////////////////////////////  data members with callback functions
    this.Xline = this.board.create('line', [[this.X,0],[this.X,1]], 
      {strokeColor:this.darkAnnote, strokeWidth:1});
    this.Lline = this.board.create('line', [[0,this.limit], [1,this.limit]], 
      {strokeColor:th.darkAnnote, strokeWidth:1});

    this.active = this.board.create('functiongraph', 
      [this.f, this.leftB ,this.rightB], {strokeColor:th.stroke, strokeWidth:3});
    this.p1 = this.board.create('point', [this.leftB, ylow], {visible:false});
    this.p2 = this.board.create('point', [this.leftB, yhigh], {visible:false});
    this.p3 = this.board.create('point', [this.rightB, ylow], {visible:false});
    this.p4 = this.board.create('point', [this.rightB, yhigh], {visible:false});
    this.xRect = this.board.create('polygon', [this.p1,this.p2,this.p4,this.p3], {
     fillColor:th.fill, 
     fillOpacity: 0.05,
     highlightFillColor:th.fill,
     highlightFillOpacity: 0.1,
     borders: { strokeColor:th.verylightAnnote, highlightStrokeColor: th.verylightAnnote}
    });

    this.p5 = this.board.create('point', [xlow, this.lowerB ], {visible:false});
    this.p6 = this.board.create('point', [xhigh, this.lowerB], {visible:false});
    this.p7 = this.board.create('point', [xlow, this.upperB], {visible:false});
    this.p8 = this.board.create('point', [xhigh, this.upperB], {visible:false});
    this.lRect = this.board.create('polygon', [this.p5,this.p6,this.p8,this.p7], {
      fillColor:th.fill2,
      fillOpacity: 0.1,
      highlightFillColor: th.fill2,
      highlightFillOpacity: 0.1 ,
      borders: {strokeColor:th.stroke2, highlightStrokeColor:th.stroke2}
    });
  }

  limit() { return this.lValue; }
  X() { return this.xValue; }
  leftB() { return this.deltaP.X(); }
  rightB() { return this.xValue + (this.xValue - this.deltaP.X()); }
  lowerB() { return this.epsilonP.Y(); }
  upperB() { return this.lValue + (this.lValue - this.epsilonP.Y());}
  delta() { return Math.abs(this.xValue - this.deltaP.X()); }
  epsilon() { return Math.abs(this.lValue - this.epsilonP.Y()); }


  setLimit(l) { this.lValue = l; }
  setX(x) { this.xValue = x; }
  setDeltaStrategy(f) { this.deltaStrategy = f; }

  reduceEpsilon(moveTime = 0, cbf = function(){ }) {
    this.epsilonP.moveTo(
      [0,this.epsilonP.Y() + (this.lValue - this.epsilonP.Y()) / 2 ],
      moveTime, {effect: '--', callback: cbf});
  }

  reduceDelta(moveTime = 0) {
    if (this.deltaStrategy !== undefined) {
      this.deltaP.moveTo([this.xValue - this.deltaStrategy(this.epsilon()),0],moveTime, {effect: '--'});
    }
    return;
  }

  checkDelta() {
    const dt = this.delta() / 50;
    for (let i = this.leftB(); i < this.rightB(); i += dt) {
      if (this.f(i) < this.lowerB() || this.f(i) > this.upperB()) {
        return false;
      }
    }
    return true;
  }

  delete() {
    this.board.removeObject(this.lRect);
    this.board.removeObject(this.p8);
    this.board.removeObject(this.p7);
    this.board.removeObject(this.p6);
    this.board.removeObject(this.p5);
    this.board.removeObject(this.epsilonP);
    this.board.removeObject(this.Lline);
    this.board.removeObject(this.yaxis);
    this.board.removeObject(this.Xline);
    this.board.removeObject(this.xRect);
    this.board.removeObject(this.p4);
    this.board.removeObject(this.p3);
    this.board.removeObject(this.p2);
    this.board.removeObject(this.p1);
    this.board.removeObject(this.active);
    this.board.removeObject(this.deltaP);
    this.board.removeObject(this.xaxis);
  }

  showEpsilon() {
    this.lRect.setAttribute({visible:true});
    this.epsilonP.setAttribute({visible:true});
    this.Lline.setAttribute({visible:true});
    for (let i=0; i < this.lRect.borders.length; i++) {
      this.lRect.borders[i].setAttribute({visible:true});
    }
  }

  showDelta() {
    this.xRect.setAttribute({visible:true});
    this.Xline.setAttribute({visible:true});
    this.active.setAttribute({visible:true});
    this.deltaP.setAttribute({visible:true});
    for (let i=0; i < this.xRect.borders.length; i++) {
      this.xRect.borders[i].setAttribute({visible:true});
    }
  }

  hideEpsilon() {
    this.lRect.setAttribute({visible:false});
    this.epsilonP.setAttribute({visible:false});
    this.Lline.setAttribute({visible:false});
    for (let i=0; i < this.lRect.borders.length; i++) {
      this.lRect.borders[i].setAttribute({visible:false});
    }
  }

  hideDelta() {
    this.xRect.setAttribute({visible:false});
    this.Xline.setAttribute({visible:false});
    this.active.setAttribute({visible:false});
    this.deltaP.setAttribute({visible:false});
    for (let i=0; i < this.xRect.borders.length; i++) {
      this.xRect.borders[i].setAttribute({visible:false});
    }
  }

  show() {
    this.showDelta();
    this.showEpsilon();
  }

  hide() {
    this.hideDelta();
    this.hideEpsilon();
  }

  onUpdate() {}
}

////////////////////////////////////////////////////////////////////////////////////////////

class ApproachLimit {
  constructor(board, F, xV, fxV, attr = {}) {

    ///////////////////////////////////////////////////////  initialize data members
    this.board = board;
    this.f = F;
    this.xValue = xV;
    this.fxValue = fxV;
    this.attr = attr;
    let boundingBox = this.board.getBoundingBox();         // I've added these errors here to 
    this.Yerror = (boundingBox[1] - boundingBox[3]) / 100;  // give the widgets access to them.
    this.Xerror = (boundingBox[2] - boundingBox[0]) / 100;  // like they have access to the board
    this.precision = 2;

    this.xaxis = this.board.create('line', [[0,0],[1,0]], {visible:false});  // x axis line   
    this.glider = this.board.create('glider', [0,0, this.xaxis], {
      name:'', face:'^', size:12, color:th.fill});

    if (this.f(this.xValue) !== undefined && (this.fxValue == undefined || this.fxValue !== this.f(this.xValue))) {
      this.hole = this.board.create('point', [this.xValue, this.f(this.xValue)], { 
        name:'', 
        strokeColor: th.verylightAnnote, 
        fillColor: '#FFFFFF', 
        fillOpacity:0.6, size:4, fixed:true});
    }

    if (this.fxValue !== undefined && this.fxValue !== this.f(this.xValue)) {
      this.fxPoint = this.board.create('point', [this.xValue, this.fxValue], 
        {name:'', color:th.verylightAnnote});
    }

    this.gliderX = this.gliderX.bind(this);
    this.fx = this.fx.bind(this);
    this.textX = this.textX.bind(this);
    this.textY = this.textY.bind(this);
    this.textVal = this.textVal.bind(this);
    this.onUpdate = this.onUpdate.bind(this);

    this.p = this.board.create('point', [
     this.gliderX,
     this.fx,
     ], {name:'', size:4, color:th.stroke})

    this.fVal = this.board.create('text',[
      this.textX,
      this.textY,
      this.textVal],{fontSize:14});

  }


  gliderX() { return this.glider.X(); }
  textX() { return this.glider.X() + this.Xerror; }
  textY() { 
    if (this.p.X() == this.xValue && this.fxValue !== undefined ) {
      return this.fxValue + this.Yerror;
    }
    return this.f(this.glider.X()) + this.Yerror; 
  }
  textVal() { 
    if (this.p.X() == this.xValue) {
      if (this.fxValue == undefined){
        return 'UNDEFINED';
      }
      return '(' + this.p.X().toFixed(2) + ',' + this.fxValue.toFixed(2) + ')'; 
    }
    return '(' + this.p.X().toFixed(this.precision) + ',' + this.p.Y().toFixed(this.precision) + ')'; 
  }

  // if function is undefined at this point it will still return a number
  fx() {                                     
    if (this.glider.X() == this.xValue && this.fxValue != undefined) { 
      return this.fxValue; 
    }
    return this.f(this.glider.X()); 
  }

  onUpdate() {
    let delta = Math.abs(this.xValue - this.p.X());
    if (delta !== 0) {
      let pr = 2;
      while (Math.floor(delta * Math.pow(10,pr)) == 0) {
        pr += 1;
      }
      this.precision = pr;
      this.p.setAttribute({visible:true});
    }
    else {
      if (this.fxValue == undefined) {
        this.p.setAttribute({visible:false});
      }
    }
  }

  reduceDelta(cbf = function() {}) {
    this.glider.moveTo([this.glider.X() + (this.xValue - this.glider.X()) / 2,0],1000, {effect: '--', callback: cbf} );
  }

  eliminateDelta() {
    this.glider.moveTo([this.xValue,0],1000, {effect: '--'} );
  }

  show() {
    if (this.hole) {
      this.hole.setAttribute({visible:true});
    }
    if (this.fxPoint) {
      this.fxPoint.setAttribute({visible:true});
    }
    this.glider.setAttribute({visible:true});
    this.p.setAttribute({visible:true});
    this.fVal.setAttribute({visible:true});
  }

  hide() {
    this.glider.setAttribute({visible:false});
    this.p.setAttribute({visible:false, size:0});  // there's some kind of weird bug in jsxgraph
    this.fVal.setAttribute({visible:false});

    if (this.hole) {
      this.hole.setAttribute({visible:false});
    }
    if (this.fxPoint) {
      this.fxPoint.setAttribute({visible:false});
    }

  }

  delete() {
    if (this.hole) {
      this.board.removeObject(this.hole);
    }
    if (this.fxPoint) {
      this.board.removeObject(this.fxPoint);
    }
    this.board.removeObject(this.glider);
    this.board.removeObject(this.p);
    this.board.removeObject(this.fVal);
    this.board.removeObject(this.xaxis);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////


class ProblemFunction {
  constructor(F, title, titleanchor, range, points) {
    this.f = F;
    this.title = title;
    this.tanchor = titleanchor;
    this.range = range;
    this.points = points;
  }
}

class GraphedFunction extends ProblemFunction {
  constructor(F, graph, points, title) {
    super(F.f, F.title, F.tanchor, F.range, F.points);
      this.graph = graph;
      this.points = points;
      this.title = title;
  }
}



class StandardBoard {
  constructor(divName, Box, attributes = { xlabel: '', ylabel:'', colorTheme:'blue'}) {
    this.atb = attributes;
    this.functions = [];
    this.Yerror = (Box[1] - Box[3]) / 50;  
    this.Xerror = (Box[2] - Box[0]) / 50;

    JXG.Options.axis.ticks.majorHeight = 40;
    this.board = JXG.JSXGraph.initBoard(divName, { 
      boundingbox:Box, 
      keepaspectratio:false, 
      axis:false, 
      showCopyright:false,
      showNavigation:false,
    });

    // some fabulous hackery to figure out the placement of the text
    let fakeY = this.board.create('text', [0,Box[3] - 2,this.atb.ylabel],{visible:true, fontSize:16});
    fakeY.updateSize();
    if (!('offsetX' in this.atb)) { this.atb['offsetX'] = [-80, 20]; }
    if (!('offsetY' in this.atb)) { this.atb['offsetY'] = [-fakeY.getSize()[0] - 20, 0]; }

    this.xaxis = this.board.create('axis', [[0, 0], [1,0]], { 
      name:this.atb.xlabel, 
      withLabel: true,
      label: {
        fontSize: 16,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: this.atb.offsetX   // (in pixels)
      }
    });
    this.yaxis = this.board.create('axis', [[0, 0], [0, 1]], {
      name:this.atb.ylabel, 
      withLabel: true, 
      label: {
        fontSize: 16,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: this.atb.offsetY   // (in pixels)
      }
    });

    this.board.removeObject(fakeY);   
  }

  

  addFunction(F) {
    let graph = this.board.create('functiongraph', [
      F.f,
      F.range[0],
      F.range[1]], {
        strokeColor:th.verylightAnnote, 
        highlightStrokeColor:th.verylightAnnote,
        strokeWidth:1, 
        visible:true
      });

    let points = [];
    for (let i=0; i < F.points.length; i++) {
      let point = this.board.create('point', [
        F.points[i],
        F.f(F.points[i])], { name:'', color:th.verylightAnnote, fixed:true});
      points.push(point);
    }
    let title = this.board.create('text', [
      F.tanchor + this.Xerror,
      F.f(F.tanchor),
      F.title], { color:th.darkAnnote, visible: false });
    
    graph.on('over', function() { 
      title.setAttribute({visible:true});
    });
    graph.on('out', function() {
      title.setAttribute({visible:false});
    });
    this.functions.push(new GraphedFunction(F, graph, points, title));
    return this.functions.length - 1;
  }
}

let widgetConstructor = {
    0 : function(xint, F, attr) { return new Rectangle(xint, F, attr); },
    1 : function(xint, F, attr) { return new Secant(xint, F, attr); },
    2 : function(xint, F, attr) { return new SecantRectangle(xint, F, attr); },
    3 : function(xint, F, attr) { 
      let slider = new IntSlider(xint.board, [xint.attachRightX, xint.attachY], [1, 100], 'N');
      return new RectangleArray(xint, F, slider, attr); 
    },
    4 : function(xint, F, attr) { 
      let slider = new IntSlider(xint.board, [xint.attachRightX, xint.attachY], [1, 100], 'N');
      return new SecantArray(xint, F, slider, attr); 
    },
    5 : function(xint, F, attr) { 
      let slider = new IntSlider(xint.board, [xint.attachRightX, xint.attachY], [1, 100], 'N');
      return new SecantRectArray(xint, F, slider, attr); 
    },
    6 : function(xint, F, attr) { return new AdjHeightRectangle(xint, F, attr); },
}

let themeConstructor = {
  'blue' : function() { th = new BlueTheme(); },
  'steel' : function() { th = new SteelTheme(); }
}

class Workspace extends StandardBoard {
  constructor(divName, Box, attributes = {}) {
    super(divName, Box, attributes)
    this.elements = [];
    this.limits = [];

    this.onUpdate = this.onUpdate.bind(this);
    this.rise = this.rise.bind(this);
    this.area = this.area.bind(this);
    this.maxX = this.maxX.bind(this);

    if ('colorTheme' in attributes) {
      if(attributes['colorTheme']  in themeConstructor) {
        themeConstructor[attributes['colorTheme']]();
      }
    }
    else {
        th = new BlueTheme();
    }
  
  }

  onUpdate() {
    for (let i=0; i < this.elements.length; i++) {
      this.elements[i].onUpdate();
    }
  }

  maxX() {
    // this needs an error when there are no elements

    let max = 0;  // probably small enough 
    for (let i=0; i < this.elements.length; i++) {
      if (this.elements[i].xint.X2() > max) {
        max = this.elements[i].xint.X2();
      }
    }
    return max;
  }

  addElement(e) {
    this.elements.push(e);
  } 

  area() {
    let sum = 0;
    for (let i=0; i < this.elements.length; i++) {
      sum += this.elements[i].area();
    }
    return sum;
  }

  rise() {
    let sum = 0;
    for (let i=0; i < this.elements.length; i++) {
      sum += this.elements[i].rise();
    }
    return sum;
  }  

  undo() {
    if (this.elements.length > 0 ) {
      this.elements[this.elements.length - 1].delete();
      this.elements.pop();
    }
  }

  addElementByID(id, percent, f_id, attr) {

    // figure out the interval
    let xlow = this.board.getBoundingBox()[0];
    let xhigh = this.board.getBoundingBox()[2];

    let width = xhigh - xlow;
    let x1 = xlow + width * percent;
    let x2 = x1 + width * 0.1;
    if (x2 > xhigh) { x2 = xhigh; }
    let xint = new XInterval(this.board, x1, x2);

    if(!widgetConstructor[id]) {
      console.log('bad widget type', id);
      return;
    }
    this.elements.push(widgetConstructor[id](xint, this.functions[f_id].f, attr));
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

  exports.Rectangle = Rectangle;
  exports.AdjHeightRectangle = AdjHeightRectangle;
  exports.Secant = Secant;
  exports.SecantRectangle = SecantRectangle;
  exports.RectangleArray = RectangleArray;
  exports.SecantArray = SecantArray;
  exports.SecantRectArray = SecantRectArray;
  exports.ProblemFunction = ProblemFunction;
  exports.XInterval = XInterval;
  exports.StandardBoard = StandardBoard;
  exports.Workspace = Workspace;
  exports.textWidth = textWidth;
  exports.Segment = Segment;
  exports.showAFFactory = showAFFactory;
  exports.hideAFFactory = hideAFFactory;
  exports.SecRectAdjArray = SecRectAdjArray;
  exports.XIntAFEndpoints = XIntAFEndpoints;
  exports.BlueTheme = BlueTheme;
  exports.SteelTheme = SteelTheme;
  exports.EpsilonDeltaLimit = EpsilonDeltaLimit;
  exports.ApproachLimit = ApproachLimit;


});

