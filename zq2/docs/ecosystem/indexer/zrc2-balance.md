---
id: zrc2-balance
title: User Balance
keywords:
  - zrc2
  - wallet
  - balance
description: Balance for a given wallet
---

---

<!-- markdownlint-disable -->

Get the balance of a specific ZRC2 token for a given wallet.

### Parameters

| Name     | Type   | Required | Description                        |
| -------- | ------ | -------- | ---------------------------------- |
| `wallet` | String | Required | Wallet address holding the token   |
| `token`  | String | Required | Contract address of the ZRC2 token |

### Example Request

=== "Graphql"

    #### Query

    ```graphql
    query UserBalance($input: WalletBalanceInput) {
      getUserBalanceByToken(input: $input) {
        tokenAddress
        walletAddress
        lastBlockID
        amount
      }
    }
    ```

    #### Query Variables

    ```graphql
    {
      "input": {
        "wallet": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
        "token": "0x98a71b463a33bbff650d123bf04f1f32d1c8b508"
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
    "getUserBalanceByToken": {
      "tokenAddress": "0x98a71b463a33bbff650d123bf04f1f32d1c8b508",
      "walletAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
      "lastBlockID": "4734719",
      "amount": "100000000000000"
    }
  }
}
```
