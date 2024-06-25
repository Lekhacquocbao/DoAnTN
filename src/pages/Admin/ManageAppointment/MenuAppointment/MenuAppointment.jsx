import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '~/config';
import styles from './MenuAppointment.module.scss';
import { faCancel, faCheck, faCheckCircle} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MenuAppointment() {
  const [countPending, setCountPending] = useState();
  const [countAccepted, setCountAccepted] = useState();
  const [countCanceled , setCountCanceled] = useState();
  const [countCompleted , setCountCompleted] = useState();

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
      const response = await axios.get('https://2hm-store.click/api/appointment/1', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountPending(response.data.detailAppointment.length);
    };
    const getApiAppointmentPrepared = async () => {
      const response = await axios.get('https://2hm-store.click/api/appointment/6', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountAccepted(response.data.detailAppointment.length);
    };
    const getApiAppointmentCanceled = async () => {
      const response = await axios.get('https://2hm-store.click/api/appointment/5', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountCanceled(response.data.detailAppointment.length);
    };
    const getApiAppointmentCompleted = async () => {
      const response = await axios.get('https://2hm-store.click/api/appointment/7', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountCompleted(response.data.detailAppointment.length);
    };

    getApiOrderPending();
    getApiAppointmentPrepared();
    getApiAppointmentCanceled();
    getApiAppointmentCompleted();
  }, []);
  return (
    <ul className={cx('box-info')}>
      <li onClick={() => window.location.replace(config.routes.appointmentPending)}>
        <FontAwesomeIcon className={cx('bx')} icon={faHourglassHalf}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countPending}</h3>
          <p>Cuộc hẹn đang chờ xử lý</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.appointmentAccepted)}>
        <FontAwesomeIcon className={cx('bx')} icon={faCheck}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countAccepted}</h3>
          <p>Cuộc hẹn đã chấp nhận</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.appointmentCanceled)}>
        <FontAwesomeIcon className={cx('bx')} icon={faCancel}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countCanceled}</h3>
          <p>Cuộc hẹn đã được hủy</p>
        </span>
      </li>
      <li onClick={() => window.location.replace(config.routes.appointmentCompleted)}>
        <FontAwesomeIcon className={cx('bx')} icon={faCheckCircle}></FontAwesomeIcon>
        <span className={cx('text')}>
          <h3>{countCompleted}</h3>
          <p>Cuộc hẹn đã hoàn thành</p>
        </span>
      </li>
    </ul>
  );
}

export default MenuAppointment;
