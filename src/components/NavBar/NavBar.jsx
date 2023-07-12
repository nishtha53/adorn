import "./NavBar.css"
import { NavLink, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useProducts } from "../../contexts/product-context";
//import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
    
  const navigate = useNavigate();

    const activeIconStyles = ({ isActive }) => ({
      scale: isActive ? "1.125" : "1",
    });

  
    const { productState, productDispatch } = useProducts();


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
            <NavLink style={activeIconStyles} to="/wishlist" title="Wishlist">
              <div className="nav-icon">
                <FavoriteBorderOutlinedIcon />
                 
              </div>
            </NavLink>
          
        
            <NavLink style={activeIconStyles} to="/cart" title="Cart">
              <div className="nav-icon">
                <ShoppingCartOutlinedIcon /> 
              </div>
            </NavLink>
          
          <NavLink
            style={activeIconStyles}
          >
            <div className="nav-icon">
               <LoginOutlinedIcon />
            </div>
          </NavLink>
        </div>
      </div>
    );
  };
  export default Navbar;