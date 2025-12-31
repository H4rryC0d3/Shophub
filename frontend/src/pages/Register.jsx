import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import '../styles/Register.css';

export const RegisterPage = ({ setCurrentPage }) => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    setLoading(false);
    
    if (result.success) {
      setCurrentPage('home');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-icon-wrapper">
          <UserPlus size={48} className="register-icon" />
        </div>
        <h2 className="register-title">Register</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="register-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              required
              placeholder="John Doe"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
              required
              placeholder="your@email.com"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="form-input"
              required
              placeholder="At least 6 characters"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="form-input"
              required
              placeholder="Re-enter password"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </div>
        
        <p className="login-prompt">
          Already have an account?{' '}
          <button
            onClick={() => setCurrentPage('login')}
            className="login-link"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};