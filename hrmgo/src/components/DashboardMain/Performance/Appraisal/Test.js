// import React from 'react'

// const Test = () => {
//   return (
//     <div>
//       <div class="modal fade show" id="commonModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style="display: block; padding-left: 0px;">
//         <div class="modal-dialog modal-lg" role="document">
//             <div class="modal-content">
//                 <div class="modal-header">
//                     <h5 class="modal-title" id="exampleModalLabel">Create New Appraisal</h5>
//                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div class="body "><form method="POST" action="https://demo.workdo.io/hrmgo/appraisal" accept-charset="UTF-8" id="ratingForm" class="needs-validation" novalidate=""><input name="_token" type="hidden" value="GBvNGWkGCp8zRBlborkdKlqAui0HjjScE6HMSdiN">
// <div class="modal-body">

//         <div class="card-footer text-end">
//         <a href="#" class="btn btn-sm btn-primary" data-size="medium" data-ajax-popup-over="true" data-url="https://demo.workdo.io/hrmgo/generate/appraisal" data-bs-toggle="tooltip" data-bs-placement="top" title="Generate" data-title="Generate Content With AI">
//             <i class="fas fa-robot"></i> Generate With AI
//         </a>
//     </div>
//         <div class="row">
//         <div class="col-md-12">
//             <div class="form-group">
//                 <label for="branch" class="col-form-label">Select Branch</label><span class="text-danger">*</span>
//                 <select name="brances" id="brances" class="form-control " required="">
//                     <option selected="" disabled="" value="">Select Branch</option>
//                                             <option value="1">China</option>
//                                             <option value="2">India</option>
//                                             <option value="3">Canada</option>
//                                             <option value="4">Greece</option>
//                                             <option value="5">Italy</option>
//                                             <option value="6">Japan</option>
//                                             <option value="7">Malaysia</option>
//                                             <option value="8">France</option>
//                                     </select>
//             </div>
//         </div>
//         <div class="col-md-6 mt-2">
//             <div class="form-group">
//                 <label for="employee" class="form-label">Employee</label><span class="text-danger">*</span>
//                 <div class="employee_div">
//                     <select name="employee" id="employee" class="form-control " required=""><option value="">Select Employee</option><option value="1">Julie Lynn</option><option value="2">Lunea Todd</option><option value="7">Jeremy Holmes</option><option value="8">Anjolie Mayer</option><option value="12">Mona Hendricks</option></select>
//                 </div>
//             </div>
//         </div>
//         <div class="col-md-6">
//             <div class="form-group">
//                 <label for="appraisal_date" class="col-form-label">Select Month</label><span class="text-danger">*</span>
//                 <input class="form-control " autocomplete="off" required="required" id="current_month" name="appraisal_date" type="month" value="">
//             </div>
//         </div>
//         <div class="col-md-12">
//             <div class="form-group">
//                 <label for="remark" class="col-form-label">Remarks</label>
//                 <textarea class="form-control" rows="3" placeholder="Enter remark" name="remark" cols="50" id="remark"></textarea>
//             </div>
//         </div>
//     </div>
//     <div class="row" id="stares"><div class="col-5  text-end" style="margin-left: 51px;">
//     <h5>Indicator</h5>
// </div>
// <div class="col-4  text-end">
//     <h5>Appraisal</h5>
// </div>
//     <div class="col-md-12 mt-3">
//         <h6>Organizational Competencies</h6>
//         <hr class="mt-0">
//     </div>

//             <div class="col-4">
//             Leadership
//         </div>
//         <div class="col-4">

