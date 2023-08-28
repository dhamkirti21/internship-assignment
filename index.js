const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const candidateRoute = require("./routes/candidate.js");

// adding environmental variables
dotenv.config();

//connecting to mongodb atlas database using uri and port
const app = express();
const port = process.env.PORT || 5000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/postpage.html');
});


app.use("/upload",candidateRoute);


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ 'An Error Occurred..': err });
  });
