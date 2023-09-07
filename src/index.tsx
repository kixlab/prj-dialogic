import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./states/store";

import Main from "./pages/main";
import Task from "./pages/task/task";
import "./styles/index.css";
import Gen from "./pages/task/gen/gen";
import Eval from "./pages/task/eval/eval";
import Author from "./pages/task/author/author";
import Capture from "./pages/task/capture/capture";

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
  {
    path: "/base",
    element: <Task />,
    children: [
      {
        path: "/base/gen",
        element: <Gen />,
      },
      {
        path: "/base/eval",
        element: <Eval />,
      },
      {
        path: "/base/author",
        element: <Author />,
      },
    ],
  },
  {
    path: "/cap",
    element: <Capture />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
