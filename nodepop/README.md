# Nodepop
## practicaFund_Node_Mongo
Building a basic app to sell/buy second hand products.


Install dependencies.

```sh
npm install
```

And install nodemon under dev depencies:

```sh
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

  ```sh
  npm run dev
  ```

  Install Mongoose to make Mongo schemas:

  ```sh
  npm install mongoose
  ```
  ## API

  The access to the API is protected with user/password authentication.

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
**Delete ad:**

DELETE /api/adsNodepop/<_id> (body)

```json
Empty (check status 200 OK in Postman)

```
Initialize the Data Base:

**WARNING: the next command deletes the whole database!!!**

Answer 'yes' if you are sure of what you are doing.

```sh
npm run init-db
```
## Validators
Validators added for main DB queries:

```js
/* GET home page. */
router.get('/',

    [
        query('name').optional().notEmpty().withMessage('At least one character is needed to search by name'),
        query('onSale').optional().custom(value => {
            const valueToLowerCase = value.toLowerCase();
            const saleStatus = ['true', 'false'];

            if (saleStatus.includes(valueToLowerCase)) {
                return true;
            }

        }).withMessage('On sale can only be "true" or "false"'),

        query('tag').optional().custom(value => {
            const valueToLowerCase = value.toLowerCase();
            const availableTags = ['lifestyle', 'mobile', 'motor', 'work'];

            if (availableTags.includes(valueToLowerCase))
                return true;
        }
        ).withMessage('Tag can only be "Lifestyle", "Mobile", "Motor" or "Work"'),
        query('price').optional().isNumeric().withMessage('Price should be a number')
    ]
    ...

```

HABLAR DE LOS MÓDULOS NUEVOS Y LA VISTA TAGS