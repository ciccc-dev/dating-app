import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { DatingApp } from "./pages/DatingApp";
import { Discovery } from "./pages/Discovery";
import { Home } from "./pages/Home";
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
        path: "/discovery",
        element: <Discovery />,
      },
      {
        path: "/messages",
        element: <Messages />,
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
          {
            path: "/app/likes",
            element: <Profile />,
          },
          {
            path: "/app/messages",
            element: <Messages />,
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
