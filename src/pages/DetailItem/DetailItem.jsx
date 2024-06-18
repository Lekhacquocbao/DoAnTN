import classNames from 'classnames/bind';
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    if (!GetToken()) {
      toast.warning('Please login first!');
    } else {
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
          },
        )
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const settingSlider = {
    // dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 2,
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
        // console.log('besst selling', response);
        setProducts(response.data.result.products);
      } catch (error) {
        console.log(error);
      }
    };
    getAPIDetailItem();
    fetchAPIProducts();
  }, [id]);

  useEffect(() => {
    const fetchAPIRelaredProducts = async () => {
      try {
        const BreedId = product.Breed.id;
        const response = await axios.get(`https://2hm-store.click/api/product?id_breed=${BreedId}`);
        console.log('related', product);
        setRelated(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPIRelaredProducts();
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
          <img alt="img" src={product.image && product.image[0]?.image ? product.image[0].image : 'https://thudaumot.binhduong.gov.vn/Portals/0/images/default.jpg' } className={cx('img')}></img>
        </div>
        <div className={cx('prouduct-info')}>
          <h1 className={cx('product-name')}>{product.name}</h1>
          <p className={cx('product-des')}>
            {product.Breed ? product.Breed.name : 'Breed information is not available'}
          </p>
          <p className={cx('product-des')}>{product.description}</p>
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
            >
              <span>ADD TO CART</span>
            </button>
          </div>
        </div>
      </div>

      
      <div className={cx('categories')}>
        <h2 className={cx('header')}>BEST SELLING PRODUCTS</h2>
        <Slider {...settingSlider}>
          {products &&
            products.map((products) => {
              return (
                <div className={cx('category')}>
                  <Link>
                    <img className={cx('category-image')} src={products.image ? products.image: "https://thudaumot.binhduong.gov.vn/Portals/0/images/default.jpg"} alt="products"></img>
                    <div className={cx('category-container')}>
                      <div className={cx('category-title')}>{products.name}</div>
                      <Button
                        key={products.id}
                        animation
                        className={cx('category-btn')}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(products.id);
                        }}
                        // to={`/detailItem/${products.id}`}
                      >
                        SHOP NOW
                      </Button>
                    </div>
                  </Link>
                </div>
              );
            })}
        </Slider>
      </div>

      <div class="categories-wrapper">
        
      </div>
      <div className={cx('categories')}>
        <h2 className={cx('header')}>RELATED PRODUCTS</h2>
        <Slider {...settingSlider}>
          {related &&
            related.map((products) => {
              return (
                <div className={cx('category')}>
                  <Link>
                    <img className={cx('category-image')} src={products.image ? products.image: "https://thudaumot.binhduong.gov.vn/Portals/0/images/default.jpg"} alt="products"></img>
                    <div className={cx('category-container')}>
                      <div className={cx('category-title')}>{products.name}</div>
                      <Button
                        key={products.id}
                        animation
                        className={cx('category-btn')}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(products.id);
                        }}
                      >
                        SHOP NOW
                      </Button>
                    </div>
                  </Link>
                </div>
              );
            })}
        </Slider>
      </div>

      <div className={cx('extra-detail')}>
        <div className={cx('header-field')}>
          <span className={cx('header-rate')}>Rating</span>
        </div>
        <div className={cx('content')}>
          {ratings.map((rating, index) => {
            return <Rate data={rating} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailItem;
