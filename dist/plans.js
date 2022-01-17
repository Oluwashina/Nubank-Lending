$(document).ready(function () {

  // get the occupation and income that user submitted
  var occupationCheck = localStorage.getItem("UserLoanRequest");
  let occupationSubmitted = JSON.parse(occupationCheck).occupation;

  // check storage to see if occupation exist and the income selected from past users
  let loan_app = JSON.parse(localStorage.getItem("loan_applications"));
  if (loan_app && loan_app.length > 0) {
     let loan_app_check = loan_app.some(
       (el) => el.occupation === occupationSubmitted
     );
     console.log(loan_app_check);
     // if loan app exist, check from the loan application submitted and use the plans array and make the submitted one active
     if (loan_app_check) {
       let p = loan_app.find((val) => val.occupation === occupationSubmitted);
       let p_amount = p.amount;
       let p_interest = p.interest;
       let p_plan = p.plans;
       var newplan = {
         id: p.id,
         occupation: p.occupation,
         plans: p.plans
       }
       localStorage.setItem("plans", JSON.stringify(newplan));
       // filter plans thru the selected amount
       let filteredPlan = p_plan.filter(
         (e) => e.amount !== p_amount.toString()
       );

       let firstplanData = `
            <div onClick=${view_button} class="selected w-52 h-40 item md:w-56 md:h-44 flex items-center justify-center relative rounded-md opacity-60 mx-auto md:mx-0 plan pointer-events-none">
                <p class="text-8 text-center text-3xl price">${p_amount}k</p>

                <div class="absolute right-0 top-0 bg-10 w-16 h-12 md:w-16 md:h-12 rounded-nubrad flex justify-center items-center">
                    <p class="text-xs text-black text-center font-medium leading-tight interest">${p_interest}% Interest</p>
                </div>
          </div>`;
       $(".plan-section").append(firstplanData);

       for (i = 0; i < filteredPlan.length; i++) {
         var amount = filteredPlan[i]["amount"];
         var interest = filteredPlan[i]["interest"];
         var view_button = `planSelect(${amount},${interest})`;
         var myplanData;

         myplanData = `
            <div onClick=${view_button} class="bg-6 w-52 h-40 item md:w-56 md:h-44 flex items-center justify-center relative rounded-md border-7 border opacity-60 mx-auto md:mx-0 plan pointer-events-none">
                <p class="text-8 text-center text-3xl price">${amount}k</p>

                <div class="absolute right-0 top-0 bg-10 w-16 h-12 md:w-16 md:h-12 rounded-nubrad flex justify-center items-center">
                    <p class="text-xs text-black text-center font-medium leading-tight interest">${interest}% Interest</p>
                </div>
          </div>`;
         $(".plan-section").append(myplanData);
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
    }
     else {
       // filter occupation selected and Load data from occupation from json
       $.getJSON("occupation.json", function (success) {
         //  find by occupation
         let plans = success.find(
           (val) => val.occupation === occupationSubmitted
         );
         console.log(plans);
         let plan = plans.plans;
         localStorage.setItem("plans", JSON.stringify(plans));

         for (i = 0; i < plan.length; i++) {
           var amount = plan[i]["amount"];
           var interest = plan[i]["interest"];
           var view_button = `planSelect(${amount},${interest})`;
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
     }
  }
  else {
    // filter occupation selected and Load data from occupation from json
    $.getJSON("occupation.json", function (success) {
      //  find by occupation
      let plans = success.find((val) => val.occupation === occupationSubmitted);
      console.log(plans);
      let plan = plans.plans;
      localStorage.setItem("plans", JSON.stringify(plans))

      for (i = 0; i < plan.length; i++) {
        var amount = plan[i]["amount"];
        var interest = plan[i]["interest"];
        var view_button = `planSelect(${amount},${interest})`;
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
  }



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

function SaveDataToLocalStorage(data) {

  let res = JSON.parse(localStorage.getItem("loan_applications"));
  var a;
  // Parse the serialized data back into an aray of objects
  a =  res || [];

  // check if a partictular field is present and update
  if (a && a.length > 0) {
     const found = a.some((el) => el.occupation === data.occupation);
     console.log(found);
     if (found) {
       const updatedItems = a.map((el) =>
         el.occupation === data.occupation ? data : el
       );
       localStorage.setItem("loan_applications", JSON.stringify(updatedItems));
    }
     else {
       // Push the new data (whether it be an object or anything else) onto the array
       a.push(data);
       // Re-serialize the array back into a string and store it in localStorage
       localStorage.setItem("loan_applications", JSON.stringify(a));
     }
  }
  else {
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem("loan_applications", JSON.stringify(a));
  }

}

function planSelect(amt, interest) { 
  toastr.success("Thank you for applying!");
  var occupationRequest = localStorage.getItem("UserLoanRequest");
  let occupation = JSON.parse(occupationRequest).occupation;
  var view_data = new ViewData();
  view_data.storeUserDetails("plan_amount", amt);
  view_data.storeUserDetails("interest_value", interest);

  setTimeout(() => {
    window.location.replace("loan-received.html");
    
    // get plans data from storage
    let plan = JSON.parse(localStorage.getItem("plans"));
    // save details to storage
    var data = {
      ...plan,
      occupation,
      amount: amt,
      interest
    }
    SaveDataToLocalStorage(data)

  }, 2000)

}