//             <fieldset id="demo" class="rate">
//                 <input class="stars" type="radio" id="technical-5*-3 " name="ratings[3]" value="5" disabled="">
//                 <label class="full" for="technical-5*-3" title="Awesome - 5 stars"></label>
//                 <input class="stars" type="radio" id="technical-4*-3" name="ratings[3]" value="4" disabled="">
//                 <label class="full" for="technical-4*-3" title="Pretty good - 4 stars"></label>
//                 <input class="stars" type="radio" id="technical-3*-3" name="ratings[3]" value="3" disabled="">
//                 <label class="full" for="technical-3*-3" title="Meh - 3 stars"></label>
//                 <input class="stars" type="radio" id="technical-2*-3" name="ratings[3]" value="2" checked="" disabled="">
//                 <label class="full" for="technical-2*-3" title="Kinda bad - 2 stars"></label>
//                 <input class="stars" type="radio" id="technical-1*-3" name="ratings[3]" value="1" disabled="">
//                 <label class="full" for="technical-1*-3" title="Sucks big time - 1 star"></label>
//             </fieldset>
//         </div>
//         <div class="col-4">
//             <fieldset id="demo1" class="rate">
//                 <input class="stars" type="radio" id="technical-5-3" name="rating[3]" value="5">
//                 <label class="full" for="technical-5-3" title="Awesome - 5 stars"></label>
//                 <input class="stars" type="radio" id="technical-4-3" name="rating[3]" value="4">
//                 <label class="full" for="technical-4-3" title="Pretty good - 4 stars"></label>
//                 <input class="stars" type="radio" id="technical-3-3" name="rating[3]" value="3">
//                 <label class="full" for="technical-3-3" title="Meh - 3 stars"></label>
//                 <input class="stars" type="radio" id="technical-2-3" name="rating[3]" value="2">
//                 <label class="full" for="technical-2-3" title="Kinda bad - 2 stars"></label>
//                 <input class="stars" type="radio" id="technical-1-3" name="rating[3]" value="1">
//                 <label class="full" for="technical-1-3" title="Sucks big time - 1 star"></label>
//             </fieldset>

//         </div>
//             <div class="col-4">
//             Project Management
//         </div>
//         <div class="col-4">

//             <fieldset id="demo" class="rate">
//                 <input class="stars" type="radio" id="technical-5*-5 " name="ratings[5]" value="5" disabled="">
//                 <label class="full" for="technical-5*-5" title="Awesome - 5 stars"></label>
//                 <input class="stars" type="radio" id="technical-4*-5" name="ratings[5]" value="4" checked="" disabled="">
//                 <label class="full" for="technical-4*-5" title="Pretty good - 4 stars"></label>
//                 <input class="stars" type="radio" id="technical-3*-5" name="ratings[5]" value="3" disabled="">
//                 <label class="full" for="technical-3*-5" title="Meh - 3 stars"></label>
//                 <input class="stars" type="radio" id="technical-2*-5" name="ratings[5]" value="2" disabled="">
//                 <label class="full" for="technical-2*-5" title="Kinda bad - 2 stars"></label>
//                 <input class="stars" type="radio" id="technical-1*-5" name="ratings[5]" value="1" disabled="">
//                 <label class="full" for="technical-1*-5" title="Sucks big time - 1 star"></label>
//             </fieldset>
//         </div>
//         <div class="col-4">
//             <fieldset id="demo1" class="rate">
//                 <input class="stars" type="radio" id="technical-5-5" name="rating[5]" value="5">
//                 <label class="full" for="technical-5-5" title="Awesome - 5 stars"></label>
//                 <input class="stars" type="radio" id="technical-4-5" name="rating[5]" value="4">
//                 <label class="full" for="technical-4-5" title="Pretty good - 4 stars"></label>
//                 <input class="stars" type="radio" id="technical-3-5" name="rating[5]" value="3">
//                 <label class="full" for="technical-3-5" title="Meh - 3 stars"></label>
//                 <input class="stars" type="radio" id="technical-2-5" name="rating[5]" value="2">
//                 <label class="full" for="technical-2-5" title="Kinda bad - 2 stars"></label>
//                 <input class="stars" type="radio" id="technical-1-5" name="rating[5]" value="1">
//                 <label class="full" for="technical-1-5" title="Sucks big time - 1 star"></label>
//             </fieldset>

//         </div>
//         <div class="col-md-12 mt-3">
//         <h6>Technical Competencies</h6>
//         <hr class="mt-0">
//     </div>

//             <div class="col-4">
//             Allocating Resources
//         </div>
//         <div class="col-4">

