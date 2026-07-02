import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../services/AuthService";

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    // Handle Input Change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });

    };

    // Validation
    const validate = () => {

        let newErrors = {};

        if (!user.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!user.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    // Login
   const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("Login button clicked");

    if (!validate()) {
        console.log("Validation Failed");
        return;
    }

    console.log("Validation Passed");

    try {

        console.log("Calling Login API...");

        const response = await loginUser(user);

        console.log("API Response:", response);

        // Save Token
        localStorage.setItem("token", response.data.token);

        // Save Logged-in User
        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

        toast.success("Login Successful");

        navigate("/");

    } catch (error) {

        console.log("Login Error:", error);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Data:", error.response.data);
        }

        toast.error("Invalid Email or Password");

    }

};
    return (

        <div className="container">

            <h2 className="heading">
                Employee Management Login
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={handleChange}
                />

                {errors.email &&
                    <p className="error">{errors.email}</p>
                }

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={handleChange}
                />

                {errors.password &&
                    <p className="error">{errors.password}</p>
                }

                <button
                    className="save-btn"
                    type="submit"
                >
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;