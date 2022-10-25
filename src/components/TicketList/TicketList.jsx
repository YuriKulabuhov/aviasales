import TicketItem from '../TicketItem/TicketItem';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { BarLoader } from 'react-spinners';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import * as actions from '../../redux/actionCreators';
import { SpinnerRoundOutlined } from 'spinners-react';
import classes from './TicketList.module.scss';
import { useState } from 'react';

export default function TicketList() {
  const dispatch = useDispatch();
  const { loading, stop, tickets, error } = useSelector((state) => state.services);
  const filter = useSelector((state) => state.filter);
  const [styleBtn, setStyleBtn] = useState({
    cheapest: null,
    fastest: null,
  });
  const [visibleCountTickets, setVisibleCountTickets] = useState(5);
  const visibleTickets = actions.setFilters(filter, tickets).slice(0, [visibleCountTickets]);
  const giveMeMoreFiveTickets = () => {
    setVisibleCountTickets((value) => value + 5);
  };
  const changeFilterCheapest = () => {
    dispatch(actions.getCheapestTickets(tickets));
    setStyleBtn({
      cheapest: classes.active,
      fastest: null,
    });
  };
  const changeFilterFastest = () => {
    dispatch(actions.getFastestTickets(tickets));
    setStyleBtn({
      cheapest: null,
      fastest: classes.active,
    });
  };

  return (
    <div className={classes.TicketList}>
      {!stop && error !== 2 && (
        <BarLoader color="#2196f3" loading speedMultiplier={0.3} width="100%" height={10} />
      )}
      <div className={classes.TicketSort}>
        <button className={styleBtn.cheapest} onClick={changeFilterCheapest}>
          САМЫЙ ДЕШЕВЫЙ
        </button>
        <button className={styleBtn.fastest} onClick={changeFilterFastest}>
          САМЫЙ БЫСТРЫЙ
        </button>
      </div>
      {stop && filter.every((item) => !item.checked) && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">No flights found for your request</Alert>
        </Stack>
      )}
      {error === 2 && !stop ? (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">
            The information was not fully loaded, please reload the page
          </Alert>
        </Stack>
      ) : loading && !stop ? (
        <SpinnerRoundOutlined size={88} color="2196F3" speed={80} />
      ) : (
        visibleTickets.map((ticket) => (
          <TicketItem
            key={uuidv4()}
            price={ticket.price}
            segments={ticket.segments}
            carrier={ticket.carrier}
          />
        ))
      )}

      <button className={classes.more} onClick={giveMeMoreFiveTickets}>
        ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
      </button>
    </div>
  );
}
