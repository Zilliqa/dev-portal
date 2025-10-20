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

[... rest of the existing content ...]

### State Storage and Database Configuration

#### State Trie Storage Architecture

Zilliqa 2.0 introduces a hierarchical state trie storage architecture:

1. **L1 (Cache):** Volatile in-memory LRU cache
2. **L2 (Primary Storage):** RocksDB database - the new primary on-disk storage for the state trie
3. **L3 (Fallback):** SQLite database - serves as a fallback for states not yet migrated to RocksDB

#### State Migration Options

- **Lazy Migration:** Automatic fetching of states from SQLite to RocksDB when not found
- **Eager Migration:** Proactively migrate entire state using `db.state_sync = true`

#### Configuration Options

- `db.state_sync`: Enable eager state migration (default: `false`)
- `db.rocksdb_cache_size`: Control RocksDB block cache size in bytes (default: `256 * 1024 * 1024` or 256 MB)

#### Checkpoint Migration

- New `.ckpt` checkpoint file format (ZIP64 archive)
- Use `z2 convert-ckpt` to convert old `.dat` checkpoints

**Note for Operators:** After successful migration, consider renaming or dropping the SQLite `state_trie` table to free disk space.

[... rest of the existing content ...]