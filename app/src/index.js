import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import * as serviceWorker from "./serviceWorker";
import { MantineProvider } from "@mantine/core";
import { AppProvider } from "./AppContext";
import { Notifications } from "@mantine/notifications";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <AppProvider>
            <MantineProvider>
                <Notifications />
                <App />
            </MantineProvider>
        </AppProvider>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
