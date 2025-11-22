import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { deleteProduct } from '../../services/api'
import './Item.css'

function Item({ product, onDelete }) {
  const { user } = useAuthContext()

  const handleDelete = async () => {
    if (window.confirm('¿Eliminar este producto?')) {
      await deleteProduct(product.id)
      onDelete()
    }
  }

  return (
    <div className="item-card">
      <img src={product.image} alt={product.name} className="item-image" />
      <div className="item-content">
        <h3 className="item-title">{product.name}</h3>
        <p className="item-price">${product.price}</p>
        <Link to={`/product/${product.id}`} className="item-button">
          Ver Detalle
        </Link>
        {user?.role === 'admin' && (
          <button onClick={handleDelete} className="item-delete">
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}

export default Item