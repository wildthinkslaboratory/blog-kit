### An Easy Problem

# --outlinebox outer1

# --outlinebox left1
**Start with two points**
A car is driving in a straight line.  The position of the car is described by a function $x(t)$ and we know the position at times $t=5$ and $t=10$.  

$x(5) = 10 \; \text{m}$
$x(10) = 30 \; \text{m}$

# --outlinebox


# --outlinebox middle1
**Get the distance**
What distance does the car travel between times $t=5$ and $t=10$? [](:?a1)m
# --outlinebox


# --outlinebox right1
# :::: r1
**Get the velocity**
What is the average velocity of the car between $t=5$ and $t=10$? [](:?a2)m/s
# :::: 
# --outlinebox

# --outlinebox

![](/assets/images/rightarrow.svg)
# :::: leftarrow
![](/assets/images/leftarrow.svg)
# ::::




# --outlinebox outer2

# --outlinebox left2
# :::: l2
**Get the two points**
What is the position of the car at times $t=12$ and $t=24$?
at $t=12$ [](:?a4)m
at $t=24$ [](:?a5)m
[Hint](::hint/button,closeable,transparent,outline,draggable,lightbox,center)
# ::::
# --outlinebox


# --outlinebox middle2
# :::: m2
**Get the distance**
What distance does the car travel between times $t=12$ and $t=24$? [](:?a3)m
# ::::
# --outlinebox


# --outlinebox right2
# :::: r2
**Start with the velocity**
A car is driving in a straight line and has an average velocity of 15 m/s between the times $t=12$ and $t=24$.
# :::: 
# --outlinebox

# --outlinebox

# :::: hint
# --partialborder pb1
OK, its a trick question. We don't have enough information to compute the position of the car at those times.  

**Remember:**
If you know the position at two time points, you can figure out the rate of travel during that time interval.

If you know the rate of travel during a time interval, you can figure out the distance traveled during that interval, but you can't figure out the exact position at the time interval endpoints.

[Continue](/pages/rectangleMatch) 
# --partialborder 
# ::::

```javascript /autoplay

// grab the three caption divs and change their css
const outer = document.getElementById('outer1');
const left = document.getElementById('left1');
const middle = document.getElementById('middle1');
const right = document.getElementById('right1');

outer.classList.remove('decoration-outlinebox');
left.classList.remove('decoration-outlinebox');
middle.classList.remove('decoration-outlinebox');
right.classList.remove('decoration-outlinebox');

outer.classList.add('outer-multi-col');
left.classList.add('text-3-col');
middle.classList.add('text-3-col');
right.classList.add('text-3-col');


```

```javascript /autoplay

// grab the three caption divs and change their css
const outer2 = document.getElementById('outer2');
const left2 = document.getElementById('left2');
const middle2 = document.getElementById('middle2');
const right2 = document.getElementById('right2');

outer2.classList.remove('decoration-outlinebox');
left2.classList.remove('decoration-outlinebox');
middle2.classList.remove('decoration-outlinebox');
right2.classList.remove('decoration-outlinebox');

outer2.classList.add('outer-multi-col');
left2.classList.add('text-3-col');
middle2.classList.add('text-3-col');
right2.classList.add('text-3-col');

```

```javascript /autoplay
function removeEnterFromSmartdownString(name, smartdownVar) {
  if (smartdownVar[smartdownVar.length - 1] === '\n') {           
    smartdown.setVariable(name, smartdownVar.replace(/\s/g, ''));
  }
}

smartdown.setVariable('a1', '');

this.dependOn = ['a1'];
this.depend = function() {
  
  removeEnterFromSmartdownString('a1', env.a1);

    if (env.a1 == '20') {
      smartdown.showDisclosure('r1','','transparent');
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

smartdown.setVariable('a2', '');

this.dependOn = ['a2'];
this.depend = function() {
  removeEnterFromSmartdownString('a2', env.a2);
    if (env.a2 == '4') {
      smartdown.showDisclosure('r2','','transparent');
      smartdown.showDisclosure('leftarrow', '', 'transparent');
      smartdown.showDisclosure('m2','','transparent');
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

smartdown.setVariable('a3', '');

this.dependOn = ['a3'];
this.depend = function() {

  removeEnterFromSmartdownString('a3', env.a3);
    if (env.a3 == '180') {
      smartdown.showDisclosure('l2','','transparent');
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

smartdown.setVariable('a4', '');
smartdown.setVariable('a5', '');

this.dependOn = ['a4', 'a5'];
this.depend = function() {

  removeEnterFromSmartdownString('a4', env.a4);
  removeEnterFromSmartdownString('a5', env.a5);

	if (env.a4 !== '' || env.a5 !== '') {
    smartdown.showDisclosure('hint','','transparent,outline,closeable,draggable,lightbox,center'); 
	}
	
   
};
```



# :::: correct
# --colorbox
Correct!
# --colorbox
# ::::