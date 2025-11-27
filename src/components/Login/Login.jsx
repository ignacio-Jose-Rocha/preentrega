import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, user, logout } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(username, password)) {
      navigate('/')
    } else {
      setError('Credenciales incorrectas')
    }
  }

  if (user) {
    return (
      <div className="login-container">
        <div className="login-form">
          <h2>Bienvenido, {user.username}</h2>
          <button onClick={logout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Iniciar Sesión
        </button>
        <p className="login-hint">Admin: admin/1234 | Cliente: cliente/1234</p>
      </form>
    </div>
  )
}

export default Login