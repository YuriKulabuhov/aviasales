import classes from './TicketItem.module.scss';
import Segments from './Segments/Segments';
import { v4 as uuidv4 } from 'uuid';
import { NumericFormat } from 'react-number-format';

export default function TicketItem({ price, segments, carrier }) {
  const imgCompany = `https://pics.avs.io/99/36/${carrier}.png`;
  return (
    <div className={classes.TicketItem}>
      <div className={classes.TicketItem__header}>
        <span>
          <NumericFormat
            value={price}
            thousandsGroupStyle="lakh"
            thousandSeparator=" "
            displayType="text"
          />
          &#x20bd;
        </span>
        <img src={imgCompany} alt="logo" />
      </div>
      {segments.map((segment) => (
        <Segments key={uuidv4()} segment={segment} />
      ))}
    </div>
  );
}
