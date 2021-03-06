/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */

export const loadAuthToken = () => localStorage.getItem('authToken');

export const saveAuthToken = authToken => {
  try {
    localStorage.setItem('authToken', authToken);
  } catch (e) {}
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (e) {}
};
