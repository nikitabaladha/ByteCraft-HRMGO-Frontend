import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import postAPI from "../../../../api/postAPI";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ContractDetailAttachment = () => {
  const { id: contractId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("contractId", contractId);
    formData.append("contractAttachmentUrl", selectedFile);

    try {
      const response = await postAPI(
        "/contract-attachment",
        formData,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.hasError) {
        setSelectedFile(null);
        toast.success("Attachment added successfully!");
      } else {
        toast.error(response.message || "Failed to add Attachment.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <>
      <div id="attachments">
        <div className="row ">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Attachments</h5>
              </div>
              <div className="card-body">
                <div className="">
                  <form onSubmit={handleSubmit}>
                    <div
                      className="col-md-12 dropzone browse-file dz-clickable"
                      id="my-dropzone"
                    >
                      <div className="dz-default dz-message">
                        <input
                          type="file"
                          name="contractAttachmentUrl"
                          accept="image/*"
                          required
                          style={{ display: "none" }}
                          onChange={(e) => {
                            handleFileChange(e);
                          }}
                        />
                        <button
                          className="dz-button"
                          type="button"
                          onClick={() =>
                            document
                              .querySelector(
                                'input[name="contractAttachmentUrl"]'
                              )
                              .click()
                          }
                        >
                          {selectedFile
                            ? selectedFile.name
                            : "Drop files here to upload"}
                        </button>
                      </div>
                    </div>

                    <div className="col-md-12 text-end mb-0">
                      <button type="submit" className="btn btn-primary mt-3">
                        Upload Attachment
                      </button>
                    </div>
                  </form>
                </div>
                <div className="py-3">
                  <div className="list-group-item ">
                    <div className="d-flex align-items-center">
                      <div className="col">
                        <h6 className="text-sm mb-0">
                          <a href="#!">user-4.jpg</a>
                        </h6>
                        <p className="card-text small text-muted">0.01 MB</p>
                      </div>
                      <div className="dt-buttons">
                        <span>
                          <div className="action-btn bg-warning me-2">
                            <Link
                              className="btn btn-sm d-inline-flex align-items-center"
                              download=""
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="Download"
                            >
                              <span className="text-white">
                                <MdOutlineFileDownload />
                              </span>
                            </Link>
                          </div>
                          <div className="action-btn bg-danger">
                            <form method="GET" acceptCharset="UTF-8">
                              <Link
                                className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                data-bs-toggle="tooltip"
                                title=""
                                data-bs-original-title="Delete"
                                aria-label="Delete"
                              >
                                <span className="text-white">
                                  <FaRegTrashAlt />
                                </span>
                              </Link>
                            </form>
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
      </div>
    </>
  );
};

export default ContractDetailAttachment;
