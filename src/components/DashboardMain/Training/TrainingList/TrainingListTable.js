// import React from 'react'

// const TrainingListTable = () => {
//   return (
//     <div>
//       <div class="row">

// <div class="col-xl-12">
//     <div class="card">
//         <div class="card-header card-body table-border-style">

//             <div class="table-responsive">
//                 <table class="table" id="pc-dt-simple">
//                     <thead>
//                         <tr>
//                             <th>Branch</th>
//                             <th>Training Type</th>
//                             <th>Status</th>
//                             <th>Employee</th>
//                             <th>Trainer</th>
//                             <th>Training Duration</th>
//                             <th>Cost</th>
//                             <th width="200px">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>


//                         <tr>
//                             <td>China</td>
//                             <td>Job Training <br></br></td>
//                             <td>
//                                 <span class="badge bg-warning p-2 px-3  mt-1 status-badge6">Pending</span>

//                             </td>
//                             <td>Julie Lynn </td>
//                             <td>Teresa</td>
//                             <td>Nov 8, 2024 to Dec 30, 2024
//                             </td>
//                             <td>$1,000.00</td>
//                             <td class="Action">
//                                 <div class="dt-buttons">
//                                     <span>

//                                                                                     <div class="action-btn bg-warning me-2">
//                                         <a href="https://demo.workdo.io/hrmgo/training/eyJpdiI6IkpWdW8vS3JkMlJSdFZGODluaVBQbXc9PSIsInZhbHVlIjoiVW9UM2x0SHd6ekhQSzRNcXpobmlaUT09IiwibWFjIjoiODBmMzAwMzNlOWEzNzg3ZTdkZDQ5NTcyYzcwYzc5ZmUwNjllZWY4NjM4YzhiZmQ5OTUxN2MwMGFkNzhkODk2MyIsInRhZyI6IiJ9" class="mx-3 btn btn-sm  align-items-center" data-size="lg"
//                                             data-url=""
//                                             data-ajax-popup="true" data-size="md" data-bs-toggle="tooltip"
//                                             title="" data-title="Show Trainer"
//                                             data-bs-original-title="View">
//                                             <span class="text-white"><i class="ti ti-eye "></i></span>
//                                     </a>
//                                 </div>


//                                 <div class="action-btn bg-info me-2">
//                                     <a href="#" class="mx-3 btn btn-sm  align-items-center" data-size="lg" data-url="https://demo.workdo.io/hrmgo/training/1/edit" data-ajax-popup="true" data-size="md" data-bs-toggle="tooltip" title="" data-title="Edit Training" data-bs-original-title="Edit">
//                                             <span class="text-white"><i class="ti ti-pencil "></i></span>
//                                         </a>
//                                 </div>

//                                 <div class="action-btn bg-danger ">
//                                     <form method="POST" action="https://demo.workdo.io/hrmgo/training/1" accept-charset="UTF-8" id="delete-form-1"><input name="_method" type="hidden" value="DELETE"/><input name="_token" type="hidden" value="aSjmyah0WndL3NAL3S5wwVS5dA915kAI3FUbJUaF"/>
//                                         <a href="#" class="mx-3 btn btn-sm  align-items-center bs-pass-para" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete" aria-label="Delete"><span class="text-white"><i
//                                                 class="ti ti-trash "></i></span></a>
//                                     </form>
//                                 </div>
//                                 </span>
//             </div>
//             </td>
//             </tr>
//             <tr>
//                 <td>China</td>
//                 <td>Job Training <br></br></td>
//                 <td>
//                     <span class="badge bg-primary p-2 px-3  mt-1 status-badge6">Started</span>

//                 </td>
//                 <td>Ida F. Mullen </td>
//                 <td>Teresa</td>
//                 <td>Dec 8, 2024 to Feb 27, 2025
//                 </td>
//                 <td>$2,000.00</td>
//                 <td class="Action">
//                     <div class="dt-buttons">
//                         <span>

//                                                                                     <div class="action-btn bg-warning me-2">
//                                         <a href="https://demo.workdo.io/hrmgo/training/eyJpdiI6ImtiZnNjeWVmSjdWbTRPdG1mQ0pjTkE9PSIsInZhbHVlIjoia1V4TG1nbWdEdU9hSWlTRXh4ZFUwZz09IiwibWFjIjoiZmUyOGNkOWViNjgyMzNhMTk1MzIyOTkzOGZjMGVlMzk4ZjIwNDQ0ZDgwMDAwM2U2MWU3Mzk4MGI1OGJjMWFmMSIsInRhZyI6IiJ9" class="mx-3 btn btn-sm  align-items-center" data-size="lg"
//                                             data-url=""
//                                             data-ajax-popup="true" data-size="md" data-bs-toggle="tooltip"
//                                             title="" data-title="Show Trainer"
//                                             data-bs-original-title="View">
//                                             <span class="text-white"><i class="ti ti-eye "></i></span>
//                         </a>
//                     </div>


