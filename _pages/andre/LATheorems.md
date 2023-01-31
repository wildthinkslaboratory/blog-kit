---
title: 'Linear Algebra Theorems'
smartdown: true
header: 'none'
---

# --outlinebox
**Theorem 1.1:**  *Uniqueness of the Reduced Echelon Form*
Each matrix is row equivalent to one and only one reduced echelon matrix.
# --outlinebox


# --outlinebox
**Theorem 1.2:**  *Existence and Uniqueness Theorem*
A linear system is consistent if and only if the rightmost column of the augmented matrix is *not* a pivot column - that is, if and only if an echelon form of the augmented matrix has *no* row fo the form 
$$\begin{bmatrix}
0 & \cdots & 0 & b \end{bmatrix} \text{   with $b$ nonzero} $$
If a linear system is consistent, then solution set contains either (i) a unique solution, when there are no free variables, or (ii) infinitely many solutions, when there is at least one free variable.
# --outlinebox

# --outlinebox
**Theorem 1.3** If $A$ is an $m \times n$ matrix with columns $\bf{a}_1, \bf{a}_2, \ldots , \bf{a}_n$, and if $\bf{b}$ is in $\mathbb{R}^m$, the matrix equation $$A{\bf x} = \bf{b}$$
has the same solutions as the vector equation
$$x_1{\bf a}_1 + x_2{\bf a}_2 + \cdots + x_n{\bf a}_n = \bf{b}$$
which in turn has the same solution set as the system of linear equations whose augmented matrix is 
$$
\begin{bmatrix}
\bf{a}_1 & \bf{a}_2&  \cdots & \bf{a}_n & \bf{b}
\end{bmatrix} 
$$
# --outlinebox

# --outlinebox
**Theorem 1.4** Let $A$ be an $m \times n$ matrix. Then the following statements are equivalent.
- For each $\bf{b} \in \mathbb{R}^m$, the equation $A\bf{x}=\bf{b}$ has a solutions.
- Each $\bf{b} \in \mathbb{R}^m$ is a linear combination of the columns in $A$.
- The columns of $A$ span $\mathbb{R}^m$.
- $A$ has a pivot position in every row.
# --outlinebox

# --outlinebox
**Theorem 1.5** If $A$ is an $m \times n$ matrix, $\bf{u}$ and $\bf{v}$ are vectors in  $\mathbb{R}^n$, and $c$ is a scalar, then :
- $A({\bf u} + {\bf v}) = A{\bf u} + A{\bf v}$
- $A(c{\bf u}) = c(A {\bf u})$
# --outlinebox 

# --outlinebox
**Theorem 1.6** Suppose the equation $A\bf{x} = \bf{b}$ is consistent for some given $\bf{b}$, and let $\bf{p}$ be a solution. Then the solution set of $A\bf{x} = \bf{b}$ is the set of all vectors of the form $\bf{w} = \bf{p} + \bf{v}_h$, where $\bf{v}_h$ is any solution of the homogeneous equation $A\bf{x} = \bf{0}$.
# --outlinebox

# --outlinebox
**Theorem 1.7** An indexed set $S = \\{ {\bf v}_1,{\bf v}_2, \ldots , {\bf v}_p \\}$ of two or more vectors is linearly dependent if and only if at least one of the vectors in $S$ is a linear combination of the others. In fact, if $S$ is linearly dependent and ${\bf v}_1 \not = {\bf 0}$,  then some ${\bf v}_j$, with $j > 1$, is a linear combination of the previous vectors 
$$\mathbf{v}_1, \ldots , \mathbf{v}_{j-1}$$
# --outlinebox

# --outlinebox
**Theorem 1.8** If a set contains more vectors than there are entries in each vector, then the set is linearly dependent.  That is any set $\\{ {\bf v}_1,{\bf v}_2, \ldots , {\bf v}_p \\}$ in $\mathbb{R}^n$ is linearly dependent if $p > n$.
# --outlinebox

# --outlinebox
**Theorem 1.9** If a set $\\{ {\bf v}_1,{\bf v}_2, \ldots , {\bf v}_p \\}$ in $\mathbb{R}^n$ contains the zero vector, then the set is linearly dependent.
# --outlinebox

# --outlinebox
**Theorem 1.10** Let $T:\mathbb{R}^n \rightarrow \mathbb{R}^m$ be a linear transformation.  Then there exists a unique matrix $A$ such that $$T({\bf x}) = A{\bf x} \text{  for all } {\bf x} \in \mathbb{R}^n$$
In fact, $A$ is the $m \times n$ matrix whose $j$th column is the vector $T({\bf e}_j)$, where ${\bf e}_j$ is the $j$th column of the identity matrix in $\mathbb{R}^n$: $$A = [T({\bf e}_1) \cdots T({\bf e}_n)]$$
# --outlinebox

# --outlinebox
**Theorem 1.11** Let $T:\mathbb{R}^n \rightarrow \mathbb{R}^m$ be a linear transformation. Then $T$ is one-to-one if and only if the equation $T({\bf x}) = {\bf 0}$ has only the trivial solution.
# --outlinebox

# --outlinebox
**Theorem 1.12** Let $T:\mathbb{R}^n \rightarrow \mathbb{R}^m$ be a linear transformation, and let $A$ be the standard matrix for $T$. Then:
 - $T$ maps $\mathbb{R}^n$ onto $\mathbb{R}^m$ if and only if the columns of $A$ span $\mathbb{R}^m$;
 - $T$ is one-to-one if and only if the columns of $A$ are linearly independent.
