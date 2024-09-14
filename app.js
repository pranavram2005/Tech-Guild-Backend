const express = require('express');
const cors = require('cors');
const Login = require("./router/login.js")
const Project = require('./router/project.js')
const app = express();
const port = 5000;
const connectDB = require('./db.js')
const corsOptions = {
  origin: "http://localhost:3000" 
}
app.use(cors(corsOptions))
app.use(express.json());
app.use("/",Login)
app.use('/',Project)
connectDB()
app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`)
});