import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

function DashboardCharts({ employees }) {

    const departments = [
        "IT",
        "HR",
        "Finance",
        "Sales",
        "Marketing"
    ];

    const counts = departments.map((department) =>
        employees.filter(
            (employee) =>
                employee.department === department
        ).length
    );

    const pieData = {
        labels: departments,
        datasets: [
            {
                label: "Employees",
                data: counts,
                backgroundColor: [
                    "#36A2EB",
                    "#4CAF50",
                    "#FFCE56",
                    "#FF6384",
                    "#9966FF"
                ]
            }
        ]
    };

    const barData = {
        labels: departments,
        datasets: [
            {
                label: "Employees",
                data: counts,
                backgroundColor: [
                    "#36A2EB",
                    "#4CAF50",
                    "#FFCE56",
                    "#FF6384",
                    "#9966FF"
                ]
            }
        ]
    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                gap: "40px",
                flexWrap: "wrap",
                margin: "40px 0"
            }}
        >

            <div
                style={{
                    width: "400px"
                }}
            >

                <h3
                    style={{
                        textAlign: "center"
                    }}
                >
                    Employees by Department
                </h3>

                <Pie data={pieData} />

            </div>

            <div
                style={{
                    width: "500px"
                }}
            >

                <h3
                    style={{
                        textAlign: "center"
                    }}
                >
                    Department Wise Count
                </h3>

                <Bar data={barData} />

            </div>

        </div>

    );
}

export default DashboardCharts;