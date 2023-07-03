import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../views/home/Login";
// import Visitors from "../views/Visitors/Visitors";
import Protected from "../components/Protected";
export const router = createBrowserRouter([
  {
    element: <App></App>,
    children: [
      { path: "/", element: <Login></Login> },
      { path: "/visitor", element: <Protected></Protected> },
    ],
  },
]);
