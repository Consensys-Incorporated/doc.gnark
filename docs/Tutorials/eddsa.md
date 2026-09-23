---
title: EdDSA
description: Verify an EdDSA signature inside a zk-SNARK circuit
sidebar_position: 1
---

# EdDSA

This tutorial verifies an EdDSA signature inside a zk-SNARK circuit. It is useful in zk-rollup-style applications where an operator proves that a batch of user signatures is valid.

EdDSA in `gnark` uses twisted Edwards curves defined over the SNARK field. These companion curves are commonly known as JubJub for BLS12-381 and Baby JubJub for BN254. Using a companion curve avoids the high cost of emulating an external curve inside the native SNARK field.

## Write the circuit

The circuit carries the public key, signature, and message. An untagged `curveID` field selects the companion curve:

```go
type eddsaCircuit struct {
	curveID   tedwards.ID
	PublicKey eddsa.PublicKey   `gnark:",public"`
	Signature eddsa.Signature   `gnark:",public"`
	Message   frontend.Variable `gnark:",public"`
}
```

`Define` constructs the companion curve and a MiMC hasher, then delegates verification to the maintained `eddsa` gadget:

```go
func (circuit *eddsaCircuit) Define(api frontend.API) error {
	curve, err := twistededwards.NewEdCurve(api, circuit.curveID)
	if err != nil {
		return err
	}

	hFunc, err := mimc.NewMiMC(api)
	if err != nil {
		return err
	}

	return eddsa.Verify(
		curve,
		circuit.Signature,
		circuit.Message,
		circuit.PublicKey,
		&hFunc,
	)
}
```

The gadget verifies that the scalar is in the group order, performs the required double-base scalar multiplication, checks the resulting point, applies the cofactor, and asserts the verification equation.

## Generate an out-of-circuit signature

Generate the key and signature with `gnark-crypto`. For BN254, use the matching MiMC hasher:

```go
randomness := rand.New(rand.NewSource(seed)) //#nosec G404 -- deterministic tutorial input

privateKey, err := eddsa.New(tedwards.BN254, randomness)
if err != nil {
	return err
}

hFunc := hash.MIMC_BN254.New()
msg := []byte{0xde, 0xad, 0xf0, 0x0d}

signature, err := privateKey.Sign(msg, hFunc)
if err != nil {
	return err
}

publicKey := privateKey.Public()
valid, err := publicKey.Verify(signature, msg, hFunc)
if err != nil {
	return err
}
if !valid {
	return errors.New("out-of-circuit verification failed")
}
```

## Assign and test the circuit

The `Assign` helpers decode the compressed public key and signature into circuit-friendly values:

```go
var circuit eddsaCircuit
circuit.curveID = tedwards.BN254

var assignment eddsaCircuit
assignment.curveID = tedwards.BN254
assignment.Message = msg
assignment.PublicKey.Assign(tedwards.BN254, publicKey.Bytes())
assignment.Signature.Assign(tedwards.BN254, signature)

assert := test.NewAssert(t)
assert.CheckCircuit(&circuit,
	test.WithValidAssignment(&assignment),
	test.WithCurves(ecc.BN254),
)
```

You can also add an invalid assignment, for example the same signature with a different message:

```go
var invalidAssignment eddsaCircuit
invalidAssignment.curveID = tedwards.BN254
invalidAssignment.Message = []byte{0xde, 0xad, 0xf0, 0x0e}
invalidAssignment.PublicKey.Assign(tedwards.BN254, publicKey.Bytes())
invalidAssignment.Signature.Assign(tedwards.BN254, signature)

assert.CheckCircuit(&circuit,
	test.WithValidAssignment(&assignment),
	test.WithInvalidAssignment(&invalidAssignment),
	test.WithCurves(ecc.BN254),
)
```

## Prove and verify

Compile, create witnesses, and run Groth16:

```go
ccs, err := frontend.Compile(
	ecc.BN254.ScalarField(),
	r1cs.NewBuilder,
	&circuit,
)
if err != nil {
	return err
}

witness, err := frontend.NewWitness(&assignment, ecc.BN254.ScalarField())
if err != nil {
	return err
}
publicWitness, err := witness.Public()
if err != nil {
	return err
}

pk, vk, err := groth16.Setup(ccs)
if err != nil {
	return err
}
proof, err := groth16.Prove(ccs, pk, witness)
if err != nil {
	return err
}

return groth16.Verify(proof, vk, publicWitness)
```
