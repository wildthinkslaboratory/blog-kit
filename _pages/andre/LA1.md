---
title: 'Systems of Linear Equations'
smartdown: true
header: 'none'
---

### Systems of Linear Equations

# --outlinebox
**Definition:** A **linear equation** in the variables $x_1,\ldots,x_n$ is an equation that can be written in the form 
$$a_1x_1+a_2x_2+\cdots +a_nx_n =b$$
where $b$ and the **coefficients** $a_1,\ldots,a_n$ are real or complex numbers, usually known in advance. The subscript $n$ may be any positive integer. A **system of linear equations** (or a **linear system**) is a collection of one or more linear equations involving the same variables $x_1,\ldots,x_n$. A **solution** of the system is a list ($s_1, s_2,\ldots,s_n$) of numbers that make each equation a true statement when the values $s_1, s_2,\ldots,s_n$ are substituted for $x_1,\ldots,x_n$ respectively.  The set of all possible solutions is called the **solution set** of the linear system.  Two linear systems are **equivalent** if the have the same solution set.  
# --outlinebox

**Note:** A system of linear equations has
- no solution
- exactly one solution
- or infinitely many solutions
A system is said to be **consistent** if it has one or infinitely many solutions.  It is called **inconsistent** if it has no solutions.

The essential information of a linear system can be recorded compactly in a rectangular array called a **matrix**.  Given the system 
$$ 
\begin{align*}
x_1  - & 2x_2  & + x_3 = 0 \\
         & 2x_2 & - 8x_3 = 8 \\
5x_1 &     &  - 5x_3 = 10
\end{align*}
$$
Here is it's **coefficient matrix**
$$
\begin{bmatrix}
1 & -2 & 1 \\
0 & 2 & -8 \\
5 & 0 & -5 
\end{bmatrix}
$$
Here is it's **augmented matrix**
$$
\begin{bmatrix}
1 & -2 & 1 & 0\\
0 & 2 & -8 & 8\\
5 & 0 & -5 & 10
\end{bmatrix}
$$

### Row Reductions and Echelon Form
The book spends a lot of time explaining an automated algorithm for solving systems of equations, but as you know it's basically common sense.  I'm going to summarize the most important parts of it and some of the jargon that goes with it so you'll know what people are talking about when you hear these terms.

# --outlinebox
**Row Operations** Given an augmented matrix, here are the obvious row operations
- Re-order the rows
- Multiply all entries in a row by a non-zero constant
- Replace one row by the sum of itself plus a multiple of another row.
# --outlinebox

Two matrices are called **row equivalent** if you can transform one into the other by row operations.

# --outlinebox
**Definition:** A matrix is in **echelon form** when
 - All nonzero rows are above any rows of all zeros.
 - Each leading entry of a row is in a column to the right of the leading entry of the row above it.
 - All entries in a column below a leading entry are zeros.

If a matrix in echelon form satisfies the following additional conditions, then it is in **reduced echelon** form :
 - The leading entry in each nonzero row is 1.
 - Each leading 1 is the only nonzero entry in its column.
# --outlinebox

Here's an echelon form matrix
$$
\begin{bmatrix}
1 & -2 & 1 & 0\\
0 & 2 & -8 & 8\\
0 & 0 & -5 & 10
\end{bmatrix}
$$
and heres a reduced echelon matrix
$$
\begin{bmatrix}
1 & 0 & 0 & 0\\
0 & 1 & 0 & 8\\
0 & 0 & 1 & 10
\end{bmatrix}
$$
Keep in mind that not all matrices are square ($n$ equations in $n$ unknowns).  You could have $3$ equations in $5$ unknowns. Then it helps to have the rules above.  

There's a big long section in your book about the algorithm used to solve these systems. that I won't recreate here. Basically, the algorithm moves the matrix into echelon form and then proceeds to reduced echelon where you can then just read off the solution.  

# --aliceblue
**Note** that you can answer the question of whether the system has infinite, one or no solutions from echelon form, even if you don't know the exact solution.
# --aliceblue

# --outlinebox
**Theorem:** Each matrix is row equivalent to one and only one reduced echelon matrix.
# --outlinebox


#### Resources
[Online Solver](https://matrix.reshish.com/gauss-jordanElimination.php)
[Another Online Solver](https://calculator-online.net/gaussian-elimination-calculator/)

#### Continue
[1.3 Vector Equations](/pages/LA2)  
[Back to Index](/pages/andre)