import classNames from 'classnames/bind';
import React from 'react';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

function Contact() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('contact-container')}>
        <div className={cx('breadcrumb')}>
          <a href="/">Trang chủ </a>/<span>Liên hệ</span>
        </div>
        <div className={cx('info-section')}>
          <div className={cx('info-item')}>
            <div className={cx('icon')}>
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className={cx('info')}>
              <h3>Hỗ trợ tư vấn</h3>
              <p>0379289021</p>
            </div>
          </div>
          <div className={cx('info-item')}>
            <div className={cx('icon')}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className={cx('info')}>
              <h3>Chi nhánh Cửa Hàng</h3>
              <p>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
            </div>
          </div>
          <div className={cx('info-item')}>
            <div className={cx('icon')}>
              <i className="fas fa-envelope"></i>
            </div>
            <div className={cx('info')}>
              <h3>Bộ phận hỗ trợ</h3>
              <p>admin@gmail.com</p>
            </div>
          </div>
        </div>
        <div className={cx('map-form-section')}>
          <div className={cx('map-section')}>
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7956331633316!2d106.64190291471984!3d10.747201392343742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef4dfbd1b1b%3A0x421bb2f8fd7dc0e6!2zMjg0IMSQLiBUcsaw4bubYyBDaMOtbmgsIFBoxrDhu51uZyAxMywgVMOibiBCw6xuaCwgVGjhuqFuaCBwaOG7kSBI4buNYyBDaGkgTWluaA!5e0!3m2!1sen!2s!4v1620829092806!5m2!1sen!2s"
              width="700"
              height="550"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className={cx('form-section')}>
            {/* <p>Bạn hãy điền nội dung tin nhắn vào form dưới đây. Chúng tôi sẽ trả lời bạn sau khi nhận được</p>
            <form className={cx('contact-form')}>
              <div className={cx('form-group')}>
                <input placeholder='Họ Tên' type="text" id="name" name="name" />
              </div>
              <div className={cx('form-group')}>
                <input placeholder='Số điện thoại:' type="text" id="phone" name="phone" />
              </div>
              <div className={cx('form-group')}>
                <input placeholder='Email:' type="email" id="email" name="email" />
              </div>
              <div className={cx('form-group')}>
                <textarea placeholder='Nội dung:' id="message" name="message"></textarea>
              </div>
              <button type="submit">Gửi tin nhắn</button>
            </form> */}
            <div className={cx('rightColumn')}>
              {/* <img
                src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/banner_index.png?1701914025229"
                alt="Slider"
              ></img> */}
              <img
                src="https://png.pngtree.com/thumb_back/fw800/background/20220827/pngtree-pet-shop-cat-and-dog-vector-background-image_1462686.jpg"
                alt="Slider"
              ></img>
              <img src="https://vetad.net/wp-content/uploads/2018/10/Banner3-1.jpg" alt="Slider"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
