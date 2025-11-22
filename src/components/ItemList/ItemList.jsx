import Item from '../Item/Item'
import './ItemList.css'

function ItemList({ products, onDelete }) {
  return (
    <div className="item-list">
      {products.map(product => (
        <Item key={product.id} product={product} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default ItemList