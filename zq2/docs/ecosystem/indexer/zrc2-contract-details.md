---
id: zrc2-contract-details
title: Token Detail
keywords:
  - indexer
  - zrc2 contract
description: Get ZRC2 contract details
---

---

<!-- markdownlint-disable -->

Retrieve the details of a given ZRC-2 contract.

### Parameters

| Name     | Type   | Required | Description                                                               |
| -------- | ------ | -------- | ------------------------------------------------------------------------- |
| `token`  | String | Required | The smart contract address of the token (leave empty when using `symbol`) |
| `symbol` | String | Required | The symbol of the token (leave empty when using `token`)                  |

### Example Request

=== "Graphql"

    #### Query

    ```graphql
    query TokenDetail($input: TokenDetailInput) {
      getTokenDetail(input: $input) {
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
    ```

    #### Query Variables

    ```graphql
    {
      "input": {
        "token": "0x98a71b463a33bbff650d123bf04f1f32d1c8b508",
        "symbol": ""
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
    "getTokenDetail": {
      "contractAddress": "0x98a71b463a33bbff650d123bf04f1f32d1c8b508",
      "tokenName": "Wrapped ZIL Token",
      "tokenSymbol": "wZIL",
      "init_supply": "0",
      "totalSupply": "41166677135704200",
      "standard": "ZRC2",
      "decimals": "12",
      "ownerAddress": "0x7E30D1c942282784630EBfedba1FFbDE3647f472",
      "type": "ASSET_CONTRACT"
    }
  }
}
```