//             <fieldset id="demo" class="rate">
//                 <input class="stars" type="radio" id="technical-5*-1 " name="ratings[1]" value="5" disabled="">
//                 <label class="full" for="technical-5*-1" title="Awesome - 5 stars"></label>
//                 <input class="stars" type="radio" id="technical-4*-1" name="ratings[1]" value="4" checked="" disabled="">
//                 <label class="full" for="technical-4*-1" title="Pretty good - 4 stars"></label>
//                 <input class="stars" type="radio" id="technical-3*-1" name="ratings[1]" value="3" disabled="">
//                 <label class="full" for="technical-3*-1" title="Meh - 3 stars"></label>
//                 <input class="stars" type="radio" id="technical-2*-1" name="ratings[1]" value="2" disabled="">
//                 <label class="full" for="technical-2*-1" title="Kinda bad - 2 stars"></label>
//                 <input class="stars" type="radio" id="technical-1*-1" name="ratings[1]" value="1" disabled="">
//                 <label class="full" for="technical-1*-1" title="Sucks big time - 1 star"></label>
//             </fieldset>
//         </div>
//         <div class="col-4">
//             <fieldset id="demo1" class="rate">
//                 <input class="stars" type="radio" id="technical-5-1" name="rating[1]" value="5">
//                 <label class="full" for="technical-5-1" title="Awesome - 5 stars"></label>
//                 <input class="stars" type="radio" id="technical-4-1" name="rating[1]" value="4">
//                 <label class="full" for="technical-4-1" title="Pretty good - 4 stars"></label>
//                 <input class="stars" type="radio" id="technical-3-1" name="rating[1]" value="3">
//                 <label class="full" for="technical-3-1" title="Meh - 3 stars"></label>
//                 <input class="stars" type="radio" id="technical-2-1" name="rating[1]" value="2">
//                 <label class="full" for="technical-2-1" title="Kinda bad - 2 stars"></label>
//                 <input class="stars" type="radio" id="technical-1-1" name="rating[1]" value="1">
//                 <label class="full" for="technical-1-1" title="Sucks big time - 1 star"></label>
//             </fieldset>

//         </div>
//         <div class="col-md-12 mt-3">
//         <h6>Behavioural Competencies</h6>
//         <hr class="mt-0">
//     </div>

//             <div class="col-4">
//             Business Process
//         </div>
//         <div class="col-4">

//             <fieldset id="demo" class="rate">
//                 <input class="stars" type="radio" id="technical-5*-2 " name="ratings[2]" value="5" checked="" disabled="">
//                 <label class="full" for="technical-5*-2" title="Awesome - 5 stars"></label>
//                 <input class="stars" type="radio" id="technical-4*-2" name="ratings[2]" value="4" disabled="">
//                 <label class="full" for="technical-4*-2" title="Pretty good - 4 stars"></label>
//                 <input class="stars" type="radio" id="technical-3*-2" name="ratings[2]" value="3" disabled="">
//                 <label class="full" for="technical-3*-2" title="Meh - 3 stars"></label>
//                 <input class="stars" type="radio" id="technical-2*-2" name="ratings[2]" value="2" disabled="">
//                 <label class="full" for="technical-2*-2" title="Kinda bad - 2 stars"></label>
//                 <input class="stars" type="radio" id="technical-1*-2" name="ratings[2]" value="1" disabled="">
//                 <label class="full" for="technical-1*-2" title="Sucks big time - 1 star"></label>
//             </fieldset>
//         </div>
//         <div class="col-4">
//             <fieldset id="demo1" class="rate">
//                 <input class="stars" type="radio" id="technical-5-2" name="rating[2]" value="5">
//                 <label class="full" for="technical-5-2" title="Awesome - 5 stars"></label>
//                 <input class="stars" type="radio" id="technical-4-2" name="rating[2]" value="4">
//                 <label class="full" for="technical-4-2" title="Pretty good - 4 stars"></label>
//                 <input class="stars" type="radio" id="technical-3-2" name="rating[2]" value="3">
//                 <label class="full" for="technical-3-2" title="Meh - 3 stars"></label>
//                 <input class="stars" type="radio" id="technical-2-2" name="rating[2]" value="2">
//                 <label class="full" for="technical-2-2" title="Kinda bad - 2 stars"></label>
//                 <input class="stars" type="radio" id="technical-1-2" name="rating[2]" value="1">
//                 <label class="full" for="technical-1-2" title="Sucks big time - 1 star"></label>
//             </fieldset>

