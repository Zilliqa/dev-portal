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
2. Docker: 27.0.3+

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

To configure a node and join a Zilliqa 2.0 network, we provide the `z2` utility as part of the [zq2](https://github.com/Zilliqa/zq2/blob/main/) code
base. Follow the step by step guide to setup your node:

1. Cargo and Rust: You need to have Cargo and Rust installed on your system.
  You can install them using [rustup](https://rustup.rs/). Once rustup is installed,
  you can update Rust to the latest stable version.
2. Install the following requirements:
  ```bash
  sudo add-apt-repository ppa:ethereum/ethereum && sudo apt update && \
  sudo apt install -y solc build-essential pkg-config libssl-dev cmake \
  protobuf-compiler
  ```
3. Pick a directory. You'll need quite a lot of space. Let's call it `/my/dir`.
4. Clone [zq2](https://github.com/zilliqa/zq2) sourcecode into that directory to get `/my/dir/zq2`.

5. Build the code using `cargo build`.
6. Source the setenv file:
  ```bash
  source /my/dir/zq2/scripts/setenv
  ```
  This will give you access to the `z2` tool (in `zq2/z2`).
7. Generate the startup script and the configuration file for your node by running:
  ```bash
  z2 join --chain zq2-mainnet
  ```
  _NOTE: You can replace zq2-mainnet with `zq2-testnet` or `zq2-devnet` depending on
  which network you want your node to join._

8. (Optional) A Zilliqa node contains various performance and operational metrics compatible with the OpenTelemetry 
  protocol specification. If you want to export these metrics you can define a [collector](https://opentelemetry.io/docs/collector/) 
  endpoint with the `--otlp-endpoint` parameter in `z2 join` pointing to your own OpenTelemetry monitoring stack, for example:
  ```bash
  z2 join --chain  zq2-mainnet --otlp-endpoint=http://localhost:4317
  ```
  _NOTE: For more details on testing and using the available OpenTelemetry 
  metrics refer to the [OpenTelemetry](monitoring/opentelemetry.md) page._

9. Generate the node private key.
  ```bash
  openssl rand -hex 32 > node-private-key.txt
  export PRIVATE_KEY=$(cat node-private-key.txt)
  ```
  _NOTE: Please save the node key as described above. You may need it
  in the future to restart the node to generate the BLS public
  key of the node._

10. Now it's time to synchronize the node with the network. For networks created using Zilliqa 2, the node can be synchronized from the genesis. However, for networks such as mainnet and testnet that migrated from Zilliqa 1, the node must be synchronized from a checkpoint:

  >* Synchronization from a checkpoint.

  This method leverages a predefined checkpoint block number and hash and the corresponding state imported from a checkpoint file. Historical states based on blocks prior to the checkpoint are unavailable. Before proceeding to the [start the node section](../nodes/node/#starting-your-node), configure the checkpoint settings according to the instructions in syncing-from-checkpoints.

  >* Synchronization from the genesis.

  This method initializes the node from the genesis block, ensuring that the node processes the entire transaction history and computes the corresponding states. This process is time-consuming, as the node must download and validate every block from the genesis block to the latest block height.

Please refer to [Syncing & Pruning](../nodes/passive-pruning.md) for information on how to download or discard historical blocks.

### [Starting your node](#starting-your-node)
Since only devnet nodes can sync from the genesis, all other nodes must be started from a checkpoint: 

* <b>start the node from a checkpoint:</br></b>
  ```bash
  chmod +x start_node.sh && \
  ./start_node.sh -k $PRIVATE_KEY -p <checkpoint_block_num.dat>
  ```

* <b>start the node from the genesis:</br></b>
  ```bash
  chmod +x start_node.sh && \
  ./start_node.sh -k $PRIVATE_KEY
  ```
_NOTE: After a node is successfully launched from a checkpoint for the first time, the checkpoint settings can be removed from its configuration file and the node can be restarted without specifying a checkpoint file on the command line._

_NOTE: The `<checkpoint_block_num.dat>` file is the one you previously downloaded. Refer to [syncing-from-checkpoint](../nodes/checkpoints/index.md#syncing-a-node-from-a-checkpoint)_

Great! The node should now be syncing with the network. It may
take up to 1-2 hours for the node to fully synchronize. You can check the progress
of the node by running the following command, which should return the latest
block height after syncing.
```bash
curl --request POST \
  --url http://localhost:4201/ \
  --header 'Content-Type: application/json' \
  --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}'
```

If you started your node from a checkpoint and it does not respond to
the above request, then it is still processing the checkpoint file
and has not started synchronizing yet.

For additional details on `z2` and the `join` capability refer to:

- <https://github.com/Zilliqa/zq2/blob/main/z2/docs/README.md>
- <https://github.com/Zilliqa/zq2/blob/main/z2/docs/join.md>

### [Becoming a Validator](#becoming-a-validator)

Under the consensus mechanism introduced in Zilliqa 2.0, nodes can stake ZIL to secure
the network and promote themselves as validator nodes. In return, they receive a 
share of the block rewards.

Once you have sufficient $ZILs you can register your node as validator.

Below is a guide on how to register a validator node for Zilliqa 2.0:

<https://github.com/Zilliqa/zq2/blob/main/z2/docs/staking.md>

### [Upgrading your node](#upgrading-your-node)

You should try to keep your node version up-to-date with the latest released version of Zilliqa 2.0.
You can stay informed of new releases via the [repository release page](https://github.com/Zilliqa/zq2/releases).

Sometimes a hard fork will be needed when the execution semantics of blocks or transactions have changed.
It is important to upgrade your node's version before the block height at which these hard forks are activated.
Not doing so may lead to your node going out of sync and losing rewards if it is a validator.

First, pull the `main` branch and update your `start_node.sh` script and configuration file by re-running `z2 join`:

```bash
z2 join --chain zq2-mainnet
```
_NOTE: Replace `zq2-mainnet` with the chain you are running on._

To minimise the downtime of your node, we recommend pulling the new image locally before you stop your old node:

```bash
docker pull asia-docker.pkg.dev/prj-p-devops-services-tvwmrf63/zilliqa-public/zq2:${ZQ_VERSION} # You can copy the new ZQ_VERSION from inside `start_node.sh`
```

Stop your existing node:

```bash
docker container ls # Identify the container ID of the existing node. This will look a 12 character hex-string (e.g. af6010f3f9ae).
docker stop <container id>
```

Start your new node:

```bash
./start_node.sh -k $PRIVATE_KEY
```

You can validate the version your node is running by calling the `GetVersion` API method:

```bash
curl --request POST --url http://localhost:4202 --header 'content-type: application/json' --data '{"method":"GetVersion","id":1,"jsonrpc":"2.0"}'
```
