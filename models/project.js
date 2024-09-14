const mongoose = require('mongoose');
const requirementSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    task: { type: String, required: true },
    status:{type:Boolean,default:false}
});
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
        unique: true,
      },
      requirements: {
        type: [requirementSchema],
      },
      deadline:{
        type: String,
        required: true
     },
});

module.exports = mongoose.model('Project',ProjectSchema);