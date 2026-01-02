---
title: "Neural Networks from Scratch: A Recursive Meditation"
date: "2024-01-01"
description: "Exploring a recursive approach in neural network optimization."
tags: ["AI", "Neural Networks", "Optimization"]
---

# Neural Networks from Scratch: A Recursive Meditation

*Or: How I learned to stop worrying and love the call stack*

A couple years ago, I took [Andrew Ng's Deep Learning Specialization](https://www.deeplearning.ai/courses/deep-learning-specialization/). Like many others, I diligently implemented the assignments, writing out the forward pass, carefully constructing my cache dictionaries, then unwinding everything in the backward pass. It worked. It made sense. But something bothered me.

Why all these caches?

We're essentially doing two things: going forward through the network, then going backward. But we're maintaining these explicit data structures—dictionaries, lists, tuples—to store intermediate values. It felt... inelegant. Like we were fighting against the natural structure of the computation.

Then I had a realization: **the call stack is already a cache**. What if we just used recursion? At the time I was a third year chemistry undergrad and too balls deep in thermodynamics III to sit down to implement the idea and do it justice. Fast-forward a year I was able to do that as you'll see below.

## The Standard Approach (What Everyone Teaches)

Let me show you the typical implementation first. Here's what you'd write after taking most DL courses:

```python
def forward_propagation(X, parameters):
    caches = []
    A = X
    L = len(parameters) // 2
    
    for l in range(1, L):
        A_prev = A
        W = parameters[f'W{l}']
        b = parameters[f'b{l}']
        Z = W @ A_prev + b
        A = relu(Z)
        caches.append((A_prev, W, b, Z))  # Store for backward pass
    
    # Output layer
    W = parameters[f'W{L}']
    b = parameters[f'b{L}']
    Z = W @ A + b
    AL = sigmoid(Z)
    caches.append((A, W, b, Z))
    
    return AL, caches

def backward_propagation(AL, Y, caches):
    grads = {}
    L = len(caches)
    m = AL.shape[1]
    
    # Initialize backward propagation
    dAL = -(Y / AL - (1 - Y) / (1 - AL))
    
    # Unwind through cached values
    for l in reversed(range(L)):
        current_cache = caches[l]
        # ... gradient calculations ...
    
    return grads
```

Notice the pattern? Forward pass builds a cache, backward pass consumes it. It's like we're manually implementing what a recursive call stack would give us for free.

## The Recursive Insight

Here's the key observation: in backpropagation, we need access to values from the forward pass *in reverse order*. That's literally what a call stack does—last in, first out.

Consider this: when you write a recursive function, each function call creates a stack frame containing its local variables. When the recursion unwinds, you traverse these frames in reverse order. Sound familiar?

Let me show you what this looks like:

```python
def forward_and_backward_recursive(A_prev, Y, parameters, config, layer=1):
    L = config.num_layers
    m = Y.shape[1]
    
    # Base case: reached the end of the network
    if layer > L:
        cost = compute_cost(A_prev, Y)
        dAL = -(Y / A_prev - (1 - Y) / (1 - A_prev))
        return cost, dAL
    
    # Forward propagation (going down)
    W = parameters[f'W{layer}']
    b = parameters[f'b{layer}']
    Z = W @ A_prev + b
    
    if layer == L:
        A = sigmoid(Z)
    else:
        A = relu(Z)
    
    # Recursive call (go deeper)
    cost, dA = forward_and_backward_recursive(A, Y, parameters, config, layer + 1)
    
    # Backward propagation (coming back up)
    # At this point, W, b, Z, A_prev are all still in scope!
    if layer == L:
        dZ = dA * sigmoid_grad(Z)
    else:
        dZ = dA * relu_grad(Z)
    
    dW = (dZ @ A_prev.T) / m
    db = np.sum(dZ, axis=1, keepdims=True) / m
    dA_prev = W.T @ dZ
    
    # Update parameters inline
    parameters[f'W{layer}'] -= config.learning_rate * dW
    parameters[f'b{layer}'] -= config.learning_rate * db
    
    return cost, dA_prev
```

Look at what just happened. No explicit cache. No separate backward pass function. The recursion naturally captures the forward pass values, and as we unwind, they're right there waiting for us.

## Why This Actually Matters

You might be thinking: "Okay, neat trick, but does it actually matter?" 

Fair question. Let me be honest: **for practical deep learning, no, not really**. PyTorch and TensorFlow will crush this implementation in every meaningful way. They have:
- GPU acceleration
- Automatic differentiation
- Highly optimized BLAS operations
- Memory management that's actually smart
- Battle-tested numerical stability

But here's what this exercise taught me:

### 1. Backpropagation Is Just Structured Recursion

Once you see backprop through this lens, it clicks differently. It's not some magical algorithm—it's the natural consequence of applying the chain rule recursively through a computation graph. The "backward pass" is just unwinding the recursion.

### 2. Data Structures Often Hide Patterns

The explicit cache made backprop feel like two separate algorithms. The recursive version reveals the underlying symmetry: it's one algorithm with two phases, naturally expressed through recursion's descent and ascent.

### 3. Sometimes Less Code Is More Understanding

The standard implementation in my original code was about 200 lines. The recursive version? About 50 lines for the core logic. But more importantly, you can hold the entire algorithm in your head at once.

## The Detailed Mechanics

Let me walk through exactly what's happening with a simple 2-layer network. Say we have input X, and layers W1, W2.

**Going down (forward pass):**
```
Call 1: forward_and_backward(X, Y, params, config, layer=1)
  - Compute Z1 = W1 @ X + b1
  - Compute A1 = relu(Z1)
  - Stack frame contains: X, W1, b1, Z1, A1
  
  Call 2: forward_and_backward(A1, Y, params, config, layer=2)
    - Compute Z2 = W2 @ A1 + b2
    - Compute A2 = sigmoid(Z2)
    - Stack frame contains: A1, W2, b2, Z2, A2
    
    Call 3: forward_and_backward(A2, Y, params, config, layer=3)
      - Base case! Compute cost and dA2
      - Return (cost, dA2)
```

**Coming back up (backward pass):**
```
    Call 2 resumes:
      - Still has A1, W2, b2, Z2 in scope
      - Computes dZ2, dW2, db2, dA1
      - Updates W2, b2
      - Returns (cost, dA1)
  
  Call 1 resumes:
    - Still has X, W1, b1, Z1 in scope
    - Computes dZ1, dW1, db1, dX
    - Updates W1, b1
    - Returns (cost, dX)
```

The call stack gave us exactly what we needed, exactly when we needed it.

## Performance: The Awkward Truth

I ran benchmarks comparing this to the standard implementation. On a simple binary classification task with 1,372 samples:

```
Standard implementation:  2.1s ± 100ms
Recursive implementation: 2.2s ± 95ms
```

Memory usage? Virtually identical. Accuracy? Same to within floating point error.

So no, this isn't a performance win. Python's recursion has overhead. The stack depth is limited. For large networks, you'd hit recursion limits.

But that's not the point.

## What I Actually Learned

This exercise crystallized something for me about learning: **understanding comes from seeing the same thing from multiple angles**.

I "understood" backpropagation after Ng's course. I could implement it, debug it, explain it. But rewriting it recursively gave me a different kind of understanding—a structural understanding of *why* backprop works the way it does.

It's like the difference between knowing how to drive a car versus understanding how the engine works. Both are valuable, but they're different kinds of knowledge.

## The Bigger Picture

Modern deep learning has abstracted away almost everything. You write:

```python
loss = criterion(outputs, targets)
loss.backward()
optimizer.step()
```

And PyTorch handles all the complexity. This is *good*. You should use these tools. They're fast, correct, and let you focus on architecture and experiments.

But there's value in occasionally popping the hood. Not to build a better engine—you won't—but to understand what's happening when things go wrong. When gradients vanish. When training diverges. When your intuition says something should work but it doesn't.

## Closing Thoughts

Is the recursive approach better? No.

Is it useful for production? Definitely not.

Did it teach me something valuable? Absolutely.

Sometimes the point of implementing something from scratch isn't to produce better code. It's to produce a better understanding. This recursive implementation didn't make me a better deep learning engineer, but it made me a more thoughtful one.

And in the end, that might be more valuable.

Also, [yes you should understand backprop (Karpathy)](https://karpathy.medium.com/yes-you-should-understand-backprop-e2f06eab496b)

---

**Code:** The full implementation is available [on GitHub](https://github.com/makasimba/Optimization-With-Recursion). It includes:
- The recursive implementation with proper type hints
- A toy data set to play with
- Comparison benchmarks against standard approaches
- A simple binary classification example
- Tests verifying gradient correctness

**Further Reading:**
- [Backpropagation calculus (3Blue1Brown)](https://www.youtube.com/watch?v=tIeHLnjs5U8)
- [Yes you should understand backprop (Karpathy)](https://karpathy.medium.com/yes-you-should-understand-backprop-e2f06eab496b)

*Thanks for reading. If you found this interesting, you might also like my posts on [https://makasimba.github.io/]. Feel free to reach out on [https://www.linkedin.com/in/makasimba/] or [https://x.com/__Makaa] if you have thoughts or questions.*

