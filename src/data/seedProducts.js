const API_URL = 'https://692115e4512fb4140bdf5438.mockapi.io/products/products'

const products = [
  { name: 'Laptop HP', price: 899, category: 'electronics', stock: 15, image: 'https://picsum.photos/seed/laptop1/300/200' },
  { name: 'Mouse Logitech', price: 29, category: 'electronics', stock: 50, image: 'https://picsum.photos/seed/mouse1/300/200' },
  { name: 'Teclado Mecánico', price: 79, category: 'electronics', stock: 30, image: 'https://picsum.photos/seed/keyboard1/300/200' },
  { name: 'Monitor Samsung 24"', price: 199, category: 'electronics', stock: 20, image: 'https://picsum.photos/seed/monitor1/300/200' },
  { name: 'Auriculares Sony', price: 149, category: 'electronics', stock: 25, image: 'https://picsum.photos/seed/headphones1/300/200' },
  { name: 'Webcam Logitech', price: 69, category: 'electronics', stock: 40, image: 'https://picsum.photos/seed/webcam1/300/200' },
  { name: 'SSD 1TB', price: 119, category: 'electronics', stock: 35, image: 'https://picsum.photos/seed/ssd1/300/200' },
  { name: 'RAM 16GB', price: 89, category: 'electronics', stock: 45, image: 'https://picsum.photos/seed/ram1/300/200' }
]

async function seedProducts() {
  for (const product of products) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })
      const data = await response.json()
      console.log('Created:', data.name)
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

seedProducts()
