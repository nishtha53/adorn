import "./CartCard.css";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/cart-context";
import { useWishlist } from "../../contexts/wishlist-context";
import { useProducts } from "../../contexts/product-context";

const CartCard = ({ cartProduct }) => {
  const { getProductById, handleCardBtnsClick } = useProducts();
  const { addToWishlist, removeFromWishlist, itemInWishlist } = useWishlist();
  const { removeFromCart, updateQuantityInCart } = useCart();

  const { _id, title, imgSrc, price, qty } = cartProduct;

  return (
    <div className="cart-card-wrapper card-horizontal">
      <div className="card-row">
        <img src={imgSrc} alt={title} className="cart-card-img" />
        <div className="cart-card-body">
          <Link to={`/product/${_id}`}>
            <p className="cart-card-title" onClick={() => getProductById(_id)}>
              {title}
            </p>
          </Link>
          <div className="cart-card-content">
            <div className="cart-card-price">
              <p>₹{price}</p>
            </div>
            <div className="cart-card-quantity">
              <span>Quantity: </span>
              <div className="quantity-fields">
                <button
                  className="minus"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCardBtnsClick(
                      500,
                      updateQuantityInCart,
                      cartProduct,
                      "decrement"
                    );
                  }}
                  disabled={qty <= 1}
                >
                  -
                </button>
                <p className="qty-input">{qty}</p>
                <button
                  className="plus"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCardBtnsClick(
                      500,
                      updateQuantityInCart,
                      cartProduct,
                      "increment"
                    );
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {!itemInWishlist(_id) ? (
            <button
              className="move-to-wishlist-btn"
              onClick={() =>
                handleCardBtnsClick(500, addToWishlist, cartProduct)
              }
            >
              Add to Wishlist
            </button>
          ) : (
            <button
              className="move-to-wishlist-btn"
              onClick={() =>
                handleCardBtnsClick(500, removeFromWishlist, cartProduct)
              }
            >
              Remove from Wishlist
            </button>
          )}
          <button
            className="remove-from-cart-btn"
            onClick={() =>
              handleCardBtnsClick(500, removeFromCart, cartProduct)
            }
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;