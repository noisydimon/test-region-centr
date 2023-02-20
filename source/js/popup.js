const popupClose = document.querySelector(".close-button-login_js");
const popupSaveBtn = document.querySelector(".popup-status__button_js");
const popupBackgrond = document.querySelector(".popup-status__bg_js");
const statusInput = document.querySelector(".popup-status__field_js");
///////////////////////Закрыть Popup крестиком/////////////////////////////////////
(function () {
  if (!popupClose) return;
  popupClose.addEventListener("click", () => {
    popupWindow.classList.add("hidden-item");
  });
})();
///////////////////////Закрыть Popup щелчком/////////////////////////////////////
(function () {
  popupBackgrond.addEventListener("click", () => {
    popupWindow.classList.add("hidden-item");
  });
})();
///////////////////////Закрыть Popup Esc/////////////////////////////////////
(function () {
  if (!popupWindow) return;
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      popupWindow.classList.add("hidden-item");
    }
  });
})();
///////////////////////Сохранить статус//////////////////////////////////
(function () {
  if (!popupSaveBtn) return;
  popupSaveBtn.addEventListener("click", () => {
    let statusText = statusInput.value;
    statusCloud.textContent = statusText;
    popupWindow.classList.add("hidden-item");
    localStorage.setItem("userText", statusText);
  });
})();
