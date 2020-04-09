import jwt from 'jsonwebtoken';
import UserService from '../services/UserService';

import authConfig from '../../config/auth';

// eslint-disable-next-line consistent-return
const validField = (field, res, statusCode, message) => {
  if (!field) {
    return res.status(statusCode).json(message);
  }
};

const SessionController = {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await UserService.getUserByEmail(email);
    validField(user, res, 401, { error: 'Email inexistente' });

    const correctPassword = await user.checkPassword(password);
    validField(correctPassword, res, 401, { error: 'Senha incorreta.' });

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
