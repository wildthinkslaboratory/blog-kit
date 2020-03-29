const blue = '#66AAFF';
const brightblue = '#00AAFF';
const darkblue = '#1155CC';
const lightgray = '#CCCCCC';
const mediumgray = '#AAAAAA';
const darkgray = '#333333';
const darktomato = '#DD3333';
const tomato = '#FF2222'; 

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
    this.xline = b.create('line', [[0,0],[1,0]], {visible:false});
    this.x1 = b.create('glider', [X1,0,this.xline], {name: '', size:5, color:'green'});
    this.x2 = b.create('glider', [X2,0,this.xline], {name: '', size:5, color:'red'});
    this.midX = this.midX.bind(this);
    this.vline = b.create('line', [[this.midX ,0], [this.midX, 1]], {visible:false});
    this.midY = b.create('glider', [this.midX(), 0, this.vline], {
      name: '', size:4, color:colors.stroke, visible:false, showInfoBox:false});
    this.snapToGrid = true;
    this.checkSnapToGrid = this.checkSnapToGrid.bind(this);
    this.snapMargin = 0.05;
    this.onUpdate = this.onUpdate.bind(this);

  }

  midX() {
    return this.x1.X() + (this.x2.X() - this.x1.X()) / 2;
  }

  setSnapMargin(margin) { this.snapMargin = margin; }
  delete() {
    this.board.removeObject(this.xline);
    this.board.removeObject(this.x1);
    this.board.removeObject(this.x2);
    this.board.removeObject(this.vline);
    this.board.removeObject(this.midY);

  }

  checkSnapToGrid() {
    if (this.snapToGrid) {
      let floor = Math.floor(this.x1.X());
      if (this.x1.X() < floor + this.snapMargin) {
        this.x1.moveTo([floor,0]);
      }
      else {
        let ceiling = Math.ceil(this.x1.X());
        if (this.x1.X() > ceiling - this.snapMargin) {
          this.x1.moveTo([ceiling,0]);
        }
      }
      floor = Math.floor(this.x2.X());
      if (this.x2.X() < floor + this.snapMargin) {
        this.x2.moveTo([floor,0]);
      }
      else {
        let ceiling = Math.ceil(this.x2.X());
        if (this.x2.X() > ceiling - this.snapMargin) {
          this.x2.moveTo([ceiling,0]);
        }
      }
    }
  }

  onUpdate() { this.checkSnapToGrid(); }

  turnOffSnapToGrid() { this.snapToGrid = false; }

}



