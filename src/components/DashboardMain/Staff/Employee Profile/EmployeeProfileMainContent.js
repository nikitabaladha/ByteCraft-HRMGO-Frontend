import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeProfileMainContent = () => {
  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="multi-collapse mt-2 collapse" id="multiCollapseExample1">
            <div className="card">
              <div className="card-body">
                <form method="GET" action="https://demo.workdo.io/hrmgo/employee-profile" acceptCharset="UTF-8" id="employee_profile_filter">
                  <div className="row align-items-center justify-content-end">
                    <div className="col-xl-10">
                      <div className="row">
                        <div className="col-xl-4 col-lg-3 col-md-6 col-sm-12 col-12">
                          <div className="btn-box">
                            <label htmlFor="branch_id" className="form-label">Select Branch</label><span className="text-danger">*</span>
                            <select className="form-control" id="branch_id" name="branch_id">
                              <option selected="selected" value="">Select Branch</option>
                              <option value="1">China</option>
                              <option value="2">India</option>
                              <option value="3">Canada</option>
                              <option value="4">Greece</option>
                              <option value="5">Italy</option>
                              <option value="6">Japan</option>
                              <option value="7">Malaysia</option>
                              <option value="8">France</option>
                              <option value="9">aseam</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-3 col-md-6 col-sm-12 col-12">
                          <div className="btn-box">
                            <label htmlFor="department_id" className="form-label">Select Department</label><span className="text-danger">*</span>
                            <select className="form-control" id="department_id" name="department_id">
                              <option selected="selected" value="">Select Department</option>
                              <option value="1">Financials</option>
                              <option value="2">Industrials</option>
                              <option value="3">Health care</option>
                              <option value="4">Telecommunications</option>
                              <option value="5">Financials</option>
                              <option value="6">Technology</option>
                              <option value="7">Technology</option>
                              <option value="8">Sales Department</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-3 col-md-6 col-sm-12 col-12">
                          <div className="btn-box">
                            <label htmlFor="designation_id" className="form-label">Select Designation</label><span className="text-danger">*</span>
                            <select className="form-control" id="designation_id" required name="designation_id">
                              <option selected="selected" value="">Select Designation</option>
                              <option value="1">Chartered</option>
                              <option value="2">Manager</option>
                              <option value="3">CEO</option>
                              <option value="4">Developers</option>
                              <option value="5">Telecom Specialist</option>
                              <option value="6">Finance Manager</option>
                              <option value="7">Developers</option>
                              <option value="8">Sales Manager</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="row">
                        <div className="col-auto mt-4">
                          <Link href="#" className="btn btn-sm btn-primary" onClick={() => document.getElementById('employee_profile_filter').submit()} data-bs-toggle="tooltip" title="Apply">
                            <span className="btn-inner--icon"><i className="ti ti-search"></i></span>
                          </Link>
                          <Link href="https://demo.workdo.io/hrmgo/employee-profile" className="btn btn-sm btn-danger" data-bs-toggle="tooltip" title="Reset">
                            <span className="btn-inner--icon"><i className="ti ti-refresh text-white-off"></i></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Profile Cards */}
        {[
          { id: 1, name: "Julie Lynn", role: "Manager", image: "user-1.jpg", empId: "EMP0000001" },
          { id: 11, name: "Aida Bugg", role: "Telecom Specialist", image: "user-11.jpg", empId: "EMP0000010" },
          { id: 20, name: "Abra Stevens", role: "Chartered", image: "avatar.png", empId: "EMP0000013" }
        ].map((employee) => (
          <div className="col-xl-3" key={employee.id}>
            <div className="card text-center">
              <div className="card-header border-0 pb-0">
                <div className="card-header-right">
                  <div className="btn-group card-option">
                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="feather icon-more-vertical"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a href={`https://demo.workdo.io/hrmgo/employee/${employee.id}/edit`} className="dropdown-item">
                        <i className="ti ti-edit"></i><span className="ms-2">Edit</span>
                      </a>
                      <form method="POST" action={`https://demo.workdo.io/hrmgo/employee/${employee.id}`} id={`delete-form-${employee.id}`}>
                        <input name="_method" type="hidden" value="DELETE" />
                        <input name="_token" type="hidden" value="7KxJdcoIHQlEdJJ9PrCozLfh8uLi4FDlXElAV8ky" />
                        <Link href="#" className="bs-pass-para dropdown-item" data-confirm="Are You Sure?" data-text="This action cannot be undone." data-confirm-yes={`delete-form-${employee.id}`} title="Delete">
                          <i className="ti ti-trash"></i><span className="ms-2">Delete</span>
                        </Link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="avatar">
                  <Link href={`https://demo.workdo.io/hrmgo/storage/uploads/avatar/${employee.image}`} target="_blank">
                    <img src={`https://demo.workdo.io/hrmgo/storage/uploads/avatar/${employee.image}`} className="img-fluid rounded border-2 border border-primary" width="120px" style={{ height: "120px" }} alt="Employee Profile" />
                    
                  </Link>
                </div>
                <h4 className="mt-2 text-primary">{employee.name}</h4>
                <small className="">{employee.role}</small>
                <div className="row mt-2">
                  <div className="col-12 col-sm-12">
                    <div className="d-grid">
                      <a className="btn btn-outline-primary mx-5" href={`https://demo.workdo.io/hrmgo/employee/${employee.id}`}>
                        #{employee.empId}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EmployeeProfileMainContent;
