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

  const validateQuantityForm = () => {
    let isValid = true;
    const errors = {};
    if (!payloadUpdate.amount.toString().trim()) {
      errors.amount = 'Please enter a amount';
      isValid = false;
    }
    setErrorMessages(errors);
    return isValid;
  };



  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenWareHouse, setIsModalOpenWareHouse] = useState(false);

  const getProduct = async () => {
    try {
      const response = await axios.get('https://2hm-store.click/api/product?limit=10000');
      setProducts(response.data.result);
      setfilteredProducts(response.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchApiDetailProduct = async (id) => {
    try {
      setIsModalOpenUpdate(true);
      const response = await axios.get(`https://2hm-store.click/api/product/${id}`);
      const product = response.data.result;
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
    const response = await axios.get('https://2hm-store.click/api/breed');
    const breedsData = await response.data.breeds;
    setBreeds(breedsData);
  };
  
  const handleAddProduct = async (image, name, id_breed, amount, import_price, price) => {
await axios
   .post(
     'https://2hm-store.click/api/product/add',
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
  };

  const handleUpdateProduct = async (name, amount, import_price, price) => {
    if (!validateForm()) {
      return;
    } else {
      await axios
        .put(
          `https://2hm-store.click/api/product/updateInfor/${productId}`,
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
    }
  };
  const handleQuantityProduct = async (amount) => {
    if (!validateQuantityForm()) {
      return;
    } else {
      await axios
        .put(
          `https://2hm-store.click/api/product/updateInfor/${productId}`,
          {      
            amount: amount,
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
    }
  };
  const handleUpdateImage = async (image) => {
    if (!validateForm()) {
      return;
    } else {
      await axios
        .put(
          `https://2hm-store.click/api/product/updateImages/${productId}`,
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
      .delete(`https://2hm-store.click/api/product/delete/${id}`, {
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
  const modalAnimationWareHouse = useSpring({
    opacity: isModalOpenWareHouse ? 1 : 0,
  });

  const closeModalUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const openModalAdd = () => {
    setIsModalOpenAdd(true);
    setPayloadUpdate({});
  };

  const openModalWareHouse = (id,name, amount, soldProductNum) => {
    setPayloadUpdate((prevPayload) => ({
      ...prevPayload,
      id,
      name,
      amount,
      soldProductNum,
    }));
    setProductId(id); 
    setIsModalOpenWareHouse(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };

  const closeModalWareHouse = () => {
    setIsModalOpenWareHouse(false);
  };

  const columns = [
    {
      name: 'Ảnh',
      selector: (row) => row.image,
      cell: (row) => <img src={row.image} alt={row.name} width="100px" height="100px" />,
    },
    {
      name: 'Tên',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Chủng loài',
      selector: (row) => row.Breed.name,
      sortable: true,
    },
    {
      name: 'Số lượng',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'Giá nhập',
      selector: (row) => row.import_price,
      sortable: true,
    },
    {
      name: 'Giá bán',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Nhập hàng',
      sbutton: true,
      cell: (row) => (
        <Button
          onClick={() => openModalWareHouse(row.id, row.name, row.amount, row.soldProductNum)}
          className={cx('btn')} blue>
          Nhập hàng
        </Button>
      ),
    }
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
        title="Danh sách sản phẩm"
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
              placeholder="Tìm kiếm sản phẩm"
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
          <h2>Thêm sản phẩm</h2>

          <div className={cx('header')}>Ảnh</div>
          <div className={cx('input-field')}>
            <div className={cx('upload-field')}>
              {avatar && <img src={image} className={cx('image')} alt="Ảnh" />}
              <label htmlFor="file-upload" className={cx('upload-btn')}>
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                <input id="file-upload" type="file" onChange={handleImgChange}></input>
              </label>
            </div>
          </div>

          <div className={cx('input-field')}>
            <div className={cx('header')}>Tên</div>
            <InputForm
              placeholder="Nhập tên..."
              type="text"
              value={payloadUpdate.name}
              setValue={setPayloadAddProduct}
              name={'name'}
              className={cx('input')}
              leftIcon={faShoePrints}
            />
          </div>

          <div className={cx('header')}>Chọn chủng loài</div>
          <div className={cx('input-field')}>
            <CustomSelect data={breeds} setId={setSelectedBreedId}></CustomSelect>
            {/* {errorMessages.category && <div className={cx('error-message')}>{errorMessages.category}</div>} */}
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Số lượng</div>
            <InputForm
              placeholder="Nhập số lượng..."
              type="text"
              value={payloadUpdate.amount}
              setValue={setPayloadAddProduct}
              name={'amount'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Giá nhập</div>
            <InputForm
              placeholder="Nhập giá nhập..."
              type="text"
              value={payloadUpdate.import_price}
              setValue={setPayloadAddProduct}
              name={'import_price'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Giá bán</div>
            <InputForm
              placeholder="Nhập giá bán..."
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
              Xác nhận
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
          <h2>Thông tin sản phẩm</h2>
            <div className={cx('header')}>Ảnh</div>
            <div className={cx('input-field')}>
              <div className={cx('upload-field')}>
                {avatar && <img src={image} className={cx('image')} alt="Ảnh" />}
                <label htmlFor="file-upload" className={cx('upload-btn')}>
                  <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                  <input id="file-upload" type="file" onChange={handleImgChange}></input>
                </label>
              </div>
              <Button onClick={() => handleUpdateImage(avatar)} outline>
                Thay đổi ảnh
              </Button>
            </div>

            <div className={cx('input-field')}>
            <div className={cx('header')}>Tên</div>
            <InputForm
              placeholder="Nhập tên..."
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
          <div className={cx('header')}>Số lượng</div>
            <InputForm
              placeholder="Nhập số lượng..."
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
          <div className={cx('header')}>Giá nhập</div>
            <InputForm
              placeholder="Nhập giá nhập..."
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
          <div className={cx('header')}>Giá bán</div>
            <InputForm
              placeholder="Nhập giá bán..."
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
              Thay đổi thông tin
            </Button>
            <Button onClick={() => handleDeleteProduct(productId)} primary>
              Xóa
            </Button>
          </div>
        </animated.div>
      </Popup>

      <Popup 
        isOpen={isModalOpenWareHouse}
         onRequestClose={() => closeModalWareHouse()} 
         width={'700px'} 
         height={'430px'}
      >
        <animated.div style={modalAnimationWareHouse}>
          <h2>Nhập hàng</h2>
            <div className={cx('input-field')}>
            <div className={cx('header')}>Tên sản phẩm: {payloadUpdate.name}</div>
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Số lượng còn: {payloadUpdate.amount}</div>
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Số lượng đã bán: {payloadUpdate.soldProductNum}</div>
          </div>

          <div className={cx('input-field')}>
          <div className={cx('header')}>Số lượng nhập thêm</div>
            <InputForm
              placeholder="Nhập số lượng..."
              type="text"
              value={payloadUpdate.quantity}
              setValue={setPayloadUpdate}
              name={'quantity'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
            {errorMessages.amount && <div className={cx('error-message')}>{errorMessages.amount}</div>}
          </div>

          <div className={cx('options')}>
            <Button
              onClick={() =>
                handleQuantityProduct(
                  Number(payloadUpdate.amount) + Number(payloadUpdate.quantity),
                )}
              blue
            >
              Thay đổi thông tin
            </Button>
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default ManageProducts;