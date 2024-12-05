import React from "react";

const ContractDetailHeader = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">At nostrum laboriosa</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="https://demo.workdo.io/hrmgo/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  <a href="https://demo.workdo.io/hrmgo/contract">Contract</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page" />
                Contract Detail
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <div className="col-md-12 text-end d-flex ">
                  <div className="text-end pt-2">
                    <a
                      href="#"
                      className="btn btn-sm btn-primary"
                      data-size="medium"
                      data-ajax-popup-over="true"
                      data-url="https://demo.workdo.io/hrmgo/generate/contracts"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-title="Generate Content With AI"
                      data-bs-original-title="Generate"
                    >
                      <i className="fas fa-robot" /> Generate With AI
                    </a>
                  </div>
                  <a
                    href="https://demo.workdo.io/hrmgo/contract/1/mail"
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-bs-toggle="tooltip"
                    data-bs-original-title="Send Email"
                  >
                    <i className="ti ti-mail text-white" />
                  </a>
                  <a
                    href="#"
                    data-size="lg"
                    data-url="https://demo.workdo.io/hrmgo/contract/copy/1"
                    data-ajax-popup="true"
                    data-title="Duplicate"
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Duplicate"
                    aria-label="Duplicate"
                  >
                    <i className="ti ti-copy text-white" />
                  </a>
                  <a
                    href="https://demo.workdo.io/hrmgo/contract/pdf/eyJpdiI6IlUremx3Z2Ura0lqMmZoWkdNbjIxdlE9PSIsInZhbHVlIjoieTdLTHlxSnRzd2VyT2pDck14Zks3QT09IiwibWFjIjoiYjYyMjZjZmQ0NTRmYzRiMjMzY2U5YWVkMDg3OTA1ZTRiZWQwMWM2NTVjMzc3Zjk5MmYwYzZmZjVkZGZjM2U3NCIsInRhZyI6IiJ9"
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    target="_blanks"
                    data-bs-original-title="Download"
                    aria-label="Download"
                  >
                    <i className="ti ti-download text-white" />
                  </a>
                  <a
                    href="https://demo.workdo.io/hrmgo/contract/1/get_contract"
                    target="_blank"
                    className="btn btn-sm btn-primary btn-iconn m-2"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-original-title="Preview"
                  >
                    <i className="ti ti-eye" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-url="https://demo.workdo.io/hrmgo/signature/1"
                    data-ajax-popup="true"
                    data-title="Signature"
                    data-size="md"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-original-title="Signature"
                  >
                    <i className="ti ti-writing-sign" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetailHeader;
