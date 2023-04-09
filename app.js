const fs = require('fs');
const express = require('express');
const app = express();

/**Middle-Ware */
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
/*****Tour*********/

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

/*********User******* */
const getAllusers = (req, res) => {
  res.status(500).json({
    message: 'error',
    message: 'This route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    message: 'error',
    message: 'This route is not yet defined',
  });
};
const getuser = (req, res) => {
  res.status(500).json({
    message: 'error',
    message: 'This route is not yet defined',
  });
};
const updatuser = (req, res) => {
  res.status(500).json({
    message: 'error',
    message: 'This route is not yet defined',
  });
};
const deleteuser = (req, res) => {
  res.status(500).json({
    message: 'error',
    message: 'This route is not yet defined',
  });
};

/*****Routers*****/
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllusers).post(createUser);
userRouter.route('/:id').get(getuser).patch(updatuser).delete(deleteuser);

app.use('/api/v1/tours', tourRouter); //(LEC-62)
app.use('/api/v1/users', userRouter);

//Starting up the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
