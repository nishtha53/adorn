import axios from "axios";

const getProductsService = async () => await axios.get("/api/products");

const getCategoriesService = async () => await axios.get("/api/categories");


export { getProductsService, getCategoriesService };