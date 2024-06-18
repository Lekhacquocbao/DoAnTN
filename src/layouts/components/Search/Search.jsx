import classNames from 'classnames/bind';
import axios from 'axios';
import { Icon } from '@iconify/react';

import HeadlessTippy from '@tippyjs/react/headless';
import { useRef } from 'react';
import { useState, useEffect } from 'react';

import styles from './Search.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';
import Popup from '~/components/Popup';
import Image from '~/components/Image';
import { toast } from 'react-toastify';


const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const modalAnimation2 = useSpring({
    opacity: isModalOpen2 ? 1 : 0,
    transform: isModalOpen2 ? 'translateY(0)' : 'translateY(-100%)',
  });
  
  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      const response = await axios.get(`https://2hm-store.click/api/products?search=${searchValue}&limit=5`);
      setSearchResult(response.data.result);
    };

    fetchApi();
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      window.location.href = `/allProducts?search=${encodeURIComponent(searchValue)}`;
    }
  };
  

  const inputRef = useRef();
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const breedResponse = await axios.get('https://2hm-store.click/api/breed/');
      const breeds = breedResponse.data.breeds;
      const response = await axios.post('https://69f7-113-189-62-19.ngrok-free.app/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // setShoeList(response.data.id_breed);
      // openModal2();
      if(!response.data.id_breed) {
        toast.error('something went wrong');
      }
      const breed = breeds.find(category => category.id === response.data.id_breed)
      localStorage.setItem('breedName', breed.name);
      window.location.href = `http://localhost:3000/allProducts?id1=${response.data.id_breed}`
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(number);
  }
  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      const response = await axios.get(`https://2hm-store.click/api/product?search=${searchValue}&limit=5`);
      setSearchResult(response.data.result);
    };

    fetchApi();
  }, [searchValue]);
  

  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <div className={cx('wrapper')}>
              <h4 className={cx('search-title')}>Product</h4>
              {searchResult &&
                searchResult.map((result) => {
                  return (
                    <Link
                      className={cx('item-search')}
                      onClick={() => window.location.replace(`/detailItem/${result.id}`)}
                    >
                      <img className={cx('image')} src={result.image} alt="Shoes" />
                      <div className={cx('info')}>
                        <h4 className={cx('name')}>
                          <span>{result.name}</span>
                        </h4>
                        <span className={cx('author')}>{result.Breed.name}</span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search Item... "
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          <label htmlFor="file-upload" className={cx('upload-btn')}>
            <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
            <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <button className={cx('search-btn')} onClick={handleSearch} onMouseDown={(e) => e.preventDefault()}>
            <Icon icon="iconamoon:search-bold" />
          </button>
        </div>
      </HeadlessTippy>

      {/* <Popup isOpen={isModalOpen2} onRequestClose={() => closeModal2()} width={'600px'} height={'600px'}>
        <animated.div style={modalAnimation2}>
          <div className={cx('header')}>TOP 10</div>
          {shoeList &&
            shoeList.map((shoe) => {
              return (
                <Link className={cx('information')} to={`/detailItem/${shoe.shoe_id}`}>
                  <Image alt="Image" className={cx('order-image')} src={shoe && shoe.shoe_image}></Image>
                  <span>{shoe && shoe.shoe_name}</span>
                  <span>{formatCurrency(shoe && shoe.price)}</span>
                </Link>
              );
            })}
        </animated.div>
      </Popup> */}

    </div>
  );
}

export default Search;
