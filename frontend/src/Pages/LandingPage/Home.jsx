import React from 'react';
import LandingLayout from '../../layouts/LandingLayout';
import Whatsapp from '../../components/whatsappFlotante';
import Hero from '../../components/landing/hero';
import AboutUs from '../../components/landing/aboutUs';
import Services from '../../components/landing/services';
import WhyUs from '../../components/landing/whyUs';
import Contacto from '../../components/landing/contact';
function Home() {
  return (
    <LandingLayout>
      <Whatsapp />
      <Hero/>
      <AboutUs />
      <Services />
      <WhyUs />
      <Contacto />
    </LandingLayout>

  );
}

export default Home;