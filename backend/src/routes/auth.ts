import express from 'express';
import { users } from '../data/users';
import { User } from '../types/user';

const router = express.Router();

router.post('/register', (req, res) => {
    console.log('receiving registration request...');

    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser : User = {
        id: users.length + 1,
        username
    }
    users.push(newUser);

    return res.status(200).json({ message: 'Registration successful', user: newUser });
});

router.post('/login', (req, res) => {
    console.log('receiving login request...');
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'Login successful', user });
});

export default router;