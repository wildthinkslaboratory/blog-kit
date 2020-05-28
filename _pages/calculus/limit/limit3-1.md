---
title: Limit
smartdown: true
lesson: 'limit'
ogimage: /assets/images/calculus/limits.jpg
header: 'none'
---

# :::: limitlaw
# --partialborder
In the previous example
$$ 
\lim_{x \to 3} \frac{x^2 + x -12}{x-3} = 7
$$
the expression is not defined at $x=3$.  We can do a little algebra and rewrite the limit
$$ 
\require{cancel}
\lim_{x \to 3} \frac{x^2 + x -12}{x-3} = \lim_{x \to 3} \frac{(x-3)(x+4)}{x-3} = \lim_{x \to 3} \frac{\cancel{(x-3)}(x+4)}{\cancel{x-3}} = \lim_{x \to 3} x + 4 = 7
$$
This makes it easier to solve the limit without graphing the expression. We need to be careful when we cancel expressions in a fraction.  We can't cancel an expression whose value may be zero.  You can read more on the dangers of dividing by zero [here](/pages/divideByZero).  In this case, we're safe because we are assuming that $x$ will get very close to $3$ but will never reach it.  The value of the expression we're canceling is guaranteed never to be zero.

Use cancellation to solve the following limits. 
# --partialborder
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

smartdown.showDisclosure('limitlaw','','transparent,center,shadow,outline,lightbox,draggable,closeable');

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
smartdown.setVariable('s4', '');

this.dependOn = ['s4'];
this.depend = function() {

    if (env.s4 == '1/2') {
      smartdown.showDisclosure('correct','','bottomright,transparent,colorbox,shadow');
      setTimeout(function () {
        smartdown.hideDisclosure('correct','','bottomright,colorbox,shadow');
      }, 3000);
    }
};
```

```javascript /autoplay
this.dependOn = ['s1','s2','s3','s4'];
this.depend = function() {

    if (env.s1 == '2' && env.s2 == '10' && env.s3 == '1' && env.s4 == '1/2') {
      smartdown.showDisclosure('continue','','transparent');
    }
};
```

# :::: correct
# --colorbox
Correct!
# --colorbox
# ::::