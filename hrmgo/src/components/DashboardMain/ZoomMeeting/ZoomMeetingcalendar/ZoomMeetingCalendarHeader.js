import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import ZoomMeetingModal from "./ZoomMeetingModal";
import { GoListUnordered } from "react-icons/go";
import { useNavigate } from "react-router-dom";


const TicketReplyHeader = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();


    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const goTolist = () => {
        navigate("/Dashboard/zoom-meeting");
    };


    return (

        <div className="dash-content">
            <div className="page-header">
                <div className="page-block">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <div className="page-header-title">
                                <h4 className="m-b-10">
                                    Zoom Meeting Calendar
                                </h4>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/hrmgo/dashboard">Home</Link></li>
                                <li className="breadcrumb-item">Zoom Meeting</li>
                            </ul>
                        </div>
                        <div className="col">
                            <div className="float-end">
                                <button
                                    onClick={goTolist}
                                    data-bs-toggle="tooltip"
                                    title="List View"
                                    className="btn btn-sm btn-primary"
                                >
                                    <GoListUnordered />
                                </button>

                                <Link
                                    onClick={toggleModal}
                                    className="btn btn-sm btn-primary"
                                    data-bs-toggle="tooltip"
                                    data-bs-original-title="Create"
                                >
                                    <FiPlus />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {isModalOpen && <ZoomMeetingModal onClose={toggleModal} />}
            </div>
        </div>
    )
};

export default TicketReplyHeader;
