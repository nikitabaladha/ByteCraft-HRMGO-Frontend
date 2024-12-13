import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getAPI from "../../../../api/getAPI";
import postAPI from "../../../../api/postAPI";
import { toast } from "react-toastify";

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateOfBirth: new Date().toISOString().split("T")[0],
    gender: "Male",
    email: "",
    password: "",
    address: "",
    dateOfJoining: new Date().toISOString().split("T")[0],
    branchId: "",
    departmentId: "",
    designationId: "",
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    bankIdentifierCode: "",
    branchLocation: "",
    taxPayerId: "",
  });

  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [employeePhoto, setEmployeePhoto] = useState(null);
  const [employeeCertificate, setEmployeeCertificate] = useState(null);
  const [employeeResume, setEmployeeResume] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "employeePhotoUrl") setEmployeePhoto(files[0]);
    if (name === "employeeCertificateUrl") setEmployeeCertificate(files[0]);
    if (name === "employeeResumeUrl") setEmployeeResume(files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e, name) => {
    setFormData((prevData) => ({ ...prevData, [name]: e.target.value }));
  };

  // Fetch Branches
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

  // Handle Branch Change and Fetch Departments
  const handleBranchChange = async (e) => {
    const branchId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      branchId,
      departmentId: "",
      designationId: "",
    }));
    setDepartments([]);
    setDesignations([]);

    if (branchId) {
      try {
        const response = await getAPI(
          `/department-get-all-by-branch-id?branchId=${branchId}`,
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
    }
  };

  // Handle Department Change and Fetch Designations
  const handleDepartmentChange = async (e) => {
    const departmentId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      departmentId,
      designationId: "",
    }));
    setDesignations([]);

    if (departmentId) {
      try {
        const response = await getAPI(
          `/designation-get-all-by-department-id?departmentId=${departmentId}`,
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
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      dataToSubmit.append(key, formData[key]);
    });

    if (employeePhoto) dataToSubmit.append("employeePhotoUrl", employeePhoto);
    if (employeeCertificate)
      dataToSubmit.append("employeeCertificateUrl", employeeCertificate);
    if (employeeResume)
      dataToSubmit.append("employeeResumeUrl", employeeResume);

    for (let [key, value] of dataToSubmit.entries()) {
      console.log(key, value instanceof File ? value.name : value);
    }

    try {
      const response = await postAPI("/employee", dataToSubmit, {
        "Content-Type": "multipart/form-data",
      });

      if (!response.hasError) {
        toast.success("Employee created successfully!");
        setFormData({
          name: "",
          phone: "",
          dateOfBirth: new Date().toISOString().split("T")[0],
          gender: "Male",
          email: "",
          password: "",
          address: "",
          dateOfJoining: new Date().toISOString().split("T")[0],
          branchId: "",
          departmentId: "",
          designationId: "",
          accountHolderName: "",
          accountNumber: "",
          bankName: "",
          bankIdentifierCode: "",
          branchLocation: "",
          taxPayerId: "",
        });
        setEmployeePhoto(null);
        setEmployeeCertificate(null);
        setEmployeeResume(null);
      } else {
        toast.error(response.message || "Failed to create Employee.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Create Employee</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link>Employee</Link>
                </li>
                <li className="breadcrumb-item">Create Employee</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <form
        method="POST"
        acceptCharset="UTF-8"
        encType="multipart/form-data"
        className="needs-validation"
        noValidate=""
        onSubmit={handleSubmit}
      >
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
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      required
                      placeholder="Enter employee Name"
                      name="name"
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter employee phone"
                        pattern="^\+\d{1,3}\d{9,13}$"
                        id="phone"
                        required
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <div className="text-xs text-danger">
                        Please use with country code. (ex. +91)
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="dateOf" className="form-label">
                        Date of Birth <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        required
                        autoComplete="off"
                        placeholder="Select Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleDateChange(e, "dateOfBirth")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="gender" className="form-label">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <div className="d-flex radio-check">
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="g_male"
                            value="Male"
                            name="gender"
                            className="form-check-input"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="g_male">
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
                            checked={formData.gender === "Female"}
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
                  <div className="form-group col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      required
                      placeholder="Enter employee email"
                      name="email"
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="password" className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      required
                      placeholder="Enter employee password"
                      name="password"
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="address" className="form-label">
                      Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      required
                      placeholder="Enter employee address"
                      name="address"
                      rows="3"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>
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
                  <div className="form-group col-md-6">
                    <label htmlFor="branch" className="form-label">
                      Branch <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control select"
                      id="branch_id"
                      name="branchId"
                      value={formData.branchId}
                      onChange={handleBranchChange}
                    >
                      <option value="">All</option>
                      {branches.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                          {branch.branchName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="department" className="form-label">
                      Department <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control select"
                      id="department_id"
                      name="departmentId"
                      value={formData.departmentId}
                      onChange={handleDepartmentChange}
                    >
                      <option value="">Select Department</option>
                      {departments.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.departmentName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="designation" className="form-label">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control select"
                      id="designation_id"
                      name="designationId"
                      value={formData.designationId}
                      onChange={handleChange}s
                    >
                      <option value="">Select Designation</option>
                      {designations.map((designation) => (
                        <option key={designation._id} value={designation._id}>
                          {designation.designationName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="company_doj" className="form-label">
                        Company Date Of Joining{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        required
                        autoComplete="off"
                        placeholder="Select Company Date of Joining"
                        name="company_doj"
                        type="date"
                        id="company_doj"
                        value={formData.dateOfJoining}
                        onChange={(e) => handleDateChange(e, "dateOfJoining")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {" "}
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
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="float-right col-8">
                      <input
                        type="file"
                        name="employeeCertificateUrl"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                      {/* <div className="choose-files ">
                        <label htmlFor="document[1]">
                          <div className=" bg-primary document ">
                            {" "}
                            <i className="ti ti-upload px-1" />
                            Choose file here
                          </div>
                          <input
                            type="file"
                            className="form-control file  d-none "
                            required=""
                            name="document[1]"
                            id="document[1]"
                            data-filename="1_filename"
                            onchange="document.getElementById('blah0').src = window.URL.createObjectURL(this.files[0])"
                          />
                        </label>
                        <img id="blah0" src="" width="50%" />
                      </div> */}
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
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="float-right col-8">
                      <input
                        type="file"
                        name="employeeResumeUrl"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                      {/* <div className="choose-files ">
                        <label htmlFor="document[2]">
                          <div className=" bg-primary document ">
                            {" "}
                            <i className="ti ti-upload px-1" />
                            Choose file here
                          </div>
                          <input
                            type="file"
                            className="form-control file  d-none "
                            required=""
                            name="document[2]"
                            id="document[2]"
                            data-filename="2_filename"
                            onchange="document.getElementById('blah1').src = window.URL.createObjectURL(this.files[0])"
                          />
                        </label>
                        <img id="blah1" src="" width="50%" />
                      </div> */}
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
                      <input
                        type="file"
                        name="employeePhotoUrl"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {/* <div className="choose-files ">
                        <label htmlFor="document[3]">
                          <div className=" bg-primary document ">
                            {" "}
                            <i className="ti ti-upload px-1" />
                            Choose file here
                          </div>
                          <input
                            type="file"
                            className="form-control file  d-none "
                            name="document[3]"
                            id="document[3]"
                            data-filename="3_filename"
                            onchange="document.getElementById('blah2').src = window.URL.createObjectURL(this.files[0])"
                          />
                        </label>
                        <img id="blah2" src="" width="50%" />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="card em-card">
              <div className="card-header">
                <h5>Bank Account Detail</h5>
              </div>
              <div className="card-body employee-detail-create-body">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="account_holder_name" className="form-label">
                      Account Holder Name
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter Account Holder Name"
                      name="accountHolderName"
                      type="text"
                      id="account_holder_name"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="account_number" className="form-label">
                      Account Number
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter Account Number"
                      name="accountNumber"
                      type="number"
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="bank_name" className="form-label">
                      Bank Name
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter Bank Name"
                      name="bankName"
                      type="text"
                      id="bank_name"
                      value={formData.bankName}
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
                      placeholder="Enter Bank Identifier Code"
                      name="bankIdentifierCode"
                      type="text"
                      id="bank_identifier_code"
                      value={formData.bankIdentifierCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="branch_location" className="form-label">
                      Branch Location
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter Branch Location"
                      name="branchLocation"
                      type="text"
                      id="branch_location"
                      value={formData.branchLocation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="tax_payer_id" className="form-label">
                      Tax Payer Id
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter Tax Payer Id"
                      name="taxPayerId"
                      type="text"
                      id="tax_payer_id"
                      value={formData.taxPayerId}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 text-end">
            <Link to="/employee" className="btn btn-secondary me-2">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateEmployee;
