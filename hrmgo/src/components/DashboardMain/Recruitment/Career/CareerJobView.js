import React from 'react';
import CareerHeader from './CareerHeader';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import getAPI from '../../../../api/getAPI';
import { FiSend } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";

const CareerJobView = () => {
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


  const removeHtmlTags = (text) => {
    return text.replace(/<[^>]*>/g, ''); // Removes all HTML tags
};

// If ticket is not null, remove HTML tags from description
const descriptionWithoutHtml = jobDetails ? removeHtmlTags(jobDetails.description) : '';
const recuitmentWithoutHtml = jobDetails ? removeHtmlTags(jobDetails.requirement) : '';
// const termsWithoutHtml = jobDetails ? removeHtmlTags(jobDetails.terms) : '';
  return (
    <div>
      <CareerHeader />
      <section className="apply-job-section">
        <div className="container">
          <div className="apply-job-wrapper bg-light">
            <div className="section-title text-center">
              <p>
                <b>{jobDetails.title}</b>
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-1 mb-4">
              {jobDetails.skill.map((skills, index) => (
                        <span
                          key={index}
                          className="badge rounded p-2 bg-primary"
                        >
                          {skills}
                        </span>
                      ))}
              </div>
              <p>
                 <CiLocationOn /> {jobDetails.branch}
              </p>
              <Link
                to={`/dashboard/recruitment/applyJob/${jobDetails._id}`}
                className="btn btn-primary rounded"
              >
                Apply now <FiSend />
              </Link>
            </div>
            <h3>Requirements</h3>
            <p
              style={{
                margin: '0px 0px 18px 0px',
                border: 0,
                padding: 0,
                verticalAlign: 'baseline',
                color: '#262626',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontSize: '13px',
              }}
            >
              {recuitmentWithoutHtml}
            </p>
            <hr />
            <h3>Description</h3>
            <br />
            <p
              style={{
                margin: '0px 0px 18px 0px',
                border: 0,
                padding: 0,
                verticalAlign: 'baseline',
                color: '#262626',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontSize: '13px',
              }}
            >
              {descriptionWithoutHtml}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerJobView;
