---
title: 'Abstraction Catch Up Questions'
smartdown: true
header: 'none'
---

## Vector Spaces

#### Question 1
If $V$ is a vector space, prove that $-(-{\bf v}) = {\bf v}$ for all ${\bf v} \in V$.  Recall that $-{\bf v}$ is the notation we use to identify the additive inverse of ${\bf v}$.  

#### Question 2
The empty set $\{ \}$ is not a vector space.  The empty set fails to satisfy exactly one of the requirements listed for a vector space.  Which one?

#### Question 3
Show that in the definition of a vector space, the additive inverse condition can be replaced with the condition that $0{\bf v} = {\bf 0}$ for all ${\bf v} \in V$.  Here the $0$ on the left side is the number $0$ and the ${\bf 0}$ on the right side is the additive identity of $V$.  

## Span and Linear Independence

#### Question 4
Suppose that ${\bf v}_1, {\bf v}_2, {\bf v}_3, {\bf v}_4$ spans a vector space $V$.  Prove that 
$${\bf v}_1 - {\bf v}_2, {\bf v}_2 - {\bf v}_3, {\bf v}_3 - {\bf v}_4, {\bf v}_4$$
also spans $V$.

#### Question 5
# --outlinebox
**Definition:** A vector space is called **finite-dimensional** if some list of vectors spans the space.
# --outlinebox
.
# --outlinebox
**Definition:** A function $p:\mathbb{R} \rightarrow \mathbb{R}$ is called a **polynomial** with coefficients in $\mathbb{R}$ if there exist $a_0,\ldots,a_m \in \mathbb{R}$ such that
$$p(z) = a_0 + a_1z + a_2 z^2 + \cdots + a_m z^m$$
for all $z \in \mathbb{R}$.  $P(\mathbb{R})$ is the set of all polynomials with coefficients in $\mathbb{R}$.
# --outlinebox

Verify that $P(\mathbb{R})$ is a vector space.  You don't need to write this all out.  Just go through the vector space requirements one by one and convince yourself.


#### Question 6
The coefficients of a polynomial are uniquely determined by the polynomial.  (You can think about why this is true.  I'm leaving out the proof.) 
# --outlinebox
**Definition:** A polynomial $p \in P(\mathbb{R})$ is said to have **degree** $m$ is there exists scalars $a_0,\ldots,a_m \in \mathbb{R}$ with $a_m \not = 0$ such that
$$p(z) = a_0 + a_1z + a_2 z^2 + \cdots + a_m z^m$$
for all $z \in \mathbb{R}$.  If $p$ has degree $m$, we write $\text{deg }p = m$. The polynomial that is identically $0$ is said to have degree $-\infty$.
# --outlinebox
In the next definition, we use the convention that $-\infty < m$, which means that $0$ is in $P_m(\mathbb{R})$.
# --outlinebox
For $m$ a nonnegative integer, $P_m(\mathbb{R})$ denotes the set of all polynomials with coeffiecients in $\mathbb{R}$ and degree at most $m$.
# --outlinebox
Give a set of polynomials that span $P_m(\mathbb{R})$ for some $m \in Z^+$.  

#### Question 7
# --outlinebox
a vector space is called **infinite-dimensional** is it is not finite-dimensional.
# --outlinebox
Show that $P(\mathbb{R})$ is infinite-dimensional.  Again, here you just need to sketch a proof in your head.


