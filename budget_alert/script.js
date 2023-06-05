
document.getElementById('limit').addEventListener('input', function() {
  var limit = parseInt(this.value);
  var expense = 100; // replace this with the actual expense amount
  var alertContainer = document.getElementById('alertContainer');
  var image = document.querySelector('img[alt="Image"]');
  if (expense < limit) {
    alertContainer.innerHTML = 'Expense exceeded the limit by ' + ( limit-expense) + ' units.';
    alertContainer.classList.add('alert');

    swal({
      title: "Budget Exceeded!",
      text: "Your expense has exceeded the budget limit by " + (limit-expense) + " units.",
      icon: "warning",
      button: "OK"
    }).then(function() {
      image.style.opacity = '0';
    });
  } else {
    alertContainer.innerHTML = '';
    alertContainer.classList.remove('alert');
    image.style.opacity = '1';
  }
});

  