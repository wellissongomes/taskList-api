import jwt from 'jsonwebtoken';
import UserService from '../services/UserService';

import authConfig from '../../config/auth';

const SessionController = {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ error: 'Email inexistente. Tente novamente' });
    }

    const correctPassword = await user.checkPassword(password);
    if (!correctPassword) {
      return res
        .status(401)
        .json({ error: 'Senha incorreta. Tente novamente' });
    }

    const { id, name } = user;
    const { secret, expiresIn } = authConfig;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, secret, {
        expiresIn,
      }),
    });
  },
};

export default SessionController;
