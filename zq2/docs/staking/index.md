---
id: staking/index
title: Delegated Staking
---

# Delegated Staking Mechanism

Zilliqa 2.0 validators can operate staking pools, allowing users to delegate 
stake to them. They can use the reference implementation of the staking 
variants mentioned below or create their own smart contracts.

The staking mechanism supports two variants:

## Staking Variants

### 1. **Liquid Staking**

- Users receive a **non-rebasing Liquid Staking Token (LST)** upon delegation.
- The tokens represent the delegator's share of the total stake delegated to the
staking pool. As the staking pool earns rewards, the value of the liquid staking
token will increase. The tokens are burned when the delegator withdraws their stake,
in return for ZIL.

### 2. **Non-Liquid Staking**

- Users can withdraw their share of the rewards in ZIL regularly without unstaking 
their principal amount.
- Instead of withdrawing the accrued rewards, users can also stake the rewards to
increase their share of the total stake and their future rewards. Furthermore, they
can replace their registered address to make another wallet eligible for unstaking
and claiming rewards.

## Setup for Existing Validators

Operators of validator nodes on the proto-mainnet can set up and join a staking pool
with their validator by following the instructions [here](../staking/delegatedstaking.md).
