export const SAVE_USER = 'SAVE_USER';
export const CHANGE_WALLET = 'CHANGE_WALLET';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

export const saveUSer = (email) => ({
  type: SAVE_USER,
  payload:
    email,
});

export const cahngeWallet = (informations) => ({
  type: CHANGE_WALLET,
  informations,
});

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});
