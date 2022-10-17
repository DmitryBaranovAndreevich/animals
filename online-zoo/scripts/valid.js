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
