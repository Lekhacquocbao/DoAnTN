import classNames from 'classnames/bind';
import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './HistoryOrderSuccess.module.scss';
import GetToken from '~/Token/GetToken';
import { Profile } from '~/layouts';


const cx = classNames.bind(styles);

const HistoryOrder = React.lazy(() => import('~/components/HistoryOrder'));
const HistoryMenuOrder = React.lazy(() => import('~/pages/HistoryOA/HistoryOrder/HistoryMenuOrder'));

function HistoryOrderSuccess() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getApiOrderPending = async () => {
      const response = await axios.get('https://2hm-store.click/api/order/status/4', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      setOrderList(response.data.result);
    };
    getApiOrderPending();
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
      <span className={cx('title-content')}>Đơn hàng đã giao thành công</span>
      <div className={cx('order-list')}>
        {orderList.map((order) => (
          <Suspense key={order.id} fallback={<div>Loading...</div>}>
          <HistoryOrder key={order.id} data={order} icon={faCheckCircle}></HistoryOrder>
          </Suspense>
        ))}
      </div>
      </div>
    </div>
  );
}

export default HistoryOrderSuccess;
