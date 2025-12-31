import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import '../styles/Login.css';

export const LoginPage = ({ setCurrentPage }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      setCurrentPage('home');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-icon-wrapper">
          <LogIn size={48} className="login-icon" />
        </div>
        <h2 className="login-title">Login</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
              placeholder="your@email.com"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        
        <p className="signup-prompt">
          Don't have an account?{' '}
          <button
            onClick={() => setCurrentPage('register')}
            className="signup-link"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};