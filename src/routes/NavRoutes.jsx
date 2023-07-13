import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import ProductListing from "../pages/ProductListing/ProductListing";
import Cart from "../pages/Cart/Cart";
import WishList from "../pages/WishList/WishList";
import Login from "../pages/Authentication/Login/Login";
import Signup from "../pages/Authentication/Signup/Signup";
import RequiresAuth from "./RequiredAuth";
import UserAccount from "../pages/UserAccount/UserAccount";
import UserProfile from "../components/UserProfile/UserProfile";
import SingleProduct from "../pages/SingleProduct/SingleProduct";

const NavRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<ProductListing />} />
            <Route path="/product/:productID" element={<SingleProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> 

            <Route
        path="/cart"
        element={
          <RequiresAuth>
            <Cart />
          </RequiresAuth>
        }
      />

      <Route
        path="/wishlist"
        element={
          <RequiresAuth>
            <WishList />
          </RequiresAuth>
        }
      />

      <Route
        path="/profile"
        element={
          <RequiresAuth>
            <UserAccount />
          </RequiresAuth>
        }>
        <Route path="" element={<UserProfile />} />

      </Route>
        </Routes>
    )
}

export default NavRoutes