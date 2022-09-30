---
title: 'Solution Sets of Linear Systems'
smartdown: true
header: 'none'
---


### 1.5 Solution Sets of Linear Systems

# --outlinebox
A system of linear equations is said to be **homogeneous** if it can be written in the form $A\bf{x} = \bf{0}$, where $A$ is an $m \times n$ matrix and $\bf{0}$ is the zero vector in $\mathbb{R}^m$. Such a system $A\bf{x} = \bf{0}$ always has at least one solution, namely, $\bf{x} = \bf{0}$ (the zero vector in $\mathbb{R}^n$). This zero solution is usually called the **trivial solution**. For a given equation $A\bf{x} = \bf{0}$; the important question is whether there exists a nontrivial solution.

**Theorem** The homogeneous system $A\bf{x} = \bf{0}$ has a nontrivial solution if and only if the equation has at least one free variable.
# --outlinebox


A **parametric vector equation** is written in the form
$$\bf{x} = s \bf{u} + t \bf{v}$$
with $s,t \in \mathbb{R}$.

**Example**
$$
\bf{x} = x_2
\begin{bmatrix}
1 \\
-5 
\end{bmatrix} + x_3
\begin{bmatrix}
0.5 \\
2 
\end{bmatrix} (\text{ with } x_2,x_3 \text{ free })
$$
Sometimes it's a nice way to express the solution to a homogeneous system of equations when the solution is not just a single point.  Similarly, the solution to a nonhomogeneous system $A\bf{x} = \bf{b}$ can be written as specific plus an arbitrary linear combination of vectors.

**Example**
$$
\bf{x} = 
\begin{bmatrix}
7 \\
-0.2
\end{bmatrix} + x_2
\begin{bmatrix}
1 \\
-5 
\end{bmatrix} + x_3
\begin{bmatrix}
0.5 \\
2 
\end{bmatrix} (\text{ with } x_2,x_3 \text{ free })
$$

# --outlinebox
**Theorem** Suppose the equation $A\bf{x} = \bf{b}$ is consistent for some given $\bf{b}$, and let $\bf{p}$ be a solution. Then the solution set of $A\bf{x} = \bf{b}$ is the set of all vectors of the form $\bf{w} = \bf{p} + \bf{v}_h$, where $\bf{v}_h$ is any solution of the homogeneous equation $A\bf{x} = \bf{0}$.
# --outlinebox

.

# --outlinebox

# --outlinebox

.

# --outlinebox

# --outlinebox