---
title: 'Inverse Matrices'
smartdown: true
header: 'none'
---

### 2.2 Inverse Matrices

# --outlinebox
**Definition**  An $n \times n$ matrix $A$ is said to be **invertible** if there is an $n \times n$ matrix $C$ such that 
$$CA = I \text{  and  } AC = I$$
where $I = I_n$, the $n \times n$ identity matrix.  In this case, $C$ is an **inverse** of $A$.  In fact, $C$ is uniquely determined by $A$, because if $B$ were another inverse of $A$, then $B = BI = B(AC) = (BA)C = IC = C$. This unique inverse is denoted by $A^{-1}$, so that 
$$A^{-1}A = I \text{  and  } AA^{-1} = I$$
A matrix that is *not* invertible is sometimes called a **singular matrix**, and an invertible matrix is called a **nonsingular matrix**.
# --outlinebox

# --outlinebox
**Theorem:** Let 
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
**Definition:** The quantity $ad - bc$ is called the **determinant** of $A$ and we write $\text{det } A = ad -bc$.
# --outlinebox

# --outlinebox
**Theorem:** If $A$ is an invertible $n \times n$ matrix, then for each $\bf{b}$ in $\mathbb{R}^n$, the equation $A {\bf{x}} = {\bf{b}}$ has the unique solution ${\bf{x}} = A^{-1}{\bf{b}}$.

# --outlinebox

# --outlinebox
**Theorem:** 
- If $A$ is an invertible matrix, then $A^{-1}$ is invertible and 
$$(A^{-1})^{-1} = A$$
- If $A$ and $B$ are $n \times n$ invertible matrices, then so is $AB$ and 
$$(AB)^{-1} = B^{-1}A^{-1}$$
- If $A$ is an invertible matrix, then so is $A^T$, and 
$$(A^T)^{-1} = (A^{-1})^T$$

# --outlinebox


# --outlinebox
**Definition** An **elementary matrix** is one that is obtained by performing a single elementary row operation on an identity matrix.
# --outlinebox

If an elementary row operation is performed on an $m \times n$ matrix $A$, the resulting matrix can be written as $EA$, where the $m \times m$ matrix $E$ is created by performing the same row operation on $I_m$.

Each elementary matrix $E$ is invertible.  The inverse of $E$ is the elementary matrix of the same type that transforms $E$ back into $I$.


# --outlinebox
**Theorem:** An $n \times n$ matrix $A$ is invertible if and only if $A$ is row equivalent to $I_n$, and in this case, any sequence of elementary row operations that reduces $A$ to $I_n$ also transforms $I_n$ into $A^{-1}$.
# --outlinebox


[Characteristicss of Invertible Matrices](/pages/LA10)
[Back to Index](/pages/andre)
