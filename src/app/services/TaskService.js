import Task from '../models/Task';

const TaskService = {
  async create({ task, userId }) {
    if (!task) throw new Error('Task vazia.');

    const tasks = await Task.create({ task, user_id: userId });
    return tasks;
  },

  async getAll({ userId }) {
    const tasks = await Task.findAll({
      where: { user_id: userId, check: false },
    });

    return tasks;
  },
};

export default TaskService;
