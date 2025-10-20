import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para comenzar</p>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-info">
            <h3>{item.title}</h3>
            <p className="price">${item.price}</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="btn"
                style={{ width: '40px', padding: '5px' }}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="btn"
                style={{ width: '40px', padding: '5px' }}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="btn btn-danger"
              style={{ marginTop: '10px' }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <p>Total: ${getTotal().toFixed(2)}</p>
        <button onClick={clearCart} className="btn btn-danger" style={{ marginTop: '10px' }}>
          Vaciar Carrito
        </button>
      </div>
    </div>
  )
}

export default Cart
