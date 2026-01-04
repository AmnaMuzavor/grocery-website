import React from 'react'
import './Banners.css'
import Orange from "../assets/orange.avif";
import Products from '../assets/Products-banner.png'
import Banner1 from '../assets/Banner1.jpg'

const Banners = () => {
  return (
    <section class="bsection">
    <div class="bcontainer">
      <div class="banner-grid">

        <div class="banner green left-img">
          <div class="banner-text">
            <h3>Get your fresh seasonals in clicks</h3>
          </div>
          <img src={Orange} alt="Fresh citrus" />
        </div>

        <div class="banner yellow">
          <div class="banner-text">
            <h3>Essentials at</h3>
            <h2>30% OFF</h2>
          </div>
          <img src={Products} alt="Grocery essentials" />
        </div>

      
      </div>

      <div class="full-banner">
        <div class="full-banner-text">
          <h2>Freshness You Can See, Quality You Can Taste</h2>
          <p>From farm-fresh fruits to garden-picked vegetables – all in one place.</p>
        </div>
        <img src={Banner1} alt="All fruits and vegetables" />
      </div>

    </div>
  </section>
  )
}

export default Banners