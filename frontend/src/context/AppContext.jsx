import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API = "https://grocery-website-bjbz.onrender.com/api";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load user from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Get correct userId safely
  const getUserId = () => {
    return user?.id || user?.user_id || null;
  };

  // ================= CART =================

  const fetchCart = async (userIdParam) => {
    const userId = userIdParam || getUserId();

    if (!userId) {
      console.log("No userId found");
      return;
    }

    try {
      const res = await axios.get(`${API}/cart/${userId}`);
      console.log("CART DATA:", res.data);
      setCart(res.data || []);
    } catch (err) {
      console.error("FETCH CART ERROR:", err);
    }
  };

  useEffect(() => {
    const userId = getUserId();

    if (userId) {
      fetchCart(userId);
    } else {
      setCart([]);
    }
  }, [user]);

  const addToCart = async (product) => {
    const userId = getUserId();

    if (!userId) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await axios.post(`${API}/cart/add`, {
        user_id: userId,
        product_id: product.id
      });

      if (res.data.exists) {
        toast("Quantity increased");
      } else {
        toast.success("Added to cart");
      }

      await fetchCart(userId);

    } catch (err) {
      toast.error("Something went wrong");
      console.error("ADD CART ERROR:", err);
    }
  };

  const removeFromCart = async (product_id) => {
    const userId = getUserId();

    try {
      await axios.delete(`${API}/cart/remove/${userId}/${product_id}`);
      toast.success("Removed from cart");
      await fetchCart(userId);
    } catch (err) {
      toast.error("Failed to remove");
      console.error(err);
    }
  };

  const increaseQty = async (product_id) => {
    const userId = getUserId();

    try {
      await axios.put(`${API}/cart/increase`, {
        user_id: userId,
        product_id
      });

      await fetchCart(userId);
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQty = async (product_id) => {
    const userId = getUserId();

    try {
      await axios.put(`${API}/cart/decrease`, {
        user_id: userId,
        product_id
      });

      await fetchCart(userId);
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    const userId = getUserId();

    try {
      await axios.delete(`${API}/cart/clear/${userId}`);
      setCart([]);
      toast.success("Cart cleared");
    } catch (err) {
      console.error(err);
    }
  };

  // ================= WISHLIST =================

  const fetchWishlist = async () => {
    const userId = getUserId();
    if (!userId) return;

    try {
      const res = await axios.get(`${API}/wishlist/${userId}`);
      setWishlist(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    const userId = getUserId();

    if (!userId) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await axios.post(`${API}/wishlist/add`, {
        user_id: userId,
        product_id: product.id
      });

      if (res.data.exists) {
        toast("Already in wishlist");
      } else {
        toast.success("Added to wishlist");
      }

      fetchWishlist();
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  const removeFromWishlist = async (wishlist_id) => {
    try {
      await axios.delete(`${API}/wishlist/remove/${wishlist_id}`);
      toast.success("Removed from wishlist");
      fetchWishlist();
    } catch (err) {
      toast.error("Failed to remove");
      console.error(err);
    }
  };

  // ================= CONTEXT VALUE =================

  const value = {
    navigate,
    user,
    setUser,
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    addToWishlist,
    removeFromWishlist
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
