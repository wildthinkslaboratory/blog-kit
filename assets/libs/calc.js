const blue = '#66AAFF';
const brightblue = '#00AAFF';
const darkblue = '#1155CC';
//const lightgray = '#CCCCCC';
const mediumgray = '#AAAAAA';
const darkgray = '#333333';
//const darktomato = '#DD3333';
//const tomato = '#FF2222'; 


class AppColors {
  constructor() {
    this.fill = blue;
    this.stroke = darkblue;
    this.highlightFill = brightblue;
    this.highlightStroke = darkblue;
    this.lightAnnote = mediumgray;
    this.darkAnnote = darkgray;
  }
}

let colors = new AppColors();

class Slider {
  constructor(b, binfo, xfunction, yfunction, low, high, name, sliderWidth) {
    this.board = b;
    this.low = low;
    this.high = high;
    this.xf = xfunction;
    this.yf = yfunction;
    this.xdelta = sliderWidth;
    this.name = name; 

    this.l1 = b.create('segment', [[xfunction, yfunction], [
      function() { return xfunction() + sliderWidth; },yfunction]], {
      strokeColor:'black', 
      strokeWidth:1,  
      visible:true
    });

    let start = xfunction() + binfo.Xerror * 1;
    this.g = b.create('glider', [start,yfunction(), this.l1], {
      name: '', 
      size:6, 
      strokeColor: 'black', 
      fillColor:'white',
      showInfoBox:false
    });

    this.gliderX = this.gliderX.bind(this);

    this.l2 = b.create('segment', [[xfunction, yfunction], [
      this.gliderX,yfunction]], {
      strokeColor:'black', 
      strokeWidth:3,  
      visible:true
    });

    this.Value = this.Value.bind(this);
    this.stringValue = this.stringValue.bind(this);

    this.text = b.create('text', [
      function() { return  xfunction() + sliderWidth + binfo.Xerror; },
      yfunction,
      this.stringValue], {fontSize:12}
    );

    this.dead = false;
  }

  gliderX() { return this.g.X(); }

  Value() {
    let percent = (this.g.X() - this.xf()) / this.xdelta;
    return this.low + (this.high - this.low) * percent;
  }

  setValue(v) {
    if (v < this.low || v > this.high) return;
    let percent = (v - this.low)/(this.high - this.low);
    this.g.moveTo([this.xf() + percent * this.xdelta ,this.yf()]);
  }

  stringValue() {
    return this.name + '        ' + this.Value().toString();
  }

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
  constructor(b, binfo, xfunction, yfunction, low, high, name, sliderWidth) {
    super(b, binfo, xfunction, yfunction, low, high, name, sliderWidth);
  }

  Value() {
    return Math.floor(super.Value());
  }

}

class BoolButton extends Slider {
  constructor(b, binfo, xfunction, yfunction, name) {
    super(b, binfo, xfunction, yfunction, 0, 2, name, 0.01);
    this.state = false;
    this.toggle = this.toggle.bind(this);
    this.showText = this.showText.bind(this);
    this.hideText = this.hideText.bind(this);
    this.g.on('up', this.toggle);
    this.g.on('over', this.showText);
    this.g.on('out', this.hideText);
    this.g.setAttribute({fillColor:'#8844FF', strokeColor:'#555555'});
    this.text.setAttribute({visible:false, strokeColor:colors.lightAnnote});
  }

  Value() {
    return this.state;
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
      this.g.setAttribute({fillColor:'#8844FF'});
    }
    else {
      this.g.setAttribute({fillColor:'#EEDDFF'});
    }
    this.state = !this.state;
  }

  showText() {
    this.text.setAttribute({visible:true});
  }

  hideText() {
    this.text.setAttribute({visible:false});
  }
}