//                     <div class="action-btn bg-info me-2">
//                         <a href="#" class="mx-3 btn btn-sm  align-items-center" data-size="lg" data-url="https://demo.workdo.io/hrmgo/training/2/edit" data-ajax-popup="true" data-size="md" data-bs-toggle="tooltip" title="" data-title="Edit Training" data-bs-original-title="Edit">
//                                             <span class="text-white"><i class="ti ti-pencil "></i></span>
//                                         </a>
//                     </div>

//                     <div class="action-btn bg-danger ">
//                         <form method="POST" action="https://demo.workdo.io/hrmgo/training/2" accept-charset="UTF-8" id="delete-form-2"><input name="_method" type="hidden" value="DELETE"/><input name="_token" type="hidden" value="aSjmyah0WndL3NAL3S5wwVS5dA915kAI3FUbJUaF"/>
//                             <a href="#" class="mx-3 btn btn-sm  align-items-center bs-pass-para" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete" aria-label="Delete"><span class="text-white"><i
//                                                 class="ti ti-trash "></i></span></a>
//                         </form>
//                     </div>
//                     </span>
//         </div>
//         </td>
//         </tr>
//         <tr>
//             <td>Canada</td>
//             <td>Job Training <br></br></td>
//             <td>
//                 <span class="badge bg-warning p-2 px-3  mt-1 status-badge6">Pending</span>

//             </td>
//             <td>Julie Lynn </td>
//             <td>Teresa</td>
//             <td>Jan 4, 2025 to Mar 1, 2025
//             </td>
//             <td>$68.00</td>
//             <td class="Action">
//                 <div class="dt-buttons">
//                     <span>

//                                                                                     <div class="action-btn bg-warning me-2">
//                                         <a href="https://demo.workdo.io/hrmgo/training/eyJpdiI6IkpNM2EyZVdnS3hUSngrL1BYMkdjMVE9PSIsInZhbHVlIjoiZFV4R3crTDVqVk54TXdDcVJmZDVxUT09IiwibWFjIjoiNGJkYzY2MTVhYmMxMGJjYjdhOWIwNDkwZGI3NjUyYmNkNThjNjJmMmEzNmE2MzI0ODQzNmVlMGJhYTlhMWYzNSIsInRhZyI6IiJ9" class="mx-3 btn btn-sm  align-items-center" data-size="lg"
//                                             data-url=""
//                                             data-ajax-popup="true" data-size="md" data-bs-toggle="tooltip"
//                                             title="" data-title="Show Trainer"
//                                             data-bs-original-title="View">
//                                             <span class="text-white"><i class="ti ti-eye "></i></span>
//                     </a>
//                 </div>


//                 <div class="action-btn bg-info me-2">
//                     <a href="#" class="mx-3 btn btn-sm  align-items-center" data-size="lg" data-url="https://demo.workdo.io/hrmgo/training/3/edit" data-ajax-popup="true" data-size="md" data-bs-toggle="tooltip" title="" data-title="Edit Training" data-bs-original-title="Edit">
//                                             <span class="text-white"><i class="ti ti-pencil "></i></span>
//                                         </a>
//                 </div>

//                 <div class="action-btn bg-danger ">
//                     <form method="POST" action="https://demo.workdo.io/hrmgo/training/3" accept-charset="UTF-8" id="delete-form-3"><input name="_method" type="hidden" value="DELETE"/><input name="_token" type="hidden" value="aSjmyah0WndL3NAL3S5wwVS5dA915kAI3FUbJUaF"/>
//                         <a href="#" class="mx-3 btn btn-sm  align-items-center bs-pass-para" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete" aria-label="Delete"><span class="text-white"><i
//                                                 class="ti ti-trash "></i></span></a>
//                     </form>
//                 </div>
//                 </span>
//     </div>
//     </td>
//     </tr>
//     <tr>
//         <td>China</td>
//         <td>Job Training <br/></td>
//         <td>
//             <span class="badge bg-danger p-2 px-3  mt-1 status-badge6">Terminated</span>

