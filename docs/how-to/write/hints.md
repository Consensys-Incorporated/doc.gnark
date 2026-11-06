---
title: Hints
description: Using hints for off-circuit computations
sidebar_position: 6
---

# Compiler hints

Instead of computing every value inside a circuit, it is sometimes more efficient to compute a value outside the circuit and verify only the properties required for soundness. `gnark` calls these off-circuit computations _hints_. During solving, the prover obtains hint outputs from a hint function and then uses those outputs in constraints.

For example, the circuit API can decompose an integer into bits directly:

```go
bits := api.ToBinary(circuit.Value, nBits)
```

This is preferable to hand-rolling a decomposition with a hint.

## Implement a hint

A hint is a Go function of type `solver.Hint`:

```go
func bitsHint(field *big.Int, inputs []*big.Int, outputs []*big.Int) error {
	if len(inputs) != 1 {
		return fmt.Errorf("unexpected hint arity")
	}

	a := inputs[0]
	for i := range outputs {
		outputs[i].SetUint64(uint64(a.Bit(i)))
	}
	return nil
}
```

Use `api.Compiler().NewHint` in the circuit to request outputs, then constrain them:

```go
b, err := api.Compiler().NewHint(bitsHint, nBits, circuit.Value)
if err != nil {
	return err
}

var weightedSum frontend.Variable

for i, bit := range b {
	api.AssertIsBoolean(bit)
	weightedSum = api.Add(weightedSum, api.Mul(bit, 1<<i))
}

api.AssertIsEqual(weightedSum, circuit.Value)
```

## Register hints

The backend solver can execute a hint only if the function is available to it. Pass it explicitly when proving:

```go
proof, err := groth16.Prove(ccs, pk, witness,
	backend.WithSolverOptions(solver.WithHints(bitsHint)),
)
```

The corresponding verifier option is `backend.WithSolverOptions(solver.WithHints(bitsHint))`. To replace an already registered hint, use `solver.OverrideHint`.

Gadgets in `gnark/std` register their required hints automatically when the package is imported. If a serialized constraint system is loaded by a process that does not import the gadget package, call the gadget's registration function (for example, `std.RegisterHints()`) during initialization.

For the built-in hint registry, see the [`constraint/solver` package documentation](https://pkg.go.dev/github.com/consensys/gnark/constraint/solver).
