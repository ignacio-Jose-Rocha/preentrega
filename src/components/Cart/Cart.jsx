import { useCartContext } from '../../context/CartContext'
import './Cart.css'

function Cart() {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCartContext()

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Carrito de Compras</h1>
        <p className="empty-cart">Tu carrito está vacío</p>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.price}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button 
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${getCartTotal().toFixed(2)}</h3>
        <button className="clear-cart-btn" onClick={clearCart}>
          Vaciar Carrito
        </button>
      </div>
    </div>
  )
}

export default Cart