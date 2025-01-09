import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
// Helper function to filter data by time
const filterByTime = (orders, filter) => {
  const now = new Date();
  return orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    switch (filter) {
      case "Day":
        return orderDate.toDateString() === now.toDateString(); // Same day
      case "Week":
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
        return orderDate >= oneWeekAgo;
      case "Month":
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        ); // Same month and year
      case "Year":
        return orderDate.getFullYear() === now.getFullYear(); // Same year
      default:
        return true; // No filter
    }
  });
};

// @desc Get sales data
// @route GET /api/dashboard/sales
// @access Private/Admin
const getSalesData = asyncHandler(async (req, res) => {
  const { filter } = req.query;
  const orders = await Order.find({});
  const filteredOrders = filterByTime(orders, filter);

  const salesData = filteredOrders.map((order) => ({
    label: new Date(order.createdAt).toLocaleDateString(),
    value: order.orderItems.reduce((acc, item) => acc + item.qty, 0), // Total products sold
  }));

  res.json(salesData);
});

// @desc Get revenue data
// @route GET /api/dashboard/revenue
// @access Private/Admin
const getRevenueData = asyncHandler(async (req, res) => {
  const { filter } = req.query;
  const orders = await Order.find({});
  const filteredOrders = filterByTime(orders, filter);

  const revenueData = filteredOrders.map((order) => ({
    label: new Date(order.createdAt).toLocaleDateString(),
    value: order.totalPrice,
  }));

  res.json(revenueData);
});

// @desc Get latest orders
// @route GET /api/dashboard/orders
// @access Private/Admin
const getLatestOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("user", "name email");

  const latestOrders = orders.map((order) => ({
    _id: order._id,
    customerName: order.user.name,
    total: order.totalPrice,
    status: order.isDelivered ? "Delivered" : "Pending",
  }));

  res.json(latestOrders);
});

export { getSalesData, getRevenueData, getLatestOrders };
