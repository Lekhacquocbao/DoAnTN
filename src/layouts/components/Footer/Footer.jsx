import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('container')}>
        <div className={cx('row', 'info')}>
          <div className={cx('col', 'logo')}>
            <img src="https://i.imgur.com/3Sizvuj.png" alt="Company Logo" className={cx('footer-logo')} />
            
          </div>
          <div className={cx('col', 'address')}>
            <h4>CÔNG TY CỔ PHẦN TẬP ĐOÀN BẢO HÀO</h4>
            {/* <p>Copyright 2024 BH. All rights reserved</p>
            <h3 className={cx('footer-title')}>TRỤ SỞ CHÍNH</h3> */}
            <address>
              <p>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
              <p>Điện thoại: +84 379 289 021</p>
              <p>Email: <a href="mailto:admin@gmail.com">admin@gmail.com</a></p>
            </address>
          </div>
          <div className={cx('col', 'links')}>
            <Link to={config.routes.introduce}>GIỚI THIỆU</Link>
            {/* <Link to="#linh-vuc-hoat-dong">LĨNH VỰC HOẠT ĐỘNG</Link> */}
            <Link to={config.routes.forum}>DIỄN ĐÀN</Link>
            <Link to={config.routes.contact}>LIÊN HỆ</Link>
            <Link to="#he-thong-tap-doan">HỆ THỐNG TẬP ĐOÀN</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;