import React from 'react'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Hero from '../Components/HeroSection/Hero'
import ProductSection from '../Components/productSection/ProductSection'
import Testimonials from "../Components/Testimonials.jsx";
import PromotionalSection from "../Components/PromotionalSection.jsx";

const Home = () => {
  return (<>
    <Header/>
    <Hero/>
    <ProductSection/>
    <PromotionalSection />
    <Testimonials />
    <Footer/>
  </>
  )
}

export default Home