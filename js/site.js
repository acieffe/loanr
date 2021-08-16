// validate input
function isValid() {
   let principle = document.getElementById('principle').value;
   let term = document.getElementById('term').value;
   let rate = document.getElementById('rate').value / 1200;

   if (principle === "" || term === "" || rate === "") {
      alert('Please fill in all entries.');
   } else if (principle <= 0) {
      alert('Please enter a loan amount higher than zero (0).');
   } else if (term <= 0) {
      alert('Please enter a term in months higher than zero (0).');
   } else if (term != Math.ceil(term)) {
      alert('Please enter a term in whole numbers')
   } else if (rate < 0) {
      alert('Please enter an iterest rate zero (0) or higher.');
   } else {
      document.getElementById('results').innerHTML = "";
      outputTotals(principle, term, rate);
   }
}

function outputTotals(principle, term, rate) {

   let monthPay = (principle * (rate) / (1 - Math.pow(1 / (1 + rate), term)));
   let totalInt = fillTable(principle, term, rate, monthPay);
   let cost = parseFloat(principle) + parseFloat(totalInt);

   // Print to page the total section data
   document.getElementById('monthPay').innerHTML = `$${parseFloat(monthPay).toFixed(2)}`;
   document.getElementById('totalPrinc').innerHTML = `$${parseFloat(principle).toFixed(2)}`;
   document.getElementById('totalInt').innerHTML = `$${parseFloat(totalInt).toFixed(2)}`;
   document.getElementById('totalCost').innerHTML = `$${parseFloat(cost).toFixed(2)}`;

}

// create object containing each row of the table
function fillTable(principle, term, rate, monthPay) {

	let balance = principle;
   let interest = 0;
   let totalInt = 0;
	let mortTable = [];

	for (let index = 1; index <= term; index++) {
      interest = balance * rate;
      principle = monthPay - interest;
      mortTable[index] = {
         month : index,
         interest : interest,
         principle : principle,
         payment : monthPay,
         totalInt : totalInt += interest,
         balance : balance -= principle
      }
	}
   console.log(mortTable);
   return totalInt;
}

// Function to output array of objects into page table