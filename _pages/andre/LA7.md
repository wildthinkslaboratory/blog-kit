---
title: 'The Matrix of a Linear Transformation'
smartdown: true
header: 'none'
---

### The Matrix of a Linear Transformation

![fullwidth](https://www.youtube.com/watch?v=rHLEWRxRGiM&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=5)
The **identity** matrix 

$$ I_3 = 
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1 
\end{bmatrix}
$$

Not surprisingly, for any vector ${\bf v} \in \mathbb{R}^3$ we have $I_3 {\bf v} = {\bf v}$.

# --outlinebox
**Theorem** Let $T:\mathbb{R}^n \rightarrow \mathbb{R}^m$ be a linear transformation.  Then there exists a unique matrix $A$ such that $$T({\bf x}) = A{\bf x} \text{  for all } {\bf x} \in \mathbb{R}^n$$
In fact, $A$ is the $m \times n$ matrix whose $j$th column is the vector $T({\bf e}_j)$, where ${\bf e}_j$ is the $j$th column of the identity matrix in $\mathbb{R}^n$: $$A = [T({\bf e}_1) \cdots T({\bf e}_n)]$$
# --outlinebox

### Cool 2D Transformations
You can see why there is so much linear algegra in graphics.  

| Transformation | Matrix         |
|:---------------| :-------------:|
| reflection through $x$ axis   | $$\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix} $$|
| reflection through $y$ axis   | $$\begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix} $$|
| reflection through $x=y$      | $$\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} $$|
| horizontal contraction        | $$\begin{bmatrix} k & 0 \\ 0 & 1 \end{bmatrix} $$|
| vertical contraction          | $$\begin{bmatrix} 1 & 0 \\ 0 & k \end{bmatrix} $$|
| horizontal shear              | $$\begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix} $$|
| projection onto $x$           | $$\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} $$|
| rotation through angle $\theta$ | $$\begin{bmatrix} \cos \theta & -\sin \theta \\ \sin \theta & \cos \theta \end{bmatrix} $$|

.
# --outlinebox
**Theorem** Let $T:\mathbb{R}^n \rightarrow \mathbb{R}^m$ be a linear transformation. Then $T$ is one-to-one if and only if the equation $T({\bf x}) = {\bf 0}$ has only the trivial solution.
# --outlinebox
.
# --outlinebox
**Theorem** Let $T:\mathbb{R}^n \rightarrow \mathbb{R}^m$ be a linear transformation, and let $A$ be the standard matrix for $T$. Then:
 - $T$ maps $\mathbb{R}^n$ onto $\mathbb{R}^m$ if and only if the columns of $A$ span $\mathbb{R}^m$;
 - $T$ is one-to-one if and only if the columns of $A$ are linearly independent.
# --outlinebox

[Matrix Operations](/pages/LA8)
[Back to Index](/pages/andre)