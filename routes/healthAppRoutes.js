const express = require('express');
const router = express.Router();
const controller = require('../controllers/healthAppControllers');
const {login, verify} = require('../auth/auth')

router.get('/', controller.home_page);

router.get('/login', );
router.post('/login', login);

router.get('/register', );
router.post('/register', controller.post_new_user)

router.get('/logout', verify, );

router.get('/history', verify, controller.get_user_history);

router.get('/goals', verify, controller.get_user_goals);
router.post('/goals/update', verify, controller.update_user_goal);
router.post('/goals', verify, controller.post_new_goal)
module.exports = router;