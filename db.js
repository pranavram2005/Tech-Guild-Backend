const mongoose = require('mongoose')
const MONGO_URI = "mongodb+srv://pspranavram2005:CPnf4s218B8FyC7A@cluster0.hkveesr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async()=>{
    try{
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log('MongoDB connected');
    }catch (err){
        console.log(err.message)
    }

};
module.exports = connectDB;