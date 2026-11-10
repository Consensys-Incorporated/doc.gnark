---
title: Compile circuits
description: How to compile gnark circuits
sidebar_position: 3
---

# Compile a `gnark` circuit

Use `frontend.Compile`, to convert a [circuit definition](write/circuit_structure.md) into an arithmetic representation.

The `frontend.Compile` method takes a high-level program and translates it to a sequence of constraints which have a simple mathematic form.

```go
var myCircuit Circuit
r1cs, err := frontend.Compile(ecc.BN254.ScalarField(), r1cs.NewBuilder, &myCircuit)
```

:::tip Playground

Check out the [gnark Playground](https://play.gnark.io) to compile and visualize the sequence of constraints from a circuit.

:::
