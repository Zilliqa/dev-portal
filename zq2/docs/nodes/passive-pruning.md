---
id: nodes/passive-pruning
title: Node Pruning and Passive Sync
---

# [Node Pruning and Passive Sync](#node-prune-passive-sync)

## Overview

This document explains how pruning and passive sync mechanisms work in Zilliqa 2.0 nodes. These features are controlled by two mutually exclusive configuration parameters and help nodes manage database size and block retention based on their roles (e.g., validator vs. archive node).

---

## Configuration Parameters

Zilliqa nodes support two **mutually exclusive** configuration parameters:

### `node.sync.prune_interval`

- **Purpose:** Retains only the most recent `N` blocks in the database.
- **Effect:** Deletes blocks below `TIP - N`.
- **Restriction:** `N` must be **greater than 300**.
- **Use case:** Ideal for **validator nodes** that only need recent block data for performance.
- **Note:** Pruning only starts **after** more than `N` blocks are present. No backward sync is performed to reach count `N`.

### `node.sync.base_height`

- **Purpose:** Ensures the lowest block retained is at height `N`.
- **Effect:** Deletes blocks **below** height `N` and **passively syncs** blocks from `TIP` backwards to `N`.
- **Restriction:** `N` must be **less than TIP**.
- **Use case:** Ideal for **archive nodes** to store historical data from `TIP` to `N`.
- **Note:** If `N > lowest_block`, the node prunes until `N`.

> **⚠️ Only one of these values can be set at a time. Setting both is invalid.**  
> Leaving both unset will disable pruning and passive sync.

---

## Example Usage

### ✅ Step 1: Bootstrap from Checkpoint

Start the node from a known checkpoint. It will active-sync to the current chain tip.

### ✅ Step 2a: Pruning Mode (Validator Node)

Set the following in the node config:

```toml
node.sync.prune_interval = 10000
```

* Node retains only the latest **10,000** blocks.
* No older block syncing occurs.
* Pruning starts once more than 10,000 blocks exist in the DB.

### ✅ Step 2b: Passive Sync Mode (Archive Node)

Set the following in the config:

```toml
node.sync.base_height = 0
```

* Node begins **passive syncing backwards** toward block `0`.
* Deletes any blocks below the configured height if present.
* Suitable for retaining full history from checkpoint to genesis.

---

## Performance Notes

* Pruning is done **gradually in the background**.
* On a GCP node:

  * **Pruning rate:** \~300–400 **empty** blocks/sec.
  * Rate drops significantly when pruning blocks with **many transactions**, possibly below 1 block/sec.
* **Disk space is not immediately freed** due to SQLite behavior:

  * SQLite does **not shrink** DB file unless `VACUUM` is used.
  * Freed space is reused for future inserts.
  * This behavior may change when migrating to `redb` in the future.

---

## Summary Table

| Config                       | Purpose                  | Passive Sync | Prune Old Blocks | Use Case       |
| ---------------------------- | ------------------------ | ------------ | ---------------- | -------------- |
| `node.sync.prune_interval`   | Retain latest `N` blocks | ❌            | ✅                | Validator Node |
| `node.sync.base_height`      | Retain from `N` to TIP   | ✅            | ✅                | Archive Node   |

---

## Notes

* Always let the node reach chain tip before enabling pruning or passive sync.
* These operations are **non-blocking** and run in the background.
* Use with care to avoid unintentional data loss or sync delays.