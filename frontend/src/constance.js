/* eslint-disable no-undef */
export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export const PRODUCT_URL = `${BASE_URL}/api/products`;
export const ORDER_URL = `${BASE_URL}/api/orders`;
export const USERS_URL = `${BASE_URL}/api/users`;
export const PAYPAL_URL = `${BASE_URL}/api/config/paypal`;
