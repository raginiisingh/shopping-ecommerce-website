const express = require('express')
const router= express.Router();

const { newOrder, allOrders } = require('../controllers/orderController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/admin/orders').get(isAuthenticatedUser,  allOrders);

module.exports = router;

