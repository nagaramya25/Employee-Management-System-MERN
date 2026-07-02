const Employee = require("../models/Employee");


// GET ALL EMPLOYEES

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET SINGLE EMPLOYEE

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee Not Found"
            });
        }

        res.status(200).json(employee);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ADD EMPLOYEE

const createEmployee = async (req, res) => {

    try {

        const employee = new Employee({

            name: req.body.name,

            email: req.body.email,

            department: req.body.department,

            salary: req.body.salary,

            mobile: req.body.mobile,

            image: req.file ? req.file.filename : ""

        });

        const savedEmployee = await employee.save();

        res.status(201).json(savedEmployee);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// UPDATE EMPLOYEE


const updateEmployee = async (req, res) => {
    try {

        console.log("File:", req.file);
        console.log("Body:", req.body);

        // Find existing employee
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee Not Found"
            });
        }

        // Prepare updated data
        const updatedData = {
            name: req.body.name,
            email: req.body.email,
            department: req.body.department,
            salary: req.body.salary,
            mobile: req.body.mobile,
            image: req.file ? req.file.filename : employee.image
        };

        // Update employee
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {
                new: true
            }
        );

        res.status(200).json(updatedEmployee);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE EMPLOYEE

const deleteEmployee = async (req, res) => {
    try {

        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee Not Found"
            });
        }

        res.status(200).json({
            message: "Employee Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};