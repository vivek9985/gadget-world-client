import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";

import { RouterProvider } from "react-router-dom";
import router from "./Router/Route";
import AuthProvider from "./AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
    <Toaster></Toaster>
  </React.StrictMode>
);