/*
This class holds the board and sizing data.            
*/
class BoardInfo {
  constructor(b) {
    this.board = b;
    let boundingBox = this.board.getBoundingBox();
    this.Yerror = (boundingBox[1] - boundingBox[3]) / 50;  
    this.Xerror = (boundingBox[2] - boundingBox[0]) / 50;  
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

    // create two gliders on the x axis
    this.xline = this.board.create('line', [[0,0],[1,0]], {visible:false});  // x axis line
    this.x1 = b.create('glider', [X1,0,this.xline], {name: '', size:5, color:'green'});
    this.x2 = b.create('glider', [X2,0,this.xline], {name: '', size:5, color:'red'});

    // bind all functions that might be passed in a callback to this context
    this.X1 = this.X1.bind(this);
    this.X2 = this.X2.bind(this);
    this.midX = this.midX.bind(this);
    this.range = this.range.bind(this);
    this.checkSnapToGrid = this.checkSnapToGrid.bind(this);
    this.checkSnap = this.checkSnap.bind(this);
    this.onUpdate = this.onUpdate.bind(this);

    // create a vertical glider at the midpoint of the interval
    this.vline = b.create('line', [[this.midX ,0], [this.midX, 1]], {visible:false});
    this.midY = b.create('glider', [this.midX(), 0, this.vline], {
      name: '', size:4, color:colors.stroke, visible:false, showInfoBox:false});
  }

  // getters
  X1() { return this.x1.X(); }
  X2() { return this.x2.X(); }
  range() { return this.x2.X() - this.x1.X(); }
  // return the midpoint of the interval
  midX() {
    return this.x1.X() + this.range() / 2;
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

  // remove the interval from the board
  delete() {
    this.board.removeObject(this.xline);
    this.board.removeObject(this.x1);
    this.board.removeObject(this.x2);
    this.board.removeObject(this.vline);
    this.board.removeObject(this.midY);
  }

}


/*
  - why doesn't strokeColor work?  Maybe a bug in jsxgraph?
*/
// could use precision to adjust text placement 
class AdjSecant {
  constructor (xint, F) {
    this.board = xint.board;
    this.xint = xint;
    this.f = F;
    this.showAnnotations = false;
    let boundingBox = this.board.getBoundingBox();
    this.Yerror = (boundingBox[1] - boundingBox[3]) / 50;  
    this.Xerror = (boundingBox[2] - boundingBox[0]) / 50;
    this.precision = 2;

    this.fx1 = this.fx1.bind(this);
    this.fx2 = this.fx2.bind(this);
    this.rise = this.rise.bind(this);
    this.run = this.run.bind(this);
    this.slope = this.slope.bind(this);
    this.slopeTextX = this.slopeTextX.bind(this);
    this.slopeTextY = this.slopeTextY.bind(this);
    this.slopeString = this.slopeString.bind(this);
    this.dimensionTextX = this.dimensionTextX.bind(this);
    this.dimensionTextY = this.dimensionTextY.bind(this);
    this.dimensionTextVal = this.dimensionTextVal.bind(this);
    this.turnOnAnnotations = this.turnOnAnnotations.bind(this);
    this.turnOffAnnotations = this.turnOffAnnotations.bind(this);
    this.turnOnSlopeLine = this.turnOnSlopeLine.bind(this);
    this.turnOffSlopeLine = this.turnOffSlopeLine.bind(this);

    this.f1 = this.board.create('point', [
      this.xint.X1, 
      this.fx1], 
      {color: colors.stroke, size:3, name:'', visible:true});

    this.f2 = this.board.create('point', [
      this.xint.X2, 
      this.fx2], 
      {color: colors.stroke, size:3, name:'', visible:true});

    this.line = this.board.create('line', [this.f1, this.f2], {
      strokeColor: '#DDDDDD',  
      visible:false});

    this.segment = this.board.create('segment', [this.f1, this.f2], {
      strokeColor: colors.stroke, 
      highlightStrokeColor: colors.stroke,
      strokeWidth:4, 
      visible:true});

    this.slopeText = this.board.create('text', [
      this.slopeTextX,
      this.slopeTextY,
      this.slopeString], 
      {strokeColor: colors.lightAnnote, fontSize:15, visible:false});

    
    this.p1 = this.board.create('point',[ 
      this.xint.X2, 
      this.fx1],
      {visible:false});

    this.dimensionLine = this.board.create('segment', [this.p1, this.f2], 
    {strokeColor: colors.lightAnnote, strokeWidth:2, firstArrow:true, lastArrow:true, visible:false});

    this.dimensionText = this.board.create('text', [
      this.dimensionTextX,
      this.dimensionTextY,
      this.dimensionTextVal],
      {strokeColor: colors.lightAnnote, fontSize: 15, visible:false});

    this.segment.on('over', this.turnOnAnnotations);

    this.segment.on('out', this.turnOffAnnotations);

  }

