import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { formatDate, formatCost } from "../../../../js/custom";
import { saveAs } from "file-saver";
import DOMPurify from "dompurify";
import logoDark from "./logo-dark.png";

const ContractPreview = () => {
  const location = useLocation();
  const contractData = location.state;

  const downloadWordFile = async () => {
    // Function to convert image URL to Base64
    const toBase64 = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    // Get the Base64 image from the URL
    const logoBase64 = await toBase64(logoDark);

    // Prepare the HTML content with the Base64 image
    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Contract</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2 { color: #333; }
            p { line-height: 1.5; }
          </style>
        </head>
        <body>
          <h1>${contractData.contractId}</h1>
          <h2>Contract Type: ${contractData.contractType}</h2>
          <p>Contract Value: ${formatCost(contractData.value)}</p>
          <p>Start Date: ${formatDate(contractData.startDate)}</p>
          <p>End Date: ${formatDate(contractData.endDate)}</p>
          <div>${DOMPurify.sanitize(contractData.description)}</div>
          <h2>Company Signature:</h2>
          <div style="border: 1px solid #000; width: 200px; height: 50px;"></div>
          <h2>Employee Signature:</h2>
          <div style="border: 1px solid #000; width: 200px; height: 50px;"></div>
          <img src="${logoBase64}" style="max-width: 150px;" alt="logo" />
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "application/msword" });
    saveAs(blob, "contract.doc");
  };

  return (
    <div className="container">
      <div className="dash-content">
        <div className="page-header">
          <div className="page-block">
            <div className="row align-items-center">
              <div className="col-md-12 mt-5 mb-4">
                <div className="d-block d-sm-flex align-items-center justify-content-between">
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-10">
            <div className="container">
              <div>
                <div
                  className="text-md-end mb-2"
                  style={{ marginRight: "-44px" }}
                >
                  <button
                    onClick={downloadWordFile}
                    className="btn btn-sm btn-primary btn-icon"
                    title="Download"
                    aria-label="Download"
                  >
                    <MdOutlineFileDownload className="text-white" />
                  </button>
                </div>

                <div
                  className="card mt-5"
                  id="printTable"
                  style={{ marginLeft: 180, marginRight: "-57px" }}
                >
                  <div className="card-body">
                    <div className="row invoice-title mt-2">
                      <div className="col-xs-12 col-sm-12 col-nd-6 col-lg-6 col-12 ">
                        <img
                          src={logoDark}
                          alt="Logo Dark"
                          style={{ maxWidth: "150px" }}
                        />
                      </div>
                      <div className="col-xs-12 col-sm-12 col-nd-6 col-lg-6 col-12 text-end">
                        <h3 className="invoice-number">
                          #{contractData.contractId}
                        </h3>
                      </div>
                    </div>
                    <div className="row align-items-center mb-4">
                      <div className="col-sm-6 mb-3 mb-sm-0 mt-3">
                        <div className="col-lg-6 col-md-8 mb-3">
                          <h6 className="d-inline-block m-0 d-print-none">
                            Contract Type:
                          </h6>
                          <span className="col-md-8">
                            <span className="text-md">
                              {" "}
                              {contractData.contractType}
                            </span>
                          </span>
                        </div>
                        <div className="col-lg-6 col-md-8">
                          <h6 className="d-inline-block m-0 d-print-none">
                            Contract Value:
                          </h6>
                          <span className="col-md-8">
                            <span className="text-md">
                              {" "}
                              {formatCost(contractData.value)}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6 text-sm-end">
                        <div>
                          <div className="float-end">
                            <div className="">
                              <h6 className="d-inline-block m-0 d-print-none">
                                Start Date:
                              </h6>
                              <span className="col-md-8">
                                <span className="text-md">
                                  {" "}
                                  {formatDate(contractData.startDate)}
                                </span>
                              </span>
                            </div>
                            <div className="mt-3">
                              <h6 className="d-inline-block m-0 d-print-none">
                                End Date:
                              </h6>
                              <span className="col-md-8">
                                <span className="text-md">
                                  {" "}
                                  {formatDate(contractData.endDate)}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p data-v-f2a183a6=""></p>
                    <div>Sit ad qui molestia</div>
                    <br />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(contractData.description),
                      }}
                    ></div>

                    <p />
                    <div className="row">
                      <div className="col-6">
                        <div style={{ marginTop: 20 }}>
                          <img width="200px" src="" alt="" />
                        </div>
                        <div>
                          <h5 className="mt-4">Company Signature</h5>
                        </div>
                      </div>
                      <div className="col-6 text-end">
                        <div style={{ marginBottom: 20 }}>
                          <img width="200px" src="" alt="" />
                        </div>
                        <div>
                          <h5 style={{ marginTop: 45 }}>Employee Signature</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPreview;
