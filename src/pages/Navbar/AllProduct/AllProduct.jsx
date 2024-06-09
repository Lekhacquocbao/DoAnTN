// import classNames from 'classnames/bind';
// import React, { useEffect, useState } from 'react';
// import queryString from 'query-string';
// import { Link, useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import config from '~/config';
// import Button from '~/components/Button';
// import styles from './AllProduct.module.scss';

// const ProductItem = React.lazy(() => import('~/components/ProductItem'));
// const cx = classNames.bind(styles);

// function AllProduct() {
//   const [products, setProducts] = useState({});
//   const [breeds, setBreeds] = useState({});
//   const location = useLocation();
//   const { id1, search } = queryString.parse(location.search);
//   const [descPrice, setDescPrice] = useState(0);
//   const idBreed = id1 || '';
//   const searchValue = search || '';
//   const [activeButton, setActiveButton] = useState(1);
//   const [page, setPage] = useState(() => {
//     const storedPage = localStorage.getItem('page');
//     return storedPage ? parseInt(storedPage) : 1;
//   });
//   let [totalPage, setTotalPage] = useState();

//   const handlePageClick = (buttonId) => {
//     setActiveButton(buttonId);
//     setPage(buttonId);
//     window.location.reload();
//   };

//   const handleCategoryClick = (buttonId) => {
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('id1', buttonId);
//     const newSearch = urlParams.toString();
//     const newUrl = `${window.location.pathname}?${newSearch}`;
//     window.location.href = newUrl;
//   };

//   const pagesToShow = 10;

//   // Calculate the start and end pages
//   const startPage = Math.max(1, Math.min(page - Math.floor(pagesToShow / 2), totalPage - pagesToShow + 1));
//   const endPage = Math.min(startPage + pagesToShow - 1, totalPage);

//   useEffect(() => {
//     setActiveButton(page);
//     localStorage.setItem('page', page);
//   }, [page]);

//   useEffect(() => {
//     const fetchApiProducts = async () => {
//       const response = await axios.get(
//         `http://localhost:8000/api/product?limit=100&id_breed=${idBreed}&page=${page}&search=${searchValue}&isDesc=${descPrice}`,
//       );
//       setProducts(response.data.result);
//       setTotalPage(response.data.totalPages);
//     };

//     const fetchApiBreeds = async () => {
//       const response = await axios.get('http://localhost:8000/api/breed/');
//       const breedData = await response.data.breeds;
//       setBreeds(breedData);
//     };
//     fetchApiBreeds();
//     fetchApiProducts();
//   }, [idBreed, totalPage, page, searchValue, descPrice]);

//   return (
//     <div className={cx('wrapper')}>
//       <div className={cx('filters')}>
//         <span className={cx('label')}>Sorted by</span>
//         <div className={cx('select-input')}>
//           <span className={cx('select-input__label')}>Price</span>
//           <FontAwesomeIcon className={cx('select-input__icon')} icon={faChevronDown}></FontAwesomeIcon>
//           <ul className={cx('select-input__list')}>
//             <li className={cx('select-input__item')}>
//               <Link onClick={() => setDescPrice(0)} href="" className={cx('select-input__link')}>
//                 Price: Low to high
//               </Link>
//             </li>
//             <li className={cx('select-input__item')}>
//               <Link onClick={() => setDescPrice(1)} href="" className={cx('select-input__link')}>
//                 Price: High to low
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div className={cx('select-input')}>
//           <span className={cx('select-input__label')}>Breed</span>
//           <FontAwesomeIcon className={cx('select-input__icon')} icon={faChevronDown}></FontAwesomeIcon>
//           <ul className={cx('select-input__list')}>
//             {breeds.length &&
//               breeds.map((category) => {
//                 return (
//                   <li className={cx('select-input__item')} key={category.id}>
//                     <Link
//                       to={`${config.routes.allProducts}?search=${encodeURIComponent(searchValue)}`}
//                       onClick={() => handleCategoryClick(category.id)}
//                       className={cx('select-input__link')}
//                     >
//                       {category.name}
//                     </Link>
//                   </li>
//                 );
//               })}
//           </ul>
//         </div>
//       </div>
//       <div className={cx('book-list')}>
//         <React.Suspense fallback={<div>Loading...</div>}>
//           <ProductItem items={products.length && products} />
//         </React.Suspense>

