

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

let position = 0;
let showElements = 3;
const scrolElements = 2;

const slider = document.querySelector(".slider");
const container = slider.querySelector(".slider__container");
if (container.clientWidth < 800) showElements = 2;
if (container.clientWidth > 800) showElements = 3;
const tracks = slider.querySelectorAll(".slider__track");
const items = slider.querySelectorAll(".slider__item");
const btnPrev = slider.querySelector(".slider__button-prev");
const btnNext = slider.querySelector(".slider__button-next");
const itemWidth =
  (container.clientWidth - 30 * (showElements - 1)) / showElements;
const movePosition = scrolElements * itemWidth + 30 * scrolElements;
const testimonals = document.querySelector(".testimonials");
const posts = testimonals.querySelectorAll(".testimonials__post");
const header = document.querySelector('.header');
const main = document.querySelector('.main');


window.addEventListener("resize", () => {
  tracks.forEach((track) => {
    track.style.transform = `translateX(0)`;
  });
  position = 0;
  cardWidth = container.clientWidth;
  if (container.clientWidth < 800) showElements = 2;
  if (container.clientWidth > 800) showElements = 3;
  setWidth();
  check();
  if (testimonals.clientWidth < 950) {
    setPostsNone();
  } else {
    setPostVisible()
  }
});

window.addEventListener("scroll", function () {
  let dist = 0;
  dist += this.window.scrollY;
  if (window.screen.width <= 970 && dist > 0){
    header.classList.add("header_fix");
    main.style.marginTop = `${header.clientHeight}px`;
  }
  if (window.screen.width > 970 || dist == 0) {
    header.classList.remove("header_fix");
    main.style.marginTop = 0;
  }
});

btnNext.onclick = function () {
  const itemWidth =
    (container.clientWidth - 30 * (showElements - 1)) / showElements;
  const movePosition = scrolElements * itemWidth + 30 * scrolElements;
  const itemsLeft = Math.ceil(
    items.length / 2 -
      (Math.abs(position) + showElements * itemWidth) / itemWidth
  );
  position -=
    itemsLeft > scrolElements
      ? movePosition
      : itemsLeft * itemWidth + 30 * itemsLeft;

  tracks.forEach((track) => {
    track.style.transform = `translateX(${position}px)`;
  });
  check();
};

btnPrev.onclick = function () {
  const itemWidth =
    (container.clientWidth - 30 * (showElements - 1)) / showElements;
  const movePosition = scrolElements * itemWidth + 30 * scrolElements;
  position += 0 - position > movePosition ? movePosition : 0 - position;
  tracks.forEach((track) => {
    track.style.transform = `translateX(${position}px)`;
  });
  check();
};

if (testimonals.clientWidth < 950) {
  setPostsNone();
} else {
  setPostVisible();
}

setWidth();
check();
setPosts();


console.log(posts)
function setPostsNone() {
  for (let i = 3; i < posts.length; i++) {
    posts[i].classList.add("testimonials__post_notvisible");
  }
}
function setPostVisible() {
   for (let i = 0; i < posts.length; i++) {
     posts[i].classList.remove("testimonials__post_notvisible");
   }
}

function setWidth() {
  let itemWidth =
    (container.clientWidth - 30 * (showElements - 1)) / showElements;

    if(container.clientWidth < 483) itemWidth = 285;
  items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
    const image = item.querySelector(".slider__item-image");
    image.style.maxWidth = `${itemWidth - 2}px`;
    image.style.maxHeight = `${itemWidth}px`;
  });
}

function check() {
  const itemWidth =
    (container.clientWidth - 30 * (showElements - 1)) / showElements;
  if (position >= 0) {
    btnPrev.setAttribute("disabled", true);
  } else {
    btnPrev.removeAttribute("disabled");
  }
  if (position <= -itemWidth * (items.length / 2 - showElements)) {
    btnNext.setAttribute("disabled", true);
  } else {
    btnNext.removeAttribute("disabled");
  }
}


