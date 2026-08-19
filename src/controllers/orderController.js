import Order from '../models/Order.js'
import Cart from '../models/Cart.js'

export async function createOrder(req, res) {
    try {
        const { shippingAddress } = req.body

        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Tu carrito está vacío.' })
        }

        const items = cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        }))

        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

        const order = await Order.create({
            user: req.user.id,
            items,
            total,
            shippingAddress,
        })

        cart.items = []
        await cart.save()

        res.status(201).json(order)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden.', error: error.message })
    }
}

export async function getMyOrders(req, res) {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product')
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener órdenes.', error: error.message })
    }
}
