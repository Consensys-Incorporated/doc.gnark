---
title: zk-SNARK
description: What are zk-SNARKs
sidebar_position: 1
---

<!-- markdownlint-disable MD013 -->

# zk-SNARK

A zk-SNARK is a cryptographic construction that allows you to provide a proof of knowledge (Argument of Knowledge) of secret inputs satisfying a public mathematical statement, without leaking any information on the inputs (**Zero Knowledge**).

In addition, verifying a proof is a computational operation which is at worst logarithmic in the size of the mathematical statement (**Succinct**), and the procedure of proving and verifying a proof requires no interaction between the prover and the verifier, except passing the proof to the verifier (**non-interactive**).

If we don't consider **Succinctness**, and if we slightly modify the notion of **Zero knowledge** to **Honest Verifier Zero Knowledge** (which is weaker than the **Zero Knowledge** property), examples of (HV)ZK-NARK are digital signatures algorithms ECDSA and EDDSA, which are in fact applications of the Schnorr Identification Protocol. It is essentially an argument of knowledge to prove knowledge of the discrete log of a point in a group where the discrete log is hard. Verifying such signatures is not computationally costly, but does not verify the **Succinctness** property as it was previously defined.

The signature schemes are specific mathematical statements, or [**circuits**](circuits.md).

With `gnark`, you can write any circuit using the [gnark API](../howto/write/circuit_api.md). An instance of such a circuit is $hash(x)=y$, where $y$ is public and $x$ secret.

A valid proof of such a statement ensures that the creator of the proof knows $x$ such that $hash(x)=y$, without revealing $x$. It is worth noting that if $y$ is not specified, there are an infinity of couples $(x,y)$ verifying $hash(x)=y$. But if $y$ is specified, only one $x$ verifies this relation.

## Public and secret inputs

Given a mathematical statement, a zk-SNARK separates the inputs as $public$ and $secret$. Typically, the $public$ inputs are known to everyone, and there is a unique $secret$ input such that $secret + public$ inputs satisfy the statement. It's exactly like a signature; given a valid signature, there is one unique secret key that leads to the signature. However there is an infinity of valid couples (signature, secret key).

## zk-SNARK activity

zk-SNARK is an active area of academic research with improvements and new protocols announced weekly. For example, according to

<!-- vale off -->

["A Cambrian Explosion of Crypto Proofs" overview article](https://nakamoto.ghost.io/cambrian-explosion-of-crypto-proofs/)

<!-- vale on -->

we saw the following new zk-SNARK protocols in 2019: Libra, Sonic, SuperSonic, PlonK, SLONK, Halo, Marlin, Fractal, Spartan, Succinct Aurora, RedShift, AirAssembly.

:::tip

There are many good expositions of zk-SNARKs. Recommended ones are:

- ["What are zk-SNARKs?" article](https://z.cash/technology/zksnarks/)
- [Matter Labs curated list of references](https://github.com/matter-labs/awesome-zero-knowledge-proofs).

:::

\*[zk-SNARK]: Zero-Knowledge Succinct Non-Interactive Argument of Knowledge
