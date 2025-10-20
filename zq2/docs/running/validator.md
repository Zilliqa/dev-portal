---
id: validator
title: Validation
keywords:
  - running
  - validator
description: Zilliqa 2.0 Validator instructions
---

---

<!-- markdownlint-disable MD025 -->

# Running a Zilliqa 2.0 validator

Zilliqa validators help secure the Zilliqa 2.0 mainnet (and PoS
XShards). They do this by staking ZIL; when a block is proposed,
validators vote on the block with a weighting proportional to their
stake, and receive rewards for doing so.

TBD

## Validator Jailing Mechanism

Zilliqa 2.0 introduces a jailing mechanism to ensure validator liveness and network reliability. Validators may be temporarily jailed if they consistently fail to participate in block proposals.

### Jailing Conditions
- Validators are monitored for missed block proposals within a 600-block window
- Jailing is triggered if a validator misses 3 or more block proposals in this window
- When jailed, a validator is:
  - Excluded from proposing new blocks
  - Still able to participate in validation and voting
  - Continues to earn cosigner rewards

### Jailing Parameters
- **Missed View Window**: 600 blocks
- **Missed View Threshold**: 3 missed proposals
- **Lag Behind Current View**: 50 blocks

### Activation
Jailing is activated via chain specifications, typically at specific network heights (e.g., Mainnet at height 11998800, Testnet at height 14997600).
