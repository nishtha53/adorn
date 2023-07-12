import "./categories.css"

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useProducts } from "../../contexts/product-context";

const CategoryCard = ({ catImg, category }) => {
    const navigate = useNavigate();
    const { productState, productDispatch } = useProducts();
  
  
    useEffect(() => {
      productDispatch({
        type: "CLEAR_FILTERS",
        payload: {
          categories: productState.allCategories,
          products: productState.products,
        },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="category-card-container">
          <div className="category-card">
            <img
              src={catImg}
              alt={category}
              onClick={() => {
                productDispatch({ type: "CATEGORY", payload: category });
                window.scroll({ top: 0, behavior: "smooth" });
                navigate("/store");
              }}
            />
          </div>
          <p>{category}</p>
        </div>
      );
    };
    const Categories = () => {
        const { productState } = useProducts();
      
        return (
          <>
            <div className="category-outer-container">
              <h1>Discover Our Captivating Jewelry Collections</h1>
              <div className="section-text-headings">
                <p>Adorn Yourself in Brilliance: Shop our Stunning Jewelry Collection</p>
              </div>
              <div className="category-cards">
                {productState?.allCategories?.map(({ _id, img, categoryName }) => (
                  <CategoryCard key={_id} catImg={img} category={categoryName} />
                ))}
              </div>
            </div>
          </>
        );
      };
      export default Categories;    