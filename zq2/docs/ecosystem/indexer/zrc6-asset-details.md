---
id: zrc6-asset-details
title: NFT Details
keywords:
  - zrc6
  - asset
description: Get details of an nft
---

---

<!-- markdownlint-disable -->

Get the details of a particular NFT or asset

### Parameters

| Name              | Type   | Required | Description                   |
| ----------------- | ------ | -------- | ----------------------------- |
| `contractAddress` | String | Required | Address of the ZRC6-contract  |
| `tokenId`         | String | Required | ID of the token to be queried |

### Example Request

=== "Graphql"

    #### Query

    ```graphql
    query Query($input: AssetInput) {
      assetById(input: $input) {
        contractAddress
        tokenId
        tokenUri
        ownerAddress
        spenderAddress
        operatorAddress
      }
    }
    ```

    #### Query Variables

    ```graphql
    {
     "input": {
      "contractAddress": "0xe9f34009d95b5c818fc6a81ca90a150f7564cdb8",
      "tokenId": "1"
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
    "assetById": {
      "contractAddress": "0xe9f34009d95b5c818fc6a81ca90a150f7564cdb8",
      "tokenId": "1",
      "tokenUri": "https://bafkreiatphadr5dqqipxxcgb44faev3jqhbleebjzna6nxxlg53dmyqg3q.ipfs.nftstorage.link",
      "ownerAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
      "spenderAddress": "0x20e3223bd23752403f32f2beb8d323119f3fd93a",
      "operatorAddress": []
    }
  }
}
```
