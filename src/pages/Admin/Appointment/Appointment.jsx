import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

import config from '~/config';
import styles from './Appointment.module.scss';
import { faStopwatch, faTruck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Appointment() {
  const [countPending, setCountPending] = useState();
  const [countApproval, setCountApproval] = useState();
  const [countCanceled , setCountCanceled] = useState();

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
      const response = await axios.get('http://localhost:8000/api/order/All/status/1', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountPending(response.data.result.length);
    };
    const getApiAppointmentApproval = async () => {
      const response = await axios.get('http://localhost:8000/api/order/All/status/2', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountApproval(response.data.result.length);
    };
    const getApiAppointmentCanceled = async () => {
      const response = await axios.get('http://localhost:8000/api/order/All/status/3', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountCanceled(response.data.result.length);
    };

    getApiOrderPending();
    getApiAppointmentApproval();
    getApiAppointmentCanceled();
  }, []);
  return (
    <ul className={cx('box-info')}>
      <li onClick={() => window.location.replace(config.routes.adminPending)}>
        <FontAwesomeIcon className={cx('bx')} icon={faHourglassHalf}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countPending}</h3>
          <p>Appointment is pending</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.adminWaiting)}>
        <FontAwesomeIcon className={cx('bx')} icon={faStopwatch}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countApproval}</h3>
          <p>Appointment is prepared</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.adminDelivering)}>
        <FontAwesomeIcon className={cx('bx')} icon={faTruck}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countCanceled}</h3>
          <p>Appointment is canceled</p>
        </span>
      </li>

    </ul>
  );
}

export default Appointment;
