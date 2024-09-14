const express = require("express");
const router = express.Router();
const Login = require('../models/login');

router.get("/register",async (req,res,next)=>{
    try{
       const View_Login = await Login.find();
       res.status(201).json(View_Login)
    }catch (err){
       res.status(500).json({error: err.message})
    }
});

router.post('/register', async (req, res) => {
    const Post_Login = await Login.find();
    const { name, email, password, department } = req.body;
    console.log('Request body:', req.body); // Log the incoming request body

    // Validate request body
    if (!name || !email || !password || !department) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const uid = Post_Login.length + 1;
    try {
      const newLogin = new Login({ name, email, password, department, uid });
      await newLogin.save();
      res.status(201).json(newLogin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });






  
module.exports=router
