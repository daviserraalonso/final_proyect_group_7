import { Router } from 'express';
import User from '../models/user.js'; // import user model
const router = Router();
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, roleId, phone, isValidated, lat, lng } = req.body;
        // check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'This email exists in our database' });
            return;
        }
        // create new user
        const user = await User.create({
            name,
            email,
            password, // hash password
            roleId,
            phone,
            isValidated,
            lat,
            lng
        });
        // return response user created
        res.status(201).json(user);
    }
    catch (error) {
        console.error('We have a error generate user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Exportación por defecto
export default router;
