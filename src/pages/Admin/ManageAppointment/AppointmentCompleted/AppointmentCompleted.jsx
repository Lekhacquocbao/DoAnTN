import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './AppointmentCompleted.module.scss';
import GetToken from '~/Token/GetToken';

const cx = classNames.bind(styles);

const Appointment = React.lazy(() => import('~/components/Appointment'));
const MenuAppointment = React.lazy(() => import('~/pages/Admin/ManageAppointment/MenuAppointment'));

function AppointmentCompleted() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getApiAppointmentAccepted = async () => {
      const response = await axios.get('https://2hm-store.click/api/appointment/7', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      console.log("response", response);
      // const Appointment = response.data.detailAppointment.map(appointment =>appointment.Order)
      const Appointment = response.data.detailAppointment.map((appointment) => {
        return {
          appointment_time: appointment.appointment_time,
          end_time: appointment.end_time,
          note: appointment.note,
          ...appointment.Order,
        };
      });
      setOrderList(Appointment);
    };
    getApiAppointmentAccepted();
  }, []);

  return (
    <div className={cx('content')}>
      <MenuAppointment />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Cuộc hẹn đã hoàn thành</span>
      </div>
      <div className={cx('order-list')}>
        {orderList.map((order) => {
          return <Appointment key={order.id} data={order} icon={faBoxOpen}></Appointment>;
        })}
      </div>
    </div>
  );
}

export default AppointmentCompleted;
