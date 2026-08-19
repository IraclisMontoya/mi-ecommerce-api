import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectDB } from './src/config/db.js'
import Category from './src/models/Category.js'
import Product from './src/models/Product.js'
import User from './src/models/User.js'

const categoriesData = [
    { name: 'Clásico', description: 'Tueste tradicional, sabor equilibrado' },
    { name: 'Gourmet', description: 'Cafés de especialidad, notas complejas' },
    { name: 'Edición especial', description: 'Lotes limitados de temporada' },
    { name: 'Descafeinado', description: 'Todo el sabor, sin cafeína' },
    { name: 'Orgánico', description: 'Cultivo libre de químicos' },
    { name: 'Reserva', description: 'Selección premium de finca' },
    { name: 'Mezcla', description: 'Blends de varios orígenes' },
    { name: 'Monoorigen', description: 'De una sola finca o región' },
    { name: 'Temporada', description: 'Disponibilidad limitada' },
    { name: 'Regalo', description: 'Presentaciones especiales para regalar' },
]

const usersData = [
    { name: 'Ana Torres', email: 'ana@correo.com' },
    { name: 'Luis Ramírez', email: 'luis@correo.com' },
    { name: 'Carla Méndez', email: 'carla@correo.com' },
    { name: 'Jorge Salinas', email: 'jorge@correo.com' },
    { name: 'Paola Ruiz', email: 'paola@correo.com' },
    { name: 'Diego Herrera', email: 'diego@correo.com' },
    { name: 'Fernanda Cruz', email: 'fernanda@correo.com' },
    { name: 'Mario Ortiz', email: 'mario@correo.com' },
    { name: 'Sofía Vega', email: 'sofia@correo.com' },
    { name: 'Roberto Nava', email: 'roberto@correo.com' },
]

async function seed() {
    await connectDB()

    await Category.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const categories = await Category.insertMany(categoriesData)
    const clasico = categories.find((c) => c.name === 'Clásico')._id
    const gourmet = categories.find((c) => c.name === 'Gourmet')._id

    const productsData = [
        { name: 'Finca Esperanza (Grano)', description: 'Café de origen único, notas dulces y achocolatadas.', shortDescription: 'Notas dulces y achocolatadas', price: 190, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80', roastType: 'Clásico', format: 'Grano', weight: '250g', stock: 20, category: clasico },
        { name: 'Finca Esperanza (Molido)', description: 'Café de origen único, notas dulces y achocolatadas.', shortDescription: 'Notas dulces y achocolatadas', price: 190, image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80', roastType: 'Clásico', format: 'Molido', weight: '250g', stock: 20, category: clasico },
        { name: 'Reserva del Volcán', description: 'Cultivado en altura volcánica, acidez brillante y cuerpo intenso.', shortDescription: 'Acidez brillante, cuerpo intenso', price: 340, image: 'https://images.unsplash.com/photo-1524350876685-274059332603?w=600&q=80', roastType: 'Gourmet', format: 'Grano', weight: '250g', stock: 15, category: gourmet },
        { name: 'Tueste Medio Origen (Grano)', description: 'Equilibrado y suave, ideal para el día a día.', shortDescription: 'Equilibrado y suave', price: 180, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80', roastType: 'Clásico', format: 'Grano', weight: '250g', stock: 25, category: clasico },
        { name: 'Tueste Medio Origen (Molido)', description: 'Equilibrado y suave, ideal para el día a día.', shortDescription: 'Equilibrado y suave', price: 180, image: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=600&q=80', roastType: 'Clásico', format: 'Molido', weight: '250g', stock: 25, category: clasico },
        { name: 'Selección Gourmet Especial', description: 'Lote limitado con notas frutales y florales.', shortDescription: 'Notas frutales y florales', price: 320, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80', roastType: 'Gourmet', format: 'Grano', weight: '250g', stock: 10, category: gourmet },
        { name: 'Café de Altura (Grano)', description: 'Cultivado sobre los 1800 msnm, dulzura natural.', shortDescription: 'Dulzura natural de altura', price: 310, image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=600&q=80', roastType: 'Gourmet', format: 'Grano', weight: '250g', stock: 18, category: gourmet },
        { name: 'Café de Altura (Molido)', description: 'Cultivado sobre los 1800 msnm, dulzura natural.', shortDescription: 'Dulzura natural de altura', price: 310, image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=600&q=80', roastType: 'Gourmet', format: 'Molido', weight: '250g', stock: 18, category: gourmet },
        { name: 'Mezcla Tradicional', description: 'Blend accesible para el consumo diario.', shortDescription: 'Blend accesible del día a día', price: 95, image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0b9?w=600&q=80', roastType: 'Clásico', format: 'Molido', weight: '250g', stock: 30, category: clasico },
        { name: 'Notas Florales (Grano)', description: 'Perfil delicado con toques a jazmín y cítricos.', shortDescription: 'Toques a jazmín y cítricos', price: 210, image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=600&q=80', roastType: 'Gourmet', format: 'Grano', weight: '250g', stock: 12, category: gourmet },
        { name: 'Notas Florales (Molido)', description: 'Perfil delicado con toques a jazmín y cítricos.', shortDescription: 'Toques a jazmín y cítricos', price: 210, image: 'https://images.unsplash.com/photo-1516224498413-84ecf3a1e7fd?w=600&q=80', roastType: 'Gourmet', format: 'Molido', weight: '250g', stock: 12, category: gourmet },
        { name: 'Edición Limitada Cosecha', description: 'Lote exclusivo de temporada, disponibilidad reducida.', shortDescription: 'Lote exclusivo de temporada', price: 390, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80', roastType: 'Gourmet', format: 'Grano', weight: '250g', stock: 8, category: gourmet },
    ]

    await Product.insertMany(productsData)

    const hashedPassword = await bcrypt.hash('123456', 10)
    const usersWithPassword = usersData.map((u) => ({ ...u, password: hashedPassword }))
    await User.insertMany(usersWithPassword)

    console.log('✅ Listo: 10 categorías, 12 productos, 10 usuarios (contraseña de todos: 123456)')
    process.exit(0)
}

seed()
