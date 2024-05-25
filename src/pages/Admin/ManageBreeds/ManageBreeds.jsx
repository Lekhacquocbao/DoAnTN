import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { faAudioDescription, faShoePrints, faEdit, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '~/components/Button/Button';
import InputForm from '~/components/InputForm/InputForm';
import Popup from '~/components/Popup/Popup';
import GetToken from '~/Token/GetToken';
import styles from './ManageBreeds.module.scss';

const cx = classNames.bind(styles);

function ManageBreeds() {
  const [breeds, setBreeds] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [image, setImage] = useState([]);
  const [breedId, setBreedId] = useState();
  const [search, setSearch] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [payloadUpdate, setPayloadUpdate] = useState({
    name: '',
    description: ''
  });

  const [payloadAddBreed, setPayloadAddBreed] = useState({
    name: '',
    description: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    name: null,
    description: null,
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!payloadUpdate.name.trim()) {
      errors.name = 'Please enter breed name';
      isValid = false;
    }

    if (!payloadUpdate.description.trim()) {
      errors.description = 'Please enter a description';
      isValid = false;
    }

    setErrorMessages(errors);

    return isValid;
  };

  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const getbreed = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/breed?limit=10000');
      setBreeds(response.data.breeds);
      setFilteredBreeds(response.data.breeds);
      // console.log("respone 1 ne",response);
      // console.log("hehe", response.data.breeds)
    } catch (e) {
      console.log(e);
    }
  };
  const fetchApiDetailbreed = async (id) => {
    try {
      setIsModalOpenUpdate(true);
      const response = await axios.get(`http://localhost:8000/api/breed/${id}`);

      const breed = response.data.breedDetail;
      // console.log('respone detail breed ne', response);
      // console.log('breed nè hehe', breed);
      setPayloadUpdate((prevPayload) => ({
        ...prevPayload,
        name: breed.name,
        description: breed.description,
        image: breed.image,
      }));
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleAddbreed = async (image, name, description) => {
    await axios
      .post(
        'http://localhost:8000/api/breed/add',
        {
          image: image,
          name: name,
          description: description,
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

  const handleUpdatebreed = async (name, description) => {
    if (!validateForm()) {
      return;
    } else {
      await axios
        .put(
          `http://localhost:8000/api/breed/updateInfor/${breedId}`,
          {
            name: name,
            description: description,
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

  const handleUpdateImage = async(image) =>{
    if (!validateForm()) {
      return;
    } else {
      const updateRoiNha = await axios
      .put(
        `http://localhost:8000/api/breed/updateImage/${breedId}`,
        {
          image: image
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
        console.log("sai nha")
      });
      console.log("update roi nha", updateRoiNha)
  };
  }

  const handleDeletebreed = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/breed/delete/${id}`, {
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
    getbreed();
  }, []);

  useEffect(() => {
    if (!breeds || !Array.isArray(breeds)) {
      console.log('sai rồi');
    }

    const result = breeds.filter((breed) => {
      return breed.name && breed.name.toLowerCase().match(search.toLowerCase());
    });

    setFilteredBreeds(result);
  }, [search, breeds]);

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

  // const ImageWithChangeIcon = ({ row }) => {
  //   return (
  //     <div className={cx('image-container')}>
  //       <img 
  //         src={row.image}
  //         alt={row.name} 
  //         // width="80px" 
  //         // height="100px" 
  //       />
  //       <div className={cx('change-icon')}>
  //         <input className={cx('input-change-image')} onChange={handleImgChange} type='file'></input>
  //       </div>
          
  //     </div>
  //   );
  // };

  const columns = [
    {
      name: 'Avatar',
      selector: (row) => row.image,
      cell: (row) => <img src={row.image} alt={row.name} width="100px" height="100px" />,
    },
    {
      name: 'Breed name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
  ];

  const handleRowClick = (row) => {
    const BreedId = row.id;
    fetchApiDetailbreed(BreedId);
    setBreedId(BreedId);
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
        autoClose={3000}
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
        title="Breeds list"
        columns={columns}
        data={filteredBreeds}
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
              Add Breed
            </Button>
            <input
              type="text"
              placeholder="Search for breeds here"
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
          <h2>Breed information</h2>
          <div className={cx('input-field')}>
          <div className={cx('header')}>Image of breed</div>
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
            <div className={cx('header')}>Breed name</div>
            <InputForm
              placeholder="Enter name breed..."
              type="text"
              value={payloadUpdate.name}
              setValue={setPayloadUpdate}
              name={'name'}
              className={cx('input')}
              leftIcon={faShoePrints}
            />
            {errorMessages.name && <div className={cx('error-message')}>{errorMessages.name}</div>}
          </div>

          <div className={cx('header')}>Description</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder="Enter breed description..."
              type="text"
              value={payloadUpdate.description}
              setValue={setPayloadUpdate}
              name={'description'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
            {errorMessages.description && <div className={cx('error-message')}>{errorMessages.description}</div>}
          </div>

          <div className={cx('options')}>
            <Button onClick={() => handleUpdatebreed(payloadUpdate.name, payloadUpdate.description)} outline>
              Change information
            </Button>
            <Button onClick={() => handleDeletebreed(breedId)} primary>
              Delete
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
          <h2>Add Breed</h2>

          <div className={cx('header')}>Image of breed</div>
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
            <div className={cx('header')}>Breed name</div>
            <InputForm
              placeholder="Enter name breeds..."
              type="text"
              value={payloadUpdate.name}
              setValue={setPayloadAddBreed}
              name={'name'}
              className={cx('input')}
              leftIcon={faShoePrints}
            />
          </div>

          <div className={cx('header')}>Description</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder="Enter breed description..."
              type="text"
              value={payloadUpdate.description}
              setValue={setPayloadAddBreed}
              name={'description'}
              className={cx('input')}
              leftIcon={faAudioDescription}
            />
          </div>

          <div className={cx('options')}>
            <Button onClick={() => handleAddbreed(avatar, payloadAddBreed.name, payloadAddBreed.description)} outline>
              Confirm
            </Button>
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default ManageBreeds;
