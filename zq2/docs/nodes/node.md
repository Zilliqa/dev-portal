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

[... rest of the existing content ...]

10. Now it's time to synchronize the node with the network. For networks created using Zilliqa 2, the node can be synchronized from the genesis. However, for networks such as mainnet and testnet that migrated from Zilliqa 1, the node must be synchronized from a checkpoint:

  >* Synchronization from a checkpoint.

  This method leverages a predefined checkpoint block number and hash and the corresponding state imported from a checkpoint file. Historical states based on blocks prior to the checkpoint are unavailable. Before proceeding to the [start the node section](../nodes/node/#starting-your-node), configure the checkpoint settings according to the instructions in syncing-from-checkpoints.

  > **Note on Block Synchronization Robustness**
  >
  > The node's block synchronization mechanism has been enhanced to handle scenarios where blocks might arrive out of order or multiple times. This improvement ensures more graceful handling of block insertions during network synchronization, reducing the likelihood of synchronization interruptions.

  >* Synchronization from the genesis.

  This method initializes the node from the genesis block, ensuring that the node processes the entire transaction history and computes the corresponding states. This process is time-consuming, as the node must download and validate every block from the genesis block to the latest block height.

[... rest of the existing content ...]