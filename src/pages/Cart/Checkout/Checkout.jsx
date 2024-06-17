import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { Flip, ToastContainer, toast } from 'react-toastify';

import ItemCart from '~/components/ItemCart';
import Button from '~/components/Button';
import styles from './Checkout.module.scss';
import GetToken from '~/Token/GetToken';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import InputForm from '~/components/InputForm';
import AutoComplete from '~/components/AutoComplete/AutoComplete';

const cx = classNames.bind(styles);

function Checkout() {
  const location = useLocation();
  const {items} = location.state || {items : []};
  const [autocompleteInputValue, setAutocompleteInputValue] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [payload, setPayload] = useState({
    phoneNumber: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    address: '',
  });

  useEffect(() => {
    let total = 0;
    items.forEach(item => {
      total += item.price * item.cart_item_infor.quantity;
    });
    setSubTotal(total);
  }, [items]);

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!autocompleteInputValue.trim()) {
      errors.address = 'Please enter your order address!';
      isValid = false;
    }

    if (!payload.phoneNumber.trim()) {
      errors.phoneNumber = 'Please enter your order phoneNumber!';
      isValid = false;
    }

    setErrorMessages(errors);

    return isValid;
  };

  const handleOrderAll = async (address, phoneNumber) => {
    if (items.length === 0) {
      toast.error('Please select items to pay');
      return;
    }
  
    if (!validateForm()) {
      return;
    }
  
    const orderItemsPayload = items.map((item) => ({
      id_product: item.id,
      quantity: item.cart_item_infor.quantity,
      id_cartItem: item.cart_item_infor.id,
      price: item.price
    }));
  //  console.log("heheh",orderItemsPayload);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/order/create',
        {
          Items: orderItemsPayload,
          address: address,
          paymentMethod: paymentMethod,
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GetToken()}`,
          },
        }
      );
      // console.log('Response:', response);
      toast.success(response.data.message);
      if (paymentMethod === 'MOMO'){
        window.location.href = response.data.payURL;
      } else{
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
        
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={cx('container')}>
      <div className={cx('left-column')}>
        <ToastContainer
          position="top-right"
          autoClose={4000}
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
        {items.length === 0 ? (
          <p className={cx('cart-item-null')}>There are no products selected for checkout.</p>
        ) : (
          items.map((cartItem) => (
            <ItemCart
              data={cartItem}
              key={cartItem.id}
              isCheckoutPage={true}
            />
          ))
        )}
      </div>

      <div className={cx('right-column')}>
        <div className={cx('order-summary')}>
          <h2>Shipping Information</h2>

          <div className={cx('input-field')}>
            <div className={cx('header')}>Enter address</div>
            <AutoComplete setParentInputValue={setAutocompleteInputValue} />
          </div>

          <div className={cx('input-field')}>
            <div className={cx('header')}>Enter phone number</div>
            <InputForm
              placeholder={'Enter phone number'}
              type="text"
              value={payload.phoneNumber}
              setValue={setPayload}
              name={'phoneNumber'}
              className={cx('input')}
              leftIcon={faPhone}
            />
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Payment Method</div>
          <div className={cx('radio-group')}>
            <label>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
              />
              COD
            </label>
            <label>
              <input
                type="radio"
                value="MOMO"
                checked={paymentMethod === 'MOMO'}
                onChange={() => setPaymentMethod('MOMO')}
              />
              MOMO
            </label>
          </div>
        </div>

        <div className={cx('subtotal')}>
          <span>Subtotal</span>
          <span className="price">{subTotal}</span>
        </div>

        <Button
          className={cx('order-button')}
          onClick={() => handleOrderAll(autocompleteInputValue, payload.phoneNumber)}
        >
          Book Now
        </Button>

        </div>
      </div>

    </div>
  );
}

export default Checkout;
