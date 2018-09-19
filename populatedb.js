'use strict';

const { Item } = require('./models/item');
const { Rating } = require('./models/rating');
const { Category } = require('./models/category');
const mongoose = require('mongoose');
const process = require('process');
const { ArgumentParser } = require('argparse');

async function connect(dburl) {
   return mongoose.connect(dburl, { useNewUrlParser: true });
}

async function populateCategories() {
   await Promise.all([
      new Category({ name: 'shirts' }).save(),
      new Category({ name: 'pants' }).save(),
      new Category({ name: 'socks' }).save(),
      new Category({ name: 'beanies' }).save(),
      new Category({ name: 'jackets' }).save(),
      new Category({ name: 'underwear' }).save(),
      new Category({ name: 'shoes' }).save(),
      new Category({ name: 'shorts' }).save(),
   ]);
}

async function populateItems() {
   let cat_to_id = new Map();

   await Category.find()
      .then(categories => {
         for (let cat of categories)
            cat_to_id.set(cat.name, cat._id);
      });

   await Promise.all([
      new Item({ 
         name: 'huffelpuff shirt a', 
         price: 15.00, 
         inventory: 5, 
         category: [cat_to_id.get('shirts')]
      }).save(),
      new Item({ 
         name: 'huffelpuff shirt b', 
         price: 12.00, 
         inventory: 10, 
         category: [cat_to_id.get('shirts')]
      }).save(),
      new Item({ 
         name: 'huffelpuff shorts a', 
         price: 25.00, 
         inventory: 5, 
         category: [cat_to_id.get('pants'), cat_to_id.get('shorts')]
      }).save(),
      new Item({ 
         name: 'huffelpuff underwear a', 
         price: 5.00, 
         inventory: 100, 
         category: [cat_to_id.get('underwear')]
      }).save(),
   ]);
}

async function populateRatings() {
   let item_to_id = new Map();

   await Item.find()
      .then(items => {
         for (let item of items)
            item_to_id.set(item.name, item._id);
      })

   await Promise.all([
      new Rating({ 
         value: 5, item: item_to_id.get('huffelpuff shirt a') }).save(),
      new Rating({ 
         value: 5, item: item_to_id.get('huffelpuff shorts a') }).save(),
      new Rating({ 
         value: 4, item: item_to_id.get('huffelpuff shorts a') }).save(),
      new Rating({ 
         value: 0, item: item_to_id.get('huffelpuff underwear a') }).save(),
   ]);
}

async function populateDb() {
   await populateCategories();
   await populateItems();
   await populateRatings();
}

function closeConn() {
   mongoose.connection.close();
}

function onError(err) {
   console.error(err);
   closeConn();
}

function main() {
   let parser = new ArgumentParser({ 
      description: 'cli for populating boot with sample data' 
   });

   parser.addArgument('--dburl', 
      { 
         defaultValue: 'mongodb://localhost:27017/boot',
         help: 'URL to the mongodb to populate. ' +
            'Defaults to mongodb://localhost:27017/boot'
      });
   let args = parser.parseArgs();

   connect(args.dburl)
      .then(populateDb)
      .then(closeConn)
      .catch(onError);
}

main();
