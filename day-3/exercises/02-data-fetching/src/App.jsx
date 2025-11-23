import React from 'react';

// Starter: data fetching exercise
// This file provides a ProductCard component and an empty App.
// Your task: fetch products from https://dummyjson.com/products?limit=12 and display them.

function ProductCard({ product }) {
  return (
    <div className="card" style={{ textAlign: 'left' }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          width: '100%',
          height: 200,
          objectFit: 'cover',
          borderRadius: 8,
          marginBottom: 15,
        }}
      />
      <h3>{product.title}</h3>
      <p style={{ opacity: 0.8, fontSize: 14 }}>
        {product.description.substring(0, 80)}...
      </p>
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span style={{ fontSize: 24, fontWeight: 'bold' }}>
          ${product.price}
        </span>
        <span style={{ color: '#ffd700' }}>⭐ {product.rating}</span>
      </div>
    </div>
  );
}

export default function App() {
  // TODO: Create state for products, loading, and error.
  // TODO: Use useEffect to fetch data from 'https://dummyjson.com/products?limit=12'
  // TODO: Handle loading state and error state.
  // TODO: Display the products in a grid below.
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const response = await fetch(
            'https://dummyjson.com/products?limit=12',
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
      };
  
      fetchProducts();
    }, []);

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
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center', fontSize: 48 }}>
        Product Showcase
      </h1>

      {/* TODO: Show loading spinner */}
      {/* TODO: Show error if any */}
      {/* TODO: Display products in a grid using ProductCard */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}
      >
        { products.map((product) => (
          <ProductCard key={product.id} product={product} />
        )) }
        {/* Render product cards here */}
      </div>
    </div>
  );
}
