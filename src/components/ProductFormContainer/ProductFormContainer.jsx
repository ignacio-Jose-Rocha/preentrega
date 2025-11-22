import { useState, useEffect } from 'react'
import { createProduct, getProducts, updateProduct, deleteProduct } from '../../services/api'
import './ProductFormContainer.css'

function ProductFormContainer() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  })
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const data = await getProducts()
    setProducts(data)
  }

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!product.name) {
      setMessage('El nombre es obligatorio')
      return
    }
    
    if (product.price <= 0) {
      setMessage('El precio debe ser mayor a 0')
      return
    }
    
    if (product.description.length < 10) {
      setMessage('La descripción debe tener al menos 10 caracteres')
      return
    }

    setLoading(true)
    const productData = {
      name: product.name,
      price: parseFloat(product.price),
      description: product.description,
      image: product.image || 'https://via.placeholder.com/300'
    }

    let result
    if (editingId) {
      result = await updateProduct(editingId, productData)
      setMessage('Producto actualizado exitosamente')
      setEditingId(null)
    } else {
      result = await createProduct(productData)
      setMessage('Producto creado exitosamente')
    }
    
    if (result) {
      setProduct({ name: '', price: '', description: '', image: '' })
      loadProducts()
    } else {
      setMessage('Error al guardar el producto')
    }
    setLoading(false)
  }

  const handleEdit = (prod) => {
    setProduct({
      name: prod.name,
      price: prod.price,
      description: prod.description,
      image: prod.image
    })
    setEditingId(prod.id)
    setMessage('')
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      await deleteProduct(id)
      loadProducts()
      setMessage('Producto eliminado')
    }
  }

  const handleCancel = () => {
    setProduct({ name: '', price: '', description: '', image: '' })
    setEditingId(null)
    setMessage('')
  }

  return (
    <div className="product-form-container">
      <h1>{editingId ? 'Editar Producto' : 'Agregar Producto'}</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        {message && <div className="message">{message}</div>}
        
        <div className="form-group">
          <label htmlFor="name">Nombre *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción *</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            minLength="10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">URL de Imagen</label>
          <input
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="products-list">
        <h2>Productos Existentes</h2>
        {products.map(prod => (
          <div key={prod.id} className="product-item">
            <img src={prod.image} alt={prod.name} />
            <div className="product-info">
              <h3>{prod.name}</h3>
              <p>${prod.price}</p>
            </div>
            <div className="product-actions">
              <button onClick={() => handleEdit(prod)} className="edit-btn">Editar</button>
              <button onClick={() => handleDelete(prod.id)} className="delete-btn">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductFormContainer