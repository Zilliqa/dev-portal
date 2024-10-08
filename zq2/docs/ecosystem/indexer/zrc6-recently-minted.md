---
id: zrc6-recently-minted
title: Recently Minted NFTs
keywords:
  - zrc6
description: Recently minted NFTs
---

---

<!-- markdownlint-disable -->

Get the details of recently minted NFTs.

### Parameters

None

### Example Request

=== "Graphql"

    #### Query

    ```graphql
    query Query {
      assets {
        cursor
        assetsList {
          contractAddress
          tokenId
          tokenUri
          ownerAddress
          spenderAddress
          operatorAddress
        }
      }
    }
    ```

    #### Query Variables

    ```graphql

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
      "cursor": "100",
      "assetsList": [
        {
          "contractAddress": "0x4a8666cfbc819aa25a90e4fa9e25a88a4ea10979",
          "tokenId": "477",
          "tokenUri": "QmbNrf7UmUE4D4B9TVESTZ7Atq2BbKkvDAiEL5TaqzVxrQ",
          "ownerAddress": "0xe2a0962bf516dfa72dca8602ce41c93ec686c668",
          "spenderAddress": null,
          "operatorAddress": []
        },
        {
          "contractAddress": "0x4a8666cfbc819aa25a90e4fa9e25a88a4ea10979",
          "tokenId": "476",
          "tokenUri": "QmUogHQynSN4SzAPoXaV7xj2zLnkdoFYvKiAwa5ZKn2XkG",
          "ownerAddress": "0xe2a0962bf516dfa72dca8602ce41c93ec686c668",
          "spenderAddress": null,
          "operatorAddress": []
        },
        {
          "contractAddress": "0x4a8666cfbc819aa25a90e4fa9e25a88a4ea10979",
          "tokenId": "475",
          "tokenUri": "QmYNYpwFjvWQEmioBHN6v5xXrbP179qhvRSRMfb3RknmHt",
          "ownerAddress": "0xe2a0962bf516dfa72dca8602ce41c93ec686c668",
          "spenderAddress": null,
          "operatorAddress": []
        },
        ...
        {
          "contractAddress": "0x4a8666cfbc819aa25a90e4fa9e25a88a4ea10979",
          "tokenId": "378",
          "tokenUri": "QmX6tErvsmoxy6iofSFfR7jFudHpxE7eAPqE4KvYDeqpZU",
          "ownerAddress": "0xe2a0962bf516dfa72dca8602ce41c93ec686c668",
          "spenderAddress": null,
          "operatorAddress": []
        }
      ]
    }
  }
}
```
