import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

import store from "./app/store";
import App from "./App";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";   


import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <Notifications position="top-right" />
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
