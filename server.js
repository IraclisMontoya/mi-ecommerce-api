import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import categoryRoutes from './src/routes/categoryRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import cartRoutes from './src/routes/cartRoutes.js'
import orderRoutes from './src/routes/orderRoutes.js'
import requestLogger from './src/middlewares/logger.js'
import notFound from './src/middlewares/notFound.js'
import errorHandler from './src/middlewares/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(express.json())
app.use(requestLogger)

app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
    res.json({ message: '¡Servidor Express funcionando!' })
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})