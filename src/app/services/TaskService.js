import Task from '../models/Task';
import UnauthorizedError from '../error/error';

const validTask = (task, userId) => {
  if (!task) throw new Error('Task inexistente.');

  if (task.user_id !== userId)
    throw new UnauthorizedError('Requisição não autorizada.');
};

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

  async update({ task_id }, { check, userId }) {
    const task = await Task.findByPk(task_id);
    validTask(task, userId);

    await task.update({ check });
    return task;
  },

  async deleteById({ task_id }, { userId }) {
    const task = await Task.findByPk(task_id);
    validTask(task, userId);

    await task.destroy();
  },
};

export default TaskService;
