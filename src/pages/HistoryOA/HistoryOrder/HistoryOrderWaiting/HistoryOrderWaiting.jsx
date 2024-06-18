import classNames from 'classnames/bind';
import React, { useEffect, useState, Suspense } from 'react';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Profile } from '~/layouts';

import styles from './HistoryOrderWaiting.module.scss';
import GetToken from '~/Token/GetToken';

const cx = classNames.bind(styles);

const HistoryOrder = React.lazy(() => import('~/components/HistoryOrder'));
const HistoryMenuOrder = React.lazy(() => import('~/pages/HistoryOA/HistoryOrder/HistoryMenuOrder'));

function HistoryOrderWaiting() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getApiOrderPending = async () => {
      const response = await axios.get('https://2hm-store.click/api/order/status/2', {
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
      <span className={cx('title-content')}>Order is prepared</span>
      <div className={cx('order-list')}>
        {orderList.map((order) => (
          <Suspense key={order.id} fallback={<div>Loading...</div>}>
            <HistoryOrder key={order.id} data={order} icon={faBoxOpen}></HistoryOrder>
          </Suspense>
        ))}
      </div>
      </div>
    </div>
  );
}

export default HistoryOrderWaiting;
