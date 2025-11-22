import { Link } from 'react-router-dom'
import './Item.css'

function Item({ product }) {
  return (
    <div className="item-card">
      <img src={product.image} alt={product.name} className="item-image" />
      <div className="item-content">
        <h3 className="item-title">{product.name}</h3>
        <p className="item-price">${product.price}</p>
        <Link to={`/product/${product.id}`} className="item-button">
          Ver Detalle
        </Link>
      </div>
    </div>
  )
}

export default Item