const BANK_DETAILS = {
  name: "CHINAZO ONWUTA",
  sort: "04-00-75",
  account: "20810458"
};
const NIG_BANK_DETAILS = {
  name: "CHIEBUKA ITANYI",
  bank: "Zenith Bank",
  account: "2174967910"
};

const FUNDS = [
  {
    "name": "Our Honeymoon Fund",
    "goal": 6000,
    "image": "images/honeymoon.jpeg",
    "code": "HF"
  },
  {
    "name": "Furniture For Our New Home",
    "goal": 8000,
    "image": "images/furniture.jpg",
    "code": "FN"
  },
  {
    "name": "Wedding Night Suite",
    "goal": 350,
    "image": "images/suite.JPG",
    "code": "WS"
  },
  {
    "name": "Wedding Cake",
    "goal": 450,
    "image": "images/cake.jpeg",
    "code": "WC"
  },
  {
    "name": "Our First Date Night",
    "goal": 100,
     "image": "images/datenight.jpeg",
    "code": "DN"
  },
  {
    "name": "Uber to the Airport",
    "goal": 50,
    "image": "images/uber.jpeg",
    "code": "UA"
  },
   {
    "name": "Content Creator",
    "goal": 250,
    "image": "images/content.jpeg",
    "code": "CC"
  },
  {
    "name": "Wedding DJ",
    "goal": 500,
    "image": "images/dj.jpeg",
    "code": "DJ"
  },
  {
    "name": "House Down Payment",
    "goal": 10000,
    "image": "images/home.jpeg",
    "code": "HP"
  }
];

const registry = document.getElementById("registry");
const backdrop = document.getElementById("modalBackdrop");
const closeModal = document.getElementById("closeModal");
const amountInput = document.getElementById("amount");
const modalTitle = document.getElementById("modalTitle");
const modalGoal = document.getElementById("modalGoal");
const modalIcon = document.getElementById("modalIcon");
const bankDetails = document.getElementById("bankDetails");
const bankBtn = document.getElementById("bankBtn");
const paylinkBtn = document.getElementById("paylinkBtn");
const paymentLink = document.getElementById("paymentLink");
let activeFund = null;

const money = n => new Intl.NumberFormat("en-GB", {
  style:"currency", currency:"GBP", maximumFractionDigits:0
}).format(n);

