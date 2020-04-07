const Employee = require('../models/employee');

const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res) => {
	try {
		const employees = await Employee.find();
		res.json(employees);
	} catch (err) {
		console.error(err);
	}
	
}

employeeCtrl.getEmployee = async (req, res) => {
	try {
		const id =  req.params.id
		const employee = await Employee.findById(id);
		res.json(employee);
	} catch (err) {
		console.error(err);
	}
	
}

employeeCtrl.createEmployee = async (req, res) => {
	try {
		const employee = new Employee(req.body);
		await employee.save();
		res.json({"status": "empleado guardado"});
	} catch (err) {
		console.error(err);
	}
}

employeeCtrl.editEmployee = async (req, res) => {
	try {
		const id = req.params.id;
		await  Employee.findByIdAndUpdate(id, {$set: req.body});
		res.json({"status": "succesfull"});
		
	}	catch (err) {
		console.error(err);
	}
}

employeeCtrl.deleteEmployees = async (req, res) => {
	try {
		const id = req.params.id
		await Employee.findByIdAndDelete(id);
	res.json({"status":"empleado eliminado"});
	} catch (err) {
		console.error(error);
	}
}

module.exports = employeeCtrl;