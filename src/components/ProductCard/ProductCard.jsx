import "./ProductCard.css"

import { Link, useNavigate } from "react-router-dom";


import { useProducts } from "../../contexts/product-context";
import { useWishlist } from "../../contexts/wishlist-context";
import { useAuth } from "../../contexts/auth-context";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

const ProductCard  = ({product}) => {
    const navigate = useNavigate();

    const {getProductById, handleCardBtnsClick} = useProducts();
    const { addToWishlist, removeFromWishlist, itemInWishlist } = useWishlist();

    const {token}  = useAuth();

    const  {_id,title,imgSrc,price,starRating} = product

    return (
        <div className="product-card">
            <Link to={`/product/${_id}`}>
            <div className="product-img">
              <img src={imgSrc} alt={title} onClick={() => getProductById(_id)} />
            </div>
            </Link>
          <div className="wishlist-btn">
          {token && itemInWishlist(_id) ? (
          <FavoriteIcon
            className="wishlist-fav-icon"
            onClick={() =>
              handleCardBtnsClick(500, removeFromWishlist, product)
            }
          />
        ) : (
          <FavoriteBorderRoundedIcon
            onClick={
              token
                ? () => handleCardBtnsClick(500, addToWishlist, product)
                : () => navigate("/login")
            }
          />
        )}
          </div>
          <div className="card-details">
          <Link to={`/product/${_id}`}>
          <h3 onClick={() => getProductById(_id)}>{title}</h3>
        </Link>
          
            <div className="star">
              <StarRoundedIcon />
              <p className="star-value"> {starRating}</p>
            </div>
            <div className="price-delivery-tags">
              <div className="prices">
                <p className="new-price">{price}</p>
              </div>
            </div>
            
              <button
                className="add-to-cart-btn"
                
              >
             Add To Cart
              </button>
            
          </div>
        </div>
      );
}

export default ProductCard