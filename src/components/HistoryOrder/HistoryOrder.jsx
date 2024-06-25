import classNames from 'classnames/bind';
import axios from 'axios';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { faCancel, faCheckCircle, faBook, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import InputForm from '~/components/InputForm/InputForm';
import Star from '~/components/Star';
import GetToken from '~/Token/GetToken';
import Image from '~/components/Image';
import Button from '~/components/Button';
import Popup from '../Popup';
import styles from './HistoryOrder.module.scss';

const cx = classNames.bind(styles);

function HistoryOrder({ data, icon }) {
  const [orderList, setOrderList] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSuccessfully, setIsModalOpenSuccessfully] = useState(false);
  const [isModalOpenRating, setIsModalOpenRating] = useState(false);
  const [idProduct, setIDProduct] = useState();
  const [idOrder, setIDOrder] = useState();
  const [rating, setRating] = useState(5);
  const [payload, setPayload] = useState({
    comment: '',
  });

  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
  });

  const modalAnimationSuccessfully = useSpring({
    opacity: isModalOpenSuccessfully ? 1 : 0,
  });

  const modalAnimationRating = useSpring({
    opacity: isModalOpenRating ? 1 : 0,
  });

  const orderDate = data.OrderDate;
  const formattedDate = moment(orderDate).format('YYYY-MM-DD');

  if (!data) {
    return null;
  }

  const openModalRating = () => {
    setIsModalOpenRating(true);
  };

  const closeModalRating = () => {
    setIsModalOpenRating(false);
  };

  const closeModalPending = () => {
    setIsModalOpen(false);
  };

  const closeModalSuccessfully = () => {
    setIsModalOpenSuccessfully(false);
  };

  const openModalPending = async (id) => {
    setIsModalOpen(true);
    const response = await axios.get(`https://2hm-store.click/api/order/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GetToken()}`,
      },
    });
    setOrderList(response.data.result.Products);
  };

  const openModalSuccessfully = async (id) => {
    setIsModalOpenSuccessfully(true);
    const response = await axios.get(`https://2hm-store.click/api/order/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GetToken()}`,
      },
    });
    setOrderList(response.data.result.Products);
  };

  const handleRating = async (id_product, idOrder, star, comment) => {
    await axios
      .post(
        `https://2hm-store.click/api/rating/add`,
        {
          id_product: id_product,
          id_order_item: idOrder,
          comment: comment,
          star: star,
        },
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
      .catch((err) => {
        toast.error(err);
      });
  };

  const cancelOrder = async (orderId) => {
    console.log('gettoke', GetToken());
    await axios
      .put(
        `https://2hm-store.click/api/order/cancel/${orderId}`,
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
      .catch((err) => {
        toast.error(err.response ? err.response.data.message : 'An error occurred');
      });
  };


  let iconComponent;
  let buttonComponent;
  if (data.id_status === 1) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={icon} spinPulse />;
    buttonComponent = (
      <div>
        
        <Button
          onClick={() => {
            openModalPending(data.id);
          }}
          className={cx('btn')}
          blue
        >
          Chi tiết
        </Button>
        <Button
          onClick={() => {
            cancelOrder(data.id);
          }}
          className={cx('btn')}
          outline
        >
          Hủy
        </Button>
      </div>
    );
  } else if (data.id_status === 2) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={icon} beat />;
    buttonComponent = (
      <div>
        <Button
          onClick={() => {
            openModalPending(data.id);
          }}
          className={cx('btn')}
          blue
        >
          Chi tiết
        </Button>
      </div>
    );
  } else if (data.id_status === 3) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={faShippingFast} beat />;
    buttonComponent = (
      <div>
        <Button
          onClick={() => {
            openModalPending(data.id);
          }}
          className={cx('btn')}
          blue
        >
          Chi tiết
        </Button>
      </div>
    );
  } else if (data.id_status === 4) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle} beat />;
    buttonComponent = (
      <div>
        <Button
          onClick={() => {
            openModalSuccessfully(data.id);
          }}
          className={cx('btn')}
          blue
        >
          Chi tiết
        </Button>
      </div>
    );
  } else if (data.id_status === 5) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={faCancel} beat />;
    buttonComponent = (
      <div>
        <Button
          onClick={() => {
            openModalPending(data.id);
          }}
          className={cx('btn')}
          blue
        >
          Chi tiết
        </Button>
      </div>
    );
  }

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(number);
  }
  // console.log("ccccc", data);
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
      <div className={cx('day-order')}>{formattedDate}</div>
      <div className={cx('address')}>{data.payment ? data.payment.paymentMethod : ''}</div>
      <div className={cx('address')}>{data.payment?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
      <div className={cx('address')}>{data.order_address}</div>
      <div className={cx('price-order')}>{data.totalPrice && formatCurrency(data.totalPrice)}</div>
      {buttonComponent}
    
      <Popup isOpen={isModalOpen} onRequestClose={() => closeModalPending()} width={'700px'} height={'500px'}>
        <animated.div style={modalAnimation}>
          <h2>Thông tin chi tiết</h2>
          {orderList.length > 0 &&
            orderList.map((orderItem) => {
              return (
                <div className={cx('detail')}>
                  <Image className={cx('detail-image')} src={orderItem.image} alt="avatar"></Image>

                  <div className={cx('detail-item')}>
                    <label className={cx('detail-label')}>Name:</label>
                    <div className={cx('detail-value')}>{orderItem.name}</div>
                  </div>

                  <div className={cx('detail-item')}>
                    <label className={cx('detail-label')}>Amount:</label>
                    <div className={cx('detail-value')}>{orderItem.order_item_infor.quantity}</div>
                  </div>

                  <div className={cx('detail-item')}>
                    <label className={cx('detail-label')}>Price:</label>
                    <div className={cx('detail-value')}>{orderItem.price && formatCurrency(data.totalPrice)}</div>
                  </div>
                  
                  <Button to={`/detailItem/${orderItem.id}`} white className={cx('btn')}>
                    Xem sản phẩm
                  </Button>
                </div>
              );
            })}
        </animated.div>
      </Popup>

      <Popup
        isOpen={isModalOpenSuccessfully}
        onRequestClose={() => closeModalSuccessfully()}
        width={'700px'}
        height={'500px'}
      >
        <animated.div style={modalAnimationSuccessfully}>
          <h2>Thông tin chi tiết</h2>
          {orderList.length > 0 &&
            orderList.map((orderItem) => {
              return (
                <div className={cx('detail')}>
                  <Image className={cx('detail-image')} src={orderItem.image} alt="avatar"></Image>

                  <div className={cx('detail-item')}>
                    <label className={cx('detail-label')}>Name:</label>
                    <div className={cx('detail-value')}>{orderItem.name}</div>
                  </div>

                  <div className={cx('detail-item')}>
                    <label className={cx('detail-label')}>Amount:</label>
                    <div className={cx('detail-value')}>{orderItem.order_item_infor.quantity}</div>
                  </div>

                  <div className={cx('detail-item')}>
                    <label className={cx('detail-label')}>Price:</label>
                    <div className={cx('detail-value')}>{orderItem.price && formatCurrency(data.totalPrice)}</div>
                  </div>

                  {!orderItem.order_item_infor.isRate ? (
                    <Button
                      onClick={() => {
                        openModalRating();
                        setIDProduct(orderItem.id);
                        setIDOrder(orderItem.order_item_infor.id);
                      }}
                      blue
                      className={cx('btn')}
                    >
                      Rating
                    </Button>
                  ) : (
                    <Button disabled blue className={cx('btn')}>
                      Have evaluated
                    </Button>
                  )}
                  <Button to={`/detailItem/${orderItem.id}`} white className={cx('btn')}>
                    Repurchase
                  </Button>
                </div>
              );
            })}
        </animated.div>
      </Popup>

      <Popup isOpen={isModalOpenRating} onRequestClose={() => closeModalRating()} width={'700px'} height={'400px'}>
        <animated.div style={modalAnimationRating}>
          <h2>Rating</h2>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Stars</div>
            <div className={cx('star')}>
              <Star rating={rating} setRating={setRating} isUpdate={true}></Star>
            </div>
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Enter comment</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.comment}
              setValue={setPayload}
              name={'comment'}
              className={cx('input')}
              leftIcon={faBook}
            />
          </div>

          <div className={cx('options1')}>
            <Button onClick={() => handleRating(idProduct, idOrder, rating, payload.comment)} primary>
              Confirm
            </Button>
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default HistoryOrder;
