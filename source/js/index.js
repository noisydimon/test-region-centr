const statusChangeBtn = document.querySelector(".main-header__button_js");
const popupWindow = document.querySelector(".popup-status_js");
const statusCloud = document.querySelector(".main-header__status");
const changeForm = document.forms.changeForm;
const changeDate = document.querySelector(".change-form__submit-date_js");
const changeFormInputs = [...changeForm.getElementsByTagName("input")];
(function () {
  statusCloud.textContent = localStorage.getItem("userText");
  changeDate.textContent = localStorage.getItem("changeDateText");
})();
//////////////////Открытие Popup//////////////////////////////////
(function () {
  if (!statusChangeBtn) return;
  statusChangeBtn.addEventListener("click", () => {
    popupWindow.classList.remove("hidden-item");

    ////////текст в инпуте///////////
    let statusText = statusCloud.textContent;
    statusInput.value = statusText;
    statusInput.focus();
  });
})();

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////Валидация полей//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
(function () {
  const status = statusCloud;
  const city = changeForm.elements.city;
  const password = changeForm.elements.password;
  const passwordRepeat = changeForm.elements.passwordRepeat;
  const email = changeForm.elements.email;
  //объект ошибок
  let errors = {};

  changeForm.addEventListener("submit", (e) => {
    //обнуляем объект ошибок
    errors = {};
    e.preventDefault();
    //очищаем код от ошибки после первого нажатия на submit
    clearErrors(changeForm);

    //////проверяем на наличие required////
    changeFormInputs.forEach((input) => {
      if (input.hasAttribute("required")) {
        if (input === email) {
          if (!email.value) {
            errors.email = "Укажите E-mail";
            addInvalidColor(email);
          } else if (!isEmailValid(email.value)) {
            errors.email = "Неверный E-mail";
            addInvalidColor(email);
          } else {
            addValidColor(email);
          }
        } else if (input === city) {
          if (!city.value) {
            errors.city = "Выберите город";
            addInvalidColor(city);
          }
        } else if (input === password) {
          if (!password.value) {
            errors.password = "Укажите пароль";
            addInvalidColor(password);
          } else if (!isPasswordValid(password.value)) {
            errors.password = "Используйте не менее 5 символов";
            addInvalidColor(password);
          } else {
            addValidColor(password);
          }
        } else if (input === passwordRepeat) {
          if (!passwordRepeat.value) {
            errors.passwordRepeat = "Укажите пароль";
            addInvalidColor(passwordRepeat);
          } else if (
            !isPasswordRepeatValid(password.value, passwordRepeat.value)
          ) {
            errors.passwordRepeat = "Пароли не совпадают";
            addInvalidColor(passwordRepeat);
          } else {
            addValidColor(passwordRepeat);
          }
        }
      } else {
        return;
      }
    });
    errorFormHandler(errors, changeForm);

    if (Object.keys(errors).length) {
      return;
    } else {
      ///////////////////Формируем объект для отправки на сервер/////////////////////
      const data = {
        email: email.value,
        password: password.value,
        passwordRepeat: passwordRepeat.value,
        city: city.value,
        status: status.textContent,
      };
      let json = JSON.stringify(data);
      console.log(json);

      changeDate.textContent = getChangeDate();
      localStorage.setItem("changeDateText", getChangeDate());
    }
  });
})();
///////////////////////////////////////////////////////////////
///////////////////////Выборка городов/////////////////////////
// let cityArray = [
//   {
//     city: "Артёмовск",
//     population: "1688",
//   },
//   {
//     city: "Ачинск",
//     population: "105259",
//   },
//   {
//     city: "Боготол",
//     population: "19819",
//   },
//   {
//     city: "Бородино",
//     population: "16061",
//   },
//   {
//     city: "Дивногорск",
//     population: "29195",
//   },
//   {
//     city: "Дудинка",
//     population: "21015",
//   },
//   {
//     city: "Енисейск",
//     population: "17805",
//   },
//   {
//     city: "Железногорск",
//     population: "83857",
//   },
//   {
//     city: "Заозёрный",
//     population: "10286",
//   },
//   {
//     city: "Зеленогорск",
//     population: "61915",
//   },
//   {
//     city: "Игарка",
//     population: "4417",
//   },
//   {
//     city: "Иланский",
//     population: "14967",
//   },
//   {
//     city: "Канск",
//     population: "89111",
//   },
//   {
//     city: "Кодинск",
//     population: "15911",
//   },
//   {
//     city: "Красноярск",
//     population: "1095286",
//   },
//   {
//     city: "Лесосибирск",
//     population: "59525",
//   },
//   {
//     city: "Минусинск",
//     population: "68007",
//   },
//   {
//     city: "Назарово",
//     population: "49825",
//   },
//   {
//     city: "Норильск",
//     population: "179554",
//   },
//   {
//     city: "Сосновоборск",
//     population: "40614",
//   },
//   {
//     city: "Ужур",
//     population: "15563",
//   },
//   {
//     city: "Уяр",
//     population: "11981",
//   },
//   {
//     city: "Шарыпово",
//     population: "37136",
//   },
// ];

