import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { getItemCount } = useCart()
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>eCommerce</h1>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/">Productos</Link>
          <Link to="/cart">
            Carrito
            {getItemCount() > 0 && (
              <span className="cart-badge">{getItemCount()}</span>
            )}
          </Link>
          {user ? (
            <>
              <span>Hola, {user.username}</span>
              <button onClick={logout} className="btn" style={{ width: 'auto', padding: '5px 15px' }}>
                Salir
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
