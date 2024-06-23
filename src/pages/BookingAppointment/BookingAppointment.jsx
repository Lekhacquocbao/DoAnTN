import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Flip, ToastContainer, toast } from 'react-toastify';
import styles from './BookingAppointment.module.scss';
import Button from '~/components/Button';
import GetToken from '~/Token/GetToken';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

const cx = classNames.bind(styles);

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    id_service: '',
    appointmentTime: '',
    endTime: '',
    order_phoneNumber: '',
    note: '',
  });
  const [services, setServices] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://2hm-store.click/api/service');
        // console.log("res kaka", response);
        setServices(response.data.result);
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    };

    fetchServices();
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.id_service) {
      errors.id_service = 'Vui lòng chọn dịch vụ.';
      isValid = false;
    }
    if (!formData.appointmentTime) {
      errors.appointmentTime = 'Vui lòng chọn thời gian bắt đầu.';
      isValid = false;
    }
    if (!formData.endTime) {
      errors.endTime = 'Vui lòng chọn thời gian kết thúc.';
      isValid = false;
    }
    if (!formData.order_phoneNumber) {
      errors.order_phoneNumber = 'Vui lòng nhập số điện thoại.';
      isValid = false;
    }
    setErrorMessages(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('https://2hm-store.click/api/appointment/create', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      });
      toast.success(response.data.message);
      setStep(3);
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 2000);
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <>
            <label className={cx('form-label')}>Vui lòng chọn dịch vụ:</label>
            <div className={cx('form-group')}>
              <label htmlFor="service">Dịch vụ</label>
              <select id="service" name="id_service" value={formData.id_service} onChange={handleChange}>
                <option value="">Chọn dịch vụ</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errorMessages.id_service && <small className={cx('error')}>{errorMessages.id_service}</small>}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <label className={cx('form-label')}>Vui lòng chọn thời gian:</label>
            <div className={cx('form-group')}>
              <label htmlFor="appointmentTime">Thời gian bắt đầu</label>
              <input
                type="datetime-local"
                id="appointmentTime"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
              />
              {errorMessages.appointmentTime && <small className={cx('error')}>{errorMessages.appointmentTime}</small>}
            </div>
            <div className={cx('form-group')}>
              <label htmlFor="endTime">Thời gian kết thúc</label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
              {errorMessages.endTime && <small className={cx('error')}>{errorMessages.endTime}</small>}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <label className={cx('form-label')}>Vui lòng cung cấp thông tin chi tiết:</label>
            <div className={cx('form-group')}>
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <input
                type="text"
                id="phoneNumber"
                name="order_phoneNumber"
                value={formData.order_phoneNumber}
                onChange={handleChange}
              />
              {errorMessages.order_phoneNumber && (
                <small className={cx('error')}>{errorMessages.order_phoneNumber}</small>
              )}
            </div>
            <div className={cx('form-group')}>
              <label htmlFor="note">Ghi chú</label>
              <input type="text" id="note" name="note" value={formData.note} onChange={handleChange} />
            </div>
          </>
        );
      case 3:
        return <p>Thank you! Your appointment is confirmed.</p>;
      default:
        return null;
    }
  };

  return (
    <div className={cx('page-container')}>
      <div className={cx('slider')}>
        <Slider {...settings}>
          <img
            className={cx('slide')}
            alt="slide2"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-2.jpg"
          ></img>
          <img
            className={cx('slide')}
            alt="slide3"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-3.jpg"
          ></img>
          <img
            className={cx('slide')}
            alt="slide4"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-4.jpg"
          ></img>
          <img
            className={cx('slide')}
            alt="slide5"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-5.jpg"
          ></img>
          <img
            className={cx('slide')}
            alt="slide5"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-6.jpg"
          ></img>
          <img
            className={cx('slide')}
            alt="slide5"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-8.jpg"
          ></img>
        </Slider>
      </div>

      <div className={cx('main-content')}>
        <div className={cx('appointment-container')}>
          <ToastContainer
            position="top-right"
            autoClose={4000}
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
            <img className={cx('advertisement-left')} src="https://i.pinimg.com/564x/1e/ce/71/1ece71fa61d85dbd7d42dd8e3882f933.jpg" alt="Left Banner" />
          <div className={cx('form-container')}>
            <div className={cx('appointment-form')}>
              <h1>Đặt lịch hẹn</h1>
              <div className={cx('progress-bar')}>
                <div className={cx('progress-step', { active: step >= 0 })}>Dịch vụ</div>
                <div className={cx('progress-line', { active: step >= 1 })}></div>
                <div className={cx('progress-step', { active: step >= 1 })}>Thời gian</div>
                <div className={cx('progress-line', { active: step >= 2 })}></div>
                <div className={cx('progress-step', { active: step >= 2 })}>Chi tiết</div>
                <div className={cx('progress-line', { active: step >= 3 })}></div>
                <div className={cx('progress-step', { active: step >= 3 })}>Hoàn thành</div>
              </div>
              <form onSubmit={handleSubmit}>
                {renderForm()}
                {step < 3 && (
                  <p className={cx('privacy-policy')}>By submitting this form you are agreeing to our Privacy Policy</p>
                )}
                <div className={cx('form-actions')}>
                  {step > 0 && (
                    <Button type="button" className={cx('btn', 'previous')} onClick={prevStep}>
                      Quay lại
                    </Button>
                  )}
                  {step < 2 && (
                    <Button type="button" className={cx('btn', 'next')} onClick={nextStep}>
                      Tiếp theo
                    </Button>
                  )}
                  {step === 2 && (
                    <Button type="submit" className={cx('btn', 'next')}>
                      Hoàn thành
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
            <img className={cx('advertisement-right')} src="https://i.pinimg.com/564x/1e/ce/71/1ece71fa61d85dbd7d42dd8e3882f933.jpg" alt="Right Banner" />
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
