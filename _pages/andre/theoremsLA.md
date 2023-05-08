---
title: 'Linear Algebra Theorems'
smartdown: true
header: 'none'
---

### Chapter 6

# --outlinebox
**Theorem 6.1** Let $\bf{u}$, $\bf{v}$ and $\bf{w}$ be vectors in $\mathbb{R}^n$, and let $c$ be a scalar.  Then
- ${\bf u \cdot v} = {\bf v \cdot u}$
- $({\bf u \cdot v}) \cdot {\bf w} = {\bf v \cdot w} + {\bf u \cdot w}$
- $(c{\bf u}) \cdot {\bf v} = c ({\bf u \cdot v}) = {\bf u} \cdot (c {\bf v})$
- ${\bf u \cdot u} \geq 0$, and ${\bf u \cdot u} = 0$ if and only if ${\bf u = 0}$
# --outlinebox 

# --outlinebox
**Theorem 6.2**  *The Pythagorean Theorem*
Two vectors $\bf{u}$ and $\bf{v}$ are orthogonal if and only if $\lVert {\bf u} + {\bf v} \rVert^2 = \lVert {\bf u} \rVert^2 + \lVert {\bf v} \rVert^2$
# --outlinebox 

# --outlinebox
**Theorem 6.3**  Let $A$ be an $m \times n$ matrix.  The orthogonal complement of the row space of $A$ is the null space of $A$ and the orthogonal complement of the column space of $A$ is the null space of $A^T$:
$$(\text{Row } A)^{\bot} = \text{Nul }A \text{  and  } (\text{Col } A)^{\bot} = \text{Nul }A^{T} $$
# --outlinebox 

# --outlinebox
**Theorem 6.4** If $S= \{ {\bf u}_1, \ldots , {\bf u}_p\}$ is an orthogoanl set of nonzero vectors in $\mathbb{R}^n$, then $S$ is linearly independent and hence is a basis for the subspace spanned by $S$.
# --outlinebox 

# --outlinebox
**Theorem 6.5** Let $\{ {\bf u}_1, \ldots , {\bf u}_p\}$ be an orthogonal basis for a supspace $W$ of $\mathbb{R}^n$.  For each ${\bf y}$ in $W$, the weights in the linear combination $${\bf y} = c_1{\bf u}_1 + \cdots + c_p{\bf u}_p$$ are given by  $$c_j = \frac{ {\bf y} \cdot {\bf u}_j}{ {\bf u}_j \cdot {\bf u}_j} \quad (j = 1, \ldots , p)$$
# --outlinebox 

# --outlinebox
**Theorem 6.6** An $m \times n$ matrix $U$ has orthonormal columns if and only if $U^T U = I$.
# --outlinebox 

# --outlinebox
**Theorem 6.7** Let $U$ be an $m \times n$ matrix with orthonormal columns, and let ${\bf x}$ and ${\bf y}$ be in $\mathbb{R}^n$. Then
	- $\lVert U {\bf x} \rVert = \lVert {\bf x} \rVert$
	- $(U{\bf x})\cdot(U{\bf y}) = {\bf x} \cdot {\bf y}$
	- $(U{\bf x})\cdot(U{\bf y}) = 0$ if and only if ${\bf x} \cdot {\bf y} = 0$
# --outlinebox 

# --outlinebox
**Theorem 6.8** *The Orthogonal Decomposition Theorem*
Let $W$ be a subspace of $\mathbb{R}^n$.  Then each ${\bf y}$ in $\mathbb{R}^n$ can be written uniquely in the form $${\bf y} = {\bf \hat{y}} + {\bf z}$$ where ${\bf \hat{y}}$ is in $W$ and ${\bf z}$ is in $W^{\bot}$. In fact, if $\{u_1, \ldots , u_p \}$ is any orthogonal basis of $W$, then $${\bf \hat{y}} = \frac{ {\bf y} \cdot {\bf u}_1}{ {\bf u}_1 \cdot {\bf u}_1} {\bf u}_1 + \cdots + \frac{ {\bf y} \cdot {\bf u}_p}{ {\bf u}_p \cdot {\bf u}_p} {\bf u}_p$$ and ${\bf z} = + {\bf y} - {\bf \hat{y}}$.
# --outlinebox 

# --outlinebox
**Theorem 6.9** *The Best Approximation Theorem*
Let $W$ be a subspace of $\mathbb{R}^n$, let ${\bf y}$ be any vector in $\mathbb{R}^n$, and let ${\bf \hat{y}}$ be the orthogonal projection of ${\bf y}$ onto $W$.  Then ${\bf \hat{y}}$ is the cclosest point in $W$ to ${\bf y}$, in the sense that $$\lVert {\bf y} - {\bf \hat{y}} \rVert < \lVert {\bf y} - {\bf v}\rVert$$ for all ${\bf v}$ in $W$ distinct from ${\bf \hat{y}}$.
# --outlinebox 

