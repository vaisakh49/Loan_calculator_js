// listen for submit
document.getElementById('loan-form').addEventListener('submit' , function(e){
    
    // Hide results
  document.getElementById('results').style.display = 'none';
  
    // show loading
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);

    e.preventDefault();
})

// calculate results
function calculateResults(){

    // console.log('here iam...');
    // ui vars
    const UIamount = document.getElementById('amount');
    const UIinterset = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const UImonthlyPayment = document.getElementById('monthly-payment');
    const UItotalPayment = document.getElementById('total-payment');
    const UItotalInterest = document.getElementById('total-interest');

    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterset.value) / 100 / 12;
    const calculatedYear = parseFloat(UIyears.value) * 12;

     // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedYear);
  const monthly = (principal*x*calculatedInterest)/(x-1);
  // console.log(x);

  if(isFinite(monthly)) {
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedYear).toFixed(2);
    UItotalInterest.value = ((monthly * calculatedYear)-principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide loading
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your numbers');
  }



    // e.preventDefault();
}

// show error
function showError(error){
// Hide results
document.getElementById('results').style.display = 'none';
  
// Hide loader
document.getElementById('loading').style.display = 'none';

// Create a div
const errorDiv = document.createElement('div');

// Get elements
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');

// Add class
errorDiv.className = 'alert alert-danger';

// Create text node and append to div
errorDiv.appendChild(document.createTextNode(error));

// Insert error above heading
card.insertBefore(errorDiv, heading);
// console.log(errorDiv);

// Clear error after 3 seconds
setTimeout(clearError, 1000);
}

// Clear error
function clearError(){
document.querySelector('.alert').remove();
}