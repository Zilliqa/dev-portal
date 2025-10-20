---
id: nodes/checkpoint
title: Checkpoint
---

# [Checkpoints in Nodes](#checkpoints-in-nodes)

Checkpoints in nodes serve as specific reference points within the blockchain, allowing nodes to synchronize more efficiently when joining or rejoining the network. Instead of processing the entire blockchain from the genesis block, nodes can start from a known, validated state. Below is a detailed guide on how to set up checkpoints.

You can find a list of checkpoints and hashes to download in the menu bar.

## Checkpoint Format and Migration

### Checkpoint Format (Checkpoint 2.0)
- New checkpoint file format uses `.ckpt` extension (replacing `.dat`)
- Utilizes ZIP64 with ZSTD compression
- Includes `history.bincode` to store missed view history
- Compatible with the jailing feature

### Checkpoint Migration and Tools
- New CLI tools available:
  - `convert-ckpt`: Convert existing `.dat` checkpoints to new `.ckpt` format
  - `inspect-ckpt`: Inspect and validate checkpoint files

### Checkpoint Configuration
- All nodes can now start from a checkpoint, not just new nodes
- `max_missed_view_age` for checkpoint nodes set to 1000000000000 by default
- Ensures full missed view history retention

### Migration Steps
1. Convert existing `.dat` checkpoints using `convert-ckpt` tool
2. Update node configuration to use new `.ckpt` files
3. Verify checkpoint integrity with `inspect-ckpt`

**Note**: Existing checkpoints are not directly compatible with the new format. Manual conversion is required.

## Syncing a Node from a Checkpoint (Updated for Checkpoint 2.0)

Before proceeding, ensure you have completed the [Node Setup](../nodes/node.md#setting-up-your-node) section.

For **mainnet**, you will need the `zq2-mainnet.toml` configuration file and the `start_node.sh` script, both generated during the setup process. Similarly, for **testnet** and **devnet**, you will use the `zq2-testnet.toml` and `zq2-devnet.toml` configuration file.

The following steps apply to both networks.

### Step-by-Step Guide to Configure Checkpoints

1. **Ensure Proper Directory**
   Navigate to the directory you created during the setup process, e.g., `/my/dir/zq2`.

2. **Download the Checkpoint File**

   Follow these steps to download the latest checkpoint file for your chosen network. The new checkpoint files use the `.ckpt` extension.

   - **Devnet**:
     Visit the public [checkpoint URL](https://checkpoints.zq2-devnet.zilliqa.com).

   - **Testnet**:
     Visit the public [checkpoint URL](https://checkpoints.testnet.zilliqa.com).

   - **Mainnet**:
     Visit the public [checkpoint URL](https://checkpoints.zilliqa.com).

   From the XML file at the respective URL:

   - Look for the `<key>` tag, which contains the checkpoint file's name. The file follows the `block_num.ckpt` format (e.g., `000291600.ckpt`).

   - Copy the file name of the latest checkpoint from the topmost `<key>` tag. For older checkpoints, explore the `previous/` directory.

   - Download the checkpoint file using the `wget` command or paste the link in your browser:

     ```bash
     wget https://checkpoints.zq2-<network>.zilliqa.com/<block_num.ckpt>
     ```

     Replace <network> with `mainnet`, `testnet` or `devnet` based on your selected network.

   _NOTE: Checkpoints are generated every 86400 blocks. The earliest checkpoint for the mainnet and testnet was generated at the switchover from Zilliqa 1. If the node does not need historical state it is recommended to use the latest checkpoint file to speed up synchronization. Keep in mind that the node can’t process RPC requests such as eth_getBalance on blocks that were produced before the checkpoint._

3. **Configure Checkpoints in the Configuration File**
   Open the respective configuration file (`zq2-mainnet.toml` or `zq2-testnet.toml`) and add the following lines to enable checkpoint settings. Note the new `path` parameter for the `.ckpt` file.
   ```toml
   [nodes.load_checkpoint]
   path = "path/to/your/checkpoint.ckpt" # Full path to the .ckpt file
   hash = "xxxxxx..." # Block hash corresponding to the checkpoint block (Remove '0x' prefix from hash if present)
   ```

   `path` : This parameter specifies the full path to the downloaded `.ckpt` file.

   `hash` : The hash is used to verify the validity of the state data and ensure that no
   tampering has occurred. You can obtain the block hash corresponding to the checkpoint height from the
   public explorer of your chosen network. For example, if the downloaded
   checkpoint file is `3000.ckpt`, you can use the `eth_getBlockByNumber` API to query the block hash:

   ```bash
   curl --request POST --url https://api.zq2-mainnet.zilliqa.com/ \
   --header 'Content-Type: application/json' \
   --data '{"method":"eth_getBlockByNumber","params":["0xBB8",false],"id":1,"jsonrpc":"2.0"}' \
   | grep -o '"hash":"[^"]*"' | awk -F':' '{print $2}' | tr -d '"'
   ```

   Alternatively, you can retrieve the block hash directly from the public explorer of your chosen network by searching for the block number.
   Refer to [block explorers](../endpoints.md#block-explorer) section for public explorer.
   By this stage, your checkpoints settings should be specified in the configuration file.

4. **Verify Checkpoint Integrity (Optional but Recommended)**
   Use the `inspect-ckpt` CLI tool to verify the integrity of your downloaded `.ckpt` file:
   ```bash
   ./path/to/zq2/bin/inspect-ckpt --path path/to/your/checkpoint.ckpt
   ```
   This tool will help ensure the checkpoint file is not corrupted.

5. **Launch the Node**
   Now the node is ready to launch. Follow the instructions in the [Start the Node](../nodes/node.md#starting-your-node) section to start your node.

**Note**: After starting a node from a checkpoint for the first time it typically takes approximately 1.5 hours to start syncing. During this time the node won’t respond to RPC requests. Please allow sufficient time for the process to complete.
