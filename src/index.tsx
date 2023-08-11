import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./states/store";

import Main from "./pages/main";
import Task from "./pages/task/task";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/task", element: <Task /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
