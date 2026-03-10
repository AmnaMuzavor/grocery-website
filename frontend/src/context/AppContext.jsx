import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const API = "https://grocery-website-bjbz.onrender.com/api";
export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const fetchCart = async (userIdParam) => {
    const userId = userIdParam || user?.id;
    if (!userId) return;

    try {
      const res = await axios.get(
        `${API}/cart/${userId}`
      );
      setCart(res.data || []);
    } catch (err) {
      console.error("FETCH CART ERROR:", err);
    }
    
  };

  useEffect(() => {
    if (user?.id) {
      fetchCart(user.id);
    } else {
      setCart([]);
    }
  }, [user]);

  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/cart/add`,
        {
          user_id: user.id,
          product_id: product.id
        }
      );

      if (res.data.exists) {
        toast("Quantity increased");
      } else {
        toast.success("Added to cart");
      }

      await fetchCart(user.id); 

    } catch (err) {
      toast.error("Something went wrong");
      console.error("ADD CART ERROR:", err);
    }
  };

  const removeFromCart = async (product_id) => {
    try {
      await axios.delete(
        `${API}/cart/remove/${user.id}/${product_id}`
      );

      toast.success("Removed from cart");
      await fetchCart(user.id);

    } catch (err) {
      toast.error("Failed to remove");
      console.error(err);
    }
  };

  const increaseQty = async (product_id) => {
    try {
      await axios.put(
        `${API}/cart/increase`,
        {
          user_id: user.id,
          product_id
        }
      );

      await fetchCart(user.id);

    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQty = async (product_id) => {
    try {
      await axios.put(
        `${API}/cart/decrease`,
        {
          user_id: user.id,
          product_id
        }
      );

      await fetchCart(user.id);

    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(
        `${API}/cart/clear/${user.id}`
      );

      setCart([]);
      toast.success("Cart cleared");
    } catch (err) {
      console.error(err);
    }
  };


  const fetchWishlist = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `${API}/wishlist/${user.id}`
      );
      setWishlist(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/wishlist/add`,
        {
          user_id: user.id,
          product_id: product.id
        }
      );

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
      await axios.delete(
        `${API}/wishlist/remove/${wishlist_id}`
      );

      toast.success("Removed from wishlist");
      fetchWishlist();
    } catch (err) {
      toast.error("Failed to remove");
      console.error(err);
    }
  };

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
