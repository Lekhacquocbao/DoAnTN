import classNames from 'classnames/bind';
import axios from 'axios';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { faCancel} from '@fortawesome/free-solid-svg-icons';

import GetToken from '~/Token/GetToken';
import Image from '~/components/Image';
import Button from '~/components/Button';
import Popup from '../Popup';
import styles from './Appointment.module.scss';

const cx = classNames.bind(styles);

function Appointment({ data, icon }) {
  const [orderList, setOrderList] = useState({});
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const modalAnimation1 = useSpring({
    opacity: isModalOpenDetail ? 1 : 0,
  });

  if (!data) {
    return null;
  }

  // console.log("data: " + data);

  const openModal1 = async (id) => {
    setIsModalOpenDetail(true);
    const response = await axios.get(`http://localhost:8000/api/appointment/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GetToken()}`,
      },
    });
    console.log("response hhee: " + JSON.stringify(response));
    const Appointment = response.data.detailAppointment.map(appointment => appointment.Order)
    setOrderList(Appointment);
  };

  // console.log("data hhee: " + JSON.stringify(data));

  const closeModal1 = () => {
    setIsModalOpenDetail(false);
  };

  const handleChangeStatus = async (id) => {
    await axios
      .put(
        `http://localhost:8000/api/appointment/update/${id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GetToken()}`,
          },
        },
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        toast.success(e);
      });
  };

  const orderDate = data.OrderDate;
  const formattedDate = moment(orderDate).format('YYYY-MM-DD');

  let iconComponent;
  let buttonComponent;
  if (data.id_status === 1) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={icon} spinPulse />;
    buttonComponent = (
      <div>
        <Button
          onClick={() => {
            openModal1(data.id);
          }}
          className={cx('btn')}
          outline
        >
          Get Detail
        </Button>

        <Button onClick={() => handleChangeStatus(data.id)} className={cx('btn')} blue>
          Confirm
        </Button>
      </div>
    );
  } else if (data.id_status === 6) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={icon} bounce />;
    buttonComponent = (
      <div>
        <Button
          onClick={() => {
            openModal1(data.id);
          }}
          className={cx('btn')}
          outline
        >
          Get Detail
        </Button>

        <Button onClick={() => handleChangeStatus(data.id)} className={cx('btn')} blue>
          Confirm
        </Button>
      </div>
    );
  } else if (data.id_status === 5) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={faCancel} beat />;
  }

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(number);
  }
  return (
    <div className={cx('order')}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Flip}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Image className={cx('order-image')} src={data.Account.inforUser.avatar} alt="avatar"></Image>
      {iconComponent}

      <div className={cx('name-order')}>{data.Account.inforUser.firstname + ' ' + data.Account.inforUser.lastname}</div>
      <div className={cx('day-order')}>{formattedDate}</div>
      <div className={cx('price-order')}>{data.totalPrice && formatCurrency(data.totalPrice)}</div>

      {buttonComponent}
      
      <Popup isOpen={isModalOpenDetail} onRequestClose={() => closeModal1()} width={'700px'} height={'500px'}>
        <animated.div style={modalAnimation1}>
          <h2>Detail information hehe</h2>
  
          {orderList.length > 0 &&
            orderList.map((orderItem) => {
              return (
                <div className={cx('information')}>
                  <div className={cx('name-order')}>{orderItem.name}</div>
                  <div className={cx('day-order')}>{orderItem.OrderDate}</div>
                  <div className={cx('price-order')}>{orderItem.totalPrice && formatCurrency(orderItem.totalPrice)}</div>
                </div>
              );
            })}
        </animated.div>
      </Popup>
      
    </div>
  );
}

{/* <div className={cx('name-order')}>{data.Account.inforUser.firstname + ' ' + data.Account.inforUser.lastname}</div>
<div className={cx('day-order')}>{formattedDate}</div>
<div className={cx('price-order')}>{data.totalPrice && formatCurrency(data.totalPrice)}</div> */}

export default Appointment;
