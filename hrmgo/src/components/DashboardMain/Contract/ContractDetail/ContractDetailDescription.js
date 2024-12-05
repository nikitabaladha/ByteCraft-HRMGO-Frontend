import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ContractDetailDescription = () => {
  const [description, setDescription] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Description:", description);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Description</h5>
      </div>
      <div className="card-body p-3">
        <form onSubmit={handleSubmit}>
          <div className="col-md-12">
            <div className="form-group mt-3">
              {/* Render the React Quill Editor */}
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
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContractDetailDescription;