//         </div>
//             <div class="col-4">
//             Oral Communication
//         </div>
//         <div class="col-4">

//             <fieldset id="demo" class="rate">
//                 <input class="stars" type="radio" id="technical-5*-4 " name="ratings[4]" value="5" disabled="">
//                 <label class="full" for="technical-5*-4" title="Awesome - 5 stars"></label>
//                 <input class="stars" type="radio" id="technical-4*-4" name="ratings[4]" value="4" checked="" disabled="">
//                 <label class="full" for="technical-4*-4" title="Pretty good - 4 stars"></label>
//                 <input class="stars" type="radio" id="technical-3*-4" name="ratings[4]" value="3" disabled="">
//                 <label class="full" for="technical-3*-4" title="Meh - 3 stars"></label>
//                 <input class="stars" type="radio" id="technical-2*-4" name="ratings[4]" value="2" disabled="">
//                 <label class="full" for="technical-2*-4" title="Kinda bad - 2 stars"></label>
//                 <input class="stars" type="radio" id="technical-1*-4" name="ratings[4]" value="1" disabled="">
//                 <label class="full" for="technical-1*-4" title="Sucks big time - 1 star"></label>
//             </fieldset>
//         </div>
//         <div class="col-4">
//             <fieldset id="demo1" class="rate">
//                 <input class="stars" type="radio" id="technical-5-4" name="rating[4]" value="5">
//                 <label class="full" for="technical-5-4" title="Awesome - 5 stars"></label>
//                 <input class="stars" type="radio" id="technical-4-4" name="rating[4]" value="4">
//                 <label class="full" for="technical-4-4" title="Pretty good - 4 stars"></label>
//                 <input class="stars" type="radio" id="technical-3-4" name="rating[4]" value="3">
//                 <label class="full" for="technical-3-4" title="Meh - 3 stars"></label>
//                 <input class="stars" type="radio" id="technical-2-4" name="rating[4]" value="2">
//                 <label class="full" for="technical-2-4" title="Kinda bad - 2 stars"></label>
//                 <input class="stars" type="radio" id="technical-1-4" name="rating[4]" value="1">
//                 <label class="full" for="technical-1-4" title="Sucks big time - 1 star"></label>
//             </fieldset>

//         </div>
//     <script>
//     document.getElementById('ratingForm').addEventListener('submit', function(event) {
//         let isValid = true;

//                                     if (!document.querySelector('input[name="rating[3]"]:checked')) {
//                     isValid = false;
//                     alert('Please select a rating for "Leadership"');
//                     event.preventDefault();
//                     return false;
//                 }
//                             if (!document.querySelector('input[name="rating[5]"]:checked')) {
//                     isValid = false;
//                     alert('Please select a rating for "Project Management"');
//                     event.preventDefault();
//                     return false;
//                 }
//                                                 if (!document.querySelector('input[name="rating[1]"]:checked')) {
//                     isValid = false;
//                     alert('Please select a rating for "Allocating Resources"');
//                     event.preventDefault();
//                     return false;
//                 }
//                                                 if (!document.querySelector('input[name="rating[2]"]:checked')) {
//                     isValid = false;
//                     alert('Please select a rating for "Business Process"');
//                     event.preventDefault();
//                     return false;
//                 }
//                             if (!document.querySelector('input[name="rating[4]"]:checked')) {
//                     isValid = false;
//                     alert('Please select a rating for "Oral Communication"');
//                     event.preventDefault();
//                     return false;
//                 }
//                         });
// </script></div>
// </div>

