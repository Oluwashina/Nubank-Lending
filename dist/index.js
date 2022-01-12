$(document).ready(function () {


})

// get started submission form
$("form#seeloansBtn").submit(function (event) {
  event.preventDefault();
    $("#loanSubmit").addClass("disabled-btn");
    $("#spinner").removeClass("hidden").addClass("inline-flex");

   toastr.success("Details submitted!");
  
  setTimeout(() => {
      $("#loanSubmit").removeClass("disabled-btn");
    $("#spinner").removeClass("inline-flex").addClass("hidden");
    window.location.replace('plans.html')
  }, 3000)
});

// plans button functionality
$('#planYes').click(function () {
  window.location.replace('loan-received.html')
})

// See application status functionality
$("#seeStatus").click(function () {
  window.location.replace('application-success.html')
})