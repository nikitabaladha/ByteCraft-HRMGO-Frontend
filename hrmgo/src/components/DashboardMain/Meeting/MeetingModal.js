import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAPI from "../../../api/getAPI.js";
import postAPI from "../../../api/postAPI.js";

const MeetingModal = ({ onClose,fetchMeetings }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");



  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await getAPI("/branch-get-all", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setBranches(response.data.data);
        } else {
          toast.error("Failed to load branches.");
        }
      } catch (err) {
        toast.error("Error fetching branches.");
      }
    };
    fetchBranches();
  }, []);

  const handleBranchChange = async (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);
    setSelectedDepartments([]);
    setDepartments([]);
    setEmployees([]);

    if (branchId) {
      try {
        const response = await getAPI(
          `/department-get-all-by-branch-id?branchId=${branchId}`,
          {},
          true
        );
        if (!response.hasError && Array.isArray(response.data.data)) {
          setDepartments(response.data.data);
        } else {
          toast.error("Failed to load departments.");
        }
      } catch (err) {
        toast.error("Error fetching departments.");
      }
    }
  };

  const handleDepartmentChange = async (selectedOptions) => {
    setSelectedDepartments(selectedOptions.map((option) => option.value));
    setEmployees([]);

    if (selectedOptions.length) {
      try {
        const response = await getAPI(
          `/employee-get-by-branch-department?branchId=${selectedBranch}&departmentId=${selectedOptions.map(
            (opt) => opt.value
          ).join(",")}`,
          {},
          true
        );
        if (!response.hasError && Array.isArray(response.data.data)) {
          const formattedEmployees = response.data.data.map((employee) => ({
            value: employee._id,
            label: employee.name,
          }));
          setEmployees(formattedEmployees);
        } else {
          toast.error("Failed to load employees.");
        }
      } catch (err) {
        toast.error("Employees not found.");
      }
    }
  };


const handleEmployeeChange = (selectedOptions) => {
  const selectAllOption = selectedOptions.find((opt) => opt.value === "all");

  if (selectAllOption) {

    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map((emp) => emp.value));
    }
  } else {
    setSelectedEmployees(selectedOptions.map((option) => option.value));
  }
};