// <div class="modal-footer">
//     <input type="button" value="Cancel" class="btn btn-secondary" data-bs-dismiss="modal">
//     <input type="submit" value="Create" class="btn btn-primary">
// </div>
// </form>

//     <script>

//         $('#employee').change(function(){

//             var emp_id = $('#employee').val();
//             $.ajax({
//                 url: "https://demo.workdo.io/hrmgo/appraisals",
//                 type: "post",
//                 data:{
//                     "employee": emp_id,
//                     "_token": "GBvNGWkGCp8zRBlborkdKlqAui0HjjScE6HMSdiN",
//                 },

//                 cache: false,
//                 success: function(data) {
//                     $('#stares').html(data.html);
//                 }
//             })
//         });
//     </script>

//     <script>
//         $('#brances').on('change', function() {
//             var branch_id = this.value;

//             $.ajax({
//                 url: "https://demo.workdo.io/hrmgo/check-branch-indicator",
//                 type: "post",
//                 data: {
//                     "branch_id": branch_id,
//                     "_token": "GBvNGWkGCp8zRBlborkdKlqAui0HjjScE6HMSdiN",
//                 },
//                 cache: false,
//                 success: function(response) {
//                     if (response.exists) {
//                         $.ajax({
//                             url: "https://demo.workdo.io/hrmgo/getemployee",
//                             type: "post",
//                             data: {
//                                 "branch_id": branch_id,
//                                 "_token": "GBvNGWkGCp8zRBlborkdKlqAui0HjjScE6HMSdiN",
//                             },
//                             cache: false,
//                             success: function(data) {
//                                 $('#employee').html(
//                                     '<option value="">Select Employee</option>');
//                                 $.each(data.employee, function(key, value) {
//                                     $("#employee").append('<option value="' + value
//                                         .id + '">' + value.name + '</option>');
//                                 });
//                             }
//                         });
//                         $('#submit').prop('disabled', false);
//                     } else {
//                         alert("Please create this branch's indicator first.");
//                         $.ajax({
//                             url: "https://demo.workdo.io/hrmgo/getemployee",
//                             type: "post",
//                             data: {
//                                 "branch_id": branch_id,
//                                 "_token": "GBvNGWkGCp8zRBlborkdKlqAui0HjjScE6HMSdiN",
//                             },
//                             cache: false,
//                             success: function(data) {
//                                 $('#employee').html(
//                                     '<option value="">Select Employee</option>');
//                                 $.each(data.employee, function(key, value) {
//                                     $("#employee").append('<option value="' + value
//                                         .id + '">' + value.name + '</option>');
//                                 });
//                             }
//                         });
//                         $('#submit').prop('disabled', true);
//                     }
//                 }
//             });
//         });
//     </script>

// <script>
//     document.getElementById('current_month').valueAsDate = new Date();
// </script>

// </div>
//             </div>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default Test

import React, { useState, useEffect } from "react";
import $ from "jquery";

