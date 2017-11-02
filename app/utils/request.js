import 'whatwg-fetch';
import { endpoint, apiKey } from 'shared/constants';

const parseJSON = response => {
  if (response.status === 204) {
    return {};
  }
  return response.json();
};

// @TODO Wrap to action error
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  if (response.json) {
    return response.json()
      .then(json => {
        error.payload = json;
        throw error;
      });
  }
  throw error;
};

const checkAuth = response => {
  // if (response.status === 403 && localStorage.token) {
  //   delete localStorage.token;
  //   delete localStorage.user;
  //   location.reload();
  // }
  return response;
};

const fetchRequest = (url, options) =>
  fetch(url, {
    ...options,
    headers: {
      'Content-Type': options.isImage ? 'image/png' : 'application/json',
      ...(options.headers || {}),
    },
  })
    .catch(err => {
      const error = new Error(err);
      error.url = url;
      throw error;
    });

const request = (url, options = {}) =>
  fetchRequest(url, options)
    .then(checkAuth)
    .then(checkStatus)
    .then(parseJSON);

export const requestBackend = (url, options) => request(`${endpoint}${url}`, {
  ...options,
  headers: {
    'X-API-KEY': apiKey,
  },
});

export default request;
