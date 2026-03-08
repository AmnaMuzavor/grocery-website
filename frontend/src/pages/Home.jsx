import React from 'react'
import Hero from '../components/hero.jsx'
import Category from '../components/Category.jsx'
import Pros from '../components/Pros.jsx'
import Footer from '../components/Footer.jsx'
import Toppicks from '../components/Toppicks.jsx'
import Banners from '../components/Banners.jsx'
import ChatBot from "../components/ChatBot";

const Home = () => {
  return (
    <div>
      <Hero />
      <Pros />
      <Category />
      <Banners />
      <Toppicks />
      <ChatBot />
      <Footer />
    </div>
  )
}

export default Home