function AdjRectangle(binfo, xinterval, F, rectNames = ['','','']) {

  let board = binfo.board;
  let bi = binfo; 
  let showAnnotations = false;   
  let attachedFunction = F;  // function that determines it's height
  let areaName = rectNames[0];
  let lengthName = rectNames[1];
  let widthName = rectNames[2];
  let xint = xinterval;
  let useNames = false;
  let verticalAdjust = false;  // allow vertical adjusting
  let useFunction = true;


  if (verticalAdjust) { xint.midY.setAttribute({visible:true}); }
  let height = function() {
    if (verticalAdjust || !useFunction) { return xint.midY.Y(); }
    else { return attachedFunction(xint.midX()); }
  };

  let area = function() { return (xint.x2.X() - xint.x1.X()) * height(); };
  let getAreaName = function() { return areaName; };
  let getLengthName = function() { return lengthName; };
  let getWidthName = function() { return widthName; };
  let getAreaText = function() { 
    let prefix = '';
    if (useNames) {
      prefix = getAreaName() + ' = ';
    }
    return prefix + area().toFixed(2); 
  };
  let getWidthText = function() { 
    let prefix = '';
    if (useNames) {
      prefix = getWidthName() + ' = ';
    }
    return prefix + height().toFixed(2); 
  };
  let getLengthText = function() { 
    let prefix = '';
    if (useNames) {
      prefix = getLengthName() + ' = ';
    }
    return prefix + (xint.x2.X() - xint.x1.X()).toFixed(2); 
  };

  


  // the two points that define the top of rectangle
  let f1 = board.create('point', [function() { return xint.x1.X(); }, height], {visible:false});
  let f2 = board.create('point', [function() { return xint.x2.X(); }, height], {visible:false});

  this.rect = board.create('polygon',
    [xint.x1, f1, f2, xint.x2], {
      strokeColor: colors.stroke,
      fillColor:colors.fill, 
      highlightStrokeColor:colors.highlightStroke,
      highlightFillColor:colors.highlightFill, 
      hasInnerPoints:true
    });

  
  // these components are all part of the annotation
  let areaText = board.create('text', [
    function() { return xint.midX() - bi.Xerror;},
    function() { return height() / 2; },
    getAreaText
  ], {fontSize:15, visible:false});
  
  let p1 = board.create('point',[
    function() { return xint.x2.X() + bi.Xerror / 2; }, 
    height
  ],{visible:false});

  let p2 = board.create('point',[
    function() { return xint.x2.X() +  bi.Xerror / 2; }, 
    0 
  ],{visible:false});

  let dimensionLine = board.create('segment', [p1,p2], {
    strokeColor:colors.lightAnnote, 
    strokeWidth:2, 
    firstArrow:true, 
    lastArrow:true, 
    visible:false});
  let dimensionText = board.create('text', [
    function() { return xint.x2.X() + bi.Xerror; } ,
    function () { return height() / 2; },
    getWidthText
  ],{ strokeColor:colors.lightAnnote, fontSize: 15, visible:false});

  let p3 = board.create('point',[
    function() { return xint.x1.X(); }, 
    function() { return height() + bi.Yerror; }
  ],{visible:false});

  let p4 = board.create('point',[
    function() { return xint.x2.X(); }, 
    function() { return height() + bi.Yerror; }
  ],{visible:false});

  let dimensionLine2 = board.create('segment', [p3,p4], {
    strokeColor: colors.lightAnnote, 
    strokeWidth:2, 
    firstArrow:true, 
    lastArrow:true, 
    visible:false});

  let dimensionText2 = board.create('text', [
    function() { return xint.x1.X() + (xint.x2.X() - xint.x1.X())/2 - bi.Xerror; } ,
    function () { return height() + 2 * bi.Yerror; },
    getLengthText
  ],{strokeColor: colors.lightAnnote, fontSize: 15, visible:false});


  this.rect.on('over', function(){
    turnOnAnnotations();
  });

  this.rect.on('out', function(){
    if (!showAnnotations) {
      turnOffAnnotations();
    }
  });

  function turnOnAnnotations() {
    areaText.setAttribute({visible:true});
    dimensionText.setAttribute({visible:true});
    dimensionLine.setAttribute({visible:true});
    dimensionText2.setAttribute({visible:true});
    dimensionLine2.setAttribute({visible:true});
  }

  function turnOffAnnotations() {
    areaText.setAttribute({visible:false});
    dimensionText.setAttribute({visible:false});
    dimensionLine.setAttribute({visible:false});
    dimensionText2.setAttribute({visible:false});
    dimensionLine2.setAttribute({visible:false});
  }

  // functions we are exporting
  this.setHeight = function(h) {    
    if (verticalAdjust) {
      xint.midY.moveTo([xint.midY.X(),h]); 
    }   
  };

  this.snapToFunction = function() {
    if (useFunction) {
      let currentH = height();
      let functionH = attachedFunction(xint.midX());
      if (currentH <= functionH + bi.Yerror && currentH >= functionH - bi.Yerror) {
        this.setHeight(attachedFunction(xint.midX()));
      }
    }
  };

  // this.setFunction = function(f) { 
  //   attachedFunction = f; 
  // };


  this.annotationsOn = function() { turnOnAnnotations(); };
  this.annotationsOff = function() { turnOffAnnotations(); };
  this.annotationsOn = this.annotationsOn.bind(this);
  this.annotationsOff = this.annotationsOff.bind(this);

  this.showAnnotations = function(b) { 
    showAnnotations = b; 
    if (showAnnotations) {
      turnOnAnnotations();
    }

  };

  this.area = function() { return (xint.x2.X() - xint.x1.X()) * height(); };
  this.x2 = function() { return xint.x2.X(); };

  this.setUseNames = function(b) { useNames = b; };
  this.setUseFunction = function(b) { useFunction = b; };
  this.setVerticalAdjust = function(b) { 
    verticalAdjust = b; 
    if (verticalAdjust) {
      xint.midY.setAttribute({visible:true}); 
      xint.midY.moveTo([xint.midY.X(), bi.Yerror * 5]);
    }
  };

  this.setFillColor = function(color) { 
    this.rect.setAttribute({fillColor:color});
  };

  this.setNames = function(n) { 
    if (n.length == 3) {
      areaName = n[0];
      lengthName = n[1];
      widthName = n[2];
    }
  };

  this.delete = function() {
    board.removeObject(dimensionLine2);
    board.removeObject(dimensionText2);
    board.removeObject(dimensionLine);
    board.removeObject(dimensionText);
    board.removeObject(p3);
    board.removeObject(p4);
    board.removeObject(p2);
    board.removeObject(p1);
    board.removeObject(areaText);
    board.removeObject(this.rect);
    board.removeObject(f1);
    board.removeObject(f2);
    xint.delete();
  };

  this.onUpdate = function() {
    xint.onUpdate();
    this.snapToFunction();
  };
}


