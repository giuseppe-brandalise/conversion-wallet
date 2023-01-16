export const SAVE_USER = 'SAVE_USER';
export const SAVE_CURRENCY = 'SAVE_CURRENCY';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

export const saveUSer = (email) => ({
  type: SAVE_USER,
  payload: {
    email,
  },
});

export const saveCurrency = (currencies) => ({
  type: SAVE_CURRENCY,
  payload: {
    currencies,
  },
});

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});
