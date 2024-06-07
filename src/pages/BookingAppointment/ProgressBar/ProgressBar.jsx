import React from 'react';
import styles from './ProgressBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const steps = ["Service", "Time", "Details", "Done"];

const ProgressBar = ({ currentStep }) => {
    return (
        <div className={cx('progress-bar')}>
            {steps.map((step, index) => (
                <div key={index} className={cx('step', { active: index + 1 <= currentStep })}>
                    <div className={cx('bullet')}></div>
                    <div className={cx('label')}>{step}</div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
