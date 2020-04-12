const blue = '#66AAFF';
const brightblue = '#99DDFF';
const darkblue = '#3344AA';
const lightgray = '#CCCCCC';
const mediumgray = '#AAAAAA';
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
    this.verylightAnnote = '#DDDDFF';
    this.startPoint = '#666688';
    this.endPoint = '#EE5511';
    this.fontSizeAnnote = 15;
    this.strokeWidth = 4;
    this.strokeWidthAnnote = 2;
    this.accent1 = purpleblue;
    this.accent2 = lightpurpleblue;
    this.fillOpacity = 0.5;
  }
}

let th = new BlueTheme();


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

}


////////////////////////////////////////////////////////////////////////////////////////////


class Secant {
  constructor (xint, F, attr = {}) {

    ///////////////////////////////////////////////////////  initialize data members
    this.board = xint.board;
    this.xint = xint;
    this.f = F;
    this.attr = attr;
    this.precision = 2;
    let boundingBox = this.board.getBoundingBox();         
    this.boardwidth = (boundingBox[2] - boundingBox[0]);  
    
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
    this.slopeTextX = this.slopeTextX.bind(this);
    this.slopeTextY = this.slopeTextY.bind(this);
    this.slopeString = this.slopeString.bind(this);
    this.slopeTextWidth = this.slopeTextWidth.bind(this);
    this.riseTextX = this.riseTextX.bind(this);
    this.riseTextY = this.riseTextY.bind(this);
    this.riseTextVal = this.riseTextVal.bind(this);
    this.runTextX = this.runTextX.bind(this);
    this.runTextY = this.runTextY.bind(this);
    this.runTextVal = this.runTextVal.bind(this);
    this.runTextWidth = this.runTextWidth.bind(this);
    this.turnOnAnnotations = this.turnOnAnnotations.bind(this);
    this.turnOffAnnotations = this.turnOffAnnotations.bind(this);
    this.onUpdate = this.onUpdate.bind(this);

    


    ///////////////////////////////////////////////////////  add components to JSXGraph board
    this.f1 = this.board.create('point', [
      this.xint.X1, 
      this.fx1], 
      {color: th.stroke, size:3, name:'', visible:true});

    this.f2 = this.board.create('point', [
      this.xint.X2, 
      this.fx2], 
      {color: th.stroke, size:3, name:'', visible:true});

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

    this.slopeText = this.board.create('text', [
      this.slopeTextX,
      this.slopeTextY,
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

    this.riseText = this.board.create('text', [
      this.riseTextX,
      this.riseTextY,
      this.riseTextVal],
      {strokeColor: th.lightAnnote, fontSize: th.fontSizeAnnote, visible:false});

    this.runLine = this.board.create('segment', [this.p1, this.f1], 
      {
        strokeColor: th.lightAnnote, 
        strokeWidth:th.strokeWidthAnnote, 
        firstArrow:true, 
        lastArrow:true, 
        visible:false
      });

    this.runText = this.board.create('text', [
      this.runTextX,
      this.runTextY,
      this.runTextVal],
      {strokeColor: th.lightAnnote, fontSize: th.fontSizeAnnote, visible:false});

    ///////////////////////////////////////////////////////  attribute settings

    if (!('annotations' in this.attr) || this.attr['annotations'] == 'mouseover') {
        this.segment.on('over', this.turnOnAnnotations);
        this.segment.on('out', this.turnOffAnnotations);
    }
    else if (this.attr['annotations'] == 'on') {
      this.turnOnAnnotations();
    }

    if ('precision' in this.attr) {
      this.precision = this.attr['precision'];
    }

    if ('snapMargin' in this.attr) {
      this.xint.setSnapMargin(this.attr['snapMargin']);
    }
  }

  fx1() { return this.f(this.xint.X1()); }
  fx2() { return this.f(this.xint.X2()); }
  run() { return this.xint.units(); }
  slope() { return  this.rise() / this.units(); }
  
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
  slopeTextX() { return this.xint.midX() - this.slopeTextWidth() - 2 * this.xint.Xerror; }
  slopeTextY() { return this.fx1() + this.rise() / 2; }
  slopeString() {
    if (this.attr !== undefined && 'rate' in this.attr) {
      if ('annotationPosition' in this.attr && this.attr['annotationPosition'] == 'after') {
        return 'slope = ' + this.slope().toFixed(this.precision) + ' ' + this.attr.rate;
      }
      else {
        return this.attr['rate'] + ' = ' + this.slope().toFixed(this.precision);
      }
    } 
    return 'slope = ' + this.slope().toFixed(this.precision).toString();
  }
  slopeTextWidth() {
    if (this.slopeText == undefined ) return 0;
    this.slopeText.updateSize();
    return this.slopeText.getSize()[0] * this.boardwidth / this.board.canvasWidth;
  }
  
  
  // this is all for the rise string annotation
  riseTextX() { return this.xint.X2() + this.xint.Xerror/2;}
  riseTextY() { return this.fx1() + this.rise() / 2; }
  riseTextVal() {
    if (this.attr !== undefined && 'change' in this.attr) {
      if ('annotationPosition' in this.attr && this.attr['annotationPosition'] == 'after') {
        return this.rise().toFixed(this.precision) + ' ' + this.attr.change;
      }
      else {
        return this.attr.change + ' = ' + this.rise().toFixed(this.precision);
      }
    } 
    return this.rise().toFixed(this.precision);
  }

  // this is all for the units string annotation
  runTextX() { return this.xint.midX() - this.runTextWidth()/2; }
  runTextY() { return this.fx1() - 2 * this.xint.Yerror; }
  runTextVal() { 
    if (this.attr !== undefined && 'units' in this.attr) {
      if ('annotationPosition' in this.attr && this.attr['annotationPosition'] == 'after') {
        return this.units().toFixed(this.precision) + ' ' + this.attr['units'] ;
      }
      else {
        return this.attr['units'] + ' = ' + this.units().toFixed(this.precision).toString();
      }
    }
    return this.units().toFixed(this.precision).toString();
  }
  runTextWidth() {
    if (this.runText == undefined ) return 0;
    this.runText.updateSize();
    return this.runText.getSize()[0] * this.boardwidth / this.board.canvasWidth;
  }

  // call back functions for annotations
  turnOnAnnotations() {
    this.slopeText.setAttribute({visible:true});
    this.riseText.setAttribute({visible:true});
    this.riseLine.setAttribute({visible:true});
    this.line.setAttribute({visible:true});
    if ('showUnits' in this.attr && this.attr['showUnits'] == true) {
      this.runLine.setAttribute({visible:true});
      this.runText.setAttribute({visible:true});
    }
  }

  turnOffAnnotations() {
    this.slopeText.setAttribute({visible:false});
    this.riseText.setAttribute({visible:false});
    this.riseLine.setAttribute({visible:false});
    this.line.setAttribute({visible:false});
    this.runLine.setAttribute({visible:false});
    this.runText.setAttribute({visible:false});
  }



  delete() {
    this.board.removeObject(this.riseLine);
    this.board.removeObject(this.riseText);
    this.board.removeObject(this.runLine);
    this.board.removeObject(this.runText);
    this.board.removeObject(this.p1);
    this.board.removeObject(this.slopeText);
    this.board.removeObject(this.segment);
    this.board.removeObject(this.line);
    this.board.removeObject(this.f1);
    this.board.removeObject(this.f2);
    this.xint.delete();
  } 
}



////////////////////////////////////////////////////////////////////////////////////////////


class Rectangle {
  constructor (xint, F, attr = { } ) {
    ///////////////////////////////////////////////////////  initialize data members
    this.board = xint.board;
    this.xint = xint;
    this.f = F;
    this.attr = attr;
    this.precision = 2;
    let boundingBox = this.board.getBoundingBox();
    this.boardwidth = (boundingBox[2] - boundingBox[0]);  

    ///////////////////////////////////////////////////////  bind functions
    this.height = this.height.bind(this);
    this.area = this.area.bind(this);
    this.units = this.units.bind(this);
    this.rate = this.rate.bind(this);
    this.change = this.change.bind(this);
    this.rise = this.rise.bind(this);
    this.areaTextX = this.areaTextX.bind(this);
    this.areaTextY = this.areaTextY.bind(this);
    this.areaTextVal = this.areaTextVal.bind(this);
    this.areaTextWidth = this.areaTextWidth.bind(this);
    this.hdX = this.hdX.bind(this);
    this.heightTextX = this.heightTextX.bind(this);
    this.heightTextY = this.heightTextY.bind(this);
    this.heightTextVal = this.heightTextVal.bind(this);
    this.wdY = this.wdY.bind(this);
    this.widthTextX = this.widthTextX.bind(this);
    this.widthTextY = this.widthTextY.bind(this);
    this.widthTextVal = this.widthTextVal.bind(this);
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

    this.areaText = this.board.create('text', [
      this.areaTextX,
      this.areaTextY,
      this.areaTextVal],
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

    this.heightText = this.board.create('text', [
      this.heightTextX,
      this.heightTextY,
      this.heightTextVal],
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

    this.widthText = this.board.create('text', [
      this.widthTextX,
      this.widthTextY,
      this.widthTextVal],
      {
        strokeColor: th.lightAnnote, 
        fontSize: th.fontSizeAnnote, visible:false});


    ///////////////////////////////////////////////////////  attribute settings

    if (!('annotations' in this.attr) || this.attr['annotations'] == 'mouseover') {
        this.rect.on('over', this.turnOnAnnotations);
        this.rect.on('out', this.turnOffAnnotations);
    }
    else if (this.attr['annotations'] == 'on') {
      this.turnOnAnnotations();
    }

    if ('precision' in this.attr) {
      this.precision = this.attr['precision'];
    }

    if ('snapMargin' in this.attr) {
      this.xint.setSnapMargin(this.attr['snapMargin']);
    }
  }



  height() { return this.f(this.xint.midX()); }
  hdX() { return this.xint.X2() +  this.xint.Xerror; }
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
  areaTextX() { return this.xint.midX() - this.areaTextWidth()/2; }
  areaTextY() { return this.height() / 2; }
  areaTextVal() { 
    if (this.attr !== undefined && 'change' in this.attr) {
      let pre = '';
      let post = ''
      if ('annotationPosition' in this.attr && this.attr['annotationPosition'] == 'after') {
        post = ' ' + this.attr.change;
      }
      else {
        pre = this.attr.change + ' = ';
      }
      return pre + this.area().toFixed(this.precision) + post;
    }
    return this.area().toFixed(this.precision); 
  }
  areaTextWidth() {
    if (this.areaText == undefined ) return 0;
    this.areaText.updateSize();
    return this.areaText.getSize()[0] * this.boardwidth / this.board.canvasWidth;
  }


  // this mangages the height text annotation
  heightTextX() { return this.hdX() + this.xint.Xerror; }
  heightTextY() { return this.height() / 2 }
  heightTextVal() { 
    if (this.attr !== undefined && 'rate' in this.attr) {
      let pre = '';
      let post = ''
      if ('annotationPosition' in this.attr && this.attr['annotationPosition'] == 'after') {
        post = ' ' + this.attr.rate;
      }
      else {
        pre = this.attr.rate + ' = ';
      }
      return pre + this.height().toFixed(this.precision) + post;
    }
    return this.height().toFixed(this.precision); 
  }


  // this mangages the width text annotation
  widthTextX() { return this.xint.midX() - this.widthTextWidth()/2; }
  widthTextY() { return this.height() + 4 * this.xint.Yerror; }
  widthTextVal() { 
    if (this.attr !== undefined && 'units' in this.attr) {
      let pre = '';
      let post = ''
      if ('annotationPosition' in this.attr && this.attr['annotationPosition'] == 'after') {
        post = ' ' + this.attr.units;
      }
      else {
        pre = this.attr.units + ' = ';
      }
      return pre + this.xint.units().toFixed(this.precision) + post;

    }
    return this.xint.units().toFixed(this.precision);
  }
  widthTextWidth() {
    if (this.widthText == undefined ) return 0;
    this.widthText.updateSize();
    return this.widthText.getSize()[0] * this.boardwidth / this.board.canvasWidth;
  }

  // call back functions for annotations
  turnOnAnnotations() {
    this.areaText.setAttribute({visible:true});
    this.heightText.setAttribute({visible:true});
    this.heightLine.setAttribute({visible:true});
    this.widthText.setAttribute({visible:true});
    this.widthLine.setAttribute({visible:true}); 
  }

  turnOffAnnotations() {
    this.areaText.setAttribute({visible:false});
    this.heightText.setAttribute({visible:false});
    this.heightLine.setAttribute({visible:false});
    this.widthText.setAttribute({visible:false});
    this.widthLine.setAttribute({visible:false}); 
  }
  

  delete() {
    this.board.removeObject(this.widthLine);
    this.board.removeObject(this.widthText);
    this.board.removeObject(this.heightLine);
    this.board.removeObject(this.heightText);
    this.board.removeObject(this.p3);
    this.board.removeObject(this.p4);
    this.board.removeObject(this.p2);
    this.board.removeObject(this.p1);
    this.board.removeObject(this.areaText);
    this.board.removeObject(this.rect);
    this.board.removeObject(this.f1);
    this.board.removeObject(this.f2);
    this.xint.delete();
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
}


////////////////////////////////////////////////////////////////////////////////////////////


class RectangleArray {
  constructor(xint, F, slider, attr = { }) {
    ///////////////////////////////////////////////////////  initialize data members
    this.board = xint.board;
    this.xint = xint;
    this.f = F;
    this.attr = attr;
    this.precision = 2;
    let boundingBox = this.board.getBoundingBox();
    this.boardwidth = (boundingBox[2] - boundingBox[0]);  
    this.total_area = 0;
    this.slider = slider;

    ///////////////////////////////////////////////////////  bind functions
    this.updateDataArray = this.updateDataArray.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.area = this.area.bind(this);
    this.rise = this.rise.bind(this);
    this.units = this.units.bind(this);
    this.change = this.change.bind(this);
    this.areaTextX = this.areaTextX.bind(this);
    this.areaTextY = this.areaTextY.bind(this);
    this.areaTextVal = this.areaTextVal.bind(this);
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

    this.areaText = this.board.create('text', [
      this.areaTextX,
      this.areaTextY,
      this.areaTextVal],
      { strokeColor: th.lightAnnote, fontSize:th.fontSizeAnnote, visible:false });

    ///////////////////////////////////////////////////////  attribute settings
    this.rectangles.updateDataArray = this.updateDataArray;

    if (!('annotations' in this.attr) || this.attr['annotations'] == 'mouseover') {
        this.rectangles.on('over', this.turnOnAnnotations);
        this.rectangles.on('out', this.turnOffAnnotations);
    }
    else if (this.attr['annotations'] == 'on') {
      this.turnOnAnnotations();
    }

    if ('precision' in this.attr) {
      this.precision = this.attr['precision'];
    }

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
  areaTextX() { return this.xint.X2() + this.xint.Xerror; }
  areaTextY() { return this.f(this.xint.X2()) / 2; }
  areaTextVal() { 
    if (this.attr !== undefined && 'change' in this.attr) {
      return this.attr.change + ' = ' + this.area().toFixed(this.precision); 
    }
    return 'area = ' + this.area().toFixed(this.precision); 
  }
  
  // call back functions for annotations
  turnOnAnnotations() {
    this.areaText.setAttribute({visible:true});
  }
  turnOffAnnotations() {
    this.areaText.setAttribute({visible:false});
  }

  delete() {
    this.board.removeObject(this.rectangles);
    this.board.removeObject(this.areaText);
    this.slider.delete();
    this.xint.delete();
  }
}


////////////////////////////////////////////////////////////////////////////////////////////



class SecantArray {
  constructor(xint, F, slider, attr = { }) {
    ///////////////////////////////////////////////////////  initialize data members
    this.board = xint.board;
    this.xint = xint;
    this.f = F;
    this.attr = attr;
    this.precision = 2;
    let boundingBox = this.board.getBoundingBox();
    this.boardwidth = (boundingBox[2] - boundingBox[0]);  
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
    this.riseTextX = this.riseTextX.bind(this);
    this.riseTextY = this.riseTextY.bind(this);
    this.riseTextVal = this.riseTextVal.bind(this);
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

    this.riseText = this.board.create('text', [
      this.riseTextX,
      this.riseTextY,
      this.riseTextVal],
      {strokeColor: th.lightAnnote, fontSize: th.fontSizeAnnote, visible:false});

    ///////////////////////////////////////////////////////  attribute settings

    this.secants.updateDataArray = this.updateDataArray;

    if (!('annotations' in this.attr) || this.attr['annotations'] == 'mouseover') {
        this.secants.on('over', this.turnOnAnnotations);
        this.secants.on('out', this.turnOffAnnotations);
    }
    else if (this.attr['annotations'] == 'on') {
      this.turnOnAnnotations();
    }

    if ('precision' in this.attr) {
      this.precision = this.attr['precision'];
    }

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
  riseTextX() { return this.xint.X2() + this.xint.Xerror/2;}
  riseTextY() { return this.fx1() + this.rise() / 2; }
  riseTextVal() {
    if (this.attr !== undefined && 'change' in this.attr) {
      return this.attr.change + ' = ' + this.rise().toFixed(this.precision);
    } 
    return this.rise().toFixed(this.precision);
  }

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
    this.riseText.setAttribute({visible:true});
  }
  turnOffAnnotations() {
    this.riseLine.setAttribute({visible:false});
    this.riseText.setAttribute({visible:false});
  }

  delete() {
    this.board.removeObject(this.secants);
    this.board.removeObject(this.p1);
    this.board.removeObject(this.f2);
    this.board.removeObject(this.riseLine);
    this.board.removeObject(this.riseText);
    this.slider.delete();
    this.xint.delete();
  }

}


////////////////////////////////////////////////////////////////////////////////////////////


class SecantRectArray {
  constructor(xint, F, slider, attr = {annotations:'secant'}) {
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

    if ('precision' in this.attr) {
      this.precision = this.attr['precision'];
    }

    if ('snapMargin' in this.attr) {
      this.xint.setSnapMargin(this.attr['snapMargin']);
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
  constructor(divName, Box, attributes = { xlabel: '', ylabel:'' }) {
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
        offset: [-100, 0]   // (in pixels)
      }
    });   
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

class Workspace extends StandardBoard {
  constructor(divName, Box, attributes) {
    super(divName, Box, attributes)
    this.elements = [];

    this.onUpdate = this.onUpdate.bind(this);
    this.rise = this.rise.bind(this);
    this.area = this.area.bind(this);
    this.maxX = this.maxX.bind(this);
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

});

