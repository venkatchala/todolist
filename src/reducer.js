const todoReducer = function (state = [], action) {
  switch (action.type) {
    case "loading":
      return JSON.parse(localStorage.getItem("TodoList"));
    case "addTodo":
      return [...state, action.payload];
    case "updateStatus":
      return state.map((val, index) => {
        if (index === action.payload) {
          val.status === 0 ? (val.status = 1) : (val.status = 0);
        }
        return val;
      });
    case "deleteTodo":
      return state.filter((val, index) => {
        if (index === action.payload) {
          localStorage.removeItem("TodoList");
          return false;
        }
        return val;
      });
    case "removeCompleteTasks":
      return state.filter((val) => val.status === 0);
    default:
      return state;
  }
};
export default todoReducer;
