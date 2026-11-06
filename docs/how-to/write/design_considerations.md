---
title: Design considerations
description: gnark circuit design considerations
sidebar_position: 1
---

# Design considerations

:::info

Refer to the conceptual documentation if you're not familiar with:

- [zk-SNARKs](../../concepts/zkp.md)
- [Circuits or a constraint system](../../concepts/circuits.md)
- [How to choose a proving scheme and curve](../../concepts/schemes_curves.md).

:::

## Programmability

:::warning

[`Circuits`](../../concepts/circuits.md) are programmable but can't (practically and efficiently) prove any algorithm. The way constraints are represented make some things more natural ("snark-friendly") to do than others.

Numbers used in constraints are not integers or floats, but finite field elements (big numbers modulo a prime $p$).

So when writing `a = b * c`, not only don't you have the liberty to specify _types_ for these variables (for example `float` or `int`), but you must also consider field overflow.

Some cryptographic constructs, like MiMC hash or EdDSA signature scheme were designed to work on those field elements, and are well suited to be used with zk-SNARKs. Which is why zk-SNARKs are mostly used to verify hashes, signatures or other "snark friendly" cryptographic primitives.

Examples of programming concepts used in a traditional programming language, but are un-natural in most zk-SNARK constructs are:

- Using floating numbers
- Using conditional statements (`if` and `else`)
- Managing memory.

:::

:::info

Like other projects in the zk-SNARK or blockchain space, we're actively researching ways to make zk-SNARKs more programmable. For example through using of proof recursion or zk-virtual machines.

:::

## Performance

The [Proving schemes and curves](../../concepts/schemes_curves.md) section provides more insight into `Prover` and `Verifier` performance, across scheme and curve choices.

In a `Circuit` you want to minimize the number of constraints. The `frontend` package does a lot of work behind the scenes . For example, it performs lazy evaluations of linear expressions to minimize the number of constraints. That part is transparent for the circuit developer.

:::tip Division (`a = b / c`)

Performing a field division outside a `Circuit` is something algorithms tend to avoid because it is costly.

However, doing that in a `Circuit` is cheap. Writing `a = b / c` will be encoded into a constraint `assert(c * a == b)` (one multiplicative constraint only).

:::

:::tip Range check (`assert(a < c)`)

The range check operation (`assert(a < c)`) is costly because it involves decomposing the variables into bits (still represented on large field elements).

:::

:::tip Large variable (`variable > modulus p`)

If you need variables that exceed the modulus $p$, a standard method is to split the variable into a smaller basis than $p$ (for example $(p-1)/2$), and write the variables in this basis.

Each digit of the resulting decomposition is smaller than $p$, and therefore is not reduced.

:::