# --outlinebox

# --outlinebox
**Theorem 2.1** Let $A$, $B$, and $C$ be matrices of the same size and let $r,s \in \mathbb{R}$.
 - $A + B = B + A$
 - $(A + B) + C = A + (B + C)$
 - $A + 0 = A$ where $0$ is the zero matrix
 - $r(A + B) = rA + rB$
 - $(r + s)A = rA + sA$
 - $r(sA) = (rs)A$
# --outlinebox

# --outlinebox
**Theorem 2.2** Let $A$ is an $m \times n$ matrix and let $B$ and $C$ have the appropriate sizes for the following sums and products
 - $A(BC) = (AB)C$  associative law of multiplication
 - $A(B + C) = AB + AC$ left distributive law
 - $(B + C)A = BA + CA$ right distributive law
 - $r(AB) = (rA)B = A(rB)$ 
 - $I_mA = A = AI_n$ identity for matrix multiplication
# --outlinebox

# --outlinebox
**Theorem 2.3** Let $A$ and $B$ be matrices whose sizes are appropriate for the following sums and products
- $(A^T)^T = A$
- $(A + B)^T = A^T + B^T$
- for any scalar $r$, $(rA)^T = rA^T$
- $(AB)^T = B^T A^T$
# --outlinebox

# --outlinebox
**Theorem 2.4** Let 
$$ A = 
\begin{bmatrix}
a & b  \\
c & d 
\end{bmatrix}
$$
If $ad - bc \not = 0$, then $A$ is invertible and 
$$ A^{-1} = \frac{1}{ad - bc}
\begin{bmatrix}
d & -b  \\
-c & a 
\end{bmatrix}
$$
# --outlinebox

# --outlinebox
**Theorem 2.5** If $A$ is an invertible $n \times n$ matrix, then for each $\bf{b}$ in $\mathbb{R}^n$, the equation $A {\bf{x}} = {\bf{b}}$ has the unique solution ${\bf{x}} = A^{-1}{\bf{b}}$.
# --outlinebox

# --outlinebox
**Theorem 2.6** 
- If $A$ is an invertible matrix, then $A^{-1}$ is invertible and 
$$(A^{-1})^{-1} = A$$
- If $A$ and $B$ are $n \times n$ invertible matrices, then so is $AB$ and 
$$(AB)^{-1} = B^{-1}A^{-1}$$
- If $A$ is an invertible matrix, then so is $A^T$, and 
$$(A^T)^{-1} = (A^{-1})^T$$
# --outlinebox

# --outlinebox
**Theorem 2.7** An $n \times n$ matrix $A$ is invertible if and only if $A$ is row equivalent to $I_n$, and in this case, any sequence of elementary row operations that reduces $A$ to $I_n$ also transforms $I_n$ into $A^{-1}$.
# --outlinebox

# --outlinebox
**Theorem 2.8**  Let $A$ be a square $n \times n$ matrix.  Then the following statements are equivalent.  That is, for a given $A$, the statements are eigher all true or all false.
- $A$ is an invertible matrix.
- $A$ is row equivalent to the $n \times n$ identity matrix.
- $A$ has $n$ pivot positions.
- The equation $A {\bf x} = {\bf 0}$ has only the trivial solution.
- The columns of $A$ for a linearly independent set.
- The linear transformation ${\bf x} \mapsto A {\bf x}$ is one-to-one.
- The equation $A {\bf x} = {\bf b}$ has at least one solution for each ${\bf b}$ in $\mathbb{R}^n$.
- The columns of $A$ span $\mathbb{R}^n$.
- The linear transformation  ${\bf x} \mapsto A {\bf x}$ maps $\mathbb{R}^n$ onto $\mathbb{R}^n$.
- There is an $n \times n$ matric $C$ such that $CA = I$.
- There is an $n \times n$ matric $D$ such that $AD = I$.
- $A^T$ is an invertible matrix.
# --outlinebox

# --outlinebox
**Theorem 2.9**  Let $T: \mathbb{R}^n \rightarrow \mathbb{R}^n$ be a linear transformation and let $A$ be the standard matrix for $T$.  Then $T$ is invertible if and only if $A$ is an invertible matrix.  In that case, the linear transformation $S$ given by $S({\bf x}) = A^{-1}{\bf x}$ is the unique function satisfying the equations
$$S(T({\bf x})) = {\bf x} \text{  for all } {\bf x} \text{ in } \mathbb{R}^n $$
$$T(S({\bf x})) = {\bf x} \text{  for all } {\bf x} \text{ in } \mathbb{R}^n $$
# --outlinebox

# --outlinebox
**Theorem 3.1:**  The determinant of an $n \times n$ matrix $A$ can be computed by a cofactor expansion across any row or down any column.  The expansion across the $i$th row using the cofactors is 
$$\text{det} A = a_{i1} C_{i1} +  a_{i2} C_{i2} + \cdots +  a_{in} C_{in}$$
The cofactor expansion down the $j$th column is 
$$\text{det} A = a_{1j} C_{1j} +  a_{2j} C_{2j} + \cdots +  a_{nj} C_{nj}$$
# --outlinebox

# --outlinebox
**Theorem 3.2:**  If $A$ is a triangular matrix, then $\text{det}A$ is the product of the entries on the main diagonal of $A$.
# --outlinebox

[Back to Index](/pages/andre)

