import classNames from 'classnames/bind';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
// import moment from 'moment';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { faCancel, faCheck, faCheckCircle, faBook } from '@fortawesome/free-solid-svg-icons';
import GetToken from '~/Token/GetToken';
import Image from '~/components/Image';
import Button from '~/components/Button';
import Popup from '../Popup';
import styles from './HistoryAppointment.module.scss';
import InputForm from '~/components/InputForm/InputForm';
import Star from '~/components/Star';

const cx = classNames.bind(styles);

function HistoryAppointment({ data, icon }) {
  const [appointmentDetail, setAppointmentDetail] = useState({});
  const [isModalOpenDetailPending, setIsModalOpenDetailPending] = useState(false);
  const [isModalOpenDetailCompleted, setIsModalOpenDetailCompleted] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [isModalOpenRating, setIsModalOpenRating] = useState(false);
  const [idService, setIDService] = useState();
  const [idAppointment, setIDAppointment] = useState();
  const [rating, setRating] = useState(5);
  const [payload, setPayload] = useState({
    comment: '',
  });

  const [formData, setFormData] = useState({
    note: data.note,
    appointment_time: data.appointment_time,
    end_time: data.end_time,
  });
  const modalAnimationDetailPending = useSpring({
    opacity: isModalOpenDetailPending ? 1 : 0,
  });
  const modalAnimationDetailCompleted = useSpring({
    opacity: isModalOpenDetailCompleted ? 1 : 0,
  });
  const modalAnimationDetail = useSpring({
    opacity: isModalOpenDetail ? 1 : 0,
  });

  const closeModalRating = () => {
    setIsModalOpenRating(false);
  };

  const modalAnimationRating = useSpring({
    opacity: isModalOpenRating ? 1 : 0,
  });

  useEffect(() => {
    setFormData({
      note: data.note,
      appointment_time: data.appointment_time,
      end_time: data.end_time,
    });
  }, [data]);

  if (!data) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const orderStartTime = data.appointment_time;
  const orderEndTime = data.end_time;
  const formattedStartTime = moment(orderStartTime).tz('Asia/Ho_Chi_Minh').subtract(7, 'hours').format('YYYY-MM-DD HH:mm:ss');
  const formattedEndTime = moment(orderEndTime).tz('Asia/Ho_Chi_Minh').subtract(7, 'hours').format('YYYY-MM-DD HH:mm:ss');

  const handleRating = async (id_service, id_appointment, star, comment) => {
    await axios
      .post(
        `https://2hm-store.click/api/rating/add`,
        {
          id_service: id_service,
          id_appointment: id_appointment,
          comment: comment,
          star: star,
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
        }, 2000);
      })
      .catch((err) => {
        toast.error(err);
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

  const openModalDetailCompleted = async (id) => {
    setIsModalOpenDetailCompleted(true);
    const response = await axios.get(`https://2hm-store.click/api/appointment/detail/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GetToken()}`,
      },
    });
    setAppointmentDetail(response.data.detailAppointment);
  };

  const closeModalDetailPending = () => {
    setIsModalOpenDetailPending(false);
  };

  const closeModalDetailCompleted = () => {
    setIsModalOpenDetailCompleted(false);
  };

  const closeModalDetail = () => {
    setIsModalOpenDetail(false);
  };

  const openModalRating = () => {
    setIsModalOpenRating(true);
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

  let iconComponent;
  let buttonComponent;
  if (data.id_status === 1) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={icon} spinPulse />;
    buttonComponent = (
      <div>
        <Button
          onClick={() => {
            openModalDetailPending(data.id);
          }}
          className={cx('btn')}
          blue
        >
          Chi tiết
        </Button>

        <Button onClick={() => handleChangeAppointmentCancel(data.id)} className={cx('btn')} outline>
          Hủy
        </Button>
      </div>
    );
  } else if (data.id_status === 6) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={faCheck} beat />;
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
          blue
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
            openModalDetailCompleted(data.id);
          }}
          className={cx('btn')}
          blue
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
      {iconComponent}
      <div className={cx('name-order')}>{data.note}</div>
      <div className={cx('day-order')}>{formattedStartTime}</div>
      <div className={cx('day-order')}>{formattedEndTime}</div>
      <div className={cx('price-order')}>{data.totalPrice && formatCurrency(data.totalPrice)}</div>
      {buttonComponent}
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
              <label className={cx('detail-label')}>Description:</label>
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
              <div className={cx('detail-value')}>{formattedStartTime}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Cập nhật thời gian:</label>
              <input
                className={cx('detail-value-input')}
                name="appointmentTime"
                type="datetime-local"
                onChange={handleInputChange}
              />
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Thời gian kết thúc:</label>
              <div className={cx('detail-value')}>{formattedEndTime}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Cập nhật thời gian:</label>
              <input
                className={cx('detail-value-input')}
                name="endTime"
                type="datetime-local"
                onChange={handleInputChange}
              />
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Giá:</label>
              <div className={cx('detail-value')}>{data.totalPrice && formatCurrency(data.totalPrice)}</div>
            </div>

            <Button onClick={() => handleUpdate(data.id)} className={cx('btn')} blue>
              Cập nhật
            </Button>
          </div>
        </animated.div>
      </Popup>

      <Popup
        className={cx('modal-container')}
        isOpen={isModalOpenDetailCompleted}
        onRequestClose={() => closeModalDetailCompleted()}
        width={'700px'}
        height={'500px'}
      >
        <animated.div style={modalAnimationDetailCompleted}>
          <h2>Thông tin chi tiết</h2>
          <div className={cx('detail')}>
            <Image
              className={cx('detail-image')}
              src={appointmentDetail.Service ? appointmentDetail.Service.image : ''}
              alt="avatar"
            ></Image>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Name:</label>
              <div className={cx('detail-value')}>
                {data.Account.inforUser.firstname + ' ' + data.Account.inforUser.lastname}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Service:</label>
              <div className={cx('detail-value')}>
                {appointmentDetail.Service ? appointmentDetail.Service.name : ''}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Description:</label>
              <div className={cx('detail-value')}>
                {appointmentDetail.Service ? appointmentDetail.Service.description : ''}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Note:</label>
              <div className={cx('detail-value')}>{data.note}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Start Time:</label>
              <div className={cx('detail-value')}>{formattedStartTime}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>End Time:</label>
              <div className={cx('detail-value')}>{formattedEndTime}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Price:</label>
              <div className={cx('detail-value')}>{data.totalPrice && formatCurrency(data.totalPrice)}</div>
            </div>

            {!data.isRate ? (
              <Button
                onClick={() => {
                  openModalRating();
                  setIDService(data.id_service);
                  setIDAppointment(data.id_appointment);
                }}
                blue
                className={cx('btn')}
              >
                Rating
              </Button>
            ) : (
              <Button disabled blue className={cx('btn')}>
                Have evaluated
              </Button>
            )}
          </div>
        </animated.div>
      </Popup>

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
              <label className={cx('detail-label')}>Name:</label>
              <div className={cx('detail-value')}>
                {data.Account.inforUser.firstname + ' ' + data.Account.inforUser.lastname}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Service:</label>
              <div className={cx('detail-value')}>
                {appointmentDetail.Service ? appointmentDetail.Service.name : ''}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Description:</label>
              <div className={cx('detail-value')}>
                {appointmentDetail.Service ? appointmentDetail.Service.description : ''}
              </div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Note:</label>
              <div className={cx('detail-value')}>{data.note}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Start Time:</label>
              <div className={cx('detail-value')}>{formattedStartTime}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>End Time:</label>
              <div className={cx('detail-value')}>{formattedEndTime}</div>
            </div>

            <div className={cx('detail-item')}>
              <label className={cx('detail-label')}>Price:</label>
              <div className={cx('detail-value')}>{data.totalPrice && formatCurrency(data.totalPrice)}</div>
            </div>
          </div>
        </animated.div>
      </Popup>

      <Popup isOpen={isModalOpenRating} onRequestClose={() => closeModalRating()} width={'700px'} height={'400px'}>
        <animated.div style={modalAnimationRating}>
          <h2>Rating</h2>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Stars</div>
            <div className={cx('star')}>
              <Star rating={rating} setRating={setRating} isUpdate={true}></Star>
            </div>
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Bình luận</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.comment}
              setValue={setPayload}
              name={'comment'}
              className={cx('input')}
              leftIcon={faBook}
            />
          </div>

          <div className={cx('options1')}>
            <Button onClick={() => handleRating(idService, idAppointment, rating, payload.comment)} primary>
              Xác nhận
            </Button>
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default HistoryAppointment;
