import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { faAudioDescription, faShoePrints, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '~/components/Button/Button';
import InputForm from '~/components/InputForm/InputForm';
import Popup from '~/components/Popup/Popup';
import GetToken from '~/Token/GetToken';
import styles from './ManageProducts.module.scss';
import CustomSelect from '~/components/CustomSelect';

const cx = classNames.bind(styles);

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [image, setImage] = useState([]);
  const [productId, setProductId] = useState();
  const [breeds, setBreeds] = useState([]);
  const [selectedBreedId, setSelectedBreedId] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [payloadUpdate, setPayloadUpdate] = useState({
    name: '',
    breed: '',
    amount: '',
    import_price: '',
    price: '',
  });

  const [payloadAddProduct, setPayloadAddProduct] = useState({
    name: '',
    breed: '',
    amount: '',
    import_price: '',
    price: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    name: null,
    breed: null,
    amount: null,
    import_price: null,
    price: null,
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!payloadUpdate.name.trim()) {
      errors.name = 'Please enter product name';
      isValid = false;
    }
    if (!payloadUpdate.amount.toString().trim()) {
      errors.amount = 'Please enter a amount';
      isValid = false;
    }
    if (!payloadUpdate.import_price.toString().trim()) {
      errors.price = 'Please enter a import_price';
      isValid = false;
    }
    if (!payloadUpdate.price.toString().trim()) {
      errors.price = 'Please enter a selling price';
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const getProduct = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/product?limit=10000');
      setProducts(response.data.result);
      setfilteredProducts(response.data.result);
      // console.log("respone 1 ne",response);
      // console.log("hehe", response.data.result)
    } catch (e) {
      console.log(e);
    }
  };

  const fetchApiDetailProduct = async (id) => {
    try {
      setIsModalOpenUpdate(true);
      const response = await axios.get(`http://localhost:8000/api/product/${id}`);
      const product = response.data.result;
      console.log('respone detail product ne', response);
      console.log('product nè hehe', product);
      setPayloadUpdate((prevPayload) => ({
        ...prevPayload,
        name: product.name,
        breed: product.Breed.id,
        amount: product.amount,
        import_price: product.import_price,
        price: product.price,
      }));
    } catch (e) {
      toast.error(e.message);
    }
  };

  const fetchApiBreeds = async () => {
    const response = await axios.get('http://localhost:8000/api/breed');
    // console.log('response', response);
    const breedsData = await response.data.breeds;
    setBreeds(breedsData);
  };
  
  const handleAddProduct = async (image, name, id_breed, amount, import_price, price) => {
await axios
   .post(
     'http://localhost:8000/api/product/add',
     {
       image: image,
       name: name,
       id_breed: id_breed,
       amount: amount,
       import_price: import_price,
       price: price,
     },
     {
       headers: {
         'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${GetToken()}`,
       },
     },
   )
   .then((res) => {
     toast.success(res.data.message);
     setTimeout(() => {
       window.location.reload();
     }, 1000);
   })
   .catch((err) => {
     toast.error(err);
   });
  //  console.log("name", name)
  //  console.log("amount", amount);
  //  console.log("import price", import_price);
  //  console.log("peice", price);
  };

  const handleUpdateProduct = async (name, amount, import_price, price) => {
    if (!validateForm()) {
      return;
    } else {
      await axios
        .put(
          `http://localhost:8000/api/product/updateInfor/${productId}`,
          {
            name: name,
            amount: amount,
            import_price: import_price,
            price: price,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${GetToken()}`,
            },
          },
        )
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((e) => {
          toast.error(e);
        });
        // console.log("name", name)
        // console.log("amount", amount);
        // console.log("import price", import_price);
        // console.log("peice", price);
    }
  };

  const handleUpdateImage = async (image) => {
    if (!validateForm()) {
      return;
    } else {
      await axios
        .put(
          `http://localhost:8000/api/product/updateImages/${productId}`,
          {
            image: image,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${GetToken()}`,
            },
          },
        )
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

  const handleDeleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/product/delete/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${GetToken()}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    getProduct();
    fetchApiBreeds();
  }, []);

  useEffect(() => {
    if (!products || !Array.isArray(products)) {
      console.log('Error!');
    }

    const result = products.filter((product) => {
      return product.name && product.name.toLowerCase().match(search.toLowerCase());
    });

    setfilteredProducts(result);
  }, [search, products]);

  const modalAnimationUpdate = useSpring({
    opacity: isModalOpenUpdate ? 1 : 0,
  });
  const modalAnimationAdd = useSpring({
    opacity: isModalOpenAdd ? 1 : 0,
  });

  const closeModalUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const openModalAdd = () => {
    setIsModalOpenAdd(true);
    setPayloadUpdate({});
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };

  const columns = [
    {
      name: 'Avatar',
      selector: (row) => row.image,
      cell: (row) => <img src={row.image} alt={row.name} width="100px" height="100px" />,
    },
    {
      name: 'Product name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Breed name',
      selector: (row) => row.Breed.name,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'Import price',
      selector: (row) => row.import_price,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
  ];

  const handleRowClick = (row) => {
    const productId = row.id;
    fetchApiDetailProduct(productId);
    setProductId(productId);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
    setAvatar(e.target.files[0]);
  };

  return (
    <div className={cx('wrapper')}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
      <DataTable
        title="Products list"
        columns={columns}
        data={filteredProducts}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        pointerOnHover
        highlightOnHover
        pagination
        className={cx('fixed-header')}
        subHeader
        subHeaderComponent={
          <div className={cx('wrapper-header')} style={{ zIndex: 0 }}>
            <Button onClick={openModalAdd} leftIcon={<FontAwesomeIcon icon={faPlus} />} blue>
              Add Product
            </Button>
            <input
              type="text"
              placeholder="Search for products here"
              className={cx('search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
        }
        onRowClicked={(row) => {
          handleRowClick(row);
        }}
      />

      <Popup
        isOpen={isModalOpenAdd}
        onRequestClose={() => closeModalAdd()}
        width={'700px'}
        height={'700px'}
        className={cx('popup')}
      >
        <animated.div style={modalAnimationAdd}>
          <h2>Add Product</h2>

          <div className={cx('header')}>Image of product</div>
          <div className={cx('input-field')}>
            <div className={cx('upload-field')}>
              {avatar && <img src={image} className={cx('image')} alt="Avatar" />}
              <label htmlFor="file-upload" className={cx('upload-btn')}>
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                <input id="file-upload" type="file" onChange={handleImgChange}></input>
              </label>
            </div>
          </div>

          <div className={cx('input-field')}>
            <div className={cx('header')}>Product name</div>
            <InputForm
              placeholder="Enter name products..."
              type="text"
              value={payloadUpdate.name}
              setValue={setPayloadAddProduct}
              name={'name'}
              className={cx('input')}
              leftIcon={faShoePrints}
            />
          </div>

          <div className={cx('header')}>Select breed</div>
          <div className={cx('input-field')}>
            <CustomSelect data={breeds} setId={setSelectedBreedId}></CustomSelect>
            {/* {errorMessages.category && <div className={cx('error-message')}>{errorMessages.category}</div>} */}
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Amount</div>
            <InputForm
              placeholder="Enter product amount..."
              type="text"
              value={payloadUpdate.amount}
              setValue={setPayloadAddProduct}
              name={'amount'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Import price</div>
            <InputForm
              placeholder="Enter product import price..."
              type="text"
              value={payloadUpdate.import_price}
              setValue={setPayloadAddProduct}
              name={'import_price'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Price</div>
            <InputForm
              placeholder="Enter product price..."
              type="text"
              value={payloadUpdate.price}
              setValue={setPayloadAddProduct}
              name={'price'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
          </div>

          <div className={cx('options')}>
            <Button
              onClick={() =>
                handleAddProduct(
                  avatar,
                  payloadAddProduct.name,
                  selectedBreedId,
                  payloadAddProduct.amount,
                  payloadAddProduct.import_price,
                  payloadAddProduct.price,
                )
              }
              outline
            >
              Confirm
            </Button>
          </div>
        </animated.div>
      </Popup>

      <Popup 
        isOpen={isModalOpenUpdate}
         onRequestClose={() => closeModalUpdate()} 
         width={'700px'} 
         height={'700px'}
      >
        <animated.div style={modalAnimationUpdate}>
          <h2>Product information</h2>

            <div className={cx('header')}>Image of product</div>
            <div className={cx('input-field')}>
              <div className={cx('upload-field')}>
                {avatar && <img src={image} className={cx('image')} alt="Avatar" />}
                <label htmlFor="file-upload" className={cx('upload-btn')}>
                  <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                  <input id="file-upload" type="file" onChange={handleImgChange}></input>
                </label>
              </div>
              <Button onClick={() => handleUpdateImage(avatar)} outline>
                Change Image
              </Button>
            </div>

            <div className={cx('input-field')}>
            <div className={cx('header')}>Product name</div>
            <InputForm
              placeholder="Enter name product..."
              type="text"
              value={payloadUpdate.name}
              setValue={setPayloadUpdate}
              name={'name'}
              className={cx('input')}
              leftIcon={faShoePrints}
            />
            {errorMessages.name && <div className={cx('error-message')}>{errorMessages.name}</div>}
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Amount</div>
            <InputForm
              placeholder="Enter product amount..."
              type="text"
              value={payloadUpdate.amount}
              setValue={setPayloadUpdate}
              name={'amount'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
            {errorMessages.amount && <div className={cx('error-message')}>{errorMessages.amount}</div>}
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Import price</div>
            <InputForm
              placeholder="Enter product import price..."
              type="text"
              value={payloadUpdate.import_price}
              setValue={setPayloadUpdate}
              name={'import_price'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
            {errorMessages.import_price && <div className={cx('error-message')}>{errorMessages.import_price}</div>}
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Price</div>
            <InputForm
              placeholder="Enter product price..."
              type="text"
              value={payloadUpdate.price}
              setValue={setPayloadUpdate}
              name={'price'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
            {errorMessages.price && <div className={cx('error-message')}>{errorMessages.price}</div>}
          </div>

          <div className={cx('options')}>
            <Button
              onClick={() =>
                handleUpdateProduct(
                  payloadUpdate.name,
                  payloadUpdate.amount,
                  payloadUpdate.import_price,
                  payloadUpdate.price,
                )}
              outline
            >
              Change information
            </Button>
            <Button onClick={() => handleDeleteProduct(productId)} primary>
              Delete
            </Button>
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default ManageProducts;
