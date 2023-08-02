import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { DatingApp } from "./pages/DatingApp";
import { Discovery } from "./pages/Discovery";
import { Home } from "./pages/Home";
import { Likes } from "./pages/Likes";
import { Messages } from "./pages/Messages";
import { Profile } from "./pages/Profile";
import { Root } from "./pages/Root";

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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/app",
        element: <DatingApp />,
        children: [
          {
            path: "/app/profile",
            element: <Profile />,
          },
          {
            path: "/app/discovery",
            element: <Discovery />,
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
