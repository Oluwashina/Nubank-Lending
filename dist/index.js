$(document).ready(function () {
  // get all states api
  var statesUrl = "https://locationsng-api.herokuapp.com/api/v1/states";
  $.ajax({
    url: statesUrl,
    type: "GET",
    dataType: "json",
    data: false,
    contentType: false,
    cache: false,
    processData: false,
    beforeSend: function (jqXHR, settings) {},
    success: function (data) {
      for (i = 0; i < data.length; i++) {
        var name = data[i]["name"];
        $("select#state").append(
          "<option value='" + name + "'>" + name + "</option>"
        );
      }
    },
    complete: function (jqXHR) {},
  });

  // get all cities in a state
  $("select#state").change(function () {
    var state = $("select#state option:selected").val();
    var cityUrl = `http://locationsng-api.herokuapp.com/api/v1/states/${state}/cities`;
    $.ajax({
      url: cityUrl,
      type: "GET",
      dataType: "json",
      data: false,
      contentType: false,
      cache: false,
      processData: false,
      beforeSend: function (jqXHR, settings) {},
      success: function (data) {
        $('select#city').empty()
        for (i = 0; i < data.length; i++) {
          $("select#city").append(
            "<option value='" + data[i] + "'>" + data[i] + "</option>"
          );
        }
      },
      complete: function (jqXHR) {},
    });
  });

});

// get started submission form
$("form#seeloansBtn").submit(function (event) {
  event.preventDefault();
  $("#loanSubmit").addClass("disabled-btn");
  $("#spinner").removeClass("hidden").addClass("inline-flex");

  let accountnumber = $('#accountnumber').val();
  let firstname = $('#firstname').val();
  let lastname = $('#lastname').val();
  let occupation = $("select#occupation option:selected").val();
  let income = $("select#income option:selected").val();
  let state = $("select#state option:selected").val();
  let city = $("select#city option:selected").val();
  let purpose = $("#purpose").val();
  let refName = $("#refname").val();
  let phonenumber = $("#phonenumber").val();
  let email = $("#email").val();

  var data = {
    accountnumber,
    firstname,
    lastname,
    occupation,
    income,
    state,
    city,
    purpose,
    refName,
    phonenumber,
    email
  }

  localStorage.setItem('UserLoanRequest', JSON.stringify(data))

  toastr.success("Details submitted!");

  setTimeout(() => {
    $("#loanSubmit").removeClass("disabled-btn");
    $("#spinner").removeClass("inline-flex").addClass("hidden");
    window.location.replace("plans.html");
  }, 3000);
});

// See application status functionality
$("#seeStatus").click(function () {
  var check = localStorage.getItem('loan_applications')
  if (check) {
   window.location.replace("application-success.html");
  }
  else {
    toastr.info("You don't seem to have applied for any loan yet!");
  }
 
});
