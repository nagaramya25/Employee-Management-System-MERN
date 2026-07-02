import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getEmployeeById,
    updateEmployee
} from "../services/EmployeeService";

function EditEmployee() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        department: "",
        salary: "",
        mobile: "",
        image: null
    });

    const [errors, setErrors] = useState({});

    // Load Employee
    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {
        try {
            const response = await getEmployeeById(id);
            setEmployee(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Error Loading Employee");
        }
    };

    // Handle Input Change
    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setEmployee({
            ...employee,
            [name]: files ? files[0] : value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    };

    // Validation
    const validate = () => {

        let newErrors = {};

        if (!employee.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!/^[A-Za-z ]+$/.test(employee.name)) {
            newErrors.name = "Name should contain only letters";
        }

        if (!employee.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employee.email)
        ) {
            newErrors.email = "Invalid email";
        }

        if (!employee.department.trim()) {
            newErrors.department = "Department is required";
        }

        if (!employee.salary || Number(employee.salary) <= 0) {
            newErrors.salary = "Salary must be greater than 0";
        }

        if (!/^[0-9]{10}$/.test(employee.mobile)) {
            newErrors.mobile =
                "Mobile number must contain exactly 10 digits";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Update Employee
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {

            const formData = new FormData();

            formData.append("name", employee.name);
            formData.append("email", employee.email);
            formData.append("department", employee.department);
            formData.append("salary", employee.salary);
            formData.append("mobile", employee.mobile);

            if (employee.image instanceof File) {
                formData.append("image", employee.image);
            }

            await updateEmployee(id, formData);

            toast.success("Employee Updated Successfully");

            navigate("/");

        } catch (error) {

            console.log(error);

            toast.error("Error Updating Employee");

        }
    };

    return (

        <div className="container">

            <h2 className="heading">Edit Employee</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={employee.name}
                    onChange={handleChange}
                />

                {errors.name &&
                    <p className="error">{errors.name}</p>
                }

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={employee.email}
                    onChange={handleChange}
                />

                {errors.email &&
                    <p className="error">{errors.email}</p>
                }

                <select
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                </select>

                {errors.department &&
                    <p className="error">{errors.department}</p>
                }

                <input
                    type="number"
                    name="salary"
                    placeholder="Enter Salary"
                    value={employee.salary}
                    onChange={handleChange}
                />

                {errors.salary &&
                    <p className="error">{errors.salary}</p>
                }

                <input
                    type="text"
                    name="mobile"
                    placeholder="Enter Mobile"
                    value={employee.mobile}
                    onChange={(e) => {
                        if (/^\d{0,10}$/.test(e.target.value)) {
                            handleChange(e);
                        }
                    }}
                />

                {errors.mobile &&
                    <p className="error">{errors.mobile}</p>
                }

                <div style={{ marginTop: "15px" }}>

                    <label><strong>Current Photo</strong></label>

                    <br /><br />

                    {employee.image && !(employee.image instanceof File) ? (
                        <img
                            src={`http://localhost:5000/uploads/${employee.image}`}
                            alt="Employee"
                            width="100"
                            height="100"
                            style={{
                                borderRadius: "10px",
                                objectFit: "cover",
                                marginBottom: "10px"
                            }}
                        />
                    ) : (
                        <p>No Image</p>
                    )}

                </div>

                <div style={{ marginBottom: "20px" }}>

                    <label><strong>Choose New Photo</strong></label>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />

                </div>

                <button
                    className="save-btn"
                    type="submit"
                >
                    Update Employee
                </button>

                <button
                    className="cancel-btn"
                    type="button"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </button>

            </form>

        </div>

    );
}

export default EditEmployee;