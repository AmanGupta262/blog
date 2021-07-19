import express from "express";
import categoryCtrl from '../controllers/category_controller'
import auth from '../middleware/auth'

const router = express.Router();

// create category
router.route('/')
    .get(categoryCtrl.getAll)
    .post(auth, categoryCtrl.create)



export default router;