//         </td>
//         <td>Julie Lynn </td>
//         <td>Gabriel</td>
//         <td>Nov 4, 2024 to Dec 10, 2024
//         </td>
//         <td>$2,000.00</td>
//         <td class="Action">
//             <div class="dt-buttons">
//                 <span>

//                                                                                     <div class="action-btn bg-warning me-2">
//                                         <a href="https://demo.workdo.io/hrmgo/training/eyJpdiI6Ik90eU54am5PTHBiZ1lKdzJhQlBVS1E9PSIsInZhbHVlIjoiTEd5R2c2eFpWRnltcUlZUDZUVnp1Zz09IiwibWFjIjoiNTg1MjY4ZmZkN2IwM2JmNGI3MTdjMmY0MGZkMzU1NDA5MjNkNGRkYTgyOWVhMTc4NzVmZjBiM2Y1NTJjOTZlNiIsInRhZyI6IiJ9" class="mx-3 btn btn-sm  align-items-center" data-size="lg"
//                                             data-url=""
//                                             data-ajax-popup="true" data-size="md" data-bs-toggle="tooltip"
//                                             title="" data-title="Show Trainer"
//                                             data-bs-original-title="View">
//                                             <span class="text-white"><i class="ti ti-eye "></i></span>
//                 </a>
//             </div>


//             <div class="action-btn bg-info me-2">
//                 <a href="#" class="mx-3 btn btn-sm  align-items-center" data-size="lg" data-url="https://demo.workdo.io/hrmgo/training/4/edit" data-ajax-popup="true" data-size="md" data-bs-toggle="tooltip" title="" data-title="Edit Training" data-bs-original-title="Edit">
//                                             <span class="text-white"><i class="ti ti-pencil "></i></span>
//                                         </a>
//             </div>

//             <div class="action-btn bg-danger ">
//                 <form method="POST" action="https://demo.workdo.io/hrmgo/training/4" accept-charset="UTF-8" id="delete-form-4"><input name="_method" type="hidden" value="DELETE"/><input name="_token" type="hidden" value="aSjmyah0WndL3NAL3S5wwVS5dA915kAI3FUbJUaF"/>
//                     <a href="#" class="mx-3 btn btn-sm  align-items-center bs-pass-para" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete" aria-label="Delete"><span class="text-white"><i
//                                                 class="ti ti-trash "></i></span></a>
//                 </form>
//             </div>
//             </span>
// </div>
// </td>
// </tr>
// <tr>
//     <td>India</td>
//     <td>Job Training <br/></td>
//     <td>
//         <span class="badge bg-warning p-2 px-3  mt-1 status-badge6">Pending</span>

//     </td>
//     <td>Ida F. Mullen </td>
//     <td>Teresa</td>
//     <td>Dec 25, 2024 to Feb 25, 2025
//     </td>
//     <td>$100.00</td>
//     <td class="Action">
//         <div class="dt-buttons">
//             <span>

//                                                                                     <div class="action-btn bg-warning me-2">
//                                         <a href="https://demo.workdo.io/hrmgo/training/eyJpdiI6IkVUTEJiQndwSlBLZ3hURnRBdS9ITXc9PSIsInZhbHVlIjoiTVAwNUlLb1JGUE9YaDJycnZuSHVHdz09IiwibWFjIjoiMjhjYTI1ZGUwODU0MmJiOWRhZWFlNDI0ZjkxNDMzODUzMmMyNzMzMzI3OGRmMmFhYmZhN2I5ODhlZDY5NDAxMyIsInRhZyI6IiJ9" class="mx-3 btn btn-sm  align-items-center" data-size="lg"
//                                             data-url=""
//                                             data-ajax-popup="true" data-size="md" data-bs-toggle="tooltip"
//                                             title="" data-title="Show Trainer"
//                                             data-bs-original-title="View">
//                                             <span class="text-white"><i class="ti ti-eye "></i></span>
//             </a>
//         </div>


//         <div class="action-btn bg-info me-2">
//             <a href="#" class="mx-3 btn btn-sm  align-items-center" data-size="lg" data-url="https://demo.workdo.io/hrmgo/training/5/edit" data-ajax-popup="true" data-size="md" data-bs-toggle="tooltip" title="" data-title="Edit Training" data-bs-original-title="Edit">
//                                             <span class="text-white"><i class="ti ti-pencil "></i></span>
//                                         </a>
//         </div>

