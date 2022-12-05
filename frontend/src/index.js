import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";

import AlertTemplate from 'react-alert-template-basic';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';

const options = {
	timeout: 5000,
	position: positions.BOTTOM_CENTER,
	transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById("main"));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
			<App />
		</AlertProvider>
  </Provider>
);