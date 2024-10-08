---
id: english-auction
title: English Auction
keywords:
  - marketplace
  - english auction
description: English Auction marketplace listing
---

---

<!-- markdownlint-disable -->

Get auction offers for an asset.

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
            ZILLIQA_ENGLISH_AUCTION {
              startingBid {
                unit
                amount
                currency
              }
              winnerBid {
                maker
                unit
                amount
              }
              bids {
                maker
                unit
                amount
                dest
              }
              maker
              marketplaceContractAddress
            }
            fulfilled {
              __typename
              ... on FulfilledZilliqaEnglishAuctionV1 {
                id
                marketplaceContractAddress
                amount
                buyer
                currency
                seller
                unit
                assetRecipient
                paymentTokensRecipient
                royaltyRecipient
              }
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
    "asset": {
      "listingData": [
        {
          "sourceId": "zilliqamarketplace",
          "data": {
            "ZILLIQA_ENGLISH_AUCTION": {
              "startingBid": {
                "unit": "QA",
                "amount": 100000000000000,
                "currency": "ZIL"
              },
              "winnerBid": null,
              "bids": [
                {
                  "maker": "0x7be89f308ea48148d4f3539afe2dddaa03b807ae",
                  "unit": "QA",
                  "amount": 200000000000000,
                  "dest": "0x7be89f308ea48148d4f3539afe2dddaa03b807ae"
                }
              ],
              "maker": "0x22b251cc155ac0a181a156aaec74e964a82011c1",
              "marketplaceContractAddress": "0x35694bf3eeb91274ec54651c035a027c616f3b77"
            },
            "fulfilled": []
          }
        }
      ]
    }
  }
}
```
