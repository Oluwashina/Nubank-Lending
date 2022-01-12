$(document).ready(function () {

  // owl carousel init
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    items: 3,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  });

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

