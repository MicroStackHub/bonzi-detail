
import "@/styles/globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
            style: {
              background: '#065f46',
              color: '#fff',
              border: '1px solid #10B981',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
            style: {
              background: '#7f1d1d',
              color: '#fff',
              border: '1px solid #EF4444',
            },
          },
        }}
      />
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}
