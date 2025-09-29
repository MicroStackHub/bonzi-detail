import "@/styles/globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              if (document.getElementById('google_translate_element')) {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'ar,bn,de,es,fr,hi,id,it,ja,ko,ms,pt,ru,th,tr,vi,zh-CN',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false,
                }, 'google_translate_element');
              }
            }
            
            // Re-initialize on page changes
            if (typeof window !== 'undefined') {
              window.addEventListener('load', function() {
                setTimeout(googleTranslateElementInit, 1000);
              });
            }
          `,
        }}
      />
      <Script
        id="google-translate-reinit"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Reinitialize Google Translate on route changes
            if (typeof window !== 'undefined') {
              let lastUrl = location.href;
              new MutationObserver(() => {
                const url = location.href;
                if (url !== lastUrl) {
                  lastUrl = url;
                  setTimeout(() => {
                    if (typeof googleTranslateElementInit === 'function') {
                      googleTranslateElementInit();
                    }
                  }, 500);
                }
              }).observe(document, {subtree: true, childList: true});
            }
          `,
        }}
      />
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