  // these are all the function that might be used as callbacks
  fx1() { return this.f(this.xint.X1()); }
  fx2() { return this.f(this.xint.X2()); }
  rise() { return this.fx2() - this.fx1(); }
  run() { return this.xint.range(); }
  slope() { return  this.rise() / this.run(); }
  slopeTextX() { return this.xint.midX() - 4 * this.Xerror; }
  slopeTextY() { return this.fx1() + this.rise() / 2 + this.Yerror; }
  slopeString() { return 'slope = ' + this.slope().toFixed(this.precision).toString(); }
  dimensionTextX() { return this.xint.X2() + this.Xerror/2;}
  dimensionTextY() { return this.fx1() + this.rise() / 2; }
  dimensionTextVal() { return (this.rise()).toFixed(this.precision);}
  area() { return 0; }
  setSnapMargin(m) { this.xint.setSnapMargin(m); }

  setPrecision(p) { this.precision = p; }
  
  turnOnAnnotations() {
    this.slopeText.setAttribute({visible:true});
    this.dimensionText.setAttribute({visible:true});
    this.dimensionLine.setAttribute({visible:true});
    this.line.setAttribute({visible:true});
  }

  turnOffAnnotations() {
    if (!this.showAnnotations) {
      this.slopeText.setAttribute({visible:false});
      this.dimensionText.setAttribute({visible:false});
      this.dimensionLine.setAttribute({visible:false});
      this.line.setAttribute({visible:false});
    }
  }
  
  turnOnSlopeLine() { this.line.setAttribute({visible:true}); }
  turnOffSlopeLine() { this.line.setAttribute({visible:false}); }
  setAnnotations(b) { 
    this.showAnnotations = b; 
    if (b) { this.turnOnAnnotations(); }
  }

  delete() {
    this.board.removeObject(this.dimensionLine);
    this.board.removeObject(this.dimensionText);
    this.board.removeObject(this.p1);
    this.board.removeObject(this.slopeText);
    this.board.removeObject(this.segment);
    this.board.removeObject(this.line);
    this.board.removeObject(this.f1);
    this.board.removeObject(this.f2);
    this.xint.delete();
  }

  onUpdate() {
    this.xint.onUpdate();
  }

  
}

class AnnotatedSecant extends AdjSecant {
  constructor(xint, F, names = { rise:'rise', run:'run', slope:'slope'}) {
    super(xint, F);
    this.names = names;
    this.setAnnotations(true);
    this.turnOnSlopeLine();

    this.slopeString = this.slopeString.bind(this);
    this.dimensionTextVal = this.dimensionTextVal.bind(this);
    this.runTextX = this.runTextX.bind(this);
    this.runTextY = this.runTextY.bind(this);
    this.runTextVal = this.runTextVal.bind(this);

    this.dimensionLineRun = this.board.create('segment', [this.p1, this.f1], 
      {strokeColor: colors.lightAnnote, strokeWidth:2, firstArrow:true, lastArrow:true, visible:true});

    this.runText = this.board.create('text', [
      this.runTextX,
      this.runTextY,
      this.runTextVal],
      {strokeColor: colors.lightAnnote, fontSize: 15, visible:true});
  }

  slopeString() {
    if (this.names) {
      return this.names.slope + ' = ' + this.slope().toFixed(this.precision).toString();
    } 
    else { return super.slopeString(); }
  }

  dimensionTextVal() {
    let prefix = '';
    if (this.names) {
      prefix += this.names.rise + ' = ';
    } 
    return prefix + super.dimensionTextVal();
  }

  runTextX() { return this.xint.midX() - 2 * this.Xerror; }
  runTextY() { return this.fx1() - 2 * this.Yerror; }
  runTextVal() { 
    let prefix = '';
    if (this.names) {
      prefix += this.names.run + ' = ';
    }
    return prefix + (this.run()).toFixed(this.precision).toString();
  }

