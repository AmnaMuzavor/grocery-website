import React from 'react'
import Banner from '../assets/Banner1.jpg'
import './hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-grid">

          {/* LEFT SIDE */}
          <div className="hero-text">
            <span className="hero-badge">Fresh & Organic</span>

            <h1 className="hero-title">
              Farm Fresh
              <span>To Your Door</span>
            </h1>

            <p className="hero-desc">
              Premium quality groceries delivered with care. Experience the freshest produce and artisanal goods.
            </p>

            <div className="hero-actions">
              <button className="btn-primary">Shop Now</button>
              <button className="btn-secondary">Explore offers</button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hero-image-wrapper">
            <div className="hero-image-bg"></div>

            <img
              src={Banner}
              alt="Fresh Groceries"
              className="hero-image"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
