import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

import config from '~/config';
import styles from './Sidebar.module.scss';
import { faBook, faCat, faChartLine, faDog, faHouse, faList, faRightFromBracket, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { faServicestack } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(() => {
    return parseInt(localStorage.getItem('activeIndex')) || 0;
  });

  const handleSetActive = (index) => {
    setActiveIndex(index);
  };

  function Logout() {
    document.cookie = 'token=; path=/';
    window.location.replace(config.routes.login);
    localStorage.setItem('Role', null);
  }

  useEffect(() => {
    localStorage.setItem('activeIndex', activeIndex.toString());
  }, [activeIndex]);

  return (
    <section className={cx('wrapper')}>
      <Link to="" className={cx('brand')}>
        <FontAwesomeIcon className={cx('bx')} icon={faFaceSmile}></FontAwesomeIcon>
        <span className={cx('text')}>ADMIN PAGE</span>
      </Link>

      <ul className={cx('side-menu', 'top')}>
        <li
          className={cx({ active: activeIndex === 0 })}
          onClick={() => window.location.replace(config.routes.adminPending)}
        >
          <Link to="" onClick={() => handleSetActive(0)}>
            <FontAwesomeIcon className={cx('bx')} icon={faHouse}></FontAwesomeIcon>
            <span className={cx('text')}>Order</span>
          </Link>
        </li>

        <li
          className={cx({ active: activeIndex === 1 })}
          onClick={() => window.location.replace(config.routes.appointmentPending)}
        >
          <Link to="" onClick={() => handleSetActive(1)}>
            <FontAwesomeIcon className={cx('bx')} icon={faHouse}></FontAwesomeIcon>
            <span className={cx('text')}>Appointment</span>
          </Link>
        </li>

        <li
          className={cx({ active: activeIndex === 4 })}
          onClick={() => window.location.replace(config.routes.manageBreeds)}
        >
          <Link to="" onClick={() => handleSetActive(4)}>
            <FontAwesomeIcon className={cx('bx')} icon={faCat}></FontAwesomeIcon>
            <span className={cx('text')}>Breeds</span>
          </Link>
        </li>

        <li
          className={cx({ active: activeIndex === 5 })}
          onClick={() => window.location.replace(config.routes.manageProducts)}
        >
          <Link to="" onClick={() => handleSetActive(5)}>
            <FontAwesomeIcon className={cx('bx')} icon={faDog}></FontAwesomeIcon>
            <span className={cx('text')}>Products</span>
          </Link>
        </li>

        <li
          className={cx({ active: activeIndex === 6 })}
          onClick={() => window.location.replace(config.routes.manageServices)}
        >
          <Link to="" onClick={() => handleSetActive(6)}>
            <FontAwesomeIcon className={cx('bx')} icon={faServicestack}></FontAwesomeIcon>
            <span className={cx('text')}>Services</span>
          </Link>
        </li>

        <li
          className={cx({ active: activeIndex === 7 })}
          onClick={() => window.location.replace(config.routes.manageBlog)}
        >
          <Link to="" onClick={() => handleSetActive(7)}>
            <FontAwesomeIcon className={cx('bx')} icon={faBook}></FontAwesomeIcon>
            <span className={cx('text')}>Blog</span>
          </Link>
        </li>

        <li
          className={cx({ active: activeIndex === 3 })}
          onClick={() => window.location.replace(config.routes.revenue)}
        >
          <Link to="" onClick={() => handleSetActive(3)}>
            <FontAwesomeIcon className={cx('bx')} icon={faChartLine}></FontAwesomeIcon>
            <span className={cx('text')}>Analytics</span>
          </Link>
        </li>
      </ul>

      <ul className={cx('side-menu')}>
        <li>
          <Link to="" onClick={() => Logout()} className={cx('logout')}>
            <FontAwesomeIcon className={cx('bx')} icon={faRightFromBracket}></FontAwesomeIcon>
            <span className={cx('text')}>Log out</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Sidebar;
