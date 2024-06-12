 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ItemCart from '~/components/ItemCart';
import styles from './Cart.module.scss';
import GetToken from '~/Token/GetToken';
import { LuMoveRight } from 'react-icons/lu';

const cx = classNames.bind(styles);

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const navigate = useNavigate();

  const handleItemSelect = (Item) => {
    const updatedOrderItems = orderItems.slice();
    const index = updatedOrderItems.findIndex((item) => item.id === Item.id);

    if (index !== -1) { //trường hợp unselected
      updatedOrderItems.splice(index, 1);
    } else {
      updatedOrderItems.push(Item);
      
    }
    let total = 0;
    updatedOrderItems.forEach(item => {
      total += item.price*item.cart_item_infor.quantity
    // console.log("quantity", item.cart_item_infor.quantity)
    });
    setOrderItems(updatedOrderItems);
    setSubTotal(total)
  };

  const handleQuantityChange = (cartItemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.cart_item_infor.id === cartItemId
        ? { ...item, cart_item_infor: { ...item.cart_item_infor, quantity: newQuantity } }
        : item
    );
    setCartItems(updatedCartItems);

    const updatedOrderItems = orderItems.map((item) =>
      item.cart_item_infor.id === cartItemId
        ? { ...item, cart_item_infor: { ...item.cart_item_infor, quantity: newQuantity } }
        : item
    );
    setOrderItems(updatedOrderItems);

    let total = 0;
    updatedOrderItems.forEach((item) => {
      total += item.price * item.cart_item_infor.quantity;
    });
    setSubTotal(total);
  };

  useEffect(() => {
    const fetchApiCarts = async () => {
    // console.log("hahahah");
      const response = await axios.get(`http://localhost:8000/api/cart/details`, {
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      });
      const cartsData = await response.data;
      setCartItems(cartsData.Cart.Cart_Items);
    };
    fetchApiCarts();
  }, []);

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(number);
  }

  const handleGoToCheckout = () => {
    if (orderItems.length === 0) {
      toast.error('Please select products to checkout');
    } else {
      navigate('/checkout', { state: { items: orderItems } });
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
        {cartItems.length === 0 ? (
          <p className={cx('cart-item-null')}>There are no products in your shopping cart.</p>
        ) : (
          cartItems.map((cartItem) => {
            return (
              <ItemCart
                data={cartItem}
                onSelect={() => handleItemSelect(cartItem)}
                onQuantityChange={handleQuantityChange} // Truyền hàm xử lý số lượng thay đổi
                key={cartItem.id}
              />
            );
          })
        )}

      </div>
      <div className={cx('right-column')}>
        <div className={cx('order-summary')}>
          <h3 className="title">Order Summary</h3>
          <div className={cx('subtotal')}>
            <span>Subtotal:</span>
            <span className="price">
            {formatCurrency(subTotal)}
            </span>
          </div>
          <div className={cx('discount')}>
            <span>Discount:(-0%)</span>
            <span className="discount-price">{formatCurrency(0)}</span>
          </div>
          <div className={cx('delivery-fee')}>
            <span>Delivery Fee:</span>
            <span className={cx('delivery-price')}>{formatCurrency(0)}</span>
          </div>
          <div className={cx('total')}>
            <span className={cx('total-text')}>Total: </span>
            <span className={cx('total-price')}>{formatCurrency(subTotal)}</span>
          </div>
          <button className={cx('go-to-checkout')} onClick={handleGoToCheckout}>
            Go to Checkout  
            <LuMoveRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;