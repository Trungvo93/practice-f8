const initialState = 0;

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    default:
      return state;
  }
};

export default rootReducer;
