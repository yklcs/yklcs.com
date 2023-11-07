---
title: Vector-Jacobian products
date: 2023-11-06
tags: [math, ai]
---

Consider $f: \R^n \to \R^m$. The Jacobian of $f$, denoted $\mathbf{J}_f$, is an $m \times n$ matrix of all the partial derivatives. Pretty basic:

$$
\textbf{J}_f = \frac{\partial{f}}{\partial{\mathbf{x}}} = \begin{bmatrix} \dfrac{\partial{f_1}}{\partial{x_1}} & \cdots & \dfrac{\partial{f_1}}{\partial{x_n}} \\ \vdots & \ddots & \vdots \\ \dfrac{\partial{f_m}}{\partial{x_1}} & \cdots & \dfrac{\partial{f_m}}{\partial{x_n}} \end{bmatrix}
$$

For $\mathbf{v} \in \R^m$ and $\mathbf{x} \in \R^n$, let's look at the product of the row vector $\mathbf{v}^\top$ and $\mathbf{J}_f (\mathbf{x})$.
This is known as the _vector-Jacobian product_ (VJP).

$$
\begin{aligned}
\mathbf{v}^\top \mathbf{J}_f (\mathbf{x})
&= \begin{bmatrix} v_1 & v_2 & \cdots & v_m \end{bmatrix}\begin{bmatrix} \dfrac{\partial{f_1}}{\partial{x_1}} (x_1) & \cdots & \dfrac{\partial{f_1}}{\partial{x_n}} (x_n) \\ \vdots & \ddots & \vdots \\ \dfrac{\partial{f_m}}{\partial{x_1}} (x_1) & \cdots & \dfrac{\partial{f_m}}{\partial{x_n}} (x_n) \end{bmatrix} \\
&= \begin{bmatrix} v_1 \dfrac{\partial{f_1}}{\partial{x_1}} (x_1) + \cdots + v_m \dfrac{\partial{f_m}}{\partial{x_1}} (x_1) \\ \vdots \\ v_1 \dfrac{\partial{f_1}}{\partial{x_n}} (x_n)  + \cdots + v_m \dfrac{\partial{f_m}}{\partial{x_n}} (x_n) \end{bmatrix}^\top
\end{aligned}
$$

The row vectors are pesky, so transposes are taken.

$$
{\mathbf{J}_f} (\mathbf{x})^\top\mathbf{v} = \begin{bmatrix} v_1 \dfrac{\partial{f_1}}{\partial{x_1}} (x_1) + \cdots + v_m \dfrac{\partial{f_m}}{\partial{x_1}} (x_1) \\ \vdots \\ v_1 \dfrac{\partial{f_1}}{\partial{x_n}} (x_n) + \cdots + v_m \dfrac{\partial{f_m}}{\partial{x_n}} (x_n) \end{bmatrix}
$$

As the "variables" are $f$, $\mathbf{x}$, and $\mathbf{v}$ in ${\mathbf{J}_f} (\mathbf{x})^\top\mathbf{v}$, we can define a new operation $\operatorname{vjp}(f, \mathbf{x})(\mathbf{v})$.[^1] Note that $\operatorname{vjp} : (\R^n \to \R^m, \R^n) \to \R^m \to \R^n$.

$$
\operatorname{vjp}(f, \mathbf{x})(\mathbf{v}) \coloneqq {\mathbf{J}_f} (\mathbf{x})^\top \mathbf{v}
$$

But that still requires us to calculate $\partial{f}/\partial{x_k}$, which can be hard depending on $f$.
This is especially the case if $f$ is a composition of multiple functions.
Take $f = f_i \circ f_{i-1} \circ \cdots \circ f_1$.[^2]
The chain rule for Jacobians is $\mathbf{J}_{f_{k+1} \circ f_k} (\mathbf{x}) = \mathbf{J}_{f_{k+1}} (f_k (\mathbf{x})) \mathbf{J}_{f_k}(\mathbf{x})$.
We can define $\mathbf{x}_k = (f_k \circ f_{k-1} \circ \cdots \circ f_1) (\mathbf{x})$ as the $k$th intermediate function value.
Reconciling this with VJPs:

$$
\begin{aligned}\operatorname{vjp}(f,\mathbf{x})
&= {\mathbf{J}_f} (\mathbf{x})^\top \mathbf{v} \\
&= (\mathbf{J}_{f_i \circ \cdots \circ f_3 \circ f_2 \circ f_1}(\mathbf{x})) ^\top \mathbf{v} \\
&= (\mathbf{J}_{f_i \circ \cdots \circ f_3 \circ f_2} (f_1(\mathbf{x})) \mathbf{J}_{f_1} (\mathbf{x})) ^\top \mathbf{v} \\
&= (\mathbf{J}_{f_i \circ \cdots \circ f_3} (f_2(f_1(\mathbf{x}))) \mathbf{J}_{f_2} (f_1(\mathbf{x})) \mathbf{J}_{f_1} (\mathbf{x})) ^\top \mathbf{v} \\
&= (\mathbf{J}_{f_i \circ \cdots \circ f_3} (f_2(f_1(\mathbf{x}))) \mathbf{J}_{f_2} (\mathbf{x}_1) \mathbf{J}_{f_1} (\mathbf{x})) ^\top \mathbf{v} \\
&= (\mathbf{J}_{f_i} (\mathbf{x}_{i-1}) \cdots \mathbf{J}_{f_2} (\mathbf{x}_1) \mathbf{J}_{f_1} (\mathbf{x})) ^\top \mathbf{v} \\
&= \mathbf{J}_{f_1} (\mathbf{x})^\top \mathbf{J}_{f_2} (\mathbf{x}_1)^\top \cdots \mathbf{J}_{f_i} (\mathbf{x}_{i-1})^\top \mathbf{v}
\end{aligned}
$$

