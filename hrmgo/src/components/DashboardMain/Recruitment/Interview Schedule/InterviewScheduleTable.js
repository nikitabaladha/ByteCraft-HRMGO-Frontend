import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getAPI from '../../../../api/getAPI';
import { TbPencil } from "react-icons/tb";
import {  FaRegTrashAlt } from "react-icons/fa";
import InterviewScheduleEdit from './InterviewScheduleEdit';
import ConfirmationDialog from '../../ConfirmationDialog';

const InterviewScheduleTable = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getAPI('/get-all-interview-schedule'); 
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching interview schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  const handleEdit = (schedule) => {
    setSelectedTraining(schedule);
    setIsModalOpen(true);
  };

  const openDeleteDialog = (scheduleId) => {
    console.log("row Id", scheduleId);
    setAppToDelete(scheduleId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setAppToDelete(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setSchedules((prevApp) => prevApp.filter((schedule) => schedule._id !== _id));
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensures 2 digits for the day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensures 2 digits for the month
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  

  return (
    <>
      <div className="col-lg-4">
        <div className="card">
          <div className="card-body">
            <h4 className="mb-4">Schedule List</h4>
            <ul className="event-cards list-group list-group-flush mt-3 w-100">
              {schedules.map((schedule) => (
                <li className="list-group-item card mb-3" key={schedule._id}>
                  <div className="row align-items-center justify-content-between">
                    <div className="align-items-center">
                      <div className="card mb-3 border shadow-none">
                        <div className="px-3">
                          <div className="row align-items-center">
                            <div className="col ml-n2 text-sm mb-0 fc-event-title-container">
                              <h5 className="card-text small text-primary">{schedule.candidate}</h5>
                              <div className="card-text small text-dark">{schedule.applicatAppliedFor}</div>
                              <div className="card-text small text-dark">{`${formatDate(schedule.date)}`}, {schedule.time}</div>
                            </div>
                            <div className="col-auto text-right">
                              <div className="d-inline-flex mb-4">
                                <div className="dt-buttons">
                                  <span>
                                    <div className="action-btn bg-info me-2">
                                      <Link
                                        to="#"
                                        className="mx-3 btn btn-sm align-items-center"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Edit"
                                        onClick={() => handleEdit(schedule)}
                                      >
                                        <span className="text-white">
                                          <TbPencil/>
                                        </span>
                                      </Link>
                                    </div>
                                    <div className="action-btn bg-danger">
                                      <Link
                                        to="#"
                                        className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Delete"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openDeleteDialog(schedule);
                                          }}
                                      >
                                        <span className="text-white">
                                          <FaRegTrashAlt/>
                                        </span>
                                      </Link>
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isModalOpen && selectedTraining && (
        <InterviewScheduleEdit
          schedule={selectedTraining}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}

{isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="schedule"
          id={appToDelete._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default InterviewScheduleTable;
