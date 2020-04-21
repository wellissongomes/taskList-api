import Sequelize from 'sequelize';
import dbConfig from '../config/database';

import User from '../app/models/User';
import Task from '../app/models/Task';

const models = [User, Task];

const Database = {
  init() {
    const connection = new Sequelize(dbConfig);
    models.map((model) => model.init(connection));
    models.map(
      (model) => model.associate && model.associate(connection.models)
    );
  },
};

export default Database.init();
