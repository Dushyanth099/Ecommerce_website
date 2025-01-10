import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  INVOICE_REQUEST,
  INVOICE_SUCCESS,
  INVOICE_FAIL,
} from "../constants/orderConstants";
import {
  ORDER_DELIVERY_LIST_REQUEST,
  ORDER_DELIVERY_LIST_SUCCESS,
  ORDER_DELIVERY_LIST_FAIL,
  ORDER_ACCEPT_REQUEST,
  ORDER_ACCEPT_SUCCESS,
  ORDER_ACCEPT_FAIL,
  ORDER_REJECT_REQUEST,
  ORDER_REJECT_SUCCESS,
  ORDER_REJECT_FAIL,
  ORDER_COMPLETE_REQUEST,
  ORDER_COMPLETE_SUCCESS,
  ORDER_COMPLETE_FAIL,
  ORDER_RETURN_REQUEST,
  ORDER_RETURN_SUCCESS,
  ORDER_RETURN_FAIL,
  ORDER_ASSIGN_REQUEST,
  ORDER_ASSIGN_SUCCESS,
  ORDER_ASSIGN_FAIL,
} from "../constants/orderConstants";

export const CreateOrderReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const OrderDetailsreducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const OrderPayreducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const OrderDeliverreducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const OrderListMyreducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const OrderListreducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// delivery
export const deliveryOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_DELIVERY_LIST_REQUEST:
      return { loading: true, orders: [] };
    case ORDER_DELIVERY_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_DELIVERY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderAcceptReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ACCEPT_REQUEST:
      return { loading: true };
    case ORDER_ACCEPT_SUCCESS:
      return { loading: false, success: true };
    case ORDER_ACCEPT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderRejectReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_REJECT_REQUEST:
      return { loading: true };
    case ORDER_REJECT_SUCCESS:
      return { loading: false, success: true };
    case ORDER_REJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_COMPLETE_REQUEST:
      return { loading: true };
    case ORDER_COMPLETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_COMPLETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderReturnReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_RETURN_REQUEST:
      return { loading: true };
    case ORDER_RETURN_SUCCESS:
      return { loading: false, success: true };
    case ORDER_RETURN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderAssignReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ASSIGN_REQUEST:
      return { loading: true };
    case ORDER_ASSIGN_SUCCESS:
      return { loading: false, success: true };
    case ORDER_ASSIGN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const invoiceReducer = (state = { invoice: {} }, action) => {
  switch (action.type) {
    case INVOICE_REQUEST:
      return { loading: true };
    case INVOICE_SUCCESS:
      return { loading: false, invoice: action.payload };
    case INVOICE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};