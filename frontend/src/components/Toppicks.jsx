import React from 'react'
import '../index.css'
import  strawberry from '../assets/strawberry.jpg'
import avocado from '../assets/avacado.jpg'
import banana from '../assets/bananas.jpg'
import greens from '../assets/spinach.jpg'

const Toppicks = () => {
  return (
     <section className="products">
      <div className="container">
        <h2>Top Picks</h2>

        <div className="product-grid">

          <div className="card">
            <img src={strawberry} alt="Strawberry" />
            <span className="badge">Featured</span>
            <p className="category">Fruits</p>
            <h3>Strawberries</h3>
            <p className="price">Rs.60/kg</p>
          </div>

          <div className="card">
            <img src={avocado} alt="Avocado" />
            <span className="badge">Featured</span>
            <p className="category">Fruits</p>
            <h3>Avocado</h3>
            <p className="price">Rs.80/kg</p>
          </div>

          <div className="card">
            <img src={banana} alt="Banana" />
            <p className="category">Fruits</p>
            <h3>Bananas</h3>
            <p className="price">Rs.40/kg</p>
          </div>

          <div className="card">
            <img src={greens} alt="Greens" />
            <p className="category">Vegetables</p>
            <h3>Leafy Greens</h3>
            <p className="price">Rs.30/kg</p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Toppicks