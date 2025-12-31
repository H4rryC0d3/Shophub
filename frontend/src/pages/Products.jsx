import { useEffect, useState } from 'react';
import api from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import '../styles/Products.css';

export const ProductsPage = ({ goToProductDetail }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  });

  // Check for selected category from HomePage on component mount
  useEffect(() => {
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
      // Convert category name to lowercase and handle "Home & Garden" case
      let categoryValue = selectedCategory.toLowerCase();
      if (categoryValue === 'home & garden') {
        categoryValue = 'home';
      }
      
      setFilters(prev => ({ ...prev, category: categoryValue }));
      
      // Clear the stored category after using it
      localStorage.removeItem('selectedCategory');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      
      if (filters.search) params.search = filters.search;
      if (filters.category !== 'all') params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.sort) params.sort = filters.sort;

      const data = await api.getProducts(params);
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      minPrice: '',
      maxPrice: '',
      sort: 'newest'
    });
  };

  // Get display name for selected category
  const getCategoryDisplayName = () => {
    const categoryMap = {
      'electronics': 'Electronics',
      'clothing': 'Clothing',
      'home': 'Home & Garden',
      'sports': 'Sports',
      'books': 'Books',
      'toys': 'Toys',
      'other': 'Other'
    };
    return categoryMap[filters.category] || 'All Products';
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h2 className="products-title">
          {filters.category !== 'all' ? getCategoryDisplayName() : 'All Products'}
        </h2>
        {filters.category !== 'all' && (
          <button 
            onClick={() => handleFilterChange('category', 'all')}
            className="clear-category-btn"
            title="Clear category filter"
          >
            <X size={16} />
            <span>Clear Category</span>
          </button>
        )}
      </div>
      
      {/* Filters Section */}
      <div className="filters-container">
        <div className="filters-header">
          <SlidersHorizontal size={20} className="filters-icon" />
          <h3 className="filters-title">Filters</h3>
        </div>
        
        <div className="filters-grid">
          {/* Search */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
          </div>
          
          {/* Category */}
          <select 
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Garden</option>
            <option value="sports">Sports</option>
            <option value="books">Books</option>
            <option value="toys">Toys</option>
            <option value="other">Other</option>
          </select>
          
          {/* Min Price */}
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className="filter-input"
          />
          
          {/* Max Price */}
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="filter-input"
          />
          
          {/* Sort */}
          <select 
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A-Z</option>
            <option value="name_desc">Name: Z-A</option>
          </select>
        </div>
        
        {/* Active Filters Display */}
        {(filters.search || filters.category !== 'all' || filters.minPrice || filters.maxPrice) && (
          <div className="active-filters">
            <span className="active-filters-label">Active Filters:</span>
            {filters.search && (
              <span className="filter-tag">
                Search: "{filters.search}"
                <button onClick={() => handleFilterChange('search', '')} className="filter-tag-close">
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.category !== 'all' && (
              <span className="filter-tag">
                Category: {getCategoryDisplayName()}
                <button onClick={() => handleFilterChange('category', 'all')} className="filter-tag-close">
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.minPrice && (
              <span className="filter-tag">
                Min: ${filters.minPrice}
                <button onClick={() => handleFilterChange('minPrice', '')} className="filter-tag-close">
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.maxPrice && (
              <span className="filter-tag">
                Max: ${filters.maxPrice}
                <button onClick={() => handleFilterChange('maxPrice', '')} className="filter-tag-close">
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        )}
        
        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="reset-filters-button"
        >
          Reset All Filters
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading products...</div>
        </div>
      ) : products.length === 0 ? (
        <div className="no-products-container">
          <p className="no-products-text">No products found</p>
          <button
            onClick={resetFilters}
            className="clear-filters-button"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="products-count-container">
            <p className="products-count">
              Showing <span className="count-number">{products.length}</span> {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard 
                key={product._id} 
                product={product}
                goToProductDetail={goToProductDetail}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};