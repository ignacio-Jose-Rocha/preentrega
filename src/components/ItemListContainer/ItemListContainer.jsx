import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import { getProducts } from '../../services/api'
import './ItemListContainer.css'

function ItemListContainer() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="loading">Cargando productos...</div>

  return (
    <div className="item-list-container">
      <h1>Productos</h1>
      <ItemList products={products} />
    </div>
  )
}

export default ItemListContainer