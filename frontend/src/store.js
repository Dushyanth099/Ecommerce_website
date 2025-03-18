import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productBulkUploadReducer,
  productUpdateReducer,
  productreviewCreateReducer,
  reviewApproveReducer,
  reviewListReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";
import {
  CreateOrderReducers,
  OrderDeliverreducer,
  OrderDetailsreducer,
  OrderListMyreducer,
  OrderListreducer,
  OrderPayreducer,
  invoiceReducer,
  incomeReducer,
  transactionListReducer,
  StripepaymentReducer,
} from "./reducers/orderReducers";

import { shipmentReducer, shippingReducer } from "./reducers/deliveryReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  favoritesReducer,
} from "./reducers/userReducers";

import {
  salesReducer,
  revenueReducer,
  ordersReducer,
  totalOrdersReducer,
} from "./reducers/dashboardReducers";

import {
  bannerAddReducer,
  bannerListReducer,
  bannerDeleteReducer,
  videoBannerUploadReducer,
  videoBannerListReducer,
  videoBannerDeleteReducer,
  userVideoBannerListReducer,
} from "./reducers/bannerReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productBulkUpload: productBulkUploadReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productreviewCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: CreateOrderReducers,
  orderDetails: OrderDetailsreducer,
  orderPay: OrderPayreducer,
  orderMylist: OrderListMyreducer,
  orderList: OrderListreducer,
  orderDeliver: OrderDeliverreducer,
  sales: salesReducer,
  revenue: revenueReducer,
  orders: ordersReducer,
  invoiceDetails: invoiceReducer,
  bannerAdd: bannerAddReducer,
  bannerList: bannerListReducer,
  bannerDelete: bannerDeleteReducer,
  totalOrders: totalOrdersReducer,
  addvideoBanners: videoBannerUploadReducer,
  getvideoBanners: videoBannerListReducer,
  deletevideoBanners: videoBannerDeleteReducer,
  userVideoBanners: userVideoBannerListReducer,
  income: incomeReducer,
  transactionList: transactionListReducer,
  shipping: shippingReducer,
  shipment: shipmentReducer,
  stripepayment: StripepaymentReducer,
  reviewList: reviewListReducer,
  reviewApprove: reviewApproveReducer,
  favorites: favoritesReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: [],
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middelware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middelware))
);

export default store;
