import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './AppointmentAccepted.module.scss';
import GetToken from '~/Token/GetToken';

const cx = classNames.bind(styles);

const Appointment = React.lazy(() => import('~/components/Appointment'));
const MenuAppointment = React.lazy(() => import('~/pages/Admin/ManageAppointment/MenuAppointment'));

function AppointmentAccepted() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getApiAppointmentAccepted = async () => {
      const response = await axios.get('https://2hm-store.click/api/appointment/6', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
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
        <span className={cx('title-content')}>Cuộc hẹn đã chấp nhận</span>
      </div>
      <div className={cx('order-list')}>
        {orderList.map((order) => {
          return <Appointment key={order.id} data={order} icon={faBoxOpen}></Appointment>;
        })}
      </div>
    </div>
  );
}

export default AppointmentAccepted;
