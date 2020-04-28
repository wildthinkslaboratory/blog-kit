---
title: Derivative
smartdown: true
header: 'none'
lesson: 3
---

# :::: note
Note that this cancelation is allowed because we know that $h$ will never reach $0$. We won't be dividing by zero. 
# ::::

### Solving the Limit
How do we solve this limit on paper without a computer?  What happens to this expression as $h$ gets close to $0$?
[](:!formula|markdown)
Some algebra will help make this limit easier to understand.  We can [expand](:=expand=true) the $(t+h)^2$.  Then we [combine](:=combine=true) like terms. We can [cancel](:=cancel=true) the $h$'s from the numerator and denominator. [Note](::note/tooltip) Now we have a limit that is easier to think about. What happens to the expression $2t + h$ as the value of $h$ gets close to $0$? It becomes the expression $2t$.  To recap, we started with the function $f(t) = t^2$, we wrote an expression for a secant line on this function then took the limit as the secant line gets very small. We got a new function 
$$f'(t) = 2t$$
which we call the **derivative** of the function $f(t)$ and it tells us the velocity of the car at any point in time.
[Continue](/pages/derivative3)



```javascript /autoplay

let start = '\\lim_{h \\to 0} \\frac{(t+h)^2 - t^2}{h}';
let algebra1 = '= \\lim_{h \\to 0} \\frac{t^2 + 2ht + h^2 - t^2}{h}';
let algebra2 = ' = \\lim_{h \\to 0} \\frac{2ht + h^2}{h}';
let algebra3 =  '= \\lim_{h \\to 0} 2t + h';

smartdown.setVariable('formula','$$' + start + '$$');
smartdown.setVariable('expand', false);
smartdown.setVariable('combine', false);
smartdown.setVariable('cancel', false);


this.dependOn = ['expand','combine','cancel'];
this.depend = function() {
	if (env.expand == true) {
		smartdown.setVariable('expand', false);
		smartdown.setVariable('formula', '$$' + start + algebra1 + '$$');
	}
	if (env.combine == true) {
		smartdown.setVariable('combine', false);
		smartdown.setVariable('formula', '$$' + start + algebra1 + algebra2 + '$$');
	}	
	if (env.cancel == true) {
		smartdown.setVariable('cancel', false);
		smartdown.setVariable('formula', '$$' + start + algebra1 + algebra2 + algebra3 + '$$');
	}

  };
```
