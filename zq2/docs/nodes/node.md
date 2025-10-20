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

1. Operating System: We build and run on Ubuntu 22.04LTS or above
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

To configure a node and join a Zilliqa 2.0 network, we provide the `z2` utility as part of the [zq2](https://github.com/Zilliqa/zq2/blob/main/*)
code base. Follow the step by step guide to setup your node:

[... rest of the file content remains the same ...]

### [Synchronization](#synchronization)

10. Now it's time to synchronize the node with the network. For networks created using Zilliqa 2, the node can be synchronized from the genesis. However, for networks such as mainnet and testnet that migrated from Zilliqa 1, the node must be synchronized from a checkpoint:

    >* Synchronization from a checkpoint.

    This method leverages a predefined checkpoint block number and hash and the corresponding state imported from a checkpoint file. Historical states based on blocks prior to the checkpoint are unavailable. Before proceeding to the [start the node section](../nodes/node/#starting-your-node), configure the checkpoint settings according to the instructions in syncing-from-checkpoints.

    **Node Synchronization Improvements**

    Zilliqa 2.0 now includes enhanced block synchronization mechanisms that prevent potential node halting during block insertion. If multiple block insertion attempts occur, the node will now silently handle duplicate block entries, ensuring more stable and resilient node synchronization. This improvement helps prevent 'stuck-node' scenarios, particularly during network recovery, resynchronization, or when blocks might be presented multiple times.

    >* Synchronization from the genesis.

    This method initializes the node from the genesis block, ensuring that the node processes the entire transaction history and computes the corresponding states. This process is time-consuming, as the node must download and validate every block from the genesis block to the latest block height.

[... rest of the file content remains the same ...]