const API_URL = 'https://67680e0fcbf3d7cefd3a0e2e.mockapi.io/api/products'

let localProducts = []

export const getProducts = async () => {
  try {
    const response = await fetch(API_URL)
    if (response.ok) {
      const data = await response.json()
      localProducts = data
      return data
    }
  } catch (error) {
    console.error('API error:', error)
  }
  return localProducts
}

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('API error:', error)
  }
  return localProducts.find(p => p.id === id)
}

export const createProduct = async (product) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    if (response.ok) {
      const newProduct = await response.json()
      localProducts.push(newProduct)
      return newProduct
    }
  } catch (error) {
    console.error('API error:', error)
  }
  const newProduct = { ...product, id: Date.now().toString() }
  localProducts.push(newProduct)
  return newProduct
}

export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    if (response.ok) {
      const updated = await response.json()
      localProducts = localProducts.map(p => p.id === id ? updated : p)
      return updated
    }
  } catch (error) {
    console.error('API error:', error)
  }
  localProducts = localProducts.map(p => p.id === id ? { ...product, id } : p)
  return { ...product, id }
}

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      localProducts = localProducts.filter(p => p.id !== id)
      return true
    }
  } catch (error) {
    console.error('API error:', error)
  }
  localProducts = localProducts.filter(p => p.id !== id)
  return true
}
