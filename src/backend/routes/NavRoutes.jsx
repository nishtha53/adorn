import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import ProductListing from "../../pages/ProductListing/ProductListing";
import Cart from "../../pages/Cart/Cart";
import WishList from "../../pages/WishList/WishList";
import Login from "../../pages/Authentication/Login/Login";


const NavRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<ProductListing />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
    )
}

export default NavRoutes