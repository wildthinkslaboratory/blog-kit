### The Perils of Dividing by Zero

Here's a lovely proof.  Let $x = y$.
$$
\begin{align}
x^2 & = xy \newline 
x^2 - y^2 & = xy - y^2 \newline
(x+y)(x-y) & = y(x-y) \newline
x+y & = y \newline
2y & = y \newline
2 & = 1
\end{align}
$$
How did things go so wrong?  The trouble starts in the fourth line of our proof.  In the third line, we derive $$(x+y)(x-y) = y(x-y).$$ Then we divide both sides of our equation by $(x-y)$ to produce $$x+y = y.$$ We forgot that $x=y$ so this is definitely dividing by zero.  From there things go downhill fast.  We have to be careful when dividing by a variable expression to be certain that the expression will not be zero.  Otherwise, we have to live in a world where $2=1$.