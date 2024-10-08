---
id: zrc2-all-balances
title: User Balances
keywords:
  - zrc2
  - wallet
  - balances
description: All ZRC2 tokens for a given wallet
---

---

<!-- markdownlint-disable -->

Get all available ZR2 token balances for a given wallet.

### Parameters

| Name     | Type   | Required | Description                  |
| -------- | ------ | -------- | ---------------------------- |
| `wallet` | String | Required | Wallet address to be queried |

### Example Request

=== "Graphql"

    #### Query

    ```graphql
    query UserBalances($input: WalletBalancesInput) {
      getUserBalances(input: $input) {
        list {
          lastBlockID
          amount
          tokenAddress
          walletAddress
        }
      }
    }
    ```

    #### Query Variables

    ```graphql
    {
      "input": {
        "wallet": "0x22b251cc155ac0a181a156aaec74e964a82011c1"
      }
    }
    ```

    #### HTTP Headers

    ```graphql
    {
      "Authorization": "Bearer <insert token>"
    }
    ```

=== "cURL"

    ```curl

    ```

### Example Response

```json
{
  "data": {
    "getUserBalances": {
      "list": [
        {
          "lastBlockID": "4738797",
          "amount": "30000000000",
          "tokenAddress": "0xc5c5f8786574522e83242e5981482d63c9ac7101",
          "walletAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1"
        },
        {
          "lastBlockID": "4738797",
          "amount": "30000000000",
          "tokenAddress": "0x94677f06ad3046bd7c793fcb179ca79c822e6dd5",
          "walletAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1"
        },
        {
          "lastBlockID": "4734719",
          "amount": "100000000000000",
          "tokenAddress": "0x98a71b463a33bbff650d123bf04f1f32d1c8b508",
          "walletAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1"
        }
      ]
    }
  }
}
```
