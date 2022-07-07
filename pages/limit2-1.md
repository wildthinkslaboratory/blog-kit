# :::: limitlaw
Most limits aren't tricky.  If there is no chance of dividing by zero or taking the root of a negative number, then the limit is exactly what you'd expect it to be.
# ::::

#### Solve the Limits

#### --outlinebox outer1

#### --outlinebox left1
# --outlinebox b3
$$
\lim_{x \to 0} 2 + x
$$
Solution: [](:?s1)
# --outlinebox 

# --outlinebox b4
$$
\lim_{x \to 0} 10 + x^2 + x
$$
Solution: [](:?s2)
# --outlinebox 
#### --outlinebox


#### --outlinebox right1
# --outlinebox b1
$$
\lim_{x \to 1} \sqrt{\frac{(x^2 + 2x + 1)}{x + 3}}
$$
Solution: [](:?s3)
# --outlinebox

# --outlinebox b2
$$
\lim_{x \to 3} \frac{x^2 - 7}{x + 1}
$$
Solution: [](:?s4)
# --outlinebox 

#### --outlinebox
#### --outlinebox

# :::: continue
[Continue](/pages/limit2)
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

smartdown.showDisclosure('limitlaw','','center,shadow,outline,lightbox,draggable,closeable');

```


```javascript /autoplay
smartdown.setVariable('s1', '');

this.dependOn = ['s1'];
this.depend = function() {

    if (env.s1 == '2') {
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

    if (env.s2 == '10') {
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

let answer = new ProblemAnswer(['1/2', '0.5'], [  ]);

this.dependOn = ['s4'];
this.depend = function() {

    if (answer.checkAnswer(env.s4)) {
      smartdown.showDisclosure('correct','','bottomright,transparent,colorbox,shadow');
      setTimeout(function () {
        smartdown.hideDisclosure('correct','','bottomright,colorbox,shadow');
      }, 3000);
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

    if (env.s1 == '2' && env.s2 == '10' && env.s3 == '1' && (env.s4 == '1/2' || env.s4 == '0.5')) {
      smartdown.showDisclosure('continue','','transparent');
    }
};
```

# :::: correct
# --colorbox
Correct!
# --colorbox
# ::::