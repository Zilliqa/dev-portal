---
id: staking/delegatedstaking
title: Delegated Staking
---

## Overview

The following steps outline the creation of a staking pool with a single validator node.

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
Choose which variant of the staking contract to deploy:

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

You can find `DELEGATION_CONTRACT_PROXY_ADDRESS` in the output of step 1.

Expected output:

```
  Running version: 0.3.4
  Commission rate: 0.0%
  New commission rate: 10.0%
```

---

## Step 3: Validator Addition

Follow one of the approaches below, depending on whether you have already deposited the required stake
with your validator node or you need delegations to accumulate enough stake to deposit the required stake.

### Scenario 1: Node with Deposited Stake
If you are operating a validator node with the required stake already deposited, execute the following steps:

1. **Register the Control Address**:
   ```bash
   cast send --legacy --private-key <0x...> \
   <DELEGATION_CONTRACT_PROXY_ADDRESS> "registerControlAddress(bytes)" \
   <BLS_PUBLIC_KEY>
   ```
   here `--private-key <0x...>` refers to the private key previously used to deposit stake for the validator node.
   For details, refer to the [staking.md](https://github.com/Zilliqa/zq2/blob/main/z2/docs/staking.md).
   Example:
   ```bash
   cast send --legacy --private-key 0x... \
   0x7A0b7e6D24eDe78260c9ddBD98e828B0e11A8EA2 "registerControlAddress(bytes)" \
   0x92fbe50544dce63cfdcc88301d7412f0edea024c91ae5d6a04c7cd3819edfc1b9d75d9121080af12e00f054d221f876c
   ```
2. **Change the Control Address**:
   ```bash
   cast send --legacy --private-key <0x...> \
   0x00000000005a494c4445504f53495450524f5859 "setControlAddress(bytes,address)" \
   <BLS_PUBLIC_KEY> \
   <DELEGATION_CONTRACT_PROXY_ADDRESS>
   ```
   here `--private-key <0x...>` refers to the private key used in the previous step.
   Example:
   ```bash
   cast send --legacy --private-key 0x... \
   0x00000000005a494c4445504f53495450524f5859 "setControlAddress(bytes,address)" \
   0x92fbe50544dce63cfdcc88301d7412f0edea024c91ae5d6a04c7cd3819edfc1b9d75d9121080af12e00f054d221f876c \
   0x7A0b7e6D24eDe78260c9ddBD98e828B0e11A8EA2
   ```
3. **Join the Staking Pool**:
   ```bash
   cast send --legacy --private-key $PRIVATE_KEY \
   <DELEGATION_CONTRACT_PROXY_ADDRESS> "joinPool(bytes)" \
   <BLS_PUBLIC_KEY>
   ```
   Example:
   ```bash
   cast send --legacy --private-key $PRIVATE_KEY \
   0x7A0b7e6D24eDe78260c9ddBD98e828B0e11A8EA2 "joinPool(bytes)" \
   0x92fbe50544dce63cfdcc88301d7412f0edea024c91ae5d6a04c7cd3819edfc1b9d75d9121080af12e00f054d221f876c
   ```

### Scenario 2: Node Without Deposited Stake 

If you are operating a node that does not yet have the required stake deposited, and you do not own
the minimum ZIL stake required of validators, proceeding with step 4 will enable your contract to
collect the delegated stake you need to deposit with your validator node. Once the stake delegated
to the contract plus your ZIL balance as the contract owner exceeds the required minimum, you can
add your fully synced node to the staking pool and activate it as a validator by executing:

```bash
cast send --legacy --value <YOUR_ZIL>ether --private-key $PRIVATE_KEY \
<DELEGATION_CONTRACT_PROXY_ADDRESS> "depositFromPool(bytes,bytes,bytes)" \
<BLS_PUBLIC_KEY> \
<HEX_PEER_ID> \
<DEPOSIT_AUTH_SIGNATURE>
```
where `<BLS_PUBLIC_KEY>`, and `<DEPOSIT_AUTH_SIGNATURE>` are the values corresponding from the JSON output
of the [convert-key](https://github.com/Zilliqa/zq2/blob/main/z2/docs/staking.md#generating-required-values)
utility and `<HEX_PEER_ID>` is the `<PEER_ID>` output value converted from `base58` to hexadecimal encoding.
For the conversion you can use the following command:
```bash
echo <PEER_ID> | base58 -d | xxd -ps -c 1000
```
Example:
```bash
echo 12D3KooWQDT1rcThrxoSmnCt9n35jrhy5wo4BHsM5JuVz8LstQpN | base58 -d | xxd -ps -c 1000
002408011220d5ed74b09dcbe84d3b32a56c01ab721cf82809848b6604535212a219d35c412f
```
Note that `<DELEGATION_CONTRACT_PROXY_ADDRESS>` must be set as the value of `control_address`
in the JSON input passed to `convert-key`.

Example: If your contract has collected 8M ZIL from delegators but is still short of another 2M ZIL,
you can complete the deposit by transferring the remaining 2M ZIL out of your balance.
```bash
cast send --legacy --value 2000000ether --private-key $PRIVATE_KEY \
0x7A0b7e6D24eDe78260c9ddBD98e828B0e11A8EA2 "depositFromPool(bytes,bytes,bytes)" \
0x92fbe50544dce63cfdcc88301d7412f0edea024c91ae5d6a04c7cd3819edfc1b9d75d9121080af12e00f054d221f876c \
0x002408011220d5ed74b09dcbe84d3b32a56c01ab721cf82809848b6604535212a219d35c412f \
0xb14832a866a49ddf8a3104f8ee379d29c136f29aeb8fccec9d7fb17180b99e8ed29bee2ada5ce390cb704bc6fd7f5ce814f914498376c4b8bc14841a57ae22279769ec8614e2673ba7f36edc5a4bf5733aa9d70af626279ee2b2cde939b4bd8a
```

---

## Step 4: Staking Pool Registration

Share the **<DELEGATION_CONTRACT_PROXY_ADDRESS>** from step 1 with the Zilliqa team to allow
users to delegate ZIL to your staking pool on the new staking portal.

---

## Summary

By following these steps, you have successfully deployed and configured a **Non-Liquid Staking Pool**
or a **Liquid Staking Pool**, and added a validator node to it. ZIL holders who delegate to the pool
will earn rewards or see their liquid staking token's value increase, and you will receive a commission
on the delegated amounts.
