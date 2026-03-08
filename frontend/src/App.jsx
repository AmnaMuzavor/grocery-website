import { useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
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
import CategoryProducts from './pages/CategoryProducts.jsx';
import SearchedProducts from './pages/SearchedProducts.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import Wishlist from "./pages/Wishlist";
// import ProductDetail from './pages/ProductDetail.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Shop from './pages/Shop'
import Checkout from './pages/Checkout.jsx';
import About from './pages/About.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import NotificationsAdmin from "./pages/NotificationsAdmin";
   import ResetPassword from "./pages/ResetPassword";
   import ChatBot from "./components/ChatBot";
const App = () => {
  const { isseller } = useContext(AppContext);
  const issellerPath = useLocation().pathname.includes('/seller');

  return (

    <div>
      {issellerPath ? null : <Navbar />}
      {/* {showUserLoggedIn ? <Auth /> : null} */}

      <div>
 <Toaster
  position="top-center"
  toastOptions={{
    style: {
      zIndex: 9999,
      // marginTop: "40vh"
    }
  }}
/>
        <Routes>
    
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/categories" element={<CategoriesAdmin />} />
          <Route path="/admin/products" element={<AddProductAdmin />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/shop" element={<SearchedProducts />} />
          <Route path="/shopp" element={<Shop />} />
          <Route path="/ProductCategories" element={<ProductCategory />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {/* <Route path="/productDetail" element={<ProductDetail />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/category/:id" element={<CategoryProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/about' element={<About /> } />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path="/admin/notifications" element={<NotificationsAdmin />} />
       

<Route path="/reset/:token" element={<ResetPassword />} />
        </Routes>



      </div>
    </div>
  )
}

export default App