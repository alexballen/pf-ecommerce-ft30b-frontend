import { createSlice } from "@reduxjs/toolkit";

const sortAndFilter = (
  products,
  nameFilter,
  categoryFilter,
  brandFilter,
  sortType
) => {
  // Filtrar por nombre (campo de busqueda)
  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(nameFilter.toLowerCase())
  );
  // Filtrar por categoria, si existe un filtro
  filteredProducts =
    categoryFilter === "All"
      ? filteredProducts
      : filteredProducts.filter((product) =>
          product.categories.some(
            (category) => category.name === categoryFilter
          )
        );
  // Filtrar por marca, si existe un filtro
  filteredProducts =
    brandFilter === "All"
      ? filteredProducts
      : filteredProducts.filter(
          (product) => product.brand.name === brandFilter
        );
  // Ordenar el arreglo filtrado
  switch (sortType) {
    case "A-Z":
      return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    case "Z-A":
      return filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    case "MinPrice":
      return filteredProducts.sort((a, b) => a.unitPrice - b.unitPrice);
    case "MaxPrice":
      return filteredProducts.sort((a, b) => b.unitPrice - a.unitPrice);
    default:
      return filteredProducts;
  }
};

const productSlice = createSlice({
  name: "allProducts",
  initialState: {
    products: [], // todos los productos
    product: {},
    categories: [],
    brands: [],
    filteredProducts: [], // productos filtrados
    nameFilter: "", // search bar
    categoryFilter: "All",
    brandFilter: "All",
    sortType: "", // tipo de ordenamiento
    page: 1,
    paymenturl: "", //url de compra por item
  },
  reducers: {
    pagePaginated: (state, action) => {
      state.page = action.payload;
    },
    allProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = sortAndFilter(
        action.payload,
        state.nameFilter,
        state.categoryFilter,
        state.brandFilter,
        state.sortType
      );
    },
    allProductsForUser: (state, action) => {
      const products = action.payload.map((product) => ({
        ...product,
        isFavorite: product.favorites.length > 0,
      }));
      state.products = products;
      state.filteredProducts = sortAndFilter(
        products,
        state.nameFilter,
        state.categoryFilter,
        state.brandFilter,
        state.sortType
      );
    },
    allCategories: (state, action) => {
      state.categories = action.payload;
    },
    allBrands: (state, action) => {
      state.brands = action.payload;
    },
    GetProduct: (state, action) => {
      const product = action.payload;

      state.product = product;
    },
    clearproduct: (state) => {
      state.product = {};
    },
    searchByName: (state, action) => {
      state.filteredProducts = sortAndFilter(
        state.products,
        action.payload,
        state.categoryFilter,
        state.brandFilter,
        state.sortType
      );
      state.nameFilter = action.payload;
    },
    filterByCategory: (state, action) => {
      state.filteredProducts = sortAndFilter(
        state.products,
        state.nameFilter,
        action.payload,
        state.brandFilter,
        state.sortType
      );
      state.categoryFilter = action.payload;
    },
    filterByBrand: (state, action) => {
      state.filteredProducts = sortAndFilter(
        state.products,
        state.nameFilter,
        state.categoryFilter,
        action.payload,
        state.sortType
      );
      state.brandFilter = action.payload;
    },
    sort: (state, action) => {
      state.filteredProducts = sortAndFilter(
        state.products,
        state.nameFilter,
        state.categoryFilter,
        state.brandFilter,
        action.payload
      );
      state.sortType = action.payload;
    },
    urlpayment(state, action) {
      state.paymenturl = action.payload;
    },
    deleteProduct(state, action) {
      const delPro = state.products.filter((e) => e.id !== action.payload);
      state.filteredProducts = delPro;
    },
  },
});

export const {
  allProducts,
  allProductsForUser,
  allCategories,
  allBrands,
  GetProduct,
  clearproduct,
  searchByName,
  filterByCategory,
  filterByBrand,
  sort,
  pagePaginated,
  urlpayment,
  deleteProduct,
} = productSlice.actions;
export default productSlice.reducer;
