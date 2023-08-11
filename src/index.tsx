import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./pages/main";
import Task from "./pages/task/task";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/task", element: <Task /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
