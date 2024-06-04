import React, { useState } from 'react';
import styles from './BookingAppointment.module.scss';
import classNames from 'classnames/bind';
import ProgressBar from './ProgressBar';

const cx = classNames.bind(styles);

const BookingAppointment = () => {
    const [treatment, setTreatment] = useState('');
    const [doctor, setDoctor] = useState('Ahmad Dimas, Sp.BM, M.Kes');
    const [currentStep, setCurrentStep] = useState(1);

    const handleTreatmentChange = (e) => {
        setTreatment(e.target.value);
    };

    const handleDoctorChange = (e) => {
        setDoctor(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic
        console.log(`Treatment: ${treatment}, Doctor: ${doctor}`);
        // Move to next step if not the last step
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className={cx('container')}>
            <ProgressBar currentStep={currentStep} />
            <div className={cx('card')}>
                <div className={cx('card-body')}>
                    <h2 className={cx('card-title')}>Book Appointment</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('form-group')}>
                            <label htmlFor="treatment">Please select service:</label>
                            <select
                                id="treatment"
                                className={cx('form-control')}
                                value={treatment}
                                onChange={handleTreatmentChange}
                            >
                                <option value="">Select treatment</option>
                                <option value="Treatment1">Treatment 1</option>
                                <option value="Treatment2">Treatment 2</option>
                                <option value="Treatment3">Treatment 3</option>
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="doctor">Doctor:</label>
                            <select
                                id="doctor"
                                className={cx('form-control')}
                                value={doctor}
                                onChange={handleDoctorChange}
                            >
                                <option value="Ahmad Dimas, Sp.BM, M.Kes">Ahmad Dimas, Sp.BM, M.Kes</option>
                                {/* Add more doctors here if needed */}
                            </select>
                        </div>
                        <div className={cx('buttons')}>
                            <button
                                type="button"
                                className={cx('btn', 'secondary')}
                                onClick={handlePrevious}
                                disabled={currentStep === 1}
                            >
                                Previous
                            </button>
                            <button type="submit" className={cx('btn', 'primary')}>
                                {currentStep === 4 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingAppointment;
