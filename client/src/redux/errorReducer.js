import { GET_ERRORS } from "../actions/types";
const initialState = {
    errors:{}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return{
          ...state,
          errors:action.payload
      };
    default:
      return state;
  }
}