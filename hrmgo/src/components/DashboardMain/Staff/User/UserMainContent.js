import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { TfiKey } from "react-icons/tfi";
import { TbRoadSign } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import UserCreate from './UserCreate';
import ConfirmationDialog from "../../ConfirmationDialog";
import EditUser from "./EditUser";
import UserCreatePassword from "./UserCreatePassword";
import UserResetPassword from "./UserResetPassword";

const UserMainContent = ({users, setUsers, fetchUsers}) => {
  
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [resetModel, setResetModel] = useState(false);

const handleCreateClick = () => {
  setShowModal(true); // Show the modal
};

const handleCloseModal = () => {
  setShowModal(false); // Hide the modal
};

  const openDeleteDialog = (user) => {
    setSelectedTrainee(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTrainee(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setUsers((prevApp) => prevApp.filter((user) => user._id !== _id));
  };

  const handleEdit = (user) => {
    setSelectedTrainee(user);
    setIsModalOpen(true);
  };

  const handleCreatePassword = (user) => {
    setSelectedTrainee(user)
    setOpenModel(true)
  }

  const handleResetPassword = (user) => {
    setSelectedTrainee(user)
    setResetModel(true)
  }

  return (
    <>
    <div className="row">
      {users.map((user) => (
        <div key={user.id} className="col-xl-3">
          <div className="card text-center">
            <div className="card-header border-0 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  <div className="badge p-2 px-3 bg-primary">{user.role}</div>
                </h6>
              </div>
              <div className="card-header-right">
                <div className="btn-group card-option">
                  <button
                    type="button"
                    className="btn dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FaEllipsisVertical />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link
                      href="#"
                      className="dropdown-item"
                      data-url={`/user/${user.id}/edit`}
                      data-ajax-popup="true"
                      data-title="Update User"
                      onClick={() => handleEdit(user)}
                    >
                      <FaRegEdit />
                      <span className="ms-2">Edit</span>
                    </Link>
                    <Link
                      href="#"
                      className="dropdown-item"
                      data-ajax-popup="true"
                      data-title="Change Password"
                      data-url={`/user-reset-password/${user.id}`}
                      onClick={() => handleResetPassword(user)}
                    >
                      <TfiKey />
                      <span className="ms-1">Reset Password</span>
                    </Link>
                    <Link
                      href={`/user-login/${user.id}`}
                      className="dropdown-item"
                      onClick={() => handleCreatePassword(user)}
                    >
                      <TbRoadSign />
                      <span className="text-success"> Login Enable</span>
                    </Link>
                    <form
                      method="POST"
                      action={`/user/${user.id}`}
                      accept-charset="UTF-8"
                      id={`delete-form-${user.id}`}
                    >
                      <input name="_method" type="hidden" value="DELETE" />
                      <input
                        name="_token"
                        type="hidden"
                        value="mtmUSWlsV4WXO3uMKBF8Y2YolNdJ6qicmLYr5EBH"
                      />
                      <Link
                        href="#"
                        className="bs-pass-para dropdown-item"
                        data-confirm="Are You Sure?"
                        data-text="This action can not be undone. Do you want to continue?"
                        data-confirm-yes={`delete-form-${user.id}`}
                        title=""
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-original-title="Delete"
                        onClick={(e) => {
                          e.preventDefault();
                          openDeleteDialog(user);
                        }}
                      >
                        <FaRegTrashAlt />
                        <span className="ms-2">Delete</span>
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="avatar">
                <Link href={user.profileImage} target="_blank">
                  <img
                    src={`http://localhost:3001${user.profileImage}`}
                    className="img-fluid rounded border-2 border border-primary"
                    width="120px"
                    style={{ height: "120px" }}
                    alt="User Avatar"
                  />
                </Link>
              </div>
              <h4 className="mt-2 text-primary">{user.name}</h4>
              <small>{user.email}</small>
            </div>
          </div>
        </div>
      ))}
     <div className="col-xl-3 col-lg-4 col-sm-6">
      <button
        onClick={handleCreateClick}
        className="btn-addnew-project border-primary"
        data-ajax-popup="true"
        data-url="https://demo.workdo.io/hrmgo/user/create"
        data-title="Create New User"
        data-bs-toggle="tooltip"
        title="Create a new user"
      >
        <div className="bg-primary proj-add-icon">
          <FiPlus/>
        </div>
        <h6 className="mt-4 mb-2">New User</h6>
        <p className="text-muted text-center">Click here to add new user</p>
      </button>
    </div>
    </div>
    {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="user"
          id={selectedTrainee._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}

    {showModal && (
        <UserCreate onClose={handleCloseModal}   fetchUsers={fetchUsers}/>
      
      )}

{openModel && (
        <UserCreatePassword
          user={selectedTrainee}
          onClose={() => setOpenModel(false)} 
        />
      )}

{resetModel && (
        <UserResetPassword
          user={selectedTrainee}
          onClose={() => setResetModel(false)} 
        />
      )}

{isModalOpen && selectedTrainee && (
        <EditUser
          user={selectedTrainee}
          onClose={() => setIsModalOpen(false)} 
          fetchUsers={fetchUsers}
        />
      )}
    </>
  );
};

export default UserMainContent;
