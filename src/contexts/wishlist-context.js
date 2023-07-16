import {
    useState,
    useEffect,
    useContext,
    createContext,
    useReducer,
  } from "react";

  import { useAuth } from "./auth-context";

  import wishlistReducer, {initialWishlistState} from "../reducers/wishListReducer";

  import { getWishlistService, addToWishlistService, removeFromWishlistService } from "../services/wishlistService";

  export const WishlistContext = createContext();
  export const WishlistProvider = ({ children }) => {
    const { token } = useAuth();
    const [wishlistState, wishlistDispatch] = useReducer(
      wishlistReducer,
      initialWishlistState
    );
  
    const [isLoading, setIsLoading] = useState(false);

  
    const getWishlist = async () => {
      setIsLoading(true);
      try {
        const response = await getWishlistService(token);
        const {
          status,
          data: { wishlist },
        } = response;
        if (status === 200) {
          wishlistDispatch({ type: "DISPLAY_WISHLIST", payload: wishlist });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const addToWishlist = async (product) => {
      try {
        const response = await addToWishlistService(product, token);
        const {
          status,
          data: { wishlist },
        } = response;
        if (status === 201) {
          wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: wishlist });
        }
      } catch (error) {
        console.error(error);
        //toast.error("Not able to add to favorites.");
      }
    };
  
    const removeFromWishlist = async ({ _id: productId }) => {
      try {
        const response = await removeFromWishlistService(productId, token);
        const {
          status,
          data: { wishlist },
        } = response;
        if (status === 200) {
          wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: wishlist });
        }
      } catch (error) {
        console.error(error);
        //toast.error("Unable to remove from favorites.");
      }
    };
  
    const itemInWishlist = (productId) =>
      wishlistState.wishlist.find((product) => product._id === productId);
  
    useEffect(() => {
      if (token) {
        getWishlist();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);
  
    return (
      <WishlistContext.Provider
        value={{
          wishlistState,
          wishlistDispatch,
          isLoading,
          addToWishlist,
          removeFromWishlist,
          itemInWishlist,
        }}
      >
        {children}
      </WishlistContext.Provider>
    );
  };

  export const useWishlist = () => useContext(WishlistContext);