import classNames from 'classnames/bind';
import React from 'react';
import styles from './Introduce.module.scss';

const cx = classNames.bind(styles);

function Introduce() {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('title')}>Hello </h3>
      <div>
        Đề tài nhằm giải quyết những vấn đề, thách thức trong việc quản lý kinh doanh thú cưng cũng như việc hỗ trợ
        người dùng có thể nhận diện được các giống loài của thú cưng. Hệ thống bao gồm hai vai trò: khách hàng và người
        quản lý. Đối với khách hàng, họ có thể xem các sản phẩm có sẵn tại cửa hàng, đồng thời thực hiện những chức năng
        cơ bản như thêm sản phẩm vào giỏ hàng và đặt hàng. Ngoài ra, người dùng còn có thể đặt dịch vụ chăm sóc cho thú
        cưng của họ với những dịch vụ có sẵn tại cửa hàng như cắt móng, cắt lông và tắm rửa cho thú cưng. Khách hàng có
        thể thực hiện thanh toán tại cửa hàng hoặc có thể lựa chọn thanh toán online thông qua nền tảng thanh toán của
        ZaloPay- được liên kết với rất nhiều ngân hàng trên khắp cả nước. Việc tích hợp thanh toán online sẽ giúp người
        dùng có thể tiết kiệm thời gian cũng như công sức khi sử dụng các dịch vụ của cửa hàng. Để đảm bảo tính xác
        thực, sau khi thanh toán online, khách hàng luôn có thể kiểm tra các dịch vụ thanh toán đã thực hiện thông qua
        trang web. Ngoài những chức năng cơ bản của một trang web kinh doanh thú cưng, tại hệ thống này, người dùng còn
        có thể nhận diện giống loài của thú cưng mà họ quan tâm chỉ thông qua một tấm hình. Với mô hình đã được huấn
        luyện được tích hợp vào trang web, khách hàng có thể dễ dàng nhận được thông tin về giống loài trong tấm ảnh
        theo đó là những thú cưng có cùng giống loài hiện đang có sẵn tại cửa hàng để khách hàng có thể dễ dàng lựa chọn
        và mua sắm một cách nhanh chóng. Đối với Người quản lý, họ có thể quản lý tất cả các người dùng hiện đã tạo tài
        khoản trong hệ thống của họ. Người quản lý có thể quản lý những thông tin cơ bản của khách hàng như họ tên, địa
        chỉ và số điện thoại. Và tất nhiên, thông qua hệ thống thì Người quản lý cũng có thể quản lý được tất cả các sản
        phẩm hiện đang có sẵn tại cửa hàng, cũng như chỉnh sửa và thêm sản phẩm mới. Về các dịch vụ, Người quản lý cũng
        có thể kiểm tra được danh sách tất cả các dịch vụ hiện đang có sẵn, đồng thời, có thể thêm và chỉnh sửa thông
        tin của các dịch vụ đó. Và với việc tích hợp thanh toán online, Người quản lý cũng có thể quản lý thông tin tất
        cả các giao dịch đã thực hiện thông qua ZaloPay để đảm bảo tính xác thực cũng như để có thể đối chiếu sau này.
        Và chức năng quan trọng nhất chính là quản lý tất cả các đơn hàng tại hệ thống. Người quản lý có thể quản lý tất
        cả các đơn hàng đã được đặt bởi người dùng (đơn hàng mua sắm thú cưng và đơn hàng dịch vụ). Sau khi hoàn thành
        đơn hàng, Người quản lý sẽ là người cập nhật về thời gian hoàn thành đơn hàng cũng như thông tin thanh toán
        thông qua hệ thống. Với những chức năng như trên, hệ thống có thể giúp Người quản lý có thể dễ dàng theo dõi và
        kiểm soát tiến trình của đơn hàng cũng như các sản phẩm, dịch vụ của cửa hàng. Về tổng quan, dự án này hướng đến
        mục tiêu cải thiện trải nghiệm của khách hàng khi mua sắm và sử dụng dịch vụ thú cưng, đồng thời tăng cường tính
        hiệu quả và quản lý kinh doanh của cửa hàng. Với sự kết hợp giữa công nghệ AI và các tính năng quản lý kinh
        doanh, hệ thống kinh doanh thú cưng này có tiềm năng trở thành một giải pháp hiệu quả cho các chủ cửa hàng và
        khách hàng trong lĩnh vực thú cưng.
      </div>
    </div>
  );
}

export default Introduce;
