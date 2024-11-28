import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import getAPI from "../../../../api/getAPI";

const AwardTable = () => {
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    const fetchAwardData = async () => {
      try {
        const response = await getAPI(`/award`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setAwards(response.data.data);
          console.log("Award Data fetched successfully", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Award Data:", err);
      }
    };

    fetchAwardData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <table className="table" id="pc-dt-simple">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Award Type</th>
                    <th>Date</th>
                    <th>Gift</th>
                    <th>Description</th>
                    <th width="200px">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {awards.map((award) => (
                    <tr key={award.id}>
                      <td>{award.employeeName}</td>
                      <td>{award.awardType}</td>
                      <td>{formatDate(award.date)}</td>
                      <td>{award.gift}</td>
                      <td>{award.description}</td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-info me-2">
                              <Link
                                className="mx-3 btn btn-sm  align-items-center"
                                data-size="lg"
                                data-ajax-popup="true"
                                data-bs-toggle="tooltip"
                                title=""
                                data-title="Edit Award"
                                data-bs-original-title="Edit"
                                // onClick={() => handleEdit(award.id)}
                              >
                                <span className="text-white">
                                  <TbPencil />
                                </span>
                              </Link>
                            </div>
                            <div className="action-btn bg-danger">
                              <form
                                method="POST"
                                acceptCharset="UTF-8"
                                id={`delete-form-${award.id}`}
                                onSubmit={(e) => e.preventDefault()}
                              >
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <Link
                                  href="#"
                                  className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Delete"
                                  aria-label="Delete"
                                  //   onClick={() => handleDelete(award.id)}
                                >
                                  <span className="text-white">
                                    <FaRegTrashAlt />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardTable;
