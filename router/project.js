const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Create a new project
router.post('/project', async (req, res) => {
    const { title, description, requirements, deadline } = req.body;
    try {
        const newProject = new Project({ title, description, requirements, deadline });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all projects
router.get("/project", async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);  // Use 200 status for a successful GET request
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/project/:projectId/requirement/:requirementId', async (req, res) => {
    const { projectId, requirementId } = req.params;
    const { status } = req.body;

    try {
        // Validate project ID
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Validate requirement ID
        const requirement = project.requirements.id(requirementId);
        if (!requirement) {
            return res.status(404).json({ error: 'Requirement not found' });
        }

        // Update the requirement's status
        requirement.status = status;
        await project.save();

        res.status(200).json(project);
    } catch (err) {
        console.error('Error during status update:', err);  // Log the actual error
        res.status(500).json({ error: err.message });
    }
});

router.delete("/project/:id",async (req,res)=>{
    try{
        const Deleteuser = await Project.deleteOne({ "_id": req.params.id });
        if (Deleteuser.deletedCount === 0) {
            return res.status(404).json({ error: 'Project not found' });
          }
      
          res.status(200).json({ message: 'Project deleted successfully' });
    }catch (err){
        res.status(500).json({error:err.message})
    }
});


module.exports = router;
