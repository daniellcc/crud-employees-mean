const express = require('express');
const path = require('path');
const router = express.Router();
const employeeCtrl = require('../controllers/employee.controller');


router.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.get('/', employeeCtrl.getEmployees);
router.get('/emp/:id', employeeCtrl.getEmployee);
router.post('/', employeeCtrl.createEmployee);
router.put('/emp/:id', employeeCtrl.editEmployee);
router.delete('/emp/:id', employeeCtrl.deleteEmployees);

module.exports = router;