import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Button from '~/components/Button';
import styles from './Home.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function Home() {
  const [categories, setCategories] = useState([]);
  const [shoes, setShoes] = useState([]);
  useEffect(() => {
    const fetchAPICategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/breed/');
        setCategories(response.data.breeds);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAPIShoes = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/revenue/product?startDate=2020-01-01 00:00:00&endDate=2025-12-31 08:31:28',
        );
        setShoes(response.data.result.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPICategories();
    fetchAPIShoes();
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('slide-bar')}>
        <Slider {...settings}>
          <img
            className={cx('slide')}
            alt="slide2"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-2.jpg"
          ></img>

          <img
            className={cx('slide')}
            alt="slide3"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-3.jpg"
          ></img>

          <img
            className={cx('slide')}
            alt="slide4"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-4.jpg"
          ></img>

          <img
            className={cx('slide')}
            alt="slide5"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-5.jpg"
          ></img>

          <img
            className={cx('slide')}
            alt="slide5"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-6.jpg"
          ></img>

          <img
            className={cx('slide')}
            alt="slide5"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-8.jpg"
          ></img>
        </Slider>
      </div>

      <div className={cx('categories')}>
        <h2 className={cx('header')}>Chào mừng bạn đến với hệ thống cửa hàng PET SHOP</h2>
        <div className={cx('list-category')}>
          <div className={cx('category-item')}>
            <img
              src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/welcome_1.png?1701914025229"
              alt="Online Order"
            ></img>
            <div className={cx('content-item')}>
            <h3>
              <a href="#OnlineOrder">Đặt Hàng Online</a>
            </h3>
            <p>Giao hàng hỏa tốc, nội thành trong 2 tiếng</p>
            </div>
          </div>
          <div className={cx('category-item')}>
            <img
              src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/welcome_2.png?1701914025229"
              alt="Grooming"
            ></img>
            <div className={cx('content-item')}><h3>
              <a href="#Service">Cắt Tỉa & Spa</a>
            </h3>
            <p>Với quy trình 10 bước cắt tỉa, tạo kiểu cùng những thợ groomer hàng đầu</p></div>
            
          </div>
          <div className={cx('category-item')}>
            <img
              src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/welcome_3.png?1701914025229"
              alt="Hotel"
            ></img>
            <div className={cx('content-item')}><h3>
              <a href="#Service">Lưu chuồng</a>
            </h3>
            <p>Chăm sóc và bảo vệ bé cún, mèo của bạn 24/7</p></div>
            
          </div>
          <div className={cx('category-item')}>
            <img
              src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/welcome_4.png?1701914025229"
              alt="Veterinarian"
            ></img>
            <div className={cx('content-item')}><h3>
              <a href="#Service">Bác Sĩ Thú Y</a>
            </h3>
            <p>Khám chữa bệnh với các thiết bị hiện đại</p></div>
            
          </div>
        </div>
      </div>

      <div className={cx('categories')}>
        <h2 className={cx('header')}>Category</h2>
        <div className={cx('list-category')}>
          {categories &&
            categories.map((category) => {
              return (
                <div className={cx('category')}>
                  <Link>
                    <img className={cx('category-image')} src={category.image} alt="category"></img>
                    <div className={cx('category-container')}>
                      <div className={cx('category-title')}>{category.name}</div>
                      <Button
                        key={category.id}
                        animation
                        className={cx('category-btn')}
                        to={`${config.routes.allProducts}?id1=${category.id}`}
                        // to={`/detailItem/${category.id}`}
                        // to={config.routes.allProducts} className={cx('custom-button')}
                      >
                        SHOP NOW
                      </Button>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>

      <div className={cx('items')}>
        <h2 className={cx('header')}>BEST-SELLING PRODUCTS</h2>
        <div className={cx('list-item')}>
          {categories &&  
            categories.map((categories) => {
              return (
                <div className={cx('item')}>
                  <img src={categories.image} className={cx('item-img')} alt="img"></img>
                  <div className={cx('item-overlay')}>
                    <Link className={cx('item-icon')} to={`detailItem/${categories.id}`}>
                      <Icon icon="iconamoon:search-bold" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className={cx('btn-wrap')}>
        <div className={cx('custom-button-container')}>
          <Link to={config.routes.allProducts} className={cx('custom-button')}>
            <span className={cx('bg-transition')}></span>
            <span className={cx('icon-transition')}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className={cx('button-text')}>See all</span>
          </Link>
        </div>
      </div>

      <div className={cx('slider2')}>
        <img
          src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/banner_index.png?1701914025229"
          alt="Slider"
        ></img>
      </div>

      <div className={cx('categories')}>
        <h2 className={cx('header')}>Dịch vụ của PET SHOP</h2>
        <div className={cx('list-category')}>
          <div id="Service" className={cx('service-item-left')}>
            <h2>KHÁCH SẠN THÚ CƯNG</h2>
            <div className={cx('content-service-left')}>Giúp thú cưng sạch sẽ hơn, gọn gàng hơn</div>
            <div className={cx('content-service-left')}>Tạo những kiểu tóc sang chảnh, ấn tượng</div>
            <div className={cx('content-service-left')}>Loại bỏ các mầm móng gây bệnh từ lông móng</div>
            <div className={cx('content-service-left')}>
              Thú cưng được massage đúng cách, tạo tâm lý vui vẻ, thoải mái
            </div>
            <div className={cx('content-service-left')}>Đảm bảo an toàn cho boss</div>
          </div>
          <div className={cx('service-item-center')}>
            <img
              alt="service-img"
              src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/banner_service.png?1701914025229"
            ></img>
          </div>
          <div className={cx('service-item-right')}>
            <h2>THÚ Y - KHÁM CHỮA BỆNH</h2>
            <div className={cx('content-service-right')}>Ngăn ngừa và sớm phát hiện các bệnh nguy hiểm</div>
            <div className={cx('content-service-right')}>Kiểm soát được tình trạng mất cân bằng dinh dưỡng</div>
            <div className={cx('content-service-right')}>
              Phát hiện bệnh từ những dấu hiệu ban đầu và điều trị dứt điểm
            </div>
            <div className={cx('content-service-right')}>Tiết kiệm chi phí và thời gian điều trị cho thú cưng</div>
            <div className={cx('content-service-right')}>Phòng ngừa các bệnh lây từ thú sang người</div>
          </div>
        </div>
      </div>

      <div className={cx('categories')}>
        <h2 className={cx('header')}>Bảng giá dịch vụ cửa hàng PET SHOP</h2>
        <div className={cx('slider3')}>
          <img
            src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/bang-pet-cung.jpg?1701914025229"
            alt="Slider"
          ></img>
        </div>
      </div>

      <div className={cx('container-form')}>
        <div className={cx('leftColumn')}>
          <h2>ĐẶT LỊCH NGAY QUA HOTLINE</h2>
          <p className={cx('left-column-content')}>
            Quý khách vui lòng đặt lịch với chúng tôi trước khi đưa thú cưng tới sử dụng dịch vụ để đảm bảo chúng tôi
            luôn sắp xếp nhân sự để phục vụ quý khách tốt nhất
          </p>
          <div className={cx('left-column-content1')}>
            <p>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
            <p>Điện thoại: (012) 345-6789</p>
            <p>Email: contact@petstore.com</p>
          </div>
          <div className={cx('left-column-content1')}>
            <p>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
            <p>Điện thoại: (012) 345-6789</p>
            <p>Email: contact@petstore.com</p>
          </div>
          <div className={cx('left-column-content1')}>
            <p>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
            <p>Điện thoại: (012) 345-6789</p>
            <p>Email: contact@petstore.com</p>
          </div>
          <div className={cx('left-column-content1')}>
            <p>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
            <p>Điện thoại: (012) 345-6789</p>
            <p>Email: contact@petstore.com</p>
          </div>
          <div className={cx('left-column-content1')}>
            <p>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
            <p>Điện thoại: (012) 345-6789</p>
            <p>Email: contact@petstore.com</p>
          </div>
        </div>

        <div className={cx('rightColumn')}>
          <h2>ĐẶT LỊCH CHĂM SÓC THÚ CƯNG</h2>
          <form>
            <div className={cx('radioColumn')}>
              <div className={cx('input-name')}>
                <input placeholder="Tên của bạn" type="name" id="name" name="name" required />
              </div>
              <div className={cx('input-phone')}>
                <input placeholder="Số điện thoại" type="tel" id="phone" name="phone" required />
              </div>
              <div className={cx('serviceGroup')}>
                <div className={cx('radioGroup')}>
                  <label for="dog">Chó</label>
                  <input type="radio" id="dog" name="petType" value="Chó" required />
                </div>
                <div className={cx('radioGroup')}>
                  <label for="cat">Mèo</label>
                  <input type="radio" id="cat" name="petType" value="Mèo" required />
                </div>
              </div>
              <div className={cx('serviceGroup')}>
                <div className={cx('radioColumn')}>
                  <div className={cx('radioGroup')}>
                    <label for="location1">54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</label>
                    <input
                      type="radio"
                      id="location3"
                      name="location"
                      value="54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng"
                      required
                    />
                  </div>
                  <div className={cx('radioGroup')}>
                    <label for="location2">54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</label>
                    <input
                      type="radio"
                      id="location3"
                      name="location"
                      value="54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng"
                      required
                    />
                  </div>
                  <div className={cx('radioGroup')}>
                    <label for="location3">54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</label>
                    <input
                      type="radio"
                      id="location3"
                      name="location"
                      value="54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng"
                      required
                    />
                  </div>
                </div>
              </div>
              <label>Dịch vụ thú cưng</label>
              <div className={cx('serviceGroup')}>
                <div className={cx('radioGroup')}>
                  <label for="service1">Cạo lông</label>
                  <input type="radio" id="service1" name="service" value="Cạo lông" />
                </div>
                <div className={cx('radioGroup')}>
                  <label for="service2">Combo Tắm vệ sinh</label>
                  <input type="radio" id="service2" name="service" value="Combo Tắm vệ sinh" required />
                </div>
                <div className={cx('radioGroup')}>
                  <label for="service3">Combo Tắm + Cạo Toàn Thân</label>
                  <input type="radio" id="service3" name="service" value="Combo Tắm + Cạo Toàn Thân" required />
                </div>
                <div className={cx('radioGroup')}>
                  <label for="service4">Combo Tắm + Cạo Thẩm Mỹ</label>
                  <input type="radio" id="service4" name="service" value="Combo Tắm + Cạo Thẩm Mỹ" required />
                </div>
                <div className={cx('radioGroup')}>
                  <label for="service5">Trọn gói Tắm vệ sinh + Cắt tạo kiểu (Full option)</label>
                  <input
                    type="radio"
                    id="service5"
                    name="service"
                    value="Trọn gói Tắm vệ sinh + Cắt tạo kiểu (Full option)"
                    required
                  />
                </div>
              </div>

              <div className={cx('formGroup')}>
                <label for="time">Thời gian đặt lịch</label>
                <input type="datetime-local" id="time" name="time" required />
              </div>
              <button type="submit">Gửi PET CƯNG</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
