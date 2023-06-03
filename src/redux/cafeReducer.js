export const GET_CAFES = "GET_CAFES";
export const SET_CAFES = "SET_CAFES";

export const getCafes = () => ({
  type: GET_CAFES,
});

export const setCafes = (cafes) => ({
  type: SET_CAFES,
  cafes,
});

const initialCafeState = {
  cafes: [],
};

export default (state = initialCafeState, action) => {
  switch (action.type) {
    case SET_CAFES:
      const { cafes } = action;
      return { ...state, cafes };
    default:
      return state;
  }
};
