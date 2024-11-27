import React from "react";

const CalenderPopup = () => {
  return (
    <>
      {/* CalenderPopup */}
      <div
        id="fc-dom-189"
        className="fc-popover popover fc-more-popover fc-day fc-day-sun fc-day-future fc-day-other"
        aria-labelledby="fc-dom-275"
        data-date="2025-01-26"
        style={{ top: "56.6px", left: "0.800003px" }}
      >
        <div className="fc-popover-header popover-header">
          <span className="fc-popover-title" id="fc-dom-275">
            January 26, 2025
          </span>
          <span className="fc-popover-close fa fa-times" title="Close" />
        </div>
        <div className="fc-popover-body popover-body">
          <div className="fc-daygrid-event-harness">
            <a
              className="fc-daygrid-event fc-daygrid-block-event fc-h-event fc-event fc-event-draggable fc-event-resizable fc-event-start fc-event-end fc-event-future event-primary"
              href="https://demo.workdo.io/hrmgo/event/65/edit"
            >
              <div className="fc-event-main">
                <div className="fc-event-main-frame">
                  <div className="fc-event-title-container">
                    <div className="fc-event-title fc-sticky">
                      Culpa non perspiciat
                    </div>
                  </div>
                </div>
              </div>
              <div className="fc-event-resizer fc-event-resizer-end" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalenderPopup;
