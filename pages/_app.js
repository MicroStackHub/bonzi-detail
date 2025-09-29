
import "@/styles/globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const { isFallback, events } = useRouter();

  const googleTranslateElementInit = () => {
    if (typeof window !== 'undefined' && window.google && window.google.translate && window.google.translate.TranslateElement) {
      try {
        new window.google.translate.TranslateElement(
          { 
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,te,mr,ta,gu,kn,ml,pa,or,as,ur',
            autoDisplay: false
          }, 
          'google_translate_element'
        );
        console.log('Google Translate initialized in _app.js');
        
        // Hide banner after initialization
        setTimeout(() => {
          const banners = document.querySelectorAll('.goog-te-banner-frame, .skiptranslate');
          banners.forEach(banner => {
            if (banner) {
              banner.style.display = 'none';
              banner.style.visibility = 'hidden';
              banner.style.height = '0';
            }
          });
          document.body.style.top = '0px';
          document.body.style.position = 'static';
        }, 100);
        
      } catch (error) {
        console.error('Error in googleTranslateElementInit:', error);
      }
    }
  };

  useEffect(() => {
    const id = 'google-translate-script';

    const addScript = () => {
      if (typeof window !== 'undefined') {
        const existingScript = document.getElementById(id);
        if (!existingScript) {
          const s = document.createElement('script');
          s.setAttribute('src', 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
          s.setAttribute('id', id);
          s.setAttribute('async', 'true');
          
          window.googleTranslateElementInit = googleTranslateElementInit;
          
          document.head.appendChild(s);
        }
      }
    };

    const removeScript = () => {
      if (typeof window !== 'undefined') {
        const q = document.getElementById(id);
        if (q) q.remove();
        const w = document.getElementById('google_translate_element');
        if (w) w.innerHTML = '';
        delete window.googleTranslateElementInit;
      }
    };

    if (!isFallback) {
      addScript();
    }

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
