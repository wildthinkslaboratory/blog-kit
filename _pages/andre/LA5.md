---
title: 'Linear Independence'
smartdown: true
header: 'none'
---

These definitions and theorems are adapted from [Linear Algebra and its Applications](https://www.cartagena99.com/recursos/alumnos/temarios/210609113348-Linear%20Algebra%20and%20its%20applications.pdf) by Lay, Lay and McDonald.

### 1.7 Linear Independence

# --outlinebox
An indexed set of vectors $\\{ {\bf v}_1,{\bf v}_2, \ldots , {\bf v}_p \\}$ in $\mathbb{R}^n$  is said to be **linearly independent** if the vector equation
$$x_1 {\bf v}_1 + x_2 {\bf v}_2 + \cdots + x_p {\bf v}_p = \bf{0}$$
has only the trivial solution. The set $\\{ {\bf v}_1,{\bf v}_2, \ldots , {\bf v}_p \\}$ is said to be **linearly dependent**
if there exist weights $c_1,c_2, \ldots , c_p$, not all zero, such that
$$c_1 {\bf v}_1 + c_2 {\bf v}_2 + \cdots + c_p {\bf v}_p = \bf{0}$$
# --outlinebox

.

# --outlinebox
The columns of a matrix $A$ are linearly indepedent if and only if the matrix equation $A {\bf x} = {\bf 0}$ has *only* the trivial solution.
# --outlinebox

#### Question
Is a single vector linearly independent? Consider the zero vector as well as other vectors.
 

# --outlinebox
A set of two vectors $\\{ {\bf v}_1, {\bf v}_2 \\}$ is linearly dependent if at least one of the vectors is a multiple of the other. The set is linearly independent if and only if neither of the vectors is a multiple of the other.
# --outlinebox
.
# --outlinebox
**Theorem** An indexed set $S = \\{ {\bf v}_1,{\bf v}_2, \ldots , {\bf v}_p \\}$ of two or more vectors is linearly dependent if and only if at least one of the vectors in $S$ is a linear combination of the others. In fact, if $S$ is linearly dependent and ${\bf v}_1 \not = {\bf 0}$,  then some ${\bf v}_j$, with $j > 1$, is a linear combination of the previous vectors 
$$\mathbf{v}_1, \ldots , \mathbf{v}_{j-1}$$
# --outlinebox
.
# --outlinebox
**Theorem** If a set contains more vectors than there are entries in each vector, then the set is linearly dependent.  That is any set $\\{ {\bf v}_1,{\bf v}_2, \ldots , {\bf v}_p \\}$ in $\mathbb{R}^n$ is linearly dependent if $p > n$.
# --outlinebox

.
# --outlinebox
**Theorem** If a set $\\{ {\bf v}_1,{\bf v}_2, \ldots , {\bf v}_p \\}$ in $\mathbb{R}^n$ contains the zero vector, then the set is linearly dependent.
# --outlinebox


[Linear Transformations](/pages/LA6)
[Back to Index](/pages/andre)
