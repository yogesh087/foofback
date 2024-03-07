

 const express = require("express");
const app = express();
const port = 5000;
// const path=require('path');

const connectToDatabase = require('./db');
//  require('./Displaudata');
connectToDatabase()  
  // .then((data) => console.log(data))
  // .catch((error) => console.log(error));

app.use(express.json());
// app.use(express.static(path.join(__dirname,"./client/build")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', require("./routes/Createuser"));
app.use('/api', require("./routes/Displaudata")); 
app.use('/api', require("./routes/OrderData")); 

app.get("/", (req, res) => {
  res.send("Hello world");
});

//  app.get('*',function(req,res){
//    res.sendFile(path.join(__dirname,'./client/build/index.html'))
//  });

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
