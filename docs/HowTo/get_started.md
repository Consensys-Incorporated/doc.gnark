---
title: Add gnark to your project
sidebar_position: 1
---

# Add gnark to your project

## Prerequisites

- [Install Go](https://golang.org/doc/install).

## Install `gnark`

`gnark` is a standard Go module, install it using the following command inside your Go module:

```bash
go get github.com/consensys/gnark@latest
```

:::info

`gnark` targets Go 1.25 or newer. It is optimized for `amd64` and also supports experimental GPU acceleration for Groth16 through the ICICLE backend.

:::
