import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-center"
          theme="dark"
          richColors={false}
          style={{ marginTop: "114px" }}
          toastOptions={{
            className: `
            h-[52px] 
            w-[531px]
            flex items-center justify-center
            text-center
            bg-black/25
            backdrop-blur-xl
            text-white
            rounded-full
            border border-white/10
            shadow-xl
            px-6
            rounded-[16px]
          `,
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
