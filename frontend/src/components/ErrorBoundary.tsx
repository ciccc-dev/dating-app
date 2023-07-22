import { useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
  let error = useRouteError();

  console.error(error);
  console.error(typeof error);
  // Uncaught ReferenceError: path is not defined
  return <div>Sorry 404</div>;
};
