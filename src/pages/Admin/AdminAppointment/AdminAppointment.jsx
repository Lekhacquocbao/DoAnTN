import classNames from 'classnames/bind';
import axios from 'axios';
import { faBoxOpen, faSpinner, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

import GetToken from '~/Token/GetToken';
import styles from './AdminAppointment.module.scss';

const cx = classNames.bind(styles);

const Order = React.lazy(() => import('~/components/Order'));
const Menu = React.lazy(() => import('~/pages/Admin/Menu'));

function AdminAppointment() {
  const [appointmentList, setAppointmentList] = useState([]);
  const getIcon = (id) => {
    switch (id) {
      case 1:
        return faSpinner;
      case 2:
        return faBoxOpen;
      case 3:
        return faTruckFast;
      default:
        return null;
    }
  };
  useEffect(() => {
    const getApiAppointmentList = async () => {
      const response = await axios.get('http://localhost:8000/api/order/All/status/1', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      setAppointmentList(response.data.result);
    };
    getApiAppointmentList();
  }, []);

  return (
    <div className={cx('content')}>
      <Menu />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Appointment orders</span>
      </div>
      <div className={cx('order-list')}>
        {appointmentList &&
          appointmentList.map((order) => {
            return <Order data={order} icon={getIcon(order.id_status)}></Order>;
          })}
      </div>
    </div>
  );
}

export default AdminAppointment;
