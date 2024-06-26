import config from '~/config';

// Layouts
import { HeaderOnly, Admin } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import DetailItem from '~/pages/DetailItem';
import AllProduct from '~/pages/Navbar/AllProduct';
import Information from '~/pages/Information';
import ItemHistory from '~/pages/ItemHistory';
import Introduce from '~/pages/Navbar/Introduce';
import Cart from '~/pages/Cart';
import Checkout from '~/pages/Cart/Checkout/Checkout';
import AdminPending from '~/pages/Admin/ManageOrder/OrderPending';
import MenuAppointment from '~/pages/Admin/ManageAppointment/MenuAppointment';
import AppointmentPending from '~/pages/Admin/ManageAppointment/AppointmentPending';
import AppointmentAccepted from '~/pages/Admin/ManageAppointment/AppointmentAccepted';
import AppointmentCanceled from '~/pages/Admin/ManageAppointment/AppointmentCanceled';
import AppointmentCompleted from '~/pages/Admin/ManageAppointment/AppointmentCompleted';
import AdminDelivering from '~/pages/Admin/ManageOrder/OrderDelivering';
import AdminWaiting from '~/pages/Admin/ManageOrder/OrderWaiting';
import AdminSuccess from '~/pages/Admin/ManageOrder/OrderSuccess';
import ManageBreeds from '~/pages/Admin/ManageBreeds';
import ManageProducts from '~/pages/Admin/ManageProducts';
import ManageServices from '~/pages/Admin/ManageServices';
import ManageBlog from '~/pages/Admin/ManageBlog';
import Revenue from '~/pages/Admin/ManageRevenue';
import Contact from '~/pages/Navbar/Contact';
import HistoryOrderPending from '~/pages/HistoryOA/HistoryOrder/HistoryOrderPending';
import HistoryOrderDelivering from '~/pages/HistoryOA/HistoryOrder/HistoryOrderDelivering';
import HistoryOrderWaiting from '~/pages/HistoryOA/HistoryOrder/HistoryOrderWaiting';
import HistoryOrderSuccess from '~/pages/HistoryOA/HistoryOrder/HistoryOrderSuccess';
import HistoryOrderCanceled from '~/pages/HistoryOA/HistoryOrder/HistoryOrderCanceled';
import HistoryAppointmentCanceled from '~/pages/HistoryOA/HistoryAppointment/HistoryAppointmentCanceled';
import HistoryAppointmentAccepted from '~/pages/HistoryOA/HistoryAppointment/HistoryAppointmentAccepted';
import HistoryAppointmentPending from '~/pages/HistoryOA/HistoryAppointment/HistoryAppointmentPending';
import HistoryAppointmentFinished from '~/pages/HistoryOA/HistoryAppointment/HistoryAppointmentCompleted';
import BookingAppointment from '~/pages/BookingAppointment';
import AddBlog from '~/pages/Admin/ManageBlog/AddBlog';
import Blog from '~/pages/Blog';
import BlogDetail from '~/pages/Blog/BlogDetail';
import LoginSuccess from '~/pages/LoginSuccess';
import Forum from '~/pages/Forum';
import AddPost from '~/pages/Forum/AddPost';
import ForumDetail from '~/pages/Forum/ForumDetail';
import Messages from '~/pages/Messenger/Messenger';
import OtherProfiles from '~/pages/OtherProfiles';
import Question from '~/pages/Question';
import ManagerMessenger from '~/pages/Admin/ManagerMessenger';
import ManageForum from '~/pages/Admin/ManageForum';
import AdminAddPost from '~/pages/Admin/ManageForum/AdminAddPost';
import AdminDetailForum from '~/pages/Admin/ManageForum/AdminForumDetail/AdminForumDetail';
import AdminOtherProfiles from '~/pages/Admin/ManageForum/AdminOtherProfiles';

const publicRoutes = [
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.loginSuccess, component: LoginSuccess, layout: null },
  { path: config.routes.home, component: Home },
  { path: config.routes.detailItem, component: DetailItem },
  { path: config.routes.detailBlog, component: BlogDetail },
  { path: config.routes.otherProfiles, component: OtherProfiles, layout: HeaderOnly },
  { path: config.routes.question, component: Question, layout: HeaderOnly },
  { path: config.routes.detailForum, component: ForumDetail, layout: HeaderOnly },
  { path: config.routes.messenger, component: Messages, layout: HeaderOnly },
  { path: config.routes.allProducts, component: AllProduct },
  { path: config.routes.information, component: Information, layout: HeaderOnly },
  { path: config.routes.historyDetails, component: ItemHistory, layout: HeaderOnly },
  { path: config.routes.cart, component: Cart, layout: HeaderOnly },
  { path: config.routes.checkout, component: Checkout, layout: HeaderOnly },
  { path: config.routes.contact, component: Contact, layout: HeaderOnly },
  { path: config.routes.blog, component: Blog },
  { path: config.routes.forum, component: Forum },
  { path: config.routes.createPost, component: AddPost },
  { path: config.routes.historyOrderPending, component: HistoryOrderPending, layout: HeaderOnly },
  { path: config.routes.historyOrderWaiting, component: HistoryOrderWaiting, layout: HeaderOnly },
  { path: config.routes.historyOrderDelivering, component: HistoryOrderDelivering, layout: HeaderOnly },
  { path: config.routes.historyOrderSuccess, component: HistoryOrderSuccess, layout: HeaderOnly },
  { path: config.routes.historyOrderCanceled, component: HistoryOrderCanceled, layout: HeaderOnly },
  { path: config.routes.historyAppointmentPending, component: HistoryAppointmentPending, layout: HeaderOnly },
  { path: config.routes.historyAppointmentAccepted, component: HistoryAppointmentAccepted, layout: HeaderOnly },
  { path: config.routes.historyAppointmentCanceled, component: HistoryAppointmentCanceled, layout: HeaderOnly },
  { path: config.routes.historyAppointmentFinished, component: HistoryAppointmentFinished, layout: HeaderOnly },
  { path: config.routes.bookingAppointment, component: BookingAppointment, layout: HeaderOnly },
  { path: config.routes.introduce, component: Introduce, layout: HeaderOnly },
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
  { path: config.routes.adminOtherProfiles, component: AdminOtherProfiles, layout: Admin },
  { path: config.routes.manageBreeds, component: ManageBreeds, layout: Admin },
  { path: config.routes.manageProducts, component: ManageProducts, layout: Admin },
  { path: config.routes.manageServices, component: ManageServices, layout: Admin },
  { path: config.routes.manageBlog, component: ManageBlog, layout: Admin },
  { path: config.routes.manageForum, component: ManageForum, layout: Admin },
  { path: config.routes.managerMessenger, component: ManagerMessenger, layout: Admin },
  { path: config.routes.adminCreatePost, component: AdminAddPost, layout: Admin },
  { path: config.routes.adminDetailForum, component: AdminDetailForum, layout: Admin },
  { path: config.routes.addBlog, component: AddBlog, layout: Admin },
  { path: config.routes.revenue, component: Revenue, layout: Admin },
];

export { publicRoutes, adminRoutes };
