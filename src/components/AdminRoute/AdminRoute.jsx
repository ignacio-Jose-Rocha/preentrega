import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

function AdminRoute({ children }) {
  const { user, loading } = useAuthContext()

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return children
}

export default AdminRoute