# --outlinebox
**Theorem 6.10** If $\{ {\bf u}_1, \ldots , {\bf u}_p\}$ is an orthonormal basis for a subspace $W$ of $\mathbb{R}^n$, then 
$$\text{proj}_W{\bf y} = ({\bf y \cdot u}_1){\bf u}_1 + \cdots + ({\bf y \cdot u}_p){\bf u}_p$$ If $U = [{\bf u}_1, \ldots , {\bf u}_p]$, then $$\text{proj}_W{\bf y} = UU^T{\bf y}$$
# --outlinebox 

# --outlinebox
**Theorem 6.11** *The Gram-Schmidt Process*
Given a basis $\{ {\bf x}_1, \ldots, {\bf x}_p \}$ for a nonzero subspace $W$ of $\mathbb{R}^n$, define
$$
\begin{eqnarray*}
{\bf v}_1 & = & {\bf x}_1 \\
{\bf v}_2 & = & {\bf x}_2 -  \frac{ {\bf x}_2 \cdot {\bf v}_1}{ {\bf v}_1 \cdot {\bf v}_1} {\bf v}_1 \\
{\bf v}_3 & = & {\bf x}_3 -  \frac{ {\bf x}_3 \cdot {\bf v}_1}{ {\bf v}_1 \cdot {\bf v}_1} {\bf v}_1 - \frac{ {\bf x}_3 \cdot {\bf v}_2}{ {\bf v}_2 \cdot {\bf v}_2} {\bf v}_2 \\
& \vdots & \\
{\bf v}_p & = & {\bf x}_p -  \frac{ {\bf x}_p \cdot {\bf v}_1}{ {\bf v}_1 \cdot {\bf v}_1} {\bf v}_1 - \frac{ {\bf x}_p \cdot {\bf v}_2}{ {\bf v}_2 \cdot {\bf v}_2} {\bf v}_2 - \cdots - \frac{ {\bf x}_p \cdot {\bf v}_{p-1}}{ {\bf v}_{p-1} \cdot {\bf v}_{p-1}} {\bf v}_{p-1} 
\end{eqnarray*}
$$
Then $\{ {\bf v}_1, \ldots, {\bf v}_p \}$ is an orthogonal basis for $W$.  In addition
$$\text{Span} \{ {\bf v}_1, \ldots, {\bf v}_p \} = \text{Span} \{ {\bf x}_1, \ldots, {\bf x}_p \} \quad \text{for } 1 \leq k \leq p$$
# --outlinebox 

# --outlinebox
**Theorem 6.12** *The QR Factorization*
I $A$ is an $m \times n$ matrix with linearly independent columns, then $A$ can be factored as $A=QR$ where $Q$ is an $m \times n$ matrix whose columns form an orthonormal basis for $\text{Col } A$ and $R$ is an $n \times m$ upper triangular invertible matrix with positive entries on its diagonal.
# --outlinebox 


# --outlinebox
**Theorem 6.13** The set of least-squares solutions of $A{\bf x} = {\bf b}$ coincides with the nonempty set of solutions of the normal equations $A^TA{\bf x} = A^T{\bf b}$.
# --outlinebox 

# --outlinebox
**Theorem 6.14** Let $A$ be an $m \times n$ matrix.  The following statements are logically equivalent:
	- The equation $A{\bf x} = {\bf b}$ has a unique least-squares solution for each ${\bf b}$ in $\mathbb{R}^m$.
	- The columns of $A$ are linearly independent.
	- The matrix $A^TA$ is invertible.
When these statements are true, the least-squares solution ${\bf \hat{x}}$ is given by 
$${\bf \hat{x}} = (A^TA)^{-1} A^T {\bf b}$$
# --outlinebox 

# --outlinebox
**Theorem 6.15** Given an $m \times n$ matrix $A$ with linearly independent columns, let $A=QR$ be a $QR$ factorization of $A$ as in Theorem 6.12. Then, for each ${\bf b}$ in $\mathbb{R}^m$, the equation $A{\bf x} = {\bf b}$ has a unique least-squares solution, given by
$${\bf \hat{x}} = R^{-1}Q^T {\bf b}$$
# --outlinebox 

# --outlinebox
**Theorem 6.16** *The Cauchy-Schwarz Inequality*
For all ${\bf u}$, ${\bf v}$ in $V$, 
$$\lvert \langle {\bf u}, {\bf v} \rangle \rvert  \leq \rVert {\bf u} \lVert \rVert {\bf v} \lVert$$
# --outlinebox 

# --outlinebox
**Theorem 6.17** *The Triangle Inequality*
For all ${\bf u}$, ${\bf v}$ in $V$, 
$$\lVert  {\bf u} + {\bf v} \rVert  \leq \rVert {\bf u} \lVert +  \rVert {\bf v} \lVert$$
# --outlinebox 


