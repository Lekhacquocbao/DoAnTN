import classNames from 'classnames/bind';
import axios from 'axios';
import { faBoxOpen, faCheckCircle, faSpinner, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

import GetToken from '~/Token/GetToken';
import styles from './OrderPending.module.scss';

const cx = classNames.bind(styles);

const Order = React.lazy(() => import('~/components/Order'));
const Menu = React.lazy(() => import('~/pages/Admin/ManageOrder/MenuOrder'));

function OrderPending() {
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
      const response = await axios.get('https://2hm-store.click/api/order/All/status/1', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      setOrderList(response.data.result);
    };
    getApiOrderList();
  }, []);

  return (
    <div className={cx('content')}>
  <Menu />
  <div className={cx('header-content')}>
    <span className={cx('title-content')}>Đơn hàng đang chờ xử lý</span>
  </div>
  <table className={cx('order-table')}>
    {/* <thead className={cx('order-header')}>
      <tr>
        <th className={cx('order-header-item')}>Ảnh</th>
        <th className={cx('order-header-item')}>Tên</th>
        <th className={cx('order-header-item')}>Phương thức</th>
        <th className={cx('order-header-item')}>Trạng thái</th>
        <th className={cx('order-header-dayorder')}>Ngày tạo</th>
        <th className={cx('order-header-address')}>Địa chỉ</th>
        <th className={cx('order-header-item')}>Giá</th>
        <th className={cx('order-header-action')}>Hành động</th>
      </tr>
    </thead> */}
    </table>
      {orderList &&
        orderList.map((order, index) => (
          <Order data={order} icon={getIcon(order.id_status)} key={index} />
        ))}
    
</div>
  );
}

export default OrderPending;
