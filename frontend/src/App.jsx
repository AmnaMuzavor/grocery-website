import { useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Navbar from './components/Navbar.jsx'
import { AppContext } from './context/AppContext.jsx'
import MyOrders from './pages/MyOrders.jsx'
import Auth from './models/Auth.jsx'
import AddProductAdmin from './pages/AddProductsAdmin.jsx'
import CategoriesAdmin from './pages/CategoriesAdmin.jsx'
import admin from './pages/admin.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Account from "./pages/Account";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Shop from "./pages/Shop";
import SearchedProducts from './pages/SearchedProducts.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import Wishlist from "./pages/Wishlist";
// import ProductDetail from './pages/ProductDetail.jsx'


const App = () => {
  const { isseller } = useContext(AppContext);
  const issellerPath = useLocation().pathname.includes('/seller');

  return (

    <div>
      {issellerPath ? null : <Navbar />}
      {/* {showUserLoggedIn ? <Auth /> : null} */}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/admin/categories" element={<CategoriesAdmin />} />
          <Route path="/admin/products" element={<AddProductAdmin />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/shop" element={<SearchedProducts />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/ProductCategories" element={<ProductCategory />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {/* <Route path="/productDetail" element={<ProductDetail />} /> */}
        </Routes>

      </div>
    </div>
  )
}

export default App