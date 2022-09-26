---
title: 'Latex for Linear Algebra'
smartdown: true
header: 'none'
---

### System of Equations
```
$$ 
\begin{align*}
x_1  - & 2x_2  & + x_3 = 0  \\
       & 2x_2  & - 8x_3 = 8 \\
5x_1   &       & - 5x_3 = 10
\end{align*}
$$
```

$$ 
\begin{align*}
x_1  - & 2x_2  & + x_3 = 0 \\
         & 2x_2 & - 8x_3 = 8 \\
5x_1 &     &  - 5x_3 = 10
\end{align*}
$$

### Matrices

```
$$
\begin{bmatrix}
1 & -2 & 1 \\
0 & 2  & -8 \\
5 & 0  & -5 
\end{bmatrix}
$$
```
Is rendered as 
$$
\begin{bmatrix}
1 & -2 & 1 \\
0 & 2 & -8 \\
5 & 0 & -5 
\end{bmatrix}
$$

The `bmatrix` means bracket matrix.  There are other kinds:`matrix`, `pmatrix`, `Bmatrix`, `vmatrix`, and `Vmatrix`.  You can figure out what they do by swapping in for `bmatrix` but you probably won't need them.  I guess you'll need `vmatrix` when you get to determinants. 

You can put a series of matrices in a line.
```
$$
\begin{bmatrix}
a \\
b 
\end{bmatrix} + 
\begin{bmatrix}
c \\
d 
\end{bmatrix} =
\begin{bmatrix}
a+c \\
b+d
\end{bmatrix}
$$
```
$$
\begin{bmatrix}
a \\
b 
\end{bmatrix} + 
\begin{bmatrix}
c \\
d 
\end{bmatrix} =
\begin{bmatrix}
a+c \\
b+d
\end{bmatrix}
$$

### Vectors

A vector is just a single column matrix
```
$$
\begin{bmatrix}
1 \\
-8 
\end{bmatrix}
$$
```
$$
\begin{bmatrix}
1 \\
-8 
\end{bmatrix}
$$

When you write a variable for a vector it's usually bold face so `$\bf{v}$` gives $\bf{v}$.  `bf` stand for bold face.  


### Span

```
$$\text{Span} \{ \mathbf{v}_1,\mathbf{v}_2, \ldots , \mathbf{v}_p \}$$ 
```
$$\text{Span} \{\mathbf{v}_1,\mathbf{v}_2, \ldots , \mathbf{v}_p \}$$

[Back to Index](/pages/andre)