function AdjRectangle2(binfo, xinterval, F, 
  bf = function(x) { return 0; }, 
  rectNames = ['','','']) {

  let board = binfo.board;
  let bi = binfo; 
  let topFunction = F;  // function that determines it's height
  let baseFunction = bf;
  let xint = xinterval;

  let showAnnotations = false;   
  let areaName = rectNames[0];
  let lengthName = rectNames[1];
  let widthName = rectNames[2];
  let useNames = false;

  // here
  let height = function() {
    return topFunction(xint.midX()) - baseFunction(xint.midX());
  };
  let top = function() {
    return topFunction(xint.midX());
  };
  let base = function() {
    return baseFunction(xint.midX());
  };


  let area = function() { return (xint.x2.X() - xint.x1.X()) * height(); };
  let getAreaName = function() { return areaName; };
  let getLengthName = function() { return lengthName; };
  let getWidthName = function() { return widthName; };
  let getAreaText = function() { 
    let prefix = '';
    if (useNames) {
      prefix = getAreaName() + ' = ';
    }
    return prefix + area().toFixed(2); 
  };
  let getWidthText = function() { 
    let prefix = '';
    if (useNames) {
      prefix = getWidthName() + ' = ';
    }
    return prefix + height().toFixed(2); 
  };
  let getLengthText = function() { 
    let prefix = '';
    if (useNames) {
      prefix = getLengthName() + ' = ';
    }
    return prefix + (xint.x2.X() - xint.x1.X()).toFixed(2); 
  };

  


  // the two points that define the top of rectangle
  let t1 = board.create('point', [function() { return xint.x1.X(); }, top ], {visible:false});
  let t2 = board.create('point', [function() { return xint.x2.X(); }, top ], {visible:false});
  let b1 = board.create('point', [function() { return xint.x1.X(); }, base ], {visible:false});
  let b2 = board.create('point', [function() { return xint.x2.X(); }, base ], {visible:false});


  this.rect = board.create('polygon',
    [b1, t1, t2, b2], {
      strokeColor: colors.stroke,
      fillColor:colors.fill, 
      highlightStrokeColor:colors.highlightStroke,
      highlightFillColor:colors.highlightFill, 
      hasInnerPoints:true
    });

  
  // these components are all part of the annotation
  let areaText = board.create('text', [
    function() { return xint.midX() - bi.Xerror;},
    function() { return base() + height() / 2; },
    getAreaText
  ], {fontSize:15, visible:false});
  
  let p1 = board.create('point',[
    function() { return xint.x2.X() + bi.Xerror / 2; }, 
    top
  ],{visible:false});

  let p2 = board.create('point',[
    function() { return xint.x2.X() +  bi.Xerror / 2; }, 
    base 
  ],{visible:false});

  let dimensionLine = board.create('segment', [p1,p2], {
    strokeColor:colors.lightAnnote, 
    strokeWidth:2, 
    firstArrow:true, 
    lastArrow:true, 
    visible:false});
  let dimensionText = board.create('text', [
    function() { return xint.x2.X() + bi.Xerror; } ,
    function () { return base() + height() / 2; },
    getWidthText
  ],{ strokeColor:colors.lightAnnote, fontSize: 15, visible:false});

  let p3 = board.create('point',[
    function() { return xint.x1.X(); }, 
    function() { return base() + height() + bi.Yerror; }
  ],{visible:false});

  let p4 = board.create('point',[
    function() { return xint.x2.X(); }, 
    function() { return base() + height() + bi.Yerror; }
  ],{visible:false});

  let dimensionLine2 = board.create('segment', [p3,p4], {
    strokeColor: colors.lightAnnote, 
    strokeWidth:2, 
    firstArrow:true, 
    lastArrow:true, 
    visible:false});

  let dimensionText2 = board.create('text', [
    function() { return xint.x1.X() + (xint.x2.X() - xint.x1.X())/2 - bi.Xerror; } ,
    function () { return base() + height() + 2 * bi.Yerror; },
    getLengthText
  ],{strokeColor: colors.lightAnnote, fontSize: 15, visible:false});


  this.rect.on('over', function(){
    turnOnAnnotations();
  });

  this.rect.on('out', function(){
    if (!showAnnotations) {
      turnOffAnnotations();
    }
  });

  function turnOnAnnotations() {
    areaText.setAttribute({visible:true});
    dimensionText.setAttribute({visible:true});
    dimensionLine.setAttribute({visible:true});
    dimensionText2.setAttribute({visible:true});
    dimensionLine2.setAttribute({visible:true});
  }

  function turnOffAnnotations() {
    areaText.setAttribute({visible:false});
    dimensionText.setAttribute({visible:false});
    dimensionLine.setAttribute({visible:false});
    dimensionText2.setAttribute({visible:false});
    dimensionLine2.setAttribute({visible:false});
  }


  this.annotationsOn = function() { turnOnAnnotations(); };
  this.annotationsOff = function() { turnOffAnnotations(); };
  this.annotationsOn = this.annotationsOn.bind(this);
  this.annotationsOff = this.annotationsOff.bind(this);

  this.showAnnotations = function(b) { 
    showAnnotations = b; 
    if (showAnnotations) {
      turnOnAnnotations();
    }

  };

  this.area = function() { return (xint.x2.X() - xint.x1.X()) * height(); };
  this.x2 = function() { return xint.x2.X(); };

  this.setUseNames = function(b) { useNames = b; };
  this.setUseFunction = function(b) { useFunction = b; };


  this.setFillColor = function(color) { 
    this.rect.setAttribute({fillColor:color});
  };

  this.setNames = function(n) { 
    if (n.length == 3) {
      areaName = n[0];
      lengthName = n[1];
      widthName = n[2];
    }
  };

  this.delete = function() {
    board.removeObject(dimensionLine2);
    board.removeObject(dimensionText2);
    board.removeObject(dimensionLine);
    board.removeObject(dimensionText);
    board.removeObject(p3);
    board.removeObject(p4);
    board.removeObject(p2);
    board.removeObject(p1);
    board.removeObject(areaText);
    board.removeObject(this.rect);
    board.removeObject(f1);
    board.removeObject(f2);
    xint.delete();
  };

  this.onUpdate = function() {
    xint.onUpdate();
  };
}

