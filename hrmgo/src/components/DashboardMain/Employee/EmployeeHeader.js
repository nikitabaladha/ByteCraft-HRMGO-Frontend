import React from "react";
import { Link } from "react-router-dom";
import { TbFileExport } from "react-icons/tb";
import { CiFileOn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { exportToExcel } from "../../export-excel";
import { formatDate } from "../../../Js/custom";

const EmployeeHeader = ({ employeeData }) => {
  const handleExport = () => {
    const filteredData = employeeData.map((employee) => ({
      Id: employee._id,
      EMPID: employee.id,
      Name: employee.name,
      Phone: employee.phone,
      DateOfBirth: formatDate(employee.dateOfBirth),
      Gender: employee.gender,
      Address: employee.address,
      BranchName: employee.branchName,
      DepartmentName: employee.departmentName,
      DesignationName: employee.designationName,
      BranchId: employee.branchId,
      DepartmentId: employee.departmentId,
      DesignationId: employee.designationId,
      DateOfJoining: formatDate(employee.dateOfJoining),
      EmployeePhotoUrl: employee.employeePhotoUrl,
      EmployeeCertificateUrl: employee.employeeCertificateUrl,
      EmployeeResumeUrl: employee.employeeResumeUrl,
      AccountHolderName: employee.accountHolderName,
      AccountNumber: employee.accountNumber,
      BankName: employee.bankName,
      BankIdentifierCode: employee.bankIdentifierCode,
      BranchLocation: employee.branchLocation,
      TaxPayerId: employee.taxPayerId,
      Email: employee.email,
    }));

    exportToExcel(filteredData, "Employees", "Employee Data");
  };

  const navigate = useNavigate();

  const navigateToEmployeeCreate = (event) => {
    event.preventDefault();
    navigate(`/dashboard/employee/create`);
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Employee</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="https/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Employee</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="Export"
                  className="btn btn-sm btn-primary me-2"
                  onClick={handleExport}
                >
                  <TbFileExport />
                </Link>
                <Link
                  data-ajax-popup="true"
                  data-title="Import  employee CSV file"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary me-2"
                  data-bs-original-title="Import"
                >
                  <CiFileOn />
                </Link>
                <Link
                  data-title="Create New Employee"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Create"
                  onClick={(event) => navigateToEmployeeCreate(event)}
                >
                  <FiPlus />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeHeader;
