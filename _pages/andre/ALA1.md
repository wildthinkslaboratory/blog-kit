---
title: 'Vector Space'
smartdown: true
header: 'none'
---

#### Field

# --outlinebox
A **field** $F$ is a set containing at least two distinct elements called $0$ and $1$, along  with operations of addition and multiplication satisfying these properties: 

- $a + b = b + a$ and $ab = ba$ for all $a,b \in F$ (commutative)

- $(a + b) + c = a + (b + c)$ and $(ab)c = a(bc)$ for all $a,b,c \in F$ (associative)

- $a + 0 = a$ and $a1 = a$ for all $a \in F$ (identities)

- for every $a \in F$ these is a unique $b \in F$ such that $a + b = 0$ (additive inverse)

- for every $a \in F$ these is a unique $b \in F$ such that $ab = 1$(multiplicative inverse)

- $a (b+c) = ab + ac$ for all $a,b,c \in F$ (distributive)
# --outlinebox

Notice that we don't say what the elements of $F$ are and we don't say what addition or multiplication are.  They could be numbers. The real numbers together with our standard notions of addition and multiplication form a field as do the complex numbers. The elements in $F$ could be other things. $F$ could be finite or infinite. We could define other operators for addition and multiplication.  What makes it a field is that it has elements **called** $0$ and $1$, and it's operators obey these properties.


#### Vector Space

# --outlinebox
- **addition** on a set $V$ is a function with the form $V \times V \rightarrow V$. It takes a pair of elements $u, v \in V$ and maps them to the element $u + v \in V$. 

- **scalar multiplication** on a set $V$ is a function of the form $F \times V \rightarrow V$ which maps an element of $s \in F$ and $v \in V$ to $sv \in V$.
# --outlinebox

We still haven't said what $F$ or $V$ are or what the specific mappings addition and scalar multiplication have on $V$.



# --outlinebox
A **vector space** is a set $V$ along with an addition on $V$ and a scalar multiplication on $V$ and field $F$ such that the following properties hold:

 - $\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$ for all $\mathbf{u},\mathbf{v} \in V$ (Commutativity)

 - $(\mathbf{u} + \mathbf{v}) + \mathbf{w} = \mathbf{u} + (\mathbf{v} + \mathbf{w})$ and $c(d \mathbf{u}) = (cd)\mathbf{u}$ for all $\mathbf{u},\mathbf{v},\mathbf{w} \in V$ and all $c,d \in F$ (Associativity)

 - There exists an element $\bf{0} \in V$ such that $\mathbf{u} + \mathbf{0} = \mathbf{u}$ for all $\bf{u} \in V$

 - There exists element $1 \in F$ such that $1(\mathbf{u})= \mathbf{u}$ for all $\bf{u} \in V$

 - for all $\mathbf{u} \in V$ there exists a $\mathbf{v} \in V$ such that $\mathbf{u} + \mathbf{v} = \mathbf{0}$ (Inverse for Addition)

 - $c(\mathbf{u} + \mathbf{v}) = c\mathbf{u} + c\mathbf{v}$ and $(c + d)\mathbf{u} = c\mathbf{u} + d\mathbf{u}$ for all $\mathbf{u},\mathbf{v} \in V$ and all $c,d \in F$ (Multiplication Distributes over Addition)
 
 
# --outlinebox

So we just saw one instance of a vector space [here](/pages/LA2), but here's another one.

# --aliceblue
**Example:** Let $V=\\{0\\}$ and $F = \mathbb{R}$ with standard addition and multiplication. Check to convince yourself that this is a vector space.
# --aliceblue

A cooler example

# --aliceblue
**Example:** First some notation:
 - if $S$ is a set and $F$ a field.  Then $F^S$ is the set of functions from $S$ to $F$.

 - for $f,g \in F^S$, the *sum* $f + g \in F^S$ is the function defined by 
 $$(f + g)(x) = f(x) + g(x)$$
 for all $x \in S$.

 - for $s \in F$ and $f \in F^S$, the product $sf \in F^S$ is the function
 $$(sf)(x) = s f(x)$$ 

So for example we let $S$ be the interval $[0,1]$ and $F = \mathbb{R}$ then $\mathbb{R}^{[0,1]}$ is the set of real valued functions on $[0,1]$.  This is a vector space.
# --aliceblue

In this example, the elements of our vector space are functions.  Even though your class will mostly assume that vectors are lists of numbers, they don't have to be.  They can be all sorts of weird things.  But the cool thing is that results you prove about vector spaces will apply to all kinds of crazy mathematical objects.  This is all so much bigger than lists of numbers.

Ok, back to [vectors](/pages/LA2/##time-out-for-abstract-algebra)

