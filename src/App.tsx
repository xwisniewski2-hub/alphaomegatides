import React from 'react';

export default function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>⚠️ Site Temporarily Down</h1>
      <p style={styles.text}>
        We are currently performing scheduled maintenance. Please check back shortly.
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#f8f9fa',
    color: '#212529',
    textAlign: 'center' as const,
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.2rem',
    color: '#6c757d',
  },
};