  setNames(n) { this.names = n; }
}



class AdjRectangle {
  constructor (xint, F) {
    this.board = xint.board;
    this.xint = xint;
    this.f = F;
    this.showAnnotations = false;
    let boundingBox = xint.board.getBoundingBox();
    this.Yerror = (boundingBox[1] - boundingBox[3]) / 50;  
    this.Xerror = (boundingBox[2] - boundingBox[0]) / 50;
    this.precision = 2;

    this.height = this.height.bind(this);
    this.area = this.area.bind(this);
    this.areaTextX = this.areaTextX.bind(this);
    this.areaTextY = this.areaTextY.bind(this);
    this.areaTextVal = this.areaTextVal.bind(this);
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

    this.f1 = this.board.create('point', [
      this.xint.X1, 
      this.height], 
      {color: colors.stroke, size:3, name:'', visible:true});

    this.f2 = this.board.create('point', [
      this.xint.X2, 
      this.height], 
      {color: colors.stroke, size:3, name:'', visible:true});

    this.rect = this.board.create('polygon', [this.xint.x1, this.f1, this.f2, this.xint.x2], 
    {
      strokeColor: colors.stroke,
      fillColor:colors.fill, 
      highlightStrokeColor:colors.highlightStroke,
      highlightFillColor:colors.highlightFill, 
      hasInnerPoints:true
    });

    this.areaText = this.board.create('text', [
      this.areaTextX,
      this.areaTextY,
      this.areaTextVal],
      { fontSize:15, visible:false });

    this.p1 = this.board.create('point',[
      this.hdX,
      this.height],
      {visible:false});

    this.p2 = this.board.create('point',[
      this.hdX,
      0],
      {visible:false});

    this.heightDimLine = this.board.create('segment', [this.p1, this.p2], 
    {
      strokeColor:colors.lightAnnote, 
      strokeWidth:2, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });


    this.heightDimText = this.board.create('text', [
      this.heightTextX,
      this.heightTextY,
      this.heightTextVal],
      { strokeColor:colors.lightAnnote, fontSize: 15, visible:false});

    this.p3 = this.board.create('point',[
      this.xint.X1, 
      this.wdY],
      {visible:false});

    this.p4 = this.board.create('point',[
      this.xint.X2, 
      this.wdY],
      {visible:false});

    this.widthDimLine = this.board.create('segment', [this.p3,this.p4], 
    {
      strokeColor: colors.lightAnnote, 
      strokeWidth:2, 
      firstArrow:true, 
      lastArrow:true, 
      visible:false
    });

    this.widthDimText = this.board.create('text', [
      this.widthTextX,
      this.widthTextY,
      this.widthTextVal],
      {strokeColor: colors.lightAnnote, fontSize: 15, visible:false});

    this.rect.on('over', this.turnOnAnnotations);

    this.rect.on('out', this.turnOffAnnotations); 

  }

  height() { return this.f(this.xint.midX()); }
  area() { return this.height() * this.xint.range(); }
  areaTextX() { return this.xint.midX() - this.Xerror; }
  areaTextY() { return this.height() / 2; }
  areaTextVal() { return this.area().toFixed(this.precision); }
  hdX() { return this.xint.X2() +  this.Xerror / 2; }
  heightTextX() { return this.hdX() + this.Xerror / 2; }
  heightTextY() { return this.height() / 2 }
  heightTextVal() { return this.height().toFixed(this.precision); }
  wdY() { return this.height() + this.Yerror; }
  widthTextX() { return this.xint.X1() + this.xint.range() /2 - this.Xerror; }
  widthTextY() { return this.height() + 2 * this.Yerror; }
  widthTextVal() { return this.xint.range().toFixed(this.precision); }
  rise() { return 0; }
  setSnapMargin(m) { this.xint.setSnapMargin(m); }
  setPrecision(p) { this.precision = p; }
  
  turnOnAnnotations() {
    this.areaText.setAttribute({visible:true});
    this.heightDimText.setAttribute({visible:true});
    this.heightDimLine.setAttribute({visible:true});
    this.widthDimText.setAttribute({visible:true});
    this.widthDimLine.setAttribute({visible:true}); 
  }

  turnOffAnnotations() {
    if (!this.showAnnotations) {
      this.areaText.setAttribute({visible:false});
      this.heightDimText.setAttribute({visible:false});
      this.heightDimLine.setAttribute({visible:false});
      this.widthDimText.setAttribute({visible:false});
      this.widthDimLine.setAttribute({visible:false}); 
    }
  }
  
