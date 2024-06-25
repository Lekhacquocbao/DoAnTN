import classNames from 'classnames/bind';
import React, { useEffect, useState, Suspense } from 'react';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './HistoryAppointmentCanceled.module.scss';
import GetToken from '~/Token/GetToken';
import { Profile } from '~/layouts';

const cx = classNames.bind(styles);


const HistoryAppointment = React.lazy(() => import('~/components/HistoryAppointment'));
const HistoryMenuAppointment = React.lazy(() => import('~/pages/HistoryOA/HistoryAppointment/HistoryMenuAppointment'));

function HistoryAppointmentCanceled() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getApiAppointmentCanceled = async () => {
      const response = await axios.get('https://2hm-store.click/api/appointment/5', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      const Appointment = response.data.detailAppointment.map((appointment) => {
        return {
          id_appointment: appointment.id,
          id_service: appointment.id_service,
          appointment_time: appointment.appointment_time,
          end_time: appointment.end_time,
          note: appointment.note,
          ...appointment.Order,
        };
      });
      setOrderList(Appointment);
    };
    getApiAppointmentCanceled();
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
        <span className={cx('title-content')}>Cuộc hẹn đã được hủy</span>
        <div className={cx('order-list')}>
          {orderList.map((order) => (
              <Suspense key={order.id} fallback={<div>Loading...</div>}>
                <HistoryAppointment key={order.id} data={order} icon={faBoxOpen} />
              </Suspense>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryAppointmentCanceled;
