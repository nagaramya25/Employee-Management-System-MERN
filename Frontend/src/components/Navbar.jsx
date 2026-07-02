import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    // Hide Navbar on Login Page
    if (location.pathname === "/login") {
        return null;
    }

    // Get Logged-in User
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <nav
            style={{
                background: "#1976d2",
                color: "white",
                padding: "15px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            <h2>Employee Management System</h2>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >

                <span>
                    👋 Welcome, <b>{user?.name}</b>
                </span>

                <button
                    onClick={handleLogout}
                    style={{
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>

            </div>

        </nav>

    );
}

export default Navbar;