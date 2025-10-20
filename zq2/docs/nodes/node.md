## Synchronizing the Node

### Checkpoint 2.0: New `.ckpt` Format

**Key Changes:**
- Checkpoint files now use the `.ckpt` extension, a ZIP64 archive
- Existing `.dat` checkpoint files are NOT compatible with the new format

#### Migrating Checkpoint Files

To migrate existing checkpoint files, use the `z2 convert-ckpt` tool:
```bash
z2 convert-ckpt <old_checkpoint.dat> <new_checkpoint.ckpt>
```

When starting the node, use the new `.ckpt` file:
```bash
chmod +x start_node.sh && \
./start_node.sh -k $PRIVATE_KEY -p <checkpoint_block_num.ckpt>
```

**Note for Operators:** Update your node management scripts to handle the new `.ckpt` file extension and use the conversion tool for existing checkpoints.

### Synchronization Methods

Once a node is successfully launched from a checkpoint for the first time, the checkpoint settings can be removed from its configuration file and the node can be restarted without specifying a checkpoint file on the command line.

> * Synchronization from a checkpoint.

This method leverages a predefined checkpoint block number and hash and the corresponding state imported from a checkpoint file. Historical states based on blocks prior to the checkpoint are unavailable. Before proceeding to the [start the node section](#starting-your-node), configure the checkpoint settings according to the instructions in syncing-from-checkpoints.

> * Synchronization from the genesis.

This method initializes the node from the genesis block, ensuring that the node processes the entire transaction history and computes the corresponding states. This process is time-consuming, as the node must download and validate every block from the genesis block to the latest block height.

Please refer to [Syncing & Pruning](../nodes/passive-pruning.md) for information on how to download or discard historical blocks.