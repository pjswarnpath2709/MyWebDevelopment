export default (usersState = [], action) => {
  switch (action.type) {
    case "FETCH_USER_DATA":
      return [...usersState, action.payload];
    default:
      return usersState;
  }
};
