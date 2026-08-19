import Category from '../models/Category.js'

export async function getCategories(req, res) {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías.', error: error.message })
    }
}

export async function createCategory(req, res) {
    try {
        const { name, description } = req.body
        if (!name) {
            return res.status(400).json({ message: 'El nombre es obligatorio.' })
        }
        const category = await Category.create({ name, description })
        res.status(201).json(category)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear categoría.', error: error.message })
    }
}