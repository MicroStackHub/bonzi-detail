import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BonziCart - Online Shopping",
  description: "Your trusted e-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="sm:max-w-7xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8 w-full">
          <Header />
          <main className="flex-grow w-full min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              // Default
              style: {
                fontWeight: 500,
                fontSize: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              },
              // Warning toast
              error: {
                style: {
                  background: '#f87171', // Tailwind red-400
                  color: '#fff',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#b91c1c', // Tailwind red-700
                },
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}