import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import GetToken from '~/Token/GetToken';

import config from '~/config';
import styles from './HistoryMenu.module.scss';
import { faCancel, faStopwatch, faTruck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Profile = React.lazy(() => import('~/layouts/Profile'));


function HistoryMenu() {
  const [countPending, setCountPending] = useState();
  const [countPreparing, setCountPreparing] = useState();
  const [countDelivering, setCountDelivering] = useState();
  const [countSuccess, setCountSuccess] = useState();
  const [historyOrder, setHistoryOrder] = useState([]);
  
  useEffect(() => {
    const getApiHistoryOrder = async () => {
      const response = await axios.get('http://localhost:8000/api/order/history', {
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      });
      setHistoryOrder(response.data.result);
    };
    getApiHistoryOrder();
  }, []);

  return (
    <Profile>
      <ul className={cx('box-info')}>
      <li onClick={() => window.location.replace(config.routes.historyPending)}>
        <FontAwesomeIcon className={cx('bx')} icon={faHourglassHalf}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countPending}</h3>
          <p>Order is pending</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.adminWaiting)}>
        <FontAwesomeIcon className={cx('bx')} icon={faStopwatch}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countPreparing}</h3>
          <p>Order is preparing</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.adminDelivering)}>
        <FontAwesomeIcon className={cx('bx')} icon={faTruck}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countDelivering}</h3>
          <p>Order is delivering</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.adminSuccess)}>
        <FontAwesomeIcon className={cx('bx')} icon={faCheckCircle}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countSuccess}</h3>
          <p>Order delivered successfully</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.adminSuccess)}>
        <FontAwesomeIcon className={cx('bx')} icon={faCancel}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countSuccess}</h3>
          <p>Order is canceled</p>
        </span>
      </li>
    </ul>
    </Profile>
    
  );
}

export default HistoryMenu;
