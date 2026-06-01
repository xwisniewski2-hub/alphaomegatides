import React from 'react';

export default function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#f8f9fa',
      color: '#212529',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>🚧 Site Under Maintenance</h1>
      <p style={{ fontSize: '1.25rem', color: '#6c757d' }}>
        We are currently performing scheduled updates. Please check back later.
      </p>
    </div>
  );
}
