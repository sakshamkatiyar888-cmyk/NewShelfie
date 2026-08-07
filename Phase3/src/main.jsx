import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";

import AppRouter from "./router/AppRouter";

import store from "./redux/store";


import ThemeProvider from "./context/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider>
     <AppRouter />
    </ThemeProvider>
    </Provider>
  </StrictMode>
);