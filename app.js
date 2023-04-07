const fs = require('fs');
const express = require('express');
const app = express();

/**Middle-Ware */
app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200).send('Hello from Server side');
// });

/**Reading the Tours json */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/**GET request */
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

/**POST request */
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  //⬆️ Here Object.assign basically allows us to create a new object by merging 2 existing object
  tours.push(newTour); //Here we push that new object to the existing file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'Success', data: { tours: newTour } });
    }
  ); //JSON.stringify: Push the file in JSON format
});

//Starting up the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
