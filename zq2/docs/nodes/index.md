---
id: nodes/overview 
title: Overview of Nodes & Validators
---

# Zilliqa nodes and validator documentation
This section serves as a comprehensive guide to Zilliqa nodes and explains the process of becoming a validator in the Zilliqa Proof of Stake network.

The documentation provides a step-by-step guide to setting up a node in a ZQ2 network and adding it as a validator. While mainnet is used as the reference network throughout this guide, the node setup instructions are equally applicable to the testnet and devnet.

For more details, please refer to the [Networks section](../endpoints.md#networks).

## Node Architecture Enhancements

Recent updates to the Zilliqa 2.0 node implementation include significant internal refactoring to improve:

- **Concurrency**: Enhanced thread-safety in critical data structures like account state and peer management
- **Error Handling**: Improved RPC error reporting with detailed panic information
- **Performance**: Optimized data access and request handling mechanisms

These architectural improvements aim to enhance the stability, reliability, and performance of Zilliqa nodes, providing a more robust infrastructure for blockchain operations.

For more details, please refer to the [Node Setup](node.md) documentation.