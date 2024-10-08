---
id: zrc2-transaction-history
title: Transaction History
keywords:
  - indexer
  - zrc2 contract
  - transaction history
description: Get ZRC2 transaction history
---

---

<!-- markdownlint-disable -->

Retrieve the details of transactions based on the given parameters.

## Parameters

| Name           | Type   | Required | Description                                                                               |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------- |
| `tokenAddress` | String | Required | Contract address of the ZRC2 token                                                        |
| `sender`       | String | Optional | Sender of the transaction. If set to empty string `""`, this parameter is ignored.        |
| `toAddress`    | String | Optional | Recipient of the token. If set to empty string `""`, this parameter is ignored.           |
| `fromAddress`  | String | Optional | From Address of the token. If set to empty string `""`, this parameter is ignored.        |
| `filter`       | JSON   | Optional | Filter is used for pagination, `after` is the offset and `limit` is the size of the list. |

### Notes

- To get all transactions for a given token
  - Set `tokenAddress` to the ZRC2 contract address
  - Set both `sender` and `toAddress` as empty
- To get all token transactions sent to a particular wallet
  - set `tokenAddress` to the ZRC2 contract address
  - set `sender` as empty
  - set `toAddress` to the desired wallet address
  - set `fromAddress` to the desired tx initiator

### Example Request

=== "Graphql"

    #### Query

    ```graphql
    query TxDetails($input: TransactionDetailsInput) {
      getTransactionDetails(input: $input) {
        list {
          blockID
          TxId
          sender
          toAddress
          fromAddress
          isTransferFrom
          tokenAddress
          amount
        }
      }
    }
    ```

    #### Query Variables

    ```graphql
    {
      "input": {
        "tokenAddress": "0xc5c5f8786574522e83242e5981482d63c9ac7101",
        "sender": "0x86f0875da311ee5332d5d4a8485c8d3db0f7f57b",
        "toAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
        "fromAddress": "",
        "filter": {
          "limit": 15,
          "after": "2"
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
          "blockID": "4738791",
          "TxId": "450c0936f9fee544ae646da30c6321e0d00dbeb3ebdb72662a99550b39a9e0f9",
          "sender": "0x86f0875da311ee5332d5d4a8485c8d3db0f7f57b",
          "toAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
          "fromAddress": null,
          "isTransferFrom": false,
          "tokenAddress": "0xc5c5f8786574522e83242e5981482d63c9ac7101",
          "amount": "10000000000"
        },
        {
          "blockID": "4738797",
          "TxId": "d14d02e620f9c0e0d8d9f8109237689c8da5ec8b8694df3e45fcdc8c1af85e95",
          "sender": "0x86f0875da311ee5332d5d4a8485c8d3db0f7f57b",
          "toAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
          "fromAddress": null,
          "isTransferFrom": false,
          "tokenAddress": "0xc5c5f8786574522e83242e5981482d63c9ac7101",
          "amount": "10000000000"
        }
      ]
    }
  }
}
```
