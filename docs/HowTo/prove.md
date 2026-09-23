---
title: Create and verify proofs
description: How to create and verify proofs
sidebar_position: 5
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create and verify a `Proof`

## Use `gnark/backend`

Once the [circuit](write/circuit_structure.md) is [compiled](compile.md), you can run the three algorithms of a zk-SNARK back end:

- `Setup`
- `Prove`
- `Verify`

:::note

Supported zk-SNARK backends are under `gnark/backend`. `gnark` currently implements `Groth16` and `PlonK` with KZG commitments.

:::

:::info Use a zk-SNARK back end

<Tabs>
  <TabItem value="Groth16" label="Groth16" >

```go
// 1. One time setup
pk, vk, err := groth16.Setup(cs)

// 2. Proof creation
proof, err := groth16.Prove(cs, pk, witness)

// 3. Proof verification
err := groth16.Verify(proof, vk, publicWitness)
```

  </TabItem>
  <TabItem value="PlonK" label="PlonK" >

```go
// Compile a circuit with the PlonK arithmetization.
ccs, err := frontend.Compile(ecc.BN254.ScalarField(), scs.NewBuilder, &circuit)
if err != nil {
	return err
}

// For development and tests only. In production, load a securely generated SRS.
srs, srsLagrange, err := unsafekzg.NewSRS(ccs.(*cs.SparseR1CS))
if err != nil {
	return err
}

// 1. One time setup
pk, vk, err := plonk.Setup(ccs, srs, srsLagrange)
if err != nil {
	return err
}

// 2. Proof creation
proof, err := plonk.Prove(ccs, pk, witness)
if err != nil {
	return err
}

// 3. Proof verification
return plonk.Verify(proof, vk, publicWitness)

```

  </TabItem>
</Tabs>

:::

## Construct the witness

Within a Go process, re-use the circuit data structure to construct the witness.

```go
type Circuit struct {
    X frontend.Variable
    Y frontend.Variable `gnark:",public"`
}

assignment := &Circuit {
    X: 3,
    Y: 35,
}
witness, err := frontend.NewWitness(assignment, ecc.BN254.ScalarField())
if err != nil {
	return err
}
publicWitness, err := frontend.NewWitness(assignment, ecc.BN254.ScalarField(), frontend.PublicOnly())
if err != nil {
	return err
}

// use the witness directly in zk-SNARK backend APIs
proof, err := groth16.Prove(cs, pk, witness)
if err != nil {
	return err
}
return groth16.Verify(proof, vk, publicWitness)
```

:::tip

If witness is not built within the same process, or in another programming language, refer to [Serialize](serialize.md).

:::

## Verify a `Proof` on Ethereum

On `ecc.BN254` + `Groth16`, `gnark` can export the `groth16.VerifyingKey` as a Solidity smart contract. Solidity export is also available for `PlonK` on BN254.

```go
// 1. Compile (Groth16 + BN254)
cs, err := frontend.Compile(ecc.BN254.ScalarField(), r1cs.NewBuilder, &myCircuit)
if err != nil {
	return err
}

// 2. Setup
pk, vk, err := groth16.Setup(cs)
if err != nil {
	return err
}

// 3. Write a Solidity smart contract into a file.
//
// In production, create proofs and verify native proofs with the Solidity-compatible
// options:
//   proof, err := groth16.Prove(cs, pk, witness,
//       solidity.WithProverTargetSolidityVerifier(backend.GROTH16))
//   err := groth16.Verify(proof, vk, publicWitness,
//       solidity.WithVerifierTargetSolidityVerifier(backend.GROTH16))
return vk.ExportSolidity(f, solidity.WithPragmaVersion("^0.8.0"))
```
