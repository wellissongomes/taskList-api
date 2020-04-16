import User from '../models/User';

import UnauthorizedError from '../error/error';

const UserService = {
  async create({ name, email, password }) {
    if (!name) throw new Error('Nome inválido.');
    if (!email) throw new Error('Email inválido.');
    if (!password) throw new Error('Senha inválida.');

    let user = await this.getUserByEmail(email);
    if (user) throw new Error('Usuário já cadastrado.');

    user = await User.create({
      name,
      email,
      password,
    });

    return user;
  },

  async update({
    userId,
    name,
    email,
    oldPassword,
    password,
    confirmPassword,
  }) {
    if (oldPassword && (!password || !confirmPassword))
      throw new Error('Preencha todos os campos de senha.');

    if (!oldPassword && (password || confirmPassword))
      throw new Error('Digite a senha antiga para altera-la.');

    const userById = await this.getUserById(userId);
    const userByEmail = await this.getUserByEmail(email);

    const userAlreadyExists = email !== userById.email && userByEmail;
    if (userAlreadyExists)
      throw new Error('Já existe um usuário com esse email. Tente novamente.');

    const incorrectPassword =
      oldPassword && !(await userById.checkPassword(oldPassword));
    if (incorrectPassword)
      throw new UnauthorizedError('Senha incorreta. Tente novamente');

    const user = await userById.update({
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
