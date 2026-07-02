import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportEmployeesToPDF = (employees) => {

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Employee Report", 14, 20);

    // Table Data
    const tableData = employees.map((employee) => [
        employee.name,
        employee.email,
        employee.department,
        employee.salary,
        employee.mobile
    ]);

    // Table
    autoTable(doc, {
        head: [[
            "Name",
            "Email",
            "Department",
            "Salary",
            "Mobile"
        ]],
        body: tableData,
        startY: 30,
    });

    // Download PDF
    doc.save("Employees.pdf");
};