---
id: hardhat
title: Hardhat
keywords:
  - Hardhat
description: Hardhat allows developers to easily compile, test, and deploy their Solidity smart contracts
---

---

## Hardhat

[Hardhat](https://hardhat.org/) is a development environment for the Solidity programming language. One of the primary use cases for Hardhat is to make it easier for developers to compile and deploy their Solidity smart contracts. Another common use case for Hardhat is to make it easier to write and run automated tests for Solidity smart contracts. This can help to ensure that the contracts are working as intended and can help to catch any bugs or issues before they are deployed to the main network. Check the [documentation](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start) for more information. If you plan to use ethers.js with Zilliqa, consider using [our fork](https://github.com/Zilliqa/ethers.js) to avoid errors - the only change is that our fork tolerates the non-canonical signatures that are generated by the Zilliqa native API.

There's a [plugin](https://github.com/Zilliqa/hardhat-scilla-plugin) to make developing Scilla contracts with hardhat easier, and a [guide](../../developers/guides/developing-with-hardhat.md) to go with it.

### Hardhat with Truffle

When used together, Hardhat and Truffle can provide a powerful and flexible development environment for Solidity smart contracts. For example, you can use Hardhat to compile and deploy your contracts, and then use Truffle to run automated tests and interact with the contracts.
