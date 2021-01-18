import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import User from '../models/user.model'
import Code from '../models/code.model'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)
router.route('/api/usersToday')
  .get(userCtrl.listToday)
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
router.route('/api/stripe_auth/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.stripe_auth, userCtrl.update)

router.param('userId', userCtrl.userByID)

router.get(
  "/verification/verify-account/:userId/:secretCode",
  async (req, res) => {
      try {
          const user = await User.findById(req.params.userId);
          const response = await Code.findOne({
              email: user.email,
              code: req.params.secretCode,
          });
          if (!user) {
              res.sendStatus(401);
          } else {
              await User.updateOne(
                  { email: user.email },
                  { status: user.status }
              );
               await Code.deleteMany({ email: user.email });

               let redirectPath;

          //     if (process.env.NODE_ENV == "production") {
          //         redirectPath = `${req.protocol}://${req.get(
          //             "host"
          //         )}account/verified`;
          //     } else {
                   redirectPath = `http://127.0.0.1:3004`;
               //}

               res.redirect(redirectPath);
           }
      } catch (err) {
          console.log(
              "Error on /verification/verify-account: ",
              err
          );
          res.sendStatus(500);
      }
  }
);

export default router
