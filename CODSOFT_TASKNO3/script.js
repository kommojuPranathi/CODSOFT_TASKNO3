// ===============================
// Expense Tracker - Part 1
// ===============================

// DOM Elements
const expenseForm = document.getElementById("expenseForm");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const category = document.getElementById("category");
const date = document.getElementById("date");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const transactionList = document.getElementById("transactionList");

// Load transactions from Local Storage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Used while editing
let editIndex = -1;

// -------------------------------
// Save Data
// -------------------------------
function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// -------------------------------
// Display Transactions
// -------------------------------
function displayTransactions(list = transactions) {

    transactionList.innerHTML = "";

    if (list.length === 0) {
        transactionList.innerHTML = `
        <tr>
            <td colspan="6">No Transactions Found</td>
        </tr>`;
        updateSummary();
        return;
    }

    list.forEach((item, index) => {

        transactionList.innerHTML += `
        <tr>

            <td>${item.title}</td>

            <td>${item.type}</td>

            <td>${item.category}</td>

            <td>₹${Number(item.amount).toFixed(2)}</td>

            <td>${item.date}</td>

            <td>

                <button class="edit-btn"
                    onclick="editTransaction(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteTransaction(${index})">
                    Delete
                </button>

            </td>

        </tr>`;
    });

    updateSummary();
}

// -------------------------------
// Update Summary Cards
// -------------------------------
function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(item => {

        if (item.type === "Income") {
            totalIncome += Number(item.amount);
        } else {
            totalExpense += Number(item.amount);
        }

    });

    income.textContent = "₹" + totalIncome.toFixed(2);
    expense.textContent = "₹" + totalExpense.toFixed(2);
    balance.textContent = "₹" + (totalIncome - totalExpense).toFixed(2);
}

// -------------------------------
// Add Transaction
// -------------------------------
expenseForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const transaction = {

        title: title.value.trim(),
        amount: amount.value,
        type: type.value,
        category: category.value,
        date: date.value

    };

    if (
        transaction.title === "" ||
        transaction.amount === "" ||
        transaction.type === "" ||
        transaction.category === "" ||
        transaction.date === ""
    ) {

        alert("Please fill all fields.");
        return;

    }

    if (editIndex === -1) {

        transactions.push(transaction);
        alert("Transaction Added Successfully!");

    } else {

        transactions[editIndex] = transaction;
        editIndex = -1;
        alert("Transaction Updated Successfully!");

    }

    saveTransactions();
    displayTransactions();

    expenseForm.reset();

});

// -------------------------------
// Load Existing Data
// -------------------------------
displayTransactions();
// ===============================
// Expense Tracker - Part 2
// ===============================

// Edit Transaction
function editTransaction(index) {

    const item = transactions[index];

    title.value = item.title;
    amount.value = item.amount;
    type.value = item.type;
    category.value = item.category;
    date.value = item.date;

    editIndex = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// Delete Transaction
function deleteTransaction(index) {

    if (confirm("Are you sure you want to delete this transaction?")) {

        transactions.splice(index, 1);

        saveTransactions();

        displayTransactions();

    }

}

// Category Filter
const filterCategory = document.getElementById("filterCategory");

filterCategory.addEventListener("change", function () {

    const selected = this.value;

    if (selected === "All") {

        displayTransactions();

    } else {

        const filtered = transactions.filter(item => item.category === selected);

        displayTransactions(filtered);

    }

});

// Keep summary updated
updateSummary();

// Save data before page closes
window.addEventListener("beforeunload", saveTransactions);

// Refresh transactions on page load
window.onload = function () {

    displayTransactions();

};