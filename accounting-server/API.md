## Generate Random Balance Sheet

Generates a random balance sheet based on the provided body.

### Endpoint

`POST /getBalanceSheet`

### Request Parameters

| Parameter | Type   | Description                                              |
| --------- | ------ | -------------------------------------------------------- |
| body      | Object | The body object containing the yearEstablished property. |

### Response

An array of balance sheet objects including year, month, profitOrLoss, and assetsValue.

### Success Response Example

json HTTP/1.1 200 OK

```json
[
    {
        "year": 2021,
        "month": 12,
        "profitOrLoss": 500,
        "assetsValue": 100000
    },
    {
        "year": 2021,
        "month": 11,
        "profitOrLoss": -250,
        "assetsValue": 200000
    },
    ...
]
```

### Error Response Example

HTTP/1.1 400 Bad Request

```json
{
  "error": "Invalid yearEstablished value"
}
```
