const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const auth = require('../../utils/auth');

// CREATE a project
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      user: req.user._id
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET all projects for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET single project by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (!project.user.equals(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// UPDATE project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (!project.user.equals(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (!project.user.equals(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });

    await project.deleteOne();
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;