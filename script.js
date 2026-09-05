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
  { name: "Какао (горячий шоколад)", emoji: "🍫", sugarPer100: 10, volumeMl: 250,
    swap: "тёплое молоко с ложкой какао без сахара" },
  { name: "Квас", emoji: "🌾", sugarPer100: 5, volumeMl: 330,
    swap: "квас с меньшим количеством сахара или морс" },
  { name: "Домашний компот без сахара", emoji: "🍑", sugarPer100: 3, volumeMl: 330,
    note: "Отличный выбор — почти как в меню пещерного человека." },
  { name: "Берёзовый сок", emoji: "🌳", sugarPer100: 2, volumeMl: 330,
    note: "Неплохой выбор — это природная сладость дерева, а не добавленный сахар." },
  { name: "Чёрный чай (с сахаром)", emoji: "☕", sugarPer100: 5, volumeMl: 200,
    note: "Не так уж много — а если класть одну ложку вместо двух, будет ещё меньше." },
  { name: "Зелёный чай", emoji: "🍵", sugarPer100: 0, volumeMl: 250,
    note: "Отличный выбор — зелёный чай традиционно пьют без сахара." },
  { name: "Имбирный чай (с мёдом)", emoji: "🫚", sugarPer100: 4, volumeMl: 200,
    note: "Совсем немного — имбирь и так даёт яркий вкус, сахара нужно меньше." },
  { name: "Имбирный эль", emoji: "🥤", sugarPer100: 9, volumeMl: 330,
    swap: "имбирный чай без сахара — вкус похож, а сахара нет" },
  { name: "Сок сахарного тростника", emoji: "🎋", sugarPer100: 14, volumeMl: 330,
    swap: "воду с долькой лайма — тростниковый сок почти весь состоит из сахара" },
  { name: "Кефир", emoji: "🥛", sugarPer100: 4, volumeMl: 250,
    note: "Хороший выбор — это природный молочный сахар (лактоза), а не добавленный." },
  { name: "Матча-латте", emoji: "🧉", sugarPer100: 9, volumeMl: 350,
    swap: "матчу на молоке без сиропа — тот же цвет и вкус, но без лишнего сахара" },
  { name: "Молоко", emoji: "🥛", sugarPer100: 4.7, volumeMl: 250,
    note: "Это природный молочный сахар (лактоза) — заменять не нужно." },
  { name: "Молочный коктейль (шоколадный)", emoji: "🍫", sugarPer100: 12, volumeMl: 350,
    swap: "домашний коктейль: молоко, взбитое с бананом" },
  { name: "Молочный коктейль (клубничный)", emoji: "🍓", sugarPer100: 12, volumeMl: 350,
    swap: "домашний коктейль: молоко, взбитое со свежей клубникой" },
  { name: "Молочный коктейль (малиновый)", emoji: "🫐", sugarPer100: 12, volumeMl: 350,
    swap: "домашний коктейль: молоко, взбитое с малиной" },
  { name: "Нектар (персиковый, яблочный)", emoji: "🍑", sugarPer100: 11, volumeMl: 330,
    swap: "стакан воды с ломтиком персика или яблока" },
  { name: "Пунш безалкогольный", emoji: "🍹", sugarPer100: 11, volumeMl: 330,
    swap: "домашний морс из ягод без сахара" },
  { name: "Айран", emoji: "🧂", sugarPer100: 0, volumeMl: 250,
    note: "Сахара тут нет вообще — это солёный, а не сладкий напиток." },
  { name: "Латте (кофе с молоком и сахаром)", emoji: "☕", sugarPer100: 6, volumeMl: 350,
    swap: "латте без сиропа, с одной ложкой сахара вместо двух" },
];

