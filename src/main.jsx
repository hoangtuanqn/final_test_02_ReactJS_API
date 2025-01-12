import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./assets/css/reset.css";
import "./assets/css/style.css";
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);
