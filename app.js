// ---
const form = $("#addForm");
const item = $(".item");
const itemList = $("#items");
const lis = $(".list-group-item");

//  ---
const sampleWithXitcs =
  "abcdefghjk!$%&+?mnpqrstuvwxyz23456789!$%&+?ABCDEFGHJKMNPQRSTUVWXYZ!$%&+?";

const sampleWithoutXitcs =
  "abcdefghjkmnpqrstuvwxyz23456789ABCDEFGHJKMNPQRSTUVWXYZ";

// ---
const sampleWithXitcsList = Array.from(sampleWithXitcs);

const sampleWithoutXitcsList = Array.from(sampleWithoutXitcs);

// ---
const randomNumberGenerator = (length) => {
  return Math.floor(Math.random() * length);
};

// password generator logic---
let passwordArray = [];
const generatePassword = (sampleArrayType) => {
  const lengthOfArray = sampleArrayType.length;
  const randomNumber = randomNumberGenerator(lengthOfArray);
  const item = sampleArrayType[randomNumber];
  return passwordArray.push(item);
};

// generate template ---
const generateTemplate = (password) => {
  const html = `<li class="list-group-item">

  <span class="textToCopy">${password}</span
  >

  <span
    class="tt float-end"
    data-bs-placement="left"
    title="Copy"
  >
    <span class="copy"
      ><i class="fas fa-clipboard fa-1x"></i
    ></span>
  </span>
</li>`;

  return itemList.prepend(html);
};

// ---
const generatedPassword = (pathChecked, passwordLength, typeOfSample) => {
  try {
    if (pathChecked && passwordLength > 0) {
      for (let i = 0; i < `${passwordLength}`; i++) {
        generatePassword(typeOfSample);
      }
    } else {
      passwordMsg = "Make a request by passing the right password length";
      passwordArray = Array.from(passwordMsg);
      return passwordArray;
    }
  } catch (err) {
    console.log(err);
    passwordMsg = "Make a request by passing the right password length";
    passwordArray = Array.from(passwordMsg);
    return passwordArray;
  }
};

// ---
form.on("submit", function (e) {
  e.preventDefault();

  // https://stackoverflow.com/a/24655395
  // enable tooltip on dynamic html elements
  $("body").tooltip({
    selector: ".tt",
  });

  let passwordLength = item.val();
  passwordLength = passwordLength ? passwordLength : 10;

  const pathChecked = $('input[name="inlineRadioOptions"]:checked').val();

  if (pathChecked === "special-characters") {
    typeOfSample = sampleWithXitcsList;
  } else if (pathChecked === "no-special-characters") {
    typeOfSample = sampleWithoutXitcsList;
  }

  // ---
  generatedPassword(pathChecked, passwordLength, typeOfSample);
  const passwordString = passwordArray.join("");
  generateTemplate(passwordString);
  passwordArray = [];

  // ---
  localStorage.setItem("passwordLength", passwordLength);
  localStorage.setItem("pathChecked", pathChecked);
  localStorage.setItem("typeOfSample", JSON.stringify(typeOfSample));
});

// local storage ----
let passwordLength = localStorage.getItem("passwordLength");
let pathChecked = localStorage.getItem("pathChecked");
let typeOfSample = localStorage.getItem("typeOfSample");
typeOfSample = JSON.parse(typeOfSample);
if (passwordLength) {
  generatedPassword(pathChecked, passwordLength, typeOfSample);
  const passwordString = passwordArray.join("");
  generateTemplate(passwordString);
  passwordArray = [];
}

//  ---
$("#filter").on("keyup", function (e) {
  const value = $(this).val().toLowerCase();
  $("#items li").filter(function (item) {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

// ---
const tooltips = document.querySelectorAll(".tt");
tooltips.forEach((t) => {
  new bootstrap.Tooltip(t);
});

// ---
$("#items").on("click", ".tt", function () {
  // https://stackoverflow.com/a/50150393/15235273
  // this helped with changing tooltip text to copied
  $(this)
    .attr("title", "Copied!")
    .tooltip("_fixTitle")
    .tooltip("show")
    .attr("title", "Copy")
    .tooltip("_fixTitle");
});

// ---
const itemListSelectWithJS = document.querySelector("#items");
itemListSelectWithJS.addEventListener("click", copyToClipboard);

function copyToClipboard(e) {
  if (e.target.classList.contains("fas")) {
    const textToCopy =
      e.target.parentElement.parentElement.parentElement.firstElementChild
        .innerText;
    const myTemporaryInputElement = document.createElement("input");
    myTemporaryInputElement.type = "text";
    myTemporaryInputElement.value = textToCopy;
    document.body.appendChild(myTemporaryInputElement);
    myTemporaryInputElement.select();
    document.execCommand("Copy");
    document.body.removeChild(myTemporaryInputElement);
  }
}

// ---
$(".btn").on("click", function () {
  setTimeout(function () {
    $(".btn").addClass("shadow-none");
  }, 150);
  $(this).removeClass("shadow-none");
});
