---
title: 'Linear Algebra Theorems'
smartdown: true
header: 'none'
---

[Chapter 1 Theorems](#chapter-1)
[Chapter 2 Theorems](#chapter-2)
[Chapter 3 Theorems](#chapter-3)
[Chapter 4 Theorems](#chapter-4)
[Chapter 5 Theorems](#chapter-5)
[Chapter 6 Theorems](#chapter-6)
[Chapter 7 Theorems](#chapter-7)

# Chapter 1

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

[Chapter 1 Theorems](#chapter-1)
[Chapter 2 Theorems](#chapter-2)
[Chapter 3 Theorems](#chapter-3)
[Chapter 4 Theorems](#chapter-4)
[Chapter 5 Theorems](#chapter-5)
[Chapter 6 Theorems](#chapter-6)
[Chapter 7 Theorems](#chapter-7)

# Chapter 2 

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

[Chapter 1 Theorems](#chapter-1)
[Chapter 2 Theorems](#chapter-2)
[Chapter 3 Theorems](#chapter-3)
[Chapter 4 Theorems](#chapter-4)
[Chapter 5 Theorems](#chapter-5)
[Chapter 6 Theorems](#chapter-6)
[Chapter 7 Theorems](#chapter-7)

# Chapter 3

# --outlinebox
**Theorem 3.1:**  The determinant of an $n \times n$ matrix $A$ can be computed by a cofactor expansion across any row or down any column.  The expansion across the $i$th row using the cofactors is 
$$\text{det} A = a_{i1} C_{i1} +  a_{i2} C_{i2} + \cdots +  a_{in} C_{in}$$
The cofactor expansion down the $j$th column is 
$$\text{det} A = a_{1j} C_{1j} +  a_{2j} C_{2j} + \cdots +  a_{nj} C_{nj}$$
# --outlinebox

# --outlinebox
**Theorem 3.2:**  If $A$ is a triangular matrix, then $\text{det}A$ is the product of the entries on the main diagonal of $A$.
# --outlinebox

# --outlinebox
**Theorem 3.3:** Let $A$ be a square matrix.
    - If a multiple of one row of $A$ is added to another row to produce a matrix $B$, then $\text{det }B = \text{det }A$.
    - If two rows of $A$ are interchanged to produce $B$, then $\text{det }B = -\text{det }A$.
    - If one row of $A$ is multiplied by $k$ to produce $B$, then $\text{det }B = k \cdot \text{det }A$.
# --outlinebox

# --outlinebox
**Theorem 3.4:** A square matrix $A$ is invertible if and only if $\text{det }A \not = 0$.
# --outlinebox

# --outlinebox
**Theorem 3.5:** If $A$ is an $n \times n$ matrix then $\text{det }A^T = \text{det }A$.
# --outlinebox

# --outlinebox
**Theorem 3.6:** *Multiplicative Property*
If $A$ and $B$ are $n \times n$ matrices, then $\text{det }AB = (\text{det }A)(\text{det }B)$.
# --outlinebox

# --outlinebox
**Theorem 3.7:** *Cramer's Rule*
Let $A$ be an invertible $n \times n$ matrix.  For any ${\bf b}$ in $\mathbb{R}^n$, the unique solution ${\bf x}$ of $A{\bf x} = {\bf b}$ has entries given by
$$x_i = \frac{\text{det }A_i({\bf b})}{\text{det }A}, \quad i = 1,2, \ldots, n$$
# --outlinebox

# --outlinebox
**Theorem 3.8:** *An Inverse Formula*
Let $A$ be an invertible $n \times n$ matrix. Then
$$A^{-1} = \frac{1}{\text{det }A} \text{adj }A$$
# --outlinebox

# --outlinebox
**Theorem 3.9:** If $A$ is a $2 \times 2$ matrix, the area of the parallelogram determined by the columns of $A$ is $\left| \text{det }A \right|$. If $A$ is a $3 \times 3$ matrix, the volume of the parallelepiped determined by the columns of $A$ is $\left| \text{det }A \right|$.
# --outlinebox

# --outlinebox
**Theorem 3.10:** 
# --outlinebox

[Chapter 1 Theorems](#chapter-1)
[Chapter 2 Theorems](#chapter-2)
[Chapter 3 Theorems](#chapter-3)
[Chapter 4 Theorems](#chapter-4)
[Chapter 5 Theorems](#chapter-5)
[Chapter 6 Theorems](#chapter-6)
[Chapter 7 Theorems](#chapter-7)

# Chapter 4

# --outlinebox
**Theorem 4.1:** If ${\bf v}_1, \ldots , {\bf v}_p$ are in a vector space $V$, then 
$$\text{Span} \{ {\bf v}_1, \ldots , {\bf v}_p \}$$ is a subspace of $V$.
# --outlinebox

# --outlinebox
**Theorem 4.2:** The null space of an $m \times n$ matrix $A$ is a subspace of $\mathbb{R}^n$.  Equivalently, the set of all solutions to a system $A{\bf x} = {\bf 0}$ of $m$ homogeneous linear equations in $n$ unknowns is a subspace of $\mathbb{R}^n$.
# --outlinebox

# --outlinebox
**Theorem 4.3:** The column space of an $m \times n$ matrix $A$ is a subspace of $\mathbb{R}^n$.
# --outlinebox

# --outlinebox
**Theorem 4.4:** An indexed set ${\bf v}_1, \ldots , {\bf v}_p$ of two or more vectors, with ${\bf v}_1 \not = {\bf 0}$, is linearly dependent if and only if some ${\bf v}_j$ (with $j > 1$) is a linear combination of the preceding vectors 
$${\bf v}_1, \ldots , {\bf v}_{j-1}.$$
# --outlinebox

# --outlinebox
**Theorem 4.5:** *The Spanning Set Theorem*
Let $$S = \{ {\bf v}_1, \ldots , {\bf v}_p \}$$ be a set in $V$, and let 
$$H = \text{Span} \{ {\bf v}_1, \ldots , {\bf v}_p \}$$
    - If one of the vectors in $S$ (say ${\bf v}_k$) is a linear combination of the remaining vectors in $S$, then the set formed from $S$ by removing ${\bf v}_k$ still spans $H$.
    - If $H \not = \{ { \bf 0 } \}$, some subset of $S$ is a basis for $H$.
# --outlinebox

# --outlinebox
**Theorem 4.6:** The pivot columns of a matrix $A$ form a basis for $\text{Col }A$.
# --outlinebox

# --outlinebox
**Theorem 4.7:** Let $$\mathcal{B} = \{ {\bf b}_1, \ldots , {\bf b}_n\}$$
be a basis for a vector space $V$.  The for each ${\bf x}$ in $V$, there exists a unique set of scalars $c_1, \ldots, c_n$ such that 
$${\bf x} = c_1{\bf b}_1 + \cdots + c_n{\bf b}_n$$
# --outlinebox

# --outlinebox
**Theorem 4.8:** Let 
$$\mathcal{B} = \{ {\bf b}_1, \ldots , {\bf b}_n\}$$ 
be a basis for a vector space $V$.  Then the coordinate mapping ${\bf x} \mapsto [{\bf x}]_{\mathcal{B}}$ is a one-to-one linear transformation from $V$ onto $\mathbb{R}^n$.
# --outlinebox

# --outlinebox
**Theorem 4.9:** If a vector space $V$ has a basis 
$$\mathcal{B} = \{ {\bf b}_1, \ldots , {\bf b}_n\}$$ 
then any set in $V$ containing more than $n$ vectors must be linearly dependent.
# --outlinebox

# --outlinebox
**Theorem 4.10:** If a vector space $V$ has a basis of $n$ vectors, then every basis of $V$ must consist of exactly $n$ vectors.
# --outlinebox

# --outlinebox
**Theorem 4.11:** Let $H$ be a subspace of a finite-dimensional vector space $V$.  Any linearly independent set in $H$ can be expanded, if neccesary, to a basis for $H$.  Also, $H$ is finite dimensional and $$\text{dim } H \leq \text{dim }V$$
# --outlinebox

# --outlinebox
**Theorem 4.12:** Let $V$ be a $p$-dimensional vector space, $p \geq 1$. Any linearly independent set of exactly $p$ elements in $V$ is automatically a basis for $V$.  Any set of exactly $p$ elements that spans $V$ is automatically a basis for $V$.
# --outlinebox

# --outlinebox
**Theorem 4.13:** If two matrices $A$ and $B$ are row equivalent, then their row spaces are the same.  If $B$ is in echelon form, the nonzero rows of $B$ form a basis for the row space of $A$ as well as for that of $B$.
# --outlinebox

# --outlinebox
**Theorem 4.14:** *The Rank Theorem*
The dimension of the column space and the row space of an $m \times n$ matrix $A$ are equal.  This common dimension, the rank of $A$, also equals the number of pivot positions in $A$ and satisfies the equation $$\text{rank }A + \text{dim Nul }A = n$$
# --outlinebox

# --outlinebox
**Theorem** *The Invertible Matrix Theorem (continued)*
Let $A$ be an $n \times n$ matrix.  Then the following statements are each equivalent to the statement that $A$ is an invertible matrix.
    - The columns of $A$ form a basis of $\mathbb{R}^n$.
    - $\text{Col }A = \mathbb{R}^n$
    - $\text{dim Col }A = n$
    - $\text{rank }A = n$
    - $\text{Nul }A$ contains only the zero vector
    - $\text{dim Nul }A = 0$
# --outlinebox


# --outlinebox
**Theorem 4.15:** Let 
$$\mathcal{B} = \{ {\bf b}_1, \ldots , {\bf b}_n \} \text{  and  } \mathcal{C} = \{ {\bf c}_1, \ldots , {\bf c}_n\}$$
be bases of a vector space $V$.  Then there is a unique $n \times n$ matrix ${P \atop \mathcal{C} \leftarrow \mathcal{B}}$ such that
$$\left[ {\bf x} \right]_{\mathcal{C}} = {P \atop \mathcal{C} \leftarrow \mathcal{B}} \left[ {\bf x} \right]_{\mathcal{B}}$$
The columns of $\left[ {\bf x} \right]_{\mathcal{C}}$ are the $\mathcal{C}$-coordinate vectors of the vectors in the basis $\mathcal{B}$.  That is 
$${P \atop \mathcal{C} \leftarrow \mathcal{B}}=
\begin{bmatrix}
\left[ {\bf b}_1 \right]_{\mathcal{C}}  & \left[ {\bf b}_2 \right]_{\mathcal{C}} & \cdots & \left[ {\bf b}_n \right]_{\mathcal{C}}
\end{bmatrix}
$$
# --outlinebox

[Chapter 1 Theorems](#chapter-1)
[Chapter 2 Theorems](#chapter-2)
[Chapter 3 Theorems](#chapter-3)
[Chapter 4 Theorems](#chapter-4)
[Chapter 5 Theorems](#chapter-5)
[Chapter 6 Theorems](#chapter-6)
[Chapter 7 Theorems](#chapter-7)

# Chapter 5

# --outlinebox
**Theorem 5.1:** The eigenvalues of a triangular matrix are the entries on its main diagonal.
# --outlinebox

# --outlinebox
**Theorem 5.2:** If ${\bf v}_1, \ldots, {\bf v}_r$ are eigenvectors that correspond to distinct eigenvalues $\lambda_1, \ldots, \lambda_r$ of an $n \times n$ matrix $A$, then the set 
$$\{ {\bf v}_1, \ldots, {\bf v}_r\}$$
is linearly independent.
# --outlinebox

# --outlinebox
**Theorem:**  *The Invertible Matrix Theorem (continued)*
Let $A$ be an $n \times n$ matix. Then $A$ is invertible if and only if:
    - The number $0$ is *not* an eigenvalue of $A$.
    - The determinant of $A$ is *not* zero.
# --outlinebox


# --outlinebox
**Theorem 5.3:** Let $A$ and $B$ be $n \times n$ matrices.
    - $A$ is invertible if and only if $\text{det }A \not = 0$
    - $\text{det }AB = (\text{det }A)(\text{det }B)$.
    - $\text{det }A^T = \text{det }A$.
    - If $A$ is triangular, then $\text{det }A$ is the product of the entries on the main diagonal of $A$.
    - A row replacement operation on $A$ does not change the determinant. A row interchange changes the sign of the determinant. A row scaling also scales the determinant by the same scalar factor.
# --outlinebox

# --outlinebox
**Theorem 5.4:** I $n \times n$ matrices $A$ and $B$ are similar, then they have the same characteristic polynomial and hence the same eigenvalues (with the same multiplicities).
# --outlinebox

# --outlinebox
**Theorem 5.5:** *The Diagonalization Theorem*
An $n \times n$ matrix $A$ is diagonalizable if and only if $A$ has $n$ linearly independent eignevectors.

In fact, $A = PDP^{-1}$, with $D$ a diagonal matrix, if and only if the columns of $P$ are $n$ linearly independent eigenvectors of $A$.  In this case, the diagonal entries of $D$ are eigenvalues of $A$ that correspond, respcetively, to the eignevectors in $P$.
# --outlinebox

# --outlinebox
**Theorem 5.6:** An $n \times n$ matrix with $n$ distinct eigenvalues is diagonalizable.
# --outlinebox

# --outlinebox
**Theorem 5.7:** Let $A$ be an $n \times n$ matrix whose distinct eigenvalues are $\lambda_1, \ldots, \lambda_p$.
    - For $1 \leq k \leq p$, the dimension of the eigenspace for $\lambda_k$ is less than or equal to the multiplicity of the eigenvalue $\lambda_k$. 
    - The matrix $A$ is diagonalizable if and only if the sum of the dimensions of the eigenspaces equals $n$, and this happens if and only if (i) the characteristic polynomial factors completely into linear factors and (ii) the dimension of the eigenspace for each $\lambda_k$ equals the multiplicity of $\lambda_k$.
    - If $A$ is diagonalizable and $\mathcal{B}_k$ is a basis for the eigenspace corresponding to $\lambda_k$ for each $k$, then the total collection of vectors in the sets $\mathcal{B}_1, \ldots, \mathcal{B}_p$ forms an eigenvector basis for $\mathbb{R}^n$.
# --outlinebox

# --outlinebox
**Theorem 5.8:** *Diagonal Matrix Representation*
Suppose $A=PDP^{-1}$, where $D$ is a diagonal $n \times n$ matrix.  If $\mathcal{B}$ is the basis for $\mathbb{R}^n$ formed from the columns of $P$, then $D$ is the $\mathcal{B}$-matrix for the transformation ${\bf x} \mapsto A{\bf x}$.
# --outlinebox

[Chapter 1 Theorems](#chapter-1)
[Chapter 2 Theorems](#chapter-2)
[Chapter 3 Theorems](#chapter-3)
[Chapter 4 Theorems](#chapter-4)
[Chapter 5 Theorems](#chapter-5)
[Chapter 6 Theorems](#chapter-6)
[Chapter 7 Theorems](#chapter-7)

# Chapter 6

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
**Theorem 6.4** If 
$$S= \{ {\bf u}_1, \ldots , {\bf u}_p\}$$ is an <span style="background-color: #FFFF00">orthogonal set of nonzero vectors</span> in $\mathbb{R}^n$, then $S$ is linearly independent and hence is a basis for the subspace spanned by $S$.
# --outlinebox 

# --outlinebox
**Theorem 6.5** Let 
$$\{ {\bf u}_1, \ldots , {\bf u}_p \}$$ 
be an <span style="background-color: #FFFF00">orthogonal basis</span> for a supspace $W$ of $\mathbb{R}^n$.  For each ${\bf y}$ in $W$, the weights in the linear combination $${\bf y} = c_1{\bf u}_1 + \cdots + c_p{\bf u}_p$$ are given by  $$c_j = \frac{ {\bf y} \cdot {\bf u}_j}{ {\bf u}_j \cdot {\bf u}_j} \quad (j = 1, \ldots , p)$$
# --outlinebox 
# --outlinebox
**Theorem 6.6** An $m \times n$ matrix $U$ has orthonormal columns if and only if $U^T U = I$.
# --outlinebox 

# --outlinebox
**Theorem 6.7** Let $U$ be an $m \times n$ matrix with <span style="background-color: #FFFF00">orthonormal columns</span>, and let ${\bf x}$ and ${\bf y}$ be in $\mathbb{R}^n$. Then
    - $\lVert U {\bf x} \rVert = \lVert {\bf x} \rVert$
    - $(U{\bf x})\cdot(U{\bf y}) = {\bf x} \cdot {\bf y}$
    - $(U{\bf x})\cdot(U{\bf y}) = 0$ if and only if ${\bf x} \cdot {\bf y} = 0$
# --outlinebox 

# --outlinebox
**Theorem 6.8** *The Orthogonal Decomposition Theorem*
Let $W$ be a subspace of $\mathbb{R}^n$.  Then each ${\bf y}$ in $\mathbb{R}^n$ can be written uniquely in the form $${\bf y} = {\bf \hat{y}} + {\bf z}$$ where ${\bf \hat{y}}$ is in $W$ and ${\bf z}$ is in $W^{\bot}$. In fact, if 
$$\{u_1, \ldots , u_p \}$$ is any <span style="background-color: #FFFF00">orthogonal basis</span> of $W$, then $${\bf \hat{y}} = \frac{ {\bf y} \cdot {\bf u}_1}{ {\bf u}_1 \cdot {\bf u}_1} {\bf u}_1 + \cdots + \frac{ {\bf y} \cdot {\bf u}_p}{ {\bf u}_p \cdot {\bf u}_p} {\bf u}_p$$ and ${\bf z} = + {\bf y} - {\bf \hat{y}}$.
# --outlinebox 

# --outlinebox
**Theorem 6.9** *The Best Approximation Theorem*
Let $W$ be a subspace of $\mathbb{R}^n$, let ${\bf y}$ be any vector in $\mathbb{R}^n$, and let ${\bf \hat{y}}$ be the orthogonal projection of ${\bf y}$ onto $W$.  Then ${\bf \hat{y}}$ is the cclosest point in $W$ to ${\bf y}$, in the sense that $$\lVert {\bf y} - {\bf \hat{y}} \rVert < \lVert {\bf y} - {\bf v}\rVert$$ for all ${\bf v}$ in $W$ distinct from ${\bf \hat{y}}$.
# --outlinebox 

# --outlinebox
**Theorem 6.10** If 
$$\{ {\bf u}_1, \ldots , {\bf u}_p\}$$ is an <span style="background-color: #FFFF00">orthonormal basis</span> for a subspace $W$ of $\mathbb{R}^n$, then 
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
If $A$ is an $m \times n$ matrix with <span style="background-color: #FFFF00">linearly independent</span> columns, then $A$ can be factored as $A=QR$ where $Q$ is an $m \times n$ matrix whose columns form an orthonormal basis for $\text{Col } A$ and $R$ is an $n \times m$ upper triangular invertible matrix with positive entries on its diagonal.
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
**Theorem 6.15** Given an $m \times n$ matrix $A$ with <span style="background-color: #FFFF00">linearly independent columns</span>, let $A=QR$ be a $QR$ factorization of $A$ as in Theorem 6.12. Then, for each ${\bf b}$ in $\mathbb{R}^m$, the equation $A{\bf x} = {\bf b}$ has a unique least-squares solution, given by
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


[Chapter 1 Theorems](#chapter-1)
[Chapter 2 Theorems](#chapter-2)
[Chapter 3 Theorems](#chapter-3)
[Chapter 4 Theorems](#chapter-4)
[Chapter 5 Theorems](#chapter-5)
[Chapter 6 Theorems](#chapter-6)
[Chapter 7 Theorems](#chapter-7)

# Chapter 7

# --outlinebox
**Theorem 7.1** If $A$ is symmetric, then any two eigenvectors from different eigenspaces are orthogonal.
# --outlinebox 

# --outlinebox
**Theorem 7.2** An $n \times n$ matrix $A$ is orthogonally diagonalizable if and only if $A$ is a symmetric matrix.
# --outlinebox 

# --outlinebox
**Theorem 7.3** *The Spectral Theorem for Symmetric Matrices*
An $n \times n$ symmetric matrix $A$ has the following properties:
    - $A$ has $n$ real eigenvalues, counting multiplicites.
    - The dimension of the eigenspace for each eigenvalue $\lambda$ equals the multiplicity of $\lambda$ as a root of the characteristic equation.
    - The eigenspaces are mutually orthogonal, in the sense that eigenvectors corresponding to different eigenvalues are orhtogonal.
    - $A$ is orthogonally diagonalizable.

# --outlinebox 

# --outlinebox
**Theorem 7.4** *The Principal Axes Theorem*
Let $A$ be an $n \times n$ symmetric matrix. Then there is an orthogonal change of variable, ${\bf x} = P{\bf y}$, that transforms the quadratic form ${\bf x}^TA{\bf x}$ into a quadratic form ${\bf y}^TD{\bf y}$ with no cross-product term.

# --outlinebox 


# --outlinebox
**Theorem 7.5** *Quadratic Forms and Eigenvalues*
Let $A$ be an $n \times n$ symmetric matrix.  Then a quadratic from ${\bf x}^TA{\bf x}$ is :
    - positive definite if and only if the eigenvalues of $A$ are all positive,
    - negative definite if and only if the eigenvalues of $A$ are all negative, or
    - indefinite if and only if $A$ has both positive and negative eigenvalues.
# --outlinebox 

# --outlinebox
**Theorem 7.6** Let $A$ be a symmetric matrix, and define $m$ and $M$ as 
$$m = \text{min }  \{ {\bf x}^T A {\bf x}:  \lVert {\bf x} \rVert = 1 \}, \quad  M = \text{max }  \{ {\bf x}^T A {\bf x}:  \lVert {\bf x} \rVert = 1 \}$$
Then $M$ is the greatest eigenvalue $\lambda_1$ of $A$ and $m$ is the least eigenvalue of $A$.  The value of ${\bf x}^T A {\bf x}$ is $M$ when ${\bf x}$ is a unit eigenvector ${\bf u}_1$ corresponding to $M$.  The value of ${\bf x}^T A {\bf x}$ is $m$ when ${\bf x}$ is a unit eigenvector corresponding to $m$.
# --outlinebox 

# --outlinebox
**Theorem 7.7** Let $A$, $\lambda_1$ and ${\bf u}_1$ be as in Theorem 7.6.  Then the maximum value of ${\bf x}^T A {\bf x}$ subject to the constriants
$${\bf x}^T {\bf x} = 1 \quad \text{ and } \quad {\bf x}^T {\bf u}_1 = 0$$
is the second greatest eigenvalue, $\lambda_2$, and this maximum is attained when ${\bf x}$ is an eigenvector ${\bf u}_2$ corresponding to $\lambda_2$.
# --outlinebox 

# --outlinebox
**Theorem 7.8** Let $A$ be a symmetric $n \times n$ matrix with an orthogoal diagonalization $A=PDP^{-1}$, where the entries on the diagonal of $D$ are arranged so that $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_n$ and where the columns of $P$ are corresponding unit eigenvectors ${\bf u}_1, \ldots , {\bf u}_n$. Then for $k=1,2,\ldots,n$, the maximum value of ${\bf x}^T A {\bf x}$ subject to 
$${\bf x}^T {\bf x} = 1, \quad {\bf x}^T {\bf u}_1 = 0, \quad  \ldots, \quad {\bf x}^T {\bf u}_{k-1} = 0$$
is the eigenvalue $\lambda_k$, and this maximum is attained at ${\bf x} = {\bf u}_k$.
# --outlinebox 

<span style="background-color: #FFFF00"></span>





[Back to Index](/pages/andre)

