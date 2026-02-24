import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import HomeScreen from "./screen/HomeScreen";
import CartScreen from "./screen/CartScreen";
import ProductScreen from "./screen/ProductScreen";
import { Provider } from "react-redux";
import store from "./store/store";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
