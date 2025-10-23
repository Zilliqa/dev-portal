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

We are running our Zilliqa 2.0 Nodes on Google Cloud Platform, GCP
GCE VM `e2-highcpu-8c` instance with 256 GB SSD (`pd-ssd`).

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

To configure a node and join a Zilliqa 2.0 network, we provide the `z2` utility as part of
the [zq2](https://github.com/Zilliqa/zq2/blob/main/) code
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
4. Clone [zq2](https://github.com/Zilliqa/zq2) sourcecode into that directory to get
   `/my/dir/zq2`.

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
   _NOTE: You can replace `zq2-mainnet` with `zq2-testnet` or `zq2-devnet` depending on
   which network you want your node to join._
8. (Optional) A Zilliqa node contains various performance and operational
   metrics compatible with the OpenTelemetry
   protocol specification. If you want to export these metrics you can define a [collector](https://opentelemetry.io/docs/collector/)
   endpoint with the `--otlp-endpoint` parameter in `z2 join` pointing to your own OpenTelemetry
   monitoring stack, for example:
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

10. Now it's time to synchronize the node with the network. For networks created using Zilliqa
    2, the node can be synchronized from the genesis. However, for networks such as mainnet and testnet that migrated from Zilliqa 1, the node must be synchronized from a checkpoint:

    > **Synchronization from a checkpoint.**

    This method leverages a predefined checkpoint block number and hash and the corresponding state imported from a checkpoint file. Historical states based on blocks prior to the checkpoint are unavailable. Before proceeding to the [start the node section](../nodes/node/#starting-your-node), configure the checkpoint settings according to the instructions in syncing-from-checkpoints.

    > **Synchronization from the genesis.**

    This method initializes the node from the genesis block, ensuring that the node processes the entire transaction history and computes the corresponding states. This process is time-consuming, as the node must download and validate every block from the genesis block to the latest block height.

Please refer to [Syncing & Pruning](../nodes/passive-pruning.md) for information on how to download or discard historical blocks.

### State Trie Migration to RocksDB

The state trie backend has been migrated from SQLite to RocksDB for improved performance and scalability. This is a breaking change that requires a migration process for all existing nodes.

While a lazy, on-the-fly migration occurs in the background, a full, faster migration using the "state-sync" feature is strongly recommended.

**Migration Steps for Node Operators:**

1.  **Stop the node.**
2.  **Restore the node from a previous checkpoint.** It is crucial to use the same checkpoint that was originally used to initialize the node.
3.  **Add `db.state_sync = true` to the `zilliqa.toml` configuration file.**
4.  **Restart the node.** The node will begin replaying blocks from the checkpoint to populate the new RocksDB state database in the background while continuing to sync with the network.

You can monitor the migration status via the `admin_syncing` RPC endpoint. For more detailed instructions, refer to the `docs/state_migration.md` guide in the Zilliqa 2.0 repository.

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

To minimize the downtime of your node, we recommend pulling the new image locally before you stop your old node:

```bash
docker pull asia-docker.pkg.dev/prj-p-devops-twtwmrf63e/zilliqa-public/zq2:${ZQ_VERSION} # You can copy the new ZQ_VERSION from inside `start_node.sh`
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
_NOTE: If your `start_node.sh` script uses `docker run`, ensure that the `docker run` command includes the following capabilities: `--cap-add=SYS_PTRACE --cap-add=PERFMON --cap-add=BPF --cap-add=SYS_ADMIN`. Operators using Docker, systemd service files with Docker, or container orchestration systems should update their service definitions and startup scripts accordingly._

You can validate the version your node is running by calling the `GetVersion` API method:

```bash
curl --request POST \
  --url http://localhost:4202 \
  --header 'content-type: application/json' \
  --data '{"method":"GetVersion","id":1,"jsonrpc":"2.0"}'
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

### Node Configuration

The `zilliqa.toml` file contains several new keys for advanced node configuration:

- **`db.state_sync`**: Set to `true` to enable the state migration/sync process. This is required for migrating an existing node's state to RocksDB.
- **`db.rocksdb_cache_size`**: Configures the block cache size for RocksDB to manage memory usage. The default value is 256MB. You can specify the size in bytes.
- **`max_missed_view_age`**: Defines the retention period for missed-view history, which is used by the jailing mechanism. For archive and API nodes, it is recommended to set this to a very large value (e.g., `1000000000000`) to ensure the full history is maintained.
- **`slow_rpc_queries_handlers_count`**: Specifies the number of dedicated threads for handling slow RPC queries. This prevents slow queries from blocking other, faster API calls.
