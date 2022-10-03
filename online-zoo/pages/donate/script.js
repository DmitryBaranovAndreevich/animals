const progresBar = document.querySelector(".progress-bar");
const radioButtons = progresBar.querySelectorAll(".progress-bar__elipse");
const prices = progresBar.querySelectorAll(".progress-bar__text");
const wrapper = document.querySelector(".donate__wrapper");
const header = document.querySelector(".header");

function resetColorText() {
  for (const text of prices) {
    text.classList.remove("progress-bar__text_active");
  }
}

for (const button of radioButtons) {
  button.addEventListener("click", () => {
    const id = button.getAttribute("id");
    const text = progresBar.querySelector(`#${id}__text`);
    resetColorText();
    text.classList.toggle("progress-bar__text_active");
  });
}

const checkBoxContainers = Array.from(
  progresBar.querySelectorAll(".progress-bar__container")
);

function addHiddenClass() {
  for (const checkBox of checkBoxContainers) {
    if (!checkBox.classList.contains("progress-bar__container_hidden")) {
      checkBox.classList.add("progress-bar__container_hidden");
      break;
    }
  }
}

function addSmallLineClass() {
  const firstEl = checkBoxContainers.find(
    (el) => !el.classList.contains("progress-bar__container_hidden")
  );
  firstEl.classList.add("progress-bar__container_smallWidth");
  const firstLine = firstEl.querySelector(".progress-bar__line");
  firstLine.classList.add("progress-bar__line_hidden");
}

function removeSmallLineClass() {
  const notHiddenEl = checkBoxContainers.filter(
    (el) => !el.classList.contains("progress-bar__container_hidden")
  );
  notHiddenEl[1].classList.remove("progress-bar__container_smallWidth");
  const firstLine = notHiddenEl[1].querySelector(".progress-bar__line");
  firstLine.classList.remove("progress-bar__line_hidden");
}

function removeHiddenClass() {
  for (let i = checkBoxContainers.length - 1; i >= 0; i--) {
    const checkBox = checkBoxContainers[i];

    if (checkBox.classList.contains("progress-bar__container_hidden")) {
      checkBox.classList.remove("progress-bar__container_hidden");
      break;
    }
  }
}

function setElements() {
  const wrapperWidtch = wrapper.clientWidth;
  console.log(wrapperWidtch);
  const notHiddenEl = checkBoxContainers.filter(
    (el) => !el.classList.contains("progress-bar__container_hidden")
  );
  const firstLine = notHiddenEl[0].querySelector(".progress-bar__line");
  firstLine.classList.add("progress-bar__line_hidden");
  const size = wrapperWidtch / notHiddenEl.length;
  if (size < 125 && notHiddenEl.length > 5) {
    addHiddenClass();
    addSmallLineClass();
    setElements();
  }
  else if (size > 150) {
    removeHiddenClass();
    removeSmallLineClass();
    setElements();
  }
}

setElements();

window.addEventListener("resize", () => {
  const wrapperWidtch = wrapper.clientWidth;
  const notHiddenEl = checkBoxContainers.filter(
    (el) => !el.classList.contains("progress-bar__container_hidden")
  );
  const size = wrapperWidtch / notHiddenEl.length;
  console.log(size);
  if (size < 125 && notHiddenEl.length > 5) {
    addHiddenClass();
    addSmallLineClass();
    setElements();
  }
  if (size > 150) {
    removeHiddenClass();
    removeSmallLineClass();
     setElements();
  }
});

window.addEventListener("scroll", function () {
  let dist = 0;
  dist += this.window.scrollY;
  if (window.screen.width <= 970 && dist > 10)
    header.classList.add("header_fix");
  if (window.screen.width > 970 || dist < 10)
    header.classList.remove("header_fix");
});

const form = document.querySelector(".subscribe-form");
const input = form.querySelector(".subscribe-form__input");
const button = form.querySelector(".subscribe-form__button");
button.addEventListener("click", () => {
  console.log("sds");
});

const showInputError = (element) => {
  element.classList.add("subscribe-form_mistake");
  element.classList.remove("subscribe-form_valid");
};

const hideInputError = (element) => {
  element.classList.remove("subscribe-form_mistake");
  element.classList.add("subscribe-form_valid");
};

const isValid = () => {
  if (!input.validity.valid) {
    showInputError(input);
    showInputError(button);
    button.setAttribute("disabled", "true");
  } else {
    hideInputError(input);
    hideInputError(button);
    button.removeAttribute("disabled");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

form.addEventListener("input", isValid);
