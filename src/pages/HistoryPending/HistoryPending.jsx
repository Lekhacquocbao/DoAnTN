import classNames from 'classnames/bind';
import axios from 'axios';
import { faBoxOpen, faCheckCircle, faSpinner, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, Suspense } from 'react';

import GetToken from '~/Token/GetToken';
import styles from './HistoryPending.module.scss';

const cx = classNames.bind(styles);

const OrderHistory = React.lazy(() => import('~/components/OrderHistory'));
const HistoryMenu = React.lazy(() => import('~/pages/HistoryMenu'));

function HistoryPending() {
  const [orderList, setOrderList] = useState([]);
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
    const getApiOrderList = async () => {
      const response = await axios.get('http://localhost:8000/api/order/status/1', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      const HisPending = response.data.result
      console.log("His pending", HisPending);
      setOrderList(HisPending);
    };
    getApiOrderList();
  }, []);

  return (
    <>
      
    <div className={cx('content')}>
    <Suspense fallback={<div>Loading...</div>}>
    <HistoryMenu/>
    </Suspense>
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Pending orders</span>
      </div>
      <div className={cx('order-list')}>
        {orderList &&
          orderList.map((order) => (
            <Suspense key={order.id} fallback={<div>Loading...</div>}>
              <OrderHistory data={order} icon={getIcon(order.id_status)}></OrderHistory>;
            </Suspense>
          ))}
      </div>
      
    </div>
    </>
    
  );
}

export default HistoryPending;
