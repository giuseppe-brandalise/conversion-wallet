// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CHANGE_WALLET } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_WALLET:
    return {
      ...state,
      test: 'test',
    };
  default:
    return state;
  }
};

export default walletReducer;
