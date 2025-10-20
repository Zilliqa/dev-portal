---
id: nodes/nodes
title: Node setup 
---

# Node setup

Users can set up a node and join the Zilliqa 2.0 mainnet, testnet or devnet by following the instructions below

## Prerequisites

### [Minimum hardware requirements](#minimum-hardware-requirements)

- **CPU**:
    - 2 Core / 4 threads or more
- **RAM**:
    - 8 GB or more
- **Disk**:
    - 200 GB or more

We are running our Zilliqa 2.0 Nodes on Google Cloud Platform, GCP,
GCE VM `e2-highcpu-8` instance with 256 GB SSD (`pd-ssd`).

### [Software requirements](#software-requirements)

1. Operating System: We build and run on Ubuntu 22.04 LTS or above
2. Docker: 27.0.3

### [Port-forwarding](#port-forwarding)

The following TCP ports need to be open to the internet for both inbound and
outbound.

_NOTE: We don't recommend to run Nodes behind a NAT, if you're doing so
and you are facing any traversal issue you might have to debug on your own._

#### Required

3333/TCP - P2P protocol port: has to be opened on inbound and outbound to
public internet.

#### Optional

4201/TCP - JSONRPC over HTTP: API port, only necessary if you want your API to
be accessible via the internet.

## Installation

### [Setting up your node](#setting-up-your-node)

To configure a node and join a Zilliqa 2.0 network, we provide the `z2` utility as part of the [zq2](https://github.com/Zilliqa/zq2/blob/main/z2/) code
base. Follow the step by step guide to setup your node:

[... rest of the existing content ...]

### Node Performance and Reliability

#### Recent Architectural Improvements

Zilliqa 2.0 has implemented several internal architectural enhancements to improve node performance and reliability:

- **Concurrent State Management**: 
  - Switched from `Arc<Mutex<...>>` to `Arc<RwLock<...>>` for account state management, allowing multiple concurrent readers
  - Implemented `ArcSwap<Vec<PeerId>>` for thread-safe peer list updates

- **Enhanced Error Handling**:
  - Custom RPC panic hook to capture and convert panics into structured error responses
  - Improved debugging capabilities through detailed error information

- **Request Handling**:
  - Randomized request ID generation for improved distributed tracing
  - Centralized and optimized transaction retrieval logic

_These improvements enhance the node's ability to handle concurrent operations, provide better error insights, and maintain system stability._

[... rest of the existing content ...]