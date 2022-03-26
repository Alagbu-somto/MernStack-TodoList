const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "Check":
      return action.payload;

    default:
      return state;
  }
};

export default loggedReducer;
