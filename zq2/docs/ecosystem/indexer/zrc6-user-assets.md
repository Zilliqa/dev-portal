---
id: zrc6-user-assets
title: User NFTs
keywords:
  - zrc6
  - asset
description: Get all the NFTs of owned by a user
---

---

<!-- markdownlint-disable -->

Get all the NFTs owned by a wallet address

### Parameters

| Name      | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| `address` | String | Required | Wallet address of the user |

### Example Request

=== "Graphql"

    #### Query

    ```graphql
    query Query($userInput: UserInput) {
      user(input: $userInput) {
        address
        ownedAssets {
          assetsList {
            contractAddress
            tokenId
            tokenUri
            name
            resource
            minterAddress
            spenderAddress
            operatorAddress
          }
        }
        mintedAssets {
          assetsList {
            contractAddress
            tokenId
            tokenUri
            name
            resource
            description
            ownerAddress
            spenderAddress
            operatorAddress
          }
        }
      }
    }
    ```

    #### Query Variables

    ```graphql
    {
     "userInput": {
      "address": "0x22b251cc155ac0a181a156aaec74e964a82011c1"
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
    "user": {
      "address": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
      "ownedAssets": {
        "assetsList": [
          {
            "contractAddress": "0x084acc6bbbaeb09a6e276a426508765e53bf2459",
            "tokenId": "6",
            "tokenUri": "https://cloudflare-ipfs.com/ipfs/bafyreiavttz6nnv6glnp6zwvdq3d7okcujy7zfkejax6nl72nzufel6usu/metadata.json",
            "name": "Metaverse Lion",
            "resource": "ipfs://bafybeidgcul36ba5pow45ddn3nyq6f5a77ymzlpibe7bvbfoez5m6itl4i/blob",
            "minterAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
            "spenderAddress": null,
            "operatorAddress": []
          },
          {
            "contractAddress": "0x1fe88b9cf6107272c14c0f9471506eb33b58002d",
            "tokenId": "1",
            "tokenUri": "https://cloudflare-ipfs.com/ipfs/bafyreibe6pqjwgercgpc6xfei3sr36sknppjy7qv6ccrxijize3sqnbzme/metadata.json",
            "name": "Blackhole",
            "resource": "ipfs://bafybeif4eot5qj7czadhisn4f42folzdro6e72igd5wtbjzhfr2s44vlk4/blob",
            "minterAddress": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
            "spenderAddress": "0x76de76c8ab407ef10e2da2f7ebd51fc6638c9d59",
            "operatorAddress": []
          },
          ...
          {
            "contractAddress": "0x084acc6bbbaeb09a6e276a426508765e53bf2459",
            "tokenId": "2",
            "tokenUri": "https://cloudflare-ipfs.com/ipfs/bafyreibzeqitc6vtek5ywlaycagcvdgou6yf3ofbxv3id67i7dgkfrxste/metadata.json",
            "name": "Asian Elephant",
            "resource": "ipfs://bafybeifyffen2nkhjiyq4be3wkxlexobc43fnsff57opxuxg7s7fc57zlm/blob",
            "description": "asian elephant",
            "ownerAddress": "0x21abfbf9b66061a11183d933a9634754c3341752",
            "spenderAddress": "0x21abfbf9b66061a11183d933a9634754c3341752",
            "operatorAddress": []
          }
        ]
      }
    }
  }
}

```
