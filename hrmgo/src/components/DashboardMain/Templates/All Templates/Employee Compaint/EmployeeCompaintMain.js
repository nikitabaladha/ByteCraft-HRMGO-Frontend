import React, { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EmployeeCompaintMain = () => {
  const [formData, setFormData] = useState({
    mail_from_name: "",
    subject: "Employee Complaints",
    content: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getAPI("/get-email-settings");
        const mappedData = {
          mail_from_name: response.data.mailFromName || "",
        };
        setFormData(mappedData);
      } catch (err) {
        toast.error("Error fetching email settings:", err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  useEffect(() => {
    const fetchNewUserContent = async () => {
      try {
        const response = await getAPI("/get-employee-complaint-content");
        const mappedData = {
          // mail_from_name: response.data.mailFromName || "",
          subject: response.data.subject || "Employee Complaints",
          content: response.data.content || "",
        };
        setFormData(mappedData);
      } catch (err) {
        toast.error("Error fetching email settings:", err);
      }
    };
    fetchNewUserContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postAPI("/employee-compaint-content", formData);
      toast.success("Template Saved Successfully!");
    } catch (err) {
      toast.error("Failed To Save Template.");
    }
  };
return (
  <>
       <div className="row">
         <div className="mb-5">
           <div className="row invoice-row">
             {/* Left Side Form */}
             <div className="col-md-4 col-12">
               <div className="card mb-0 h-100">
                 <div className="card-header card-body">
                   <h5>Email Template</h5>
                   <form>
                     <div className="row">
                       <div className="form-group col-md-12">
                         <label
                           htmlFor="name"
                           className="col-form-label text-dark"
                         >
                           Name
                         </label>
                         <input
                           className="form-control font-style"
                           disabled
                           name="name"
                           type="text"
                           value="Employee Complaints"
                           id="name"
                         />
                       </div>
                       <div className="form-group col-md-12">
                         <label
                           htmlFor="from"
                           className="col-form-label text-dark"
                         >
                           From
                         </label>
                         <input
                           className="form-control font-style"
                           required
                           placeholder="Enter From Name"
                           // name="from"
                           type="text"
                           // id="from"
                           // value={fromName}
                           // onChange={(e) => setFromName(e.target.value)}
                           name="mail_from_name"
                           // type={showData.mail_from_address ? "text" : "password"}
                           value={formData.mail_from_name}
                           onChange={handleChange}
                           id="mail_from_name"
                         />
                       </div>
                       {/* <div className="col-12 text-end">
                         <button type="submit" className="btn btn-primary">
                           Save
                         </button>
                       </div> */}
                     </div>
                   </form>
                 </div>
               </div>
             </div>
 
             {/* Right Side Variables */}
             {/* <div className="col-md-8 col-12" > */}
             <div className="col-md-8 col-12 mt-3 mt-md-0">
               <div className="card mb-0 h-100">
                 <div className="card-header card-body">
                   <h6 className="font-weight-bold mb-4">Variables</h6>
                   <div className="row">
                     <p className="col-6">
                       App Name:{" "}
                       <span className="text-primary">{`{app_name}`}</span>
                     </p>
                     <p className="col-6">
                       Company Name:{" "}
                       <span className="text-primary">{`{company_name}`}</span>
                     </p>
                     {/* <p className="col-6">
                       App Url:{" "}
                       <span className="text-primary">{`{app_url}`}</span>
                     </p> */}
                     <p className="col-6">
                       Employee Name:{" "}
                       <span className="text-primary">{`{employee_complaints_name}`}</span>
                     </p>
                     {/* <p className="col-6">
                       Last Working Date:{" "}
                       <span className="text-primary">{`{Complaints_date}`}</span>
                     </p>
                     <p className="col-6">
                       Complaints Date:{" "}
                       <span className="text-primary">{`{notice_date}`}</span>
                     </p> */}
                     {/* <p className="col-6">
                       Transfer Branch:{" "}
                       <span className="text-primary">{`{transfer_branch}`}</span>
                     </p>
                     <p className="col-6">
                       Transfer Description:{" "}
                       <span className="text-primary">{`{transfer_description}`}</span>
                     </p> */}
                     {/* <p className="col-6">
                                   Employee Designation:{" "}
                                   <span className="text-primary">{`{employee_designation}`}</span>
                                 </p>  */}
                   </div>
                 </div>
               </div>
             </div>
 
             {/* Language Sidebar */}
             <div className="col-12">
               {/* <h5>Language Options</h5> */}
               <div className="row">
                 {/* Email Template Form */}
                 <div className="col-lg-12">
                   <div className="card h-100 p-3" style={{ marginTop: "24px" }}>
                     <form onSubmit={handleSubmit}>
                       <div className="form-group col-12">
                         <label
                           htmlFor="subject"
                           className="col-form-label text-dark"
                         >
                           Subject
                         </label>
                         <input
                           className="form-control font-style"
                           required
                           name="subject"
                           type="text"
                           defaultValue="Employee Complaints"
                           id="subject"
                         />
                       </div>
                       <div className="form-group col-12">
                         <label className="col-form-label text-dark">
                           Email Message
                         </label>
                         <ReactQuill
                           theme="snow"
                           value={formData.content}
                           onChange={handleContentChange}
                         />
                       </div>
                       <div className="col-12 text-end">
                         <button type="submit" className="btn btn-primary">
                           Save Template
                         </button>
                       </div>
                     </form>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </>
)
}

export default EmployeeCompaintMain
