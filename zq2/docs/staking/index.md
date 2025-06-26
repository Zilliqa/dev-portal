---
id: staking/index
title: Staking
---

# Solo Staking

If node operators want to become a validator on Zilliqa 2.0, they can deposit the
minimum stake required on their own. They can increase their deposit or decrease
it by unstaking and withdrawing part of their deposit. Note that the remaining
deposit must be at least the required minimum. If a validator does not want to
participate in the consensus anymore, they must unstake their entire deposit.

# Delegated Staking

Alternatively, validators can operate staking pools, allowing users to delegate 
stake to them. To set up a staking pool, they can use the reference implementation
mentioned below or create and deploy their own smart contracts.

The reference smart contracts currently support two variants of delegated staking:

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

## Setup by Depositing a Validator from Operator Funds

Node operators with sufficient funds to deposit the minimum stake required of validators can turn their node into a validator node as soon as it is synced, and join a staking pool later. Detailed instructions can be found [here](../staking/delegatedstaking.md).


## Setup by Funding a Validator through Delegations

Node operators who do not have the minimum stake required to run a validator node can
launch a staking pool, collect delegated stake and deposit it to turn their node into
a validator once the total delegated stake reaches the minimum required of validators.
Refer [here](../staking/delegatedstaking.md) for more information.