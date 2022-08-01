import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const response = await csrfFetch('/session', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  //line 30 - data.user
  return response;
};

export const demoUsers = () => async (dispatch) => {
  const response = await csrfFetch('/session', {
      method: 'POST',
      body: JSON.stringify({
          email: 'john.smith@gmail.com',
          password: 'secret password'
      }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  //line 37 - data.user
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password } = user;
  const response = await csrfFetch("/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  //line 54 - data.user
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;