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

(... rest of the existing content remains the same ...)

### [Becoming a Validator](#becoming-a-validator)

Under the consensus mechanism introduced in Zilliqa 2.0, nodes can stake ZIL to secure
the network and promote themselves as validator nodes. In return, they receive a 
share of the block rewards.

Once you have sufficient $ZILs you can register your node as validator.

Below is a guide on how to register a validator node for Zilliqa 2.0:

<https://github.com/Zilliqa/zq2/blob/main/z2/docs/staking.md>

**Validator Jailing Mechanism**

In Zilliqa 2.0, a new jailing mechanism has been introduced to promote validator liveness and network reliability. Validators who consistently miss block proposals may be temporarily 'jailed', which means:
- They are excluded from proposing new blocks
- They can still participate in validation and voting
- They continue to earn cosigner rewards

The jailing is triggered if a validator misses multiple blocks within a specific time window. Validators should monitor their performance using the `admin_missedViews` RPC method and ensure consistent block proposal to avoid potential jailing.

For detailed configuration and monitoring instructions, refer to the [Nodes documentation](../nodes.md).

### [Upgrading your node](#upgrading-your-node)

(... rest of the existing content remains the same ...)