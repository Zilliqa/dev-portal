---
id: zil-all-transactions
title: ZIL Transactions
keywords:
  - zil
  - transactions
description: All native zil transactions
---

---

<!-- markdownlint-disable -->

Get native ZIL transactions

## Parameters

| Name           | Type   | Required | Description                                                                               |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------- |
| `tokenAddress` | String | Required | Use zero address for native zil transactions                                              |
| `toAddress`    | String | Optional | Recipient of zil. If set to empty string `""`, this parameter is ignored.                 |
| `fromAddress`  | String | Optional | Address where zil is from. If set to empty string `""`, this parameter is ignored.        |
| `filter`       | JSON   | Optional | Filter is used for pagination, `after` is the offset and `limit` is the size of the list. |

### Notes

- To get all native zil transactions
  - Set `tokenAddress` to zero address
  - Set both `toAddress` and `fromAddress` as empty
- To get all token transactions sent to a particular wallet
  - set `tokenAddress` to zero address
  - set `toAddress` to the desired wallet address
  - set `fromAddress` as empty

### Example Request

=== "Graphql"

    #### Query

    ```graphql
    query TxDetails($input: TransactionDetailsInput) {
      getTransactionDetails(input: $input) {
        list {
          blockID
          TxId
          toAddress
          fromAddress
          tokenAddress
          amount
          gasAmount
          gasPrice
        }
      }
    }
    ```

    #### Query Variables

    ```graphql
    {
      "input": {
        "tokenAddress": "0x0000000000000000000000000000000000000000",
        "filter": {
          "limit":5
        }
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
    "getTransactionDetails": {
      "list": [
        {
          "blockID": "913150",
          "TxId": "0x774b90ec3590d888a9b71f49bb067ada517942243f2171d0d95c7d705111fdd7",
          "toAddress": "0x72fcaf6815a5b9c29f0457651c501da25560b0c0",
          "fromAddress": "0x31b844db1fb3c97d5a2597730cca7eb8d5281a6c",
          "tokenAddress": "0x0000000000000000000000000000000000000000",
          "amount": "61758659441516",
          "gasAmount": "1",
          "gasPrice": "2000000000"
        },
        {
          "blockID": "913378",
          "TxId": "0x2a7e91328420416869c42a67c057402565e1b9c33ab3643408789a6784cad8f1",
          "toAddress": "0x873201b7eaddd65f32174a56fa7309fdc2eae411",
          "fromAddress": "0x6e31e6ecede40299058a4a8444956c59159ba55a",
          "tokenAddress": "0x0000000000000000000000000000000000000000",
          "amount": "11067072104794",
          "gasAmount": "1",
          "gasPrice": "2000000000"
        },
        {
          "blockID": "913230",
          "TxId": "0x4a130c1191c47f3c3aad4b89483352f1ae06207536127200540a0482dec6ef74",
          "toAddress": "0x72fcaf6815a5b9c29f0457651c501da25560b0c0",
          "fromAddress": "0xb9d6f37426a3dc48b1b7bc834df9efa2b168a187",
          "tokenAddress": "0x0000000000000000000000000000000000000000",
          "amount": "73653231337520",
          "gasAmount": "1",
          "gasPrice": "2000000000"
        }
      ]
    }
  }
}
```
