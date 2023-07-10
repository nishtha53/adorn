import "./NavBar.css"
import { NavLink } from "react-router-dom";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
//import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
    
    const activeIconStyles = ({ isActive }) => ({
      scale: isActive ? "1.125" : "1",
    });
  
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