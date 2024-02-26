# Nodepop
## practicaFund_Node_Mongo
Building a basic app to sell/buy second hand products.

## Framework Express-generator
Run express-generator over my app:

```js
npx install express-generator nodepop
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