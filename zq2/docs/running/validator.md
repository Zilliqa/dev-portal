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

## Validator Jailing for Liveness Faults

To ensure network liveness and penalize validators for failing to propose a block when it is their turn, a new mechanism called "Validator Jailing for Liveness Faults" has been introduced.

**Conditions for Jailing:** A validator will be jailed if it fails to propose a block more than 3 times within a 600-view window.

**Consequences of Jailing:** When jailed, a validator is temporarily skipped in the leader rotation schedule. However, jailed validators can still participate in voting and earn cosigner rewards.

**Activation Details:** This feature is activated via the `validator_jailing` network fork flag, which is scheduled for mainnet at block `11,998,800`.

TBD