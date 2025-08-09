'use client';

import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import Features from '@/app/components/Features';
import Stats from '@/app/components/Stats';
import About from '@/app/components/About';
import Testimonios from '@/app/components/Testimonios';
import Info from '@/app/components/Info';
import News from '@/app/components/News';
import AppointmentForm from '@/app/components/AppointmentForm';
import Footer from '@/app/components/Footer';
import ContactTopBar from '@/app/components/ContactTopBar';
import OurClient from '@/app/components/OurClients'

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      <ContactTopBar/>
      <Header />
      <Hero/>
      <OurClient/>
      <Features/>
      
      <Stats/>
      <About/>
      <Testimonios/>
      <News/>
      <Info/>
      <AppointmentForm/>
      
      <Footer/>
    </div>
  )
}
