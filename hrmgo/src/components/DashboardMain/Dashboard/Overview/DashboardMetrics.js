import React, { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI.js";
import { TbUsers } from "react-icons/tb";
import { LuWallet } from "react-icons/lu";
import { LuTicket } from "react-icons/lu";
import { FaChromecast } from "react-icons/fa";

// Icon mapping for each metric based on card index (this assumes card index order matters)
const iconMap = [
  <TbUsers />,
  <LuWallet />,
  <LuTicket />,
  <FaChromecast />,
  <FaChromecast />,
  <FaChromecast />,
];

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchDashboardMetric = async () => {
      try {
        // Fetch data from the backend
        const response = await getAPI(`/dashboard-metric-get-all`, {}, true);

        // Check for error and ensure response contains the expected data
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          // Access the metrics from response.data.data
          setMetrics(response.data.data);
          console.log(
            "Dashboard metrics fetched successfully",
            response.data.data
          );
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    };

    fetchDashboardMetric();
  }, []);

  // Function to determine default color based on the metric's index
  const getMetricColor = (index) => {
    switch (index) {
      case 0:
      case 3:
        return "primary";
      case 1:
      case 4:
        return "info";
      case 2:
      case 5:
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="row">
      <div className="col-xxl-12">
        <div className="row">
          {/* Dynamically render cards from the backend data */}
          {metrics.map((metric, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-auto mb-3 mb-sm-0">
                      <div className="d-flex align-items-center">
                        <div
                          className={`theme-avtar bg-${getMetricColor(index)}`}
                        >
                          {/* Dynamically render icon based on card index */}
                          {iconMap[index] || <FaChromecast />}
                        </div>
                        <div className="ms-3">
                          <small className="text-muted">
                            {metric.subtitle}
                          </small>
                          <h6 className="m-0">{metric.title}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto text-end">
                      {/* Conditional rendering for value size */}
                      {metric.title === "Account Balance" ? (
                        <h6 className={`m-0 text-${getMetricColor(index)}`}>
                          {metric.value}
                        </h6>
                      ) : (
                        <h4 className={`m-0 text-${getMetricColor(index)}`}>
                          {metric.value}
                        </h4>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;
