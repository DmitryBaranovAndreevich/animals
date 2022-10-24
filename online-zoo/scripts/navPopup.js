const popups = document.querySelectorAll('.popup');
const navPopup = document.querySelector(".popup__nav");
const headerButton = document.querySelector(".header__button");

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('popup')) {
    for(const popup of popups) {
      if(popup.classList.contains('popup_active')) popup.classList.remove('popup_active')
    }
  }
})
function openPopup(popup) {
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
}

for(const popup of popups) {
  const closeButton = popup.querySelector('.popup__button');
  closeButton.addEventListener('click', () => closePopup(popup))
}

headerButton.addEventListener('click',() => openPopup(navPopup))