import { createProduct } from '../actions'
import { ProductForm } from '../ProductForm'

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-8">Add Product</h1>
      <ProductForm action={createProduct} />
    </div>
  )
}
