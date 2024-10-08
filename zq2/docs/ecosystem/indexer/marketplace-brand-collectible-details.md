---
id: brand-collectible-details
title: Brand Collectible Details
keywords:
  - marketplace
  - brand collectible
description: Brand collectible details of an NFT
---

---

<!-- markdownlint-disable -->

Get brand collectible details of an NFT.

### Parameters

| Name              | Type   | Required | Description                   |
| ----------------- | ------ | -------- | ----------------------------- |
| `contractAddress` | String | Required | Address of the ZRC6-contract  |
| `tokenId`         | String | Required | ID of the token to be queried |

### Example Request

=== "Graphql"

    #### Query

    ```graphql
    query BrandsAssetById($input: AssetInput) {
      getBrandCollectibleByAssetId(input: $input) {
        collectionId
        createdAt
        collectionContract
        tokenId
        tokenAddress
        status
      }
    }
    ```

    #### Query Variables

    ```graphql
    {
     "input": {
      "contractAddress": "0x084acc6bbbaeb09a6e276a426508765e53bf2459",
      "tokenId": "8"
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
    "getBrandCollectibleByAssetId": {
      "collectionId": "11",
      "createdAt": "2022-11-25T07:30:49.088615+00:00",
      "collectionContract": "0x2878928cadf313ef27b35f985ef3e57b2aac7f4d",
      "tokenId": "8",
      "tokenAddress": "0x084acc6bbbaeb09a6e276a426508765e53bf2459",
      "status": "2"
    }
  }
}
```
