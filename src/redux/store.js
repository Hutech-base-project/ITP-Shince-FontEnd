import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from "redux";
import { persistStore } from "redux-persist";
import AuthPage  from './Auth/auth_page_reducer';
import CategoriesPage  from './Category/category_page_reducer';
import OtpPage  from './Otp/otp_page_reducer';
import ProductPage  from './Product/product_page_reducer';
import AccountPage from './Account/account_page_reducer';
import Roles from './Role/role_reducer';
import ServicesPage from './Service/service_page_reducer';
import CartPage  from './Cart/cart_page_reducer';
import StoragePage from './Storage/storage_page_reducer';
import BookingPage from './Booking/booking_page_reducer';
const rootReducer = combineReducers({
    AuthPage,
    CategoriesPage,
    OtpPage,
    ProductPage,
    AccountPage,
    Roles,
    ServicesPage,
    CartPage,
    StoragePage,
    BookingPage,
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["CartPage"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);