---
title: 'Linear Transformations'
smartdown: true
header: 'none'
---

These definitions and theorems are adapted from [Linear Algebra and its Applications](https://www.cartagena99.com/recursos/alumnos/temarios/210609113348-Linear%20Algebra%20and%20its%20applications.pdf) by Lay, Lay and McDonald.

### Linear Transformations

![fullwidth](https://www.youtube.com/watch?v=kYB8IZa5AuE&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=3)

A **transformation** (or **function** or **mapping**) $T$ from $\mathbb{R}^n$ to $\mathbb{R}^m$ is a rule that assigns to each vector ${\bf x}$ in $\mathbb{R}^n$ a vector $T({\bf x})$ in $\mathbb{R}^m$.  The set $\mathbb{R}^n$ is called the **domain** of $T$, and $\mathbb{R}^m$ is called the **codomain** of $T$.  The vector $T({\bf x})$ in $\mathbb{R}^n$ is called the **image** of ${\bf x}$ (under the action of $T$).  The set of all images $T({\bf x})$ is called the **range** of $T$.


# --outlinebox
**Definition** A transformation (or mapping) $T$ is **linear** if :
 - $T({\bf u} + {\bf v}) = T({\bf u}) + T({\bf v})$ for all ${\bf u}$, ${\bf v}$ in the domain of $T$;
 - $T(c{\bf u}) = cT({\bf u})$ for all scalars $c$ and all ${\bf u}$ in the domain of $T$.
# --outlinebox


If $T$ is a linear transformation, then 
$$T({\bf 0}) = {\bf 0}$$
and
$$T(c{\bf u} + d{\bf v}) =cT({\bf u}) + dT({\bf v})$$
more generally
$$T(c_1{\bf v}_1 + \cdots + c_p{\bf v}_p) =c_1T({\bf v}_1) + \cdots + c_pT({\bf v}_p)$$

Given a scalar $r$, define $T:\mathbb{R}^2 \rightarrow \mathbb{R}^2$ by $T({\bf x}) = r{\bf x}$. $T$ is called a **contraction** when $0 \leq r < 1$ and a **dilation** when $r>1$.
[1.9 The Matrix of a Linear Transformation](/pages/LA7)
[Back to Index](/pages/andre)

