---
title: 'Matrix Operations'
smartdown: true
header: 'none'
---

These definitions and theorems are adapted from [Linear Algebra and its Applications](https://www.cartagena99.com/recursos/alumnos/temarios/210609113348-Linear%20Algebra%20and%20its%20applications.pdf) by Lay, Lay and McDonald.

### 2.1 Matrix Operations

Please watch the video.  It contains important ideas that I then don't need to type in as text and you don't have to read.

![fullwidth](https://www.youtube.com/watch?v=XkY2DOUCWMU&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=4)

Second video is nice but just the same stuff in 3 dimensions. It's short.

![fullwidth](https://www.youtube.com/watch?v=rHLEWRxRGiM&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=5)
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
 - $r(sA) = (rs)A$
# --outlinebox



# --outlinebox
**Theorem:** If $A$ is an $m \times n$ matrix and $B$ is an $n \times p$ matrix with columns ${\bf b}_1,{\bf b}_2, \ldots , {\bf b}_p$, them the product $AB$ is the $m \times p$ matrix
$$AB = A
\begin{bmatrix}
{\bf b}_1 & {\bf b}_2 & \cdots & {\bf b}_p 
\end{bmatrix} = 
\begin{bmatrix}
A{\bf b}_1 & A{\bf b}_2 & \cdots & A{\bf b}_p 
\end{bmatrix}
$$ 
# --outlinebox
Each column of $AB$ is a linear combination of the columns of $A$ using the weights from the corresponding column of $B$.

##### ROW - COLUMN RULE FOR COMPUTING $AB$
If the product $AB$ is defined, then the entry in row $i$ and column $j$ of $AB$ is the sum of the products of corresponding entries from row $i$ of $A$ and column $j$ of $B$. If $(AB)_{ij}$

denotes the $(i,j)$ entry in $AB$, and if $A$ is an $m \times n$ matrix,then
$$(AB)_{ij} = a_{i1} b_{1j} + a_{i2} b_{2j} + \cdots + a_{in} b_{nj}$$

# --outlinebox
**Theorem:** Let $A$ is an $m \times n$ matrix and let $B$ and $C$ have the appropriate sizes for the following sums and products
 - $A(BC) = (AB)C$  associative law of multiplication
 - $A(B + C) = AB + AC$ left distributive law
 - $(B + C)A = BA + CA$ right distributive law
 - $r(AB) = (rA)B = A(rB)$ 
 - $I_mA = A = AI_n$ identity for matrix multiplication
# --outlinebox

##### Questions
- Does $AB = BA$ generally for matrices?
- Does $AB = AC$ imply that $B=C$?
- If $AB = 0$ does that imply that $A=0$ or $B=0$?

##### Powers of Matrices

$$A^k = A \cdots A \text{   with } k \;\; A \text{'s}$$

##### Transpose of a Matrix
Given an $m \times n$ matrix $A$, the **transpose** of matrix $A$ is an $n \times m$ matrix denoted $A^T$, whose columns are formed by the corresponding rows of $A$.

**Example:** 
$$ A = 
\begin{bmatrix}
1 & 2  \\
3 & 4  \\
5 & 6  
\end{bmatrix}
$$
$$ A^T = 
\begin{bmatrix}
1 & 3 & 5 \\
2 & 4 & 6  
\end{bmatrix}
$$


# --outlinebox
**Theorem:** Let $A$ and $B$ be matrices whose sizes are appropriate for the following sums and products
- $(A^T)^T = A$
- $(A + B)^T = A^T + B^T$
- for any scalar $r$, $(rA)^T = rA^T$
- $(AB)^T = B^T A^T$
# --outlinebox


[Matrix Inverses](/pages/LA9)
[Back to Index](/pages/andre)