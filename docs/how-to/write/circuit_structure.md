---
title: Circuit structure
description: gnark circuit structure
sidebar_position: 2
---

# Circuit structure

A `gnark` circuit must implement the `frontend/Circuit` interface:

```go
type Circuit interface {
    // Define declares the circuit's Constraints
    Define(api frontend.API) error
}
```

The circuit must declare its [public and secret inputs](../../concepts/zkp.md#public-and-secret-inputs) as `frontend.Variable`:

```go
type MyCircuit struct {
    C myComponent
    Y frontend.Variable `gnark:",public"`
}

type myComponent struct {
    X frontend.Variable
}

func (circuit *MyCircuit) Define(api frontend.API) error {
    // ... see Circuit API section
}
```

At compile time, `frontend.Compile(...)` recursively parses the struct fields that contains `frontend.Variable` to build the `frontend.constraintSystem`.

By default, a `frontend.Variable` has the `gnark:",secret"` visibility.

:::note Struct tags

Similar to standard Go packages (like `encoding/json`), struct fields can have tags which adds important metadata to input declarations.

Other tag option:

```go
// omits Y, frontend.Compile will not instantiate a new variable in the ConstraintSystem
// this can be useful when a Variable is referenced in multiple places but we only wish to instantiate it once
Y frontend.Variable `gnark:"-"`
```

:::
