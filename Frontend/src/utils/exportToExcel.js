import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportEmployeesToExcel = (employees) => {

    const data = employees.map((employee) => ({
        Name: employee.name,
        Email: employee.email,
        Department: employee.department,
        Salary: employee.salary,
        Mobile: employee.mobile
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Employees"
    );

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const file = new Blob([excelBuffer], {
        type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });

    saveAs(file, "Employees.xlsx");
};