import Product from '../models/Product.js'

export async function getProducts(req, res) {
    try {
        const products = await Product.find().populate('category', 'name')
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos.', error: error.message })
    }
}

export async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name')
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado.' })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener producto.', error: error.message })
    }
}

export async function createProduct(req, res) {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear producto.', error: error.message })
    }
}