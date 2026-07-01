const userA = document.querySelector("#topbarName");
const darkMode = document.querySelector("#darkModeToggle");
const settingsBtn = document.querySelector(".nav-item[data-target='settings-view']");
const dashboardBtn = document.querySelector(".nav-item[data-target='dashboard-view']");
const settingsView = document.querySelector("#settings-view");
const mainView = document.querySelector("#dashboard-view");
const modal = document.querySelector("#openAddModalBtn");
const modalContent = document.querySelector("#transactionModal");
const closeModalBtn = document.querySelector(".close-modal");
const modalForm = document.querySelector("#transactionForm");
const taskBody = document.querySelector("#transactionTableBody");
const taskArr = JSON.parse(localStorage.getItem("transactions")) || [];
const displayBal = document.querySelector("#displayBalance");
const displayIncome = document.querySelector("#displayIncome");
const displayCount = document.querySelector("#displayCount");
const displayExpenses = document.querySelector("#displayexpense");
const resetBtn = document.querySelector("#resetDataBtn");
const settingsCurrency = document.querySelector("#settingCurrency");
const ctx = document.getElementById("cashFlowChart").getContext("2d");




const cashFlowChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Income", "Expense"],
        datasets: [{
            label: "Amount",
            data: [0, 0],
            backgroundColor: [
                "#22c55e", // Income
                "#ef4444"  // Expense
            ],
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



const loggedIn = localStorage.getItem("loggedIn");
const userName = localStorage.getItem("userName");

if (loggedIn === "true" && userName) {
    userA.textContent = userName;
}

if (localStorage.getItem("loggedIn") !== "true") {
    window.location.replace("login.html");

}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    window.location.replace("login.html");
});



darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
})




settingsBtn.addEventListener("click", () => {
    mainView.style.display = "none";
    settingsView.style.display = "block";

    settingsBtn.classList.add("active");
    dashboardBtn.classList.remove("active");
})


dashboardBtn.addEventListener("click", () => {
    mainView.style.display = "block";
    settingsView.style.display = "none";

    settingsBtn.classList.remove("active");
    dashboardBtn.classList.add("active");
})





modal.addEventListener("click", (event) => {
    modalContent.classList.add("active");
});


closeModalBtn.addEventListener("click", () => {
    modalContent.classList.remove("active");
});




let taskUi = () => {
    taskBody.innerHTML = "";
    taskArr.forEach((transaction, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editTransaction()"><i class="fa-solid fa-pen"></i></button>
                <button class="action-btn btn-delete" onclick="deleteTransaction()"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        taskBody.appendChild(row);
    });

}




let updateDashboard = () => {

    taskUi();

    const totalIncome = taskArr.reduce((acc, tx) => {
        return tx.type === "income" ? acc + tx.amount : acc;
    }, 0);

    const totalExpenses = taskArr.reduce((acc, tx) => {
        return tx.type === "expense" ? acc + tx.amount : acc;
    }, 0);

    const totalBal = totalIncome - totalExpenses;

    displayIncome.textContent = `$${totalIncome.toFixed(2)}`;
    displayExpenses.textContent = `$${totalExpenses.toFixed(2)}`;
    displayBal.textContent = `$${totalBal.toFixed(2)}`;
    displayCount.textContent = taskArr.length;

    // Update Chart
    cashFlowChart.data.datasets[0].data = [
        totalIncome,
        totalExpenses
    ];

    cashFlowChart.update();
};


modalForm.addEventListener("submit", (event) => {
    event.preventDefault();


    const txType = document.querySelector("#txType");
    const txDescription = document.querySelector("#txDescription");
    const txAmount = document.querySelector("#txAmount");
    const txDate = document.querySelector("#txDate");
    const txCategory = document.querySelector("#txCategory");


    if (txDescription.value.trim() === "" || txAmount.value.trim() === "" || txDate.value.trim() === "" || txCategory.value.trim() === "") {
        alert("Please fill in all fields.");
        return;
    }


    const transaction = {
        type: txType.value,
        description: txDescription.value,
        amount: parseFloat(txAmount.value),
        date: txDate.value,
        category: txCategory.value
    }

    console.log("Transaction submitted:", transaction);


    taskArr.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(taskArr));

    updateDashboard();

    modalContent.classList.remove("active");
    modalForm.reset();
});





resetBtn.addEventListener("click", () => {
    localStorage.removeItem("transactions");
    taskArr.length = 0;
    updateDashboard();
})


updateDashboard();