// Примерное содержание сахара (г на 1 штуку) — усреднённые данные из открытых
// источников. Как и с напитками, значения приблизительные.
const FOODS = [
  { name: "Твикс (батончик)", emoji: "🍫", sugarPerUnit: 27, defaultQty: 1,
    swap: "половину батончика сейчас, а вторую — на потом" },
  { name: "Марс (батончик)", emoji: "🍫", sugarPerUnit: 30, defaultQty: 1,
    swap: "мини-версию батончика вместо стандартной" },
  { name: "Сникерс (батончик)", emoji: "🥜", sugarPerUnit: 27, defaultQty: 1,
    swap: "горсть орехов — тоже сытно, но без такого сахара" },
  { name: "Баунти (батончик)", emoji: "🥥", sugarPerUnit: 32, defaultQty: 1,
    swap: "кусочек кокоса — вкус похож, а сахара почти нет" },
  { name: "Чупа-чупс (леденец)", emoji: "🍭", sugarPerUnit: 10, defaultQty: 1,
    note: "Не так много — а хватает надолго, если сосать медленно, а не грызть." },
  { name: "Леденцы-карамельки", emoji: "🍬", sugarPerUnit: 4, defaultQty: 3,
    swap: "одну карамельку вместо трёх" },
  { name: "Мармеладные мишки", emoji: "🐻", sugarPerUnit: 3, defaultQty: 8,
    swap: "несколько долек мандарина" },
  { name: "Печенье", emoji: "🍪", sugarPerUnit: 4, defaultQty: 2,
    note: "Немного — особенно если это овсяное печенье с клетчаткой." },
  { name: "Зефир", emoji: "🍡", sugarPerUnit: 17, defaultQty: 1,
    swap: "половину зефирки — вторую на потом" },
  { name: "Киндер-сюрприз", emoji: "🥚", sugarPerUnit: 11, defaultQty: 1,
    swap: "маленький кусочек тёмного шоколада" },
  { name: "Батончик мюсли", emoji: "🌾", sugarPerUnit: 8, defaultQty: 1,
    note: "Неплохой перекус — сахара заметно меньше, чем в шоколадном батончике." },
  { name: "Яблоко (перекус)", emoji: "🍎", sugarPerUnit: 19, defaultQty: 1,
    note: "Отличный перекус — это сахар целого фрукта вместе с клетчаткой." },
  { name: "Киндер Шоколад (мини-батончик)", emoji: "🍫", sugarPerUnit: 7, defaultQty: 1,
    swap: "квадратик тёмного шоколада 70%+ — сладость есть, а сахара меньше" },
  { name: "Киндер Буэно", emoji: "🍫", sugarPerUnit: 23, defaultQty: 1,
    swap: "горсть фундука с квадратиком шоколада" },
  { name: "Киндер Буэно Белый", emoji: "🤍", sugarPerUnit: 25, defaultQty: 1,
    swap: "обычный Киндер Буэно — в нём чуть меньше сахара" },
  { name: "Киндер Буэно Тёмный", emoji: "🍫", sugarPerUnit: 20, defaultQty: 1,
    note: "Неплохой выбор — тёмный шоколад тут даёт чуть меньше сахара, чем в остальных Буэно." },
  { name: "Киндер Джой", emoji: "🥚", sugarPerUnit: 12, defaultQty: 1,
    swap: "половину Киндер Джоя — вторую на потом" },
  { name: "Киндер Макси", emoji: "🍫", sugarPerUnit: 11, defaultQty: 1,
    swap: "обычный (не макси) батончик того же вкуса" },
  { name: "Киндер Кантри", emoji: "🌾", sugarPerUnit: 12, defaultQty: 1,
    swap: "батончик мюсли — похожая хрустящая текстура, меньше сахара" },
  { name: "Киндер Хэппи Хиппо", emoji: "🦛", sugarPerUnit: 10, defaultQty: 1,
    swap: "печенье с ореховой пастой домашнего приготовления" },
  { name: "Киндер Пингви", emoji: "🐧", sugarPerUnit: 14, defaultQty: 1,
    swap: "йогурт с ложкой варенья — похожая сливочная сладость" },
  { name: "Киндер Делис", emoji: "🧁", sugarPerUnit: 18, defaultQty: 1,
    swap: "половину пирожного — вторую на потом" },
  { name: "Киндер Молочный Слайс", emoji: "🥛", sugarPerUnit: 13, defaultQty: 1,
    swap: "стакан молока с квадратиком шоколада" },
];

// Для сравнения с блоком 2
const WILD_APPLE_GRAMS = 10; // сахара в одном диком яблоке
const WHO_UPPER_LIMIT_TSP = 12; // верхняя граница дневной нормы ВОЗ, ч.л.
const MAX_VISIBLE_SPOONS = 20;

function setupScroll() {
  const startBtn = document.getElementById("start-btn");
  startBtn.addEventListener("click", () => {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  });
}

function renderSpoons(elementId, count) {
  const visual = document.getElementById(elementId);
  visual.innerHTML = "";
  const fullSpoons = Math.round(count);
  const shown = Math.min(fullSpoons, MAX_VISIBLE_SPOONS);

  for (let i = 0; i < shown; i++) {
    const spoon = document.createElement("span");
    spoon.className = "spoon";
    spoon.style.animationDelay = `${i * 0.03}s`;
    spoon.textContent = "🥄";
    visual.appendChild(spoon);
  }

  if (fullSpoons > MAX_VISIBLE_SPOONS) {
    const extra = document.createElement("span");
    extra.className = "spoon-extra";
    extra.textContent = `+${fullSpoons - MAX_VISIBLE_SPOONS}`;
    visual.appendChild(extra);
  }
}

function volumeLabel(ml) {
  if (ml >= 1000) {
    const liters = ml / 1000;
    return `${liters.toString().replace(".", ",")} л`;
  }
  return `${ml} мл`;
}

