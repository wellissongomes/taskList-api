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

  async update({ task_id }, { check }) {
    const task = await Task.findByPk(task_id);
    if (!task) throw new Error('Task inexistente.');

    await task.update({ check });
    return task;
  },
};

export default TaskService;
