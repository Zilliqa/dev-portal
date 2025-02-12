---
id: staking/delegatedstaking
title: Delegated Staking
---

## Overview

The following steps outline the creation of a staking pool for an already deposited validator node.

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
4. **Set the Private Key**:
   ```bash
   export PRIVATE_KEY=0x...
   ```
   `PRIVATE_KEY` refers to the contract owner's private key.

---


## Step 1: Contract Deployment
Choose one of the variant Liquid/Non-Liquid staking contract to deploy:

### Deploying **LiquidDelegation** Contract
Deploy the **LiquidDelegation** contract using:


```bash
forge script script/Deploy.s.sol --broadcast --legacy --sig "liquidDelegation(string,string)" Name Symbol
```
where `Name` and `Symbol` represent your Liquid Staking Token (LST).


Example output:

```
  Signer is 0x15fc323DFE5D5DCfbeEdc25CEcbf57f676634d77
  Proxy deployed: 0x7A0b7e6D24eDe78260c9ddBD98e828B0e11A8EA2
  Implementation deployed: 0x7C623e01c5ce2e313C223ef2aEc1Ae5C6d12D9DD
  Owner is 0x15fc323DFE5D5DCfbeEdc25CEcbf57f676634d77
  Upgraded to version: 1.3.4
```

 
### Deploying **Non-LiquidDelegation** Contract
Alternatively, deploy the NonLiquidDelegation contract using:

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

You can find `DELEGATION_CONTRACT_PROXY_ADDRESS` in the output of deployment step 1.

Expected output:

```
  Running version: 0.3.4
  Commission rate: 0.0%
  New commission rate: 10.0%
```

---

## Step 3: Validator Addition

Before your validator node can join the staking pool, you have to execute the following steps:

1. **Set the Control Address**:
   ```bash
   cast send --legacy --private-key <0x...> \
   0x00000000005a494c4445504f53495450524f5859 "setControlAddress(bytes,address)" \
   <BLS_PUBLIC_KEY> \
   <DELEGATION_CONTRACT_PROXY_ADDRESS>
   ```
   here `--private-key` refers to the private key previously used to deposit stake for the validator node.
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
   <BLS_PUBLIC_KEY> \
   <CONTROL_ADDRESS>
   ```
   Example:
   ```bash
   cast send --legacy --private-key $PRIVATE_KEY \
   0x7a0b7e6d24ede78260c9ddbd98e828b0e11a8ea2 "join(bytes,address)" \
   0x92fbe50544dce63cfdcc88301d7412f0edea024c91ae5d6a04c7cd3819edfc1b9d75d9121080af12e00f054d221f876c \
   0xe0c6f3d59b8cda6ce4fd66418212404a63ad8517
   ```
   `CONTROL_ADDRESS` is generated when depositing 10 million ZIL. 
   For details, refer to the [staking.md](https://github.com/Zilliqa/zq2/blob/main/z2/docs/staking.md#generating-required-values).

---

## Step 4: Staking Pool Registration

 Once the validator has joined the staking pool, share the 
 **<DELEGATION_CONTRAT_PROXY_ADDRESS>** with the Zilliqa team to allow users
 to delegate ZIL to the staking pool on the new staking portal.

---

## Summary

By following these steps, you have successfully deployed, configured, and 
added a validator to a **Non-Liquid Staking Pool**. Delegators can now 
delegate to your staking pool and regularly claim their rewards without 
withdrawing the staked amount.
