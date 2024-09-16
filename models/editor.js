const mongoose = require('mongoose');

// Define your document schema
const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true  // Enforce that the document has a title
  },
  content: {
    type: mongoose.Schema.Types.Mixed,  // Store Quill Delta objects or any type
    required: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User'
  }
});

// Create the model from the schema
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
