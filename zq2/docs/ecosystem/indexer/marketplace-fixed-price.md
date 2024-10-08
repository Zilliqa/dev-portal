---
id: fixed-price
title: Fixed Price
keywords:
  - marketplace
  - fixed price
description: Fixed price marketplace listing
---

---

<!-- markdownlint-disable -->

Get fixed price offers for an asset.

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
      asset: assetById(input: $input) {
        listingData {
          sourceId
          data {
            ZILLIQA_FIXED_PRICE {
              othersOffers {
                maker
                unit
                amount
                currency
                expirationInBlockNumber
              }
              ownerOffers {
                maker
                unit
                amount
                currency
                expirationInBlockNumber
              }
              marketplaceContractAddress
            }
          }
        }
      }
    }
    ```

    #### Query Variables

    ```graphql
    {
     "input": {
      "contractAddress": "0xa7bfba9919112883b137ecbad5139f537dff944d",
      "tokenId": "3"
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
    "asset": {
      "listingData": [
        {
          "sourceId": "zilliqamarketplace",
          "data": {
            "ZILLIQA_FIXED_PRICE": {
              "othersOffers": [],
              "ownerOffers": [
                {
                  "maker": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
                  "unit": "QA",
                  "amount": 100000000000000,
                  "currency": "ZIL",
                  "expirationInBlockNumber": "5037675"
                }
              ],
              "marketplaceContractAddress": "0xf52f2c87d1a9b0e9f818618b78e2009baf222b2f"
            }
          }
        }
      ]
    }
  }
}
```
