const express = require('express');
const router = express.Router();

const employeeCtrl = require('../controllers/employee.controller');

app.use(express.static('dist'));

router.get('/', employeeCtrl.getEmployees);
router.get('/emp/:id', employeeCtrl.getEmployee);
router.post('/', employeeCtrl.createEmployee);
router.put('/emp/:id', employeeCtrl.editEmployee);
router.delete('/emp/:id', employeeCtrl.deleteEmployees);

module.exports = router;