/*
  - why doesn't strokeColor work?  Maybe a bug in jsxgraph?
*/
function AdjSecant(binfo, xinterval, F) {

  let board = binfo.board;
  let bi = binfo;    
  let f = F;  
  let showAnnotations = false;

  let xint = xinterval;
  
  let f1 = board.create('point', [
    function() { return xint.x1.X(); },  
    function() { return f(xint.x1.X());}
  ], {color: colors.stroke, size:3, name:'', visible:true});
  let f2 = board.create('point', [
    function() { return xint.x2.X(); } , 
    function() { return f(xint.x2.X());}
  ], {color: colors.stroke, size:3, name:'', visible:true});

  this.line = board.create('line', [f1, f2], {
    strokeColor: colors.stroke, 
    highlightStrokeColor: colors.stroke,
    strokeWidth:4, 
    straightFirst:false, 
    straightLast:false, 
    visible:true});
  let slope = function() { return  ((f(xint.x2.X()) - f(xint.x1.X())) / (xint.x2.X() - xint.x1.X())).toFixed(3); };

  let slopeText = board.create('text', [
    function() { return xint.midX() - 4 * bi.Xerror;},
    function() { return f1.Y() + (f2.Y() - f1.Y()) / 2 + bi.Yerror; },
    function() { return 'slope = ' + slope(); }
  ], {strokeColor: colors.lightAnnote, fontSize:15, visible:false});

  let p3 = board.create('point',[ function() { return xint.x2.X(); }, function() { return f2.Y(); }],{visible:false});
  let p4 = board.create('point',[ function() { return xint.x2.X(); }, function() { return f1.Y(); } ],{visible:false});

  let dimensionLine = board.create('segment', [p3,p4], {
    strokeColor: colors.lightAnnote, 
    strokeWidth:2, 
    firstArrow:true, 
    lastArrow:true, 
    visible:false});

  let dimensionText = board.create('text', [
    function() { return xint.x2.X() + bi.Xerror/2; } ,
    function () { return f1.Y() + (f2.Y() - f1.Y()) / 2; },
    function() { return (f2.Y() - f1.Y()).toFixed(3); }
  ],{strokeColor: colors.lightAnnote, fontSize: 15, visible:false});


  this.line.on('over', function(){
    turnOnAnnotations();
  });
  this.line.on('out', function(){
    if (!showAnnotations) {
      turnOffAnnotations();
    }
  });

  function turnOnAnnotations() {
    slopeText.setAttribute({visible:true});
    dimensionText.setAttribute({visible:true});
    dimensionLine.setAttribute({visible:true});
  }

  function turnOffAnnotations() {
    slopeText.setAttribute({visible:false});
    dimensionText.setAttribute({visible:false});
    dimensionLine.setAttribute({visible:false});
  }


  this.setFunction = function(F) { f = F; };
  this.x2 = function() { return xint.x2.X(); };

  this.annotationsOn = function() { turnOnAnnotations(); };
  this.annotationsOff = function() { turnOffAnnotations(); };
  this.annotationsOn = this.annotationsOn.bind(this);
  this.annotationsOff = this.annotationsOff.bind(this);

  this.delete = function() {
    board.removeObject(dimensionLine);
    board.removeObject(dimensionText);
    board.removeObject(p3);
    board.removeObject(p4);
    board.removeObject(slopeText);
    board.removeObject(this.line);
    board.removeObject(f1);
    board.removeObject(f2);
    xint.delete();
  };

  this.onUpdate = function() {
    xint.onUpdate();
  };
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


function WorkSpace(b) {
  let board = b;
  let boardInfo = new BoardInfo(b);
  let elements = [];
  let snapMargin = 0.05;
  let rectangleNames = ['', '', ''];
  let useRectangleNames = false;
  let rectangleUseFunction = true;
  let rectangleVerticalAdjust = false;
  let defaultArrayN = 10;

  this.boardUpdate = function() {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].type = 'rectangle') {
        elements[i].value.onUpdate();
      }
    }
  };

  this.setRectangleNames = function(names) { rectangleNames = names; };

  this.addElement = function(m, xPlacement, f) {

    let startx = board.getBoundingBox()[0];
    let endx = board.getBoundingBox()[2];
    let x1 = startx + (endx - startx) * xPlacement;
    let x2 = x1 + 5 * boardInfo.Xerror;
    let xinterval = new XInterval(board, x1, x2);
    xinterval.setSnapMargin(snapMargin);
    let xslider = function() { return xinterval.x2.X() + boardInfo.Xerror; };
    let yslider = function() { return  boardInfo.Yerror; };
    let sliderWidth = boardInfo.Xerror * 3;


    switch(m) {
        
    case 0: 
      elements.push({type:'rectangle', value: new AdjRectangle(boardInfo, xinterval, f, rectangleNames)});
      if (useRectangleNames) { elements[elements.length - 1].value.setUseNames(true); }
      elements[elements.length - 1].value.setUseFunction(rectangleUseFunction);
      elements[elements.length - 1].value.setVerticalAdjust(rectangleVerticalAdjust);
      break;

    case 1:
      elements.push({type:'secant', value: new AdjSecant(boardInfo, xinterval, f)});
      break;

    case 2:
      elements.push({type:'secant rectangle', value: new AdjSecantRect(boardInfo, xinterval, f)});
      break;

    case 3:
    {
      let Nslider = new IntSlider(board, boardInfo, xslider, yslider, 1, 100, 'N', sliderWidth);
      Nslider.setValue(defaultArrayN);
      elements.push({type:'rectangle array', value: new RectangleArray(boardInfo, xinterval, f, Nslider)});
      break;
    }
      

    case 4:
    {
      let Nslider = new IntSlider(board, boardInfo, xslider, yslider, 1, 100, 'N',sliderWidth);
      let fA = function(x) { return [f(x),0,0]; };
      elements.push({type:'secant array', value: new SecantArray(boardInfo, xinterval, fA, Nslider)});
      break;
    }

    case 5:
    {
      let Nslider = new IntSlider(board, boardInfo, xslider, yslider, 1, 100, 'N', sliderWidth);
      elements.push({type:'secant rectangle array', value: new SecantRectangleArray(boardInfo, xinterval, f, Nslider)});
      break;
    }
 
    case 6: 
      elements.push({type:'display rectangle', value: new DisplayRectangle(boardInfo, xinterval, f)});
      break;

    default: 
      console.log('bad element type', m);
      break;

    }
  };

  this.undo = function() {
    if (elements.length > 0 ) {
      elements[elements.length - 1].value.delete();
      elements.pop();
    }

  };

  this.resize = function(canvasWidth, canvasHeight) { 
    board.resizeContainer(canvasWidth, canvasHeight);
  };

  this.setSnapMargin = function(margin) { snapMargin = margin; };
  this.setUseRectangleNames = function(b) { useRectangleNames = b; };
  this.setRectangleVerticalAdjust = function(b) { rectangleVerticalAdjust = b; };
  this.setRectangleUseFunction = function(b) { rectangleUseFunction = b; };
  this.setDefaultArrayN = function(n) { defaultArrayN = n; };

  this.getElement = function(i) { 
    if (i < elements.length) {
      return elements[i].value;
    }
    return -1;
  };

  this.getArea = function() {
    let area = 0;
    for (let i = 0; i < elements.length; i++) {
      let t = elements[i].type;
      if (t == 'rectangle' || t == 'display rectangle') {
        area += elements[i].value.area();
      }
    }
    return area;
  };

  this.maxX = function() {
    if (elements.length == 0) return 0;

    let maxX = elements[0].value.x2();
    for (let i = 1; i < elements.length; i++) {
      if (elements[i].value.x2() > maxX) {
        maxX = elements[i].value.x2();
      }
    }
    return maxX;
  };
}

