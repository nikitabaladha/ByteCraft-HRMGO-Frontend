import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI";
// import postAPI from "../../../../api/postAPI";
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // profile: null,
  });

  const [profileImage, setProfileImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getAPI("/get-user-details", {}, true);
        if (!response.hasError && response.data) {
          const user = response.data.data;
          // const profile = response.data.data;
          const profilePath = user.profileImage.startsWith("/")
            ? `http://localhost:3001${user.profileImage}`
            : `http://localhost:3001/Images/profilePicture/default-avatar.png`;

          setFormData({
            name: user.name || "",
            email: user.email || "",
          });
          setProfileImage(profilePath);
          setImagePreview(profilePath);
        } else {
          toast.error("Failed to fetch User data.");
        }
      } catch (error) {
        console("Error fetching User data:", error);
        toast("An error occurred while fetching User data.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      const file = files[0];

      if (name === "profileImage") {
        setProfileImage(file);

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setImagePreview("");
        }
      }
    } else {
      if (name === "profileImage") {
        setProfileImage(null);
        setImagePreview("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (profileImage) data.append("profileImage", profileImage);

    try {
      const response = await putAPI("/update", data, {
        "Content-Type": "multipart/form-data",
      });
      console.log("Personal Profile updated:", response.data);
      toast("Personal Profile updated");
    } catch (error) {
      toast.error("Error updating Personal Profile:", error);
    }
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
                            className="form-control file"
                            name="profileImage"
                            id="profile"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <img
                            id="imagePreview"
                            src={imagePreview}
                            className="img-fluid rounded border-2 border border-primary"
                            width="120px"
                            style={{ height: "120px" }}
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
