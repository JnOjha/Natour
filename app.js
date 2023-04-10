const express = require('express');
const app = express();

const tourRouter = require('./routes/toureRoute');
const userRouter = require('./routes/userRoute');

/**Middle-Ware */
app.use(express.json());

/**ROUTES**/
app.use('/api/v1/tours', tourRouter); //(LEC-62)
app.use('/api/v1/users', userRouter);

module.exports = app;
