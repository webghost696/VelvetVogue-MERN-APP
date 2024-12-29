import React from "react";
import { createRoot } from "react-dom/client";
import ShopIndex from "./components/shopIndex";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { CookiesProvider } from "react-cookie";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <ShopIndex/>
        </CookiesProvider>
    </React.StrictMode>
);