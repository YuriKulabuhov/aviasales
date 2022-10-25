import classes from './Segments.module.scss';
import minutesToHours from 'date-fns/minutesToHours';
import intlFormat from 'date-fns/intlFormat';

export default function Segments({ segment }) {
  const hoursToTrip = minutesToHours(segment.duration);
  const minutesToTrip = segment.duration - hoursToTrip * 60;

  const startTripTime = intlFormat(new Date(segment.date), {
    hour: 'numeric',
    minute: 'numeric',
  });
  const endTripTime = intlFormat(new Date(+new Date(segment.date) + segment.duration * 6e4), {
    hour: 'numeric',
    minute: 'numeric',
  });
  return (
    <div className={classes.TicketItem__transfers}>
      <div>
        <span>{`${segment.origin}-${segment.destination}`}</span>
        <span>{`${startTripTime} - ${endTripTime}`}</span>
      </div>
      <div>
        <span>В ПУТИ</span>
        <span>{`${hoursToTrip}ч ${minutesToTrip}м`}</span>
      </div>
      <div>
        {segment.stops.length !== 0 ? (
          <span>{`${segment.stops.length} ПЕРЕСАДКИ`} </span>
        ) : (
          <span>БЕЗ ПЕРЕСАДОК</span>
        )}
        <span>{segment.stops.join()}</span>
      </div>
    </div>
  );
}
