import { Router } from 'express'
import { protect } from '../middlewares/auth.js'
import { createOrder, getMyOrders } from '../controllers/orderController.js'

const router = Router()

router.use(protect)

router.get('/', getMyOrders)
router.post('/', createOrder)

export default router
