import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";

const TrainingListView = () => {
  const location = useLocation();
  //   const training = location.state?.training;
  const training = location.state?.training || location.state;

  console.log("Location:", location);
  console.log("Training from state:", training);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const formatCost = (cost) => {
    return new Intl.NumberFormat("en-IN").format(cost);
  };

  const [formData, setFormData] = useState({
    performance: "0",
    status: "0",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await putAPI(`/update-performance/${training._id}`, {
        status: formData.status,
        Performance: mapPerformanceValue(formData.performance),
        Remark: formData.remarks,
      });

      toast("Training updated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to update training", error);
      toast("Error updating training. Please try again.");
    }
  };

  const mapPerformanceValue = (value) => {
    const performanceMap = {
      0: "Not Concluded",
      1: "Satisfactory",
      2: "Average",
      3: "Poor",
      4: "Excellent",
    };
    return performanceMap[value];
  };

  // console.log("Training From View", training)
  return (
    <div>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Training Details</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/dashboard/training">Training List</Link>
                </li>
                <li className="breadcrumb-item">Training Details</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Left Section */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body table-border-style">
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Training Type</td>
                      <td className="text-right">{training.trainingType}</td>
                    </tr>
                    <tr>
                      <td>Trainer</td>
                      <td className="text-right">{training.trainer}</td>
                    </tr>
                    <tr>
                      <td>Training Cost</td>
                      <td className="text-right">
                        ₹{formatCost(training.trainingCost)}
                      </td>
                    </tr>
                    <tr>
                      <td>Start Date</td>
                      <td className="text-right">
                        {formatDate(training.startDate)}
                      </td>
                    </tr>
                    <tr>
                      <td>End Date</td>
                      <td className="text-right">
                        {formatDate(training.endDate)}
                      </td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td className="text-right">May 8, 2020</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-sm mt-4 p-2">
                  Anabel is the sixth Frontier Brain and is in charge of Hoenn's
                  Battle Tower.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-body">
              <div className="row">
                <div className="col-md-12">
                  <h6>Training Employee</h6>
                  <hr />
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item" style={{ border: "0px" }}>
                      <div className="d-flex align-items-center">
                        <a
                          href="https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-1.jpg"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-1.jpg"
                            alt="Avatar"
                            className="img-fluid rounded border-2 border border-primary"
                            width="55px"
                            style={{ height: "55px" }}
                          />
                        </a>
                        <div className="media-body px-2 text-sm">
                          <a
                            href="https://demo.workdo.io/hrmgo/employee/eyJpdiI6IkVTY0o1cmtiRWk0Wkh4SitVNHovVGc9PSIsInZhbHVlIjoiOGtLQTc5M0pJeW1mUEsyT2llR2ZLQT09IiwibWFjIjoiYjFhNTJkY2M3ODRlNTIyOWI5MTk5NzI2NjZhZTEyZmFhYzlhZjUyOGYyZDgyOWY1ODNhMWVjNWY4MjVjMmNhYiIsInRhZyI6IiJ9"
                            className="text-dark"
                          >
                            Julie Lynn
                          </a>
                          <br />
                          Manager
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <form onSubmit={handleSubmit}>
                  <h6>Update Status</h6>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="performance"
                          className="col-form-label text-dark"
                        >
                          Performance
                        </label>
                        <select
                          className="form-control select"
                          id="performance"
                          name="performance"
                          value={formData.performance}
                          onChange={handleInputChange}
                        >
                          <option value="Not Concluded">Not Concluded</option>
                          <option value="Satisfactory">Satisfactory</option>
                          <option value="Average">Average</option>
                          <option value="Poor">Poor</option>
                          <option value="Excellent">Excellent</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="status"
                          className="col-form-label text-dark"
                        >
                          Status
                        </label>
                        <select
                          className="form-control select"
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Started">Started</option>
                          <option value="Completed">Completed</option>
                          <option value="Terminated">Terminated</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="remarks"
                      className="col-form-label text-dark"
                    >
                      Remarks
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Remarks"
                      rows="3"
                      name="remarks"
                      id="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="form-group text-end">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingListView;
