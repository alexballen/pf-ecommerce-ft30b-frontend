import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "ejemploAll",
  initialState: {
    products: [],
  },
  reducers: {
    allProducts: (state, action) => {
      state.products = action.payload;
    },
    byOrder: (state, action) => {
      const orderProducts =
        action.payload === "Asc"
          ? state.products.sort((a, b) => (a.name > b.name ? 1 : -1))
          : state.products.sort((a, b) => (a.name > b.name ? -1 : 1));
      state.products = orderProducts;
    },
    byPrice: (state, action) => {
      const orderPrice =
        action.payload === "Max"
          ? state.products.sort((a, b) => (a.unitPrice > b.unitPrice ? -1 : 1))
          : state.products.sort((a, b) => (a.unitPrice > b.unitPrice ? 1 : -1));
      state.products = orderPrice;
    },
  },
});

export const { allProducts, byOrder, byPrice } = productSlice.actions;
export default productSlice.reducer;