import "@/styles/globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Load Google Translate script dynamically
    const loadGoogleTranslateScript = () => {
      // Check if script already exists
      if (document.getElementById('google-translate-script')) {
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    const googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        try {
          const translateElement = new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,ta,te,mr,gu,kn,ml,pa,ur',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true
          }, 'google_translate_element');
          window.googleTranslateWidget = {
            element: translateElement,
            translate: (langCode) => {
              const selectElement = document.querySelector('.goog-te-combo');
              if (selectElement) {
                selectElement.value = langCode;
                selectElement.dispatchEvent(new Event('change', { bubbles: true }));
                return true;
              }
              return false;
            }
          };
        } catch (error) {
          console.error('Error initializing Google Translate:', error);
        }
      }
    };
    
    window.googleTranslateElementInit = googleTranslateElementInit;
    
    // Ensure the translate element container exists
    if (!document.getElementById('google_translate_element')) {
      const container = document.createElement('div');
      container.id = 'google_translate_element';
      container.style.display = 'none';
      document.body.appendChild(container);
    }
    
    // Load the script
    loadGoogleTranslateScript();
    
    // Try to initialize widget if script is already loaded
    if (window.google && window.google.translate) {
      googleTranslateElementInit();
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Completely hide Google Translate banner strip */
        .goog-te-banner-frame {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          max-height: 0 !important;
          overflow: hidden !important;
        }
        
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        
        body > .skiptranslate.goog-te-banner-frame {
          display: none !important;
        }
        
        iframe.goog-te-banner-frame {
          display: none !important;
        }
        
        .goog-te-balloon-frame {
          display: none !important;
        }
        
        /* Force body to stay at top */
        body {
          top: 0 !important;
          position: static !important;
        }
        
        body.translated-ltr,
        body.translated-rtl {
          top: 0 !important;
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
        
        /* Hide Google logo and branding */
        .goog-logo-link,
        .goog-te-gadget img,
        .goog-te-gadget span {
          display: none !important;
        }
      `}</style>
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
