import React from 'react'
import "./ProductListing.css"
import { useProducts } from '../../contexts/product-context'

import ProductFilters from '../../components/ProductFilter/ProductFilter'

import ProductCard from '../../components/ProductCard/ProductCard'

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";


const ProductListing = () => {
  const {
    productState,
    isLoading,
    filteredByRating: filterProducts,
    toggleFilter
  } = useProducts();

  const { products } = productState;

  return (
    <div className="products-listing-outer-container page-wrapper">
      {isLoading ? (
        <div className="loader-container">
          "Loader"
        </div>
      ) : (
        <>
          <div className="products-filters-container">
            <ProductFilters />
          </div>
          <div className="products-outer-container">
            <div className="products-title-bar">
              <div>
                <h2>Jewellery</h2>
                <h4>
                  Showing {filterProducts.length} items of {products.length}{" "}
                  Jewellery
                </h4>
              </div>
              <div className="filter-icon">
                <TuneOutlinedIcon onClick={toggleFilter} />
              </div>
            </div>
            {filterProducts.length > 0 ? (
              <div className="products-container">
                {filterProducts?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center no-products-msg">
                Whoops! We don't have any plant that match your preference.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListing;