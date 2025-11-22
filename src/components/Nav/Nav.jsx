import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useAuthContext } from '../../context/AuthContext'
import './Nav.css'

function Nav() {
  const { getCartQuantity } = useCartContext()
  const { user } = useAuthContext()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">eCommerce</Link>
      <div className="navbar-nav">
        <Link to="/" className="nav-link">Productos</Link>
        <Link to="/cart" className="nav-link">
          Carrito ({getCartQuantity()})
        </Link>
        {user?.role === 'admin' && (
          <Link to="/admin/products" className="nav-link">Admin</Link>
        )}
        <Link to="/login" className="nav-link">{user ? user.username : 'Login'}</Link>
      </div>
    </nav>
  )
}

export default Nav