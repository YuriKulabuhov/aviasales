import { useEffect } from 'react';
import { Offline } from 'react-detect-offline';
import * as services from './redux/services';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import classes from './App.module.scss';
import Filter from './components/Filter/Filter';
import logo from './media/Logo.svg';
import TicketList from './components/TicketList/TicketList';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const { stop, searchId, tickets, error } = useSelector((state) => state.services);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error < 5) {
      if (searchId === null) {
        dispatch(services.startGuestSession());
      }
      if (!stop && searchId !== null) {
        dispatch(services.getTicketsStack(searchId));
      }
    }
  }, [error, searchId, stop, tickets]);

  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <img className={classes.logotype} alt="Logo" src={logo} width="100" height="70" />
        <Offline>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
              The internet is over, you need to pay for it and reload the page
            </Alert>
          </Stack>
        </Offline>
      </header>
      <aside className={classes.filter}>
        <Filter />
      </aside>
      <article className={classes.menu}>
        <TicketList />
      </article>
    </div>
  );
}

export default App;
