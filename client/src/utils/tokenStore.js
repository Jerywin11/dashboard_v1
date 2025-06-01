// src/utils/tokenStore.js
let authToken = null;

export const setToken = (token) => {
  authToken = token;
};

export const getToken = () => authToken;
