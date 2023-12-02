const holderName = document.querySelector(".holder-name");
const showDate = document.querySelector(".date");
const showYear = document.querySelector(".year");
const inputName = document.getElementById("name");
const expDate = document.getElementById("date");
const expYear = document.getElementById("year");

const cardNumber = document.getElementById("card-number");
const holderNumber = document.querySelector(".holder-card-number");

const cvcNumber = document.getElementById("cvc");
const cardCvc = document.querySelector(".cvc-number");

const submit = document.getElementById("submit");
const expDate_Container = document.querySelector(".exp-date");

const form_Container = document.querySelector(".form-container");
const confirmation = document.querySelector(".confirmation");

const continueBtn = document.getElementById("continue");

inputName.addEventListener("input", () => {
    holderName.innerText = inputName.value;
})

expDate.addEventListener("input", () => {
    let date = expDate.value;
    var length = date.split('').length;
    if (expDate.value <= 12 && expDate.value >= 0)
        if (length <= 2)
            showDate.innerText = expDate.value || "00";
})

expYear.addEventListener("input", () => {
    let date = expYear.value;
    var length = date.split('').length;
    if (length <= 2)
        showYear.innerText = expYear.value || "00";
})

cardNumber.addEventListener("input", () => {
    let cardNumberArray = cardNumber.value.split('');
    let num = giveSpace(cardNumberArray, cardNumberArray.length);

    holderNumber.innerText = num;

    if (cardNumber.value === '')
        holderNumber.innerText = "0000 0000 0000 0000";
})

cvcNumber.addEventListener("input", () => {
    cardCvc.innerText = cvcNumber.value;
    if (cvcNumber.value === '')
        cardCvc.innerText = '000';
})

submit.addEventListener("click", (e) => {
    e.preventDefault();
    let inputNameParent = inputName.parentNode;
    let inputNumberParent = cardNumber.parentNode;
    let inputExpDate = expDate_Container;
    let inputCVC = cvcNumber.parentNode;

    showBlankError(inputNameParent, inputName);
    showBlankError(inputNumberParent, cardNumber);
    lengthError(inputNumberParent, cardNumber);
    showBlankError(inputExpDate, expDate);
    showBlankError(inputExpDate, expYear);
    dateError(inputExpDate, expDate, expYear);
    showBlankError(inputCVC, cvcNumber);
    lengthError(inputCVC, cvcNumber);

    let isError = {
        name: inputNameParent.classList.contains("error"),
        number: inputNumberParent.classList.contains("error"),
        expDate: inputExpDate.classList.contains("error"),
        cvc: inputCVC.classList.contains("error"),
    }

    if (isError.name === false && isError.number === false && isError.expDate === false && isError.cvc === false) {
        form_Container.classList.add("hide");
        confirmation.classList.remove("hide");
    }

})

continueBtn.addEventListener("click", () => {
    form_Container.classList.remove("hide");
    confirmation.classList.add("hide");
    inputName.value = '';
    cardNumber.value = '';
    expDate.value = '';
    expYear.value = '';
    cvcNumber.value = '';
    cardCvc.innerText = '000';
    holderName.innerText = 'JANE APPLESEED';
    showDate.innerText = '00';
    showYear.innerText = '00';
    holderNumber.innerText = '0000 0000 0000 0000';
})

function showBlankError(parent, inputEl) {
    let p = document.createElement("p");
    if (inputEl.value == '') {
        parent.classList.add("error");
    }
    if (parent.lastChild.nodeName != "P") {
        p.classList.add("error");
        p.innerText = "Can't be blank";
        parent.append(p);
    }

    if (inputEl.value != '') {
        parent.removeChild(parent.lastChild);
        parent.classList.remove("error");
    }
}

function lengthError(parent, inputEl) {
    let length = inputEl.getAttribute("minLength");
    let p = document.createElement("p");

    parent.classList.add("error");
    if (parent.lastChild.nodeName != "P") {
        p.classList.add("error");
        p.innerText = "Wrong Format, numbers only";
        parent.append(p);
    }
    if (inputEl.value.length >= length && isNaN(inputEl.value) === false) {
        parent.removeChild(parent.lastChild);
        parent.classList.remove("error");
    }
}

function dateError(parent, inputEl, inputYear) {
    if (inputEl.value && inputYear.value) {
        let p = document.createElement("p");
        if (inputEl.value > 12 || inputEl.value < 1) {
            parent.classList.add("error");
        }
        if (parent.lastChild.nodeName != "P") {
            p.classList.add("error");
            p.innerText = "Wrong input";
            parent.append(p);
        }

        if (inputEl.value <= 12 && inputEl.value >= 1) {
            parent.removeChild(parent.lastChild);
            parent.classList.remove("error");
        }
    }
}


function giveSpace(number, length) {
    let i, j;
    for (i = 0; i < length; i++) {
        if (i == 4 || i == 8 + 1 || i == 12 + 2) {
            for (j = length; j > i; j--) {
                number[j] = number[j - 1];
            }
            number[i] = " ";
            length++;
        }
    }
    return number.join("");
}
