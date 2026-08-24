import { Router } from 'express'
import { protect } from '../middlewares/auth.js'
import { getCart, addToCart, removeFromCart, updateCartItem } from '../controllers/cartController.js'
const router = Router()

router.use(protect)

router.get('/', getCart)
router.post('/', addToCart)
router.delete('/:productId', removeFromCart)
router.patch('/:productId', updateCartItem)

export default router
