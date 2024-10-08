---
id: zrc6-asset-metadata
title: Asset Metadata
keywords:
  - zrc6
  - asset
description: Get the metadata of an asset
---

---

<!-- markdownlint-disable -->

Get the metadata of an NFT or asset. This is the data stored in the `tokenURI`.

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
      asset1: assetById(input: $input) {
        tokenId
        tokenUri
        name
        description
        externalUrl
        ownerAddress
        minterAddress
        contractAddress
        resource
        resourceMimetype
        attributes {
          traitType
          value
        }
      }
    }
    ```

    #### Query Variables

    ```graphql
    {
     "input": {
      "contractAddress": "0x084acc6bbbaeb09a6e276a426508765e53bf2459",
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
    "asset1": {
      "tokenId": "1",
      "tokenUri": "https://cloudflare-ipfs.com/ipfs/bafyreifrcqnf7gxcedfzvfipjoe4l5cxxcksg6ynul3zluzulq57ylxmee/metadata.json",
      "name": "Sea Lion",
      "description": "Sea Lion",
      "externalUrl": "https://nxotictzevvcsggsljca.supabase.co/storage/v1/object/public/assets/public/sealion.png-S66YmORf2OMDWj3IhXzIz",
      "ownerAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
      "minterAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
      "contractAddress": "0x084acc6bbbaeb09a6e276a426508765e53bf2459",
      "resource": "ipfs://bafybeidsvulplsgbv322vws53mhbrvbe5gdzgz6gdmbs73chpzo4www5ae/blob",
      "resourceMimetype": "image/png",
      "attributes": [
        {
          "traitType": "animal",
          "value": "sea lion"
        },
        {
          "traitType": "Physical Object Available",
          "value": "true"
        },
        {
          "traitType": "Physical Item Id",
          "value": "SZ12345"
        }
      ]
    }
  }
}
```
