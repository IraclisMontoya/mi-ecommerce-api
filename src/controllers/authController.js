import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function generateToken(user) {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
}

export async function register(req, res) {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Faltan datos: nombre, correo o contraseña.' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: 'Ya existe una cuenta con ese correo.' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })

        const token = generateToken(user)
        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario.', error: error.message })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' })
        }

        const passwordMatches = await bcrypt.compare(password, user.password)
        if (!passwordMatches) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' })
        }

        const token = generateToken(user)
        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message })
    }
}