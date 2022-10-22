import jwt from 'jsonwebtoken';
import SessionService from '../services/SessionService';

import authConfig from '../../config/auth';
// #front-ender #fullstack
const SessionController = {
  async store(req, res) {
    try {
      const { id, name, email } = await SessionService.create(req.body);
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
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },
};

export default SessionController;
