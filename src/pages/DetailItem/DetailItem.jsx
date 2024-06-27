import classNames from 'classnames/bind';
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import Rate from '~/components/Rate';
import GetToken from '~/Token/GetToken';
import styles from './DetailItem.module.scss';
import Slider from 'react-slick';

const cx = classNames.bind(styles);

function DetailItem() {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState({});
  const [ratings, setRatings] = useState([]);
  const [products, setProducts] = useState([]);
  const [related, setRelated] = useState([]);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const handleLinkClick = (products) => {
    window.location.href = `/detailItem/${products}`;
  };

  const handleAddToCart = async () => {
    await axios
      .post(
        'https://2hm-store.click/api/cart/add',
        {
          quantity: count,
          id_product: id,
        },
        {
          headers: {
            Authorization: `Bearer ${GetToken()}`,
          },
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        },
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
        }
        if (!response.data.success) {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={`${className} ${cx('slick-next')}`} style={{ ...style }} onClick={onClick} />;
  };

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={`${className} ${cx('slick-prev')}`} style={{ ...style }} onClick={onClick} />;
  };

  const settingSlider = {
    // dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 2,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  useEffect(() => {
    const getAPIDetailItem = async () => {
      const response = await axios.get(`https://2hm-store.click/api/product/${id}`);
      setProduct(response.data.result);
      setRatings(response.data.result.rating);
    };

    const fetchAPIProducts = async () => {
      try {
        const response = await axios.get('https://2hm-store.click/api/revenue/product');
        setProducts(response.data.result.products);
      } catch (error) {
        console.log(error);
      }
    };
    getAPIDetailItem();
    fetchAPIProducts();
  }, [id]);

  useEffect(() => {
    const fetchAPIRelatedProducts = async () => {
      try {
        const BreedId = product.Breed?.id;
        const response = await axios.get(`https://2hm-store.click/api/product?id_breed=${BreedId}`);
        console.log('related', product);
        setRelated(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (product.Breed?.id) {
      fetchAPIRelatedProducts();
    }
  }, [product]);

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(number);
  }

  return (
    <div className={cx('container')}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
      <div className={cx('product')}>
        <div className={cx('product-img')}>
          <img
            alt="img"
            src={
              product.image && product.image[0]?.image
                ? product.image[0].image
                : 'https://thudaumot.binhduong.gov.vn/Portals/0/images/default.jpg'
            }
            className={cx('img', { 'out-of-stock': product.amount === 0 })}
          />
          {product.amount === 0 && (
            <span className={cx('out-of-stock-text')} disabled>
              Hết hàng
            </span>
          )}
        </div>
        <div className={cx('prouduct-info')}>
          <h1 className={cx('product-name')}>{product.name}</h1>
          <p className={cx('product-des')}>
            Chủng loài: {product.Breed ? product.Breed.name : 'Thông tin chủng loài không có sẵn'}
          </p>
          <p className={cx('product-des')}>Số lượng: {product.amount}</p>
          <p className={cx('product-des')}>Mô tả: {product.description}</p>
          <span className={cx('prouduct-price')}>{formatCurrency(product.price)}</span>
          <div className={cx('product-cart')}>
            <div className={cx('product-quantity')}>
              <Icon className={cx('minus')} icon="typcn:minus" onClick={handleDecrement} />
              <input
                type="number"
                className={cx('quantity')}
                value={count}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value);
                  if (!isNaN(newValue) && newValue >= 0) {
                    setCount(newValue);
                  }
                }}
              />
              <Icon className={cx('plus')} icon="typcn:plus" onClick={handleIncrement} />
            </div>

            <button
              className={cx('custom-btn', 'btn-5')}
              onClick={() => {
                handleAddToCart();
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
              disabled={product.amount === 0}
            >
              <span>{product.amount === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className={cx('extra-detail')}>
        <div className={cx('header-field')}>
          <span className={cx('header-rate')}>Đánh giá</span>
        </div>
        <div className={cx('content')}>
          {ratings.length > 0 ? (
            ratings.map((rating, index) => <Rate data={rating} key={index} />)
          ) : (
            <div className={cx('no-ratings')}>
              <img
                className={cx('img-rate')}
                src="https://cdn-icons-png.flaticon.com/512/5650/5650427.png"
                alt="Chưa có đánh giá"
              ></img>
              <span className={cx('rate')}>Chưa có đánh giá</span>
            </div>
          )}
        </div>
      </div>

      <div className={cx('items-service')}>
        <h2 className={cx('header')}>SẢN PHẨM BÁN CHẠY</h2>
        <Slider {...settingSlider}>
          {products.map((product) => (
            <div key={product.id} className={cx('item-service')}>
              <Link to={`/detailItem/${product.id}`}>
                <img
                  className={cx('item-img-service')}
                  src={
                    product.image ? product.image : 'https://thudaumot.binhduong.gov.vn/Portals/0/images/default.jpg'
                  }
                  alt="product"
                />
                <div className={cx('category-container-service')}>
                  <div className={cx('category-title-service')}>{product.name}</div>
                  <Button
                    animation
                    className={cx('category-btn')}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(product.id);
                    }}
                  >
                    MUA NGAY
                  </Button>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      <div className={cx('items-service')}>
        <h2 className={cx('header')}>SẢN PHẨM LIÊN QUAN</h2>
        <Slider {...settingSlider}>
          {related.map((relatedProduct) => (
            <div key={relatedProduct.id} className={cx('item-service')}>
              <Link to={`/detailItem/${relatedProduct.id}`}>
                <img
                  className={cx('item-img-service')}
                  src={
                    relatedProduct.image
                      ? relatedProduct.image
                      : 'https://thudaumot.binhduong.gov.vn/Portals/0/images/default.jpg'
                  }
                  alt="relatedProduct"
                />
                <div className={cx('category-container-service')}>
                  <div className={cx('category-title-service')}>
                    {relatedProduct.name.length > 35 ? relatedProduct.name.slice(0, 35) + '...' : relatedProduct.name}
                  </div>
                  <Button
                    animation
                    className={cx('category-btn')}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(relatedProduct.id);
                    }}
                  >
                    MUA NGAY
                  </Button>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default DetailItem;
