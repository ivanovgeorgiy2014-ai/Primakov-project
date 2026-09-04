// Чайная ложка сахара ≈ 5 г (стандартная оценка, используется в популярной нутрициологии)
const TSP_GRAMS = 5;

// Примерное содержание сахара (г на 100 мл) — усреднённые данные из открытых
// источников (составы производителей, справочники по питанию). Значения
// округлены и не претендуют на точность конкретной партии продукта —
// этого достаточно для школьного проекта.
const DRINKS = [
  { name: "Кола", sugarPer100: 10.6, volumeMl: 330 },
  { name: "Кола Zero / без сахара", sugarPer100: 0, volumeMl: 330 },
  { name: "Пепси", sugarPer100: 11, volumeMl: 330 },
  { name: "Фанта (апельсин)", sugarPer100: 12, volumeMl: 330 },
  { name: "Спрайт", sugarPer100: 9, volumeMl: 330 },
  { name: "Лимонад (дюшес, крем-сода)", sugarPer100: 11, volumeMl: 330 },
  { name: "Тоник", sugarPer100: 8, volumeMl: 330 },
  { name: "Энергетик", sugarPer100: 11, volumeMl: 330 },
  { name: "Апельсиновый сок (100%)", sugarPer100: 9, volumeMl: 330 },
  { name: "Яблочный сок", sugarPer100: 10.5, volumeMl: 330 },
  { name: "Виноградный сок", sugarPer100: 15, volumeMl: 330 },
  { name: "Фруктовый смузи (магазинный)", sugarPer100: 11, volumeMl: 250 },
  { name: "Холодный чай (бутилированный)", sugarPer100: 7.2, volumeMl: 330 },
  { name: "Спортивный напиток / изотоник", sugarPer100: 6, volumeMl: 500 },
  { name: "Какао / молочный коктейль", sugarPer100: 10, volumeMl: 250 },
  { name: "Квас", sugarPer100: 5, volumeMl: 330 },
  { name: "Домашний компот без сахара", sugarPer100: 3, volumeMl: 330 },
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

function drinkVolumeLabel(drink) {
  const liters = drink.volumeMl / 1000;
  return `${liters.toString().replace(".", ",")} л`;
}

function updateResult(drink) {
  const grams = Math.round((drink.sugarPer100 * drink.volumeMl) / 100);
  const tsp = grams / TSP_GRAMS;
  const tspRounded = Math.round(tsp * 10) / 10;

  document.getElementById("sugar-tsp").textContent = tspRounded;
  document.getElementById("sugar-grams").textContent = `≈ ${grams} г сахара (${drinkVolumeLabel(drink)})`;
  renderSpoons(tsp);

  const compareLine = document.getElementById("compare-line");
  if (grams === 0) {
    compareLine.textContent =
      "Сахара здесь нет — вкус создают подсластители, а не сахароза.";
  } else {
    const apples = Math.round((grams / WILD_APPLE_GRAMS) * 10) / 10;
    compareLine.textContent =
      `Это как съесть примерно ${apples} диких яблока подряд — то, что в природе растянулось бы на весь сезон.`;
  }

  const percentOfLimit = Math.min((tsp / WHO_UPPER_LIMIT_TSP) * 100, 100);
  document.getElementById("who-bar-fill").style.width = `${percentOfLimit}%`;
}

function setupCalculator() {
  const select = document.getElementById("drink-select");

  DRINKS.forEach((drink, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${drink.name} (${drinkVolumeLabel(drink)})`;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    updateResult(DRINKS[select.value]);
  });

  updateResult(DRINKS[0]);
}

function renderOwnSpoons(count) {
  const visual = document.getElementById("own-spoons-visual");
  visual.innerHTML = "";
  const fullSpoons = Math.round(count);
  for (let i = 0; i < fullSpoons; i++) {
    const spoon = document.createElement("span");
    spoon.className = "spoon";
    spoon.textContent = "🥄";
    visual.appendChild(spoon);
  }
}

function setupOwnCalculator() {
  const volumeInput = document.getElementById("own-volume");
  const sugar100Input = document.getElementById("own-sugar100");
  const resultLine = document.getElementById("own-result-line");

  function update() {
    const volume = parseFloat(volumeInput.value);
    const sugarPer100 = parseFloat(sugar100Input.value);

    if (!volume || !sugarPer100 || volume <= 0 || sugarPer100 <= 0) {
      renderOwnSpoons(0);
      resultLine.innerHTML = "Заполни оба поля, чтобы увидеть результат";
      return;
    }

    const totalGrams = (volume * sugarPer100) / 100;
    const tsp = totalGrams / TSP_GRAMS;
    const tspRounded = Math.round(tsp * 10) / 10;
    const gramsRounded = Math.round(totalGrams);

    renderOwnSpoons(tsp);
    resultLine.innerHTML =
      `<span class="stat-num">${tspRounded}</span> чайных ложек сахара ` +
      `<span class="result-sub">≈ ${gramsRounded} г сахара во всём напитке</span>`;
  }

  volumeInput.addEventListener("input", update);
  sugar100Input.addEventListener("input", update);
}

document.addEventListener("DOMContentLoaded", () => {
  setupScroll();
  setupCalculator();
  setupOwnCalculator();
});
