// Чайная ложка сахара ≈ 5 г (стандартная оценка, используется в популярной нутрициологии)
const TSP_GRAMS = 5;

// Примерное содержание сахара (г на 100 мл) — усреднённые данные из открытых
// источников (составы производителей, справочники по питанию). Значения
// округлены и не претендуют на точность конкретной партии продукта —
// этого достаточно для школьного проекта.
// swap — чем можно заменить; note — используется вместо swap для напитков,
// где сахара и так мало (тогда заменять не нужно, а нужно похвалить выбор).
const DRINKS = [
  { name: "Кола", emoji: "🥤", sugarPer100: 10.6, volumeMl: 330,
    swap: "газировку с лимоном и мятой, без сахара" },
  { name: "Кола Zero / без сахара", emoji: "🥤", sugarPer100: 0, volumeMl: 330,
    note: "Неплохой вариант! Сахара тут нет — вкус создают подсластители." },
  { name: "Пепси", emoji: "🥤", sugarPer100: 11, volumeMl: 330,
    swap: "домашний холодный чай без сахара" },
  { name: "Фанта (апельсин)", emoji: "🍊", sugarPer100: 12, volumeMl: 330,
    swap: "целый апельсин и стакан воды" },
  { name: "Спрайт", emoji: "🥤", sugarPer100: 9, volumeMl: 330,
    swap: "газированную воду с долькой лимона" },
  { name: "Лимонад (дюшес, крем-сода)", emoji: "🍋", sugarPer100: 11, volumeMl: 330,
    swap: "домашний морс без сахара" },
  { name: "Тоник", emoji: "🫧", sugarPer100: 8, volumeMl: 330,
    swap: "воду с долькой лайма" },
  { name: "Энергетик", emoji: "⚡", sugarPer100: 11, volumeMl: 330,
    swap: "зелёный чай — тоже бодрит, но без сахарных качелей" },
  { name: "Апельсиновый сок (100%)", emoji: "🍊", sugarPer100: 9, volumeMl: 330,
    swap: "целый апельсин — та же сладость, но с клетчаткой" },
  { name: "Яблочный сок", emoji: "🍏", sugarPer100: 10.5, volumeMl: 330,
    swap: "целое яблоко" },
  { name: "Виноградный сок", emoji: "🍇", sugarPer100: 15, volumeMl: 330,
    swap: "гроздь винограда" },
  { name: "Фруктовый смузи (магазинный)", emoji: "🧋", sugarPer100: 11, volumeMl: 250,
    swap: "смузи из целых фруктов, сделанный дома" },
  { name: "Холодный чай (бутилированный)", emoji: "🧊", sugarPer100: 7.2, volumeMl: 330,
    swap: "чай, заваренный дома, без сахара" },
  { name: "Спортивный напиток / изотоник", emoji: "🏃", sugarPer100: 6, volumeMl: 500,
    swap: "обычную воду — изотоник нужен только при долгой нагрузке" },
  { name: "Какао / молочный коктейль", emoji: "🍫", sugarPer100: 10, volumeMl: 250,
    swap: "тёплое молоко с ложкой какао без сахара" },
  { name: "Квас", emoji: "🌾", sugarPer100: 5, volumeMl: 330,
    swap: "квас с меньшим количеством сахара или морс" },
  { name: "Домашний компот без сахара", emoji: "🍑", sugarPer100: 3, volumeMl: 330,
    note: "Отличный выбор — почти как в меню пещерного человека." },
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
    spoon.style.animationDelay = `${i * 0.04}s`;
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

  const swapLine = document.getElementById("swap-line");
  swapLine.textContent = drink.swap ? `🔄 Замени на: ${drink.swap}` : drink.note;

  const percentOfLimit = Math.min((tsp / WHO_UPPER_LIMIT_TSP) * 100, 100);
  document.getElementById("who-bar-fill").style.width = `${percentOfLimit}%`;
}

function drinkLabel(drink) {
  return `${drink.emoji} ${drink.name} (${drinkVolumeLabel(drink)})`;
}

function setupCalculator() {
  const combobox = document.getElementById("drink-combobox");
  const input = document.getElementById("drink-input");
  const list = document.getElementById("drink-list");
  let activeIndex = -1;

  function renderList(query) {
    const q = query.trim().toLowerCase();
    const matches = DRINKS
      .map((drink, index) => ({ drink, index }))
      .filter(({ drink }) => drink.name.toLowerCase().includes(q));

    list.innerHTML = "";

    if (matches.length === 0) {
      const empty = document.createElement("li");
      empty.className = "combobox-empty";
      empty.textContent = "Ничего не найдено — попробуй другое слово";
      list.appendChild(empty);
      list.hidden = false;
      return;
    }

    matches.forEach(({ drink, index }, position) => {
      const option = document.createElement("li");
      option.className = "combobox-option";
      option.id = `drink-option-${index}`;
      option.setAttribute("role", "option");
      option.dataset.index = index;
      option.textContent = drinkLabel(drink);
      if (position === activeIndex) {
        option.classList.add("is-active");
        option.setAttribute("aria-selected", "true");
      }
      option.addEventListener("mousedown", (event) => {
        event.preventDefault();
        selectDrink(index);
      });
      list.appendChild(option);
    });

    list.hidden = false;
  }

  function openList() {
    activeIndex = -1;
    renderList(input.value);
    input.setAttribute("aria-expanded", "true");
  }

  function closeList() {
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
    activeIndex = -1;
  }

  function selectDrink(index) {
    const drink = DRINKS[index];
    input.value = drinkLabel(drink);
    closeList();
    updateResult(drink);
  }

  function updateActive(options) {
    options.forEach((option, i) => {
      const isActive = i === activeIndex;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    if (activeIndex >= 0) {
      input.setAttribute("aria-activedescendant", options[activeIndex].id);
      options[activeIndex].scrollIntoView({ block: "nearest" });
    } else {
      input.removeAttribute("aria-activedescendant");
    }
  }

  input.addEventListener("focus", () => {
    input.select();
    openList();
  });

  input.addEventListener("input", () => {
    activeIndex = -1;
    renderList(input.value);
  });

  input.addEventListener("keydown", (event) => {
    if (list.hidden && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      openList();
      return;
    }
    if (list.hidden) return;

    const options = Array.from(list.querySelectorAll(".combobox-option"));

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (options.length === 0) return;
      activeIndex = (activeIndex + 1) % options.length;
      updateActive(options);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (options.length === 0) return;
      activeIndex = (activeIndex - 1 + options.length) % options.length;
      updateActive(options);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0 && options[activeIndex]) {
        selectDrink(Number(options[activeIndex].dataset.index));
      } else if (options.length === 1) {
        selectDrink(Number(options[0].dataset.index));
      }
    } else if (event.key === "Escape") {
      closeList();
    }
  });

  document.addEventListener("click", (event) => {
    if (!combobox.contains(event.target)) {
      closeList();
    }
  });

  selectDrink(0);
}

document.addEventListener("DOMContentLoaded", () => {
  setupScroll();
  setupCalculator();
});