  setAnnotations(b) { 
    this.showAnnotations = b; 
    if (b) { this.turnOnAnnotations(); }
  }

  setFillColor(color) { this.rect.setAttribute({fillColor:color}); }

  delete() {
    this.board.removeObject(this.widthDimLine);
    this.board.removeObject(this.widthDimText);
    this.board.removeObject(this.heightDimLine);
    this.board.removeObject(this.heightDimText);
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

  onUpdate() {
    this.xint.onUpdate();
  }
}

class AnnotatedRectangle extends AdjRectangle {
  constructor (xint, F, names = { width: 'width', height: 'height', area: 'area'}) {
    super(xint, F);
    this.names = names;
    this.setAnnotations(true);

    this.areaTextVal = this.areaTextVal.bind(this);
    this.heightTextVal = this.heightTextVal.bind(this);
    this.widthTextVal = this.widthTextVal.bind(this);
  }

  areaTextVal() { 
    let prefix = '';
    if (this.names) {
      prefix = this.names.area + ' = ';
    }
    return prefix + super.areaTextVal(); 
  }

  heightTextVal() { 
    let prefix = '';
    if (this.names) {
      prefix = this.names.height + ' = ';
    }
    return prefix + super.heightTextVal(); 
  }


  widthTextVal() { 
    let prefix = '';
    if (this.names) {
      prefix = this.names.width + ' = ';
    }
    return prefix + super.widthTextVal(); 
  }

