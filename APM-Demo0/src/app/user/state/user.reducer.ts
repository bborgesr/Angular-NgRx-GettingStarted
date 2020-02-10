export function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_NAME_MASK":
      return {
        ...state,
        showMaskedName: action.payload
      };
    default:
      return state;
  }
}
