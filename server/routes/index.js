import homeRoute from './homeRoutes';
import userRoute from './userRoutes';
import documentRoute from './documentRoutes';
import roleRoute from './roleRoutes';
import searchRoute from './searchRoutes';

const routes = (router) => {
  homeRoute(router);
  userRoute(router);
  documentRoute(router);
  roleRoute(router);
  searchRoute(router);
};

export default routes;

