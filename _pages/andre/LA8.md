---
title: 'Matrix Operations'
smartdown: true
header: 'none'
---

### 2.1 Matrix Operations

Please watch the video.  It contains important ideas that I then don't need to type in as text and you don't have to read.

![fullwidth](https://www.youtube.com/watch?v=XkY2DOUCWMU&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=4)

If $A$ is an $m \times n$ matrix with $m$ rows and $n$ columns then $a_{ij}$ is the value in the $i$th row and $j$th column.  The **diagonals** are $a_{11}, a_{22},a_{33},\ldots$ also called the **main diagonal**.  If a matrix is square $n \times n$, then it is called a **diagonal matrix**. A square matrix whose values are all zero is called the **zero matrix**.

We'll start by defining two operations on matrices.  

First, **addition**. Both matrices have to be the exact same size.  So we have $A$ and $B$ are $m \times n$ matrices.  We have that $A + B$ is the $m \times n$ matrix $C$ where each $c_{ij} = a_{ij} + b_{ij}$.  

**EXAMPLE**  
$$
\begin{bmatrix}
1 & -2 \\
0 & 3
\end{bmatrix} + 
\begin{bmatrix}
-1 & -1 \\
1 & 2
\end{bmatrix} =
\begin{bmatrix}
0 & -3 \\
1 & 5
\end{bmatrix}
$$

Second, **multiplication by a scalar**.  If $A$ is an $m \times n$ matrix, and $r \in \mathbb{R}$, then $rA$ is the $m \times n$ matrix $C$ where each $c_{ij} = r \cdot a_{ij}$.
**EXAMPLE**  
$$ 5
\begin{bmatrix}
1 & -2 \\
0 & 3
\end{bmatrix}  =
\begin{bmatrix}
5 & -10 \\
0 & 15
\end{bmatrix}
$$


# --outlinebox
**Theorem:** Let $A$, $B$, and $C$ be matrices of the same size and let $r,s \in \mathbb{R}$.
 - $A + B = B + A$
 - $(A + B) + C = A + (B + C)$
 - $A + 0 = A$ where $0$ is the zero matrix
 - $r(A + B) = rA + rB$
 - $(r + s)A = rA + sA$
 - $r(sA) = (rs)A
# --outlinebox



# --outlinebox

# --outlinebox


# --outlinebox

# --outlinebox