function getOptions(cityArray) {
  let bigCityArray = [];
  let sortedArray = [];
  let finalArray = [];

  ////////////////фильтруем по численности////////////
  cityArray.forEach(function (item) {
    if (item.population > 50000) {
      bigCityArray.push(item);
    }
  });

  ////////////////ищем самый большой город////////////
  let biggestCityIndex = bigCityArray.reduce((prev, curr, i) =>
    Number(prev.population) > Number(curr.population) ? prev : i
  );
  finalArray.push(bigCityArray[biggestCityIndex].city);
  bigCityArray.splice(biggestCityIndex, 1);

  // ////////////////добавляем остальные по алфавиту////////////
  bigCityArray.forEach((item) => {
    sortedArray.push(item.city);
  });
  sortedArray.sort().forEach((item) => {
    finalArray.push(item);
  });

  // ////////////////Наполняем тег select////////////
  finalArray.forEach((item) => {
    let option = document.createElement("option");
    option.textContent = item;
    changeForm.elements.city.insertAdjacentElement("beforeEnd", option);
  });
}
////////////////////////Функции////////////////////////////////
///////////////////////Очистка ошибок//////////////////////////
function clearErrors(element) {
  const messages = element.querySelectorAll(".invalid-feedback");
  const invalids = element.querySelectorAll(".is-invalid");
  messages.forEach((message) => message.remove());
  invalids.forEach((invalid) => invalid.classList.remove(".is-invalid"));
}

/////////////////////валидация почты ////////////////////
function isEmailValid(email) {
  if (!email) {
    return false;
  } else {
    return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
  }
}
////////////////////валидация пароля //////////////////////
function isPasswordValid(password) {
  if (password.length >= 6) {
    return true;
  }
}
////////////////////валидация повтора пароля ////////////////
function isPasswordRepeatValid(password, passwordRepeat) {
  if (password === passwordRepeat) {
    return true;
  }
}
///////////////// добавить красный цвет бордеру/////////////
function addInvalidColor(field) {
  field.classList.remove("is-valid-field");
  field.classList.add("is-invalid-field");
}
//////////////////добавить зеленый цвет бордеру///////////////
function addValidColor(field) {
  field.classList.remove("is-invalid-field");
  field.classList.add("is-valid-field");
}

//////////////////////Добавление ошибки инпуту///////////////
function setErrorText(input, errorMessage) {
  const error = errorCreator(errorMessage);
  input.classList.add("is-invalid"); //bootstrap
  input.insertAdjacentElement("afterend", error);
  input.addEventListener(
    "input",
    function () {
      error.remove();
      input.classList.remove("is-invalid"); //bootstrap
      //Удалить красный цвет поля при вводе в инпут
      input.classList.remove("is-invalid-field");
    },
    { once: true }
  );
}
///////////////////Cоздание кода с ошибкой////////////////
function errorCreator(message) {
  let messageError = document.createElement("div");
  messageError.classList.add("invalid-feedback"); //bootstrap
  messageError.innerText = message;
  return messageError;
}

/////////////////Cообщение об ошибке//////////////////////
function errorFormHandler(errors, form) {
  if (Object.keys(errors).length) {
    //перебираем массив с ошибками
    Object.keys(errors).forEach((key) => {
      const messageError = errors[key];
      const input = form.elements[key];
      setErrorText(input, messageError);
      addInvalidColor(input);
    });
    return;
  }
}

//////////////////////////////////////////Дата///////////////////////////////////
function getChangeDate() {
  let dateNow = new Date();
  let nowDay = dateNow.toLocaleString("ru", {
    day: "numeric",
    month: "long",
  });
  let nowYear = dateNow.getFullYear();
  let nowTime = dateNow.toLocaleString("ru", {
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  let result = `последние изменения ${nowDay} ${nowYear} в ${nowTime}`;
  return result;
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////Работа с объектом json//////////////////////////////
fetch("js/cities.json")
  .then((response) => response.json())
  .then((cities) => getOptions(cities));
