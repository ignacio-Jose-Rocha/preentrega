import { useState } from 'react'
import { useCartContext } from '../../context/CartContext'
import { useAuthContext } from '../../context/AuthContext'
import './ItemDetail.css'

function ItemDetail({ product }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCartContext()
  const { user } = useAuthContext()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    alert('Producto agregado al carrito')
  }

  return (
    <div className="item-detail">
      <div className="item-detail-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="item-detail-info">
        <h1>{product.name}</h1>
        <p className="item-detail-price">${product.price}</p>
        <p className="item-detail-description">{product.description}</p>
        {user?.role !== 'admin' && (
          <div className="item-detail-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Agregar al Carrito
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemDetail