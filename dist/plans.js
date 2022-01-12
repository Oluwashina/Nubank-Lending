$(document).ready(function () {

  // get the occupation and income that user submitted
  var occupationCheck = localStorage.getItem("UserLoanRequest");
  let occupationSubmitted = JSON.parse(occupationCheck).occupation;

  // check storage to see if occupation exist and the income selected from past users

  // filter occupation selected and Load data from occupation from json
  $.getJSON("occupation.json", function (success) {
    console.log(success);
    //  find by occupation
    let plans = success.find((val) => val.occupation === occupationSubmitted);
    console.log(plans);
    let plan = plans.plans;
    let occupation = plan.occupation
    for (i = 0; i < plan.length; i++) {
      var amount = plan[i]["amount"];
      var interest = plan[i]["interest"];
      var view_button = `planSelect(${amount},${interest},${occupation})`;
      var planData;

      if (i == 0) {
         planData = `
            <div onClick=${view_button} class="selected w-52 h-40 item md:w-56 md:h-44 flex items-center justify-center relative rounded-md opacity-60 mx-auto md:mx-0 plan pointer-events-none">
                <p class="text-8 text-center text-3xl price">${amount}k</p>

                <div class="absolute right-0 top-0 bg-10 w-16 h-12 md:w-16 md:h-12 rounded-nubrad flex justify-center items-center">
                    <p class="text-xs text-black text-center font-medium leading-tight interest">${interest}% Interest</p>
                </div>
          </div>`;
      } else {
         planData = `
            <div onClick=${view_button} class="bg-6 w-52 h-40 item md:w-56 md:h-44 flex items-center justify-center relative rounded-md border-7 border opacity-60 mx-auto md:mx-0 plan pointer-events-none">
                <p class="text-8 text-center text-3xl price">${amount}k</p>

                <div class="absolute right-0 top-0 bg-10 w-16 h-12 md:w-16 md:h-12 rounded-nubrad flex justify-center items-center">
                    <p class="text-xs text-black text-center font-medium leading-tight interest">${interest}% Interest</p>
                </div>
          </div>`;
      }
     

      $(".plan-section").append(planData);
    }

    var owl = $(".owl-carousel").owlCarousel({
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
    owl.init();
  });
})


// occupation and income json


// plans button functionality
$('#planYes').click(function () {
  $(".plans-recommend").addClass('hidden');
  $('.plan').addClass('cursor-pointer').removeClass('pointer-events-none')
  $('.plan').removeClass('opacity-60')
  $('.plan .price').removeClass('text-8').addClass('text-black')
})

// plans no button functionality
$('#planNo').click(function () {
   toastr.info("Kindly scroll to find a suitable plan that meets you!");
})

function planSelect(amt, interest) { 
  toastr.success("Thank you for applying!");
  var occupationRequest = localStorage.getItem("UserLoanRequest");
  let occupation = JSON.parse(occupationRequest).occupation;
  var view_data = new ViewData();
  view_data.storeUserDetails("plan_amount", amt);
  view_data.storeUserDetails("interest_value", interest);

  setTimeout(() => {
    window.location.replace("loan-received.html");
    
    // save details to storage
    var val = []
    var data = {
      occupation,
      amount: amt,
      interest
    }
    // check if occupation exist,
    var res = localStorage.getItem('loan_applications')
    if (res) {
      const found = JSON.parse(res).some((el) => el.occupation === occupation);
       val.push(data);
       localStorage.setItem("loan_applications", JSON.stringify(val)); 
    }
    else {
      val.push(data);
      localStorage.setItem("loan_applications", JSON.stringify(val));      
    }
  }, 2000)

}
