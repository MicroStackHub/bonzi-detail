
import "@/styles/globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const { isFallback, events } = useRouter();

  const googleTranslateElementInit = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        { 
          pageLanguage: 'en',
          includedLanguages: 'en,hi,bn,te,mr,ta,gu,kn,ml,pa,or,as,ur',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 
        'google_translate_element'
      );
    }
  };

  useEffect(() => {
    const id = 'google-translate-script';

    const addScript = () => {
      const s = document.createElement('script');
      s.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
      s.setAttribute('id', id);
      const q = document.getElementById(id);
      if (!q) {
        document.body.appendChild(s);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    const removeScript = () => {
      const q = document.getElementById(id);
      if (q) q.remove();
      const w = document.getElementById('google_translate_element');
      if (w) w.innerHTML = '';
    };

    isFallback || addScript();

    events.on('routeChangeStart', removeScript);
    events.on('routeChangeComplete', addScript);

    return () => {
      events.off('routeChangeStart', removeScript);
      events.off('routeChangeComplete', addScript);
    };
  }, [isFallback, events]);

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
