import express from "express"
import {registerController,loginController, testController, forgotPasswordController, updateProfileController, getOrdersControllers, getAllOrdersController} from "../controllers/authController.js";
import { isAdmin, requireSign } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

//creating a routes for the auth(login and register)

// register route (it will be a post request)
router.post('/register', registerController)

// login route post request
router.post('/login', loginController);

// forgot password
router.post('/forgot-password', forgotPasswordController)

// dummy test routes
router.get('/test', requireSign, isAdmin , testController);

// protected user routes
router.get('/user-auth', requireSign, (req, res)=>{
    res.status(200).send({ok: true})
})

// protected admin route

router.get('/admin-auth', requireSign, isAdmin, (req, res)=>{
    res.status(200).send({ok: true})
})

// update profile
router.put('/profile', requireSign, updateProfileController)

// order routes
router.get('/orders', requireSign, getOrdersControllers)

router.get('/all-orders', requireSign, isAdmin ,getAllOrdersController)

// router.put('/order-status', requireSign, isAdmin, orderStatusController)

export default router;