  setNames(n) { this.names = n; }
}

class AdjHeightRectangle extends AnnotatedRectangle {
  constructor(xint, F, names) {
    super(xint,F, names);
    this.xint.midY.setAttribute({visible:true});

    this.height = this.height.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  height() { return this.xint.midY.Y(); }
  setHeight(h) { this.xint.midY.moveTo([this.xint.midX(),h]); }

  snapToFunction() {
      let currentH = this.height();
      let functionH = this.f(this.xint.midX());
      if (currentH <= functionH + this.Yerror && currentH >= functionH - this.Yerror) {
        this.setHeight(functionH);
      }
  }

  onUpdate() {
    this.snapToFunction();
    super.onUpdate();
  }
} 



function AdjSecantRect(binfo, xinterval, F) {
  let bi = binfo;
  let f = F;
  let showAnnotations = false;
  
  let xint = xinterval;
  xint.midY.setAttribute({visible:true});

  let xslider = function() { return xinterval.x1.X() + 0.5 * binfo.Xerror; };
  let yslider = function() { return binfo.Yerror; };
  let attachButton = new BoolButton(binfo.board, binfo, xslider, yslider, 'attach');


  let rectangleFunction = function() { 
    if (attachButton.Value()) {
      return f(xint.midX());      // height of rectangle is f is rateCurve
    }
    return  (f(xint.x2.X()) - f(xint.x1.X())) / (xint.x2.X() - xint.x1.X());  // slope of secant 
  };

  let secantFunction = function(x) {
    if (attachButton.Value()) {
      if (x == xint.x1.X()) { return xint.midY.Y(); }
      else { return xint.midY.Y() + f(xint.midX()) * (xint.x2.X() - xint.x1.X()); }
    }
    return f(x);
  };



  let rectangle = new AdjRectangle(bi, xint, rectangleFunction, false);
  let secant = new AdjSecant(bi, xint, secantFunction, false);

  this.setFunction = function(F) { f = F; };
  // this.setRateCurve = function(b) { 
  //   rateCurve = b; 
  //   if (rateCurve) { xint.midY.setAttribute({visible:true}); }
  //   else { xint.midY.setAttribute({visible:false}); }
    
  // };

  rectangle.rect.on('over', function(){
    rectangle.annotationsOn();
    secant.annotationsOn();
  });

  rectangle.rect.on('out', function(){
    if (!showAnnotations) {
      rectangle.annotationsOff();
      secant.annotationsOff();
    }
  });

  secant.line.on('over', function(){
    rectangle.annotationsOn();
    secant.annotationsOn();
  });

  secant.line.on('out', function(){
    if (!showAnnotations) {
      rectangle.annotationsOff();
      secant.annotationsOff();
    }
  });

  this.delete = function() {
    rectangle.delete();
    secant.delete();
    xint.delete();
    attachButton.delete();
  };
  this.x2 = function() { return xint.x2.X(); };
}



function RectangleArray(binfo, xinterval, F, ns) {
  let board = binfo.board;
  let bi = binfo;  
  let xint = xinterval;  
  let f = F;  
  let Nslider = ns;

  let rectangles = board.create('curve', [[0],[0]], {
    strokeColor: '#1155CC',
    fillColor:colors.fill, 
    fillOpacity:0.3, 
    highlightStrokeColor:colors.highlightStroke,
    highlightFillColor:colors.highlightFill, 
    highlightFillOpacity:0.3, 
    hasInnerPoints:true
  });
  
  let area = 0;
  rectangles.updateDataArray = function() {

    area = 0;
    let delta = (xint.x2.X() - xint.x1.X()) / Nslider.Value();
    let x = [xint.x1.X()];
    let y = [0];
    let lastRect = xint.x2.X() - delta + 0.01;
    for (let i=xint.x1.X(); i < lastRect; i += delta) {

      let height = f(i + delta/2, delta);
      x.push(i);  // four points of our rectangle
      y.push(height);

      x.push(i + delta);
      y.push(height);

      x.push(i + delta);
      y.push(0);

      area += delta * height;
    }

    this.dataX = x;
    this.dataY = y;

  };

  let areaText = board.create('text', [
    function() { return xint.x2.X() - 2 * bi.Xerror;},
    function() { 
      if (f(xint.x2.X()) <= 0) { return bi.Yerror * 2; }
      return - bi.Yerror * 2;
    },
    function() { return 'Area = ' + area.toFixed(3).toString(); }
  ], {fontSize:15, visible:true});
  
  this.setFunction = function(F) { f = F; };
  //this.setN = function(n) { N = n; };
  this.delete = function() {
    board.removeObject(areaText);
    board.removeObject(rectangles);
    Nslider.delete();
    xint.delete();
  };

  this.onUpdate = function() { xint.onUpdate(); };
  this.area = function() { return area; };
  this.x2 = function() { return xint.x2.X(); };
}


function SecantArray(binfo, xinterval, F, ns) {
  let board = binfo.board;
  let bi = binfo;  
  let xint = xinterval;  
  let f = F;  

  let Nslider = ns;

  let secants = board.create('curve', [[0],[0]],
    {strokecolor:'#1155CC', strokeWidth:4}); 

  let lastY = 0;
  let firstY = 0;
  secants.updateDataArray = function() { 

    let deltaY = 0;
    let delta = (xint.x2.X() - xint.x1.X()) / Nslider.Value();
    let x = [];
    let y = [];
    let lastPoint = xint.x2.X() + 0.01;
    for (let i=xint.x1.X(); i <= lastPoint; i += delta) {
      x.push(i);
      let [dy, c, constant] = f(i, delta, deltaY);
      y.push(dy + c + constant);
      deltaY += dy;
      if (i <= xint.x1.X()) { firstY = y[y.length - 1]; }
    }
    lastY = y[y.length - 1];
    this.dataX = x;
    this.dataY = y;
  };

  let deltaYText = board.create('text', [
    function() { return xint.x2.X() - bi.Xerror;},
    function() { return lastY - 2*bi.Yerror; },
    function() { return 'vertical \n change = ' + (lastY - firstY).toFixed(3).toString(); }
  ], {fontSize:15, visible:true});
  

  this.setFunction = function(F) { f = F; };
  //this.setN = function(n) { N = n; };
  this.delete = function() {
    board.removeObject(deltaYText);
    board.removeObject(secants);
    Nslider.delete();
    xint.delete();
  };
  this.x2 = function() { return xint.x2.X(); };
}


// there's a problem passing functions to other array classes
function SecantRectangleArray(binfo, xinterval, F, ns) {
  let xint = xinterval;  
  let f = F;  

  let xslider = function() { return xinterval.x2.X() + binfo.Xerror; };
  let yslider = function() { return  2 * binfo.Yerror; };
  let attachButton = new BoolButton(binfo.board, binfo, xslider, yslider, 'attach');

  xint.midY.setAttribute({visible:true});

  let rectangleFunction = function(x, delta=0) { 
    if (attachButton.Value()) {
      return f(x);      // height of rectangle is f is rateCurve
    }
    return  (f(x + delta/2) - f(x - delta/2)) / delta;  // slope of secant 
  };

  let secantFunction = function(x, delta, cum) {
    if (attachButton.Value()) {
      return [f(x - delta/2) * delta, cum, xint.midY.Y()];
    }
    return [f(x), 0, 0];
  };

  let rectangles = new RectangleArray(binfo, xinterval, rectangleFunction, ns);
  let secants = new SecantArray(binfo, xinterval, secantFunction, ns);
  this.setFunction = function(F) { f = F; };
  this.setN = function(n) { 
    rectangles.setN(n); 
    secants.setN(n);
  };

  // this.setRateCurve = function(b) { 
  //   rateCurve = b; 
  //   if (rateCurve) { xint.midY.setAttribute({visible:true}); }
  //   else { xint.midY.setAttribute({visible:false}); }
    
  // };

  this.delete = function() {
    rectangles.delete();
    secants.delete();
    xint.delete();
    attachButton.delete();
  };
  this.x2 = function() { return xint.x2.X(); };
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


// function WorkSpace(b) {
//   let board = b;
//   let boardInfo = new BoardInfo(b);
//   let elements = [];
//   let snapMargin = 0.05;
//   let rectangleNames = ['', '', ''];
//   let useRectangleNames = false;
//   let rectangleUseFunction = true;
//   let rectangleVerticalAdjust = false;
//   let defaultArrayN = 10;

//   this.boardUpdate = function() {
//     for (let i = 0; i < elements.length; i++) {
//       if (elements[i].type == 'rectangle') {
//         elements[i].value.onUpdate();
//       }
//     }
//   };

//   this.setRectangleNames = function(names) { rectangleNames = names; };

//   this.addElement = function(m, xPlacement, f) {

//     let startx = board.getBoundingBox()[0];
//     let endx = board.getBoundingBox()[2];
//     let x1 = startx + (endx - startx) * xPlacement;
//     let x2 = x1 + 5 * boardInfo.Xerror;

//     let xinterval = new XInterval(board, x1, x2);
//     xinterval.setSnapMargin(snapMargin);

//     // determine a slider's position if needed
//     let xslider = function() { return xinterval.x2.X() + boardInfo.Xerror; };
//     let yslider = function() { return  boardInfo.Yerror; };
//     let sliderWidth = boardInfo.Xerror * 3;

//     // store widgets in a dictionary wrapper with their type
//     switch(m) {
        
//     case 0: 
//       elements.push({type:'rectangle', value: new AdjRectangle(boardInfo, xinterval, f, rectangleNames)});
//       if (useRectangleNames) { elements[elements.length - 1].value.setUseNames(true); }
//       elements[elements.length - 1].value.setUseFunction(rectangleUseFunction);
//       elements[elements.length - 1].value.setVerticalAdjust(rectangleVerticalAdjust);
//       break;

//     case 1:
//       elements.push({type:'secant', value: new AdjSecant(boardInfo, xinterval, f)});
//       break;

//     case 2:
//       elements.push({type:'secant rectangle', value: new AdjSecantRect(boardInfo, xinterval, f)});
//       break;

//     case 3:
//     {
//       let Nslider = new IntSlider(board, boardInfo, xslider, yslider, 1, 100, 'N', sliderWidth);
//       Nslider.setValue(defaultArrayN);
//       elements.push({type:'rectangle array', value: new RectangleArray(boardInfo, xinterval, f, Nslider)});
//       break;
//     }
      

//     case 4:
//     {
//       let Nslider = new IntSlider(board, boardInfo, xslider, yslider, 1, 100, 'N',sliderWidth);
//       let fA = function(x) { return [f(x),0,0]; };
//       elements.push({type:'secant array', value: new SecantArray(boardInfo, xinterval, fA, Nslider)});
//       break;
//     }

//     case 5:
//     {
//       let Nslider = new IntSlider(board, boardInfo, xslider, yslider, 1, 100, 'N', sliderWidth);
//       elements.push({type:'secant rectangle array', value: new SecantRectangleArray(boardInfo, xinterval, f, Nslider)});
//       break;
//     }

//     default: 
//       console.log('bad element type', m);
//       break;

//     }
//   };

//   this.undo = function() {
//     if (elements.length > 0 ) {
//       elements[elements.length - 1].value.delete();
//       elements.pop();
//     }

//   };

//   this.resize = function(canvasWidth, canvasHeight) { 
//     board.resizeContainer(canvasWidth, canvasHeight);
//   };

//   this.setSnapMargin = function(margin) { snapMargin = margin; };
//   this.setUseRectangleNames = function(b) { useRectangleNames = b; };
//   this.setRectangleVerticalAdjust = function(b) { rectangleVerticalAdjust = b; };
//   this.setRectangleUseFunction = function(b) { rectangleUseFunction = b; };
//   this.setDefaultArrayN = function(n) { defaultArrayN = n; };

//   this.getElement = function(i) { 
//     if (i < elements.length) {
//       return elements[i].value;
//     }
//     return -1;
//   };

//   this.getArea = function() {
//     let area = 0;
//     for (let i = 0; i < elements.length; i++) {
//       let t = elements[i].type;
//       if (t == 'rectangle' || t == 'display rectangle') {
//         area += elements[i].value.area();
//       }
//     }
//     return area;
//   };

//   this.maxX = function() {
//     if (elements.length == 0) return 0;

//     let maxX = elements[0].value.x2();
//     for (let i = 1; i < elements.length; i++) {
//       if (elements[i].value.x2() > maxX) {
//         maxX = elements[i].value.x2();
//       }
//     }
//     return maxX;
//   };
// }

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
        strokeColor:'#CCCCCC', 
        highlightStrokeColor:'#AAAAFF',
        strokeWidth:1, 
        visible:true
      });

