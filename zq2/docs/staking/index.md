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
- The tokens represent the delegator's share of the validator's stake. As the 
validator earns rewards, the value of the staking token will increase.
The tokens are burned when the delegator withdraws their stake,
 in return for ZIL.

### 2. **Non-Liquid Staking**

- Users can withdraw their share of the rewards regularly without unstaking 
their principal amount.
