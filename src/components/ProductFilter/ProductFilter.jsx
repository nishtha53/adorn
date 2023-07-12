import "./productfilter.css"

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import StarRoundedIcon from "@mui/icons-material/StarRounded";

import { useProducts } from "../../contexts/product-context";

const ProductFilter = () => {
    const { productState, productDispatch,showFilter, toggleFilter } =
    useProducts();

    const productCategories = productState.products.reduce(
        (acc, { category }) =>
          acc.includes(category) ? [...acc] : [...acc, category],
        []
      );

      
  const productMetalType = productState.products.reduce(
    (acc, { metalType }) => (acc.includes(metalType) ? [...acc] : [...acc, metalType]),
    []
  );

      return (
        <div
          className={showFilter ? "product-sidebar show-filter" : "product-sidebar"}
        >
          <div className="filter-title-bar">
            <div>
              <p className="filter-heading">Filters</p>
            </div>
            <div className="clear-wrapper-container">
              <button
                className="clear-filter"
                onClick={() =>
                    productDispatch({
                      type: "CLEAR_FILTERS",
                      payload: {
                        products: productState.products,
                        categories: productState.allCategories,
                      },
                    })
                  }
              >
                Clear
              </button>
              <div className="close-btn">
                <CloseRoundedIcon onClick={() => toggleFilter()} />
              </div>
            </div>
          </div>
    
          <div className="filters">
            <div className="filter-wrapper">
              <p className="filter-title">Rating</p>
              <div className="filter-value">
                <div className="filter-rating">
                  <span>
                    1 <StarRoundedIcon />
                  </span>
                  <span>
                    5 <StarRoundedIcon />
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  list="steplist"
                  value={productState.ratingRange}
                  onChange={(event) =>
                    productDispatch({
                      type: "SORT_BY_RATING_RANGE",
                      payload: event.target.value,
                    })
                  }
                />
                <datalist id="steplist">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </datalist>
              </div>
            </div>
    
            <div className="filter-wrapper">
              <p className="filter-title">Categories</p>
              <div className="filter-value filter-category">
                {productCategories?.map((category, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      checked={productState.categoryInput.includes(category)}
                      value={category}
                      onChange={(event) =>
                        productDispatch({
                          type: "CATEGORY",
                          payload: event.target.value,
                        })
                      }
                    />
                    <p>{category}</p>
                  </label>
                ))}
              </div>
            </div>
    
            <div className="filter-wrapper">
              <p className="filter-title">Metal type</p>
              <div className="filter-value filter-category">
              {productMetalType?.map((m, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={productState.metalTypeInput.includes(m)}
                  value={m}
                  onChange={(event) =>
                    productDispatch({ type: "METALTYPE", payload: event.target.value })
                  }
                />
                {m}
              </label>
            ))}
              </div>
            </div>
    
            <div className="filter-wrapper">
              <p className="filter-title">Sort By</p>
              <div className="filter-value filter-sort">
                <label>
                  <input
                    type="radio"
                    checked={productState.sortPriceRadioInput === "hightolow"}
                    name="sort"
                    value="hightolow"
                    onChange={(event) =>
                        productDispatch({
                          type: "SORT_BY_PRICE",
                          payload: event.target.value,
                        })
                      }
                  />
                  Price = High to Low
                </label>
                <label>
                  <input
                    type="radio"
                    checked={productState.sortPriceRadioInput === "lowtohigh"}
                    name="sort"
                    value="lowtohigh"
                    onChange={(event) =>
                        productDispatch({
                          type: "SORT_BY_PRICE",
                          payload: event.target.value,
                        })
                      }
                  />
                  Price = Low to High
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
export default ProductFilter;
