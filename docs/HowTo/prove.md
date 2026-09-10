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

Supported zk-SNARK backends are under `gnark/backend`. `gnark` currently implements `Groth16` and an experimental version of `PlonK`.

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
// 1. One time setup
publicData, _ := plonk.Setup(cs, ...) // WIP

// 2. Proof creation
proof, err := plonk.Prove(r1cs, publicData, witness)

// 3. Proof verification
err := plonk.Verify(proof, publicData, publicWitness)

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
witness, _ := frontend.NewWitness(assignment, ecc.BN254)
// use the witness directly in zk-SNARK backend APIs
groth16.Prove(cs, pk, witness)
// test file --> assert.ProverSucceeded(cs, &witness)
```

:::tip

If witness is not built within the same process, or in another programming language, refer to [Serialize](serialize.md).

:::

## Verify a `Proof` on Ethereum

On `ecc.BN254` + `Groth16`, `gnark` can export the `groth16.VerifyingKey` as a solidity smart contract.

Refer to [the code example](https://github.com/Consensys-Incorporated/gnark-tests/blob/main/solidity/contract/main.go) and [end-to-end integration test](https://github.com/Consensys-Incorporated/gnark-tests/blob/47873ce8e146c1f74477a15972ec63cbfd73c888/solidity/solidity_test.go#L81) using a `geth` simulated blockchain.

```go
// 1. Compile (Groth16 + BN254)
cs, err := frontend.Compile(ecc.BN254, r1cs.NewBuilder, &myCircuit)

// 2. Setup
pk, vk, err := groth16.Setup(cs)

// 3. Write solidity smart contract into a file
err = vk.ExportSolidity(f)
```
