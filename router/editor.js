const express = require('express');
const router = express.Router();
const Document = require('../models/editor');


router.get('/documents', (req, res) => {
    res.send("Collaborative Document Editing API");
  });

  router.get("/document_view", async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/documents', async (req, res) => {
    const { title, owner } = req.body;
    try {
      const newDocument = new Document({ title, content:"",owner });
      const savedDocument = await newDocument.save();
  
      res.status(201).json({ documentId: savedDocument._id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create document' }); 
    }
  });
  


module.exports = router;
