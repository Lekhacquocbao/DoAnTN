import classNames from 'classnames/bind';
import axios from 'axios';
import { faBoxOpen, faCheckCircle, faSpinner} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState,startTransition, Suspense } from 'react';
import GetToken from '~/Token/GetToken';
import styles from './AppointmentPending.module.scss';

const cx = classNames.bind(styles);

const Appointment = React.lazy(() => import('~/components/Appointment'));
const MenuAppointment = React.lazy(() => import('~/pages/Admin/ManageAppointment/MenuAppointment'));

function AppointmentPending() {
  const [appointmentList, setAppointmentList] = useState([]);
  const getIcon = (id) => {
    switch (id) {
      case 1:
        return faSpinner;
      case 2:
        return faBoxOpen;
      case 3:
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
    <Suspense fallback={<div>Loading...</div>}>
      <MenuAppointment />
      </Suspense>
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Cuộc hẹn đang chờ xử lý</span>
      </div>
      <div className={cx('order-list')}>
      {appointmentList &&
        appointmentList.map((order) => (
            <Suspense key={order.id} fallback={<div>Loading...</div>}>
              <Appointment data={order} icon={getIcon(order.id_status)} />
            </Suspense>
          ))}
      </div>
    </div>
  );
}

export default AppointmentPending;
