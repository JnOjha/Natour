const app = require('./app');

//Starting up the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
