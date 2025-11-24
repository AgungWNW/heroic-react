import React from 'react';
function Header({ cartCount }) {
  return (
    <header
      style={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: '20px 0',
        
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: 32, color:"rgba(46, 46, 46, 1)"}}>🛍️ Super Market Pak Dodik</h1>
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '10px 20px',
            borderRadius: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 24 }}>🛒Keranjang :</span>
          <span style={{ fontSize: 18, fontWeight: 'bold' }}>
            {cartCount}
          </span>
        </div>
      </div>
    </header>
  );
}

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="🔍 Cari Produk Disini"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{
        width: '100%',
        maxWidth: 500,
        padding: '15px 25px',
        fontSize: 16,
        borderRadius: 50,
        border: '2px solid rgba(255,255,255,0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.27)',
        color: 'black',
        backdropFilter: 'blur(10px)',
        outline: 'none',
        transition: 'all 0.3s',
      }}
    />
  );
}
function ProductCard({ product, isInCart, onToggleCart }) {
  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 20,
        backdropFilter: 'blur(10px)',
        border: isInCart
          ? '2px solid #6bcf7f'
          : '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        transition: 'all 0.3s',
        cursor: 'pointer',
        position: 'relative',
        animation: 'slideIn 0.5s ease-out',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow =
          '0 12px 48px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow =
          '0 8px 32px rgba(0,0,0,0.2)';
      }}
    >
      {isInCart && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: '#6bcf7f',
            color: 'white',
            padding: '6px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 'bold',
            zIndex: 2,
          }}
        >
          ✓ Masuk Keranjang
        </div>
      )}

      <div
        style={{
          width: '100%',
          height: 220,
          overflow: 'hidden',
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s',
          }}
        />
      </div>

      <span
        style={{
          display: 'inline-block',
          padding: '4px 10px',
          backgroundColor: '#667eea',
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 'bold',
          marginBottom: 10,
          alignSelf: 'flex-start',
          textTransform: 'uppercase',
        }}
      >
        {product.category}
      </span>

      <h3
        style={{
          margin: '0 0 10px',
          fontSize: 18,
          fontWeight: 600,
          lineHeight: 1.4,
        }}
      >
        {product.title}
      </h3>

      <p
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: 13,
          margin: '0 0 15px',
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {product.description.length > 90
          ? product.description.substring(0, 90) + '...'
          : product.description}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 'bold' }}>
          ${product.price}
        </div>
      </div>


      <button
        onClick={() => onToggleCart(product.id)}
        style={{
          width: '100%',
          padding: 12,
          fontSize: 14,
          fontWeight: 'bold',
          backgroundColor: isInCart ? '#ff6b6b' : '#6bcf7f',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          transition: 'all 0.2s',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.opacity = 0.9;
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.opacity = 1;
        }}
      >
        {isInCart ? '🗑️ Hapus Dari Keranjang' : '🛒 Tambah Ke Keranjang'}
      </button>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cart, setCart] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('default');
  const fetchProducts = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    
        try {
          const response = await fetch(
            'https://dummyjson.com/products?limit=20',
          );
    
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
    
          const data = await response.json();
          setProducts(data.products);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, []);
    
      React.useEffect(() => {
        fetchProducts();
      }, [fetchProducts]);
    
      const categories = React.useMemo(() => {
        const cats = [...new Set(products.map((p) => p.category))];
        return ['all', ...cats];
      }, [products]);
    
      const displayedProducts = React.useMemo(() => {
        let filtered = products;
    
        if (searchTerm) {
          filtered = filtered.filter(
            (product) =>
              product.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              product.category
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
          );
        }
    
        if (selectedCategory !== 'all') {
          filtered = filtered.filter(
            (p) => p.category === selectedCategory,
          );
        }
    
        return filtered;
      }, [products, searchTerm, selectedCategory, sortBy]);
    
      const toggleCart = (productId) => {
        setCart((prev) => {
          if (prev.includes(productId)) {
            return prev.filter((id) => id !== productId);
          } else {
            return [...prev, productId];
          }
        });
      };
    
      const clearCart = () => {
        setCart([]);
      };

    if (error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: 20,
        }}
      >
        <h1 style={{ fontSize: 48, marginBottom: 20 }}>❌</h1>
        <h2 style={{ fontSize: 32, marginBottom: 10 }}>
          Oops! Somting Wong
        </h2>
        <p style={{ fontSize: 18, opacity: 0.8 }}>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: 20,
            padding: '12px 24px',
            fontSize: 16,
            backgroundColor: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Try Again
        </button>
      </div>
    );}

    if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            border: '4px solid rgba(255,255,255,0.2)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            width: 60,
            height: 60,
            animation: 'spin 1s linear infinite',
            marginBottom: 20,
          }}
        ></div>
        <p style={{ fontSize: 20 }}>Loading Lurr...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header cartCount={cart.length} />

      <main
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            marginBottom: 40,
          }}
        >
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <div
            style={{
              display: 'flex',
              gap: 15,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '10px 20px',
                fontSize: 14,
                borderRadius: 8,
                border: '2px solid rgba(255,255,255,0.3)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  style={{ color: 'black' }}
                >
                  {cat === 'all' ? '📁 Semua Kategori' : `📦 ${cat}`}
                </option>
              ))}
            </select>

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  padding: '10px 20px',
                  fontSize: 14,
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
                onMouseLeave={(e) => (e.target.style.opacity = 1)}
              >
                🗑️ Bersihkan Keranjang
              </button>
            )}
          </div>
        </div>

        <p
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginBottom: 30,
            opacity: 0.9,
          }}
        >
          Showing <strong>{displayedProducts.length}</strong> of{' '}
          <strong>{products.length}</strong> products
          {cart.length > 0 && ` | 🛒 ${cart.length} items in cart`}
        </p>

        {displayedProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 30,
            }}
          >
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInCart={cart.includes(product.id)}
                onToggleCart={toggleCart}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 16,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ fontSize: 80, marginBottom: 20 }}>🔍</div>
            <p style={{ fontSize: 28, marginBottom: 10 }}>
              No products found
            </p>
            <p style={{ opacity: 0.7, fontSize: 16 }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>

      <footer
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          textAlign: 'center',
          padding: '30px 20px',
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: 16, opacity: 0.8 }}>
          Heroic React Project 
          copyright © 2024 Super Market Pak Dodik (agungwnw)
        </p>
        <p style={{ fontSize: 14, opacity: 0.6, marginTop: 10 }}>
          Built a React with Kak Danny Cahyo • Powered by DummyJSON API
        </p>
      </footer>
    </div>
  );
}
