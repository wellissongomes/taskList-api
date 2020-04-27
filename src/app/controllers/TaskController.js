import TaskService from '../services/TaskService';

const TaskController = {
  async index(req, res) {
    try {
      const tasks = await TaskService.getAll(req.body);
      return res.json(tasks);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async store(req, res) {
    try {
      const task = await TaskService.create(req.body);
      return res.status(201).json(task);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const task = await TaskService.update(req.params, req.body);
      return res.json(task);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};

export default TaskController;
