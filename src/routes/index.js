import categoryRoute from './category.route'
import userRoute from './user.route'
import productRoute from './product.route'
import orderRoute from './order.route'

const routes = [
  ...categoryRoute,
  ...userRoute,
  ...productRoute,
  ...orderRoute
];

export default routes;
