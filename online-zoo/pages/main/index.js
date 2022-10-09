let images = [
  {
    name: "giant pandas",
    description: "Native to Southwest China",
    src: "../../images/slider/panda.jpg",
    icon: "../../icons/slider/banana-bamboo_icon.svg",
    comment: "Травоядный зверь",
  },
  {
    name: "Eagles",
    description: "Native to South America",
    src: "../../images/slider/Eagl.jpg",
    icon: "../../icons/slider/meet-fish_icon.svg",
    comment: "Млекопитающий зверь",
  },
  {
    name: "Gorillas",
    description: "Native to Congo",
    src: "../../images/slider/Gorilla.jpg",
    icon: "../../icons/slider/banana-bamboo_icon.svg",
    comment: "Травоядный зверь",
  },
  {
    name: "Alligators",
    description: "Native to Southeastern U. S.",
    src: "../../images/slider/Alligator.jpg",
    icon: "../../icons/slider/meet-fish_icon.svg",
    comment: "Млекопитающий зверь",
  },
  {
    name: "Penguins",
    description: "Native to Antarctica",
    src: "../../images/slider/Penguin.jpg",
    icon: "../../icons/slider/meet-fish_icon.svg",
    comment: "Млекопитающий зверь",
  },
  {
    name: "cheetahs",
    description: "Native to Africa",
    src: "../../images/slider/Cheetah.jpg",
    icon: "../../icons/slider/meet-fish_icon.svg",
    comment: "Млекопитающий зверь",
  },
];

const sliders = document.querySelectorAll(".slider__track");

let position = 0;
let showElements = 3;

const slider = document.querySelector(".slider");
const container = slider.querySelector(".slider__container");
if (container.clientWidth < 800) showElements = 2;
if (container.clientWidth > 800) showElements = 3;
const tracks = slider.querySelectorAll(".slider__track");
const btnPrev = slider.querySelector(".slider__button-prev");
const btnNext = slider.querySelector(".slider__button-next");
let scrolElements = showElements;
let itemWidth =
  (container.clientWidth - 30 * (showElements - 1)) / showElements;
const movePosition = scrolElements * itemWidth + 30 * scrolElements;
const header = document.querySelector(".header");
const main = document.querySelector(".main");
const templateSlider = document.querySelector("#teplate-slider").content;
let scrollingEltoLeft = 0;
let scrollingEltoRight = 0;

function cloneEl(el) {
  const sliderEl = templateSlider
    .querySelector(".slider__item")
    .cloneNode(true);
  sliderEl.querySelector(".slider__item-image").src = el.src;
  sliderEl.querySelector(".slider__item-title").textContent = el.name;
  sliderEl.querySelector(".slider__item-subtitle").textContent = el.description;
  const icon = sliderEl.querySelector(".slider__item-icon");
  icon.src = el.icon;
  icon.alt = el.comment;
  return sliderEl;
}

function initSlider(slider) {
  for (const el of images) {
    const sliderItem = cloneEl(el);
    slider.append(sliderItem);
  }
  images = images.reverse();
}

function addItemPrependSlider(slider) {
  for (const el of images) {
    const sliderItem = cloneEl(el);
    slider.prepend(sliderItem);
  }
  images = images.reverse();
}

function initalsPrepend() {
  position = -(itemWidth + 30) * images.length;
  for (const track of sliders) {
    addItemPrependSlider(track);
    setWidth();
    track.style.transition = "0s";
    track.style.transform = `translateX(${position}px)`;
    setTimeout(() => (track.style.transition = "2s"), 50);
  }
  scrollingEltoLeft += images.length;
}

function initals() {
  for (const slider of sliders) {
    initSlider(slider);
  }
}
initals();

window.addEventListener("resize", () => {
  if (container.clientWidth < 800) showElements = 2;
  if (container.clientWidth > 800) showElements = 3;
  itemWidth = setWidth();
  position =
    container.clientWidth <= 560 ? 0 : -(itemWidth + 30) * showElements;
  scrollingEltoLeft = showElements;
  tracks.forEach((track) => {
    track.style.transform = `translateX(${position}px)`;
  });
  cardWidth = container.clientWidth;

  scrolElements = showElements;
});

window.addEventListener("scroll", function () {
  let dist = 0;
  dist += this.window.scrollY;
  if (window.screen.width <= 970 && dist > 0) {
    header.classList.add("header_fix");
    main.style.marginTop = `${header.clientHeight}px`;
  }
  if (window.screen.width > 970 || dist == 0) {
    header.classList.remove("header_fix");
    main.style.marginTop = 0;
  }
});

function deleteItemsToLeft() {
  position = -(itemWidth + 30) * showElements + 1;
  tracks.forEach((track) => {
    const items = track.querySelectorAll(".slider__item");
    const size = scrollingEltoLeft - showElements;
    for (let i = 0; i < size; i++) {
      items[i].remove();
    }
    track.style.transition = "0s";
    track.style.transform = `translateX(${position}px)`;
    setTimeout(() => (track.style.transition = "2s"), 50);
  });
  scrollingEltoLeft = showElements;
}

function deleteItemsToRight() {
  tracks.forEach((track) => {
    const items = track.querySelectorAll(".slider__item");
    const size = images.length + 2 * showElements;
    for (let i = items.length - 1; i > size; i--) {
      items[i].remove();
    }
  });
}
if (position >= 0 && container.clientWidth > 560) {
  initalsPrepend();
}

function right() {
  btnNext.onclick = null;
  btnPrev.onclick = null;
  const items = slider.querySelectorAll(".slider__item");
  const itemWidth =
    (container.clientWidth - 30 * (showElements - 1)) / showElements;

  const movePosition = scrolElements * itemWidth + 30 * scrolElements;

  const itemsLeft = Math.ceil(
    items.length / 2 -
      (Math.abs(position) + showElements * itemWidth) / itemWidth
  );
  position -= movePosition;
  scrollingEltoLeft += showElements;
  tracks.forEach((track) => {
    track.style.transform = `translateX(${position}px)`;
  });
  if (itemsLeft <= scrolElements) {
    initals();
    setWidth();
    setTimeout(deleteItemsToLeft, 2000);
  }
  setTimeout(() => {
    btnNext.onclick = right;
    btnPrev.onclick = left;
  }, 2300);
}

btnNext.onclick = right;

function left() {
  btnPrev.onclick = null;
  btnNext.onclick = null;
  const itemWidth =
    (container.clientWidth - 30 * (showElements - 1)) / showElements;
  const movePosition = scrolElements * itemWidth + 30 * scrolElements;
  position += movePosition;
  scrollingEltoLeft -= showElements;
  tracks.forEach((track) => {
    track.style.transform = `translateX(${position}px)`;
  });
  if (position >= 0) {
    deleteItemsToRight();
    setTimeout(initalsPrepend, 2000);
    setWidth();
  }
  setTimeout(() => {
    btnPrev.onclick = left;
    btnNext.onclick = right;
  }, 2300);
}

btnPrev.onclick = left;

setWidth();

function setWidth() {
  const items = slider.querySelectorAll(".slider__item");
  let itemWidth =
    (container.clientWidth - 30 * (showElements - 1)) / showElements;
  if (container.clientWidth < 483) itemWidth = 285;
  items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
    const image = item.querySelector(".slider__item-image");
    image.style.maxWidth = `${itemWidth - 2}px`;
    image.style.maxHeight = `${itemWidth}px`;
  });
  return itemWidth;
}
