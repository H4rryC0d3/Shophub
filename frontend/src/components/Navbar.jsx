import { useContext, useState } from 'react';
import { ShoppingCart, User, LogOut, Home, Heart, Menu, X, Shield, Package, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import '../styles/Navbar.css';

export const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount, wishlistCount } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (page) => currentPage === page;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo Section */}
          <div className="navbar-left">
            <div 
              className="navbar-logo" 
              onClick={() => setCurrentPage('home')}
            >
              <div className="logo-icon">
                <Sparkles size={24} />
              </div>
              <span className="logo-text">Harry’s Store</span>
              <div className="logo-badge">Shop</div>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="navbar-links">
              <button 
                onClick={() => setCurrentPage('home')} 
                className={`nav-link ${isActive('home') ? 'active' : ''}`}
              >
                <Home size={18} />
                <span>Home</span>
              </button>
              <button 
                onClick={() => setCurrentPage('products')} 
                className={`nav-link ${isActive('products') ? 'active' : ''}`}
              >
                <Package size={18} />
                <span>Products</span>
              </button>
              <button 
                onClick={() => setCurrentPage('deals')} 
                className={`nav-link ${isActive('deals') ? 'active' : ''}`}
              >
                <Sparkles size={18} />
                <span>Deals</span>
              </button>
              <button 
                onClick={() => setCurrentPage('about')} 
                className={`nav-link ${isActive('about') ? 'active' : ''}`}
              >
                <span>About</span>
              </button>
              <button 
                onClick={() => setCurrentPage('contact')} 
                className={`nav-link ${isActive('contact') ? 'active' : ''}`}
              >
                <span>Contact</span>
              </button>
            </div>
          </div>
          
          {/* Right Section - Icons & Auth */}
          <div className="navbar-right">
            {/* Orders Button with Icon + Text */}
            <button 
              onClick={() => setCurrentPage('orders')} 
              className={`nav-icon-btn-with-text ${isActive('orders') ? 'active' : ''}`}
              title="My Orders"
            >
              <Package size={20} />
              <span>Orders</span>
            </button>

            {/* Wishlist Button with Icon + Text */}
            <button 
              onClick={() => setCurrentPage('wishlist')} 
              className={`nav-icon-btn-with-text ${isActive('wishlist') ? 'active' : ''}`}
              title="Wishlist"
            >
              <Heart size={20} />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="nav-badge wishlist-badge">{wishlistCount}</span>
              )}
            </button>
            
            {/* Cart Button with Icon + Text */}
            <button 
              onClick={() => setCurrentPage('cart')} 
              className={`nav-icon-btn-with-text cart-btn ${isActive('cart') ? 'active' : ''}`}
              title="Shopping Cart"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="nav-badge cart-badge">{cartCount}</span>
              )}
            </button>
            
            {/* User Section or Auth Buttons */}
            {user ? (
              <div className="user-section">
                <button 
                  onClick={() => setCurrentPage('profile')} 
                  className={`user-profile-btn ${isActive('profile') ? 'active' : ''}`}
                >
                  <div className="user-avatar">
                    <User size={18} />
                  </div>
                  <span className="user-name">{user.name}</span>
                </button>
                
                {user.role === 'admin' && (
                  <button
                    onClick={() => setCurrentPage('admin-dashboard')}
                    className={`admin-btn ${isActive('admin-dashboard') ? 'active' : ''}`}
                  >
                    <Shield size={18} />
                    <span>Admin</span>
                  </button>
                )}
                
                <button
                  onClick={logout}
                  className="logout-btn"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="login-btn"
                >
                  <User size={18} />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => setCurrentPage('register')}
                  className="register-btn"
                >
                  <span>Sign Up</span>
                </button>
              </div>
            )}
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <>
            <div 
              className="mobile-menu-overlay" 
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="mobile-menu">
              <div className="mobile-menu-header">
                <h3>Menu</h3>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-close"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mobile-menu-content">
                <button 
                  onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} 
                  className={`mobile-menu-item ${isActive('home') ? 'active' : ''}`}
                >
                  <Home size={20} />
                  <span>Home</span>
                </button>
                <button 
                  onClick={() => { setCurrentPage('products'); setMobileMenuOpen(false); }} 
                  className={`mobile-menu-item ${isActive('products') ? 'active' : ''}`}
                >
                  <Package size={20} />
                  <span>Products</span>
                </button>
                <button 
                  onClick={() => { setCurrentPage('orders'); setMobileMenuOpen(false); }} 
                  className={`mobile-menu-item ${isActive('orders') ? 'active' : ''}`}
                >
                  <Package size={20} />
                  <span>My Orders</span>
                </button>
                <button 
                  onClick={() => { setCurrentPage('deals'); setMobileMenuOpen(false); }} 
                  className={`mobile-menu-item ${isActive('deals') ? 'active' : ''}`}
                >
                  <Sparkles size={20} />
                  <span>Deals</span>
                </button>
                <button 
                  onClick={() => { setCurrentPage('wishlist'); setMobileMenuOpen(false); }} 
                  className={`mobile-menu-item ${isActive('wishlist') ? 'active' : ''}`}
                >
                  <Heart size={20} />
                  <span>Wishlist</span>
                  {wishlistCount > 0 && <span className="mobile-badge">{wishlistCount}</span>}
                </button>
                <button 
                  onClick={() => { setCurrentPage('cart'); setMobileMenuOpen(false); }} 
                  className={`mobile-menu-item ${isActive('cart') ? 'active' : ''}`}
                >
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                  {cartCount > 0 && <span className="mobile-badge">{cartCount}</span>}
                </button>
                
                <div className="mobile-menu-divider" />
                
                <button 
                  onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} 
                  className={`mobile-menu-item ${isActive('about') ? 'active' : ''}`}
                >
                  <span>About</span>
                </button>
                <button 
                  onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} 
                  className={`mobile-menu-item ${isActive('contact') ? 'active' : ''}`}
                >
                  <span>Contact</span>
                </button>
                
                {user && (
                  <>
                    <div className="mobile-menu-divider" />
                    <button 
                      onClick={() => { setCurrentPage('profile'); setMobileMenuOpen(false); }} 
                      className={`mobile-menu-item ${isActive('profile') ? 'active' : ''}`}
                    >
                      <User size={20} />
                      <span>Profile</span>
                    </button>
                    {user.role === 'admin' && (
                      <button 
                        onClick={() => { setCurrentPage('admin-dashboard'); setMobileMenuOpen(false); }} 
                        className={`mobile-menu-item ${isActive('admin-dashboard') ? 'active' : ''}`}
                      >
                        <Shield size={20} />
                        <span>Admin Dashboard</span>
                      </button>
                    )}
                    <button 
                      onClick={() => { logout(); setMobileMenuOpen(false); }} 
                      className="mobile-menu-item logout"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </>
                )}
                
                {!user && (
                  <>
                    <div className="mobile-menu-divider" />
                    <button 
                      onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }} 
                      className="mobile-menu-item login"
                    >
                      <User size={20} />
                      <span>Login</span>
                    </button>
                    <button 
                      onClick={() => { setCurrentPage('register'); setMobileMenuOpen(false); }} 
                      className="mobile-menu-item register"
                    >
                      <span>Sign Up</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};