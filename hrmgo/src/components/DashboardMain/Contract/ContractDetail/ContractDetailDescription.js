import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import putAPI from "../../../../api/putAPI";

const ContractDetailDescription = ({ contractData }) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (contractData && contractData.description) {
      setDescription(contractData.description);
    }
  }, [contractData]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "blockquote",
    "code-block",
    "align",
    "indent",
    "ordered",
    "unordered",
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedContractDescription = {
      description,
    };

    try {
      const response = await putAPI(
        `/contract-description/${contractData.id}`,
        updatedContractDescription,
        true
      );
      console.log("Updated Contract: " + JSON.stringify(response));

      if (!response.hasError) {
        toast.success("Contract description updated successfully!");
      } else {
        toast.error("Failed to update Contract.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Description</h5>
      </div>
      <div className="card-body p-3">
        <form onSubmit={handleUpdate}>
          <div className="col-md-12">
            <div className="form-group mt-3">
              <ReactQuill
                value={description}
                onChange={setDescription}
                className="quill-editor"
                modules={modules}
                formats={formats}
                placeholder="Write something amazing..."
              />
            </div>
          </div>

          <div className="col-md-12 text-end">
            <div className="form-group mt-3 me-3">
              <input className="btn  btn-primary" type="submit" value="Add" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractDetailDescription;
