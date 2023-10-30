import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { router } from "./routing/router-config.js";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
