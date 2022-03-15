import { createStore } from "redux";
import todoReducer from "./reducer";
let store = createStore(todoReducer);
export default store;
