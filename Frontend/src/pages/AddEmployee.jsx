import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addEmployee } from "../services/EmployeeService";

function AddEmployee() {
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

    // Validation Function
    const validate = () => {
        let newErrors = {};

        // Name
        if (!employee.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!/^[A-Za-z ]+$/.test(employee.name)) {
            newErrors.name = "Name should contain only letters";
        }

        // Email
        if (!employee.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employee.email)
        ) {
            newErrors.email = "Invalid email";
        }

        // Department
        if (!employee.department.trim()) {
            newErrors.department = "Department is required";
        }

        // Salary
        if (!employee.salary || Number(employee.salary) <= 0) {
            newErrors.salary = "Salary must be greater than 0";
        }

        // Mobile
        
       if (!/^[0-9]{10}$/.test(employee.mobile)) {
    newErrors.mobile = "Mobile number must contain exactly 10 digits";
}
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit Form
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

if (employee.image) {
    formData.append("image", employee.image);
}

await addEmployee(formData);
            toast.success("Employee Added Successfully");

            navigate("/");
        } catch (error) {
            console.log(error);
           toast.error("Error Adding Employee");
        }
    };

    return (
        <div className="container">
            <h2 className="heading">Add Employee</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={employee.name}
                    onChange={handleChange}
                />
                {errors.name && (
                    <p className="error">{errors.name}</p>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={employee.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <p className="error">{errors.email}</p>
                )}

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

{errors.department && (
    <p className="error">{errors.department}</p>
)}

                <input
                    type="number"
                    name="salary"
                    placeholder="Enter Salary"
                    value={employee.salary}
                    onChange={handleChange}
                />
                {errors.salary && (
                    <p className="error">{errors.salary}</p>
                )}

                <input
    type="text"
    name="mobile"
    placeholder="Enter Mobile"
    value={employee.mobile}
    maxLength={10}
    onChange={(e) => {
        if (/^\d{0,10}$/.test(e.target.value)) {
            handleChange(e);
        }
    }}
/>
                {errors.mobile && (
                    <p className="error">{errors.mobile}</p>
                )}
                <div style={{ marginTop: "15px", marginBottom: "15px" }}>
    <label><strong>Employee Photo</strong></label>

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
                    Save Employee
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

export default AddEmployee;