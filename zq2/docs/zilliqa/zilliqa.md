---
id: zilliqa
title: The Zilliqa blockchain
---

<!-- markdownlint-disable MD013 MD025 -->

# The Zilliqa 2.0 blockchain native API

The native API for Zilliqa 2.0 exposes a JSON RPC (and Websocket) interface to a fast, instant finality blockchain using Scilla as its smart contract language.

Documentation is available in the [versions](.../versions/index.md) tab.

## RPC Handler Configuration

Zilliqa 2.0 introduces a new RPC handler categorization to improve performance and responsiveness:

### Handler Types
- `HandlerType::Fast`: Quick, non-blocking RPC methods
- `HandlerType::Slow`: Methods that may require more processing time

### Configuration
A new global configuration option `slow_rpc_queries_handlers_count` has been introduced:
- **Default**: 1 dedicated blocking thread
- **Purpose**: Control the number of threads processing slow RPC queries

### Method-Specific Behavior Changes

#### Ethereum-Compatible Methods
- `eth_getBlockByNumber`:
  - Enforces a limit on transaction data retrieval
  - Returns an error if a block contains more than 50 transactions
  - Recommendation: Implement pagination for large data sets

- `eth_getLogs`:
  - Limits queries to a range of 50 blocks
  - Clients should use pagination for extensive log retrieval

- `eth_getTransactionReceipt` and `eth_getTransactionByHash`:
  - Improved retrieval logic
  - First queries the database
  - Falls back to transaction pool for pending transactions

#### Zilliqa-Specific Methods
- `zilliqa_GetTransactionsForTxBlock`:
  - Now returns an error (`TxBlock has no transactions`) instead of an empty array when no transactions exist in the specified block

### Recommendations for Developers
- Use pagination for large data retrievals
- Be prepared to handle new error scenarios
- Check your RPC client's compatibility with these changes