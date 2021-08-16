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
      outputTotals(principle, term, rate);
   }
}

// This function calculates totals and injects them into the page
function outputTotals(principle, term, rate) {

   let monthPay = (principle * (rate) / (1 - Math.pow(1 / (1 + rate), term)));
   // calls fill table to calculate the toal interest paid
   let totalInt = fillTable(principle, term, rate, monthPay);
   let cost = parseFloat(principle) + parseFloat(totalInt);

   // Print to page the total section data
   document.getElementById('monthPay').innerHTML = `$${parseFloat(monthPay).toFixed(2)}`;
   document.getElementById('totalPrinc').innerHTML = `$${parseFloat(principle).toFixed(2)}`;
   document.getElementById('totalInt').innerHTML = `$${parseFloat(totalInt).toFixed(2)}`;
   document.getElementById('totalCost').innerHTML = `$${parseFloat(cost).toFixed(2)}`;
}

// This function calculates the desired table columns of data and places it in an array of objects
function fillTable(principle, term, rate, monthPay) {

	let balance = principle;
   let interest = 0;
   let totalInt = 0;
	let mortTable = []; // array to hold objects

	for (let index = 0; index < term; index++) {
		interest = balance * rate;

		if (balance < monthPay) {
			monthPay = balance + interest;
		}

		principle = monthPay - interest;

		// create object containing each row of the table
		mortTable[index] = {
			month: index + 1,
			payment: monthPay,
			principle: principle,
			interest: interest,
			totalInt: (totalInt += interest),
			balance: (balance -= principle),
		};
	}

   // Send mortTable array to be displayed on page
   displayTable(mortTable);
   
   // Returns the total interest to outputTotals function
   return totalInt;
}

// Function to output array of objects into page table
function displayTable(mortTable) {
   // get table from page
   let tableBody = document.getElementById('results');

   // get template row
   let rowTemp = document.getElementById('loanTemplate');

   // clear table
   tableBody.innerHTML = "";

   for (let index = 0; index < mortTable.length; index ++) {

      let tableRow = document.importNode(rowTemp.content, true);

      let rowCols = tableRow.querySelectorAll('td');

      rowCols[0].textContent = mortTable[index].month;
      rowCols[1].textContent = `$${parseFloat(mortTable[index].payment).toFixed(2)}`;
      rowCols[2].textContent = `$${parseFloat(mortTable[index].principle).toFixed(2)}`;
      rowCols[3].textContent = `$${parseFloat(mortTable[index].interest).toFixed(2)}`;
      rowCols[4].textContent = `$${parseFloat(mortTable[index].totalInt).toFixed(2)}`;
      rowCols[5].textContent = `$${parseFloat(mortTable[index].balance).toFixed(2)}`;

      tableBody.appendChild(tableRow);
   }
}