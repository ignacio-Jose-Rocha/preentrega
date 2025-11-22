import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail'
import { getProductById } from '../../services/api'
import './ItemDetailContainer.css'

function ItemDetailContainer() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    getProductById(id).then(data => {
      setProduct(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div className="loading">Cargando producto...</div>
  if (!product) return <div className="error">Producto no encontrado</div>

  return (
    <div className="item-detail-container">
      <ItemDetail product={product} />
    </div>
  )
}

export default ItemDetailContainer