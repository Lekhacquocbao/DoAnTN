import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './OrderDelivering.module.scss';
import GetToken from '~/Token/GetToken';

const cx = classNames.bind(styles);

const Order = React.lazy(() => import('~/components/Order'));
const Menu = React.lazy(() => import('~/pages/Admin/Menu'));

function OrderDelivering() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getApiOrderPending = async () => {
      const response = await axios.get('http://localhost:8000/api/order/status/3', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      setOrderList(response.data.result);
      // console.log("respen cccc nhé", response); 
    };
    getApiOrderPending();
  }, []);

  return (
    <div className={cx('content')}>
      <Menu />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Order is shipping</span>
      </div>
      <div className={cx('order-list')}>
        {orderList.map((order) => {
          return <Order key={order.id} data={order} icon={faTruckFast}></Order>;
        })}
      </div>
    </div>
  );
}

export default OrderDelivering;
