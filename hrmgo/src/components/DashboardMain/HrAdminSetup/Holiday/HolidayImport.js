import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import postAPI from "../../../../api/postAPI";
import { toast } from "react-toastify";
import Papa from "papaparse";

const HolidayImportModal = ({ onClose }) => {
  const [csvFile, setCsvFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      setErrorMessage("");
    } else {
      setCsvFile(null);
      setErrorMessage("Please upload a valid CSV file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      setErrorMessage("Please select a valid CSV file.");
      return;
    }
  
    Papa.parse(csvFile, {
        complete: async (result) => {
            console.log(result.data); 
          const holidayData = result.data
            .filter(row => row[0] && row[1] && row[2])  
            .map((row) => ({
              occasion: row[0],
              startDate: row[1],
              endDate: row[2],
            }));
  
     
        const payload = holidayData.map((holiday) => ({
          occasion: holiday.occasion,
          startDate: holiday.startDate,
          endDate: holiday.endDate,
        }));
  
        try {
          const response = await postAPI("/holiday", payload, true);
  
          if (!response.hasError) {
            toast.success("Holidays imported successfully!");
            onClose();
          } else {
            toast.error(response.message || "Failed to import holidays.");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "An unexpected error occurred.");
        }
      },
      header: false,
      skipEmptyLines: true,
    });
  };
  

  return (
    <div
      className="modal fade show"
      id="commonModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
      style={{
        display: "block",
        paddingLeft: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog modal-undefined" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Import Holiday CSV file
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 mb-6 me-2">
                    <label htmlFor="file" className="form-label">
                      Download sample product CSV file
                    </label>
                    <Link
                      to="https://demo.workdo.io/hrmgo/storage/uploads/sample/sample_holidays1.csv"
                      className="btn btn-sm btn-primary"
                    >
                      <FiDownload /> Download
                    </Link>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="file" className="form-label">
                      Select CSV File
                    </label>
                    <div className="choose-file form-group">
                      <label
                        htmlFor="file"
                        className="form-label choose-files bg-primary"
                      >
                        <FiUpload /> Choose file here
                      </label>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        className="custom-input-file d-none"
                        onChange={handleFileChange}
                      />
                    </div>
                    {errorMessage && (
                      <div className="text-danger mt-2">{errorMessage}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  value="Cancel"
                  className="btn btn-secondary"
                  onClick={onClose}
                />
                <input
                  type="submit"
                  value="Upload"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayImportModal;
