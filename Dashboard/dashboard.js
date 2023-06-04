// script.js
const transactionForm = document.getElementById('transactionForm');
const transactionList = document.getElementById('transactionList');
const balanceAmount = document.getElementById('balanceAmount');
const goalsList = document.getElementById('goalsList');

let balance = 0;
let transactions = [];
let goals = [];

transactionForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const description = document.getElementById('description').value;
  const amount = Number(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type
  };

  transactions.push(transaction);
  updateTransactionList();
  updateBalance();
  transactionForm.reset();
});

function addGoal() {
    const goalDescription = document.getElementById('goalDescription').value;
    const targetAmount = Number(document.getElementById('goal-input').value);
    const targetDate = document.getElementById('targetDate').value;
  
    const goal = {
      id: Date.now(),
      description: goalDescription,
      targetAmount,
      targetDate,
      progress: 0
    };
  
    goals.push(goal);
    updateGoalsList();
    document.getElementById('goal-form').reset();
  }
  

function updateTransactionList() {
  transactionList.innerHTML = '';

  transactions.forEach(function(transaction) {
    const item = document.createElement('div');
    item.innerHTML = `
        <p>${transaction.description}</p>
        <p>${transaction.type}: $${transaction.amount}</p>
        <button onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;
    transactionList.appendChild(item);
  });
}

function updateGoalsList() {
  goalsList.innerHTML = '';

  goals.forEach(function(goal) {
    const item = document.createElement('div');
    const progressPercent = (goal.progress / goal.targetAmount) * 100;
    item.innerHTML = `
        <p>${goal.description}</p>
        <p>Target: $${goal.targetAmount} by ${goal.targetDate}</p>
        <div class="progress-bar" style="width: ${progressPercent}%"></div>
        <p>Progress: $${goal.progress} / $${goal.targetAmount}</p>
    `;
    goalsList.appendChild(item);
  });
}

function updateBalance() {
  balance = transactions.reduce(function(total, transaction) {
    return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
  }, 0);
  balanceAmount.textContent = balance.toFixed(2);
}

function deleteTransaction(id) {
  transactions = transactions.filter(function(transaction) {
    return transaction.id !== id;
  });
  updateTransactionList();
  updateBalance();
}

// script.js

// ...

function contributeToGoal(id) {
    const amount = Number(prompt('Enter the amount to contribute:'));
    const goal = goals.find(function(goal) {
      return goal.id === id;
    });
  
    if (!isNaN(amount) && amount > 0) {
      goal.progress += amount;
      updateGoalsList();
    } else {
      alert('Invalid contribution amount. Please enter a valid number.');
    }
  }
  
  // ...
  
  function updateGoalsList() {
    goalsList.innerHTML = '';
  
    goals.forEach(function(goal) {
      const item = document.createElement('div');
      const progressPercent = (goal.progress / goal.targetAmount) * 100;
      item.innerHTML = `
        <p class="goal-description">${goal.description}</p>
        <p class="goal-target">Target: $${goal.targetAmount} by ${goal.targetDate}</p>
        <div class="progress-bar" style="--progress-percent: ${progressPercent}%"></div>
        <p class="goal-progress">
          Progress: $${goal.progress} / $${goal.targetAmount}
          <button onclick="contributeToGoal(${goal.id})" class="contribute-button">Contribute</button>
        </p>
      `;
      goalsList.appendChild(item);
    });
  }
  
  // ...
  

  

// Calling the functions to display initial data
updateTransactionList();
updateBalance();
updateGoalsList();
