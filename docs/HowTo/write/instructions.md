---
title: Conditionals and loops
description: How to use conditional and loops in a gnark circuit
sidebar_position: 5
---

# Conditionals and loops

## Loops

Use standard `for` loops inside a circuit definition.

:::note

The `for` loop impact on the constraint system is identical to unrolling its content.

:::

```go title="check that X*X*X*X*X... == Y"
func (circuit *Circuit) Define(api frontend.API) error {
    for i := 0; i < n; i++ {
        circuit.X = api.Mul(circuit.X, circuit.X)
    }
    api.AssertIsEqual(circuit.X, circuit.Y)
    return nil
}
```

## Conditionals statements

In an imperative programming language, conditionals would use `if` and `else` statements. However, this doesn't translate well in a _declarative_ API to define the circuit, because the output of the `frontend.Compile` method is an arithmetic representation that must encode the various branches.

`gnark` offers `api.Select(...)` API, which is similar to Prolog-like languages.

```go
// Select if b is true, yields i1 else yields i2
func (cs *ConstraintSystem) Select(b Variable, i1, i2 interface{}) Variable {
```

:::note

Work is ongoing to provide a `if` like statement. [Github issue](https://github.com/Consensys-Incorporated/gnark/issues/81).

:::
