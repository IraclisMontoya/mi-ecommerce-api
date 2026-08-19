import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({ message: '¡Servidor Express funcionando!' })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