function render() {
  registry.innerHTML = FUNDS.map((f, i) => `
    <article class="card" data-index="${i}">
      <div class="card-image">
  <img src="${f.image}" alt="${f.name}">
</div>
      <div class="card-body">
        <div class="card-kicker">Cash Contribution</div>
        <h3>${f.name}</h3>
        <div class="goal"><span>Total goal</span><strong>${money(f.goal)}</strong></div>
        <div class="contribute-link"><span>Contribute</span><span>→</span></div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".card").forEach(card =>
    card.addEventListener("click", () => openFund(Number(card.dataset.index)))
  );
}

function openFund(index) {
  activeFund = FUNDS[index];
  modalIcon.textContent = activeFund.icon;
  modalTitle.textContent = activeFund.name;
  modalGoal.textContent = money(activeFund.goal);
  amountInput.value = "";
  bankDetails.classList.remove("open");
  backdrop.classList.add("open");
  backdrop.setAttribute("aria-hidden","false");
  document.querySelector('[data-bank="name"]').textContent = BANK_DETAILS.name;
  document.querySelector('[data-bank="sort"]').textContent = BANK_DETAILS.sort;
  document.querySelector('[data-bank="account"]').textContent = BANK_DETAILS.account;
  document.getElementById("bankReference").textContent = "YOUR NAME + " + activeFund.code;
  document.getElementById("nigeriaBankReference").textContent = "YOUR NAME + " + activeFund.code;
}

function close() {
  backdrop.classList.remove("open");
  backdrop.setAttribute("aria-hidden","true");
}
closeModal.addEventListener("click", close);
backdrop.addEventListener("click", e => { if (e.target === backdrop) close(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

document.querySelectorAll(".quick-amounts button").forEach(btn =>
  btn.addEventListener("click", () => {
    amountInput.value = btn.dataset.amount;
    document.querySelectorAll(".quick-amounts button").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    updateBankAmount();
  })
);

function getAmount() {
  const amount = Number(amountInput.value);
  if (!amount || amount <= 0) {
    amountInput.focus();
    alert("Please enter the amount you would like to contribute.");
    return null;
  }
  return amount;
}

function updateBankAmount() {
  const amount = Number(amountInput.value) || 0;
  document.getElementById("bankAmount").textContent = money(amount);
  document.getElementById("paymentAmount").textContent = money(amount);
  document.getElementById("cardAmount").textContent = money(amount);
  document.getElementById("nigeriaBankAmount").textContent = money(amount);
}
amountInput.addEventListener("input", updateBankAmount);
amountInput.addEventListener("input", () => {
  document.getElementById("paymentAmount").textContent = money(Number(amountInput.value) || 0);
});

bankBtn.addEventListener("click", () => {
  const amount = getAmount();
  if (amount === null) return;
  updateBankAmount();
  bankDetails.classList.toggle("open");
});

paylinkBtn.addEventListener("click", () => {
  const amount = getAmount();
  if (amount === null) return;

  document.getElementById("paymentAmount").textContent = "£" + amount;
  paymentLink.classList.toggle("open");
});

const cardBtn = document.getElementById("cardBtn");
const cardPayment = document.getElementById("cardPayment");

cardBtn.addEventListener("click", () => {
  const amount = getAmount();
  if (amount === null) return;

  document.getElementById("cardAmount").textContent = money(amount);
 cardPayment.classList.toggle("open");
cardBtn.classList.toggle("open");

if (cardBtn.classList.contains("open")) {
  cardBtn.style.setProperty("background", "#24221f", "important");
  cardBtn.style.setProperty("color", "white", "important");
} else {
  cardBtn.style.removeProperty("background");
  cardBtn.style.removeProperty("color");
}
});
paypal.HostedButtons({
    hostedButtonId: "J99ZJFK67ZYRQ",
  }).render("#paypal-container-J99ZJFK67ZYRQ")

document.getElementById("copyBank").addEventListener("click", async () => {
  const amount = Number(amountInput.value) || 0;
  const reference = "YOUR NAME + " + activeFund.code;
  const text = `Account name: ${BANK_DETAILS.name}
Sort code: ${BANK_DETAILS.sort}
Account number: ${BANK_DETAILS.account}
Reference: ${reference}
Amount: ${money(amount)}`;
  try {
    await navigator.clipboard.writeText(text);
    document.getElementById("copyBank").textContent = "Copied ✓";
    setTimeout(() => document.getElementById("copyBank").textContent = "Copy bank details", 1800);
  } catch {
    alert(text);
  }
});

document.getElementById("copyNigeriaBank").addEventListener("click", async () => {
  const amount = Number(amountInput.value) || 0;
  const reference = "YOUR NAME + " + activeFund.code;
  const text = `Account name: ${NIG_BANK_DETAILS.name}
Bank: ${NIG_BANK_DETAILS.bank}
Account number: ${NIG_BANK_DETAILS.account}
Reference: ${reference}
Amount: ${money(amount)}`;

  try {
    await navigator.clipboard.writeText(text);
    document.getElementById("copyNigeriaBank").textContent = "Copied ✓";
    setTimeout(() => document.getElementById("copyNigeriaBank").textContent = "Copy bank details", 1800);
  } catch {
    alert(text);
  }
});

document.getElementById("ukBankBtn").addEventListener("click", () => {
  document.getElementById("bankDetails").querySelector("dl").style.display = "block";
  document.getElementById("nigeriaBankDetails").style.display = "none";

  document.getElementById("ukBankBtn").style.background = "#24221f";
  document.getElementById("ukBankBtn").style.color = "white";
  document.getElementById("nigeriaBankBtn").style.background = "transparent";
  document.getElementById("nigeriaBankBtn").style.color = "#24221f";
});

document.getElementById("nigeriaBankBtn").addEventListener("click", () => {
  document.getElementById("bankDetails").querySelector("dl").style.display = "none";
  document.getElementById("nigeriaBankDetails").style.display = "block";

  document.getElementById("nigeriaBankBtn").style.background = "#24221f";
  document.getElementById("nigeriaBankBtn").style.color = "white";
  document.getElementById("ukBankBtn").style.background = "transparent";
  document.getElementById("ukBankBtn").style.color = "#24221f";
});

render();
