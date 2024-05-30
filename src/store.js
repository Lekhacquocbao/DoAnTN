// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice'; // Adjust the path if necessary

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
