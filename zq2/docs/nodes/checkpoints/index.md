---
id: nodes/checkpoint
title: Checkpoint
---

# [Checkpoints in Nodes](#checkpoints-in-nodes)

Checkpoints in nodes serve as specific reference points within the blockchain, allowing nodes to synchronize more efficiently when joining or rejoining the network. Instead of processing the entire blockchain from the genesis block, nodes can start from a known, validated state. Below is a detailed guide on how to set up checkpoints.

You can find a list of checkpoints and hashes to download in the menu bar.

## [Syncing a Node from a Checkpoint](#syncing-a-node-from-a-checkpoint)

Before proceeding, ensure you have completed the [Node Setup](../nodes/node.md#setting-up-your-node) section.

For **mainnet**, you will need the `zq2-mainnet.toml` configuration file and the `start_node.sh` script, both generated during the setup process. Similarly, for **testnet** and **devnet**, you will use the `zq2-testnet.toml` and `zq2-devnet.toml` configuration file.

The following steps apply to both networks.

### Step-by-Step Guide to Configure Checkpoints

1. **Ensure Proper Directory**
   Navigate to the directory you created during the setup process, e.g., `/my/dir/zq2`.

2. **Download the Checkpoint File**

   Follow these steps to download the latest checkpoint file for your chosen network:

   - **Devnet**
     Visit the public [checkpoint URL](https://checkpoints.zq2-devnet.zilliqa.com).

   - **Testnet**:
   Visit the public [checkpoint URL](https://checkpoints.testnet.zilliqa.com).

   - **Mainnet**:
   Visit the public [checkpoint URL](https://checkpoints.zilliqa.com).

   From the XML file at the respective URL:

   - Look for the `<key>` tag, which contains the checkpoint file's name. The file follows the `block_num.dat` format (e.g., `000291600.dat`).

   - Copy the file name of the latest checkpoint from the topmost `<key>` tag. For older checkpoints, explore the `previous/` directory.

   - Download the checkpoint file using the `wget` command or paste the link in your browser:

   ```bash
   wget https://checkpoints.zq2-<network>.zilliqa.com/<block_num.dat>
   ```

   Replace <network> with `mainnet`, `testnet` or `devnet` based on your selected network.

   _NOTE: Checkpoints are generated every 86400 blocks. The earliest checkpoint for the mainnet and testnet was generated at the switchover from Zilliqa 1. If the node does not need historical state it is recommended to use the latest checkpoint file to speed up synchronization. Keep in mind that the node can’t process RPC requests such as eth_getBalance on blocks that were produced before the checkpoint._

3. **Configure Checkpoints in the Configuration File**
   Open the respective configuration file (`zq2-mainnet.toml` or `zq2-testnet.toml`) and add the following lines to enable checkpoint settings:
   ```toml
   [nodes.load_checkpoint]
   file = "xxxxx..." # File name of the checkpoint block. for eg: 3000.dat
   hash = "xxxxx..." # Block hash corresponding to the file block (Remove '0x' prefix from hash if present)
   ```

    `file` : This parameter specifies the name of the checkpoint or block number file, which
    can be obtained from the public GCS bucket. It’s recommended to download the latest checkpoint
    file from this source.

    `hash` : The hash is used to verify the validity of the state data and ensure that no
    tampering has occurred. You can obtain the block hash corresponding to the checkpoint height from the
    public explorer of your chosen network. For example, if the downloaded
    checkpoint file is 3000, you can use the `eth_getBlockByNumber` API to query the block hash:

    ```bash
    curl --request POST --url https://api.zq2-mainnet.zilliqa.com/ \
    --header 'Content-Type: application/json' \
    --data '{"method":"eth_getBlockByNumber","params":["0xBB8",false],"id":1,"jsonrpc":"2.0"}' \
    | grep -o '"hash":"[^"]*"' | awk -F':' '{print $2}' | tr -d '"'
    ```
  Alternatively, you can retrieve the block hash directly from the public explorer of your chosen network by searching for the block number.
  Refer to [block explorers](../endpoints.md#block-explorer) section for public explorer.
  By this stage, your checkpoints settings should be specified in the configuration file.

4. **Launch the node**  
Now the node is ready to launch. Follow the instructions in the [Start the Node](../nodes/node.md#starting-your-node) section to start your node.

**Note**: After starting a node from a checkpoint for the first time it typically takes approximately 1.5 hours to start syncing. During this time the node won’t respond to RPC requests. Please allow sufficient time for the process to complete.
