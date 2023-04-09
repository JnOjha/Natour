const fs = require('fs');
const express = require('express');
const app = express();

/**Middle-Ware */
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id>tours.length){
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'Success', data: { tours: newTour } });
    }
  );
};
const updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Not Found',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated Tour Here...>',
    },
  });
};
const deleteTour = (req, res) => {
  if (req.params.id > tours.length)
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });

  res.status(204).json({
    status: 'Success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//Starting up the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
