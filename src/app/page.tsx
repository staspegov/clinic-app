'use client';

import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import Features from '@/app/components/Features';
import Stats from '@/app/components/Stats';
import About from '@/app/components/About';
import Services from '@/app/components/Services';
import Gallery from '@/app/components/Gallery';
import Pricing from '@/app/components/Pricing';
import News from '@/app/components/News';
import AppointmentForm from '@/app/components/AppointmentForm';
import Footer from '@/app/components/Footer';
import ContactTopBar from '@/app/components/ContactTopBar';

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      <ContactTopBar/>
      <Header />
      <Hero/>
      <Features/>
      <Stats/>
      <About/>
      <Services/>
      <Gallery/>
      <Pricing/>
      <News/>
      <AppointmentForm/>
      <Footer/>
    </div>
  )
}
