import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
})

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [orderItemSchema],
        total: { type: Number, required: true },
        shippingAddress: {
            fullName: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true },
            zip: { type: String, required: true },
            phone: { type: String, required: true },
        },
        paymentMethod: { type: String, enum: ['tarjeta', 'paypal', 'applepay', 'oxxo'], required: true },
        paymentReference: { type: String },
        status: { type: String, enum: ['pendiente', 'pagado', 'enviado', 'entregado'], default: 'pendiente' },
    },
    { timestamps: true }
)

export default mongoose.model('Order', orderSchema)