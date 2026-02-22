import { createContext,useState } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext=createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const[cart,setCart]=useState([]);
  const[wishlist,setWishlist]=useState([]);


  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };


  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

 const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const value = { navigate, user, setUser,cart,wishlist,addToCart,removeFromCart,addToWishlist,removeFromWishlist };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
