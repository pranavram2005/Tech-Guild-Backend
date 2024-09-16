const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true  
  },
  content: {
    type: mongoose.Schema.Types.Mixed,  
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

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
