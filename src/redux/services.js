import * as actions from './actionCreators';

export const startGuestSession = () => {
  return function (dispatch) {
    return fetch('https://front-test.dev.aviasales.ru/search')
      .then((body) => body.json())
      .then((json) => dispatch(actions.getSearchId(json)))
      .catch((error) => {
        dispatch(actions.getError());
      });
  };
};
export const getTicketsStack = (key) => {
  return function (dispatch) {
    return fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${key}`)
      .then((body) => body.json())
      .then((json) => dispatch(actions.getAllTickets(json)))
      .catch((error) => {
        dispatch(actions.getError());
      });
  };
};