//         <div class="action-btn bg-danger ">
//             <form method="POST" action="https://demo.workdo.io/hrmgo/training/5" accept-charset="UTF-8" id="delete-form-5"><input name="_method" type="hidden" value="DELETE"/><input name="_token" type="hidden" value="aSjmyah0WndL3NAL3S5wwVS5dA915kAI3FUbJUaF"/>
//                 <a href="#" class="mx-3 btn btn-sm  align-items-center bs-pass-para" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete" aria-label="Delete"><span class="text-white"><i
//                                                 class="ti ti-trash "></i></span></a>
//             </form>
//         </div>
//         </span>
// </div>
// </td>
// </tr>


// </tbody>
// </table>
// </div>
// </div>
// </div>
// </div>
// </div>
// </div>
//   )
// }

// export default TrainingListTable


import React from 'react';

const ActionButtons = ({ viewLink, editLink, deleteLink }) => (
  <div className="dt-buttons">
    <div className="action-btn bg-warning me-2">
      <a
        href={viewLink}
        className="mx-3 btn btn-sm align-items-center"
        data-bs-toggle="tooltip"
        title="View"
      >
        <span className="text-white">
          <i className="ti ti-eye"></i>
        </span>
      </a>
    </div>

    <div className="action-btn bg-info me-2">
      <a
        href={editLink}
        className="mx-3 btn btn-sm align-items-center"
        data-bs-toggle="tooltip"
        title="Edit"
      >
        <span className="text-white">
          <i className="ti ti-pencil"></i>
        </span>
      </a>
    </div>

    <div className="action-btn bg-danger">
      <form method="POST" action={deleteLink}>
        <button
          type="submit"
          className="mx-3 btn btn-sm align-items-center bs-pass-para"
          data-bs-toggle="tooltip"
          title="Delete"
        >
          <span className="text-white">
            <i className="ti ti-trash"></i>
          </span>
        </button>
      </form>
    </div>
  </div>
);

const TrainingListTable = () => {
  const trainings = [
    {
      branch: 'China',
      type: 'Job Training',
      status: 'Pending',
      employee: 'Julie Lynn',
      trainer: 'Teresa',
      duration: 'Nov 8, 2024 to Dec 30, 2024',
      cost: '$1,000.00',
      links: {
        view: '#',
        edit: '#',
        delete: '#',
      },
    },
    {
      branch: 'India',
      type: 'Job Training',
      status: 'Started',
      employee: 'Ida F. Mullen',
      trainer: 'Teresa',
      duration: 'Dec 25, 2024 to Feb 25, 2025',
      cost: '$2,000.00',
      links: {
        view: '#',
        edit: '#',
        delete: '#',
      },
    },
    {
        branch: 'Canada',
        type: 'Job Training',
        status: 'Pending',
        employee: 'Julie Lynn',
        trainer: 'Teresa',
        duration: 'Jan 4, 2025 to Mar 1, 2025',
        cost: '$68.00',
        id: 3,
        links: {
            view: '#',
            edit: '#',
            delete: '#',
          },
      },
      {
        branch: 'China',
        type: 'Job Training',
        status: 'Terminated',
        employee: 'Julie Lynn',
        trainer: 'Gabriel',
        duration: 'Nov 4, 2024 to Dec 10, 2024',
        cost: '$2,000.00',
        id: 4,
        links: {
            view: '#',
            edit: '#',
            delete: '#',
          },
      },
    // Add more training data here
  ];

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <table className="table" id="pc-dt-simple">
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Training Type</th>
                    <th>Status</th>
                    <th>Employee</th>
                    <th>Trainer</th>
                    <th>Training Duration</th>
                    <th>Cost</th>
                    <th width="200px">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trainings.map((training, index) => (
                    <tr key={index}>
                      <td>{training.branch}</td>
                      <td>{training.type}</td>
                      <td>
                        <span
                          className={`badge ${
                            training.status === 'Pending'
                              ? 'bg-warning'
                              : training.status === 'Started'
                              ? 'bg-primary'
                              : 'bg-danger'
                          } p-2 px-3 mt-1`}
                        >
                          {training.status}
                        </span>
                      </td>
                      <td>{training.employee}</td>
                      <td>{training.trainer}</td>
                      <td>{training.duration}</td>
                      <td>{training.cost}</td>
                      <td className="Action">
                        <ActionButtons
                          viewLink={training.links.view}
                          editLink={training.links.edit}
                          deleteLink={training.links.delete}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingListTable;
