// syncFunctions
export const filterCheapest = (array) => {
  function byProperty(property) {
    return (a, b) => (a[property] > b[property] ? 1 : -1);
  }
  const result = array.sort(byProperty('price'));
  return result;
};
export const filterFastest = (array, segments = 'segments') => {
  function byProperty(property) {
    return (a, b) => (a[segments][0][property] > b[segments][0][property] ? 1 : -1);
  }
  const result = array.sort(byProperty('duration'));
  return result;
};
export const setFilters = (filters, tickets) => {
  let result = [];
  filters
    .filter((el) => el.checked)
    .forEach((item) => {
      if (item.id === 1 && item.checked === true) {
        return tickets;
      }
      if (item.id === 2 && item.checked === true) {
        const arr = tickets.filter(
          (e) => e.segments[0].stops.length === 0 || e.segments[1].stops.length === 0
        );
        result = [...result, ...arr];
      }
      if (item.id === 3 && item.checked === true) {
        const arr = tickets.filter(
          (e) => e.segments[0].stops.length === 1 || e.segments[1].stops.length === 1
        );
        result = [...result, ...arr];
      }
      if (item.id === 4 && item.checked === true) {
        const arr = tickets.filter(
          (e) => e.segments[0].stops.length === 2 || e.segments[1].stops.length === 2
        );
        result = [...result, ...arr];
      }
      if (item.id === 5 && item.checked === true) {
        const arr = tickets.filter(
          (e) => e.segments[0].stops.length === 3 || e.segments[1].stops.length === 3
        );
        result = [...result, ...arr];
      }
    });
  return result;
};

// syncActions
export const toggleCheckbox = (filterId) => ({
  type: 'CHECKED_FILTER',
  filterId,
});
export const toggleCheckAll = (idChecked) => ({
  type: 'ALL_FILTERS',
  idChecked,
});

// asyncActions
export const getSearchId = ({ searchId }) => ({
  type: 'GET_SEARCH_ID',
  searchId,
});
export const getAllTickets = ({ tickets, stop }) => ({
  type: 'GET_ALL_TICKETS',
  tickets,
  stop,
});
export const getError = (error) => ({
  type: 'GET_ERROR',
  error,
});
