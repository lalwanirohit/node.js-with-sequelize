const express = require('express');

const employeeController = require('../controllers/admin/employeeController');

const router = express.Router();

router.get('/',employeeController.getAllEmployees);
router.get('/add-employee',employeeController.getAddEmployee);
router.post('/add-employee',employeeController.postAddEmployee);
router.get('/edit-employee/:employeeId',employeeController.getEditEmployee);
router.post('/update-employee',employeeController.postEditEmployee);
router.get('/delete-employee/:employeeId',employeeController.deleteEmployee);

module.exports = router;