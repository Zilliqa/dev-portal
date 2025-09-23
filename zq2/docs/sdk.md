---
id: sdk
title: Tools and repositories
---

<!-- markdownlint-disable MD025 MD042 MD013 -->

# Tools and repositories

Below is a list of useful tools for use with the Zilliqa 2.0 networks:

## EVM Development Environments

Zilliqa 2.0 features an EVM execution layer and can therefore be used with standard EVM tools and frameworks.</br>
These include popular IDEs such as VSCode, Remix, and many others.

### Neo Savant 2.0

The Neo Savant 2.0 IDE is an upgraded version of the original online IDE for creating and deploying Scilla contracts. This version adds a host of new features, including multi-tab text editing and the ability to read contract states.

Neo Savant 2.0 can be accessed at [https://ide.zilliqa.com/](https://ide.zilliqa.com/).

### SDKs and other tools

Zilliqa 2.0 continues providing native SDKs for:

- [Rust](https://crates.io/crates/zilliqa-rs)
- [Golang](https://github.com/Zilliqa/gozilliqa-sdk)
- [Java](https://github.com/Zilliqa/zilliqa-developer/tree/main/products/laksaj)
- [Javascript/typescript](https://www.npmjs.com/package/@zilliqa-js/zilliqa)
- [Python](https://github.com/zilliqa/pyzil)

We also continue to maintain tools such as:

- [Scilla hardhat plugin](https://github.com/Zilliqa/hardhat-scilla-plugin) - to support deploying and testing Scilla contracts
- [ethers.js fork](https://github.com/Zilliqa/ethers.js) - to support the non-canonical signatures of non-EVM Zilliqa transactions (Schnorr signatures)
- [otterscan fork](https://github.com/Zilliqa/otterscan) - to add the ability to understand non-EVM (Scilla) transactions

### Open-source repositories

We provide a number of open-source repositories relevant to Zilliqa 2.0:

- [zq2](https://github.com/Zilliqa/zq2) - the Zilliqa 2 source code itself
- [zq2-staking](https://github.com/zilliqa/zq2-staking) - the Zilliqa 2 staking portal
- [delegated-staking](https://github.com/zilliqa/delegated_staking/) - Zilliqa 2 staking pool contracts
- [eth-spout](https://github.com/Zilliqa/zilliqa-developer/tree/main/products/eth-spout) - a simple faucet
- [neo-savant](https://github.com/Zilliqa/zilliqa-developer/tree/main/products/neo-savant) - the Scilla IDE
- [developer-portal-zq2](https://dev.zilliqa.com) - this developer portal


Note the following dependency bumps in crates such as `anyhow`, `serde_json`, `eth_trie`, `tempfile`, `zip`, and `axios`. Developers should verify the compatibility of these changes, especially in local development environments.

Checkpoint management toolsets and utilities, including the new conversion tool, have been updated and integrated into the overall SDK and tooling ecosystem.
