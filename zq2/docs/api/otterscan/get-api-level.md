---
id: api/ots/ots_getApiLevel
title: ots_getApiLevel
---

---

Returns the Otterscan API level

### Example request

=== "cURL"

```shell
    curl -d '{
        "id": "1",
        "jsonrpc": "2.0",
        "method": "ots_getApiLevel",
        "params": [ ]
    }' -H "Content-Type: application/json" -X POST "https://api.zq2-devnet.zilliqa.com/"
```

### Example Response

```json
{
  "jsonrpc": "2.0",
  "result": 8,
  "id": "1"
}
```

### Arguments

None