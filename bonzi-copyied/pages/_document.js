import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        {/* Google Translate script injected globally */}
        <script
          id="google-translate-script"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        ></script>
        
        {/* Script to hide Google Translate bar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function hideGoogleTranslateBar() {
                const bannerFrames = document.querySelectorAll('.goog-te-banner-frame, iframe.goog-te-banner-frame, .skiptranslate');
                bannerFrames.forEach(frame => {
                  if (frame) {
                    frame.style.display = 'none';
                    frame.style.visibility = 'hidden';
                    frame.style.height = '0px';
                    frame.style.width = '0px';
                  }
                });

                if (document.body) {
                  document.body.style.top = '0px';
                  document.body.style.position = 'static';
                  document.body.style.marginTop = '0px';
                  document.body.style.paddingTop = '0px';
                }

                const translateElements = document.querySelectorAll('[id^="google_translate"], .goog-te-ftab, .goog-te-menu-frame, .goog-te-balloon-frame');
                translateElements.forEach(element => {
                  if (element) {
                    element.style.display = 'none';
                  }
                });
              }

              // Run immediately
              hideGoogleTranslateBar();

              // Run on DOM content loaded
              document.addEventListener('DOMContentLoaded', hideGoogleTranslateBar);

              // Run on window load
              window.addEventListener('load', hideGoogleTranslateBar);

              // Set up MutationObserver to watch for new elements
              if (typeof MutationObserver !== 'undefined') {
                const observer = new MutationObserver(hideGoogleTranslateBar);
                observer.observe(document.body || document.documentElement, {
                  childList: true,
                  subtree: true
                });
              }

              // Run periodically as a fallback
              setInterval(hideGoogleTranslateBar, 500);
            `
          }}
        />
        
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
