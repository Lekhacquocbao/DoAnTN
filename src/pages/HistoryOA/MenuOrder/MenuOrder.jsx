import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

import config from '~/config';
import styles from './MenuOrder.module.scss';
import { faStopwatch, faTruck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MenuOrder() {
  const [countPending, setCountPending] = useState();
  const [countPreparing, setCountPreparing] = useState();
  const [countDelivering, setCountDelivering] = useState();
  const [countSuccess, setCountSuccess] = useState();
  function getJwtFromCookie() {
    //lấy token được lưu trong cookie ra
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }
  useEffect(() => {
    const getApiOrderPending = async () => {
      const response = await axios.get('http://localhost:8000/api/order/status/1', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountPending(response.data.result.length);
    };
    const getApiOrderPreparing = async () => {
      const response = await axios.get('http://localhost:8000/api/order/status/2', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountPreparing(response.data.result.length);
    };
    const getApiOrderDelivering = async () => {
      const response = await axios.get('http://localhost:8000/api/order/status/3', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountDelivering(response.data.result.length);
    };
    const getApiOrderSuccess = async () => {
      const response = await axios.get('http://localhost:8000/api/order/status/4', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountSuccess(response.data.result.length);
    };
    getApiOrderPending();
    getApiOrderPreparing();
    getApiOrderDelivering();
    getApiOrderSuccess();
  }, []);
  return (
    <ul className={cx('box-info')}>
      <li onClick={() => window.location.replace(config.routes.orderPending)}>
        <FontAwesomeIcon className={cx('bx')} icon={faHourglassHalf}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countPending}</h3>
          <p>Order is pending</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.orderWaiting)}>
        <FontAwesomeIcon className={cx('bx')} icon={faStopwatch}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countPreparing}</h3>
          <p>Order is preparing</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.orderDelivering)}>
        <FontAwesomeIcon className={cx('bx')} icon={faTruck}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countDelivering}</h3>
          <p>Order is delivering</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.orderSuccess)}>
        <FontAwesomeIcon className={cx('bx')} icon={faCheckCircle}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countSuccess}</h3>
          <p>Order delivered successfully</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.orderSuccess)}>
        <FontAwesomeIcon className={cx('bx')} icon={faCheckCircle}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countSuccess}</h3>
          <p>Order is canceled</p>
        </span>
      </li>
    </ul>
  );
}

export default MenuOrder;
