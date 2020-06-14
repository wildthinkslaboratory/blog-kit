
let images = [];

function loadImages(playablep5) {
  let path = document.location.origin + '/assets/images/calculus/';
  images.push([playablep5.loadImage(path + 'rectButton.png'),
    playablep5.loadImage(path + 'rectButton2.png')]);
  images.push([playablep5.loadImage(path + 'secantButton.png'),
    playablep5.loadImage(path + 'secantButton2.png')]);
  images.push([playablep5.loadImage(path + 'rectSecantButton.png'),
    playablep5.loadImage(path + 'rectSecantButton2.png')]);
  images.push([playablep5.loadImage(path + 'rectArray.png'),
    playablep5.loadImage(path + 'rectArray2.png')]);
  images.push([playablep5.loadImage(path + 'secantArray.png'),
    playablep5.loadImage(path + 'secantArray2.png')]);
  images.push([playablep5.loadImage(path + 'secantRectArray.png'),
    playablep5.loadImage(path + 'secantRectArray2.png')]);
  images.push([playablep5.loadImage(path + 'limit.png'),
    playablep5.loadImage(path + 'limit2.png')]);
  images.push([playablep5.loadImage(path + 'limit.png'),
    playablep5.loadImage(path + 'limit2.png')]);
  images.push([playablep5.loadImage(path + 'epsilonDelta.png'),
    playablep5.loadImage(path + 'epsilonDelta2.png')]);
}

let toolTypes = {};
toolTypes['rectangle'] = 0;
toolTypes['secant'] = 1;
toolTypes['secant rectangle'] = 2;
toolTypes['rectangle array'] = 3;
toolTypes['secant array'] = 4;
toolTypes['secant rectangle array'] = 5;
toolTypes['limit'] = 6;
toolTypes['epsilon delta'] = 7;




function centerTextInRect(p5, x,y,width,height,text) {
  const textW = p5.textWidth(text);
  const textH = p5.textAscent() * 0.8;
  const xoffset = (width - textW) / 2;
  const yoffset = (height - textH) / 2;
  return [x + xoffset, y + height - yoffset];
}


class Button {
  constructor(name, img, img2) {
    this.name = name;
    this.color = '#FFFFFF';
    this.color2 = '#66AAFF';
    this.stroke = '#CCCCCC';
    this.stroke2 = '#CCCCCC';
    this.state = false;
    this.img = img;
    this.img2 = img2;
  }

  toggle() {
    this.state = !this.state;
  }

  getColor() {
    if (this.state) {
      return this.color2;
    }
    return this.color;
  }

  getStroke() {
    if (this.state) {
      return this.stroke2;
    }
    return this.stroke;
  }

  getImage() {
    if (this.state) {
      return this.img2;
    }
    return this.img;
  }
} 

class ButtonArray {
  constructor(playablep5, width, xSpacer, ySpacer) {
    this.p5 = playablep5;
    this.buttons = [];
    this.width = width;
    this.xSpacer = xSpacer;
    this.ySpacer = ySpacer;
  }

  inButton(i,x,y) {
    if (y < this.ySpacer || y > (this.ySpacer + this.width)) {
      return false;
    }

    let left = (this.xSpacer + this.width) * i;
    let right = left + this.width;
    if (x > left && x < right) {
      return true;
    }
    return false;
  }

  getButtonID(x, y) {
    let result = -1;
    const W = this.xSpacer + this.width;
    const N = this.buttons.length;

    // check the vertical range of the boxes
    if (y < this.ySpacer || y > (this.ySpacer + this.width)) {
      // its not in the buttons
    }
    else {
      // check the horizontal range
      const rightX = this.xSpacer + W * N;
      if (x < this.xSpacer || x > rightX) {
      // its not in the buttons
      }
      else {
        // It is in a buttons's zone, but might be in the spacer.
        const buttonId = Math.floor((x - this.xSpacer) / W);
        const buttonLeft = this.xSpacer + buttonId * W;
        const buttonRight = buttonLeft + this.width;

        if (x < buttonLeft || x > buttonRight) {
          
        }
        else {
          result = buttonId;
        }
      }
    }

    return result;
  }

  draw(mouseX,mouseY) { 
    this.p5.clear();                          
    for (let i=0; i < this.buttons.length; i++) {
      if (this.inButton(i,mouseX,mouseY)) {
        this.p5.fill('#AACCFF');
      }
      else{
        this.p5.fill(this.buttons[i].getColor());
      }
      this.p5.stroke(this.buttons[i].getStroke());
      this.p5.strokeWeight(2);
      let x = i * (this.width + this.xSpacer) + this.xSpacer;
      this.p5.rect(x, this.ySpacer, this.width, this.width, 5);  
      this.p5.image(this.buttons[i].getImage(), x, this.ySpacer, this.width, this.width);
      // let [tx, ty] = centerTextInRect(this.p5, x, this.ySpacer, this.width, this.width, this.buttons[i].name);
      // this.p5.fill('#000000');
      // this.p5.text(this.buttons[i].name, tx, ty);
    }          
  }

  mousePressed() {
    let buttonID = this.getButtonID(this.p5.mouseX,this.p5.mouseY);
    if (buttonID != -1) {
      this.buttons[buttonID].toggle();
      return [this.buttons[buttonID].name, this.buttons[buttonID].state];
    }
    return ['', false];
  }

  addButton(name, img, img2) {
    this.buttons.push(new Button(name, img, img2));
  }

  removeButton(id) {
    if (id < this.buttons.length) {
      this.buttons.splice(id,1);
    } 
  }

  size() { return this.buttons.length; }
}

class ToolPanel extends ButtonArray {
  constructor(playablep5, width, xSpacer, ySpacer) {
    super(playablep5, width, xSpacer, ySpacer);
    loadImages(playablep5);
    this.state = 0;
  }

  initialize() {
    if (this.buttons.length > 0) {
      this.buttons[0].state = true;
    }
  }

  mousePressed() {
    let buttonID = this.getButtonID(this.p5.mouseX,this.p5.mouseY);
    if (buttonID != -1) {
      this.buttons[this.state].state = false;
      this.buttons[buttonID].state = true;
      this.state = buttonID;
      return [toolTypes[this.buttons[buttonID].name], this.buttons[buttonID].state, buttonID];
    }
    return ['', false, buttonID];
  }

  addButton(toolType) {
    let value = toolTypes[toolType];
    super.addButton(toolType, images[value][0], images[value][1]);
  }

  removeActiveButton() {
    for (let i=0; i < this.buttons.length; i++) {
      if (this.buttons[i].state) {
        this.buttons[i].toggle();
        this.state = 0;
        break;
      }
    }
  }
}

class CalculusToolbar extends ToolPanel {
  constructor(playablep5) {
    super(playablep5, 40, 10, 10);

    for (let key in toolTypes) {
      let value = toolTypes[key];
      this.addButton(key, images[value][0], images[value][1]);
    }
    this.initialize();
  }
}

class ResourcePanel extends ToolPanel {
  constructor(playablep5) {
    super(playablep5, 40, 10, 10);
  }

  removeActiveButton() {
    for (let i=0; i < this.buttons.length; i++) {
      if (this.buttons[i].state) {
        this.removeButton(i);
        this.state = 0;
        break;
      }
    }
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

  exports.ButtonArray = ButtonArray;
  exports.ToolPanel = ToolPanel;
  exports.CalculusToolbar = CalculusToolbar;
  exports.ResourcePanel = ResourcePanel;


});

