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
    this.xdelta = 3 * this.Xerror;
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

  X2() { return this.X1() + this.xdelta; }
  gliderX() { return this.g.X(); }
  textX() { return  this.X1() + this.xdelta + this.Xerror; }

  value() {
    let percent = (this.g.X() - this.X1()) / this.xdelta;
    return (this.low + (this.high - this.low) * percent).toFixed(this.precision);
  }

  stringValue() { return this.name + '        ' + this.value().toString(); }

  setValue(v) {
    if (v < this.low || v > this.high) return;
    let percent = (v - this.low)/(this.high - this.low);
    this.g.moveTo([this.X1() + percent * this.xdelta ,this.Y()]);
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
    this.xdelta = 0;
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


/*
   This creates an interval on the X axis.  The interval can be resized with two gliders x1 and x2 on 
   the X axis.  There is also a vertical glider midY in the middle of the interval.
*/
class XInterval {
  constructor(b, X1, X2) {
    this.board = b;
    this.snapToGrid = true;
    this.snapMargin = 0.05;

    let boundingBox = this.board.getBoundingBox();         // I've added these errors here to 
    this.Yerror = (boundingBox[1] - boundingBox[3]) / 100;  // give the widgets access to them.
    this.Xerror = (boundingBox[2] - boundingBox[0]) / 100;  // like they have access to the board

    // create two gliders on the x axis
    this.xline = this.board.create('line', [[0,0],[1,0]], {visible:false});  // x axis line
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

    // create a vertical glider at the midpoint of the interval
    this.vline = b.create('line', [[this.midX ,0], [this.midX, 1]], {visible:false});
    this.midY = b.create('glider', [this.midX(), 0, this.vline], {
      name: '', size:4, color:th.stroke, visible:false, showInfoBox:false});
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

  unitsTextWidth() {
    if (this.unitsText == undefined ) return 0;
    this.unitsText.updateSize();
    return this.unitsText.getSize()[0] * this.boardwidth / this.board.canvasWidth;
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
    this.unitsTextWidth = this.unitsTextWidth.bind(this);
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
      this.unitsTextX,
      this.unitsTextY,
      this.unitsTextVal],
      {strokeColor: th.lightAnnote, fontSize: th.fontSizeAnnote, visible:false});

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
  rateTextY() { return this.f1.Y() + this.change() / 2; }
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


  unitsTextX() { return this.midX() - this.unitsTextWidth()/2; }
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
    this.unitsTextWidth = this.unitsTextWidth.bind(this);
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
      this.unitsTextVal],
      {strokeColor: th.lightAnnote, fontSize: th.fontSizeAnnote, visible:false});

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
  rateTextY() { return this.fx1() + this.rise() / 2; }
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
  changeTextY() { return this.fx1() + this.rise() / 2; }
  

  // this is all for the units string annotation
  unitsTextX() { return this.xint.midX() - this.unitsTextWidth()/2; }
  unitsTextY() { 
    if (this.f1.Y() <= this.f2.Y())  {
      return this.f1.Y() - 3 * this.xint.Yerror; 
    }
    return this.f1.Y() + 3 * this.xint.Yerror;     
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
      {color: th.stroke, size:3, name:'', visible:true});

    this.f2 = this.board.create('point', [
      this.xint.X2, 
      this.height], 
      {color: th.stroke, size:3, name:'', visible:true});

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
      { strokeColor: th.darkAnnote, fontSize:th.fontSizeAnnote, visible:false });

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
        fontSize: th.fontSizeAnnote, visible:false});


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
  wdY() { return this.height() + 2 * this.xint.Yerror; }
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
  changeTextX() { return this.xint.midX() - this.changeTextWidth()/2; }
  changeTextY() { return this.height() / 2; }


  // this mangages the height text annotation
  rateTextX() { 
    if (this.xint.X1() < this.xint.X2()) {
      return this.hdX() + this.xint.Xerror;
    }
    return this.hdX() - this.rateTextWidth() - this.xint.Xerror; 
  }
  rateTextY() { return this.height() / 2 }


  // this mangages the width text annotation
  unitsTextX() { return this.xint.midX() - this.unitsTextWidth()/2; }
  unitsTextY() { return this.height() + 4 * this.xint.Yerror; }

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
    this.rectangle.show();
  }
  hide() {
    this.secant.hide();
    this.rectangle.hide();
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
    let delta = (x2 - x1) / this.slider.value();
    let x = [x1];
    let y = [0];
    let lastRect = x2 - delta + 0.01;
    for (let i=x1; i < lastRect; i += delta) {

      let height = this.f(i + delta/2);
      x.push(i);  // four points of our rectangle
      y.push(height);

      x.push(i + delta);
      y.push(height);

      x.push(i + delta);
      y.push(0);

      this.total_area += delta * height;
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
    let delta = (x2-x1) / this.slider.value();
    let x = [];
    let y = [];
    let lastPoint = x2 + 0.01;
    for (let i=x1; i <= lastPoint; i += delta) {
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
    this.deltaX = this.deltaX.bind(this);
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
    let dx = this.deltaX();
    return  (this.f(x + dx/2) - this.f(x - dx/2)) / dx;  // slope of secant 
  }

  // helper functions for updateSecantData
  deltaX() { return this.xint.units() / this.slider.value(); }
  constant() { return this.xint.midY.Y(); }

  updateSecantData() {
    let x1 = this.xint.X1();
    let x2 = this.xint.X2();
    let delta = this.deltaX();
    let x = [];
    let y = [];
    let lastPoint = x2 + 0.01;
    let cum = 0;
    for (let i=x1; i <= lastPoint; i += delta) {
      x.push(i);
      cum += this.f(i - delta/2) * delta;  // first get the area of current rectangle
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
    this.setUpAnnotations();
  }

  hide() {
    this.secants.hide();
    this.rectangles.hide();
  }
}




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
      showCopyright:false
    });

    // some fabulous hackery to figure out the placement of the text
    let fakeY = this.board.create('text', [0,Box[3] - 2,this.atb.ylabel],{visible:true, fontSize:16});
    fakeY.updateSize();

    this.xaxis = this.board.create('axis', [[0, 0], [1,0]], { 
      name:this.atb.xlabel, 
      withLabel: true,
      label: {
        fontSize: 16,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
    });
    this.yaxis = this.board.create('axis', [[0, 0], [0, 1]], {
      name:this.atb.ylabel, 
      withLabel: true, 
      label: {
        fontSize: 16,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-fakeY.getSize()[0] - 20, 0]   // (in pixels)
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
    6 : function(xint, F, attr) { return new AdjHeightRectangle(xint, F, attr); }
}

let themeConstructor = {
  'blue' : function() { th = new BlueTheme(); },
  'steel' : function() { th = new SteelTheme(); }
}

class Workspace extends StandardBoard {
  constructor(divName, Box, attributes = {}) {
    super(divName, Box, attributes)
    this.elements = [];

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

});

