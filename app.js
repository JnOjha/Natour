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

/*Get single Tour*/
app.get('/api/v1/tours/:id',(req,res)=>{
  console.log(req.params)   // 'req.params' store all the variable in Url
  //⬆️Here You can store multiple variable by providing :id/:x/:y
  //And if you wat to give optional parameter then /:y?   (Add a ? mark)

  const id=req.params.id*1
  const tour=tours.find(el=>el.id===id) 

  // if (id>tours.length){
    if (!tour)
    return res.status(404).json({
      status:'fail',
      message:'Invalid ID'
    })

    res.status(200).json({
      status:'Success',
      data:{
        tour,
      }
    })
  })


/**POST request */
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  //⬆️ Here Object.assign basically allows us to create a new object by merging 2 existing object
  tours.push(newTour); //Here we push that new object to the existing file
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err) => {       //JSON.stringify: Push the file in JSON format
      res.status(201).json({ status: 'Success', data: { tours: newTour } });
    });
});

/**Patch Request */
app.patch('/api/v1/tours/:id',(req,res)=>{
  if(req.params.id>tours.length){
    res.status(404).json({
      status:'fail',
      message:'Not Found'
    })
  }
  res.status(200).json({
    status:'Success',
    data:{
      tour:'<Updated Tour Here...>'
    }
  })
})

/**Delete Request */
app.delete('/api/v1/tours/:id',(req,res)=>{
  if(req.params.id>tours.length)res.status(404).json({
    status:'Fail',
    message:'Invalid ID'
  })

  res.status(204).json({
    status:'Success',
    data:null
  })
})

//Starting up the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
