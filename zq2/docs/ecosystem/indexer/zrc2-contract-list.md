---
id: zrc2-contract-list
title: Token List
keywords:
  - indexer
  - zrc2 contract
description: Get ZRC2 contract List
---

---

<!-- markdownlint-disable -->

Get a list of of ZRC-2 contracts.

### Parameters

| Name     | Type | Required | Description                                                                               |
| -------- | ---- | -------- | ----------------------------------------------------------------------------------------- |
| `filter` | JSON | Optional | Filter is used for pagination, `after` is the offset and `limit` is the size of the list. |

### Example Request

=== "Graphql"

    #### Query

    ```graphql
    query TokensList($input: TokenDetailsInput) {
      getTokenDetails(input: $input) {
        cursor
        list {
          contractAddress
          tokenName
          tokenSymbol
          init_supply
          totalSupply
          standard
          decimals
          ownerAddress
          type
        }
      }
    }
    ```

    #### Query Variables

    ```graphql
    {
      "input": {
        "filter": {
          "after": "1",
          "limit": 5
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
    "getTokenDetails": {
      "cursor": "6",
      "list": [
        {
          "contractAddress": "0xd130598a0c19f07e411de9571b249e163ca650d8",
          "tokenName": "ABCtoken",
          "tokenSymbol": "ABC",
          "init_supply": null,
          "totalSupply": "10000000",
          "standard": "ZRC2",
          "decimals": "0",
          "ownerAddress": "0x1fA770d35ac575Cff808540E084C2907d71Ef763",
          "type": "ASSET_CONTRACT"
        },
        {
          "contractAddress": "0x17c81253b9de207c98381c0ca3c84f2d151928c7",
          "tokenName": "XCAD Network Test Token",
          "tokenSymbol": "XCAD",
          "init_supply": null,
          "totalSupply": "2000000000000",
          "standard": "ZRC2",
          "decimals": "6",
          "ownerAddress": "0xa3f8c8bE2e3AD62c6fe7729Ef0aC402d3da8F9D9",
          "type": "ASSET_CONTRACT"
        }
      ]
    }
  }
}
```
