import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Menu } from './components/Menu';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat'; 

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#f7f3ed] text-[#170d09]">
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Menu />
        <Gallery />
        <Contact />
      </main>
      <Footer />

      {/* 2. Lo agregás acá al final, fuera de <main> y <Footer> */}
      <WhatsAppFloat />
    </div>
  );
}