import UserService from './UserService';

const SessionService = {
  async create({ email, password }) {
    const user = await UserService.getUserByEmail(email);
    if (!user) throw new Error('Email inexistente. Tente novamente');

    const correctPassword = await user.checkPassword(password);
    if (!correctPassword) throw new Error('Senha incorreta. Tente novamente');

    return user;
  },
};

export default SessionService;
