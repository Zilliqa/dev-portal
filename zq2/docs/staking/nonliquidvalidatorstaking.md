---
id: staking/validatorstaking
title: Non Liquid Validator Staking
---

## Overview

This guide focuses on the **Non-Liquid Staking** variant, where a validator has already been activated (with 10 million ZIL delegated and producing blocks). The following steps outline the staking pool creation and delegation process.
For more information on the liquid variant or any other detailed information, please refer to [delegated-staking](https://github.com/Zilliqa/delegated_staking) repository.

---

## Prerequisites

To deploy and interact with staking contracts via the CLI, use the provided Forge scripts. Follow these steps before proceeding:

1. **Install Foundry**:

   Follow the official [link](https://book.getfoundry.sh/getting-started/installation) for foundry installation.

2. **Install OpenZeppenlin Contracts**:
   ```bash
   forge install OpenZeppelin/openzeppelin-contracts-upgradeable --no-commit
   forge install OpenZeppelin/openzeppelin-contracts --no-commit
   ```
3. **Set the RPC URL**:

   ```bash
   export FOUNDRY_ETH_RPC_URL=http://localhost:4202
   ```

   Alternatively, specify the RPC URL for each command by adding:

   ```bash
   --rpc-url http://localhost:4202
   ```

4. **Set the Private Key**:
   ```bash
   export PRIVATE_KEY=0x...
   ```
   `PRIVATE_KEY` refers to the contract owner's private key.

---

## Step 1: Contract Deployment

Deploy the **NonLiquidDelegation** contract by running:

```bash
forge script script/Deploy.s.sol --broadcast --legacy --sig "nonLiquidDelegation()"
```

Example output:

```
  Signer is 0x15fc323DFE5D5DCfbeEdc25CEcbf57f676634d77
  Proxy deployed: 0x7A0b7e6D24eDe78260c9ddBD98e828B0e11A8EA2
  Implementation deployed: 0x7C623e01c5ce2e313C223ef2aEc1Ae5C6d12D9DD
  Owner is 0x15fc323DFE5D5DCfbeEdc25CEcbf57f676634d77
  Upgraded to version: 0.3.4
```

---

## Step 2: Contract Configuration

Configure the validator’s commission rate (e.g., 10%):

```bash
forge script script/Configure.s.sol --broadcast --legacy --sig "commissionRate(address payable, uint16)" <DELEGATION_CONTRACT_PROXY_ADDRESS> 1000
```

you can find `DELEGATION_CONTRACT_PROXY_ADDRESS` in the output of deployment step 1.

Expected output:

```
  Running version: 0.3.4
  Commission rate: 0.0%
  New commission rate: 10.0%
```

---

## Step 3: Validator Addition

If your node is already activated as a validator (solo staker), it can join a staking pool. Execute the following:

1. **Set the Control Address**:

   ```bash
   cast send --legacy --private-key <0x...> \
   0x00000000005a494c4445504f53495450524f5859 "setControlAddress(bytes,address)" \
   <BLS_PRIVATE_KEY> \
   <DELEGATION_CONTRACT_PROXY_ADDRESS>
   ```

   here `--private-key` refers to the private key previously used to deposit 10 million ZIL into the network.

   Example:

   ```bash
   cast send --legacy --private-key 0x... \
   0x00000000005a494c4445504f53495450524f5859 "setControlAddress(bytes,address)" \
   0x92fbe50544dce63cfdcc88301d7412f0edea024c91ae5d6a04c7cd3819edfc1b9d75d9121080af12e00f054d221f876c \
   0x7A0b7e6D24eDe78260c9ddBD98e828B0e11A8EA2
   ```

2. **Join the Staking Pool**:

   ```bash
   cast send --legacy --private-key $PRIVATE_KEY \
   <DELEGATION_CONTRACT_PROXY_ADDRESS> "join(bytes,address)" \
   <BLS_PRIVATE_KEY> \
   <CONTROL-ADDRESS>
   ```

   Example:

   ```bash
   cast send --legacy --private-key $PRIVATE_KEY \
   0x7a0b7e6d24ede78260c9ddbd98e828b0e11a8ea2 "join(bytes,address)" \
   0x92fbe50544dce63cfdcc88301d7412f0edea024c91ae5d6a04c7cd3819edfc1b9d75d9121080af12e00f054d221f876c \
   0xe0c6f3d59b8cda6ce4fd66418212404a63ad8517
   ```

   `CONTROL_ADDRESS` is generated when depositing 10 million ZIL. For details, refer to the [staking.md](https://github.com/Zilliqa/zq2/blob/main/z2/docs/staking.md#generating-required-values).

---

## Step 4: Delegation Pool Registration

Once the validator has joined the staking pool, share the **delegation proxy address** with the Zilliqa team. The team will add the **SSN (Staking Service Node)** to the Zillion portal, allowing delegators to stake with their preferred SSN.

---

## Summary

By following these steps, you have successfully deployed, configured, and added a validator to a **Non-Liquid Staking Pool**. Delegators can now stake to your SSN and regularly claim their rewards without withdrawing the staked amount.
