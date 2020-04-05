import UserSerice from '../services/UserService';

const UserController = {
  async store(req, res) {
    const { email } = req.body;
    const userExists = await UserSerice.userExists(email);

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já cadastrdao.' });
    }

    const user = await UserSerice.create(req.body);
    return res.json(user);
  },
};

export default UserController;
