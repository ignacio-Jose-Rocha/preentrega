import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Nav from './components/Nav/Nav'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import ProductFormContainer from './components/ProductFormContainer/ProductFormContainer'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AdminRoute from './components/AdminRoute/AdminRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/product/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/products" element={<AdminRoute><ProductFormContainer /></AdminRoute>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
