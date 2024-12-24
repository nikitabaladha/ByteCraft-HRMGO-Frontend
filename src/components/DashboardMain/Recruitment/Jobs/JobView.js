import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getAPI from "../../../../api/getAPI";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";

const JobView = () => {
  const { id } = useParams(); // Extract the job ID from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await getAPI(`/get-all-jobs/${id}`); // Adjust the endpoint if needed
        setJobDetails(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load job details. Please try again.");
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  if (!jobDetails) {
    return <div>No job details found.</div>;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const removeHtmlTags = (text) => {
    return text.replace(/<[^>]*>/g, ''); // Removes all HTML tags
};

// If ticket is not null, remove HTML tags from description
const descriptionWithoutHtml = jobDetails ? removeHtmlTags(jobDetails.description) : '';
const recuitmentWithoutHtml = jobDetails ? removeHtmlTags(jobDetails.requirement) : '';
const termsWithoutHtml = jobDetails ? removeHtmlTags(jobDetails.terms) : '';

  return (
    <div className="dash-content">
      <header className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <h4 className="page-header-title">Job Details</h4>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/dashboard/recruitment/jobs">Manage Job</Link>
                </li>
                <li className="breadcrumb-item">Job Details</li>
              </ul>
            </div>
            <div className="col text-end">
              <Link
                to={`/dashboard/recruitment/job-edit/${jobDetails._id}`}
                className="btn btn-sm btn-info"
                title="Edit"
              >
              <TbPencil />
             </Link> 
            </div>
          </div>
        </div>
      </header>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Job Title</td>
                    <td>{jobDetails.title}</td>
                  </tr>
                  <tr>
                    <td>Branch</td>
                    <td>{jobDetails.branch}</td>
                  </tr>
                  <tr>
                    <td>Job Category</td>
                    <td>{jobDetails.category}</td>
                  </tr>
                  <tr>
                    <td>Positions</td>
                    <td>{jobDetails.position}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      <span
                        className={`p-2 px-3 badge ${
                          jobDetails.status === "active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {jobDetails.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Created Date</td>
                    <td>{`${formatDate(jobDetails.createdAt)}`}</td>
                  </tr>
                  <tr>
                    <td>Start Date</td>
                    <td>{`${formatDate(jobDetails.startDate)}`}</td>
                  </tr>
                  <tr>
                    <td>End Date</td>
                    <td>{`${formatDate(jobDetails.endDate)}`}</td>
                  </tr>
                  <tr>
                    <td>Skills</td>
                    <td className="">
                      {/* <span className="p-2 px-3  badge bg-primary"> */}
                      {jobDetails.skill.map((skills, index) => (
                        <span
                          key={index}
                          className="p-2 px-3 badge bg-primary m-1"
                        >
                          {skills}
                        </span>
                      ))}

                      {/* </span> */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card card-fluid">
            <div className="card-body">
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <h6>Need to ask ?</h6>
                    <ul className="">
                    {jobDetails.applicant.map((applicants, index) => (
                        <li
                          key={index}
                        //   className="p-2 px-3 badge bg-primary"
                        >
                          {applicants}
                        </li>
                      ))}
                      {/* <li>{jobDetails.applicant}</li> */}
                    </ul>
                  </div>
                  <div className="col-6">
                    <h6>Need to show option ?</h6>
                    <ul className="">
                    {jobDetails.visibility.map((visibilities, index) => (
                        <li
                          key={index}
                        //   className="p-2 px-3 badge bg-primary"
                        >
                          {visibilities}
                        </li>
                      ))}
                      {/* <li>{jobDetails.visibility}</li> */}
                    </ul>
                  </div>

                  <div className="col-12">
                    <h6>Custom Questions</h6>
                    <ul className="">
                    {jobDetails.customQuestions.map((customquestion, index) => (
                        <li
                          key={index}
                        //   className="p-2 px-3 badge bg-primary"
                        >
                          {customquestion}
                        </li>
                      ))}
                      {/* <li>{jobDetails.customQuestions}</li> */}
                    </ul>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-12 mt-3">
                    <h6>Job Description</h6>
                    <p>{descriptionWithoutHtml}</p>
                    <h6>Job Recruitment</h6>
                    <p>{recuitmentWithoutHtml}</p>
                    <h6>Terms and Condition</h6>
                    <p>{termsWithoutHtml}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobView;
