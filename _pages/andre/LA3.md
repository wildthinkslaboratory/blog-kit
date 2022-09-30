---
title: 'Matrix Equations'
smartdown: true
header: 'none'
---

### Matrix Equations

A fundamental idea in linear algebra is to view a linear combination of vectors as the product of a matrix and a vector. 

# --outlinebox
**Definition** If $A$ is an $m \times n$ matrix with columns $\bf{a}_1, \bf{a}_2, \ldots , \bf{a}_n$, and if $\bf{x}$ is in $\mathbb{R}^n$ then the product of $A$ and $\bf{x}$, denoted by $A\bf{x}$, is the linear combination of the columns of $A$ using the values of $\bf{x}$ as weights.
$$
A\bf{x} =
\begin{bmatrix}
\bf{a}_1 & \bf{a}_2&  \cdots & \bf{a}_n
\end{bmatrix} 
\begin{bmatrix}
x_1 \\
\vdots \\
x_n
\end{bmatrix} 
= x_1\bf{a}_1 + x_2\bf{a}_2 + \cdots + x_n\bf{a}_n
$$
# --outlinebox

.

# --outlinebox
**Theorem** If $A$ is an $m \times n$ matrix with columns $\bf{a}_1, \bf{a}_2, \ldots , \bf{a}_n$, and if $\bf{b}$ is in $\mathbb{R}^m$, the matrix equation
$$A\bf{x} = \bf{b}$$
has the same solutions as the vector equation
$$x_1\bf{a}_1 + x_2\bf{a}_2 + \cdots + x_n\bf{a}_n = \bf{b}$$
which in turn has the same solution set as the system of linear equations whose augmented matrix is 
$$
\begin{bmatrix}
\bf{a}_1 & \bf{a}_2&  \cdots & \bf{a}_n & \bf{b}
\end{bmatrix} 
$$
# --outlinebox

.

# --aliceblue
**Note:** The matrix equation $A\bf{x} = \bf{b}$ has a solution if and only if the vector $\bf{b}$ is a linear combination of the columns in $A$.
# --aliceblue

.

# --outlinebox
**Theorem** Let $A$ be an $m \times n$ matrix. Then the following statements are equivalent.
 - For each $\bf{b} \in \mathbb{R}^m$, the equation $A\bf{x}=\bf{b}$ has a solutions.

 - Each $\bf{b} \in \mathbb{R}^m$ is a linear combination of the columns in $A$.

 - The columns of $A$ span $\mathbb{R}^m$.

 - $A$ has a [pivot position](::pivot/tooltip) in every row.
# --outlinebox

# :::: pivot
# --partialborder
A **pivot position** in a matrix $A$ is a location in $A$ that corresponds to a leading 1 in the reduced echelon form of $A$. A pivot column is a column of $A$ that contains a pivot position.
# --partialborder
# ::::

.

# --outlinebox
**Theorem** If $A$ is an $m \times n$ matrix, $\bf{u}$ and $\bf{v}$ are vectors in  $\mathbb{R}^n$, and $c$ is a scalar, then :
 - $A(\bf{u} + \bf{v}) = A\bf{u} + A\bf{v}$

 - $A(c\bf{u}) = c(A \bf{u})$
# --outlinebox 

[Solution Sets of Linear Systems](/pages/LA4)
[Back to Index](/pages/andre)
