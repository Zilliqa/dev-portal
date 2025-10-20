---
id: node
title: Node
keywords:
  - running
  - node
description: Zilliqa 2.0 Node instructions
---

<!-- markdownlint-disable MD025 -->

# Running a Zilliqa 2.0 node

TBD

## RPC Query Configuration

Zilliqa nodes now categorize RPC handlers as 'Fast' or 'Slow':

- 'Fast' queries are processed on standard threads
- 'Slow' queries (e.g., `admin_getLeaders`, `eth_getBlockTransactions`, `ots_getContractCreator`, `txpool_content`, `trace_block`) are processed on dedicated blocking threads

Node operators can configure the number of threads for 'Slow' RPC queries using the `slow_rpc_queries_handlers_count` configuration option. The default value is 1.