// Считает чайные ложки/сравнение с яблоками/шкалу ВОЗ — общая часть для
// калькулятора напитков и калькулятора сладостей.
function renderSugarResult(ids, grams) {
  const tsp = grams / TSP_GRAMS;
  const tspRounded = Math.round(tsp * 10) / 10;

  document.getElementById(ids.tsp).textContent = tspRounded;
  renderSpoons(ids.spoons, tsp);

  const compareEl = document.getElementById(ids.compare);
  if (grams === 0) {
    compareEl.textContent =
      "Сахара здесь нет — вкус создают подсластители, а не сахароза.";
  } else {
    const apples = Math.round((grams / WILD_APPLE_GRAMS) * 10) / 10;
    compareEl.textContent =
      `Это как съесть примерно ${apples} диких яблока подряд — то, что в природе растянулось бы на весь сезон.`;
  }

  const percentOfLimit = Math.min((tsp / WHO_UPPER_LIMIT_TSP) * 100, 100);
  document.getElementById(ids.whoBarFill).style.width = `${percentOfLimit}%`;
}

function setSwapLine(elementId, item) {
  document.getElementById(elementId).textContent =
    item.swap ? `🔄 Замени на: ${item.swap}` : item.note;
}

function itemLabel(item) {
  return `${item.emoji} ${item.name}`;
}

// Общая логика для поля с поиском + кнопками количества. Используется и для
// напитков (мл/л), и для сладостей (шт) — конфиг задаёт, откуда брать данные
// и что делать при выборе.
function setupSearchCalculator(config) {
  const combobox = document.getElementById(config.comboboxId);
  const input = document.getElementById(config.inputId);
  const list = document.getElementById(config.listId);
  const quantityButtons = Array.from(document.querySelectorAll(config.quantitySelector));
  let activeIndex = -1;
  let selectedIndex = 0;

  function setQuantityButtons(qty) {
    quantityButtons.forEach((btn) => {
      const isSelected = Number(btn.dataset[config.quantityAttr]) === qty;
      btn.classList.toggle("is-selected", isSelected);
      btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
  }

  function renderList(query) {
    const q = query.trim().toLowerCase();
    const matches = config.items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.name.toLowerCase().includes(q));

    list.innerHTML = "";

    if (matches.length === 0) {
      const empty = document.createElement("li");
      empty.className = "combobox-empty";
      empty.textContent = "Ничего не найдено — попробуй другое слово";
      list.appendChild(empty);
      list.hidden = false;
      return;
    }

    matches.forEach(({ item, index }, position) => {
      const option = document.createElement("li");
      option.className = "combobox-option";
      option.id = `${config.inputId}-option-${index}`;
      option.setAttribute("role", "option");
      option.dataset.index = index;
      option.textContent = itemLabel(item);
      if (position === activeIndex) {
        option.classList.add("is-active");
        option.setAttribute("aria-selected", "true");
      }
      option.addEventListener("mousedown", (event) => {
        event.preventDefault();
        selectItem(index);
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

  function selectItem(index) {
    selectedIndex = index;
    const item = config.items[index];
    input.value = itemLabel(item);
    closeList();
    const qty = config.getDefaultQuantity(item);
    setQuantityButtons(qty);
    config.onSelect(item, qty);
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
        selectItem(Number(options[activeIndex].dataset.index));
      } else if (options.length === 1) {
        selectItem(Number(options[0].dataset.index));
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

  quantityButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const qty = Number(btn.dataset[config.quantityAttr]);
      setQuantityButtons(qty);
      config.onSelect(config.items[selectedIndex], qty);
    });
  });

  selectItem(0);
}

function setupDrinkCalculator() {
  setupSearchCalculator({
    items: DRINKS,
    comboboxId: "drink-combobox",
    inputId: "drink-input",
    listId: "drink-list",
    quantitySelector: "#drink-quantity-picker .volume-option",
    quantityAttr: "ml",
    getDefaultQuantity: (drink) => drink.volumeMl,
    onSelect: (drink, volumeMl) => {
      const grams = Math.round((drink.sugarPer100 * volumeMl) / 100);
      document.getElementById("sugar-grams").textContent =
        `≈ ${grams} г сахара (${volumeLabel(volumeMl)})`;
      renderSugarResult(
        { tsp: "sugar-tsp", spoons: "spoons-visual", compare: "compare-line", whoBarFill: "who-bar-fill" },
        grams
      );
      setSwapLine("swap-line", drink);
    },
  });
}

function setupFoodCalculator() {
  setupSearchCalculator({
    items: FOODS,
    comboboxId: "food-combobox",
    inputId: "food-input",
    listId: "food-list",
    quantitySelector: "#food-quantity-picker .volume-option",
    quantityAttr: "qty",
    getDefaultQuantity: (food) => food.defaultQty,
    onSelect: (food, qty) => {
      const grams = Math.round(food.sugarPerUnit * qty);
      document.getElementById("food-sugar-grams").textContent =
        `≈ ${grams} г сахара (${qty} шт)`;
      renderSugarResult(
        { tsp: "food-sugar-tsp", spoons: "food-spoons-visual", compare: "food-compare-line", whoBarFill: "food-who-bar-fill" },
        grams
      );
      setSwapLine("food-swap-line", food);
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupScroll();
  setupDrinkCalculator();
  setupFoodCalculator();
});
