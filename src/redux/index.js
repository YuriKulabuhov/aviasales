import { combineReducers } from 'redux';

const initialState = {
  tickets: [],
  loading: true,
  searchId: null,
  stop: false,
  error: 0,
};
function serviceReducer(state = initialState, { type, tickets, stop, fnc, searchId } = {}) {
  switch (type) {
    case 'GET_SEARCH_ID':
      return { ...state, searchId };
    case 'GET_ERROR':
      return { ...state, error: state.error + 1 };
    case 'GET_ALL_TICKETS': {
      const newPack = state.tickets.concat(tickets);
      return { ...state, tickets: newPack, stop };
    }
    case 'GET_CHEAPEST_TICKETS':
      return {
        ...state,
        tickets: fnc,
      };
    case 'GET_FASTEST_TICKETS':
      return {
        ...state,
        tickets: fnc,
      };
    default:
      return state;
  }
}
const stateFilter = [
  { id: 1, label: 'Без пересадок', checked: true },
  { id: 2, label: '1 пересадка', checked: true },
  { id: 3, label: '2 пересадки', checked: true },
  { id: 4, label: '3 пересадки', checked: true },
];
function choiseFiltersReducer(state = stateFilter, { type, filterId, idChecked } = {}) {
  switch (type) {
    case 'CHECKED_FILTER':
      return state.map((item) =>
        item.id === filterId ? { ...item, checked: !item.checked } : item
      );
    case 'ALL_FILTERS':
      return state.map((item) => ({ ...item, checked: idChecked }));
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  filter: choiseFiltersReducer,
  services: serviceReducer,
});
export default rootReducer;
