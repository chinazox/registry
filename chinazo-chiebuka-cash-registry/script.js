const BANK_DETAILS = {
  name: "YOUR NAME",
  sort: "XX-XX-XX",
  account: "XXXXXXXX"
};

// Add your real PayPal / GoCardless links to the relevant fund below.
// Leave a link blank if you don't want to offer that method yet.
const FUNDS = [
  {
    "name": "Our Honeymoon Fund",
    "goal": 5000,
    "contributed": 0,
    "description": "Help us make our first adventure as husband and wife one we'll never forget.",
    "icon": "✈️",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Furniture For Our New Home",
    "goal": 8000,
    "contributed": 0,
    "description": "Help us create a beautiful and comfortable home as we begin married life in Nigeria.",
    "icon": "🏡",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Wedding Night Suite",
    "goal": 350,
    "contributed": 0,
    "description": "Help us make our first night as husband and wife extra special.",
    "icon": "🥂",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Honeymoon Spending Money",
    "goal": 3000,
    "contributed": 0,
    "description": "A little extra spending money will help us enjoy every moment of our honeymoon.",
    "icon": "🌴",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Wedding Cake",
    "goal": 500,
    "contributed": 0,
    "description": "Help us cover the cake we'll be cutting together on our wedding day.",
    "icon": "🎂",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Wedding Planner",
    "goal": 2500,
    "contributed": 0,
    "description": "Help us bring all the little details of our wedding day together.",
    "icon": "📋",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "My Bridal Robe",
    "goal": 250,
    "contributed": 0,
    "description": "A little luxury for getting ready on the morning of the wedding.",
    "icon": "🤍",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Wedding Photographer",
    "goal": 4000,
    "contributed": 0,
    "description": "Help us capture the moments we'll want to remember forever.",
    "icon": "📷",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Wedding Catering",
    "goal": 10000,
    "contributed": 0,
    "description": "Help us feed and celebrate with all the people we love.",
    "icon": "🍽️",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Our First Date Night",
    "goal": 100,
    "contributed": 0,
    "description": "A little fund for our first proper date as newlyweds.",
    "icon": "🕯️",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Face Peel",
    "goal": 300,
    "contributed": 0,
    "description": "Because apparently the bride needs to be glowing.",
    "icon": "✨",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Drinks For Our Wedding",
    "goal": 4000,
    "contributed": 0,
    "description": "Help us keep the celebrations flowing.",
    "icon": "🥂",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Wedding Day Makeup",
    "goal": 500,
    "contributed": 0,
    "description": "Help cover the glam for the bride's big day.",
    "icon": "💄",
    "paypal": "",
    "gocardless": ""
  },
  {
    "name": "Home Down Payment",
    "goal": 6000,
    "contributed": 0,
    "description": "Help us put something towards the home we're building together.",
    "icon": "🔑",
    "paypal": "",
    "gocardless": ""
  }
];

const registry = document.getElementById("registry");
const backdrop = document.getElementById("modalBackdrop");
const closeModal = document.getElementById("closeModal");
const amountInput = document.getElementById("amount");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalGoal = document.getElementById("modalGoal");
const modalIcon = document.getElementById("modalIcon");
const bankDetails = document.getElementById("bankDetails");
const bankBtn = document.getElementById("bankBtn");
const paypalBtn = document.getElementById("paypalBtn");
const gcBtn = document.getElementById("gcBtn");
let activeFund = null;

const money = n => new Intl.NumberFormat("en-GB", {
  style:"currency", currency:"GBP", maximumFractionDigits:0
}).format(n);

function render() {
  registry.innerHTML = FUNDS.map((f, i) => {
    const pct = Math.min(100, (f.contributed / f.goal) * 100);
    return `<article class="card" data-index="${i}">
      <div class="card-image"><span>${f.icon}</span></div>
      <div class="card-body">
        <div class="card-kicker">Cash Gift</div>
        <h3>${f.name}</h3>
        <div class="card-desc">${f.description}</div>
        <div class="progress"><span style="width:${pct}%"></span></div>
        <div class="card-footer">
          <span>${money(f.contributed)} contributed</span>
          <strong>${money(f.goal)} goal</strong>
        </div>
      </div>
    </article>`;
  }).join("");
  document.querySelectorAll(".card").forEach(card =>
    card.addEventListener("click", () => openFund(Number(card.dataset.index)))
  );
}

function openFund(index) {
  activeFund = FUNDS[index];
  modalIcon.textContent = activeFund.icon;
  modalTitle.textContent = activeFund.name;
  modalDescription.textContent = activeFund.description;
  modalGoal.textContent = money(activeFund.goal);
  amountInput.value = "";
  bankDetails.classList.remove("open");
  backdrop.classList.add("open");
  backdrop.setAttribute("aria-hidden","false");
  document.querySelector('[data-bank="name"]').textContent = BANK_DETAILS.name;
  document.querySelector('[data-bank="sort"]').textContent = BANK_DETAILS.sort;
  document.querySelector('[data-bank="account"]').textContent = BANK_DETAILS.account;
  document.getElementById("bankReference").textContent =
    activeFund.name.replace(/[^A-Za-z0-9]/g,"").slice(0,18).toUpperCase();
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
}
amountInput.addEventListener("input", updateBankAmount);

bankBtn.addEventListener("click", () => {
  const amount = getAmount();
  if (amount === null) return;
  updateBankAmount();
  bankDetails.classList.toggle("open");
});

paypalBtn.addEventListener("click", () => {
  const amount = getAmount();
  if (amount === null) return;
  if (!activeFund.paypal) {
    alert("Your PayPal link hasn't been added yet. Add it in script.js.");
    return;
  }
  // If your PayPal link supports an amount suffix, replace this with your exact
  // PayPal format. Keeping the raw link is safest until your account is configured.
  window.open(activeFund.paypal, "_blank", "noopener,noreferrer");
});

gcBtn.addEventListener("click", () => {
  const amount = getAmount();
  if (amount === null) return;
  if (!activeFund.gocardless) {
    alert("GoCardless is not connected to this fund yet.");
    return;
  }
  window.open(activeFund.gocardless, "_blank", "noopener,noreferrer");
});

document.getElementById("copyBank").addEventListener("click", async () => {
  const amount = Number(amountInput.value) || 0;
  const reference = activeFund.name.replace(/[^A-Za-z0-9]/g,"").slice(0,18).toUpperCase();
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

render();
