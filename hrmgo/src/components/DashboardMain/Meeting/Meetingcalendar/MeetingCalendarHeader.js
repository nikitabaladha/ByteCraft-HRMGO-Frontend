import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";
import MeetingModal from "./MeetingModal";
// import { GoListUnordered } from "react-icons/go";
import { useNavigate } from "react-router-dom";


const TicketReplyHeader = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();


    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const goTolist = () => {
        navigate("/Dashboard/meeting");
    };


    return (

        <div className="dash-content">
            <div className="page-header">
                <div className="page-block">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <div className="page-header-title">
                                <h4 className="m-b-10">
                                    Meeting Calendar
                                </h4>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item">Meeting</li>
                            </ul>
                        </div>
                        <div className="col">
                        <div className="d-flex flex-row flex-sm-row align-items-center gap-2 float-end">
                                <button
                                    onClick={goTolist}
                                    data-bs-toggle="tooltip"
                                    title="List View"
                                    className="btn btn-sm btn-primary"
                                >
                                    {/* <GoListUnordered /> */}
                                    <i className="ti ti-list"></i>
                                </button>

                                <Link
                                    onClick={toggleModal}
                                    className="btn btn-sm btn-primary"
                                    data-bs-toggle="tooltip"
                                    data-bs-original-title="Create"
                                >
                                    {/* <FiPlus /> */}
                                    <i className="ti ti-plus"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {isModalOpen && <MeetingModal onClose={toggleModal} />}
            </div>
        </div>
    )
};

export default TicketReplyHeader;
