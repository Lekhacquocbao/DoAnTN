import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Flip, ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Icon } from '@iconify/react';


import Image from '~/components/Image';
import Button from '~/components/Button';
import GetToken from '~/Token/GetToken';
import styles from './ItemCart.module.scss';

const cx = classNames.bind(styles);

function ItemCart({ data, onSelect, isCheckoutPage}) {
  const [isChecked, setIsChecked] = useState(false);  
  const [quantity, setQuantity] = useState(data.cart_item_infor.quantity)

  useEffect(() => {
    // setQuantity(data)
  }, [data]);

  const handleDeleteCart = async () => {
    await axios
      .delete(`http://localhost:8000/api/cart/delete/${data.cart_item_infor.id}`, {
        headers: { Authorization: `Bearer ${GetToken()}` },
      })
      .then((response) => {
        toast.success(response.data.message);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        alert('Something went wrong', err);
      });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onSelect(data, !isChecked);
  };

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(number);
  }

  async function handleIncrement() {
    setQuantity(quantity + 1);
    await updateQuantity(data.cart_item_infor.id,quantity+1)
  }

  async function handleDecrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      await updateQuantity(data.cart_item_infor.id,quantity-1)
    }
  }

  async function updateQuantity( id_cartItem, quantity){
    await axios
          .put(
            `http://localhost:8000/api/cart/updateQuantity/${id_cartItem}`,
            {
             quantity: quantity
            },  
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${GetToken()}`,
              },
            },
          )
          .catch((e) => {
            toast.error(e.message);
          });
  }

  return (
    <>
    <div className={cx('wrapper')}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
      <div className={cx('content-left')}>
        {!isCheckoutPage &&(
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className={cx('checkbox')} />
        )}
        <Image className={cx('img')} src={data.Image}></Image>
      </div>
      <div className={cx('content-center')}>
        <span className={cx('book-name')}>{data.name}</span>
        <span className={cx('book-breed')}>{data.Breed.name}</span>
        <span className={cx('book-price')}>{data.price && formatCurrency(data.price)}</span>
        <span className={cx('book-quantity')}>x{quantity}</span>
      </div>
      {!isCheckoutPage &&(
        <div  className={cx('content-right')}>
        <div className={cx('options')}>
          <Button onClick={() => handleDeleteCart()} outline className={cx('btn')}>
            Delete
          </Button>
        </div>
        <div className={cx('product-quantity')}>
              <Icon className={cx('minus')} icon="typcn:minus" onClick={handleDecrement} />
              <input
                disabled
                type="text"
                className={cx('quantity')}
                value={quantity}
              />
              <Icon className={cx('plus')} icon="typcn:plus" onClick={handleIncrement} />
            </div>
      </div>
      )}
      
    </div>
    </>     
  );
}

ItemCart.protoTypes = {
  data: PropTypes.node.isRequired,
  onSelect: PropTypes.func,
};

export default ItemCart;

