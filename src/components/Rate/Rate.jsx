import classNames from 'classnames/bind';

import styles from './Rate.module.scss';
import Image from '~/components/Image';
import Star from '~/components/Star';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Rate({ data = [] }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('rate')}>
        <div className={cx('ava')}>
          <Image src={data.Account.inforUser.avatar} className={cx('img')}></Image>
        </div>
        <div className={cx('comment-field')}>
        <Link to={`/otherProfiles/${data.Account.id}`}>
          <span className={cx('name')}>{data.Account.inforUser.firstname + ' ' + data.Account.inforUser.lastname}</span>
        </Link>
          <div className={cx('star')}>
            <Star rating={data.star} />
          </div>
          <span className={cx('comment')}>{data.comment}</span>
        </div>
      </div>
    </div>
  );
}

export default Rate;
