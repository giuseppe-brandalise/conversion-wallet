// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_CURRENCY, SAVE_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCY:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload.expenses,
    };
  default:
    return state;
  }
};

export default walletReducer;
