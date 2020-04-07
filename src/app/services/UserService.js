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

  async userExists(email) {
    const userExists = await User.findOne({
      where: { email },
    });

    return userExists;
  },
};

export default UserService;
