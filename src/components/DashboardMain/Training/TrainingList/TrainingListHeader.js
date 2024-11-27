import React from 'react'

const TrainingListHeader = () => {
  return (
    <div>
      <div class="page-header">
                <div class="page-block">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <div class="page-header-title">
                                <h4 class="m-b-10">
                                    Manage Training
                                </h4>
                            </div>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="https://demo.workdo.io/hrmgo/dashboard">Home</a></li>
                                <li class="breadcrumb-item">Training List</li>
                            </ul>
                        </div>
                        <div class="col">
                            <div class="float-end ">

                                <a href="https://demo.workdo.io/hrmgo/export/training" class="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-original-title="Export">
        <i class="ti ti-file-export"></i>
    </a>



                                <a href="#" data-url="https://demo.workdo.io/hrmgo/training/create" data-ajax-popup="true" data-size="lg" data-title="Create New Training" data-bs-toggle="tooltip" title="" class="btn btn-sm btn-primary" data-bs-original-title="Create">
            <i class="ti ti-plus"></i>
        </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default TrainingListHeader
