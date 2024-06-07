import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import React from 'react';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import config from '~/config';
import GetToken from '~/Token/GetToken';
import Search from '~/layouts/components/Search';
import styles from './Header.module.scss';
import axios from 'axios';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [infor, setInfor] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const goLogin = useCallback(
    (flag) => {
      navigate(config.routes.login, { state: { flag } });
    },
    [navigate],
  );

  const getAPIProfiler = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/profile/me', {
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      });
      // console.log(response.data.user);
      if ((response.data.success === true) & (localStorage.getItem('Role') === 'customer')) {
        setIsLogin(true);
        setInfor(response.data.user.inforUser);
      } else {
        setIsLogin(false);
        setInfor({});
      }
    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  const fetchApiCarts = async () => {
    const response = await axios.get(`http://localhost:8000/api/cart/details`, {
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    });
    // console.log('response cua ta', response.data);
    const cartsData = await response.data.Cart.Cart_Items;
    // let cart_quantity = 0;
    // for (let i = 0; i < cartsData.length; i++) {
    //   cart_quantity += cartsData[i].cart_item_infor.quantity;
    // }

    setQuantity(cartsData.length);
    // console.log("quantity hihi", cart_quantity);
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/notify/', {
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      });

      if (response.data.success && Array.isArray(response.data.result)) {
        setNotifications(response.data.result);
        setUnreadCount(response.data.result.filter((notification) => !notification.read).length);
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    getAPIProfiler();
    fetchNotifications();
    fetchApiCarts();
  }, []);

  function Logout() {
    document.cookie = 'token=;';
    window.location.replace('/');
    localStorage.setItem('Role', null);
  }
  console.log('notification', notifications);

  return (
    <header className={cx('header')}>
      <div className={cx('container')}>
        <div className={cx('header-nav')}>
          <div className={cx('logo-wrap')}>
            <Link to="/" title="BHStore">
              <div className={cx('store-name')}>BH STORE</div>
            </Link>
          </div>

          <nav className={cx('nav-bar')}>
            <div className={cx('nav-item', 'dropdown')}>
              <Link to={config.routes.introduce} className={cx('nav-link')}>
                Giới thiệu
              </Link>
            </div>
            <div className={cx('nav-item', 'dropdown')}>
              <Link to={config.routes.allProducts} className={cx('nav-link')}>
                Sản phẩm
              </Link>
              <div className={cx('dropdown-content')}>
                <Link to="/san-pham/subitem1">Subitem 1</Link>
                <Link to="/san-pham/subitem2">Subitem 2</Link>
              </div>
            </div>
            <div className={cx('nav-item', 'dropdown')}>
              <Link to="/dich-vu" className={cx('nav-link')}>
                Dịch vụ
              </Link>
              <div className={cx('dropdown-content')}>
                <Link to="/dich-vu/subitem1">Subitem 1</Link>
                <Link to="/dich-vu/subitem2">Subitem 2</Link>
              </div>
            </div>

            <div className={cx('nav-item', 'dropdown')}>
              <Link to={config.routes.contact} className={cx('nav-link')}>
                Liên hệ
              </Link>
            </div>

            {/* <div className={cx('nav-item', 'dropdown')}>
              <Link to="/thongbao" className={cx('nav-link')}>Thông báo</Link>
              <div className={cx('dropdown-content')}>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <Link key={index} to={`/thongbao/${notification.id}`}>
                      {notification.notify}
                    </Link>
                  ))
                ) : (
                  <div>Không có thông báo nào</div>
                )}
              </div>
            </div> */}

            <div className={cx('nav-item', 'dropdown')}>
              <HeadlessTippy
                interactive
                placement="bottom-end"
                delay={[0, 100]}
                render={(attrs) => (
                  <div className={cx('notification-dropdown')} tabIndex="-1" {...attrs}>
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <div key={index} className={cx('notification-item')}>
                          {/* <div className={cx('notification-avatar')}>
                            <Image src={notification.avatar || 'placeholder.png'} alt="Avatar" />
                          </div> */}
                          <div className={cx('notification-content')}>
                            {/* <div className={cx('notification-title')}>{notification.title}</div> */}
                            <div className={cx('notification-text')}>{notification.notify}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>Không có thông báo nào</div>
                    )}
                  </div>
                )}
              >
                <div className={cx('nav-link')}>
                  <Icon icon="mdi:bell-outline" width="28" height="28" />
                  {unreadCount > 0 && <span className={cx('notification-count')}>{unreadCount}</span>}
                </div>
              </HeadlessTippy>
            </div>
          </nav>

          <Search />

          <div className={cx('header-actions')}>
            {isLogin ? (
              <div className={cx('actions')}>
                <Tippy content="CART">
                  <div
                    onClick={() => {
                      window.location.replace(config.routes.cart);
                    }}
                  >
                  <div className={cx('nav-link')}>
                    <Icon icon="mdi:cart-outline" width="28" height="28"/>
                    {quantity > 0 && <span className={cx('cart-count')}>{quantity}</span>}
                  </div>
                  </div>
                </Tippy>
                <HeadlessTippy
                  interactive
                  placement="bottom-end"
                  delay={[0, 500]}
                  render={(attrs) => (
                    <div className={cx('menu')} tabIndex="-1" {...attrs}>
                      <button onClick={Logout} className={cx('user-btn')}>
                        <Icon className={cx('logout-icon')} icon="tabler:logout" />
                        <span>Log out</span>
                      </button>
                    </div>
                  )}
                >
                  <div
                    className={cx('avatar')}
                    onClick={() => {
                      window.location.replace(config.routes.information);
                    }}
                  >
                    <Image src={infor.avatar} alt="Avatar"></Image>
                  </div>
                </HeadlessTippy>
              </div>
            ) : (
              <div className={cx('login-register-btn')}>
                <button className={cx('custom-btn', 'btn-3')} onClick={() => goLogin(false)}>
                  <span>Login</span>
                </button>
                <button className={cx('custom-btn', 'btn-3')} onClick={() => goLogin(true)}>
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
