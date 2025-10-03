import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import CopyrightStrip from './CopyrightStrip';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          scrolled={scrolled}
        />
        
        <div className="flex-1 flex max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
          <Sidebar isOpen={sidebarOpen} />
          <main className={`flex-1 ${sidebarOpen ? 'lg:ml-60' : ''} transition-all duration-300 w-[100px]`}>
            {children}
          </main>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