const Test = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    // Initialize the current month input
    document.getElementById("current_month").valueAsDate = new Date();
  }, []);

  const handleEmployeeChange = (e) => {
    const emp_id = e.target.value;
    setSelectedEmployee(emp_id);

    $.ajax({
      url: "https://demo.workdo.io/hrmgo/appraisals",
      type: "post",
      data: {
        employee: emp_id,
        _token: "GBvNGWkGCp8zRBlborkdKlqAui0HjjScE6HMSdiN",
      },
      cache: false,
      success: function (data) {
        $("#stares").html(data.html);
      },
    });
  };

  const handleBranchChange = (e) => {
    const branch_id = e.target.value;
    setSelectedBranch(branch_id);

    $.ajax({
      url: "https://demo.workdo.io/hrmgo/check-branch-indicator",
      type: "post",
      data: {
        branch_id: branch_id,
        _token: "GBvNGWkGCp8zRBlborkdKlqAui0HjjScE6HMSdiN",
      },
      cache: false,
      success: function (response) {
        if (response.exists) {
          $.ajax({
            url: "https://demo.workdo.io/hrmgo/getemployee",
            type: "post",
            data: {
              branch_id: branch_id,
              _token: "GBvNGWkGCp8zRBlborkdKlqAui0HjjScE6HMSdiN",
            },
            cache: false,
            success: function (data) {
              $("#employee").html('<option value="">Select Employee</option>');
              $.each(data.employee, function (key, value) {
                $("#employee").append(
                  '<option value="' + value.id + '">' + value.name + "</option>"
                );
              });
            },
          });
          $("#submit").prop("disabled", false);
        } else {
          alert("Please create this branch's indicator first.");
          $.ajax({
            url: "https://demo.workdo.io/hrmgo/getemployee",
            type: "post",
            data: {
              branch_id: branch_id,
              _token: "GBvNGWkGCp8zRBlborkdKlqAui0HjjScE6HMSdiN",
            },
            cache: false,
            success: function (data) {
              $("#employee").html('<option value="">Select Employee</option>');
              $.each(data.employee, function (key, value) {
                $("#employee").append(
                  '<option value="' + value.id + '">' + value.name + "</option>"
                );
              });
            },
          });
          $("#submit").prop("disabled", true);
        }
      },
    });
  };

  const handleRatingChange = (e, name) => {
    setRatings({
      ...ratings,
      [name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!ratings["rating[3]"]) {
      isValid = false;
      alert('Please select a rating for "Leadership"');
    }
    if (!ratings["rating[5]"]) {
      isValid = false;
      alert('Please select a rating for "Project Management"');
    }
    if (!ratings["rating[1]"]) {
      isValid = false;
      alert('Please select a rating for "Allocating Resources"');
    }
    if (!ratings["rating[2]"]) {
      isValid = false;
      alert('Please select a rating for "Business Process"');
    }
    if (!ratings["rating[4]"]) {
      isValid = false;
      alert('Please select a rating for "Oral Communication"');
    }

    if (isValid) {
      // Submit the form
      e.target.submit();
    }
  };

  return (
    <div>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        style={{ display: "block", paddingLeft: "0px" }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Appraisal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="body">
              <form
                method="POST"
                action="https://demo.workdo.io/hrmgo/appraisal"
                acceptCharset="UTF-8"
                id="ratingForm"
                className="needs-validation"
                noValidate
                onSubmit={handleSubmit}
              >
                <input
                  name="_token"
                  type="hidden"
                  value="GBvNGWkGCp8zRBlborkdKlqAui0HjjScE6HMSdiN"
                />
                <div className="modal-body">
                  <div className="card-footer text-end">
                    <a
                      href="#"
                      className="btn btn-sm btn-primary"
                      data-size="medium"
                      data-ajax-popup-over="true"
                      data-url="https://demo.workdo.io/hrmgo/generate/appraisal"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Generate"
                      data-title="Generate Content With AI"
                    >
                      <i className="fas fa-robot"></i> Generate With AI
                    </a>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="branch" className="col-form-label">
                          Select Branch
                        </label>
                        <span className="text-danger">*</span>
                        <select
                          name="brances"
                          id="brances"
                          className="form-control"
                          required
                          onChange={handleBranchChange}
                        >
                          <option selected disabled value="">
                            Select Branch
                          </option>
                          <option value="1">China</option>
                          <option value="2">India</option>
                          <option value="3">Canada</option>
                          <option value="4">Greece</option>
                          <option value="5">Italy</option>
                          <option value="6">Japan</option>
                          <option value="7">Malaysia</option>
                          <option value="8">France</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 mt-2">
                      <div className="form-group">
                        <label htmlFor="employee" className="form-label">
                          Employee
                        </label>
                        <span className="text-danger">*</span>
                        <div className="employee_div">
                          <select
                            name="employee"
                            id="employee"
                            className="form-control"
                            required
                            onChange={handleEmployeeChange}
                          >
                            <option value="">Select Employee</option>
                            <option value="1">Julie Lynn</option>
                            <option value="2">Lunea Todd</option>
                            <option value="7">Jeremy Holmes</option>
                            <option value="8">Anjolie Mayer</option>
                            <option value="12">Mona Hendricks</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="appraisal_date"
                          className="col-form-label"
                        >
                          Select Month
                        </label>
                        <span className="text-danger">*</span>
                        <input
                          className="form-control"
                          autoComplete="off"
                          required
                          id="current_month"
                          name="appraisal_date"
                          type="month"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="remark" className="col-form-label">
                          Remarks
                        </label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Enter remark"
                          name="remark"
                          cols="50"
                          id="remark"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row" id="stares">
                    <div
                      className="col-5 text-end"
                      style={{ marginLeft: "51px" }}
                    >
                      <h5>Indicator</h5>
                    </div>
                    <div className="col-4 text-end">
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
                          value="5"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-5*-3"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4*-3"
                          name="ratings[3]"
                          value="4"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-4*-3"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3*-3"
                          name="ratings[3]"
                          value="3"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-3*-3"
                          title="Meh - 3 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2*-3"
                          name="ratings[3]"
                          value="2"
                          checked
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-2*-3"
                          title="Kinda bad - 2 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1*-3"
                          name="ratings[3]"
                          value="1"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-1*-3"
                          title="Sucks big time - 1 star"
                        ></label>
                      </fieldset>
                    </div>
                    <div className="col-4">
                      <fieldset id="demo1" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5-3"
                          name="rating[3]"
                          value="5"
                          onChange={(e) => handleRatingChange(e, "rating[3]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-5-3"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4-3"
                          name="rating[3]"
                          value="4"
                          onChange={(e) => handleRatingChange(e, "rating[3]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-4-3"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3-3"
                          name="rating[3]"
                          value="3"
                          onChange={(e) => handleRatingChange(e, "rating[3]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-3-3"
                          title="Meh - 3 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2-3"
                          name="rating[3]"
                          value="2"
                          onChange={(e) => handleRatingChange(e, "rating[3]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-2-3"
                          title="Kinda bad - 2 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1-3"
                          name="rating[3]"
                          value="1"
                          onChange={(e) => handleRatingChange(e, "rating[3]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-1-3"
                          title="Sucks big time - 1 star"
                        ></label>
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
                          value="5"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-5*-5"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4*-5"
                          name="ratings[5]"
                          value="4"
                          checked
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-4*-5"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3*-5"
                          name="ratings[5]"
                          value="3"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-3*-5"
                          title="Meh - 3 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2*-5"
                          name="ratings[5]"
                          value="2"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-2*-5"
                          title="Kinda bad - 2 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1*-5"
                          name="ratings[5]"
                          value="1"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-1*-5"
                          title="Sucks big time - 1 star"
                        ></label>
                      </fieldset>
                    </div>
                    <div className="col-4">
                      <fieldset id="demo1" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5-5"
                          name="rating[5]"
                          value="5"
                          onChange={(e) => handleRatingChange(e, "rating[5]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-5-5"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4-5"
                          name="rating[5]"
                          value="4"
                          onChange={(e) => handleRatingChange(e, "rating[5]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-4-5"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3-5"
                          name="rating[5]"
                          value="3"
                          onChange={(e) => handleRatingChange(e, "rating[5]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-3-5"
                          title="Meh - 3 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2-5"
                          name="rating[5]"
                          value="2"
                          onChange={(e) => handleRatingChange(e, "rating[5]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-2-5"
                          title="Kinda bad - 2 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1-5"
                          name="rating[5]"
                          value="1"
                          onChange={(e) => handleRatingChange(e, "rating[5]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-1-5"
                          title="Sucks big time - 1 star"
                        ></label>
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
                          value="5"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-5*-1"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4*-1"
                          name="ratings[1]"
                          value="4"
                          checked
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-4*-1"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3*-1"
                          name="ratings[1]"
                          value="3"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-3*-1"
                          title="Meh - 3 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2*-1"
                          name="ratings[1]"
                          value="2"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-2*-1"
                          title="Kinda bad - 2 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1*-1"
                          name="ratings[1]"
                          value="1"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-1*-1"
                          title="Sucks big time - 1 star"
                        ></label>
                      </fieldset>
                    </div>
                    <div className="col-4">
                      <fieldset id="demo1" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5-1"
                          name="rating[1]"
                          value="5"
                          onChange={(e) => handleRatingChange(e, "rating[1]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-5-1"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4-1"
                          name="rating[1]"
                          value="4"
                          onChange={(e) => handleRatingChange(e, "rating[1]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-4-1"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3-1"
                          name="rating[1]"
                          value="3"
                          onChange={(e) => handleRatingChange(e, "rating[1]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-3-1"
                          title="Meh - 3 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2-1"
                          name="rating[1]"
                          value="2"
                          onChange={(e) => handleRatingChange(e, "rating[1]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-2-1"
                          title="Kinda bad - 2 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1-1"
                          name="rating[1]"
                          value="1"
                          onChange={(e) => handleRatingChange(e, "rating[1]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-1-1"
                          title="Sucks big time - 1 star"
                        ></label>
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
                          value="5"
                          checked
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-5*-2"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4*-2"
                          name="ratings[2]"
                          value="4"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-4*-2"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3*-2"
                          name="ratings[2]"
                          value="3"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-3*-2"
                          title="Meh - 3 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2*-2"
                          name="ratings[2]"
                          value="2"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-2*-2"
                          title="Kinda bad - 2 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1*-2"
                          name="ratings[2]"
                          value="1"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-1*-2"
                          title="Sucks big time - 1 star"
                        ></label>
                      </fieldset>
                    </div>
                    <div className="col-4">
                      <fieldset id="demo1" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5-2"
                          name="rating[2]"
                          value="5"
                          onChange={(e) => handleRatingChange(e, "rating[2]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-5-2"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4-2"
                          name="rating[2]"
                          value="4"
                          onChange={(e) => handleRatingChange(e, "rating[2]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-4-2"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3-2"
                          name="rating[2]"
                          value="3"
                          onChange={(e) => handleRatingChange(e, "rating[2]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-3-2"
                          title="Meh - 3 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2-2"
                          name="rating[2]"
                          value="2"
                          onChange={(e) => handleRatingChange(e, "rating[2]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-2-2"
                          title="Kinda bad - 2 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1-2"
                          name="rating[2]"
                          value="1"
                          onChange={(e) => handleRatingChange(e, "rating[2]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-1-2"
                          title="Sucks big time - 1 star"
                        ></label>
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
                          value="5"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-5*-4"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4*-4"
                          name="ratings[4]"
                          value="4"
                          checked
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-4*-4"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3*-4"
                          name="ratings[4]"
                          value="3"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-3*-4"
                          title="Meh - 3 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2*-4"
                          name="ratings[4]"
                          value="2"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-2*-4"
                          title="Kinda bad - 2 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1*-4"
                          name="ratings[4]"
                          value="1"
                          disabled
                        />
                        <label
                          className="full"
                          htmlFor="technical-1*-4"
                          title="Sucks big time - 1 star"
                        ></label>
                      </fieldset>
                    </div>
                    <div className="col-4">
                      <fieldset id="demo1" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5-4"
                          name="rating[4]"
                          value="5"
                          onChange={(e) => handleRatingChange(e, "rating[4]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-5-4"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4-4"
                          name="rating[4]"
                          value="4"
                          onChange={(e) => handleRatingChange(e, "rating[4]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-4-4"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3-4"
                          name="rating[4]"
                          value="3"
                          onChange={(e) => handleRatingChange(e, "rating[4]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-3-4"
                          title="Meh - 3 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2-4"
                          name="rating[4]"
                          value="2"
                          onChange={(e) => handleRatingChange(e, "rating[4]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-2-4"
                          title="Kinda bad - 2 stars"
                        ></label>
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1-4"
                          name="rating[4]"
                          value="1"
                          onChange={(e) => handleRatingChange(e, "rating[4]")}
                        />
                        <label
                          className="full"
                          htmlFor="technical-1-4"
                          title="Sucks big time - 1 star"
                        ></label>
                      </fieldset>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    value="Cancel"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  />
                  <input
                    type="submit"
                    value="Create"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
