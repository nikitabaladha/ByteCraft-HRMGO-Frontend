import React from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const TrainerTable = () => {
  // Sample data for trainers
  const trainers = [
    {
      id: 1,
      branch: "China",
      name: "Teresa McRae",
      contact: "7878787878",
      email: "teresa@example.com",
    },
    {
      id: 2,
      branch: "India",
      name: "Trainer Carson",
      contact: "1234567891",
      email: "trainer@example.com",
    },
    {
      id: 3,
      branch: "Greece",
      name: "Gabriel Carson",
      contact: "7878787878",
      email: "kiraxe@mailinator.com",
    },
    {
      id: 4,
      branch: "China",
      name: "Riley Newman",
      contact: "9429869605",
      email: "rootdefrf@gmail.com",
    },
    {
      id: 5,
      branch: "China",
      name: "Teresa McRae",
      contact: "+914785692340",
      email: "toriv35340@albarulo.com",
    },
  ];

  const ActionButtons = ({ trainerId }) => (
    <div className="d-flex gap-2">
      <div className="action-btn bg-warning">
      <Link
          to={`/trainer/${trainerId}`}
         className="mx-3 btn btn-sm align-items-center"
        data-bs-toggle="tooltip"
        title="View"
         >
        <FaEye className="text-white" />
        </Link>
      </div>
      <div className="action-btn bg-info">
        <Link
          to=""
         className="mx-3 btn btn-sm align-items-center"
        data-bs-toggle="tooltip"
        title="Edit"
         >
        <TbPencil className="text-white" />
        </Link>
      </div>
      <div className="action-btn bg-danger">
        <form
          method="POST"
          action={`/trainer/${trainerId}`}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Deleting trainer", trainerId);
          }}
        >
          <input type="hidden" name="_method" value="DELETE" />
          <button
            type="submit"
            className="btn btn-sm text-white"
            title="Delete"
          >
            {/* <i className="ti ti-trash" /> */}
            <Link
                                  to="/"
                                  className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title="Delete"
                                  aria-label="Delete"
                                >
                                  <FaRegTrashAlt className="text-white" />
                                </Link>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <div className="dataTable-wrapper">
                <div className="dataTable-top d-flex justify-content-between align-items-center">
                  <div className="dataTable-dropdown">
                    <label>
                      <select className="dataTable-selector">
                        <option value="5">5</option>
                        <option value="10" selected>
                          10
                        </option>
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
                    />
                  </div>
                </div>
                <table className="table dataTable-table" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Branch</th>
                      <th>Full Name</th>
                      <th>Contact</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainers.map((trainer) => (
                      <tr key={trainer.id}>
                        <td>{trainer.branch}</td>
                        <td>{trainer.name}</td>
                        <td>{trainer.contact}</td>
                        <td>{trainer.email}</td>
                        <td>
                          <ActionButtons trainerId={trainer.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="dataTable-bottom d-flex justify-content-between align-items-center">
                  <div className="dataTable-info">Showing 1 to 5 of 5 entries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerTable;

