import React from 'react';

interface LoaderProps {
  customMessage?: string;
}

const Loader: React.FC<LoaderProps> = ({ customMessage }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 9999, 
      }}
    >
      <div
        style={{
          border: '8px solid #f3f3f3', 
          borderTop: '8px solid #3498db', 
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
      {customMessage && (
        <p style={{ marginTop: '20px', color: 'white', fontSize: '1.2em' }}>
          {customMessage}
        </p>
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;