const employeeOptions = [
  { value: "all", label: "Select All" },
  ...employees,
];

  const handleSubmit = async (e) => {
    e.preventDefault();


    const meetingData = {
      title,
      branchId: selectedBranch,
      departmentId: selectedDepartments,
      employeeIds: selectedEmployees,
      date,
      time,
      note,
    };

    try {
      const response = await postAPI("/create_meeting", meetingData, true);
      if (!response.hasError) {
        toast.success("Meeting created successfully.");
      
        setTitle("");
        setSelectedBranch("");
        setSelectedDepartments([]);
        setSelectedEmployees([]);
        setDate("");
        setTime("");
        setNote("");
        onClose();
        fetchMeetings();
      } else {
        toast.error(`Failed to create meeting: ${response.message}`);
      }
    } catch (err) {
      toast.error("An error occurred while creating the meeting.");
    } 
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="meetingModalLabel"
      aria-modal="true"
      style={{
        display: "block",
        paddingLeft: "0px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1040,
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="meetingModalLabel">
              Create New Meeting
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                {/* Branch Input */}
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="branch_id" className="form-label">
                      Branch <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      id="branch_id"
                      required
                      value={selectedBranch}
                      onChange={handleBranchChange}
                    >
                      <option value="">Select Branch</option>
                      {branches.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                          {branch.branchName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Department Input (Multiple Select) */}
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="department_id" className="form-label">
                      Departments <span className="text-danger">*</span>
                    </label>
                    <Select
                      isMulti
                      options={departments.map((department) => ({
                        value: department._id,
                        label: department.departmentName,
                      }))}
                      value={departments
                        .filter((department) =>
                          selectedDepartments.includes(department._id)
                        )
                        .map((department) => ({
                          value: department._id,
                          label: department.departmentName,
                        }))}
                      onChange={handleDepartmentChange}
                      placeholder="Select Departments"
                      styles={{
                        control: (provided,state) => ({
                          ...provided,
                           borderRadius: '6px',
                           height: '42px',
                           borderColor: state.isFocused ? '#51459D' : '#ccc',
                           outline: 'none', // Removing the blue outline
                           boxShadow: state.isFocused ? '0 0 0 1px #51459D' : 'none', 
                           '&:hover': {
                             borderColor: state.isFocused ? '#51459D' : '#ccc', 
                           },
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          backgroundColor: '#51459D', 
                          borderColor: '#51459D',
                          borderRadius: '6px',
                          color: '#ffffff', 
                        }),
                        multiValue: (provided) => ({
                          ...provided,
                          backgroundColor: '#51459D', 
                          color: '#ffffff', 
                        }),
                        multiValueLabel: (provided) => ({
                          ...provided,
                          color: '#ffffff', 
                        }),
                        multiValueRemove: (provided) => ({
                          ...provided,
                          color: '#ffffff', 
                        }),

                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected ? '#51459D' : 'transparent',
                          color: state.isSelected ? '#fff' : 'black',
                          paddingRight: '20px',
                          position: 'relative',
                          ':hover': {
                            backgroundColor: 'rgba(81, 69, 157, 0.1)',
                            
                          },
                          borderRight: '2px solid #ccc',
                          ':after': {
                            content: state.isSelected ? '""' : '"Press to select"',
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '12px',
                            color: state.isSelected ? 'transparent' : '#aaa',
                            
                          },
                        }),
                      }}
                    />
                  </div>
                </div>

                {/* Employee Input */}
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="employee_id" className="form-label">
                      Employee
                    </label>
                    <Select
                      isMulti
                      options={employeeOptions}
                      value={employeeOptions.filter((opt) =>
                        selectedEmployees.includes(opt.value)
                      )}
                      onChange={handleEmployeeChange}
                      placeholder="Select Employees"
                      styles={{
                        control: (provided,state) => ({
                          ...provided,
                           borderRadius: '6px',
                           height: '42px',
                           borderColor: state.isFocused ? '#51459D' : '#ccc',
                           outline: 'none', // Removing the blue outline
                           boxShadow: state.isFocused ? '0 0 0 1px #51459D' : 'none', 
                           '&:hover': {
                            borderColor: state.isFocused ? '#51459D' : '#ccc', 
                           },
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          backgroundColor: '#51459D', 
                          borderColor: '#51459D',
                          borderRadius: '6px',
                          color: '#ffffff', 
                        }),
                        multiValue: (provided) => ({
                          ...provided,
                          backgroundColor: '#51459D', 
                          color: '#ffffff', 
                        }),
                        multiValueLabel: (provided) => ({
                          ...provided,
                          color: '#ffffff', 
                        }),
                        multiValueRemove: (provided) => ({
                          ...provided,
                          color: '#ffffff', 
                        }),

                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected ? '#51459D' : 'transparent',
                          color: state.isSelected ? '#fff' : 'black',
                          paddingRight: '20px',
                          position: 'relative',
                          ':hover': {
                            backgroundColor: 'rgba(81, 69, 157, 0.1)',
                            
                          },
                          borderRight: '2px solid #ccc',
                          ':after': {
                            content: state.isSelected ? '""' : '"Press to select"',
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '12px',
                            color: state.isSelected ? 'transparent' : '#aaa',
                          },
                        }),
                      }}
                    />
                  </div>
                </div>

                {/* Meeting Details */}
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      Meeting Title <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      required
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                {/* Date and Time Inputs */}
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="date" className="form-label">
                      Meeting Date <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="time" className="form-label">
                      Meeting Time <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>

                {/* Note Input */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="note" className="form-label">
                      Meeting Note
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>

                {/* Synchronize to Google Calendar */}
                <div className="form-group col-md-6">
                  <label htmlFor="synchronize_type" className="form-label">
                    Synchronize in Google Calendar?
                  </label>
                  <div className="form-switch">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      name="synchronize_type"
                      id="switch-shadow"
                      value="google_calendar"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MeetingModal;

// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import getAPI from "../../../api/getAPI.js";
// import postAPI from "../../../api/postAPI.js";

// const MeetingModal = ({ onClose }) => {
//   const [branches, setBranches] = useState([]);
//   const [selectedBranch, setSelectedBranch] = useState("");
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [note, setNote] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch branches on component mount
//   useEffect(() => {
//     const fetchBranches = async () => {
//       try {
//         const response = await getAPI(`/branch-get-all`, {}, true);
//         if (!response.hasError && Array.isArray(response.data.data)) {
//           setBranches(response.data.data);
//         } else {
//           toast.error("Failed to load branches.");
//         }
//       } catch (err) {
//         toast.error("Error fetching branches.");
//       }
//     };
//     fetchBranches();
//   }, []);

//   const handleBranchChange = async (e) => {
//     const branchId = e.target.value;
//     setSelectedBranch(branchId);
//     setSelectedDepartment("");
//     setDepartments([]);
//     setEmployees([]);

//     if (branchId) {
//       try {
//         const response = await getAPI(
//           `/department-get-all-by-branch-id?branchId=${branchId}`,
//           {},
//           true
//         );
//         if (!response.hasError && Array.isArray(response.data.data)) {
//           setDepartments(response.data.data);
//         } else {
//           toast.error("Failed to load departments.");
//         }
//       } catch (err) {
//         toast.error("Error fetching departments.");
//       }
//     }
//   };

//   const handleDepartmentChange = async (e) => {
//     const departmentId = e.target.value;
//     setSelectedDepartment(departmentId);
//     setEmployees([]);

//     if (departmentId) {
//       try {
//         const response = await getAPI(
//           `/employee-get-by-branch-department?branchId=${selectedBranch}&departmentId=${departmentId}`,
//           {},
//           true
//         );
//         if (!response.hasError && Array.isArray(response.data.data)) {
//           const formattedEmployees = response.data.data.map((employee) => ({
//             value: employee._id,
//             label: employee.name,
//           }));
//           setEmployees(formattedEmployees);
//         } else {
//           toast.error("Failed to load employees.");
//         }
//       } catch (err) {
//         toast.error("Employees not found.");
//       }
//     }
//   };

//   const handleEmployeeChange = (selectedOptions) => {
//     setSelectedEmployees(selectedOptions.map((option) => option.value));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const meetingData = {
//       title,
//       branchId: selectedBranch,
//       departmentId: selectedDepartment,
//       employeeIds: selectedEmployees,
//       date,
//       time,
//       note,
//     };

//     try {
//       const response = await postAPI("/create_meeting", meetingData, true);
//       if (!response.hasError) {
//         toast.success("Meeting created successfully.");
//         // Reset the form fields
//         setTitle("");
//         setSelectedBranch("");
//         setSelectedDepartment("");
//         setSelectedEmployees([]);
//         setDate("");
//         setTime("");
//         setNote("");
//         onClose();
//       } else {
//         toast.error(`Failed to create meeting: ${response.message}`);
//       }
//     } catch (err) {
//       toast.error("An error occurred while creating the meeting.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="modal fade show"
//       tabIndex="-1"
//       role="dialog"
//       aria-labelledby="meetingModalLabel"
//       aria-modal="true"
//       style={{
//         display: "block",
//         paddingLeft: "0px",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         zIndex: 1040,
//       }}
//     >
//       <div className="modal-dialog modal-lg" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="meetingModalLabel">
//               Create New Meeting
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               aria-label="Close"
//               onClick={onClose}
//             ></button>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="modal-body">
//               <div className="row">
//                 {/* Branch Input */}
//                 <div className="col-lg-6 col-md-6 col-sm-6">
//                   <div className="form-group">
//                     <label htmlFor="branch_id" className="form-label">
//                       Branch <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       className="form-control"
//                       id="branch_id"
//                       required
//                       value={selectedBranch}
//                       onChange={handleBranchChange}
//                     >
//                       <option value="">Select Branch</option>
//                       {branches.map((branch) => (
//                         <option key={branch._id} value={branch._id}>
//                           {branch.branchName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Department Input */}
//                 <div className="col-lg-6 col-md-6 col-sm-6">
//                   <div className="form-group">
//                     <label htmlFor="department_id" className="form-label">
//                       Department <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       className="form-control"
//                       id="department_id"
//                       required
//                       value={selectedDepartment}
//                       onChange={handleDepartmentChange}
//                     >
//                       <option value="">Select Department</option>
//                       {departments.map((department) => (
//                         <option key={department._id} value={department._id}>
//                           {department.departmentName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Employee Input */}
//                 <div className="col-lg-6 col-md-6 col-sm-6">
//                   <div className="form-group">
//                     <label htmlFor="employee_id" className="form-label">
//                       Employee
//                     </label>
//                     <Select
//                       isMulti
//                       options={employees}
//                       value={employees.filter((opt) =>
//                         selectedEmployees.includes(opt.value)
//                       )}
//                       onChange={handleEmployeeChange}
//                       placeholder="Select Employees"
//                     />
//                   </div>
//                 </div>

//                 {/* Meeting Details */}
//                 <div className="col-lg-6 col-md-6 col-sm-6">
//                   <div className="form-group">
//                     <label htmlFor="title" className="form-label">
//                       Meeting Title <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       className="form-control"
//                       required
//                       id="title"
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 {/* Date and Time Inputs */}
//                 <div className="col-lg-6 col-md-6 col-sm-6">
//                   <div className="form-group">
//                     <label htmlFor="date" className="form-label">
//                       Meeting Date <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       className="form-control"
//                       type="date"
//                       required
//                       value={date}
//                       onChange={(e) => setDate(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-md-6 col-sm-6">
//                   <div className="form-group">
//                     <label htmlFor="time" className="form-label">
//                       Meeting Time <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       className="form-control"
//                       type="time"
//                       required
//                       value={time}
//                       onChange={(e) => setTime(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 {/* Note Input */}
//                 <div className="col-lg-12">
//                   <div className="form-group">
//                     <label htmlFor="note" className="form-label">
//                       Meeting Note
//                     </label>
//                     <textarea
//                       className="form-control"
//                       rows="3"
//                       value={note}
//                       onChange={(e) => setNote(e.target.value)}
//                     />
//                   </div>
//                 </div>
      
    

//             <div className="form-group col-md-6">
//               <label htmlFor="synchronize_type" className="form-label">
//                 Synchronize in Google Calendar?
//               </label>
//               <div className="form-switch">
//                 <input
//                   type="checkbox"
//                   className="form-check-input mt-2"
//                   name="synchronize_type"
//                   id="switch-shadow"
//                   value="google_calendar"
//                 />
//               </div>
//             </div>
//            </div>
//            </div>
//             {/* Modal Footer */}
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={onClose}>
//                 Close
//               </button>
//               <button type="submit" className="btn btn-primary" disabled={loading}>
//                 {loading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default MeetingModal;