    let points = [];
    for (let i=0; i < F.points.length; i++) {
      let point = this.board.create('point', [
        F.points[i],
        F.f(F.points[i])], { name:'', color:'#CCCCCC', fixed:true});
      points.push(point);
    }
    let title = this.board.create('text', [
      F.tanchor + this.Xerror,
      F.f(F.tanchor),
      F.title], { color: '#AAAAFF', visible: false });
    
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
    0 : function(xint, F, names) { return new AdjRectangle(xint, F, names); },
    1 : function(xint, F, names) { return new AnnotatedRectangle(xint, F, names); },
    2 : function(xint, F, names) { return new AdjHeightRectangle(xint, F, names); },
    3 : function(xint, F, names) { return new AdjSecant(xint, F, names); },
    4 : function(xint, F, names) { return new AnnotatedSecant(xint, F, names); },
    5 : function(xint, F, names) { return new AdjSecantRect(xint, F, names); },
    6 : function(xint, F, names) { return new RectangleArray(xint, F, names); },
    7 : function(xint, F, names) { return new SecantArray(xint, F, names); },
    8 : function(xint, F, names) { return new SecantRectangleArray(xint, F, names); }
}

class Workspace extends StandardBoard {
  constructor(divName, Box, attributes) {
    super(divName, Box, attributes)
    this.elements = [];

    this.onUpdate = this.onUpdate.bind(this);
    this.rise = this.rise.bind(this);
    this.area = this.area.bind(this);
  }

  onUpdate() {
    for (let i=0; i < this.elements.length; i++) {
      this.elements[i].onUpdate();
    }
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

  addElementByID(id, percent, f_id, names) {

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
    this.elements.push(widgetConstructor[id](xint, this.functions[f_id].f, names));
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

  exports.AdjRectangle = AdjRectangle;
  exports.AnnotatedRectangle = AnnotatedRectangle;
  exports.AdjHeightRectangle = AdjHeightRectangle;
  exports.AdjSecant = AdjSecant;
  exports.AnnotatedSecant = AnnotatedSecant;
  exports.AdjSecantRect = AdjSecantRect;
  exports.RectangleArray = RectangleArray;
  exports.SecantArray = SecantArray;
  exports.SecantRectangleArray = SecantRectangleArray;
  exports.ProblemFunction = ProblemFunction;
  exports.XInterval = XInterval;
  exports.StandardBoard = StandardBoard;
  exports.Workspace = Workspace;

});

