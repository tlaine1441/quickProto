var express = require('express');

// define router
var router = express.Router();

// require cards controllers
var deepController = require('../controllers/deepController');

// index route
router.route('/prediction') // index
  .get(deepController.getItem)

router.route('/twilio')
	.get(deepController.sendText)



// export router
module.exports = router