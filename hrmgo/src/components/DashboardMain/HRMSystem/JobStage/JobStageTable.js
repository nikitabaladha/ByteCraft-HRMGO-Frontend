import React, { useState } from "react";
import Sidebar from "../HRMSystemSidebar";
import EditJobStageModal from "./EditJobStageModal";
import ConfirmationDialog from "../../ConfirmationDialog";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const JobStageList = ({ jobStages, setJobStages, fetchJobStages }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobStage, setSelectedJobStage] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobStageToDelete, setJobStageToDelete] = useState(null);

  // Drag and Drop Configuration
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleEdit = (jobStage) => {
    setSelectedJobStage(jobStage);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobStage(null);
  };

  const openDeleteDialog = (jobStageId) => {
    setJobStageToDelete(jobStageId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setJobStageToDelete(null);
  };

  const handleDeleteSuccess = (deletedJobStageId) => {
    setJobStages((prevJobStages) =>
      prevJobStages.filter((jobStage) => jobStage._id !== deletedJobStageId)
    );
    closeDeleteDialog();
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = jobStages.findIndex(
        (jobStage) => jobStage._id === active.id
      );
      const newIndex = jobStages.findIndex(
        (jobStage) => jobStage._id === over.id
      );
      const updatedJobStages = [...jobStages];
      const [movedJobStage] = updatedJobStages.splice(oldIndex, 1);
      updatedJobStages.splice(newIndex, 0, movedJobStage);
      setJobStages(updatedJobStages);
    }
  };

  return (
    <div className="row">
      <div className="col-12 col-md-3">
  <Sidebar />
</div>

      <div className="col-12 col-md-9">
        <div className="card">
          <div className="card-body">
            <div className="theme-detail-card">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
                <SortableContext
                  items={jobStages}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="list-unstyled list-group">
                    {jobStages.map((jobStage) => (
                      <SortableItem
                        key={jobStage._id}
                        jobStage={jobStage}
                        handleEdit={handleEdit}
                        openDeleteDialog={openDeleteDialog}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
              <p className="mt-3">
                <b>
                  Note: You can easily reorder the stages using drag & drop.
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditJobStageModal
          closeModal={handleCloseModal}
          jobStage={selectedJobStage}
          fetchJobStages={fetchJobStages}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={jobStageToDelete}
          deleteType="jobStage"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

const SortableItem = ({ jobStage, handleEdit, openDeleteDialog }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: jobStage._id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="list-group-item flex-row flex-sm-row align-items-center justify-content-between"
      // className="d-flex flex-row flex-sm-row align-items-center gap-2 float-end"
    >
      <h6 className="mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-move me-3"
          {...attributes}
          {...listeners}
          style={{ cursor: "grab" }} // Indicates draggable area
        >
          <polyline points="5 9 2 12 5 15"></polyline>
          <polyline points="9 5 12 2 15 5"></polyline>
          <polyline points="15 19 12 22 9 19"></polyline>
          <polyline points="19 9 22 12 19 15"></polyline>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <line x1="12" y1="2" x2="12" y2="22"></line>
        </svg>
        <span>{jobStage.stageName}</span>
      </h6>
      <div className="d-flex justify-content-end">
        <div className="dt-buttons">
          <div className="action-btn bg-info me-2">
            <button
              className="mx-3 btn btn-sm align-items-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleEdit(jobStage);
              }}
            >
              <span className="text-white">
                <i className="ti ti-pencil text-white"></i>
              </span>
            </button>
          </div>
          <div className="action-btn bg-danger">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openDeleteDialog(jobStage._id);
              }}
              className="mx-3 btn btn-sm align-items-center"
            >
              <span className="text-white">
                <i className="ti ti-trash text-white"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default JobStageList;