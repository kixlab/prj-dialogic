import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./states/store";

import Main from "./pages/main";
import Task from "./pages/task/task";
import "./index.css";
import Gen from "./pages/task/gen/gen";
import Eval from "./pages/task/eval/eval";
import Author from "./pages/task/author/author";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  {
    path: "/task",
    element: <Task />,
    children: [
      {
        path: "/task/gen",
        element: <Gen />,
      },
      {
        path: "/task/eval",
        element: <Eval />,
      },
      {
        path: "/task/author",
        element: <Author />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
