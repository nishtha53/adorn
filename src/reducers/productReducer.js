export  const initialProductState = {
    products: [],
    allCategories: [],
    categoryInput: [],
    searchInput: "",
    metalTypeInput: [],
    sortPriceRadioInput: "",
    ratingRange: 5,
}

export const productReducer = (state, {type,payload}) => {
    switch(type) {
        case "DISPLAY_PRODUCTS":
            return { ...state, products: payload };
        case "DISPLAY_CATEGORIES":
            return { ...state, allCategories: payload };
        case "CATEGORY":
                return {
                  ...state,
                  categoryInput: state.categoryInput.includes(payload)
                    ? state.categoryInput.filter(
                        (categoryType) => categoryType !== payload
                      )
                    : [...state.categoryInput, payload],
                };
        case "SEARCH":
                return { ...state, searchInput: payload };
        case "METALTYPE":
                return {
                      ...state,
                      metalTypeInput: state.metalTypeInput.includes(payload)
                        ? state.metalTypeInput.filter((metalType) => metalType !== payload)
                        : [...state.metalTypeInput, payload],
                    };
        case "SORT_BY_PRICE":
                return { ...state, sortPriceRadioInput: payload };
        case "SORT_BY_RATING_RANGE":
                return { ...state, ratingRange: payload };
        case "CLEAR_FILTERS":
                return {
                          ...initialProductState,
                          products: payload.products,
                          allCategories: payload.categories,
                        };
        default:
            return state;
    }
}