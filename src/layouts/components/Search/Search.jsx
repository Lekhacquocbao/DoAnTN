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
import { Flip, ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  
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
      const response = await axios.post('https://2539-2001-ee0-1c30-3846-2c43-3841-d644-6076.ngrok-free.app/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.data.id_breed === 0 || !response.data.id_breed) {
        toast.warning('Không nhận diện được giống loài!!')
      }
      else {
        const breed = breeds.find(category => category.id === response.data.id_breed)
        localStorage.setItem('breedName', breed.name);
        window.location.href = `https://bh-store.vercel.app/allProducts?id1=${response.data.id_breed}`
        // window.location.href = `http://localhost:3000/allProducts?id1=${response.data.id_breed}`
      }
     
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
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
            placeholder="Tìm kiếm... "
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
    </div>
  );
}

export default Search;
