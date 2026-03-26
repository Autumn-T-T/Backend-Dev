const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');
const Project = require('../../models/Project');
const auth = require('../../utils/auth');

// CREATE task for a specific project
router.post('/projects/:projectId/tasks', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (!project.user.equals(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'To Do',
      project: project._id
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET all tasks for a project
router.get('/projects/:projectId/tasks', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (!project.user.equals(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });

    const tasks = await Task.find({ project: project._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// UPDATE a task
router.put('/:taskId', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    const project = await Project.findById(task.project);
    if (!project.user.equals(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE a task
router.delete('/:taskId', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    const project = await Project.findById(task.project);
    if (!project.user.equals(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });

    await task.deleteOne();
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;