function SingleFunctionBoard(divName, bBox, F, attributes) {

  // default values
  let xName = '';
  let yName = '';
  let startX = bBox[0];
  let endX = bBox[2];
  let flabelX = 0;
  let flabelY = 0;
  let flabel = '';
  let endF = bBox[2];

  if ('xName' in attributes) { xName = attributes.xName; }
  if ('yName' in attributes) { yName = attributes.yName; }
  if ('startX' in attributes) { startX = attributes.startX; }
  if ('endX' in attributes) { endX = attributes.endX; }
  if ('flabel' in attributes) { flabel = attributes.flabel; }
  if ('flabelX' in attributes) { flabelX = attributes.flabelX; }
  if ('flabelY' in attributes) { flabelY = attributes.flabelY; }
  if ('endF' in attributes) { endF = attributes.endF; }
  let f = F;
  
  // create the board and axes
  JXG.Options.axis.ticks.majorHeight = 40;
  this.board = JXG.JSXGraph.initBoard(divName, 
    { boundingbox:bBox, keepaspectratio:false, axis:false, showCopyright:false});

  let xaxis = this.board.create('axis', [[0, 0], [1,0]], 
    {name:xName, 
      withLabel: true,
      label: {
        fontSize: 15,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
    });

  let yaxis = this.board.create('axis', [[0, 0], [0, 1]], 
    {name:yName, 
      withLabel: true, 
      label: {
        fontSize: 15,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-90, -20]   // (in pixels)
      }
    });   

  let pI = this.board.create('point', [startX, f(startX)],{name:'', color:'#7777DD', fixed:true});
  let pF = this.board.create('point', [endX,f(endX)],{name:'', color:'#7777DD', fixed:true});

  let f_graph = this.board.create('functiongraph', [f,startX,endF], {
    strokeColor:'#7777DD', 
    highlightStrokeColor:'#AAAAFF',
    strokeWidth:1, 
    visible:true});



  let ftext = this.board.create('text', [flabelX, flabelY, flabel], {
    fontSize:15,
    strokeColor:'#AAAAFF', 
    visible:false
  });

  f_graph.on('over', function() {
    ftext.setAttribute({visible:true});
    f_graph.setAttribute({strokeWidth:3});
  });

  f_graph.on('out', function() {
    ftext.setAttribute({visible:false});
    f_graph.setAttribute({strokeWidth:1});
  });


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
  exports.AdjSecant = AdjSecant;
  exports.AdjSecantRect = AdjSecantRect;
  exports.RectangleArray = RectangleArray;
  exports.SecantArray = SecantArray;
  exports.SecantRectangleArray = SecantRectangleArray;
  exports.WorkSpace = WorkSpace;
  exports.Slider = Slider;
  exports.SingleFunctionBoard = SingleFunctionBoard;
  exports.AdjRectangle2 = AdjRectangle2;
  exports.XInterval = XInterval;


});

