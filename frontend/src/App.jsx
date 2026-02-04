import { useContext } from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Navbar from './components/Navbar.jsx'
import { AppContext } from './context/AppContext.jsx'
import MyOrders from './pages/MyOrders.jsx'
import Auth from './models/Auth.jsx'
import AddProductAdmin from './pages/AddProductsAdmin.jsx'
import CategoriesAdmin from './pages/CategoriesAdmin.jsx'
import admin from './pages/admin.jsx'



const App = () => {
  const { isseller } = useContext(AppContext);
  const issellerPath=useLocation().pathname.includes('/seller');
  
  return (
    
    <div>
     {issellerPath ? null : <Navbar />}
     {/* {showUserLoggedIn ? <Auth /> : null} */}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
<Route  path="/Cart" element={<Cart />} />
   <Route path="/admin/categories" element={<CategoriesAdmin />} />
          <Route path="/admin/products" element={<AddProductAdmin />} />
        </Routes>

      </div>
    </div>
  )
}

export default App