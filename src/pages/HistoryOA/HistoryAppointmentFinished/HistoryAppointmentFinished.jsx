import classNames from 'classnames/bind';
import React, { useEffect, useState,Suspense } from 'react';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './HistoryAppointmentFinished.module.scss';
import GetToken from '~/Token/GetToken';
import { Profile } from '~/layouts';

const cx = classNames.bind(styles);

const HistoryAppointment = React.lazy(() => import('~/components/HistoryAppointment'));
const HistoryMenuAppointment = React.lazy(() => import('~/pages/HistoryOA/HistoryMenuAppointment'));

function HistoryAppointmentFinished() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getApiAppointmentAccepted = async () => {
      const response = await axios.get('http://localhost:8000/api/appointment/7', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      // console.log("response", response);
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
      <div className={cx('sidebar')}>
        <Profile />
      </div>
      <div className={cx('main-content')}>
        <div className={cx('header-content')}>
          <Suspense fallback={<div>Loading...</div>}>
            <HistoryMenuAppointment />
          </Suspense>
        </div>
        <span className={cx('title-content')}>Appointment is finished</span>
        <div className={cx('order-list')}>
          {orderList &&
            orderList.map((order) => (
              <Suspense key={order.id} fallback={<div>Loading...</div>}>
                <HistoryAppointment key={order.id} data={order} icon={faBoxOpen} />
              </Suspense>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryAppointmentFinished;
