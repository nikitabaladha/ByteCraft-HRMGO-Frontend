import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI";
// import deleteAPI from "../../../../api/deleteAPI";
import { toast } from "react-toastify";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile: null,
  });

  const [imagePreview, setImagePreview] = useState(
    "https://demo.workdo.io/hrmgo/storage/uploads/avatar/owner.jpg"
  );

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await getAPI("/get-user-details", {}, true);
        if (!response.hasError &&
          response.data &&
          Array.isArray(response.data.data)) {
            setUserData(response.data.data)
        } else {
          toast.error("Failed to fetch User data.");
        }
      } catch (error) {
        console.error("Error fetching User data:", error);
        toast.error("An error occurred while fetching User data.");
      }
    };
  
    fetchTrainers();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile: file });

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the form data for submission
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.profile) {
      data.append("profile", formData.profile);
    }

    // Perform the form submission
    fetch("https://demo.workdo.io/hrmgo/edit-profile", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="active" id="Personal_Info">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        acceptCharset="UTF-8"
      >
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Personal Information</h5>
                <small>Details about your personal information</small>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label text-dark">Name</label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        name="name"
                        type="text"
                        id="name"
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="email"
                        className="col-form-label text-dark"
                      >
                        Email
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        name="email"
                        type="email"
                        id="email"
                        placeholder="Enter Your Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label htmlFor="profile" className="col-form-label">
                        Avatar
                      </label>
                      <div className="choose-files">
                        <label htmlFor="profile">
                          <div className="bg-primary profile">
                            <i className="ti ti-upload px-1"></i>
                            Choose file here
                          </div>
                          <input
                            type="file"
                            className="form-control file"
                            name="profile"
                            id="profile"
                            onChange={handleFileChange}
                          />
                          <img
                            id="blah"
                            className="img-fluid rounded border-2 border border-primary"
                            width="120px"
                            style={{ height: "120px" }}
                            src={imagePreview}
                            alt="Avatar Preview"
                          />
                        </label>
                      </div>
                      <span className="text-xs text-muted">
                        Please upload a valid image file. Size of image should
                        not be more than 2MB.
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12 text-end">
                    <input
                      type="submit"
                      value="Save Changes"
                      className="btn btn-print-invoice btn-primary m-r-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
