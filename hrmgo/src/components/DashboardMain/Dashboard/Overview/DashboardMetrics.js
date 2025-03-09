import React from "react";
import { HiOutlineBriefcase } from "react-icons/hi";
import { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { TbUsers } from "react-icons/tb";
import { HiOutlineTicket } from "react-icons/hi";
import { TbWallet } from "react-icons/tb";
import { Link } from "react-router-dom";

const DashboardMetrics = () => {
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const totalBalance = accounts
    .reduce((sum, account) => sum + account.initial_balance, 0)
    .toFixed(2);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAPI("/get-all-job");
        setJobs(response.data.data);
      } catch (err) {
        toast.error("Failed to load jobs. Please try again.");
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await getAPI("/get-all-users", {}, true);
        if (response.data && response.data.data) {
          setUsers(response.data.data);
          console.log("data", response.data.data);
        } else {
          toast.error("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("An error occurred while fetching users.");
      }
    };

    const fetchAccounts = async () => {
      try {
        const response = await getAPI(`/getAccount-Name-Balance`, {}, true);
        console.log("API Response:", response.data);

        if (response.data.message === "Accounts fetched successfully") {
          setAccounts(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };

    const fetchTrainers = async () => {
      try {
        const response = await getAPI("/trainee-get-all", {}, true);
        if (response.data && response.data.data) {
          setTrainers(response.data.data);
        } else {
          toast.error("Failed to fetch trainers.");
        }
      } catch (error) {
        console.error("Error fetching trainers:", error);
        toast.error("An error occurred while fetching trainers.");
      }
    };

    fetchTrainers();

    fetchAccounts();

    fetchAllUsers();

    fetchJobs();
  }, []);

  return (
    <>
      <div className="col-xxl-12">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="card stats-wrapper dash-info-card">
              <div className="card-body stats">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mb-3 mb-sm-0">
                    <div className="d-flex align-items-center">
                      <div className="badge theme-avtar bg-primary">
                        <TbUsers />
                      </div>
                      <div className="ms-3">
                        <small className="text-muted text-dark">Total</small>
                        <h6 className="m-0">
                          <Link>Staff</Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto text-end">
                    <h4 className="m-0 text-primary">{users.length}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card stats-wrapper dash-info-card">
              <div className="card-body stats">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mb-3 mb-sm-0">
                    <div className="d-flex align-items-center">
                      <div className="badge theme-avtar bg-info">
                        <HiOutlineTicket />
                      </div>
                      <div className="ms-3">
                        <small className="text-muted text-dark">Total</small>
                        <h6 className="m-0">
                          <Link>
                            Trainer
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto text-end">
                    <h4 className="m-0 text-info">{trainers.length}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card stats-wrapper dash-info-card">
              <div className="card-body stats">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mb-3 mb-sm-0">
                    <div className="d-flex align-items-center">
                      <div className="badge theme-avtar bg-warning">
                        <TbWallet />
                      </div>
                      <div className="ms-3">
                        <small className="text-muted text-dark">Total</small>
                        <h6 className="m-0">
                          <Link>
                            Account Balance
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto text-end">
                    <h6 className="m-0 text-warning">{`₹${new Intl.NumberFormat(
                      "en-IN"
                    ).format(totalBalance)}`}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mb-3 mb-sm-0">
                    <div className="d-flex align-items-center">
                      <div className="badge theme-avtar bg-primary">
                        <HiOutlineBriefcase />
                      </div>
                      <div className="ms-3">
                        <small className="text-muted text-dark">Total</small>
                        <h6 className="m-0">Jobs</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto text-end">
                    <h4 className="m-0">{jobs.length}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mb-3 mb-sm-0">
                    <div className="d-flex align-items-center">
                      <div className="badge theme-avtar bg-info">
                        <svg
                          xmlns="/storage/uploads/Icon/active.svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                        >
                          <rect width="20" height="20" fill="none"></rect>
                          <image
                            href="/storage/uploads/Icon/active.svg"
                            x="0"
                            y="0"
                            width="40"
                            height="40"
                          ></image>
                        </svg>
                      </div>
                      <div className="ms-3">
                        <small className="text-muted text-dark">Active</small>
                        <h6 className="m-0">Jobs</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto text-end">
                    <h4 className="m-0">
                      {jobs.filter((job) => job.status === "active").length}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mb-3 mb-sm-0">
                    <div className="d-flex align-items-center">
                      <div className="badge theme-avtar bg-warning">
                        <svg
                          xmlns="/storage/uploads/Icon/inactive.svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                        >
                          <rect width="20" height="20" fill="none"></rect>
                          <image
                            href="/storage/uploads/Icon/inactive.svg"
                            x="0"
                            y="0"
                            width="40"
                            height="40"
                          ></image>
                        </svg>
                      </div>
                      <div className="ms-3">
                        <small className="text-muted text-dark">Inactive</small>
                        <h6 className="m-0">Jobs</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto text-end">
                    <h4 className="m-0">
                      {jobs.filter((job) => job.status !== "active").length}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMetrics;
