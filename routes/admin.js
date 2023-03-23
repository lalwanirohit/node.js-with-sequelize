const express = require('express');

const employeeController = require('../controllers/admin/employeeController');

const router = express.Router();

router.get('/',employeeController.getAllEmployees);
router.get('/add-employee',employeeController.getAddEmployee);
router.post('/add-employee',employeeController.postAddEmployee);
router.get('/edit-employee/:employeeId',employeeController.getEditEmployee);
router.post('/update-employee',employeeController.postEditEmployee);
router.get('/delete-employee/:employeeId',employeeController.deleteEmployee);

router.get('/setcookie', function (req, res) {
    res.cookie('my_cookie', 'geeksforgeeks', { httpOnly:true });
    res.send('Cookies added');
  });

router.get('/getcookie', function (req, res) {
    res.send(req.cookies.my_cookie);
})

router.get('/event', employeeController.eventAction);

module.exports = router;