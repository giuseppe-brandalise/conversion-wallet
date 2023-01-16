// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_USER, SET_INITIAL_STATE } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      email: action.payload.email,
    };
  case SET_INITIAL_STATE:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default userReducer;
