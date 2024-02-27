# Nodepop
## practicaFund_Node_Mongo
Building a basic app to sell/buy second hand products.

## Framework Express-generator
Run express-generator over my app and use ejs templates:

```js
npx install express-generator --ejs nodepop
```

Install dependencies.

```js
npm install
```

And install nodemon under dev depencies:

```js
npm i nodemon –save-dev
```

Set environment variables under package.json > scripts:

```js
 "scripts": {
    "start": "cross-env NODEPOP_ENV=production node ./bin/www",
    "dev": "cross-env NODEPOP_ENV=development DEBUG=nodepop:* nodemon ./bin/www"
  }
  ```
  Hence run app in dev mode (port 3001) by:

  ```js
  npm run dev
  ```
  Install Helmet library to protect my app and hide some info in my requests:

  ```js
  npm install hemlmet
  ```
  Install Mongoose to make Mongo schemas:

  ```js
  npm install mongoose
  ```
  ## API

  **Ads list:**

  GET /api/adsNodepop

  ```json
{
"results": [
{
"_id": "65ddaa5ce0297868048c7797",
"name": "IPhone 13",
"onSale": true,
"price": 600,
"picture": "/aaaa.png",
"tag": [
"mobile",
"work"
],
"__v": 0
}
]
}
```
**Update ad:**

PUT /api/adsNodepop/<_id> (body)

```json
{
    "result": {
        "_id": "65ddaa80e0297868048c7799",
        "name": "Samsung Galaxy Flip 4",
        "onSale": true,
        "price": 500,
        "picture": "/ccc.png",
        "tag": [
            "mobile",
            "work"
        ],
        "__v": 0
    }
}
```


**Insert ad:**

POST /api/adsNodepop

```json
{
    "result": {
        "name": "Nikon 3100",
        "onSale": false,
        "price": 75,
        "picture": "/ddd.png",
        "tag": [
            "lifestyle"
        ],
        "_id": "65ddb5c0c405c54ba9c3e9fb",
        "__v": 0
    }
}
```
Delete ad:

DELETE /api/adsNodepop/<_id> (body)

```json

```

