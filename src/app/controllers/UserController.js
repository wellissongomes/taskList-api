import UserService from '../services/UserService';

import { validField } from '../util/util';

const UserController = {
  async store(req, res) {
    const { email: user_email } = req.body;
    const userExists = await UserService.getUserByEmail(user_email);

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já cadastrado.' });
    }

    const { id, name, email } = await UserService.create(req.body);
    return res.json({ id, name, email });
  },

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const userById = await UserService.getUserById(req.userId);
    const userByEmail = await UserService.getUserByEmail(email);

    const userAlreadyExists = !(email !== userById.email && userByEmail);
    validField(userAlreadyExists, res, 400, {
      error: 'Já existe um usuário com esse email. Tente novamente.',
    });

    const incorrectPassword = !(
      oldPassword && !(await userById.checkPassword(oldPassword))
    );
    validField(incorrectPassword, res, 401, {
      error: 'Senha incorreta. Tente novamente',
    });

    const { id, name } = await userById.update(req.body);
    return res.json({ id, name, email });
  },
};

export default UserController;
