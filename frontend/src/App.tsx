import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { Discovery } from "./pages/Discovery";
import { Home } from "./pages/Home";
import { Likes } from "./pages/Likes";
import { Messages } from "./pages/Messages";
import { Account } from "./pages/Account";
import { Root } from "./pages/Root";
import { Signup } from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/likes",
        element: <Likes />,
      },
      {
        path: "/discovery",
        element: <Discovery />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
