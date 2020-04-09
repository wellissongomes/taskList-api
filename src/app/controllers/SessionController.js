import jwt from 'jsonwebtoken';
import UserService from '../services/UserService';

import authConfig from '../../config/auth';
import { validField } from '../util/util';

const SessionController = {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await UserService.getUserByEmail(email);
    validField(user, res, 401, { error: 'Email inexistente. Tente novamente' });

    const correctPassword = await user.checkPassword(password);
    validField(correctPassword, res, 401, {
      error: 'Senha incorreta. Tente novamente',
    });

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
