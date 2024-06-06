 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import ItemCart from '~/components/ItemCart';
import Button from '~/components/Button';
import Popup from '~/components/Popup';
import AutoComplete from '~/components/AutoComplete/AutoComplete';
import styles from './Cart.module.scss';
import GetToken from '~/Token/GetToken';
import InputForm from '~/components/InputForm';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { LuMoveRight } from 'react-icons/lu';

const cx = classNames.bind(styles);

function Cart() {
  const [autocompleteInputValue, setAutocompleteInputValue] = useState('');
  const [autocompleteInputValue2, setAutocompleteInputValue2] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [quantity, setQuantity] = useState()
  const [subTotal, setSubTotal] = useState(0);
  const [count, setCount] = useState(1);


  const [payload, setPayload] = useState({
    phoneNumber: '',
  });
  const [payload2, setPayload2] = useState({
    phoneNumber: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    address: '',
  });

  const navigate = useNavigate();
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

  const handleItemSelect = (Item) => {
    const updatedOrderItems = orderItems.slice();
    // console.log("updatedOrderItems", updatedOrderItems)
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

  // const handleItemSelect = (item) => {
  //   const updatedOrderItems = orderItems.includes(item)
  //     ? orderItems.filter(i => i.id !== item.id)
  //     : [...orderItems, item];

  //   setOrderItems(updatedOrderItems);

  //   const total = updatedOrderItems.reduce((sum, item) => sum + item.price * item.cart_item_infor.quantity, 0);
  //   setSubTotal(total);
  // };

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


  // const handleOrderAll = async (address, phoneNumber) => {
  //   if (orderItems.length === 0) {
  //     toast.error('Please select to pay');
  //   } else {
  //     if (!validateForm()) {
  //       return;
  //     } else {
  //       const orderItemsPayload = orderItems.map((item) => ({
  //         id_product: item.id,
  //         quantity: item.cart_item_infor.quantity,
  //         id_cartItem: item.cart_item_infor.id,
  //         price: item.Shoes.price,
  //       }));
  //       console.log(orderItemsPayload);

  //       await axios
  //         .post(
  //           'http://localhost:8000/api/order/create',
  //           {
  //             cartItems: orderItemsPayload,
  //             address: address,
  //             phoneNumber: phoneNumber,
  //           },
  //           {
  //             headers: {
  //               'Content-Type': 'application/json',
  //               Authorization: `Bearer ${GetToken()}`,
  //             },
  //           },
  //         )
  //         .then((res) => {
  //           toast.success(res.data.message);
  //           window.location.reload();
  //         })
  //         .catch((e) => {
  //           toast.error(e.message);
  //         });
  //     }
  //   }
  // };

  useEffect(() => {
    const fetchApiCarts = async () => {
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

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

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
        {/* {cartItems.length > 0 && (
          <div className={cx('options')}>
            <Button animation className={cx('btn')} onClick={() => openModal()} primary>
              Go to Checkout
            </Button>
          </div>
        )} */}
      </div>
      <div className={cx('right-column')}>
        <div className={cx('order-summary')}>
          <h3 className="title">Order Summary</h3>
          <div className={cx('subtotal')}>
            <span>Subtotal</span>
            <span className="price">
            {subTotal}
            </span>
          </div>
          <div className={cx('discount')}>
            <span>Discount (-0%)</span>
            <span className="discount-price">$0</span>
          </div>
          <div className={cx('delivery-fee')}>
            <span>Delivery Fee</span>
            <span className={cx('delivery-price')}>$0</span>
          </div>
          <div className={cx('total border-top pt-2 pb-6')}>
            <span className={cx('total-text')}>Total</span>
            <span className={cx('total-price')}>${subTotal}</span>
          </div>
          <button className={cx('go-to-checkout')} onClick={handleGoToCheckout}>
            Go to Checkout
            <LuMoveRight />
          </button>
          {/* <Link to={{ pathname: '/checkout', state: { orderItems } }}>
            <button className={cx('go-to-checkout')}>
              Go to Checkout
              <LuMoveRight />
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Cart;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import classNames from 'classnames/bind';
// import { useSpring, animated } from 'react-spring';
// import { Flip, ToastContainer, toast } from 'react-toastify';

// import ItemCart from '~/components/ItemCart';
// import Button from '~/components/Button';
// import Popup from '~/components/Popup';
// import AutoComplete from '~/components/AutoComplete/AutoComplete';
// import styles from './Cart.module.scss';
// import GetToken from '~/Token/GetToken';
// import InputForm from '~/components/InputForm';
// import { faPhone } from '@fortawesome/free-solid-svg-icons';

// const cx = classNames.bind(styles);

// function Cart() {
//   const [autocompleteInputValue, setAutocompleteInputValue] = useState('');
//   const [autocompleteInputValue2, setAutocompleteInputValue2] = useState('');
//   const [cartItems, setCartItems] = useState([]);
//   const [orderItems, setOrderItems] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const [payload, setPayload] = useState({
//     phoneNumber: '',
//   });
//   const [payload2, setPayload2] = useState({
//     phoneNumber: '',
//   });
//   const [errorMessages, setErrorMessages] = useState({
//     address: '',
//   });
//   const validateForm = () => {
//     let isValid = true;
//     const errors = {};

//     if (!autocompleteInputValue.trim()) {
//       errors.address = 'Please enter your order address!';
//       isValid = false;
//     }

//     if (!payload.phoneNumber.trim()) {
//       errors.phoneNumber = 'Please enter your order phoneNumber!';
//       isValid = false;
//     }

//     setErrorMessages(errors);

//     return isValid;
//   };
//   const modalAnimation = useSpring({
//     opacity: isModalOpen ? 1 : 0,
//   });

//   const modalAnimation2 = useSpring({
//     opacity: isModalOpen2 ? 1 : 0,
//   });

//   const handleItemSelect = (Item) => {
//     const updatedOrderItems = orderItems.slice();

//     const index = updatedOrderItems.findIndex((item) => item.id === Item.id);

//     if (index !== -1) {
//       updatedOrderItems.splice(index, 1);
//     } else {
//       updatedOrderItems.push(Item);
//     }

//     setOrderItems(updatedOrderItems);
//   };

//   const handleOrderAll = async (address, phoneNumber) => {
//     if (orderItems.length === 0) {
//       toast.error('Please select to pay');
//     } else {
//       if (!validateForm()) {
//         return;
//       } else {
//         const orderItemsPayload = orderItems.map((item) => ({
//           id_product: item.id,
//           quantity: item.cart_item_infor.quantity,
//           id_cartItem: item.cart_item_infor.id,
//           price: item.Shoes.price,
//         }));
//         console.log(orderItemsPayload);

//         await axios
//           .post(
//             'http://localhost:8000/api/order/create',
//             {
//               cartItems: orderItemsPayload,
//               address: address,
//               phoneNumber: phoneNumber,
//             },
//             {
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${GetToken()}`,
//               },
//             },
//           )
//           .then((res) => {
//             toast.success(res.data.message);
//             window.location.reload();
//           })
//           .catch((e) => {
//             toast.error(e.message);
//           });
//       }
//     }
//   };

//   const handleBuyWithStripe = async (address, phoneNumber) => {
//     if (orderItems.length === 0) {
//       toast.error('Please select items to pay');
//     } else {
//       try {
//         setIsLoading(true);

//         const ItemsPayload = orderItems.map((item) => {
//           return {
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: item.Shoes.name,
//               },
//               unit_amount: parseInt(((item.Shoes.price / 23000) * 100).toFixed(2)),
//             },
//             quantity: item.cart_item_infor.quantity,
//           };
//         });
//         const orderItemsPayload = orderItems.map((item) => {
//           return {
//             id_product: item.id,
//             id_cartItem: item.cart_item_infor.id,
//             quantity: item.cart_item_infor.quantity,
//             price: item.Shoes.price,
//           };
//         });

//         const response = await axios.post(
//           'http://localhost:8000/api/payment',
//           {
//             items: ItemsPayload,
//             cart_size_items: orderItemsPayload,
//             address: address,
//             phoneNumber: phoneNumber,
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${GetToken()}`,
//             },
//           },
//         );

//         toast.success(response.data.message);
//         setIsCompleted(true);
//         window.location.replace(response.data.url);
//       } catch (error) {
//         console.error(error.message);
//         toast.error('An error occurred. Please try again.');
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchApiCarts = async () => {
//       const response = await axios.get(`http://localhost:8000/api/cart/details`, {
//         headers: {
//           Authorization: `Bearer ${GetToken()}`,
//         },
//       });
//       const cartsData = await response.data;
//       setCartItems(cartsData.Cart.Cart_Items);
//     };
//     fetchApiCarts();
//   }, []);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const openModal2 = () => {
//     setIsModalOpen2(true);
//   };

//   const closeModal2 = () => {
//     setIsModalOpen2(false);
//   };

//   return (
//     <>
//     <div className={cx('container')}>
//     <div className={cx('left-content  ')}>

//     <ToastContainer
//       position="top-right"
//       autoClose={4000}
//       transition={Flip}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="light"
//     />
//     {cartItems.length === 0 ? (
//       <p className={cx('cart-item-null')}>There are no products in your shopping cart.</p>
//     ) : (
//       cartItems.map((cartItem) => {
//         return (
//           <ItemCart
//             data={cartItem}
//             onSelect={() => {
//               handleItemSelect(cartItem);
//             }}
//             key={cartItem.id}
//           />
//         );
//       })
//     )}
//     {cartItems.length > 0 && (
//       <div className={cx('options')}>
//         <Button animation className={cx('btn')} onClick={() => openModal()} primary>
//           Go to Checkout
//         </Button>
//         <Button
//           animation
//           className={cx('btn-buy')}
//           onClick={() => {
//             openModal2();
//           }}
//         >
//           BUY WITH STRIPE
//         </Button>
//       </div>
//     )}
//     ,
//     <Popup isOpen={isModalOpen} onRequestClose={() => closeModal()} width={String('500px')} height={'350px'}>
//       <animated.div style={modalAnimation}>
//         <h2>Payment confirmation</h2>

//         <div className={cx('input-field')}>
//           <div className={cx('header')}>Enter address</div>
//           <AutoComplete setParentInputValue={setAutocompleteInputValue} />
//         </div>

//         <div className={cx('input-field')}>
//           <div className={cx('header')}>Enter phone number</div>
//           <InputForm
//             placeholder={'Enter phone number'}
//             type="text"
//             value={payload.phoneNumber}
//             setValue={setPayload}
//             name={'phoneNumber'}
//             className={cx('input')}
//             leftIcon={faPhone}
//           />
//         </div>

//         <div className={cx('options')}>
//           <Button
//             onClick={() => {
//               handleOrderAll(autocompleteInputValue, payload.phoneNumber);
//             }}
//             outline
//           >
//             Confirm
//           </Button>
//         </div>
//       </animated.div>
//     </Popup> */
//     /* <Popup isOpen={isModalOpen2} onRequestClose={() => closeModal2()} width={String('500px')} height={'350px'}>
//       <animated.div style={modalAnimation2}>
//         <h2>Payment confirmation</h2>
//         <div className={cx('input-field')}>
//           <div className={cx('header')}>Enter address</div>
//           <AutoComplete setParentInputValue={setAutocompleteInputValue2} />
//         </div>
//         <div className={cx('input-field')}>
//           <div className={cx('header')}>Enter phone number</div>
//           <InputForm
//             placeholder={'Enter phone number'}
//             type="text"
//             value={payload2.phoneNumber}
//             setValue={setPayload2}
//             name={'phoneNumber'}
//             className={cx('input')}
//             leftIcon={faPhone}
//           />
//         </div>
//         <div className={cx('options')}>
//           <Button
//             onClick={() => {
//               if (!isLoading && !isCompleted) {
//                 handleBuyWithStripe(autocompleteInputValue2, payload2.phoneNumber);
//               }
//             }}
//             outline
//           >
//             Confirm
//           </Button>
//         </div>
//       </animated.div>
//     </Popup>
//       </div>

//     </div>

//       <div className={cx('right-content')}>
//         <p>aloalalalalal</p>
//       </div>
//     </>

//   );
// }

// export default Cart;
