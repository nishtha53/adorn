import "./ProductCard.css"

import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../contexts/cart-context";
import { useProducts } from "../../contexts/product-context";
import { useWishlist } from "../../contexts/wishlist-context";
import { useAuth } from "../../contexts/auth-context";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

const ProductCard  = ({product, addedToWishlist}) => {
    const navigate = useNavigate();

    const {getProductById, handleCardBtnsClick} = useProducts();
    const { addToWishlist, removeFromWishlist, itemInWishlist } = useWishlist();
    const { addToCart, updateQuantityInCart, itemInCart } = useCart();
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
                <p className="new-price">₹{price}</p>
              </div>
            </div>
            
            {!addedToWishlist ? (
          <button
            className="add-to-cart-btn"
            onClick={() =>
              token
                ? itemInCart(_id)
                  ? navigate("/cart")
                  : handleCardBtnsClick(500, addToCart, product)
                : navigate("/login")
            }
          >
            {token && itemInCart(_id) ? "Go to Cart" : "Add To Cart"}
          </button>
        ) : itemInCart(_id) ? (
          <button
            className="add-to-cart-btn go-to-cart-btn"
            onClick={() =>
              handleCardBtnsClick(
                500,
                updateQuantityInCart,
                product,
                "increment"
              )
            }
          >
            Added To Cart +
          </button>
        ) : (
          <button
            className="add-to-cart-btn"
            onClick={() => handleCardBtnsClick(500, addToCart, product)}
          >
            Add to Cart
          </button>
        )}
          </div>
        </div>
      );
}

export default ProductCard