import express from 'express';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

// Cadastro 
router.post('/cadastro', async (req, res) => {
    try {
        const user = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);

        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
            },
        });

        res.status(201).json(userDB);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no Servidor, tente novamente",err });
    }
});

export default router;
