// Чайная ложка сахара ≈ 5 г (стандартная оценка, используется в популярной нутрициологии)
const TSP_GRAMS = 5;

// Сахар «спрятан» в типичной порции напитка
const DRINKS = [
  { name: "Газировка (0,33 л)", grams: 35 },
  { name: "Апельсиновый сок (0,33 л)", grams: 33 },
  { name: "Энергетик (0,33 л)", grams: 39 },
  { name: "Холодный чай (0,33 л)", grams: 30 },
  { name: "Спортивный напиток (0,5 л)", grams: 21 },
  { name: "Какао / молочный коктейль (0,25 л)", grams: 25 },
  { name: "Домашний компот без сахара (0,33 л)", grams: 10 },
];

// Для сравнения с блоком 2
const WILD_APPLE_GRAMS = 10; // сахара в одном диком яблоке
const WHO_UPPER_LIMIT_TSP = 12; // верхняя граница дневной нормы ВОЗ, ч.л.

function setupScroll() {
  const startBtn = document.getElementById("start-btn");
  startBtn.addEventListener("click", () => {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  });
}

function renderSpoons(count) {
  const visual = document.getElementById("spoons-visual");
  visual.innerHTML = "";
  const fullSpoons = Math.round(count);
  for (let i = 0; i < fullSpoons; i++) {
    const spoon = document.createElement("span");
    spoon.className = "spoon";
    spoon.textContent = "🥄";
    visual.appendChild(spoon);
  }
}

function updateResult(drink) {
  const tsp = drink.grams / TSP_GRAMS;
  const tspRounded = Math.round(tsp * 10) / 10;

  document.getElementById("sugar-tsp").textContent = tspRounded;
  document.getElementById("sugar-grams").textContent = `≈ ${drink.grams} г сахара`;
  renderSpoons(tsp);

  const apples = Math.round((drink.grams / WILD_APPLE_GRAMS) * 10) / 10;
  document.getElementById("compare-line").textContent =
    `Это как съесть примерно ${apples} диких яблока подряд — то, что в природе растянулось бы на весь сезон.`;

  const percentOfLimit = Math.min((tsp / WHO_UPPER_LIMIT_TSP) * 100, 100);
  document.getElementById("who-bar-fill").style.width = `${percentOfLimit}%`;
}

function setupCalculator() {
  const select = document.getElementById("drink-select");

  DRINKS.forEach((drink, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = drink.name;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    updateResult(DRINKS[select.value]);
  });

  updateResult(DRINKS[0]);
}

document.addEventListener("DOMContentLoaded", () => {
  setupScroll();
  setupCalculator();
});
