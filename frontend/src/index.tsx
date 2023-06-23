import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Bootstrap = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_URL as string}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Auth0Provider>
  );
};

root.render(<Bootstrap />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