Noting that $\mathbf{J}_{f_i}(\mathbf{x})^\top\mathbf{v} = \operatorname{vjp}(f_i, \mathbf{x})$, we can express $\operatorname{vjp}(f, \mathbf{x})$ with a composition of $\operatorname{vjp}$s.

$$
\begin{aligned}
\operatorname{vjp}(f,\mathbf{x})(\mathbf{v})
&= \mathbf{J}_{f_1} (\mathbf{x})^\top \cdots \mathbf{J}_{f_{i-1}} (\mathbf{x}_{i-2})^\top \mathbf{J}_{f_i} (\mathbf{x}_{i-1})^\top \mathbf{v} \\
&= \mathbf{J}_{f_1} (\mathbf{x})^\top \cdots \mathbf{J}_{f_{i-1}} (\mathbf{x}_{i-2})^\top \operatorname{vjp}(f_i,\mathbf{x}_{i-1})(\mathbf{v}) \\
&= \mathbf{J}_{f_1} (\mathbf{x})^\top \cdots \operatorname{vjp}(f_{i-1}, \mathbf{x}_{i-2})(\operatorname{vjp}(f_i,\mathbf{x}_{i-1})(\mathbf{v})) \\
&= (\operatorname{vjp} (f_1, \mathbf{x}) \circ \cdots \circ \operatorname{vjp}(f_i,\mathbf{x}_{i-1})) (\mathbf{v})
\end{aligned}
$$

Which brings us to our conclusion:

$$
\operatorname{vjp}(f,\mathbf{x})(\mathbf{v}) = (\operatorname{vjp} (f_1, \mathbf{x}) \circ \cdots \circ \operatorname{vjp}(f_i,\mathbf{x}_{i-1})) (\mathbf{v})
$$

The value of this representation lies in the fact that it enables reverse mode automatic differentiation.

_Automatic differentiation_ follows from the fact that we can obtain the VJP of a composite function algorithmically by evaluating the VJPs of its constituent functions.
Since even the most complicated of functions are made up of a composition of elementary functions, and the VJP of elementary functions is trivial, we can build up VJPs for "complicated" (i.e. lots of variables, deep composition, etc.) functions step-by-step.
We require numeric values for $\mathbf{v}$ and $\mathbf{x}$ which sets this method apart from symbol differentiation.

_Reverse mode_ refers to the fact that two passes -- forward and backward -- are required to calculate VJPs.
Calculating the VJP of $f_k$ requires us to have calculated the VJP of $f_{k+1}$ as well as $\mathbf{x}_{k-1}$.
The forward pass as we evaluate $f$ from $f_1$ to $f_i$ gives us the intermediate value $\mathbf{x}_{k-1}$.
The backwards pass as we build up the VJPs from $f_i$ to $f_1$ calculates the VJP of $f_{k+1}$.

Wait, are VJPs actually doing differentiation though?
Sure, we can calculate the product of a vector and Jacobian, but _differentiation_ would imply something like a gradient or the entire Jacobian.
Turns out VJPs allow us to calculate both.
Using $f : \R^n \to \R$ and $\mathbf{v} = \mathbf{1}_{1,1}$, we obtain the VJP:

$$
\operatorname{vjp}(f, \mathbf{x})(\mathbf{1}_{1,1}) = {\mathbf{J}_f}(\mathbf{x})^\top {\mathbf{1}_{1,1}} = \begin{bmatrix} \dfrac{\partial{f_1}}{\partial{x_1}} (x_1) \\ \vdots \\ \dfrac{\partial{f_1}}{\partial{x_n}} (x_n) \end{bmatrix} = \nabla f({\mathbf{x}})
$$

So the VJP of a scalar function can be used to calculate its gradient at a point.
Similarly, we can calculate the entire Jacobian of a function row-by-row.
Choosing $\mathbf{v}$ as one-hot encoded vectors results in the VJP being the row of the Jacobian encoded by $\mathbf{v}$.

$$
\mathbf{J}_f(\mathbf{x}) = \begin{bmatrix}
  \operatorname{vjp}(f, \mathbf{x})(\delta_{i=0})^\top \\
  \vdots \\
  \operatorname{vjp}(f, \mathbf{x})(\delta_{i=m})^\top
\end{bmatrix}
$$

It is worth noting that building the entire Jacobian with VJPs requires $m$ passes for $f: \R^n \to \R^m$ with an $m \times n$ Jacobian.
We can assume that this method is more efficent the smaller $m$ is compared to $n$.
In a machine learning context, $m=1 \ll n$ is common as the outputs are scalar loss values and the inputs are model weights, making JVPs effective.

Vector-Jacobian products can be built up from VJPs and produce gradients and Jacobians.
This enables reverse mode automatic differentiation, which is efficient for machine learning. Everything falls into place.

[^1]: We could use $\operatorname{vjp}(f, \mathbf{x}, \mathbf{v})$, but currying $\mathbf{v}$ out simplifies later calculations.
[^2]: $f_k$ was used as the $k$th component of $f$ before, but we use it to denote different functions from here on.
