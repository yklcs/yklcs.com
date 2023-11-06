---
title: Vector Jacobian Products
date: 2023-11-06
tags: [math, ai]
---

Consider $f: \mathbb{R}^n \to \mathbb{R}^m$. The Jacobian of $f$, denoted $\mathbf{J}_f$, is a $m \times n$ matrix of all the partial derivatives. Pretty basic:

$$
\textbf{J}_f = \frac{\partial{f}}{\partial{\mathbf{x}}} = \begin{bmatrix} \dfrac{\partial{f_1}}{\partial{x_1}} & \cdots & \dfrac{\partial{f_1}}{\partial{x_n}} \\ \vdots & \ddots & \vdots \\ \dfrac{\partial{f_m}}{\partial{x_1}} & \cdots & \dfrac{\partial{f_m}}{\partial{x_n}} \end{bmatrix}
$$

For $\mathbf{v} \in \mathbb{R}^m$ , let’s look at the product of the row vector $\mathbf{v}^\top$ and $\mathbf{J}_f$. This is known as the _vector Jacobian product_ (VJP).

$$
\mathbf{v}^\top \mathbf{J}_f = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_m \end{bmatrix}^\top \begin{bmatrix} \dfrac{\partial{f_1}}{\partial{x_1}} & \cdots & \dfrac{\partial{f_1}}{\partial{x_n}} \\ \vdots & \ddots & \vdots \\ \dfrac{\partial{f_m}}{\partial{x_1}} & \cdots & \dfrac{\partial{f_m}}{\partial{x_n}} \end{bmatrix} = \begin{bmatrix} v_1 \dfrac{\partial{f_1}}{\partial{x_1}} + \cdots + v_m \dfrac{\partial{f_m}}{\partial{x_1}} \\ \vdots \\ v_1 \dfrac{\partial{f_1}}{\partial{x_n}} + \cdots + v_m \dfrac{\partial{f_m}}{\partial{x_n}} \end{bmatrix}^\top
$$

The column vectors are pesky, so transposes are taken.

$$
{\mathbf{J}_f}^\top\mathbf{v} = \begin{bmatrix} v_1 \dfrac{\partial{f_1}}{\partial{x_1}} + \cdots + v_m \dfrac{\partial{f_m}}{\partial{x_1}} \\ \vdots \\ v_1 \dfrac{\partial{f_1}}{\partial{x_n}} + \cdots + v_m \dfrac{\partial{f_m}}{\partial{x_n}} \end{bmatrix}
$$

As the “variables” are $f$ and $\mathbf{v}$ in ${\mathbf{J}_f}^\top\mathbf{v}$, we can define a new operation $\operatorname{vjp}(f, \mathbf{v})$.

$$
\operatorname{vjp}(f, \mathbf{v}) \coloneqq {\mathbf{J}_f}^\top\mathbf{v}
$$

That’s neat, but what’s $\operatorname{vjp}$ useful for?
Let’s assume $\mathbf{v} = \mathbf{1}_{1,1}$ and that $f : \mathbb{R}^n \to \mathbb{R}$. We obtain the VJP:

$$
\operatorname{vjp}(f, \mathbf{1}_{1,1}) = {\mathbf{J}_f}^\top \mathbf{1}_{1,1} = \begin{bmatrix} 1 \cdot \dfrac{\partial{f_1}}{\partial{x_1}} \\ \vdots \\ 1 \cdot \dfrac{\partial{f_1}}{\partial{x_n}} \end{bmatrix} = \nabla f
$$

So the VJP of a scalar function can be used to calculate its gradient!
But that still requires us to calculate $\partial{f}/\partial{x_k}$, which can be hard depending on $f$.
This is especially the case if $f$ is a composition of multiple functions.
Take $f = f_i \circ f_{i-1} \circ \cdots \circ f_1$.
Applying the chain rule, we obtain $\mathbf{J}_f = \mathbf{J}_{f_i} \mathbf{J}_{f_{i-1}} \cdots \mathbf{J}_{f_1}$.
Reconciling this with VJPs:

$$
\begin{aligned}\operatorname{vjp}(f,\mathbf{v}) &= {\mathbf{J}_f}^\top\mathbf{v} \\ &= (\mathbf{J}_{f_i} \mathbf{J}_{f_{i-1}} \cdots \mathbf{J}_{f_1})^\top \mathbf{v} \\ &= {\mathbf{J}_{f_1}}^\top {\mathbf{J}_{f_2}}^\top \cdots {\mathbf{J}_{f_i}}^\top \mathbf{v} \end{aligned}
$$

Noting that ${\mathbf{J}_{f_i}}^\top \mathbf{v} = \operatorname{vjp}(f_i, \mathbf{v})$, we can express $\operatorname{vjp}(f, \mathbf{v})$ out of nested $\operatorname{vjp}$ s.

$$
\begin{aligned}\operatorname{vjp}(f,\mathbf{v}) &= {\mathbf{J}_{f_1}}^\top {\mathbf{J}_{f_2}}^\top \cdots {\mathbf{J}_{f_{i-1}}}^\top {\mathbf{J}_{f_i}}^\top \mathbf{v} \\ &= {\mathbf{J}_{f_1}}^\top {\mathbf{J}_{f_2}}^\top \cdots {\mathbf{J}_{f_{i-1}}}^\top \operatorname{vjp}(f_i, \mathbf{v}) \\ &= {\mathbf{J}_{f_1}}^\top {\mathbf{J}_{f_2}}^\top \cdots \operatorname{vjp}\left(f_{i-1}, \operatorname{vjp}\left(f_i, \mathbf{v} \right) \right) \\ &= \operatorname{vjp}\left( f_1, \operatorname{vjp}\left( f_2, \cdots \operatorname{vjp}\left(f_{i-1}, \operatorname{vjp} \left(f_i, \mathbf{v} \right) \right) \right) \right) \end{aligned}
$$

This is messy, so we can curry $\operatorname{vjp}(f, \mathbf{v})$ into a new function $\operatorname{vjp}'(f)(\mathbf{v})$. Note that $\operatorname{vjp}': (\mathbb{R}^n \to \mathbb{R}^m) \to \mathbb{R}^n \to \mathbb{R}^n$. That is, $\operatorname{vjp}'$ takes a map $\mathbb{R}^n \to \mathbb{R}^m$ ($f$), then returns a function from $\mathbb{R}^n$ ($\mathbf{v}$) to $\mathbb{R}^n$ ($\operatorname{vjp}$).

$$
\begin{aligned}\operatorname{vjp}(f,\mathbf{v}) &= \operatorname{vjp}\left( f_1, \operatorname{vjp}\left( f_2, \cdots \operatorname{vjp}\left(f_{i-1}, \operatorname{vjp} \left(f_i, \mathbf{v} \right) \right) \right) \right) \\ &= \left( \operatorname{vjp}'(f_1) \circ \operatorname{vjp}' (f_2) \cdots \circ \operatorname{vjp}' (f_i) \right)(\mathbf{v}) \end{aligned}
$$

This is valuable for two reasons. First, we can obtain the VJP of a composite function by evaluating the VJPs of its constituent functions. Since VJPs of elementary functions are trivial, we can build up VJPs for even the most complicated functions. Second, we can obtain the VJP of any $f_k \ (1 \leq k \leq n)$ with a single computation pass due to the recursive definition.
