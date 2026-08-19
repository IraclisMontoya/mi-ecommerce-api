import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        shortDescription: { type: String },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        roastType: { type: String, enum: ['Clásico', 'Gourmet'], required: true },
        format: { type: String, enum: ['Grano', 'Molido'], required: true },
        weight: { type: String },
        stock: { type: Number, default: 0 },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    },
    { timestamps: true }
)

export default mongoose.model('Product', productSchema)