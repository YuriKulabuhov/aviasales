import { useSelector, useDispatch } from 'react-redux';
import classes from './Filter.module.scss';
import * as action from '../../redux/actionCreators';

export default function Filter() {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  return (
    <div className={classes.Filter}>
      <ul>
        <span>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
        <li>
          <label>
            <input
              type="checkbox"
              checked={filter.every((item) => item.checked)}
              onChange={(event) => dispatch(action.toggleCheckAll(event.target.checked))}
            />
            <span />
            Все
          </label>
        </li>
        {filter.map((checkValue) => (
          <li key={checkValue.id}>
            <label>
              <input
                type="checkbox"
                checked={checkValue.checked}
                onChange={() => dispatch(action.toggleCheckbox(checkValue.id))}
              />
              <span />
              {checkValue.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
