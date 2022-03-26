const initialState = {
  todos: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AddList":
      return {
        ...state,
        todos: [...action.payload.array],
      };
    case "DeleteList":
      return {
        ...state,
        todos: [...action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
