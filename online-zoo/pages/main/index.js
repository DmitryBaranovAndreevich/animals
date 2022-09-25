const form = document.querySelector(".subscribe-form");
const input = form.querySelector(".subscribe-form__input");
const button = form.querySelector(".subscribe-form__button");
button.addEventListener('click' , () => {
  console.log('sds')
})

const showInputError = (element) => {
  element.classList.add("subscribe-form_mistake");
  element.classList.remove("subscribe-form_valid");
};

const hideInputError = (element) => {
  element.classList.remove("subscribe-form_mistake");
  element.classList.add("subscribe-form_valid");
};

const isValid = () => {
  if(!input.validity.valid) {
    showInputError(input);
    showInputError(button);
    button.setAttribute("disabled", "true");
  } else {
    hideInputError(input);
    hideInputError(button);
    button.removeAttribute("disabled");
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
})

form.addEventListener('input', isValid)

let position = 0;
const showElements = 3;
const scrolElements = 2;

const slider = document.querySelector(".slider");
const container = slider.querySelector(".slider__container");
const tracks = slider.querySelectorAll(".slider__track");
const items = slider.querySelectorAll(".slider__item");
const btnPrev = slider.querySelector(".slider__button-prev");
const btnNext = slider.querySelector(".slider__button-next");
const itemWidth =
  (container.clientWidth - 30 * (showElements - 1)) / showElements;
const movePosition = scrolElements * itemWidth + 30 * scrolElements;

setWidth();
check();

function setWidth() {
  items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
  });
}

function check() {
  if (position >= 0) {
    btnPrev.setAttribute("disabled", true);
  } else {
    btnPrev.removeAttribute("disabled");
  }
  if (position <= -itemWidth * ((items.length - 1) / 2 - showElements)) {
    btnNext.setAttribute("disabled", true);
  } else {
    btnNext.removeAttribute("disabled");
  }
}

btnNext.onclick = function () {
  const itemsLeft =
    Math.ceil(items.length / 2 -
    (Math.abs(position) + showElements * itemWidth) / itemWidth);
  console.log(itemsLeft);
  position -=
    itemsLeft >= scrolElements
      ? movePosition
      : itemsLeft * itemWidth + 30 * itemsLeft;;

  tracks.forEach((track) => {
    track.style.transform = `translateX(${position}px)`;
  });
  check();
};

btnPrev.onclick = function () {
  position += movePosition;
  tracks.forEach((track) => {
    track.style.transform = `translateX(${position}px)`;
  });
  check();
};


