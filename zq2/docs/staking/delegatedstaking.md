---
id: staking/delegatedstaking
title: Delegated Staking
---

## Overview

The following steps outline the creation of a staking pool for an already deposited validator node.

---

## Prerequisites

Clone the [delegated staking](https://github.com/zilliqa/delegated_staking) repository or pull the `main` branch if you have already cloned it.

To deploy and interact with staking contracts via the CLI, use the provided Forge scripts. Follow these steps before proceeding with the deployment:

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
   `PRIVATE_KEY` refers to the staking pool contract owner's private key.

---


## Step 1: Contract Deployment
Choose one of the variant Non-Liquid/Liquid staking contract to deploy:

### Deploying **NonLiquidDelegation** Contract

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

Alternatively, deploy the LiquidDelegation contract.

### Deploying **LiquidDelegation** Contract

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

Before your validator node can join the staking pool, follow one of the approaches below depending on 
whether you have already deposited the required stake or need delegations to accumulate enough funds.

### Scenario 1: Already Activated Validators
If your validator node has already met the minimum staking requirement, execute the following steps:


1. **Set the Control Address**:
   ```bash
   cast send --legacy --private-key <0x...> \
   0x00000000005a494c4445504f53495450524f5859 "setControlAddress(bytes,address)" \
   <BLS_PUBLIC_KEY> \
   <DELEGATION_CONTRACT_PROXY_ADDRESS>
   ```
   here `--private-key <0x...>` refers to the private key previously used to deposit stake for the validator node.
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
   <DELEGATION_CONTRACT_PROXY_ADDRESS> "joinPool(bytes,address)" \
   <BLS_PUBLIC_KEY> \
   <CONTROL_ADDRESS>
   ```
   Example:
   ```bash
   cast send --legacy --private-key $PRIVATE_KEY \
   0x7a0b7e6d24ede78260c9ddbd98e828b0e11a8ea2 "joinPool(bytes,address)" \
   0x92fbe50544dce63cfdcc88301d7412f0edea024c91ae5d6a04c7cd3819edfc1b9d75d9121080af12e00f054d221f876c \
   0xe0c6f3d59b8cda6ce4fd66418212404a63ad8517
   ```
   The `CONTROL_ADDRESS` was generated when depositing the minimum stake required of validators. 
   For details, refer to the [staking.md](https://github.com/Zilliqa/zq2/blob/main/z2/docs/staking.md#generating-required-values).

---

### Scenario 2: Not activated validators 

#### Case 1: If You Have Enough Balance in the Delegation Contract
If you don't have an activated validator node yet, but have already deployed a delegation contract and your balance as the contract owner covers the required minimum stake, you can activate a fully synced node as your first validator by submitting a transaction with 10 million ZIL:
```bash
cast send --legacy --value 10000000ether --private-key $PRIVATE_KEY \
<DELEGATION_CONTRACT_PROXY_ADDRESS> "depositFromPool(bytes,bytes,bytes)" \
<BLS_PUBLIC_KEY> \
<VALIDATOR_REGISTRATION_SIGNATURE> \
<VALIDATOR_BLS_SIGNATURE>
```
Example:
```bash
cast send --legacy --value 10000000ether --private-key $PRIVATE_KEY \
0x7a0b7e6d24ede78260c9ddbd98e828b0e11a8ea2 "depositFromPool(bytes,bytes,bytes)" \
0x92fbe50544dce63cfdcc88301d7412f0edea024c91ae5d6a04c7cd3819edfc1b9d75d9121080af12e00f054d221f876c \
0x002408011220d5ed74b09dcbe84d3b32a56c01ab721cf82809848b6604535212a219d35c412f \
0xb14832a866a49ddf8a3104f8ee379d29c136f29aeb8fccec9d7fb17180b99e8ed29bee2ada5ce390cb704bc6fd7f5ce814f914498376c4b8bc14841a57ae22279769ec8614e2673ba7f36edc5a4bf5733aa9d70af626279ee2b2cde939b4bd8a
```

#### Case 2: If You Need Delegations to Reach 10M ZIL
Even if you don’t own the full 10M ZIL, your delegation contract can still collect delegated stake. Once the total funds (your stake + delegations) reach 10M ZIL, you can activate a fully synced node as your first validator by adding required ZIL from your balance:
```
cast send --legacy --value <AMOUNT_IN_MILLIONS>ether --private-key $PRIVATE_KEY \
<DELEGATION_CONTRACT_PROXY_ADDRESS> "depositFromPool(bytes,bytes,bytes)" \
<BLS_PUBLIC_KEY> \
<VALIDATOR_REGISTRATION_SIGNATURE> \
<VALIDATOR_BLS_SIGNATURE>
```
Example: If your validator node has collected 5M ZIL from delegators but is still short of another 5M ZIL, you can complete the deposit by adding the remaining amount.
```bash
cast send --legacy --value 5000000ether --private-key $PRIVATE_KEY \
0x7a0b7e6d24ede78260c9ddbd98e828b0e11a8ea2 "depositFromPool(bytes,bytes,bytes)" \
0x92fbe50544dce63cfdcc88301d7412f0edea024c91ae5d6a04c7cd3819edfc1b9d75d9121080af12e00f054d221f876c \
0x002408011220d5ed74b09dcbe84d3b32a56c01ab721cf82809848b6604535212a219d35c412f \
0xb14832a866a49ddf8a3104f8ee379d29c136f29aeb8fccec9d7fb17180b99e8ed29bee2ada5ce390cb704bc6fd7f5ce814f914498376c4b8bc14841a57ae22279769ec8614e2673ba7f36edc5a4bf5733aa9d70af626279ee2b2cde939b4bd8a
```



## Step 4: Staking Pool Registration

 Once the validator has joined the staking pool, share the 
 **<DELEGATION_CONTRACT_PROXY_ADDRESS>** with the Zilliqa team to allow users
 to delegate ZIL to the staking pool on the new staking portal.

---

## Summary

By following these steps, you have successfully deployed, configured, and added
a validator into either a **Non-Liquid Staking Pool** or a **Liquid Staking Pool**.
ZIL holders can now delegate to the pool and you receive commissions on the delegated amount.
