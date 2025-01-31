import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const JobHeader = ({fetchJobs}) => {
  return (
      <div class="page-header">
        <div class="page-block">
          <div class="row align-items-center">
            <div class="col-auto">
              <div class="page-header-title">
                <h4 class="m-b-10">Manage Job</h4>
              </div>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li class="breadcrumb-item">Manage Job</li>
              </ul>
            </div>
            <div class="col">
              <div class="float-end ">
                <Link
                  to="/dashboard/recruitment/create-job"
                  data-ajax-popup="true"
                  data-size="md"
                  data-title="Create New Job"
                  data-bs-toggle="tooltip"
                  title=""
                  class="btn btn-sm btn-primary"
                  data-bs-original-title="Create"
                >
                  <FiPlus className="text-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default JobHeader;
