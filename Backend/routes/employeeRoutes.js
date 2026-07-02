const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const path = require("path");
const {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

// Protect ALL employee routes
router.use(authMiddleware);

// GET ALL
router.get("/", getEmployees);

// GET SINGLE
router.get("/:id", getEmployeeById);

// CREATE
router.post("/", upload.single("image"), createEmployee);

// UPDATE
router.put("/:id", upload.single("image"), updateEmployee);

// DELETE
router.delete("/:id", deleteEmployee);

module.exports = router;