import {
    createContext,
    useContext,
    useEffect,
    useState,
    useReducer,
  } from "react";

  import { initialProductState, productReducer } from "../reducers/productReducer";

  import { getProductsService, getCategoriesService } from "../services/productService";

  export const ProductsContext = createContext();

  export const ProductsProvider = ({children}) => {
    const [productState, productDispatch] = useReducer(
        productReducer,
        initialProductState
      );

      const [isLoading, setIsLoading] = useState(false);
      const [showFilter, setShowFilter] = useState(false);


      const getProducts = async () => {
        setIsLoading(true);
        try {
          const response = await getProductsService();
          const {
            status,
            data: { products },
          } = response;
          if (status === 200) {
            productDispatch({
              type: "DISPLAY_PRODUCTS",
              payload: products,
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
    
      const getCategories = async () => {
        setIsLoading(true);
        try {
          const response = await getCategoriesService();
          const {
            status,
            data: { categories },
          } = response;
          if (status === 200) {
            productDispatch({ type: "DISPLAY_CATEGORIES", payload: categories });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };


    const toggleFilter = () => {
        setShowFilter((showFilter) => !showFilter);
      };

    
      useEffect(() => {
        getProducts();
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

const filteredBySearch = productState.searchInput
    ? productState.products.filter((product) =>
        product.title
          .toLowerCase()
          .includes(productState.searchInput.toLowerCase())
      )
    : productState.products;
const filteredByCategories =
    productState.categoryInput.length > 0
      ? filteredBySearch.filter((product) =>
          productState.categoryInput.some(
            (catType) => product.category === catType
          )
        )
      : filteredBySearch;
    
      const filteredByMetaltype =
      productState.metalTypeInput.length > 0
        ? filteredByCategories.filter((product) =>
            productState.metalTypeInput.some((metaltype) => product.metalType === metaltype)
          )
        : filteredByCategories;

        const filteredByPrice = productState.sortPriceRadioInput
        ? filteredByMetaltype.sort((product1, product2) =>
            productState.sortPriceRadioInput === "hightolow"
              ? product2.price - product1.price
              : product1.price - product2.price
          )
        : filteredByMetaltype;

      const filteredByRating = filteredByPrice.filter(
        (product) => product.starRating <= productState.ratingRange
      );
   
  

      
      return (
        <ProductsContext.Provider
          value={{
            productState,
            productDispatch,
            isLoading,
            showFilter,  
            toggleFilter,
            filteredByRating
          }}
        >
          {children}
        </ProductsContext.Provider>
      );
    
  }
  export const useProducts = () => useContext(ProductsContext);