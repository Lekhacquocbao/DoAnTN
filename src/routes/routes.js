import config from '~/config';

// Layouts
import { HeaderOnly, Admin } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import DetailItem from '~/pages/DetailItem';
import AllProduct from '~/pages/AllProduct';
import Information from '~/pages/Information';
import ItemHistory from '~/pages/ItemHistory';
import Cart from '~/pages/Cart';
import Introduce from '~/pages/Introduce';
import Checkout from '~/pages/Checkout/Checkout';
import AdminPending from '~/pages/Admin/AdminPending';
import MenuAppointment from '~/pages/Admin/MenuAppointment';
import AppointmentPending from '~/pages/Admin/AppointmentPending';
import AppointmentAccepted from '~/pages/Admin/AppointmentAccepted';
import AppointmentCanceled from '~/pages/Admin/AppointmentCanceled';
import AppointmentCompleted from '~/pages/Admin/AppointmentCompleted';
import AdminDelivering from '~/pages/Admin/AdminDelivering';
import AdminWaiting from '~/pages/Admin/AdminWaiting';
import AdminSuccess from '~/pages/Admin/AdminSuccess';
import ManageBrand from '~/pages/Admin/ManageBrand';
import ManageBreeds from '~/pages/Admin/ManageBreeds';
import ManageProducts from '~/pages/Admin/ManageProducts';
import ManageServices from '~/pages/Admin/ManageServices';
import BlogPost from '~/pages/Admin/BlogPost';
import Revenue from '~/pages/Admin/Revenue';
import Contact from '~/pages/Contact';
import HistoryOrderPending from '~/pages/HistoryOA/HistoryOrderPending';
import HistoryOrderDelivering from '~/pages/HistoryOA/HistoryOrderDelivering';
import HistoryOrderWaiting from '~/pages/HistoryOA/HistoryOrderWaiting';
import HistoryOrderSuccess from '~/pages/HistoryOA/HistoryOrderSuccess';
import HistoryOrderCanceled from '~/pages/HistoryOA/HistoryOrderCanceled';
import HistoryAppointmentCanceled from '~/pages/HistoryOA/HistoryAppointmentCanceled';
import HistoryAppointmentAccepted from '~/pages/HistoryOA/HistoryAppointmentAccepted';
import HistoryAppointmentPending from '~/pages/HistoryOA/HistoryAppointmentPending';
import HistoryAppointmentFinished from '~/pages/HistoryOA/HistoryAppointmentFinished';
import BookingAppointment from '~/pages/BookingAppointment';
import BlogAdd from '~/pages/Admin/BlogAdd';
import Blog from '~/pages/Blog';

const publicRoutes = [
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.home, component: Home },
  { path: config.routes.detailItem, component: DetailItem },
  { path: config.routes.allProducts, component: AllProduct },
  { path: config.routes.information, component: Information, layout: HeaderOnly },
  { path: config.routes.historyDetails, component: ItemHistory, layout: HeaderOnly },
  { path: config.routes.cart, component: Cart, layout: HeaderOnly },
  { path: config.routes.checkout, component: Checkout, layout: HeaderOnly },
  { path: config.routes.introduce, component: Introduce, layout: HeaderOnly},
  { path: config.routes.contact, component: Contact, layout: HeaderOnly},
  { path: config.routes.blog, component: Blog, layout: HeaderOnly},
  { path: config.routes.historyOrderPending, component: HistoryOrderPending, layout: HeaderOnly },
  { path: config.routes.historyOrderWaiting, component: HistoryOrderWaiting, layout: HeaderOnly },
  { path: config.routes.historyOrderDelivering, component: HistoryOrderDelivering, layout: HeaderOnly },
  { path: config.routes.historyOrderSuccess, component: HistoryOrderSuccess, layout: HeaderOnly },
  { path: config.routes.historyOrderCanceled, component: HistoryOrderCanceled, layout: HeaderOnly },
  { path: config.routes.historyAppointmentPending, component: HistoryAppointmentPending, layout: HeaderOnly},
  { path: config.routes.historyAppointmentAccepted, component: HistoryAppointmentAccepted, layout: HeaderOnly },
  { path: config.routes.historyAppointmentCanceled, component: HistoryAppointmentCanceled, layout: HeaderOnly },
  { path: config.routes.historyAppointmentFinished, component: HistoryAppointmentFinished, layout: HeaderOnly },
  { path: config.routes.bookingAppointment, component: BookingAppointment, layout: HeaderOnly },
];

const adminRoutes = [
  { path: config.routes.adminPending, component: AdminPending, layout: Admin },
  { path: config.routes.adminWaiting, component: AdminWaiting, layout: Admin },
  { path: config.routes.adminDelivering, component: AdminDelivering, layout: Admin },
  { path: config.routes.adminSuccess, component: AdminSuccess, layout: Admin },
  { path: config.routes.appointment, component: MenuAppointment, layout: Admin },
  { path: config.routes.appointmentPending, component: AppointmentPending, layout: Admin },
  { path: config.routes.appointmentAccepted, component: AppointmentAccepted, layout: Admin },
  { path: config.routes.appointmentCanceled, component: AppointmentCanceled, layout: Admin },
  { path: config.routes.appointmentCompleted, component: AppointmentCompleted, layout: Admin },
  { path: config.routes.manageBrand, component: ManageBrand, layout: Admin },
  { path: config.routes.manageBreeds, component: ManageBreeds, layout: Admin },
  { path: config.routes.manageProducts, component: ManageProducts, layout: Admin },
  { path: config.routes.manageServices, component: ManageServices, layout: Admin },
  { path: config.routes.blog, component: BlogPost, layout: Admin },
  { path: config.routes.blogAdd, component: BlogAdd, layout: Admin },
  { path: config.routes.revenue, component: Revenue, layout: Admin },
];

export { publicRoutes, adminRoutes };
