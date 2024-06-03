import config from '~/config';

// Layouts
import { HeaderOnly, Admin } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import DetailItem from '~/pages/DetailItem';
import AllProduct from '~/pages/AllProduct';
import Information from '~/pages/Information';
import AppointmentHistory from '~/pages/AppointmentHistory';
import ItemHistory from '~/pages/ItemHistory';
import Cart from '~/pages/Cart';
import Introduce from '~/pages/Introduce';
import Checkout from '~/pages/Checkout/Checkout';

//ADMIN
import AdminPending from '~/pages/Admin/AdminPending';
import MenuAppointment from '~/pages/Admin/MenuAppointment';
import AppointmentPending from '~/pages/Admin/AppointmentPending';
import AppointmentAccepted from '~/pages/Admin/AppointmentAccepted';
import AppointmentCanceled from '~/pages/Admin/AppointmentCanceled';
import AdminDelivering from '~/pages/Admin/AdminDelivering';
import AdminWaiting from '~/pages/Admin/AdminWaiting';
import AdminSuccess from '~/pages/Admin/AdminSuccess';
import ManageBrand from '~/pages/Admin/ManageBrand';
import ManageBreeds from '~/pages/Admin/ManageBreeds';
import ManageProducts from '~/pages/Admin/ManageProducts';
import ManageServices from '~/pages/Admin/ManageServices';
import Revenue from '~/pages/Admin/Revenue';
import Contact from '~/pages/Contact';
import OrderPending from '~/pages/HistoryOA/OrderPending';
import OrderDelivering from '~/pages/HistoryOA/OrderDelivering';
import OrderWaiting from '~/pages/HistoryOA/OrderWaiting';
import OrderSuccess from '~/pages/HistoryOA/OrderSuccess';
import OrderCanceled from '~/pages/HistoryOA/OrderCanceled';

// Public routes
const publicRoutes = [
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.home, component: Home },
  { path: config.routes.detailItem, component: DetailItem },
  { path: config.routes.allProducts, component: AllProduct },
  { path: config.routes.information, component: Information, layout: HeaderOnly },
  { path: config.routes.history, component: History, layout: HeaderOnly },
  { path: config.routes.appointmentHistory, component: AppointmentHistory, layout: HeaderOnly },
  { path: config.routes.historydetails, component: ItemHistory, layout: HeaderOnly },
  { path: config.routes.cart, component: Cart, layout: HeaderOnly },
  { path: config.routes.checkout, component: Checkout, layout: HeaderOnly },
  { path: config.routes.introduce, component: Introduce, layout: HeaderOnly},
  { path: config.routes.contact, component: Contact, layout: HeaderOnly},
  { path: config.routes.orderPending, component: OrderPending, layout: HeaderOnly },
  { path: config.routes.orderWaiting, component: OrderWaiting, layout: HeaderOnly },
  { path: config.routes.orderDelivering, component: OrderDelivering, layout: HeaderOnly },
  { path: config.routes.orderSuccess, component: OrderSuccess, layout: HeaderOnly },
  { path: config.routes.orderCanceled, component: OrderCanceled, layout: HeaderOnly },
];

const adminRoutes = [
  { path: config.routes.adminPending, component: AdminPending, layout: Admin },
  { path: config.routes.appointment, component: MenuAppointment, layout: Admin },
  { path: config.routes.appointmentPending, component: AppointmentPending, layout: Admin },
  { path: config.routes.appointmentAccepted, component: AppointmentAccepted, layout: Admin },
  { path: config.routes.appointmentCanceled, component: AppointmentCanceled, layout: Admin },
  { path: config.routes.adminWaiting, component: AdminWaiting, layout: Admin },
  { path: config.routes.adminDelivering, component: AdminDelivering, layout: Admin },
  { path: config.routes.adminSuccess, component: AdminSuccess, layout: Admin },
  { path: config.routes.manageBrand, component: ManageBrand, layout: Admin },
  { path: config.routes.manageBreeds, component: ManageBreeds, layout: Admin },
  { path: config.routes.manageProducts, component: ManageProducts, layout: Admin },
  { path: config.routes.manageServices, component: ManageServices, layout: Admin },
  { path: config.routes.revenue, component: Revenue, layout: Admin },
];

export { publicRoutes, adminRoutes };
