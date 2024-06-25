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
import styles from './ManageServices.module.scss';

const cx = classNames.bind(styles);

function ManageServices() {
  const [services, setServices] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [image, setImage] = useState([]);
  const [serviceId, setServiceId] = useState();
  const [search, setSearch] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [payloadUpdate, setPayloadUpdate] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [payloadAddService, setpayloadAddService] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    name: null,
    description: null,
    price: null,
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!payloadUpdate.name.trim()) {
      errors.name = 'Please enter service name';
      isValid = false;
    }
    if (!payloadUpdate.description.trim()) {
      errors.description = 'Please enter a description';
      isValid = false;
    }
    if (!payloadUpdate.price.toString().trim()) {
      errors.price = 'Please enter a price';
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const getService = async () => {
    try {
      const response = await axios.get('https://2hm-store.click/api/service?limit=10000');
      setServices(response.data.result);
      setFilteredServices(response.data.result);
      // console.log("respone 1 ne",response);
      // console.log("hehe", response.data.breeds)
    } catch (e) {
      console.log(e);
    }
  };
  const fetchApiDetailService = async (id) => {
    try {
      setIsModalOpenUpdate(true);
      const response = await axios.get(`https://2hm-store.click/api/service/${id}`);
      const service = response.data.result;
      // console.log('respone detail breed ne', response);
      // console.log('breed nè hehe', service);n 
      setPayloadUpdate((prevPayload) => ({
        ...prevPayload,
        name: service.name,
        description: service.description,
        // image: service.image,
        price: service.price,
      }));
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleAddService = async (image, name, description, price) => {
    await axios
      .post(
        'https://2hm-store.click/api/service/add',
        {
          image: image,
          name: name,
          description: description,
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

  const handleUpdateService = async (name, description, price) => {
    if (!validateForm()) {
      return;
    } else {
      await axios
        .put(
          `https://2hm-store.click/api/service/updateInfor/${serviceId}`,
          {
            name: name,
            description: description,
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

  const handleUpdateImage = async (image) => {
    if (!validateForm()) {
      return;
    } else {
      await axios
        .put(
          `https://2hm-store.click/api/service/updateImage/${serviceId}`,
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

  const handleDeleteService = async (id) => {
    await axios
      .delete(`https://2hm-store.click/api/service/delete/${id}`, {
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
    getService();
  }, []);

  useEffect(() => {
    if (!services || !Array.isArray(services)) {
      console.log('Error!');
    }

    const result = services.filter((service) => {
      return service.name && service.name.toLowerCase().match(search.toLowerCase());
    });

    setFilteredServices(result);
  }, [search, services]);

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
      name: 'Service name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description.slice(0, 100),
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
  ];

  const handleRowClick = (row) => {
    const serviceId = row.id;
    fetchApiDetailService(serviceId);
    setServiceId(serviceId);
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
        title="Danh sách dịch vụ"
        columns={columns}
        data={filteredServices}
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
              Thêm dịch vụ
            </Button>
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ"
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

      <Popup isOpen={isModalOpenUpdate} onRequestClose={() => closeModalUpdate()} width={'700px'} height={'700px'}>
        <animated.div style={modalAnimationUpdate}>
          <h2>Thông tin dịch vụ</h2>
          <div className={cx('input-field')}>
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
            <div className={cx('header')}>Tên dịch vụ</div>
            <InputForm
              placeholder="Nhập tên dịch vụ..."
              type="text"
              value={payloadUpdate.name}
              setValue={setPayloadUpdate}
              name={'name'}
              className={cx('input')}
              leftIcon={faShoePrints}
            />
            {errorMessages.name && <div className={cx('error-message')}>{errorMessages.name}</div>}
          </div>

          <div className={cx('header')}>Mô tả</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder="Nhập mô tả..."
              type="text"
              value={payloadUpdate.description}
              setValue={setPayloadUpdate}
              name={'description'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
            {errorMessages.description && <div className={cx('error-message')}>{errorMessages.description}</div>}
          </div>

          <div className={cx('header')}>Giá</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder="Nhập giá dịch vụ..."
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
              onClick={() => handleUpdateService(payloadUpdate.name, payloadUpdate.description, payloadUpdate.price)}
              outline
            >
              Thay đổi thông tin
            </Button>
            <Button onClick={() => handleDeleteService(serviceId)} primary>
              Xóa
            </Button>
          </div>
        </animated.div>
      </Popup>

      <Popup
        isOpen={isModalOpenAdd}
        onRequestClose={() => closeModalAdd()}
        width={'700px'}
        height={'700px'}
        className={cx('popup')}
      >
        <animated.div style={modalAnimationAdd}>
          <h2>Thêm dịch vụ</h2>

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
            <div className={cx('header')}>Tên dịch vụ</div>
            <InputForm
              placeholder="Nhập tên dịch vụ..."
              type="text"
              value={payloadUpdate.name}
              setValue={setpayloadAddService}
              name={'name'}
              className={cx('input')}
              leftIcon={faShoePrints}
            />
          </div>

          <div className={cx('header')}>Mô tả</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder="Nhập mô tả..."
              type="text"
              value={payloadUpdate.description}
              setValue={setpayloadAddService}
              name={'description'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
          </div>

          <div className={cx('header')}>Giá dịch vụ</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder="Nhập giá dịch vụ..."
              type="text"
              value={payloadUpdate.price}
              setValue={setpayloadAddService}
              name={'price'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
          </div>

          <div className={cx('options')}>
            <Button
              onClick={() =>
                handleAddService(avatar, payloadAddService.name, payloadAddService.description, payloadAddService.price)
              }
              outline
            >
              Xác nhận
            </Button>
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default ManageServices;
