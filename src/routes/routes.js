import config from '~/config';

// Layouts
import { HeaderOnly, Admin } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import DetailItem from '~/pages/DetailItem';
import AllProduct from '~/pages/AllProduct';
import Information from '~/pages/Information';
import History from '~/pages/History';
import ItemHistory from '~/pages/ItemHistory';
import Cart from '~/pages/Cart';
import Introduce from '~/pages/Introduce';

//ADMIN
import AdminPending from '~/pages/Admin/AdminPending';
import AdminDelivering from '~/pages/Admin/AdminDelivering';
import AdminWaiting from '~/pages/Admin/AdminWaiting';
import AdminSuccess from '~/pages/Admin/AdminSuccess';
import ManageCategory from '~/pages/Admin/ManageCategory';
import ManageBrand from '~/pages/Admin/ManageBrand';
import ManageShoe from '~/pages/Admin/ManageShoe';
import ManageBreeds from '~/pages/Admin/ManageBreeds';
import ManageProducts from '~/pages/Admin/ManageProducts';
import ManageServices from '~/pages/Admin/ManageServices';
import Revenue from '~/pages/Admin/Revenue';
import Contact from '~/pages/Contact';

// Public routes
const publicRoutes = [
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.home, component: Home },
  { path: config.routes.detailItem, component: DetailItem },
  { path: config.routes.allProducts, component: AllProduct },
  { path: config.routes.information, component: Information, layout: HeaderOnly },
  { path: config.routes.history, component: History, layout: HeaderOnly },
  { path: config.routes.historydetails, component: ItemHistory, layout: HeaderOnly },
  { path: config.routes.cart, component: Cart, layout: HeaderOnly },
  { path: config.routes.introduce, component: Introduce, layout: HeaderOnly},
  { path: config.routes.contact, component: Contact, layout: HeaderOnly}
];

const adminRoutes = [
  { path: config.routes.adminPending, component: AdminPending, layout: Admin },
  { path: config.routes.adminWaiting, component: AdminWaiting, layout: Admin },
  { path: config.routes.adminDelivering, component: AdminDelivering, layout: Admin },
  { path: config.routes.adminSuccess, component: AdminSuccess, layout: Admin },
  { path: config.routes.manageCategory, component: ManageCategory, layout: Admin },
  { path: config.routes.manageBrand, component: ManageBrand, layout: Admin },
  { path: config.routes.manageShoes, component: ManageShoe, layout: Admin },
  { path: config.routes.manageBreeds, component: ManageBreeds, layout: Admin },
  { path: config.routes.manageProducts, component: ManageProducts, layout: Admin },
  { path: config.routes.services, component: ManageServices, layout: Admin },
  { path: config.routes.revenue, component: Revenue, layout: Admin },
];

export { publicRoutes, adminRoutes };
