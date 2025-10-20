import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="loading">Cargando producto...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!product) return <div className="error">Producto no encontrado</div>

  return (
    <div className="product-detail">
      <button onClick={() => navigate('/')} className="btn" style={{ width: 'auto', marginBottom: '20px' }}>
        ← Volver
      </button>
      <div className="product-detail-content">
        <div>
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-info">
          <h2>{product.title}</h2>
          <p className="price">${product.price}</p>
          <p>{product.description}</p>
          <p><strong>Categoría:</strong> {product.category}</p>
          <button onClick={() => addToCart(product)} className="btn">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
