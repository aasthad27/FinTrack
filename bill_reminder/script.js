// Check if bills are stored in localStorage, otherwise initialize an empty array
var bills = JSON.parse(localStorage.getItem('bills')) || [];

// Function to add a new bill to the list and update localStorage
function addBill(name, date, status) {
  var bill = { name: name, date: date, status: status };
  bills.push(bill);
  localStorage.setItem('bills', JSON.stringify(bills));
}

// Function to display the bills stored in localStorage
function displayBills() {
  var billList = document.getElementById('billList');
  billList.innerHTML = '';

  bills.forEach(function(bill, index) {
    var listItem = document.createElement('li');
    listItem.textContent = `Name: ${bill.name}, Date: ${bill.date}, Status: ${bill.status}`;
    billList.appendChild(listItem);
  });

  // Add the clear option if there are bills
  if (bills.length > 0) {
    var clearButton = document.createElement('button');
    clearButton.textContent = 'Clear All';
    clearButton.addEventListener('click', function() {
      clearBills();
    });
    billList.appendChild(clearButton);
  }
}

// Function to clear all bills and update localStorage
function clearBills() {
  bills = [];
  localStorage.removeItem('bills');
  displayBills();
}

// Event listener for form submission
document.getElementById('billForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var billName = document.getElementById('billName').value;
  var billDate = document.getElementById('billDate').value;
  var billStatus = document.getElementById('billStatus').value;

  // Call the addBill function to store the bill details locally
  addBill(billName, billDate, billStatus);

  // Display the updated list of bills
  displayBills();

  swal({
    title: "Bill Added!",
    text: "Bill Name: " + billName + "\nDue Date: " + billDate + "\nStatus: " + billStatus,
    icon: "success",
    button: "OK"
  });
});

// Call the displayBills function to show the stored bills on page load
displayBills();
