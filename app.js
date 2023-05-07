const express = require('express');
const app = express();

const tourRouter = require('./routes/toureRoute');
const userRouter = require('./routes/userRoute');
const morgan = require('morgan');

/**Middle-Ware */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`)); //THis middleware is use for provide static file

/**ROUTES**/
app.use('/api/v1/tours', tourRouter); //(LEC-62)
app.use('/api/v1/users', userRouter);

module.exports = app;
