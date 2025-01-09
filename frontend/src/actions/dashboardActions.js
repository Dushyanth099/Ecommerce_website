import axios from "axios";
import {
  DASHBOARD_SALES_REQUEST,
  DASHBOARD_SALES_SUCCESS,
  DASHBOARD_SALES_FAIL,
  DASHBOARD_REVENUE_REQUEST,
  DASHBOARD_REVENUE_SUCCESS,
  DASHBOARD_REVENUE_FAIL,
  DASHBOARD_PRODUCTS_REQUEST,
  DASHBOARD_PRODUCTS_SUCCESS,
  DASHBOARD_PRODUCTS_FAIL,
  DASHBOARD_ORDERS_REQUEST,
  DASHBOARD_ORDERS_SUCCESS,
  DASHBOARD_ORDERS_FAIL,
} from "../constants/dashboardConstants";

// Fetch sales data
export const getSalesData = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: DASHBOARD_SALES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.get(
      `/api/dashboard/sales?filter=${filter}`,
      config
    );

    dispatch({ type: DASHBOARD_SALES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DASHBOARD_SALES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRevenueData = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: DASHBOARD_REVENUE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.get(
      `/api/dashboard/revenue?filter=${filter}`,
      config
    );

    dispatch({ type: DASHBOARD_REVENUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DASHBOARD_REVENUE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDashboardOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DASHBOARD_ORDERS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.get(`/api/dashboard/orders`, config);

    dispatch({ type: DASHBOARD_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DASHBOARD_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
