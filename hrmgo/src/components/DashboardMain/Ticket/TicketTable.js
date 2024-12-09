import React, { useState, useEffect } from "react";
import getAPI from "../../../api/getAPI";
import ConfirmationDialog from "./ConfirmationDialog";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiOutlineTicket } from "react-icons/hi";
import { TbArrowBackUp } from "react-icons/tb";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

const TicketDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);

  /* entries pagination */

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");



  const [chartSeries, setChartSeries] = useState([0, 0, 0]); // Open, On Hold, Closed
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "donut", // Change from 'pie' to 'donut'
    },
    labels: ["Open", "On Hold", "Closed"],
    responsive: [
      {
        breakpoint: 400,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    plotOptions: {
      pie: {
        donut: {
          size: '70%', // Adjust the size of the donut (ring) here
        },
      },
    },
    dataLabels: {
      enabled: false,  // Disable data labels to prevent showing percentages
    },

    colors: ["#6ED943", "#FFA21D", "#FF3A6E"],

  });



  // Initialize useNavigate hook

  const openDeleteDialog = (ticketId) => {
    setTicketToDelete(ticketId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setTicketToDelete(null);
  };

  const handleDeleteSuccess = (deletedTicketId) => {
    setTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket._id !== deletedTicketId)
    );
    closeDeleteDialog();
  };

  useEffect(() => {
    // Fetch ticket data on component mount
    const fetchTickets = async () => {
      try {
        const response = await getAPI("/ticket-getall", {}, true); // Adjust endpoint as needed
        setTickets(response.data.tickets); // Set the fetched tickets to state
        setLoading(false); // Set loading to false after data is fetched
        updateChartData(response.data.tickets);
      } catch (err) {
        setError("Failed to fetch tickets"); // Set error message if API call fails
        setLoading(false);
      }
    };

    fetchTickets(); // Call the fetchTickets function when the component mounts
  }, []); // Empty dependency array means this runs only once on mount

  const updateChartData = (tickets) => {
    const open = tickets.filter((ticket) => ticket.status === "open").length;
    const onHold = tickets.filter((ticket) => ticket.status === "onhold").length;
    const close = tickets.filter((ticket) => ticket.status === "close").length;
    setChartSeries([open, onHold, close]);

    // Optionally update chart options (e.g., colors or labels) dynamically
    setChartOptions(prevOptions => ({
      ...prevOptions,
      labels: ["open", "onhold", "close"], // Updating labels dynamically if necessary
    }));
  };

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(ticket => ticket.status === "open").length;
  const holdTickets = tickets.filter(ticket => ticket.status === "onhold").length;
  const closedTickets = tickets.filter(ticket => ticket.status === "close").length;

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedTicket = filteredTickets.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const isNewTicket = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMilliseconds = now - createdDate; 
    return diffInMilliseconds <= 60000; 
  };


  return (
    <div className="container">
      {/* Top Section */}
      <div className="row">
        <div className="col">
          <div className="float-end">
          </div>
        </div>
      </div>

      {/* Ticket Summary */}
      <div className="row mt-4">
        <div className="col-xxl-8">
          <div className="row">
            {[
              { label: "Total Ticket", value: totalTickets, color: "info" },
              { label: "Open Ticket", value: openTickets, color: "success" },
              { label: "Hold Ticket", value: holdTickets, color: "warning" },
              { label: "Close Ticket", value: closedTickets, color: "danger" },
            ].map((item, index) => (
              <div className="col-lg-3 col-6" key={index}>
                <div className="card ticket-card">
                  <div className="card-body">
                    <div className={`badge theme-avtar bg-${item.color}`}>
                      <HiOutlineTicket />
                    </div>
                    <div style={{ marginTop: '10%' }}>
                      <h6 className="mb-3">{item.label}</h6>
                      <h3 className={`mb-0 text-${item.color}`}>{item.value}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="col-xxl-4">
          <div className="card">
            <div className="card-header">
              <h5>Ticket By Status</h5>
            </div>
            <div className="card-body">
              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="donut"
                height={115}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                <div className="dataTable-top">
                  <div className="dataTable-dropdown">
                    <label>
                      <select className="dataTable-selector"
                        value={entriesPerPage}
                        onChange={handleEntriesPerPageChange}>

                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                      </select>{" "}
                      entries per page
                    </label>
                  </div>
                  <div className="dataTable-search">
                    <input
                      className="dataTable-input"
                      placeholder="Search..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="dataTable-container">
                  <table className="table dataTable-table" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th style={{ width: "8.07654%" }}>
                          New
                        </th>
                        <th style={{ width: "22.2416%", color: "black", textDecoration: "none" }}>
                          Title
                        </th>
                        <th style={{ width: "12.4254%", color: "black", textDecoration: "none" }}>
                          Ticket Code
                        </th>
                        <th style={{ width: "14.0408%", color: "black", textDecoration: "none" }}>
                          Employee
                        </th>
                        <th style={{ width: "10.0646%", color: "black", textDecoration: "none" }}>
                          Priority
                        </th>
                        <th style={{ width: "13.5437%", color: "black", textDecoration: "none" }}>
                          Date
                        </th>
                        <th style={{ width: "11.9284%", color: "black", textDecoration: "none" }}>
                          Created By
                        </th>
                        <th style={{ width: "10.0646%", color: "black", textDecoration: "none" }}>
                          Status
                        </th>
                        <th style={{ width: "13.2952%", color: "black", textDecoration: "none" }}>
                          Action
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTicket.map((ticket, index) => (
                        <tr key={ticket._id}>
                          <td>
                            {isNewTicket(ticket.created_at) && (
                              <span style={{ color: 'green', fontSize: '20px' }}>•</span> // Green dot for new tickets
                            )}
                          </td>

                          <td>{ticket.title}</td>
                          <td>0{ticket.ticket_code}</td>
                          <td>{ticket.employee_name}</td>
                          <td>
                            <div className={`status_badge text-capitalize badge bg-${ticket.priority === "medium"
                              ? "info"
                              : ticket.priority === "critical"
                                ? "danger"
                                : ticket.priority === "high"
                                  ? "warning"
                                  : "success"
                              } ticket-set`}>
                              {ticket.priority}
                            </div>
                          </td>
                          <td>{new Date(ticket.end_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}</td>
                          <td>{ticket.created_by}</td>
                          <td>
                            <div
                              className={`status_badge text-capitalize badge bg-${ticket.status === "open"
                                ? "success"
                                : ticket.status === "onhold"
                                  ? "warning"
                                  : "danger"
                                } ticket-set`}
                            >
                              {ticket.status}
                            </div>
                          </td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-primary me-2">
                                  <Link
                                    to={`/Dashboard/ticket/${ticket._id}`}
                                    className="mx-3 btn btn-sm align-items-center"
                                    data-bs-toggle="tooltip"
                                    data-title="Reply"
                                    title="Reply"
                                  >
                                    <span className="text-white">
                                      <TbArrowBackUp />
                                    </span>
                                  </Link>
                                  {/* <a
                                // href="https://demo.workdo.io/hrmgo/ticket/1/reply"

                                className="mx-3 btn btn-sm align-items-center"
                                data-bs-toggle="tooltip"
                                data-title="Reply"
                                title="Reply"
                           
                             
                              >
                                <span className="text-white">
                                <TbArrowBackUp />
                                </span>
                              </a> */}
                                </div>
                                <div className="action-btn bg-danger">
                                  <form
                                    method="POST"
                                    action="https://demo.workdo.io/hrmgo/ticket/1"
                                    acceptCharset="UTF-8"
                                    id="delete-form-1"
                                  >
                                    <input name="_method" type="hidden" value="DELETE" />
                                    <input
                                      name="_token"
                                      type="hidden"
                                      value="8ZzwXUkx5DwTGkVTZYiA6VPNQ55FcE0l2RJTRkDF"
                                    />
                                    <Link
                                      href="#"
                                      className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                      aria-label="Delete"
                                      onClick={() => openDeleteDialog(ticket._id)}
                                    >
                                      <span className="text-white">
                                        <RiDeleteBinLine />
                                      </span>
                                    </Link>
                                  </form>
                                </div>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="dataTable-bottom">
                  <div className="dataTable-info">
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, filteredTickets.length)}{" "}
                    to {Math.min(currentPage * entriesPerPage, filteredTickets.length)}{" "}
                    of {filteredTickets.length} entries
                  </div>
                  <nav className="dataTable-pagination">
                    <ul
                      className="dataTable-pagination-list"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        listStyleType: 'none',
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {currentPage > 1 && (
                        <li
                          className="page-item"
                          style={{
                            margin: '0 5px',
                          }}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            style={{
                              cursor: 'pointer',
                              padding: '8px 16px',
                              borderRadius: '4px',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#6FD943',
                            }}
                          >
                            ‹
                          </button>
                        </li>
                      )}

                      {Array.from({ length: Math.ceil(filteredTickets.length / entriesPerPage) }, (_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                          style={{
                            margin: '0 5px',
                          }}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                            style={{
                              cursor: 'pointer',
                              padding: '6px 12px',
                              backgroundColor: currentPage === index + 1 ? '#d9d9d9' : 'transparent',
                              border: 'none',
                              color: '#6FD943',
                            }}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}

                      {currentPage < Math.ceil(filteredTickets.length / entriesPerPage) && (
                        <li
                          className="page-item"
                          style={{
                            margin: '0 5px',
                          }}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            style={{
                              cursor: 'pointer',
                              padding: '8px 16px',
                              borderRadius: '4px',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#6FD943',
                            }}
                          >
                            ›
                          </button>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          ticketId={ticketToDelete}  // Updated to use ticketId
          deleteType="ticket"  // Updated to use 'ticket' instead of 'expense'
          onDeleted={handleDeleteSuccess}
        />
      )}

    </div>
  );
};

export default TicketDashboard;
