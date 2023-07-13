import React from 'react'
import "./SingleProduct.css"

import { useProducts } from '../../contexts/product-context'

import { useNavigate } from "react-router-dom";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";

const SingleProduct = () => {
    const navigate = useNavigate();
    const { productState, isLoading, handleCardBtnsClick } = useProducts();
    // const { addToWishlist, itemInWishlist } = useWishlist();
    // const { addToCart, itemInCart } = useCart();
    // const { token } = useAuth();
  
    const currentProduct = productState.productDetail;
  
    const {
      _id,
      title,
      imgSrc,
      description,
      price,
      starRating,
      inStock,
      category,
      metalType
    } = currentProduct;
  
  
    return (
      <>
        {isLoading ? (
            "Loader"
        ) : (
          <div className="single-product-outer-container page-wrapper">
            <div className="single-product-inner-container">
              <div className="single-product">
                <div className="img-div">
                  <img src={imgSrc} alt={title} className="single-product-img" />
                </div>
  
  
                <div className="card-body">
                  <div>
                    <div className="card-heading">
                      <h2>{title}</h2>
                    </div>
  
                    <div className="card-content">
                      <div className="single-product-price">
                        <div className="price">{price}</div>
                        <div className="rating">
                          <div className="rating-block">
                            <span>{starRating}</span>
                            <span className="star-icon">
                              <StarRoundedIcon />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <hr />
  
                    <div className="card-description">
                      <div>{description}</div>
                    </div>
  
                    <hr />
  
                    <div className="card-description-container">
                      <div className="card-description">
                        <ul className="spaced-list">
                          <li>
                            <p>MetalType:</p>
                            <span className="list-value">
                              {metalType}
                            </span>
                          </li>
                          <li>
                            <p>Category:</p>
                            <span className="list-value">{category}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
  
                    <hr />
  
                  </div>
  
                  <div className="card-action">
                    <div>
                     
                        <button
                          className="single-product-cart-btn"
                          
                        >
                        
                          Add to Cart
                        </button>
                     
                    </div>
                    <div>
                      <button
                        className="single-product-wishlist-btn"
                         
                      >
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default SingleProduct;
