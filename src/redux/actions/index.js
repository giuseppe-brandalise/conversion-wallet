// Coloque aqui suas actions
export const SAVE_USER = 'SAVE_USER';
export const CHANGE_WALLET = 'CHANGE_WALLET';

export const saveUSer = (informations) => ({
  type: SAVE_USER,
  informations,
});

export const cahngeWallet = (informations) => ({
  type: CHANGE_WALLET,
  informations,
});
