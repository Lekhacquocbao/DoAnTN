import classNames from 'classnames/bind';
import axios from 'axios';
import { faBoxOpen, faCheckCircle, faSpinner, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, Suspense } from 'react';

import GetToken from '~/Token/GetToken';
import styles from './HistoryOrderPending.module.scss';
import { Profile } from '~/layouts';

const cx = classNames.bind(styles);

const HistoryOrder = React.lazy(() => import('~/components/HistoryOrder'));
const HistoryMenuOrder = React.lazy(() => import('~/pages/HistoryOA/HistoryOrder/HistoryMenuOrder'));

function HistoryOrderPending() {
  const [orderList, setOrderList] = useState([]);

  const getIcon = (id) => {
    switch (id) {
      case 1:
        return faSpinner;
      case 2:
        return faBoxOpen;
      case 3:
        return faTruckFast;
      case 4:
        return faCheckCircle;
      default:
        return null;
    }
  };

  useEffect(() => {
    const getApiOrderList = async () => {
      try {
        const response = await axios.get('https://2hm-store.click/api/order/status/1', {
          headers: { Authorization: `Bearer ${GetToken()}` },
        });
        setOrderList(response.data.result);
      } catch (error) {
      }
    };
    getApiOrderList();
  }, []);

  return (
    <div className={cx('content')}>
      <div className={cx('sidebar')}>
        <Profile />
      </div>
      <div className={cx('main-content')}>
        <div className={cx('header-content')}>
          <Suspense fallback={<div>Loading Menu...</div>}>
            <HistoryMenuOrder />
          </Suspense>
        </div>
        <span className={cx('title-content')}>Đơn hàng đang chờ xử lý</span>
        <div className={cx('order-list')}>
          {orderList.map((order) => (
            <Suspense key={order.id} fallback={<div>Loading...</div>}>
              <HistoryOrder data={order} icon={getIcon(order.id_status)} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryOrderPending;
