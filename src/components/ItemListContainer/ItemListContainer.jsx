import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import { getProducts } from '../../services/api'
import './ItemListContainer.css'

function ItemListContainer() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const loadProducts = () => {
    setLoading(true)
    getProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  if (loading) return <div className="loading">Cargando productos...</div>

  return (
    <div className="item-list-container">
      <h1>Productos</h1>
      <ItemList products={products} onDelete={loadProducts} />
    </div>
  )
}

export default ItemListContainer