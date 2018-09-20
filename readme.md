# Boot

## Description

an express REST API backend

## Usage

- install mongodb:

```
$ brew install mongodb
```

or for OSX 10.11.6

```
$ brew install mongodb@3.4
```

- navigate to Boot

```
$ cd path/to/Boot/
```

- run mongod on the db folder located at top-level

```
$ mongod --dbpath db

```

- install deps

```
$ npm i
```

- populate the db with sample data

```
$ node populatedb.js
```

- run the Boot service in dev mode

```
$ DEBUG=boot:* npm run devstart
```

- in a browser visit the REST API doc at localhost:3000/boot

- try getting a list of items

```
GET localhost:3000/boot/items
```
