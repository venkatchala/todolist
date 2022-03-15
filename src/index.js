import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Todo from "./todo";
import store from "./store";
import { Provider } from "react-redux";
import Settings from "./Settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <div>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </div>,

  document.getElementById("root")
);
