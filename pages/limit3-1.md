# :::: limitlaw
# --partialborder pb1
Let's solve the previous example again without the help of a function graph.
[](:!formula|markdown)
We can do a little algebra and rewrite the limit.  First, we [factor](:=factor=true) the numerator. [Cancel](:=cancel=true) the $(x-3)$ term from the numerator and denominator. 

# --partialborder pb2
**Caution:**
We can't cancel an expression whose value may be zero.  You can read more on the dangers of dividing by zero [here](/pages/divideByZero).  In this case, we're safe because we are assuming that $x$ will get very close to $3$ but will never reach it.  The value of the expression we're canceling is guaranteed never to be zero. 
# --partialborder

Now it's easy to  [evaluate the limit](:=limit=true).  The limit of the expression at $x=3$ is $7$. 



Use cancellation to solve the following limits. 
# --partialborder
# ::::

#### Solve the Limits

#### --outlinebox outer1

#### --outlinebox left1
# --outlinebox b3
$$
\lim_{x \to -5} \frac{x^2 - 25}{x+5}
$$
Solution: [](:?s1)
# --outlinebox 

# --outlinebox b4
$$
\lim_{h \to 0} \frac{(3 + h)^2 - 3^2}{h}
$$
Solution: [](:?s2)
# --outlinebox 
#### --outlinebox


#### --outlinebox right1
# --outlinebox b1
$$
\lim_{x \to 0} \frac{x}{x}
$$
Solution: [](:?s3)
# --outlinebox

# --outlinebox b2
$$
\lim_{h \to 0} \frac{(x + h)^2 - x^2}{h}
$$
Solution: [](:?s4)
# --outlinebox 

#### --outlinebox
#### --outlinebox

# :::: continue
[Continue](/pages/limit4)
# ::::


```javascript /autoplay

const outer = document.getElementById('outer1');
const left = document.getElementById('left1');
const right = document.getElementById('right1');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('outer-multi-col');
left.classList.add('text-2-col');
right.classList.add('text-2-col');

smartdown.showDisclosure('limitlaw','','transparent,center,shadow,outline,lightbox,draggable,closeable');

```
```javascript /autoplay

// $$ 
//   = \lim_{x \to 3} \frac{\cancel{(x-3)}(x+4)}{\cancel{x-3}} = \lim_{x \to 3} x + 4 = 7
// $$


let start = '\\lim_{x \\to 3} \\frac{x^2 + x -12}{x-3}';
let algebra1 = '= \\lim_{x \\to 3} \\frac{(x-3)(x+4)}{x-3}';
let algebra2 = '= \\lim_{x \\to 3} x + 4';
let algebra3 =  '= 7';

smartdown.setVariable('formula','$$' + start + '$$');
smartdown.setVariable('factor', false);
smartdown.setVariable('cancel', false);
smartdown.setVariable('limit', false);


this.dependOn = ['factor','cancel','limit'];
this.depend = function() {
  if (env.factor == true) {
    smartdown.setVariable('factor', false);
    smartdown.setVariable('formula', '$$' + start + algebra1 + '$$');
  }
  if (env.cancel == true) {
    smartdown.setVariable('cancel', false);
    smartdown.setVariable('formula', '$$' + start + algebra1 + algebra2 + '$$');
  }
  if (env.limit == true) {
    smartdown.setVariable('limit', false);
    smartdown.setVariable('formula', '$$' + start + algebra1 + algebra2 + algebra3 + '$$');
  }

  };
```


```javascript /autoplay
smartdown.setVariable('s1', '');

this.dependOn = ['s1'];
this.depend = function() {

    if (env.s1 == '-10') {
      smartdown.showDisclosure('correct','','bottomright,transparent,colorbox,shadow');
      setTimeout(function () {
        smartdown.hideDisclosure('correct','','bottomright,colorbox,shadow');
      }, 3000);
    }
};
```
```javascript /autoplay
smartdown.setVariable('s2', '');

this.dependOn = ['s2'];
this.depend = function() {

    if (env.s2 == '6') {
      smartdown.showDisclosure('correct','','bottomright,transparent,colorbox,shadow');
      setTimeout(function () {
        smartdown.hideDisclosure('correct','','bottomright,colorbox,shadow');
      }, 3000);
    }
};
```
```javascript /autoplay
smartdown.setVariable('s3', '');

this.dependOn = ['s3'];
this.depend = function() {

    if (env.s3 == '1') {
      smartdown.showDisclosure('correct','','bottomright,transparent,colorbox,shadow');
      setTimeout(function () {
        smartdown.hideDisclosure('correct','','bottomright,colorbox,shadow');
      }, 3000);
    }
};
```
```javascript /autoplay
//smartdown.import=/assets/libs/mapping.js

smartdown.setVariable('s4', '');
smartdown.setVariable('hint', '');

let answer = new ProblemAnswer(['2x','x2'], [
  ['contains', '', 'The answer is a variable expression.']
  ]);

this.dependOn = ['s4'];

let tries = 0;
this.depend = function() {
  tries += 1;

  if (answer.checkAnswer(env.s4)) {
    smartdown.showDisclosure('correct','','bottomright,transparent,colorbox,shadow');
    setTimeout(function () {
      smartdown.hideDisclosure('correct','','bottomright,colorbox,shadow');
    }, 3000);
  }
  else {
    if (env.s4 !== '' && tries >= 3) {
      smartdown.setVariable('hint', answer.checkHints(env.s4));
      smartdown.showDisclosure('keeptrying','','transparent,bottomright,shadow');
      setTimeout(function () {
        smartdown.hideDisclosure('keeptrying','','');
      }, 5000);       
    }
  }

};
```

```javascript /autoplay
function removeEnterFromSmartdownString(name, smartdownVar) {
  if (smartdownVar[smartdownVar.length - 1] === '\n') {           
    smartdown.setVariable(name, smartdownVar.replace(/\s/g, ''));
  }
}

this.dependOn = ['s1','s2','s3','s4'];
this.depend = function() {
    removeEnterFromSmartdownString('s1', env.s1);
    removeEnterFromSmartdownString('s2', env.s2);  
    removeEnterFromSmartdownString('s3', env.s3);
    removeEnterFromSmartdownString('s4', env.s4);  

    if (env.s1 == '-10' && env.s2 == '6' && env.s3 == '1') {
      smartdown.showDisclosure('continue','','transparent');
    }
};
```
# :::: keeptrying
# --colorbox
[](:!hint) 
# --colorbox
# ::::


# :::: correct
# --colorbox
Correct!
# --colorbox
# ::::