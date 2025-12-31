import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';

// Import all pages
import { HomePage } from './pages/Home';
import { ProductsPage } from './pages/Products';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { WishlistPage } from './pages/Wishlist';
import { ProfilePage } from './pages/Profile';
import { OrdersPage } from './pages/Orders';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';
import { FAQPage } from './pages/FAQ';
import { DealsPage } from './pages/Deals';
import { TrackOrderPage } from './pages/TrackOrder';
import { ReturnsPage } from './pages/Returns';
import { ShippingPage } from './pages/Shipping';
import { PrivacyPage } from './pages/Privacy';
import { TermsPage } from './pages/Terms';
import { ProductDetailsPage } from './pages/ProductDetails';
import { AdminDashboardPage } from './pages/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Helper function to navigate to product detail
  const goToProductDetails = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
  };

  // Helper function to render the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage goToProductDetails={goToProductDetails} setCurrentPage={setCurrentPage} />;

      case 'products':
        return <ProductsPage goToProductDetails={goToProductDetails} setCurrentPage={setCurrentPage} />;

      case 'product-detail':
        return (
          <ProductDetailsPage
            productId={selectedProductId}
            setCurrentPage={setCurrentPage}
          />
        );

      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;

      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPage} />;

      case 'cart':
        return <CartPage setCurrentPage={setCurrentPage} />;

      case 'checkout':
        return <CheckoutPage setCurrentPage={setCurrentPage} />;

      case 'wishlist':
        return <WishlistPage setCurrentPage={setCurrentPage} goToProductDetails={goToProductDetails} />;

      case 'orders':
        return <OrdersPage setCurrentPage={setCurrentPage} />;

      case 'profile':
        return <ProfilePage setCurrentPage={setCurrentPage} />;

      case 'about':
        return <AboutPage />;

      case 'contact':
        return <ContactPage />;

      case 'faq':
        return <FAQPage />;

      case 'deals':
        return <DealsPage goToProductDetails={goToProductDetails} />;

      case 'track-order':
        return <TrackOrderPage />;

      case 'returns':
        return <ReturnsPage />;

      case 'shipping':
        return <ShippingPage />;

      case 'privacy':
        return <PrivacyPage />;

      case 'terms':
        return <TermsPage />;

      case 'admin-dashboard':
        return <AdminDashboardPage setCurrentPage={setCurrentPage} />;

      default:
        return <HomePage goToProductDetails={goToProductDetails} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="flex-grow">
            {renderPage()}
          </main>
          <Footer setCurrentPage={setCurrentPage} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;