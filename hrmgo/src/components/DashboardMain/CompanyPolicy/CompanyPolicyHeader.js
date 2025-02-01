import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import CompanyPolicy from "./CompanyPolicyModal";



const EventHeader = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (

        <div className="dash-content">
            <div className="page-header">
                <div className="page-block">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <div className="page-header-title">
                                <h4 className="m-b-10">
                                Manage Company Policy
                                </h4>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/hrmgo/dashboard">Home</Link></li>
                                <li className="breadcrumb-item"> Company Policy</li>
                            </ul>
                        </div>
                        <div className="col">
                            <div className="float-end">
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
                {isModalOpen && <CompanyPolicy onClose={toggleModal} />}
            </div>
        </div>
    )
};

export default EventHeader;
