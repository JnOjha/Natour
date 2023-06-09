const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('DB connection Successful'));

//Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//Import Data into DataBase
const importData = async () => {
  try {
    await Tour.create(tours);
    //⬆️Create method can accept an array of objects. and it will create document for each object
    console.log('Data Loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete all data from collection

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
