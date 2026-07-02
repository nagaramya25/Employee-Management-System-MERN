import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getEmployees,
    deleteEmployee
} from "../services/EmployeeService";

import { exportEmployeesToExcel } from "../utils/exportToExcel";
import { exportEmployeesToPDF } from "../utils/exportToPDF";

import DashboardCharts from "../components/DashboardCharts";

function EmployeeList() {

    const navigate = useNavigate();

    // ==========================
    // STATES
    // ==========================

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [currentPage, setCurrentPage] =useState(1);

    const employeesPerPage = 5;

    // ==========================
    // LOAD EMPLOYEES
    // ==========================

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {

            const response = await getEmployees();

            setEmployees(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    // ==========================
    // DELETE EMPLOYEE
    // ==========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) return;

        try {

            await deleteEmployee(id);

            loadEmployees();

        } catch (error) {

            console.log(error);

        }
    };

    // ==========================
    // SEARCH
    // ==========================

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.department.toLowerCase().includes(search.toLowerCase())
    );

    // ==========================
    // SORTING
    // ==========================

    const sortedEmployees = [...filteredEmployees];

    switch (sortBy) {

        case "nameAsc":
            sortedEmployees.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        case "nameDesc":
            sortedEmployees.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
            break;

        case "salaryLow":
            sortedEmployees.sort((a, b) =>
                a.salary - b.salary
            );
            break;

        case "salaryHigh":
            sortedEmployees.sort((a, b) =>
                b.salary - a.salary
            );
            break;

        case "department":
            sortedEmployees.sort((a, b) =>
                a.department.localeCompare(b.department)
            );
            break;

        default:
            break;
    }

    // ==========================
    // DASHBOARD COUNTS
    // ==========================

    const totalEmployees = employees.length;

    const itEmployees = employees.filter(
        emp => emp.department === "IT"
    ).length;

    const hrEmployees = employees.filter(
        emp => emp.department === "HR"
    ).length;

    const financeEmployees = employees.filter(
        emp => emp.department === "Finance"
    ).length;

    const salesEmployees = employees.filter(
        emp => emp.department === "Sales"
    ).length;

    const marketingEmployees = employees.filter(
        emp => emp.department === "Marketing"
    ).length;

    // ==========================
    // PAGINATION
    // ==========================

    const indexOfLastEmployee =
        currentPage * employeesPerPage;

    const indexOfFirstEmployee =
        indexOfLastEmployee - employeesPerPage;

    const currentEmployees =
        sortedEmployees.slice(
            indexOfFirstEmployee,
            indexOfLastEmployee
        );

    const totalPages = Math.ceil(
        sortedEmployees.length / employeesPerPage
    );

    // ==========================
    // JSX STARTS HERE
    // ==========================

    return (
        <div className="container">

    {/* ==========================
        DASHBOARD
    ========================== */}

    <div className="dashboard">

        <div className="card">
            <h3>Total Employees</h3>
            <p>{totalEmployees}</p>
        </div>

        <div className="card">
            <h3>IT</h3>
            <p>{itEmployees}</p>
        </div>

        <div className="card">
            <h3>HR</h3>
            <p>{hrEmployees}</p>
        </div>

        <div className="card">
            <h3>Finance</h3>
            <p>{financeEmployees}</p>
        </div>

        <div className="card">
            <h3>Sales</h3>
            <p>{salesEmployees}</p>
        </div>

        <div className="card">
            <h3>Marketing</h3>
            <p>{marketingEmployees}</p>
        </div>

    </div>

    {/* ==========================
        EMPLOYEE LIST
    ========================== */}

    <h2 className="heading">
        Employee List
    </h2>

    {/* ==========================
        TOP TOOLBAR
    ========================== */}

    <div className="top-bar">

        <button
            className="add-btn"
            onClick={() => navigate("/add")}
        >
            Add Employee
        </button>

        <button
            className="export-btn"
            onClick={() =>
                exportEmployeesToExcel(filteredEmployees)
            }
        >
            Export Excel
        </button>

        <button
            className="pdf-btn"
            onClick={() =>
                exportEmployeesToPDF(filteredEmployees)
            }
        >
            Export PDF
        </button>

        <select
            className="sort-box"
            value={sortBy}
            onChange={(e) =>
                setSortBy(e.target.value)
            }
        >
            <option value="">Sort By</option>
            <option value="nameAsc">Name (A-Z)</option>
            <option value="nameDesc">Name (Z-A)</option>
            <option value="salaryLow">Salary (Low-High)</option>
            <option value="salaryHigh">Salary (High-Low)</option>
            <option value="department">Department</option>
        </select>

        <input
            className="search-box"
            type="text"
            placeholder="Search by Name or Department..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
            }}
        />

    </div>

    {/* ==========================
        EMPLOYEE TABLE
    ========================== */}

    <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
    >

        <thead>

            <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Mobile</th>
                <th>Actions</th>
            </tr>

        </thead>

        <tbody>

            {currentEmployees.length > 0 ? (

                currentEmployees.map((employee) => (

                    <tr key={employee._id}>

                        <td>

                            {employee.image ? (

                                <img
                                    src={`http://localhost:5000/uploads/${employee.image}`}
                                    alt={employee.name}
                                    width="60"
                                    height="60"
                                    style={{
                                        borderRadius: "50%",
                                        objectFit: "cover"
                                    }}
                                />

                            ) : (

                                "No Image"

                            )}

                        </td>

                        <td>{employee.name}</td>

                        <td>{employee.email}</td>

                        <td>{employee.department}</td>

                        <td>₹{employee.salary}</td>

                        <td>{employee.mobile}</td>

                        <td>

                            <button
                                className="edit-btn"
                                onClick={() =>
                                    navigate(`/edit/${employee._id}`)
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(employee._id)
                                }
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))

            ) : (

                <tr>

                    <td
                        colSpan="7"
                        style={{
                            textAlign: "center"
                        }}
                    >
                        No Employees Found
                    </td>

                </tr>

            )}

        </tbody>

    </table>
    {/* ==========================
    PAGINATION
========================== */}

{totalPages > 1 && (

    <div
        style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px"
        }}
    >

        <button
            onClick={() =>
                setCurrentPage(currentPage - 1)
            }
            disabled={currentPage === 1}
        >
            Previous
        </button>

        {Array.from(
            { length: totalPages },
            (_, index) => (

                <button
                    key={index}
                    onClick={() =>
                        setCurrentPage(index + 1)
                    }
                    style={{
                        background:
                            currentPage === index + 1
                                ? "#1976d2"
                                : "#e0e0e0",
                        color:
                            currentPage === index + 1
                                ? "#fff"
                                : "#000",
                        border: "none",
                        borderRadius: "6px",
                        padding: "8px 14px",
                        cursor: "pointer"
                    }}
                >
                    {index + 1}
                </button>

            )
        )}

        <button
            onClick={() =>
                setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
        >
            Next
        </button>

    </div>

)}

{/* ==========================
    EMPLOYEE ANALYTICS
========================== */}

<hr
    style={{
        marginTop: "50px",
        marginBottom: "35px"
    }}
/>

<h2
    className="heading"
    style={{
        textAlign: "center",
        marginBottom: "30px"
    }}
>
    Employee Analytics
</h2>

<div
    style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
    }}
>
    <DashboardCharts employees={employees} />
</div>

</div>
);
}

export default EmployeeList;