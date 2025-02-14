import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { useState } from 'react';
import { useEffect } from 'react';
import getAPI from '../../../../api/getAPI';
import { TbCirclePlus } from "react-icons/tb";
import { Link } from 'react-router-dom';

const CareerTable = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
          try {
            const response = await getAPI("/get-all-job"); 
            setJobs(response.data.data);
            setLoading(false);
          } catch (err) {
            setError("Failed to load jobs. Please try again.");
            setLoading(false);
          }
        };
    
        fetchJobs();
      }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div className="text-danger">{error}</div>;
      }
  return (
    <div>
      <section className="placedjob-section">
        <div className="container">
          <div className="section-title bg-light">
            <h2 className="h1 mb-3">
              <span className="text-primary">+{jobs.length}</span> Job openings
            </h2>
            <p>
              Always looking for better ways to do things, innovate <br />
              and help people achieve their goals.
            </p>
          </div>
          <div className="row g-4">
            {jobs.map((job) => (
              <div key={job._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 job-card">
                <div className="job-card-body">
                  <div className="d-flex mb-3 align-items-center justify-content-between">
                    {/* <img src={job.image} alt={job.title} /> */}
                    <p>
                      {job.branch} <CiLocationOn />
                    </p>
                  </div>
                  <h5 className="mb-3">
                    <a href={job.link} className="text-dark">
                      {job.title}
                    </a>
                  </h5>
                  <div className="d-flex mb-3 align-items-start flex-column flex-xl-row flex-md-row flex-lg-column">
                    <span className="d-inline-block me-2">
                    <TbCirclePlus /> {job.position} position{job.position > 1 ? 's' : ''} available
                    </span>
                  </div>
                  <div className="d-flex flex-wrap gap-1 align-items-center">
                    {job.skill.map((tag, index) => (
                      <span key={index} className="badge rounded p-2 bg-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to={`/dashboard/recruitment/careerJob/${job._id}`} className="btn btn-primary w-100 mt-4">
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerTable;
