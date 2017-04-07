import { userCtrl, docCtrl } from '../controllers';
import auth from '../middlewares/auth';
import utils from '../middlewares/utils';

const userRoute = (router) => {
  router.route('/users')
    .get(auth.verifyToken, auth.verifyAdmin, userCtrl.getAllUsers)
    .post(utils.isValidUserCreateBody, userCtrl.createUser);

  router.route('/users/login')
    .post(utils.isValidLoginBody, userCtrl.login);

  router.route('/users/logout')
    .get(auth.verifyToken, userCtrl.logout);

  router.route('/users/documents')
    .get(auth.verifyToken, docCtrl.getMyDocuments);

  router.route('/users/:id/documents')
    .get(auth.verifyToken, auth.verifyAdmin, docCtrl.getUserDocuments);

  router.route('/users/:id')
    .get(auth.verifyToken, utils.isValidRequestId,
      utils.canUpdateOrFindUser, userCtrl.getOneUser)
    .patch(auth.verifyToken, utils.isValidRequestId,
      utils.canUpdateOrFindUser, utils.isValidUserUpdateBody,
      utils.preventDefaultAdminRoleChange, userCtrl.updateUser)
    .delete(auth.verifyToken, auth.verifyAdmin,
      utils.isValidRequestId, utils.preventDefaultAdminDelete,
      userCtrl.deleteUser);
};

export default userRoute;