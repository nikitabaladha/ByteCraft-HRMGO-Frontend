import React from "react";
import "react-toastify/dist/ReactToastify.css";

const AppraisalDetailModal = ({ Appraisal, closeModal }) => {
  console.log("Appraisal", Appraisal);

  if (!Appraisal || !Appraisal.competencies) return null;

  return (
    <>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Appraisal Detail
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="body ">
              <div className="modal-body">
                <div className="row py-4">
                  <div className="col-md-12">
                    <div className="info text-sm">
                      <strong>Branch : </strong>
                      <span>China</span>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="info text-sm font-style">
                      <strong>Employee : </strong>
                      <span>Julie Lynn</span>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="info text-sm font-style">
                      <strong>Appraisal Date : </strong>
                      <span>2024-11</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5  text-end" style={{ marginLeft: 51 }}>
                    <h5>Indicator</h5>
                  </div>
                  <div className="col-4  text-end">
                    <h5>Appraisal</h5>
                  </div>
                  <div className="col-md-12 mt-3">
                    <h6>Organizational Competencies</h6>
                    <hr className="mt-0" />
                  </div>
                  <div className="col-4">Leadership</div>
                  <div className="col-4">
                    <fieldset id="demo" className="rate">
                      <input
                        className="stars"
                        type="radio"
                        id="technical-5*-3"
                        name="ratings[3]"
                        defaultValue={5}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-5*-3"
                        title="Awesome - 5 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-4*-3"
                        name="ratings[3]"
                        defaultValue={4}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-4*-3"
                        title="Pretty good - 4 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-3*-3"
                        name="ratings[3]"
                        defaultValue={3}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-3*-3"
                        title="Meh - 3 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-2*-3"
                        name="ratings[3]"
                        defaultValue={2}
                        defaultChecked=""
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-2*-3"
                        title="Kinda bad - 2 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-1*-3"
                        name="ratings[3]"
                        defaultValue={1}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-1*-3"
                        title="Sucks big time - 1 star"
                      />
                    </fieldset>
                  </div>
                  <div className="col-4">
                    <fieldset id="demo1" className="rate">
                      <input
                        className="stars"
                        type="radio"
                        id="technical-5-3"
                        name="rating[3]"
                        defaultValue={5}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-5-3"
                        title="Awesome - 5 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-4-3"
                        name="rating[3]"
                        defaultValue={4}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-4-3"
                        title="Pretty good - 4 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-3-3"
                        name="rating[3]"
                        defaultValue={3}
                        defaultChecked=""
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-3-3"
                        title="Meh - 3 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-2-3"
                        name="rating[3]"
                        defaultValue={2}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-2-3"
                        title="Kinda bad - 2 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-1-3"
                        name="rating[3]"
                        defaultValue={1}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-1-3"
                        title="Sucks big time - 1 star"
                      />
                    </fieldset>
                  </div>
                  <div className="col-4">Project Management</div>
                  <div className="col-4">
                    <fieldset id="demo" className="rate">
                      <input
                        className="stars"
                        type="radio"
                        id="technical-5*-5"
                        name="ratings[5]"
                        defaultValue={5}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-5*-5"
                        title="Awesome - 5 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-4*-5"
                        name="ratings[5]"
                        defaultValue={4}
                        defaultChecked=""
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-4*-5"
                        title="Pretty good - 4 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-3*-5"
                        name="ratings[5]"
                        defaultValue={3}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-3*-5"
                        title="Meh - 3 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-2*-5"
                        name="ratings[5]"
                        defaultValue={2}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-2*-5"
                        title="Kinda bad - 2 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-1*-5"
                        name="ratings[5]"
                        defaultValue={1}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-1*-5"
                        title="Sucks big time - 1 star"
                      />
                    </fieldset>
                  </div>
                  <div className="col-4">
                    <fieldset id="demo1" className="rate">
                      <input
                        className="stars"
                        type="radio"
                        id="technical-5-5"
                        name="rating[5]"
                        defaultValue={5}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-5-5"
                        title="Awesome - 5 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-4-5"
                        name="rating[5]"
                        defaultValue={4}
                        defaultChecked=""
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-4-5"
                        title="Pretty good - 4 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-3-5"
                        name="rating[5]"
                        defaultValue={3}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-3-5"
                        title="Meh - 3 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-2-5"
                        name="rating[5]"
                        defaultValue={2}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-2-5"
                        title="Kinda bad - 2 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-1-5"
                        name="rating[5]"
                        defaultValue={1}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-1-5"
                        title="Sucks big time - 1 star"
                      />
                    </fieldset>
                  </div>
                  <div className="col-md-12 mt-3">
                    <h6>Technical Competencies</h6>
                    <hr className="mt-0" />
                  </div>
                  <div className="col-4">Allocating Resources</div>
                  <div className="col-4">
                    <fieldset id="demo" className="rate">
                      <input
                        className="stars"
                        type="radio"
                        id="technical-5*-1"
                        name="ratings[1]"
                        defaultValue={5}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-5*-1"
                        title="Awesome - 5 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-4*-1"
                        name="ratings[1]"
                        defaultValue={4}
                        defaultChecked=""
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-4*-1"
                        title="Pretty good - 4 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-3*-1"
                        name="ratings[1]"
                        defaultValue={3}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-3*-1"
                        title="Meh - 3 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-2*-1"
                        name="ratings[1]"
                        defaultValue={2}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-2*-1"
                        title="Kinda bad - 2 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-1*-1"
                        name="ratings[1]"
                        defaultValue={1}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-1*-1"
                        title="Sucks big time - 1 star"
                      />
                    </fieldset>
                  </div>
                  <div className="col-4">
                    <fieldset id="demo1" className="rate">
                      <input
                        className="stars"
                        type="radio"
                        id="technical-5-1"
                        name="rating[1]"
                        defaultValue={5}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-5-1"
                        title="Awesome - 5 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-4-1"
                        name="rating[1]"
                        defaultValue={4}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-4-1"
                        title="Pretty good - 4 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-3-1"
                        name="rating[1]"
                        defaultValue={3}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-3-1"
                        title="Meh - 3 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-2-1"
                        name="rating[1]"
                        defaultValue={2}
                        defaultChecked=""
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-2-1"
                        title="Kinda bad - 2 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-1-1"
                        name="rating[1]"
                        defaultValue={1}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-1-1"
                        title="Sucks big time - 1 star"
                      />
                    </fieldset>
                  </div>
                  <div className="col-md-12 mt-3">
                    <h6>Behavioural Competencies</h6>
                    <hr className="mt-0" />
                  </div>
                  <div className="col-4">Business Process</div>
                  <div className="col-4">
                    <fieldset id="demo" className="rate">
                      <input
                        className="stars"
                        type="radio"
                        id="technical-5*-2"
                        name="ratings[2]"
                        defaultValue={5}
                        defaultChecked=""
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-5*-2"
                        title="Awesome - 5 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-4*-2"
                        name="ratings[2]"
                        defaultValue={4}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-4*-2"
                        title="Pretty good - 4 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-3*-2"
                        name="ratings[2]"
                        defaultValue={3}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-3*-2"
                        title="Meh - 3 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-2*-2"
                        name="ratings[2]"
                        defaultValue={2}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-2*-2"
                        title="Kinda bad - 2 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-1*-2"
                        name="ratings[2]"
                        defaultValue={1}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-1*-2"
                        title="Sucks big time - 1 star"
                      />
                    </fieldset>
                  </div>
                  <div className="col-4">
                    <fieldset id="demo1" className="rate">
                      <input
                        className="stars"
                        type="radio"
                        id="technical-5-2"
                        name="rating[2]"
                        defaultValue={5}
                        defaultChecked=""
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-5-2"
                        title="Awesome - 5 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-4-2"
                        name="rating[2]"
                        defaultValue={4}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-4-2"
                        title="Pretty good - 4 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-3-2"
                        name="rating[2]"
                        defaultValue={3}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-3-2"
                        title="Meh - 3 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-2-2"
                        name="rating[2]"
                        defaultValue={2}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-2-2"
                        title="Kinda bad - 2 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-1-2"
                        name="rating[2]"
                        defaultValue={1}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-1-2"
                        title="Sucks big time - 1 star"
                      />
                    </fieldset>
                  </div>
                  <div className="col-4">Oral Communication</div>
                  <div className="col-4">
                    <fieldset id="demo" className="rate">
                      <input
                        className="stars"
                        type="radio"
                        id="technical-5*-4"
                        name="ratings[4]"
                        defaultValue={5}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-5*-4"
                        title="Awesome - 5 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-4*-4"
                        name="ratings[4]"
                        defaultValue={4}
                        defaultChecked=""
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-4*-4"
                        title="Pretty good - 4 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-3*-4"
                        name="ratings[4]"
                        defaultValue={3}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-3*-4"
                        title="Meh - 3 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-2*-4"
                        name="ratings[4]"
                        defaultValue={2}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-2*-4"
                        title="Kinda bad - 2 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-1*-4"
                        name="ratings[4]"
                        defaultValue={1}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-1*-4"
                        title="Sucks big time - 1 star"
                      />
                    </fieldset>
                  </div>
                  <div className="col-4">
                    <fieldset id="demo1" className="rate">
                      <input
                        className="stars"
                        type="radio"
                        id="technical-5-4"
                        name="rating[4]"
                        defaultValue={5}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-5-4"
                        title="Awesome - 5 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-4-4"
                        name="rating[4]"
                        defaultValue={4}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-4-4"
                        title="Pretty good - 4 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-3-4"
                        name="rating[4]"
                        defaultValue={3}
                        defaultChecked=""
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-3-4"
                        title="Meh - 3 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-2-4"
                        name="rating[4]"
                        defaultValue={2}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-2-4"
                        title="Kinda bad - 2 stars"
                      />
                      <input
                        className="stars"
                        type="radio"
                        id="technical-1-4"
                        name="rating[4]"
                        defaultValue={1}
                        disabled=""
                      />
                      <label
                        className="full"
                        htmlFor="technical-1-4"
                        title="Sucks big time - 1 star"
                      />
                    </fieldset>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <hr />
                    <h6>Remark</h6>
                  </div>
                  <div className="col-md-12 mt-3">
                    <p className="text-sm">Soluta amet pariatu</p>
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

export default AppraisalDetailModal;
