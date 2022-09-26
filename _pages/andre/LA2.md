---
title: 'Vectors'
smartdown: true
header: 'none'
---


![fullwidth](https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=1&t=140s)

### Vectors

A matrix with only one column is called a **column vector**, or simply a **vector**. 
**Example:**  A vector in $\mathbb{R}^2$ 
$$
\begin{bmatrix}
1 \\
-8 
\end{bmatrix}
$$

We have two operations to define for vectors. Given $a,b,c,d \in \mathbb{R}$, **addition** is
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
with the obvious generalization for higher dimension vectors. Given $a,b,c \in \mathbb{R}$, **scalar multipliation** is

$$
c \cdot
\begin{bmatrix}
a \\
b 
\end{bmatrix} = 
\begin{bmatrix}
c \cdot a \\
c \cdot b 
\end{bmatrix}
$$

The **zero vector** $\mathbf{0}$ is a vector with all zero entries. 

# --outlinebox
**Algebraic Properties of** $\mathbb{R}^n$
For all $\mathbf{u},\mathbf{v},\mathbf{w} \in \mathbb{R}^n$ and all scalars $c$ and $d$ in $\mathbb{R}$:
 - $\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$ (Commutative)
 - $(\mathbf{u} + \mathbf{v}) + \mathbf{w} = \mathbf{u} + (\mathbf{v} + \mathbf{w})$ (Addition is Associative)
 - $\mathbf{u} + \mathbf{0} = \mathbf{u}$ (Identity for Addition)
 - $\mathbf{u} + (-\mathbf{u}) = \mathbf{u}$ (Inverse for Addition)
 - $c(\mathbf{u} + \mathbf{v}) = c\mathbf{u} + c\mathbf{v}$ (Multiplication Distributes over Addition)
 - $(c + d)\mathbf{u} = c\mathbf{u} + d\mathbf{u}$ (Multiplication Distributes over Addition)
 - $c(d \mathbf{u}) = (cd)\mathbf{u}$ (Associativity for Multiplication)
 - $1(\mathbf{u})= \mathbf{u}$ (Identity for Multiplication)
# --outlinebox

### Time out for Abstract Algebra 

Your class will eventully get to some abstract algebra, but you're ready for some right now and you can check it out [here](/pages/ALA1).

![fullwidth](https://www.youtube.com/watch?v=k7RM-ot2NWY&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=2)

#### Linear Combinations
# --outlinebox
Given vectors $\mathbf{v}_1,\mathbf{v}_2, \ldots , \mathbf{v}_p$ in $\mathbb{R}^n$ and given scalars $c_1,c_2, \ldots , c_p$, the vector $\mathbf{y}$ defined by
$$\mathbf{y} = c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \cdots + c_p \mathbf{v}_p$$
is called a **linear combination** of $\mathbf{v}_1,\mathbf{v}_2, \ldots , \mathbf{v}_p$ with weights $c_1,c_2, \ldots , c_p$. The weights in a linear combination can be any real numbers, including zero.
# --outlinebox


#### Span

# --outlinebox
If $\mathbf{v}_1,\mathbf{v}_2, \ldots , \mathbf{v}_p$ are in $\mathbb{R}^n$, then the set of all linear combinations of $\mathbf{v}_1,\mathbf{v}_2, \ldots , \mathbf{v}_p$ is denoted by 
$$\text{Span} \{\mathbf{v}_1,\mathbf{v}_2, \ldots , \mathbf{v}_p \}$$
and is called the subset of $\mathbb{R}^n$ spanned (or generated)by $\mathbf{v}_1,\mathbf{v}_2, \ldots , \mathbf{v}_p$.That is, the collection of all vectors that can be written in the form
$$c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \cdots + c_p \mathbf{v}_p$$
with $c_1,c_2, \ldots , c_p$ scalars.
# --outlinebox

[Matrix Equations](/pages/LA3)
[Back to Index](/pages/andre)
