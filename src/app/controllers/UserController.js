import * as Yup from 'yup';
import UserService from '../services/UserService';
import UnauthorizedError from '../error/error';

const UserController = {
  async store(req, res) {
    try {
      const { id, name, email } = await UserService.create(req.body);
      return res.status(201).json({ id, name, email });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) => {
            if (oldPassword) {
              return field.required();
            }
            return field;
          }),
        confirmPassword: Yup.string().when('password', (password, field) => {
          if (password) {
            return field.required().oneOf([Yup.ref('password')]);
          }
          return field;
        }),
      });

      const isValid = await schema.isValid(req.body);
      if (!isValid) {
        return res.status(400).json({ error: 'Falha na validação.' });
      }

      const { id, name, email } = await UserService.update(req.body);
      return res.json({ id, name, email });
    } catch (error) {
      let status = 400;
      if (error instanceof UnauthorizedError) status = error.statusCode();
      return res.status(status).json({ error: error.message });
    }
  },
};

export default UserController;
