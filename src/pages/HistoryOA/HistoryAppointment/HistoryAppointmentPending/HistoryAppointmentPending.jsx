import classNames from 'classnames/bind';
import axios from 'axios';
import { faBoxOpen, faCancel, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, startTransition, Suspense } from 'react';

import GetToken from '~/Token/GetToken';
import styles from './HistoryAppointmentPending.module.scss';
import { Profile } from '~/layouts';

const cx = classNames.bind(styles);

const HistoryAppointment = React.lazy(() => import('~/components/HistoryAppointment'));
const HistoryMenuAppointment = React.lazy(() => import('~/pages/HistoryOA/HistoryAppointment/HistoryMenuAppointment'));

function HistoryAppointmentPending() {
  const [appointmentList, setAppointmentList] = useState([]);
  const getIcon = (id) => {
    switch (id) {
      case 1:
        return faSpinner;
      case 2:
        return faBoxOpen;
      case 3:
        return faCancel;
        case 4:
        return faCheckCircle;
      default:
        return null;
    }
  };
  useEffect(() => {
    const getApiAppointmentList = async () => {
      const response = await axios.get('https://2hm-store.click/api/appointment/1', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      startTransition(() => {
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
        setAppointmentList(Appointment);
      });
    };
    getApiAppointmentList();
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
        <span className={cx('title-content')}>Cuộc hẹn đang chờ xử lý</span>
        <div className={cx('order-list')}>
          {appointmentList &&
            appointmentList.map((order) => (
              <Suspense key={order.id} fallback={<div>Loading...</div>}>
                <HistoryAppointment data={order} icon={getIcon(order.id_status)} />
              </Suspense>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryAppointmentPending;
