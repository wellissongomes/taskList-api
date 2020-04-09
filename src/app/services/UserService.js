import User from '../models/User';

const UserService = {
  async create({ name, email, password }) {
    const user = await User.create({
      name,
      email,
      password,
    });

    return user;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });

    return user;
  },

  async getUserById(id) {
    const user = await User.findByPk(id);
    return user;
  },
};

export default UserService;
