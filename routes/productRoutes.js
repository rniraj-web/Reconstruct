import express from "express";
import { isAdmin, requireSign } from "../middlewares/authMiddleware.js";
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, filterProductController, getProductController, getProductPhotoController, getSingleProductController, productCategoryController, productCountController, productListController, updateProductController } from "../controllers/productController.js";
import formidable from 'express-formidable';

const router = express.Router();

// routes
// create products
router.post('/create-product', requireSign, isAdmin, formidable(),  createProductController)

// update product
router.put('/update-product/:pid', requireSign, isAdmin, formidable(), updateProductController)

// get products
router.get('/get-product', getProductController);

//get single product
router.get('/get-product/:slug',getSingleProductController);

//get photo
router.get('/product-photo/:pid', getProductPhotoController);

// delete product
router.delete('/delete-product/:pid',requireSign, isAdmin, deleteProductController)

// filter product
router.post('/product-filter', filterProductController)

// count product
router.get('/product-count', productCountController)

// product per page
router.get('/product-list/:page', productListController)

// category wise product
router.get('/product-category/:slug',productCategoryController)

// payment routes
// token
router.get('/braintree/token', braintreeTokenController)

// payments
router.post('/braintree/payment', requireSign, braintreePaymentController)
export default router