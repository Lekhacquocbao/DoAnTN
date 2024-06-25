import classNames from 'classnames/bind';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { faCancel, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import GetToken from '~/Token/GetToken';
import Image from '~/components/Image';
import Button from '~/components/Button';
import Popup from '../Popup';
import styles from './Appointment.module.scss';

const cx = classNames.bind(styles);

function Appointment({ data, icon }) {
  const [appointmentDetail, setAppointmentDetail] = useState({});
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [formData, setFormData] = useState({
    note: data.note,
  });
  
  const [isModalOpenDetailPending, setIsModalOpenDetailPending] = useState(false);
  const modalAnimationDetail = useSpring({
    opacity: isModalOpenDetail ? 1 : 0,
  });
    const modalAnimationDetailPending = useSpring({
    opacity: isModalOpenDetailPending ? 1 : 0,
  });

  useEffect(() => {
    setFormData({
      note: data.note,
    });
  }, [data]);

  if (!data) {
    return null;
  }

  const openModalDetail = async (id) => {
    setIsModalOpenDetail(true);
    const response = await axios.get(`https://2hm-store.click/api/appointment/detail/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GetToken()}`,
      },
    });
    setAppointmentDetail(response.data.detailAppointment);
  };

  const closeModalDetail = () => {
    setIsModalOpenDetail(false);
  };

  const closeModalDetailPending = () => {
    setIsModalOpenDetailPending(false);
  };

  const handleChangeAppointmentAccept = async (id) => {
    await axios
      .put(
        `https://2hm-store.click/api/appointment/accept/${id}`,
        {},
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
        }, 2000);
      })
      .catch((e) => {
        toast.success(e);
      });
  };

  const handleChangeAppointmentCancel = async (id) => {
    await axios
      .put(
        `https://2hm-store.click/api/appointment/cancel/${id}`,
        {},
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
        }, 2000);
      })
      .catch((e) => {
        toast.success(e);
      });
  };

  const handleChangeAppointmentCompleted = async (id) => {
    await axios
      .put(
        `https://2hm-store.click/api/appointment/complete/${id}`,
        {},
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
        }, 2000);
      })
      .catch((e) => {
        toast.success(e);
      });
  };

  const openModalDetailPending = async (id) => {
    setIsModalOpenDetailPending(true);
    const response = await axios.get(`https://2hm-store.click/api/appointment/detail/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GetToken()}`,
      },
    });
    setAppointmentDetail(response.data.detailAppointment);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    await axios
      .put(`https://2hm-store.click/api/appointment/update/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`, // Điều chỉnh nếu cần
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        toast.error(e.response ? e.response.data.message : 'An error occurred');
      });
  };

  const orderDate = data.appointment_time;
  const orderEndTime = data.end_time;
  const formattedDate = moment(orderDate).format('YYYY-MM-DD HH:mm:ss');
  const formattedEndTime = moment(orderEndTime).format('YYYY-MM-DD HH:mm:ss');

  let iconComponent;
  let buttonComponent;
  if (data.id_status === 1) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={icon} spinPulse />;
    buttonComponent = (
      <div>
        <Button
          onClick={() => {
            openModalDetail(data.id);
          }}
          className={cx('btn')}
          blue
        >
          Chi tiết
        </Button>

        <Button onClick={() => handleChangeAppointmentAccept(data.id)} className={cx('btn')} blue>
          Chấp nhận
        </Button>

        <Button onClick={() =>  openModalDetailPending(data.id)} className={cx('btn')} blue>
          Cập nhật
        </Button>

        <Button onClick={() => handleChangeAppointmentCancel(data.id)} className={cx('btn')} outline>
          Cancel
        </Button>
      </div>
    );
  } else if (data.id_status === 6) {
    console.log('data', data);
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={icon} bounce />;
    buttonComponent = (
      <div>
        <Button
          onClick={() => {
            openModalDetail(data.id);
          }}
          className={cx('btn')}
          blue
        >
          Chi tiết
        </Button>

        <Button onClick={() => handleChangeAppointmentCompleted(data.id)} className={cx('btn')} blue>
          Hoàn thành
        </Button>
      </div>
    );
  } else if (data.id_status === 5) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={faCancel} beat />;
    buttonComponent = (
      <div>
        <Button
          onClick={() => {
            openModalDetail(data.id);
          }}
          className={cx('btn')}
          outline
        >
          Chi tiết
        </Button>
      </div>
    );
  } else if (data.id_status === 7) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle} beat />;
    buttonComponent = (
      <div>
        <Button
          onClick={() => {
            openModalDetail(data.id);
          }}
          className={cx('btn')}
          outline
        >
          Chi tiết
        </Button>
      </div>
    );
  }

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(number);
  }
  return (
    <div className={cx('order')}>
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
      <Image className={cx('order-image')} src={data.Account.inforUser.avatar} alt="avatar"></Image>
      {iconComponent}
      <div className={cx('name-order')}>{data.Account.inforUser.firstname + ' ' + data.Account.inforUser.lastname}</div>
      {/* <div className={cx('name-order')}>{data.note}</div> */}
      <div className={cx('day-order')}>{formattedEndTime}</div>
      <div className={cx('day-order')}>{formattedDate}</div>
      {/* <div className={cx('price-order')}>{data.totalPrice && formatCurrency(data.totalPrice)}</div> */}

      {buttonComponent}
      <Popup
        className={cx('modal-container')}
        isOpen={isModalOpenDetail}
        onRequestClose={() => closeModalDetail()}
        width={'700px'}
        height={'500px'}
      >
        <animated.div style={modalAnimationDetail}>
          <h2>Thông tin chi tiết</h2>
          <div className={cx('detail')}>
            <Image
              className={cx('detail-image')}
              src={appointmentDetail.Service ? appointmentDetail.Service.image : ''}
              alt="avatar"
            ></Image>
            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Tên:</label>
              <div className={cx('detail-value')}>
                {data.Account.inforUser.firstname + ' ' + data.Account.inforUser.lastname}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Dịch vụ:</label>
              <div className={cx('detail-value')}>
                {appointmentDetail.Service ? appointmentDetail.Service.name : ''}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Mô tả:</label>
              <div className={cx('detail-value')}>
                {appointmentDetail.Service ? appointmentDetail.Service.description : ''}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Ghi chú:</label>
              <div className={cx('detail-value')}>{data.note}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Thời gian bắt đầu:</label>
              <div className={cx('detail-value')}>{formattedDate}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Thời gian kết thúc:</label>
              <div className={cx('detail-value')}>{formattedEndTime}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Giá:</label>
              <div className={cx('detail-value')}>{data.totalPrice && formatCurrency(data.totalPrice)}</div>
            </div>
          </div>
        </animated.div>
      </Popup>

      <Popup
        className={cx('modal-container')}
        isOpen={isModalOpenDetailPending}
        onRequestClose={() => closeModalDetailPending()}
        width={'700px'}
        height={'500px'}
      >
        <animated.div style={modalAnimationDetailPending}>
          <h2>Thông tin chi tiết</h2>
          <div className={cx('detail')}>
            <Image
              className={cx('detail-image')}
              src={appointmentDetail.Service ? appointmentDetail.Service.image : ''}
              alt="avatar"
            ></Image>
            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Tên:</label>
              <div className={cx('detail-value')}>
                {data.Account.inforUser.firstname + ' ' + data.Account.inforUser.lastname}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Dịch vụ:</label>
              <div className={cx('detail-value')}>
                {appointmentDetail.Service ? appointmentDetail.Service.name : ''}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Mô tả:</label>
              <div className={cx('detail-value')}>
                {appointmentDetail.Service ? appointmentDetail.Service.description : ''}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Ghi chú:</label>
              <input className={cx('detail-input')} name="note" value={formData.note} onChange={handleInputChange} />
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Thời gian bắt đầu:</label>
              <div className={cx('detail-value')}>{formattedDate}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Thời gian kết thúc:</label>
              <div className={cx('detail-value')}>{formattedEndTime}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Giá:</label>
              <div className={cx('detail-value')}>{data.totalPrice && formatCurrency(data.totalPrice)}</div>
            </div>

            <Button onClick={() => handleUpdate(data.id)} className={cx('btn')} blue>
              Cập nhật
            </Button>
          </div>
          {/* ); */}
          {/* })} */}
        </animated.div>
      </Popup>
    </div>
  );
}

export default Appointment;
