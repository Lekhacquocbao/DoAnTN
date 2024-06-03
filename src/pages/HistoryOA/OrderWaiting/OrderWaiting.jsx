import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './OrderWaiting.module.scss';
import GetToken from '~/Token/GetToken';
import OrderHistory from '~/components/OrderHistory';

const cx = classNames.bind(styles);

const Order = React.lazy(() => import('~/components/Order'));
const Menu = React.lazy(() => import('~/pages/Admin/Menu'));

function OrderWaiting() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getApiOrderPending = async () => {
      const response = await axios.get('http://localhost:8000/api/order/status/2', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      setOrderList(response.data.result);
    };
    getApiOrderPending();
  }, []);

  return (
    <div className={cx('content')}>
      <Menu />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Order is prepared</span>
      </div>
      <div className={cx('order-list')}>
        {orderList.map((order) => {
          return <OrderHistory key={order.id} data={order} icon={faBoxOpen}></OrderHistory>;
        })}
      </div>
    </div>
  );
}

export default OrderWaiting;
