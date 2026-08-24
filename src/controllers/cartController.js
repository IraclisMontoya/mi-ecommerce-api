import Cart from '../models/Cart.js'

export async function getCart(req, res) {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] })
    }
    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito.', error: error.message })
  }
}

export async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body

    let cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] })
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId)

    if (existingItem) {
      existingItem.quantity += quantity || 1
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 })
    }

    await cart.save()
    await cart.populate('items.product')
    res.status(201).json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar al carrito.', error: error.message })
  }
}

export async function removeFromCart(req, res) {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado.' })
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId)
    await cart.save()
    await cart.populate('items.product')
    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar del carrito.', error: error.message })
  }
}

export async function updateCartItem(req, res) {
  try {
    const { quantity } = req.body
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado.' })
    }

    const item = cart.items.find((item) => item.product.toString() === req.params.productId)
    if (!item) {
      return res.status(404).json({ message: 'Producto no está en el carrito.' })
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId)
    } else {
      item.quantity = quantity
    }

    await cart.save()
    await cart.populate('items.product')
    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el carrito.', error: error.message })
  }
}