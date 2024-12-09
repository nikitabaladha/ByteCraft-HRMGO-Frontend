const BulkpaymentModal = ({ isOpen, title, body, onClose, onBulkPayment }) => {
    if (!isOpen) return null;
  
    return (
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{body}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onBulkPayment} // Trigger bulk payment
              >
                Bulk Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BulkpaymentModal;
  