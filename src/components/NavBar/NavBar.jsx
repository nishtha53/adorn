import "./NavBar.css"
import { NavLink, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { useProducts } from "../../contexts/product-context";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../contexts/auth-context";
import { useWishlist } from "../../contexts/wishlist-context";
import { useCart } from "../../contexts/cart-context";

const Navbar = () => {
    
  const navigate = useNavigate();
  const { token } = useAuth();


    const activeIconStyles = ({ isActive }) => ({
      scale: isActive ? "1.125" : "1",
    });

  
    const { productState, productDispatch } = useProducts();

    const {
      wishlistState: { wishlist },
    } = useWishlist();

    const {
      cartState: { cart },
    } = useCart();
    return (
      <div className="navbar">
        <NavLink to="/">
          <div className="nav-left">
            <span className="app-name">Adorn</span>
          </div>
        </NavLink>
        <div className="nav-search">
          <SearchOutlinedIcon className="nav-icon search-icon" />
          <input
            type="search"
            placeholder="Search"
            value={productState.searchInput}
            onChange={(event) => {
              productDispatch({ type: "SEARCH", payload: event.target.value });
              navigate("/store");
            }}
          />
        </div>
        <div className="nav-right">
          <NavLink style={activeIconStyles} to="/store" title="Explore">
            <div className="nav-icon">
              <ExploreOutlinedIcon />
            </div>
          </NavLink>
          {token && (
            <NavLink style={activeIconStyles} to="/wishlist" title="Wishlist">
              <div className="nav-icon">
                <FavoriteBorderOutlinedIcon />
                {token && wishlist.length > 0 && <p>{wishlist.length}</p>}
              </div>
            </NavLink>
          )}
        
            {token && (
            <NavLink style={activeIconStyles} to="/cart" title="Cart">
              <div className="nav-icon">
                <ShoppingCartOutlinedIcon /> 
                {token && cart.length > 0 && <p>{cart.length}</p>}
              </div>
            </NavLink>
          )}
          <NavLink
            style={activeIconStyles}
            to={token ? "/profile" : "/login"}
            title={token ? "Profile" : "Login"}
          >
            <div className="nav-icon">
              <PersonIcon />
            </div>
          </NavLink>
        </div>
      </div>
    );
  };
  export default Navbar;