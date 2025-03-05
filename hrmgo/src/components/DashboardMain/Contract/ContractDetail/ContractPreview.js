import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { formatDate, formatCost } from "../../../../js/custom";
import { saveAs } from "file-saver";
import DOMPurify from "dompurify";

const ContractPreview = () => {
  const location = useLocation();

  // Access contractData correctly
  const { contractData, autoDownload } = location.state || {};
  console.log("contractData", contractData);

  const downloadWordFile = async () => {
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="utf-8">
          <title>Contract</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2 { color: #333; }
            p { line-height: 1.5; }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              border: none; /* Remove table borders */
            }
            th, td { 
              padding: 8px; 
              text-align: left; 
              border: none; /* Remove cell borders */
            }
            .text-md { font-size: 16px; }
            .text-end { text-align: right; }
            .mt-3 { margin-top: 1rem; }
            .mb-3 { margin-bottom: 1rem; }
          </style>
        </head>
        <body>
          <table>
            <tr>
              <td colspan="2" style="text-align: center;">
                <img src="http://localhost:3000/storage/uploads/logo/Black-Logo%20(1).png" alt="Logo Dark" style="max-width: 10px; max-height: 10px;">
             </td>
            </tr>
            <tr>
              <td style="text-align: left;">
                <h3>#${contractData?.contractId}</h3>
              </td>
              
            </tr>
            <tr>
              <td colspan="2">
                <table>
                  <tr>
                    <td style="width: 50%;">
                      <p><strong>Contract Type:</strong> ${
                        contractData?.contractType
                      }</p>
                      <p><strong>Contract Value:</strong> ${formatCost(
                        contractData?.value
                      )}</p>
                    </td>
                    <td style="width: 50%; text-align: right;">
                      <p><strong>Start Date:</strong> ${formatDate(
                        contractData?.startDate
                      )}</p>
                      <p><strong>End Date:</strong> ${formatDate(
                        contractData?.endDate
                      )}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p>Sit ad qui molestia</p>
                <br />
                <div>${DOMPurify.sanitize(contractData?.description)}</div>
              </td>
            </tr>
            <tr>
              <td style="width: 50%;">
                
                <div>
                  <h5>Company Signature</h5>
                </div>
              </td>
              <td style="width: 50%; text-align: right;">
                
                <div>
                  <h5>Employee Signature</h5>
                </div>
              </td>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "application/msword" });
    saveAs(blob, "contract.doc");
  };

  useEffect(() => {
    if (autoDownload) {
      downloadWordFile();
    }
  }, [autoDownload]);

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
                    <i className="ti ti-download text-white"></i>
                  </button>
                </div>

                <div
                  className="card mt-5"
                  id="printTable"
                  // style={{ marginLeft: 180, marginRight: "-57px" }}
                >
                  <div className="card-body">
                    <div className="row invoice-title mt-2">
                      <div className="col-xs-12 col-sm-12 col-nd-6 col-lg-6 col-12 ">
                        <img
                          src="/storage/uploads/logo/Black-Logo (1).png"
                          alt="Logo Dark"
                          style={{ maxWidth: "150px" }}
                        />
                      </div>
                      <div className="col-xs-12 col-sm-12 col-nd-6 col-lg-6 col-12 text-end">
                        <h3 className="invoice-number">
                          #{contractData?.contractId}
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
                              {contractData?.contractType}
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
                              {formatCost(contractData?.value)}
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
                                  {formatDate(contractData?.startDate)}
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
                                  {formatDate(contractData?.endDate)}
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
                        __html: DOMPurify.sanitize(contractData?.description),
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
