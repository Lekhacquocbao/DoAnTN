import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Flip, ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import Image from '~/components/Image';
import Button from '~/components/Button';
import GetToken from '~/Token/GetToken';
import styles from './ItemCart.module.scss';

const cx = classNames.bind(styles);

function BookItemCart({ data, onSelect }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Log the data whenever it changes
    console.log("data nè hehehehehe",data);
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

  return (
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
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className={cx('checkbox')} />
        <Image className={cx('img')} src={data.Image}></Image>
      </div>
      <div className={cx('content-center')}>
        <span className={cx('book-name')}>{data.name}</span>
        <span className={cx('book-price')}>{data.price && formatCurrency(data.price)}</span>
        <span className={cx('book-quantity')}>x{data.cart_item_infor.quantity}</span>
      </div>
      <div className={cx('content-right')}>
        <div className={cx('options')}>
          <Button onClick={() => handleDeleteCart()} outline className={cx('btn')}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

BookItemCart.protoTypes = {
  data: PropTypes.node.isRequired,
  onSelect: PropTypes.func,
};

export default BookItemCart;


// import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
// import { useState, useEffect } from 'react';
// import { Flip, ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';

// import Image from '~/components/Image';
// import Button from '~/components/Button';
// import GetToken from '~/Token/GetToken';
// import styles from './ItemCart.module.scss';

// const cx = classNames.bind(styles);

// function BookItemCart({ data, onSelect }) {
//   const [isChecked, setIsChecked] = useState(false);

//   useEffect(() => {
//     // Log the data whenever it changes
//     console.log("data nè hehe",data);
//   }, [data]);

//   const handleDeleteCart = async () => {
//     await axios
//       .delete(`http://localhost:8000/api/cart/delete/${data.cart_item_infor.id}`, {
//         headers: { Authorization: `Bearer ${GetToken()}` },
//       })
//       .then((response) => {
//         toast.success(response.data.message);

//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       })
//       .catch((err) => {
//         alert('Something went wrong', err);
//       });
//   };

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//     onSelect(data, !isChecked);
//   };

//   function formatCurrency(number) {
//     const formatter = new Intl.NumberFormat('vi-VN', {
//       style: 'currency',
//       currency: 'VND',
//     });
//     return formatter.format(number);
//   }

//   // Add a check to ensure data and data.Shoes are defined before rendering
//   if (!data || !data.Shoes) {
//     return null; // or some fallback UI
//   }

//   return (
//     <div className={cx('wrapper')}>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         transition={Flip}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <div className={cx('content-left')}>
//         <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className={cx('checkbox')} />
//         <Image className={cx('img')} src={data.Shoes.Image}></Image>
//       </div>
//       <div className={cx('content-center')}>
//         <span className={cx('book-name')}>{data.Shoes.name}</span>
//         <span className={cx('book-category')}>Size: {data.size}</span>
//         <span className={cx('book-price')}>{data.Shoes.price && formatCurrency(data.Shoes.price)}</span>
//         <span className={cx('book-quantity')}>x{data.cart_item_infor.quantity}</span>
//       </div>
//       <div className={cx('content-right')}>
//         <div className={cx('options')}>
//           <Button onClick={() => handleDeleteCart()} outline className={cx('btn')}>
//             Delete
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// BookItemCart.propTypes = {
//   data: PropTypes.shape({
//     cart_item_infor: PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       quantity: PropTypes.number.isRequired,
//     }).isRequired,
//     Shoes: PropTypes.shape({
//       Image: PropTypes.string,
//       name: PropTypes.string.isRequired,
//       price: PropTypes.number,
//     }),
//     size: PropTypes.string.isRequired,
//   }).isRequired,
//   onSelect: PropTypes.func,
// };

// export default BookItemCart;
