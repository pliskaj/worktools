const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const addIncomeButton = document.getElementById("addIncome");
const addExpenseButton = document.getElementById("addExpense");
const resetSessionButton = document.getElementById("resetSession");
const transactionsList = document.getElementById("transactions");
const balanceSpan = document.getElementById("balance");

let balance = 0;
const transactions = loadTransactions();

function updateBalance() {
    balance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    balanceSpan.textContent = balance.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" });
}

function displayTransaction(transaction, index) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    const transactionText = document.createElement("span");
    transactionText.textContent = `${transaction.description} (${transaction.amount.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" })}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Smazat";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => deleteTransaction(index));

    listItem.appendChild(transactionText);
    listItem.appendChild(deleteButton);

    transactionsList.appendChild(listItem);
}
function deleteTransaction(index) {
    if (index >= 0 && index < transactions.length) {
        transactions.splice(index, 1);
        updateBalance();
        updateTransactionList();
        saveTransactions();
    }
}

function updateTransactionList() {
    transactionsList.innerHTML = "";
    transactions.forEach((transaction, index) => {
        displayTransaction(transaction, index);
    });
}

function parseAmount(input) {
    return parseFloat(input.replace(/\./g, "").replace(",", "."));
}

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
}

addIncomeButton.addEventListener("click", () => {
    const amount = parseAmount(amountInput.value);
    const description = descriptionInput.value;
    if (!isNaN(amount) && description) {
        const transaction = { amount, description };
        transactions.push(transaction);
        displayTransaction(transaction, transactions.length - 1);
        updateBalance();
        saveTransactions();
        amountInput.value = "";
        descriptionInput.value = "";
    }
});

addExpenseButton.addEventListener("click", () => {
    const amount = -parseAmount(amountInput.value);
    const description = descriptionInput.value;
    if (!isNaN(amount) && description) {
        const transaction = { amount, description };
        transactions.push(transaction);
        displayTransaction(transaction, transactions.length - 1);
        updateBalance();
        saveTransactions();
        amountInput.value = "";
        descriptionInput.value = "";
    }
});

resetSessionButton.addEventListener("click", () => {
    localStorage.removeItem("transactions");
    transactions.length = 0;
    updateTransactionList();
    updateBalance();
}
)
updateTransactionList();
updateBalance();
