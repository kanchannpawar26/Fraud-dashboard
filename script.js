const transactions = [
  { id: 1, amount: 200, location: "India" },
  { id: 2, amount: 9000, location: "USA" },
  { id: 3, amount: 15000, location: "Russia" },
  { id: 4, amount: 500, location: "India" },
  { id: 5, amount: 7000, location: "China" }
];

const tbody = document.getElementById("tableBody");
const search = document.getElementById("search");

function detectFraud(tx) {
  if (tx.amount > 8000 || tx.location !== "India") {
    return "Fraud";
  }
  return "Safe";
}

function loadTable(data) {
  tbody.innerHTML = "";
  
  data.forEach(tx => {
    const status = detectFraud(tx);
    const row = `
      <tr>
        <td>${tx.id}</td>
        <td>${tx.amount}</td>
        <td>${tx.location}</td>
        <td class="${status === "Fraud" ? "fraud" : "safe"}">
          ${status === "Fraud" ? "🚨 Fraud" : "✅ Safe"}
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

loadTable(transactions);

// 🔍 Search Feature
search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const filtered = transactions.filter(tx =>
    tx.location.toLowerCase().includes(value)
  );
  loadTable(filtered);
});

// 📊 Chart
const fraudCount = transactions.filter(tx => detectFraud(tx) === "Fraud").length;
const safeCount = transactions.length - fraudCount;

new Chart(document.getElementById("chart"), {
  type: "pie",
  data: {
    labels: ["Fraud", "Safe"],
    datasets: [{
      data: [fraudCount, safeCount],
      backgroundColor: ["red", "green"]
    }]
  }
});