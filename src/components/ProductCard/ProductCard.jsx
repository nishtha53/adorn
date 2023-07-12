import "./ProductCard.css"

import { Link, useNavigate } from "react-router-dom";


import { useProducts } from "../../contexts/product-context";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

const ProductCard  = ({product}) => {
    const navigate = useNavigate();

    const  {_id,title,imgSrc,price,description,starRating,metalType,inStock} = product

    return (
        <div className="product-card">
            <div className="product-img">
              <img src={imgSrc} alt={title}  />
            </div>
          <div className="wishlist-btn">
              <FavoriteIcon
                className="wishlist-fav-icon"
              />

          </div>
          <div className="card-details">
              <h3>{title}</h3>
          
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