---
id: zrc6-search-attribute
title: Search NFT Attribute
keywords:
  - zrc6
  - attribute
description: Find all NFTS with a given attribute
---

---

<!-- markdownlint-disable -->

Find all NFTS with a given attribute.
This applies to NFTS which follow the ZRC-7 metadata standard

### Parameters

### Example Request

=== "Graphql"

    #### Query

    ```graphql
    query getAssets($input: AssetsInput!) {
      assets(input: $input) {
        cursor
        assetsList {
          contractAddress
          tokenId
          tokenUri
          minterAddress
          ownerAddress
          spenderAddress
          operatorAddress
          name
          description
          resource
          resourceMimetype
          externalUrl
          externalDescription
          attributes {
            traitType
            value
          }
          contractPaused
          contractPaused
        }
      }
    }
    ```

    #### Query Variables

    ```graphql
    {
      "input": {
          "filter": {
            "after": "0",
            "limit": 12,
            "keyword": "",
            "attributes": [{ "type": "Metaverse Id", "value": "metaverse1" }]
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
    "assets": {
      "cursor": "12",
      "assetsList": [
        {
          "contractAddress": "0x4aba00e6039b4f9626b66098c4b499cc76c04536",
          "tokenId": "4",
          "tokenUri": "https://cloudflare-ipfs.com/ipfs/bafyreieor4llmsxqi4roph24fmunghjbtmegngsqqxk3py3owosmgwq4dq/metadata.json",
          "minterAddress": "0xa8c22025ede0654d341942d07aedff54d2e52091",
          "ownerAddress": "0x35694bf3eeb91274ec54651c035a027c616f3b77",
          "spenderAddress": "0x35694bf3eeb91274ec54651c035a027c616f3b77",
          "operatorAddress": [],
          "name": "Leafy1",
          "description": "calm like a leaf",
          "resource": "ipfs://bafybeieasrloyldcwpbfnoxuoco3n5unncke67hot27pd5kreg37ftaca4/blob",
          "resourceMimetype": "image/jpeg",
          "externalUrl": "https://nxotictzevvcsggsljca.supabase.co/storage/v1/object/public/assets/public/peaceful.jpg-16z2sqxptk0kdSXr1FCE3",
          "externalDescription": null,
          "attributes": [
            {
              "traitType": "Physical Object Available",
              "value": "true"
            },
            {
              "traitType": "Physical Item Id",
              "value": "leafy234"
            },
            {
              "traitType": "Metaverse Enabled",
              "value": "true"
            },
            {
              "traitType": "Metaverse Id",
              "value": "metaverse1"
            }
          ],
          "contractPaused": false
        }
      ]
    }
  }
}
```
