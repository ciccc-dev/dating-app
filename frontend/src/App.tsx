import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { Home } from "./pages/Home";
import { Root } from "./pages/Root";
import { DatingApp } from "./pages/DatingApp";
import { Profile } from "./pages/Profile";

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
        path: "/app",
        element: <DatingApp />,
        children: [
          {
            path: "/app/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
