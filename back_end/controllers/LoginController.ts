import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

async function findUserByEmail(email: string) {
  return await User.findOne({ where: { email } });
}

class LoginController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await findUserByEmail(email);
      console.log('Usuario encontrado:', user?.get()); // show user data

      if (!user || !user.get('password')) {
        res.status(401).json({ message: 'Credenciales inválidas' });
        return;
      }

      if (bcrypt.compareSync(password, user.get('password'))) {
        const token = jwt.sign(
          { id: user.get('id'), role: user.get('roleId') },
          process.env.JWT_SECRET || 'default_secret',
          { expiresIn: '1h' }
        );

        // route to redirect user
        let redirectTo = '/';
        switch (user.get('roleId')) {
          case 1:
            redirectTo = '/admin';
            break;
          case 2:
            redirectTo = '/teacher';
            break;
          case 3:
            redirectTo = '/student';
            break;
        }

        res.json({ 
          user: { id: user.get('id'), role: user.get('roleId'), name: user.get('name') }, 
          token,
          redirectTo
        });
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    } catch (error) {
      console.error('Error en el servidor:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
}

export default new LoginController();
