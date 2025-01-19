import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

console.log(CLIENT_ID);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <RouterProvider router={router}></RouterProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
