import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppContextProvider from "./context/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="826996089261-hpmep9diaqt0a6oe5oubesmv9d6as4at.apps.googleusercontent.com">
    <AppContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AppContextProvider>
  </GoogleOAuthProvider>
);
