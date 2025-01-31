// components/DashboardMain/Overview/Overview.js

import React from "react";

const SetSalaryTable = () => {
  return (
    <>
      <div class="row">
        <div class="col-md-12 col-lg-12 col-sm-12 col-xl-12">
          <div class="card">
            <div class="card-header card-body table-border-style">
              <div class="table-responsive">
                <table class="table" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Employee Id</th>
                      <th>Name</th>
                      <th>Payroll Type</th>
                      <th>Salary</th>
                      <th>Net Salary</th>
                      <th width="200px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Inpub1ZzRTAvM0xVZzR6YThGOWlaQ1E9PSIsInZhbHVlIjoiMEJpZ1pwUThSRjVncFpDVkdaOXpUUT09IiwibWFjIjoiYWEwY2NmMTQxZTkwZGIyOTY4NWRmOWFlOTNlZmIwYjJkYzk2YTk2ODBkNDdhOTQ0MzA2YmQ1ODU1ZDZlNWI3MCIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000001
                        </a>
                      </td>
                      <td>Julie Lynn</td>
                      <td>Monthly Payslip</td>
                      <td>$50.00</td>
                      <td>$61,149.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IlM3Y0ptdmRWZWU0R2daeFRTSzBFckE9PSIsInZhbHVlIjoicUtpQlo1S3Z5L3Z1elNFMDVQdXgzQT09IiwibWFjIjoiNDJlZTc3MDI3YTMwZThmNjFiNzg1N2ZmY2Y0MmRjZjc5NjJmYzQ3OGExNjBlZDYwMmM1NThlZTM3NWMxZjhhYiIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IkFIVVdZazZpYXFVMUZkS00yeENnWWc9PSIsInZhbHVlIjoidzMvekcyZkFZQzJveE1PWDBwTForQT09IiwibWFjIjoiZjgzN2M2MGQwNTAxNWYzZTE1YjE0NjU0MzUzYjU5NDY3MDQ2YWEyYjY0ODY0Zjk3NzUzYTM4MjMzNGY1YzBmMSIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000002
                        </a>
                      </td>
                      <td>Lunea Todd</td>
                      <td>Monthly Payslip</td>
                      <td>$40,000.00</td>
                      <td>$344,624.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IkJoamNaand0TEZQMUpWTVpWOVRhenc9PSIsInZhbHVlIjoiekNvOWV0SC9TSGY1R1JOV3MyWUh0QT09IiwibWFjIjoiMWJlNjBmMzZjN2Y4ZTRlOWM2NjNlNjBlM2FmZWU0MThlYTU1YWQ2YThhOGI4ZjY4Yjc2MTcwOGZjYjc1OGVmMyIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Ijc1QzhTbjJSN09sTEQyVUJqTmVLZnc9PSIsInZhbHVlIjoib2wrUEszRDJuTVk1TVMvVFhFSnFtdz09IiwibWFjIjoiYWU2ZTE1NGU1MTBjNDgzYWIzNDlkMGI0NTMzOGRhNGYzOWQ1ZGY1YjNlYzg2YTlmMzIyZDRlMWIwODA4ZjAxYSIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000003
                        </a>
                      </td>
                      <td>Ida F. Mullen</td>
                      <td>Monthly Payslip</td>
                      <td>$25,000.00</td>
                      <td>$43,381.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IlY3Q3ZZc0FSM3JqemZvRGZWUDlJeHc9PSIsInZhbHVlIjoiUlRNTmhrVjFDYmxFb2syK2JxUzA2Zz09IiwibWFjIjoiNWI4ODUzNjAwYmM3NDRiYjZlYTczZTNiM2JiOWFlZmNhN2Q3Njc3ODBmOGExMzkzMzU0Y2UyYmVlODNiN2FiNiIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6InVoY3hVRkFUT0ttUVZ6WkhjV1hmT1E9PSIsInZhbHVlIjoieTBJOWQ3azJyYk11dGNlRnB6YmpTZz09IiwibWFjIjoiMzE0YzIzNjFhOGQ4ZDZmYTc3MzI3Mzk0N2QwMzg1Y2JlYjc2YTBiYTIwZDUwYmY2ODFhNDZkYmY1ZjJiM2I1YyIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000004
                        </a>
                      </td>
                      <td>Teresa R McRae</td>
                      <td>Hourly Payslip</td>
                      <td>$10,000.00</td>
                      <td>$3,090,341.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IlMvQmtpL1c2aUgrNjA3Wk5uRFIwL1E9PSIsInZhbHVlIjoiRjU4ZnhaNVpuSzVGb3hUd0YvRVNXdz09IiwibWFjIjoiODljNGMzMjc1ZmE2NTUyMzUwZDg4NDIxZjVjYzJhOTBiYjczN2ZlZjM5YjgyODc5YzJkNjUzYTNmOTU0NGUyYiIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IjJUT1pIeWNCTUl2MUFOM2xnNWpZYnc9PSIsInZhbHVlIjoiRzgwZ3lneFRvc01SY2Fuc0hMaEk1Zz09IiwibWFjIjoiMzkxMzJiYzczYmE4NzcxY2Q3YmU2YzkwY2FjMDYxYWY3NTljMmI2MDY3YjRmZjc5M2Y5MTg2ZTYwZTI2ZjcxZSIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000005
                        </a>
                      </td>
                      <td>Joel O Dolan</td>
                      <td>Monthly Payslip</td>
                      <td>$50,000.00</td>
                      <td>$936,359.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IkpIb0FSekJXR2d2cVFFOVpVSTBRSlE9PSIsInZhbHVlIjoiNEVVSHFXTG4rcDdpOExzZFFPR0lhQT09IiwibWFjIjoiOGE5NmExYTAyYWFmYWFkYTEzNTVhZjQxYmNiYTNkYWFkZGM5OTA1OTZkNTQyNmIzODlkMmNhZGEzOTk4MmJmYiIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Img0WVFtSXV0NTJ5bDBSNDBmZGVQMWc9PSIsInZhbHVlIjoiY0oxblhMU2trYzUrWmZLbWJjdEw2Zz09IiwibWFjIjoiZjgxNGI3ZTZmMzAwYTg1OTRjNTg5NTQwM2NhOTQ1YzAzNzdjMjUwYzU3YTAzODYwNTJhNTNlZjRhM2ZmYWZkYiIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000003
                        </a>
                      </td>
                      <td>Ida F. Mullen</td>
                      <td>Monthly Payslip</td>
                      <td>$25,000.00</td>
                      <td>$25,000.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IlpJcU5IL3AveG5BcElyeVF3YzZuM0E9PSIsInZhbHVlIjoibVRoMUhmU3o1NC8wWCs0KzlwSFZ2Zz09IiwibWFjIjoiYjU3ODZhMjgyNjY0MjZhMmMxNmFjZDc0N2FiYzY2YWUyOThiNjc1YjRmMmMzZjBkZGVhOGI1ODRkZWJhMGI2NCIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Ii9LWkh2SWt5OGk3ZWowMm1HSnZBVUE9PSIsInZhbHVlIjoib2M3d2VSN3lUeXltM1BScVdsY0lpZz09IiwibWFjIjoiZTMyOGViNTU0NjU1NGY1ODU4MDg1N2ZlZTc2M2Y2MjNkNGY1MTJiNzE0MTFkMDk2ZWUwM2E4NzRiNTMzZTg3ZiIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000006
                        </a>
                      </td>
                      <td>Jeremy Holmes</td>
                      <td>Monthly Payslip</td>
                      <td>$2,500.00</td>
                      <td>$40,874.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6ImRqS1hUWk13eDFYZUlSNGJ5RCswS2c9PSIsInZhbHVlIjoiaTNGR3NKYTlXYUN4V1psN2N5ajRMUT09IiwibWFjIjoiZWYzMjNlMWE1MmMwZmRkZTdlMjU1Y2Q0YzlkYTYwNWUwNzJkMTUzMjY1YjkwNmYxNjhiNWZhM2IyYTgxY2YzNSIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Ikh3ZXFJY0JwUUVmL3BZazVHOHdhN2c9PSIsInZhbHVlIjoiOTRtemNvdkVxMHU0eGErTmZiUmFHZz09IiwibWFjIjoiNzdhZTYwYWMxOTA5ODgxNWVjNmJkM2I1YWMzYzFhMzhkYzBiMTQwYWNhMGM5YjMyZGUwODVkYzhjZTc3YTRlMyIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000007
                        </a>
                      </td>
                      <td>Anjolie Mayer</td>
                      <td>Monthly Payslip</td>
                      <td>$5,000.00</td>
                      <td>$444,095.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6ImlISk9jNlNXdi94eDhpNGVsZCs0WEE9PSIsInZhbHVlIjoidHJNTmRZY0Q0K0FpMDN4VTIxb3VlUT09IiwibWFjIjoiNjMwOWYyYzk4M2QzOTZmZDNhNGQ4M2ViYWJhYmQxNWI5OTM3YjUyY2RhZWM3YTM5YWI5MGFkNGZlOTM1N2Q4OSIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IkxwUkpiYmtmSjV6dXdNcUxycWdUMFE9PSIsInZhbHVlIjoicWk0cVczbUh6d1dYSFhuR1F4VlloQT09IiwibWFjIjoiODgyZDJhZGIyNWRlOTk4OGZmNmJkOTQ0M2QzODAzNDVlZTA3OTg2N2YyZDI5MDI2NjU2NDJkYmMxNWZkNmMyZCIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000008
                        </a>
                      </td>
                      <td>Nyssa Sloan</td>
                      <td>Monthly Payslip</td>
                      <td>$4,000.00</td>
                      <td>$38,414.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IlFhb3UxYmw1TVYwdDBRSEI2dU5wVWc9PSIsInZhbHVlIjoicC9LOW1hVGxWT29XZisxdC92TUsyUT09IiwibWFjIjoiMzc4NDY0YjEzYTU2NTdmMDFiMDlhNWFmYmZiMDk2ZmYzYWM4ZDE2MmY3YmRjZWFmOGJkMTNkMTJhZTc2MzdiYyIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IkRhYjNZYTdTc1p1WkVqSldldDBUaUE9PSIsInZhbHVlIjoiSDV4bDJRY1pSaHFZNkV5aU9ldGl0dz09IiwibWFjIjoiN2M3OGZlZGRlZWU3N2FlNGVmM2Q3OWFjNjQ0YTJiZmQ4Y2MyYTljYTBkNjg1OTY0ZmM0NjI5MDdmODQ5NmFlOCIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000009
                        </a>
                      </td>
                      <td>Jillian Sykes</td>
                      <td>Monthly Payslip</td>
                      <td>$3,000.00</td>
                      <td>$342,764.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6ImsyVFUwSFVFclhkcC9rcmQwSDBJNUE9PSIsInZhbHVlIjoiMkx2Vk93YXVvZ1FvVmFrYTR5UUFYdz09IiwibWFjIjoiOGMxNTQ2Y2QzNzdjODMxNDFhZjFlYmUyYzIxYjExYjVmNTQzOWQ2NTRiMGE4ZWI5NjhhZGQ2MjcwYTc0MWRlOCIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6InowYi9ZVGdGUFpuaWtaTDhTTFljZlE9PSIsInZhbHVlIjoiMEh5a1RLUldVTUtrUVRJbHpIVk5Vdz09IiwibWFjIjoiZTc5YzZjYzFiZTA0OGUyMjZjMGYyZjVjNTgxNDQ0Y2UyYmU1NDAwNTY4MmU4NjNlYWJjNGQxYjc1MjJhNjJiNyIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000010
                        </a>
                      </td>
                      <td>Aida Bugg</td>
                      <td>Monthly Payslip</td>
                      <td>$30,000.00</td>
                      <td>$64,325.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IlJIVE5oSFlQYTg1VFpDdjF5NGw4dnc9PSIsInZhbHVlIjoid25oQmhNWWJ5SlFrMzV4R29WNEdEZz09IiwibWFjIjoiOTYwMWFjY2VjOTJlZGQ2NjE4NTAzMTVhNWNhN2E0NDUxYmFlMjFjMjJlYTFkODVkNzc3NGRiODEzODFhYTI0NiIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Ill2cHVQUDVuNWlGV1RqdXBnZjNkRVE9PSIsInZhbHVlIjoiTXpFUUo2YzUxanVjazRJSThjOVUzUT09IiwibWFjIjoiYmQ0ODY5MzhiODZjNjg5MmNjY2JiYTIzYzg2YjI4ZmZjN2ZhNWRjODEwM2U0YWI2MzY4NDRmMTA2MjJkMzIzYyIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000011
                        </a>
                      </td>
                      <td>Mona Hendricks</td>
                      <td>Monthly Payslip</td>
                      <td>$3,000.00</td>
                      <td>$29,293.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6ImVvelVEdzE3TlBZaXg3Rmxzd1d1SVE9PSIsInZhbHVlIjoiRlBKMEw3S0loTlVMeDIwTGdYMUJ6QT09IiwibWFjIjoiNGQwNmU2NzNmYmRhMzBmNmM1NzBmY2NjM2RlNGNiZTlkZjMyMWYxZTVlMDY5MGZhMTEzNjMzMDc3ZjQ5ZWE4OSIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Ik15dnplbmRaU0xNYXRCazBsR0lNS2c9PSIsInZhbHVlIjoiNVNVVTM4eStZTTFMczMvUjJFV1JSQT09IiwibWFjIjoiZjVmNWQ3NTdjZDZkOTNmZTdiMGM3NDg5MDI4YTBjMGQxYjYzMDExMGM2OTNjOGNmNWJjMDI1ZTgzMTU0ZTU1NCIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000012
                        </a>
                      </td>
                      <td>Kyle Willis</td>
                      <td>Monthly Payslip</td>
                      <td>$20.00</td>
                      <td>$3,031,953.40</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Ing4REhhTVNYeGlZK2FZN3RTdFpUdFE9PSIsInZhbHVlIjoia0xsWER1RXlVRENoYU1na1NZeHhWdz09IiwibWFjIjoiNGM2ZWIzMDI4NzhlYTU3NWE4YzY1M2FmMmZjMmYwZTU5YTMwNzBmMDBkNWZlYjFiODc5ODhhNzEwNDU1MTdjYyIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IlpSTE9sM0hxOTZ6d0NVQzVxTnBHc0E9PSIsInZhbHVlIjoiSldGMzJvQ28xTVB4QWRkT0hlRHR5dz09IiwibWFjIjoiYmFhMzM4MjBjNzdmZDc4NmJhODJhMTMwN2NhNmUxZDFmZjNmNDk4YzY5NjMyMjJlYWFjY2JkM2ZlMjg5YzYzMiIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000013
                        </a>
                      </td>
                      <td>Abra Stevens</td>
                      <td>Monthly Payslip</td>
                      <td>$20.00</td>
                      <td>$20.00</td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IlA1b1hMeWdwc1lSTzNXVm90Vmd5VHc9PSIsInZhbHVlIjoidEFueDRSUzVHZDNDSERBWU9GMWVDZz09IiwibWFjIjoiYjFkMTgxYmVlMTEwYmQzMTk0ZDZmZWZlMzQ2MjIxYzg3ZmM4ZDMxN2M3MDZiYzk5NDYzYTI3MGJkZjczMTQwNCIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Im04bENHdllsZFBmeWNWNXF6eE1JNXc9PSIsInZhbHVlIjoiMTQ0aEd5M1B0dE1KSXlXaTBneHlNUT09IiwibWFjIjoiNWI5MDNjN2E3MGU5ODdjYTMxZTEzMWRhOTI2ZjY0NzMwOWNkY2E2NTllN2I2ODMxMjY2MWY5ZTZkYTdlOTk1ZiIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000014
                        </a>
                      </td>
                      <td>fercho</td>
                      <td></td>
                      <td>$0.00</td>
                      <td></td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Im9kdTlEc1kwVWV6ZUdmV21XK2kyaWc9PSIsInZhbHVlIjoiRHN1bUQ3cVc4TXRzNW5CWkc1cTFxQT09IiwibWFjIjoiMTRlZTlmNGUyZTZmMmUyNzVjZTEwMzA3ZWZmNmRiY2M4ZDYwZTU1ZDdkNjUyMWIxM2I3YTU2ZGNkYTE1NThjNyIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IjEzMExCRkl3d1dMejFUNW9oZXptU3c9PSIsInZhbHVlIjoiQlJBNEU3SXhsUGJSdExRUWhLdFVqQT09IiwibWFjIjoiMDY1NGYzZTQ0MjBiODA1ZmY4Zjk5OGZiNzY2NTI5YmYyNWE5Y2ZlMzY4MDE2NjQ1YzQ1YTk5ZDRmNjhiNDdhMiIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000015
                        </a>
                      </td>
                      <td>Tamekah Wolfe</td>
                      <td></td>
                      <td>$0.00</td>
                      <td></td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IlVhMHVDU3BOU2trSTZRS2lyWkRqeHc9PSIsInZhbHVlIjoicFhXNytxTVpjRDA5U2NLRHRlc3RTUT09IiwibWFjIjoiZmJhNzg2MTAzYTFkYmI1NmRhOWMzOTI3OTM1NmM1ZjYzN2UwZTRkYzFkZjI5Y2ZkODcyZDE4ODhjNjgyNTVhNSIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6ImZpSG5uRnhKYTdnVnNOeHJwSVR5aFE9PSIsInZhbHVlIjoiQXJncld4SUZvNGdSbDR6NW92MWFNdz09IiwibWFjIjoiYmExNjI5MDBmNmE1YjExMDIzNzVjY2NlYjIzYmI1YjEzYWE1OTBjYzI4NmU1YjIwMzNlNzQwNjJkMWYzMzllMSIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000016
                        </a>
                      </td>
                      <td>Patrick Cleveland</td>
                      <td></td>
                      <td>$0.00</td>
                      <td></td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6InFtYU03RFlNU0ZxY2tyVFlUV3c3SVE9PSIsInZhbHVlIjoicUk0RGZ0elZZMkFqN0NsK3dKTE1zdz09IiwibWFjIjoiYjExOGY4NjgzOGU4ZGI4Njg1MTAwYzk4NjA2MGFmNzVjMTQyYzBhOGNhZDcyODk4ZGI5ZGMxOGJjMTM2ZjMyZSIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6ImRBNGF0Y3d0TmxObDhocnYvUWlWanc9PSIsInZhbHVlIjoiWG5rMlprK0JKc3BTd2g3L2hmd2t6Zz09IiwibWFjIjoiMTBkNWY2NTRiMTY3YmZmYWJlNmE1NmYyZmUxOTc4YzBmNjhiYjAzY2JhNmJiOWNjODIwYjliOTEzMWYyNjIwZCIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000017
                        </a>
                      </td>
                      <td>Colton Benjamin</td>
                      <td></td>
                      <td>$0.00</td>
                      <td></td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Ilk5WTNvKzk4bmdrekphM3NIVmJhSEE9PSIsInZhbHVlIjoiMUVtY1RSdUhqUWo2VUV6ZVArSnBRdz09IiwibWFjIjoiMGNmNGM1MGM0YmYzMGFhNGEzMTFiMzU5Njc0MTIwNTRkMDM1MTkzM2I4NjJjMjkxYTc5NWZmNmM4YzA3NzQ0ZiIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6Im1OM2J5VUg5VDg4czc0dlRqZWZJSnc9PSIsInZhbHVlIjoiU0h1TmJEM1ZURmZCRVljVHNCWElyUT09IiwibWFjIjoiNTI4YjZjNmY5MDg5YzU1MDNjNjg2ZTRiYzI2NjIyYWQ4ZjFhYTU3Y2ZjNWMyMTRhYzA5NTA5Y2RjY2ZjZDNkNCIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000018
                        </a>
                      </td>
                      <td>Brent Kerr</td>
                      <td></td>
                      <td>$0.00</td>
                      <td></td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6InpHYmVxWTROeFFRUURrZXJ6M2N5QXc9PSIsInZhbHVlIjoiVlh3Z0IwVE9xMjBHREdzVWRtT2Evdz09IiwibWFjIjoiYWY5MThlZDdiZWRlNGNhMGYxMGYwNTZmYzA1YjAyNzU3ZWViYWJjZjQ2ZWI0YjEzNThlNzhkMjhjM2ZlZjJiMSIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6IktHQUZmU2EwRGxWVC9OeVZzNjFiT0E9PSIsInZhbHVlIjoiV0tRYUFPRTdvaURUd3ZyeEphcG5iUT09IiwibWFjIjoiMWFmOGM1ZjJlYTcwNzA0ODdlNzU3OTJkYmViYWE3ZTM3NzMxNDM1MTg4NWIxMzEzMmExZjJlNDFjZDIzMDgxNiIsInRhZyI6IiJ9"
                          class="btn btn-outline-primary"
                        >
                          #EMP0000019
                        </a>
                      </td>
                      <td>Ramona Conway</td>
                      <td></td>
                      <td>$0.00</td>
                      <td></td>
                      <td class="Action">
                        <span>
                          <div class="action-btn bg-warning ms-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/setsalary/eyJpdiI6InF0YmZpZ2VURjZrakRxQnEvVHJTZ3c9PSIsInZhbHVlIjoiN3AyR0YzNi80Y0U2ZEtWdHY3bUd1QT09IiwibWFjIjoiNTBjNmUwZTMxZTFjYzU4ZWQ0MjIzYjA3YmNmODFhYjM4Njk2ZmI3OThiMGVjY2MzYmVlYWIyYWVmYTNkOWM0NyIsInRhZyI6IiJ9"
                              class="mx-3 btn btn-sm  align-items-center"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="View"
                            >
                              <i class="ti ti-eye text-white"></i>
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetSalaryTable;