//         <ul className={cx('pagination')}>
//           {startPage > 1 && (
//             <>
//               <Button className={cx('pagination-item')} onClick={() => handlePageClick(1)}>
//                 1
//               </Button>
//               {startPage > 2 && <span style={{ fontSize: '25px' }}>...</span>}
//             </>
//           )}
//           {Array.from({ length: pagesToShow }, (_, index) => startPage + index).map((pageNumber, index) => (
//             <Button
//               className={cx('pagination-item', `${activeButton === pageNumber ? 'active' : ''}`)}
//               onClick={() => handlePageClick(pageNumber)}
//               key={index}
//             >
//               {pageNumber}
//             </Button>
//           ))}
//           {endPage < totalPage && (
//             <>
//               {endPage < totalPage - 1 && <span style={{ fontSize: '25px' }}>...</span>}
//               <Button className={cx('pagination-item')} onClick={() => handlePageClick(totalPage)}>
//                 {totalPage}
//               </Button>
//             </>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default AllProduct;

import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import config from '~/config';
import Button from '~/components/Button';
import styles from './AllProduct.module.scss';
import ProductItem from '~/components/ProductItem';

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [descPrice, setDescPrice] = useState(0);
  const [activeButton, setActiveButton] = useState(1);
  const [page, setPage] = useState(() => (
    parseInt(localStorage.getItem('page')) || 1
  ));
  const [totalPage, setTotalPage] = useState(0);

  const location = useLocation();
  const { id1, search } = queryString.parse(location.search);
  const idBreed = id1 || '';
  const searchValue = search || '';

  useEffect(() => {
    localStorage.setItem('page', page);
  }, [page]);

  useEffect(() => {
    const fetchApiProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/product`, {
            params: {
              limit: 100,
              id_breed: idBreed,
              page: page,
              search: searchValue,
              isDesc: descPrice,
            }
          });
        setProducts(response.data.result);
        setTotalPage(response.data.totalPages || 1);  // ensure totalPages is a valid number
        setActiveButton(page);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    const fetchApiBreeds = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/breed/');
        setBreeds(response.data.breeds || []);
      } catch (error) {
        console.error("Error fetching breeds", error);
      }
    };

    fetchApiBreeds();
    fetchApiProducts();
  }, [idBreed, page, searchValue, descPrice]);

  const handlePageClick = (buttonId) => {
    setActiveButton(buttonId);
    setPage(buttonId);
  };

  const handleCategoryClick = (buttonId) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('id1', buttonId);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.location.href = newUrl;
  };

  const pagesToShow = 10;
  const startPage = Math.max(1, Math.min(page - Math.floor(pagesToShow / 2), totalPage - pagesToShow + 1));
  const endPage = Math.min(startPage + pagesToShow - 1, totalPage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <span className={styles.label}>Sorted by</span>
        <div className={styles['select-input']}>
          <span className={styles['select-input__label']}>Price</span>
          <FontAwesomeIcon className={styles['select-input__icon']} icon={faChevronDown} />
          <ul className={styles['select-input__list']}>
            <li className={styles['select-input__item']}>
              <Link to="#" onClick={() => setDescPrice(0)} className={styles['select-input__link']}>
                Price: Low to high
              </Link>
            </li>
            <li className={styles['select-input__item']}>
              <Link to="#" onClick={() => setDescPrice(1)} className={styles['select-input__link']}>
                Price: High to low
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles['select-input']}>
          <span className={styles['select-input__label']}>Breed</span>
          <FontAwesomeIcon className={styles['select-input__icon']} icon={faChevronDown} />
          <ul className={styles['select-input__list']}>
            {breeds.map((category) => (
              <li className={styles['select-input__item']} key={category.id}>
                <Link
                  to={`${config.routes.allProducts}?search=${encodeURIComponent(searchValue)}`}
                  onClick={() => handleCategoryClick(category.id)}
                  className={styles['select-input__link']}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles['book-list']}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ProductItem items={products} />
        </React.Suspense>

        <ul className={styles.pagination}>
          {startPage > 1 && (
            <>
              <Button className={styles['pagination-item']} onClick={() => handlePageClick(1)}>
                1
              </Button>
              {startPage > 2 && <span style={{ fontSize: '25px' }}>...</span>}
            </>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber, index) => (
            <Button
              className={`${styles['pagination-item']} ${activeButton === pageNumber ? styles.active : ''}`}
              onClick={() => handlePageClick(pageNumber)}
              key={index}
            >
              {pageNumber}
            </Button>
          ))}
          {endPage < totalPage && (
            <>
              {endPage < totalPage - 1 && <span style={{ fontSize: '25px' }}>...</span>}
              <Button className={styles['pagination-item']} onClick={() => handlePageClick(totalPage)}>
                {totalPage}
              </Button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AllProduct;