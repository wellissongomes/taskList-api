import UserService from '../services/UserService';

const UserController = {
  async store(req, res) {
    const { email: user_email } = req.body;
    const userExists = await UserService.userExists(user_email);

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já cadastrado.' });
    }

    const { id, name, email } = await UserService.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  },
};

export default UserController;
