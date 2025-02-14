import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import getAPI from "../../../../api/getAPI";
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";

const UpdateEmployee = ({ updateEmployee }) => {
  const location = useLocation();
  const employee = location.state?.employee;

  console.log("employee", employee);

  const [formData, setFormData] = useState({
    name: employee?.name || "",
    phone: employee?.phone || "",
    dateOfBirth: employee?.dateOfBirth
      ? new Date(employee.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: employee?.gender || "",
    address: employee?.address || "",
    branchId: employee?.branchId || "",
    departmentId: employee?.departmentId || "",
    designationId: employee?.designationId || "",
    dateOfJoining: employee?.dateOfJoining
      ? new Date(employee.dateOfJoining).toISOString().split("T")[0]
      : "",
    accountHolderName: employee?.accountHolderName || "",
    accountNumber: employee?.accountNumber || "",
    bankName: employee?.bankName || "",
    bankIdentifierCode: employee?.bankIdentifierCode || "",
    branchLocation: employee?.branchLocation || "",
    taxPayerId: employee?.taxPayerId || "",
  });

  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [employeePhoto, setEmployeePhoto] = useState(
    employee?.employeePhotoUrl || null
  );
  const [employeeCertificate, setEmployeeCertificate] = useState(
    employee?.employeeCertificateUrl || null
  );
  const [employeeResume, setEmployeeResume] = useState(
    employee?.employeeResumeUrl || null
  );

  const [imagePreview, setImagePreview] = useState(
    employee?.employeePhotoUrl || ""
  );
  const [certificatePreview, setCertificatePreview] = useState(
    employee?.employeeCertificateUrl || ""
  );
  const [resumePreview, setResumePreview] = useState(
    employee?.employeeResumeUrl || ""
  );

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      const file = files[0];

      if (name === "employeePhotoUrl") {
        setEmployeePhoto(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (name === "employeeCertificateUrl") {
        setEmployeeCertificate(file);
        setCertificatePreview(URL.createObjectURL(file));
      } else if (name === "employeeResumeUrl") {
        setEmployeeResume(file);
        setResumePreview(URL.createObjectURL(file));
      }
    } else {
      if (name === "employeePhotoUrl") {
        setEmployeePhoto(null);
        setImagePreview(employee?.employeePhotoUrl || "");
      } else if (name === "employeeCertificateUrl") {
        setEmployeeCertificate(null);
        setCertificatePreview(employee?.employeeCertificateUrl || "");
      } else if (name === "employeeResumeUrl") {
        setEmployeeResume(null);
        setResumePreview(employee?.employeeResumeUrl || "");
      }
    }
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await getAPI("/branch-get-all", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setBranches(response.data.data);
        } else {
          console.error("Error fetching branches.");
        }
      } catch (err) {
        console.error("Error fetching branch data:", err);
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    // Fetch departments when the branchId changes
    const fetchDepartments = async () => {
      if (formData.branchId) {
        try {
          const response = await getAPI(
            `/department-get-all-by-branch-id?branchId=${formData.branchId}`,
            {},
            true,
            true
          );
          if (!response.hasError && Array.isArray(response.data.data)) {
            setDepartments(response.data.data);
          } else {
            console.error("Error fetching departments.");
          }
        } catch (err) {
          console.error("Error fetching department data:", err);
        }
      } else {
        setDepartments([]); // Clear departments if no branch is selected
      }
    };
    fetchDepartments();
  }, [formData.branchId]);

  useEffect(() => {
    // Fetch designations when the departmentId changes
    const fetchDesignations = async () => {
      if (formData.departmentId) {
        try {
          const response = await getAPI(
            `/designation-get-all-by-department-id?departmentId=${formData.departmentId}`,
            {},
            true,
            true
          );
          if (!response.hasError && Array.isArray(response.data.data)) {
            setDesignations(response.data.data);
          } else {
            console.error("Error fetching designations.");
          }
        } catch (err) {
          console.error("Error fetching designation data:", err);
        }
      } else {
        setDesignations([]); // Clear designations if no department is selected
      }
    };
    fetchDesignations();
  }, [formData.departmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key] || "");
      }
    }

    console.log("FormData to send:", Array.from(formDataToSend));

    try {
      const response = await putAPI(
        `/employee/${employee._id}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      const branchName = branches.find(
        (br) => br._id === formData.branchId
      )?.branchName;

      const departmentName = departments.find(
        (dep) => dep._id === formData.departmentId
      )?.departmentName;

      const designationName = designations.find(
        (des) => des._id === formData.designationId
      )?.designationName;

      if (!response.data.hasError) {
        console.log("updated response", response.data);
        const newUpdatedEmployee = {
          _id: response.data.data._id,
          id: response.data.data.id,
          email: response.data.data.email,
          name: response.data.data.name,
          dateOfJoining: response.data.data.dateOfJoining,
          phone: response.data.data.phone,
          gender: response.data.data.gender,
          address: response.data.data.address,
          branchId: response.data.data.branchId,
          departmentId: response.data.data.departmentId,
          designationId: response.data.data.designationId,
          employeePhotoUrl: response.data.data.employeePhotoUrl,
          employeeCertificateUrl: response.data.data.employeeCertificateUrl,
          employeeResumeUrl: response.data.data.employeeResumeUrl,
          accountHolderName: response.data.data.accountHolderName,
          accountNumber: response.data.data.accountNumber,
          bankName: response.data.data.bankName,
          bankIdentifierCode: response.data.data.bankIdentifierCode,
          branchLocation: response.data.data.branchLocation,
          taxPayerId: response.data.data.taxPayerId,
          dateOfBirth: response.data.data.dateOfBirth,
          designationName: designationName || formData.designationId,
          departmentName: departmentName || formData.departmentId,
          branchName: branchName || formData.branchId,
        };

        updateEmployee(newUpdatedEmployee);

        toast.success("Employee updated successfully!");
        console.log(response.data);
      } else {
        toast.error("Failed to update Employee.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (!employee) {
    return <div>No employee data provided!</div>;
  }

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Edit Employee</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="">Employee</Link>
                </li>
                <li className="breadcrumb-item">Edit Employee</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="">
          <div className="">
            <form
              method="POST"
              acceptCharset="UTF-8"
              encType="multipart/form-data"
              className="needs-validation"
              noValidate=""
              onSubmit={handleUpdate}
            >
              <input name="_method" type="hidden" defaultValue="PUT" />
              <input name="_token" type="hidden" />
              <div className="row">
                <div className="col-md-6">
                  <div className="card em-card">
                    <div className="card-header">
                      <h5>Personal Detail</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <span className="text-danger">*</span>
                          <input
                            className="form-control"
                            required="required"
                            type="text"
                            name="name"
                            defaultValue={formData.name}
                            id="name"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="phone" className="form-label">
                              Phone
                            </label>{" "}
                            <span className="text-danger">*</span>
                            <input
                              className="form-control"
                              placeholder="Enter employee phone"
                              pattern="^\+\d{1,3}\d{9,13}$"
                              id="phone"
                              required="true"
                              name="phone"
                              type="text"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                            <div className=" text-xs text-danger">
                              Please use with country code. (ex. +91)
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="dob" className="form-label">
                              Date of Birth
                            </label>
                            <span className="text-danger">*</span>
                            <input
                              className="form-control"
                              required
                              autoComplete="off"
                              placeholder="Select Date of Birth"
                              name="dateOfBirth"
                              type="date"
                              id="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="gender" className="form-label">
                              Gender
                            </label>
                            <span className="text-danger">*</span>
                            <div className="d-flex radio-check">
                              <div className="custom-control custom-radio custom-control-inline">
                                <input
                                  type="radio"
                                  id="g_male"
                                  value="Male"
                                  name="gender"
                                  className="form-check-input"
                                  defaultChecked={formData.gender === "Male"}
                                  onChange={handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="g_male"
                                >
                                  Male
                                </label>
                              </div>
                              <div className="custom-control custom-radio ms-1 custom-control-inline">
                                <input
                                  type="radio"
                                  id="g_female"
                                  value="Female"
                                  name="gender"
                                  className="form-check-input"
                                  defaultChecked={formData.gender === "Female"}
                                  onChange={handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="g_female"
                                >
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <span className="text-danger">*</span>
                        <textarea
                          className="form-control"
                          rows={3}
                          name="address"
                          cols={50}
                          id="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card em-card">
                    <div className="card-header">
                      <h5>Company Detail</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <input type="hidden" name="_token" autoComplete="off" />
                        <div className="form-group">
                          <label htmlFor="employee_id" className="form-label">
                            Employee ID
                          </label>
                          <input
                            className="form-control"
                            disabled="disabled"
                            name="employee_id"
                            type="text"
                            value={employee.id}
                            id="employee_id"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="branch_id" className="form-label">
                            Branch
                          </label>
                          <span className="text-danger">*</span>
                          <select
                            className="form-control"
                            required="required"
                            id="branch_id"
                            name="branchId"
                            value={formData.branchId}
                            onChange={handleChange}
                          >
                            <option value="">Select Branch</option>
                            {branches.map((branch) => (
                              <option key={branch._id} value={branch._id}>
                                {branch.branchName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="department_id" className="form-label">
                            Select Department
                          </label>
                          <span className="text-danger">*</span>
                          <div className="department_div">
                            <select
                              className="form-control select department_id"
                              name="departmentId"
                              id="department_id"
                              placeholder="Select Department"
                              required=""
                              value={formData.departmentId}
                              onChange={handleChange}
                            >
                              <option value="">Select any Department</option>
                              {departments.map((department) => (
                                <option
                                  key={department._id}
                                  value={department._id}
                                >
                                  {department.departmentName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="designation_id"
                            className="form-label"
                          >
                            Designation
                          </label>
                          <span className="text-danger">*</span>
                          <div className="form-icon-user">
                            <div className="designation_div">
                              <select
                                className="form-control designation_id"
                                name="designationId"
                                placeholder="Select Designation"
                                required=""
                                value={formData.designationId}
                                onChange={handleChange}
                              >
                                <option value="">Select any Designation</option>
                                {designations.map((designation) => (
                                  <option
                                    key={designation._id}
                                    value={designation._id}
                                  >
                                    {designation.designationName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="company_doj" className="form-label">
                            Company Date Of Joining
                          </label>
                          <span className="text-danger">*</span>
                          <input
                            className="form-control"
                            required
                            autoComplete="off"
                            placeholder="Select Date of Birth"
                            name="dateOfJoining"
                            type="date"
                            id="dateOfJoining"
                            value={formData.dateOfJoining}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 ">
                  <div className="card em-card ">
                    <div className="card-header">
                      <h5>Document</h5>
                    </div>
                    <div className="card-body employee-detail-create-body">
                      <div className="row">
                        <div className="form-group col-12 d-flex">
                          <div className="float-left col-4">
                            <label
                              htmlFor="document"
                              className="float-left pt-1 form-label"
                            >
                              Certificate
                            </label>
                          </div>
                          <div className="float-right col-8">
                            <input type="hidden" defaultValue={3} />
                            <div className="choose-files">
                              <label htmlFor="employeeCertificateUrl">
                                <div className="bg-primary document">
                                  <i className="ti ti-upload px-1" />
                                  Choose file here
                                </div>
                                <input
                                  type="file"
                                  name="employeeCertificateUrl"
                                  id="employeeCertificateUrl"
                                  accept=".pdf"
                                  className="d-none"
                                  onChange={handleFileChange}
                                />
                              </label>
                              <img
                                id="certificatePreview"
                                src={certificatePreview}
                                alt="Selected"
                                width="50%"
                                style={{
                                  display: certificatePreview
                                    ? "block"
                                    : "none",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-12 d-flex">
                          <div className="float-left col-4">
                            <label
                              htmlFor="document"
                              className="float-left pt-1 form-label"
                            >
                              Resume
                            </label>
                          </div>
                          <div className="float-right col-8">
                            <input type="hidden" defaultValue={3} />
                            <div className="choose-files">
                              <label htmlFor="employeeResumeUrl">
                                <div className="bg-primary document">
                                  <i className="ti ti-upload px-1" />
                                  Choose file here
                                </div>
                                <input
                                  type="file"
                                  name="employeeResumeUrl"
                                  id="employeeResumeUrl"
                                  accept=".pdf"
                                  className="d-none"
                                  onChange={handleFileChange}
                                />
                              </label>
                              <img
                                id="resumePreview"
                                src={resumePreview}
                                alt="Selected"
                                width="50%"
                                style={{
                                  display: resumePreview ? "block" : "none",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-12 d-flex">
                          <div className="float-left col-4">
                            <label
                              htmlFor="document"
                              className="float-left pt-1 form-label"
                            >
                              Photo
                            </label>
                          </div>
                          <div className="float-right col-8">
                            <input type="hidden" defaultValue={3} />
                            <div className="choose-files">
                              <label htmlFor="employeePhotoUrl">
                                <div className="bg-primary document">
                                  <i className="ti ti-upload px-1" />
                                  Choose file here
                                </div>
                                <input
                                  type="file"
                                  name="employeePhotoUrl"
                                  id="employeePhotoUrl"
                                  accept="image/*"
                                  className="d-none"
                                  onChange={handleFileChange}
                                />
                              </label>
                              <img
                                id="imagePreview"
                                src={imagePreview}
                                alt="Selected"
                                width="50%"
                                style={{
                                  display: imagePreview ? "block" : "none",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card em-card ">
                    <div className="card-header">
                      <h5>Bank Account Detail</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="account_holder_name"
                            className="form-label"
                          >
                            Account Holder Name
                          </label>
                          <input
                            className="form-control"
                            name="accountHolderName"
                            type="text"
                            value={formData.accountHolderName}
                            id="accountHolderName"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="account_number"
                            className="form-label"
                          >
                            Account Number
                          </label>
                          <input
                            className="form-control"
                            name="accountNumber"
                            type="number"
                            value={formData.accountNumber}
                            id="accountNumber"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="bank_name" className="form-label">
                            Bank Name
                          </label>
                          <input
                            className="form-control"
                            name="bankName"
                            type="text"
                            value={formData.bankName}
                            id="bankName"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="bank_identifier_code"
                            className="form-label"
                          >
                            Bank Identifier Code
                          </label>
                          <input
                            className="form-control"
                            name="bankIdentifierCode"
                            type="text"
                            value={formData.bankIdentifierCode}
                            id="bankIdentifierCode"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="branch_location"
                            className="form-label"
                          >
                            Branch Location
                          </label>
                          <input
                            className="form-control"
                            name="branchLocation"
                            type="text"
                            value={formData.branchLocation}
                            id="branchLocation"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="tax_payer_id" className="form-label">
                            Tax Payer Id
                          </label>
                          <input
                            className="form-control"
                            name="taxPayerId"
                            type="text"
                            value={formData.taxPayerId}
                            id="taxPayerId"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="float-end">
                <Link className="btn btn-secondary btn-submit" to="">
                  Cancel
                </Link>
                <button
                  className="btn btn-primary btn-submit ms-1"
                  type="submit"
                  id="submit"
                >
                  Update
                </button>
              </div>
              <div className="col-12"></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
