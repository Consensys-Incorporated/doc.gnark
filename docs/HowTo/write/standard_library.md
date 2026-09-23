---
title: Standard library
description: gnark standard library
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `gnark` standard library

We provide the following functions in `gnark/std`:

<Tabs>
  <TabItem value="MiMC hash" label="MiMC hash" >

```go
type mimcCircuit struct {
	Data frontend.Variable
	Hash frontend.Variable `gnark:",public"`
}

func (circuit *mimcCircuit) Define(api frontend.API) error {
	hFunc, err := mimc.NewMiMC(api)
	if err != nil {
		return err
	}
	hFunc.Write(circuit.Data)
	api.AssertIsEqual(circuit.Hash, hFunc.Sum())
	return nil
}
```

  </TabItem>
  <TabItem value="EdDSA signature verification" label="EdDSA signature verification" >

```go
type eddsaCircuit struct {
	curveID   tedwards.ID
	PublicKey eddsa.PublicKey   `gnark:",public"`
	Signature eddsa.Signature   `gnark:",public"`
	Message   frontend.Variable `gnark:",public"`
}

func (circuit *eddsaCircuit) Define(api frontend.API) error {
	curve, err := twistededwards.NewEdCurve(api, circuit.curveID)
	if err != nil {
		return err
	}

	hFunc, err := mimc.NewMiMC(api)
	if err != nil {
		return err
	}

	return eddsa.Verify(curve, circuit.Signature, circuit.Message, circuit.PublicKey, &hFunc)
}
```

  </TabItem>
  <TabItem value="Merkle proof verification" label="Merkle proof verification" >

```go
type merkleCircuit struct {
	MerkleProof merkle.MerkleProof
	Leaf        frontend.Variable
}

func (circuit *merkleCircuit) Define(api frontend.API) error {
	hFunc, err := mimc.NewMiMC(api)
	if err != nil {
		return err
	}

	// Path[0] is the leaf. The proof index is encoded in little-endian bit
	// order in Path[1:].
	circuit.MerkleProof.VerifyProof(api, &hFunc, circuit.Leaf)
	return nil
}
```

  </TabItem>
  <TabItem value="zk-SNARK verifier" label="zk-SNARK verifier" >

Enables verifying a _BLS12_377_ Groth16 `Proof` inside a _BW6_761_ circuit

```go
type verifierCircuit struct {
	Proof        recursion_groth16.Proof[sw_bls12377.G1Affine, sw_bls12377.G2Affine]
	VerifyingKey recursion_groth16.VerifyingKey[sw_bls12377.G1Affine, sw_bls12377.G2Affine, sw_bls12377.GT]
	InnerWitness recursion_groth16.Witness[sw_bls12377.ScalarField] `gnark:",public"`
}

func (circuit *verifierCircuit) Define(api frontend.API) error {
	verifier, err := recursion_groth16.NewVerifier[
		sw_bls12377.ScalarField,
		sw_bls12377.G1Affine,
		sw_bls12377.G2Affine,
		sw_bls12377.GT,
	](api)
	if err != nil {
		return err
	}

	return verifier.AssertProof(circuit.VerifyingKey, circuit.Proof, circuit.InnerWitness)
}
```

For a complete flow, see [`std/recursion/groth16/verifier_test.go`](https://github.com/Consensys-Incorporated/gnark/blob/v0.16.3/std/recursion/groth16/verifier_test.go). It shows how to compile the inner circuit, prove it natively, convert the proof, verifying key, and public witness with `ValueOf*`, and solve the outer circuit.

  </TabItem>
</Tabs>
