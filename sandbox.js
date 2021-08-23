var form = $("#addForm");
var item = $(".item");
var itemList = $("#items");
var lis = $(".list-group-item");

// logic------------------------------------------------

// strings from which password will be generated
const sampleWithXitcs =
  "abcdefghjk!$%&+?mnpqrstuvwxyz23456789!$%&+?ABCDEFGHJKMNPQRSTUVWXYZ!$%&+?";

const sampleWithoutXitcs =
  "abcdefghjkmnpqrstuvwxyz23456789ABCDEFGHJKMNPQRSTUVWXYZ";

// converst strings to array
const sampleWithXitcsList = Array.from(sampleWithXitcs);

const sampleWithoutXitcsList = Array.from(sampleWithoutXitcs);

// random number generator----
const randomNumberGenerator = (length) => {
  return Math.floor(Math.random() * length);
};

// password generator logic-----
let passwordArray = [];
let passwordString = "";
const generatePassword = (sampleArrayType) => {
  let lengthOfArray = sampleArrayType.length;
  let randomNumber = randomNumberGenerator(lengthOfArray);
  let item = sampleArrayType[randomNumber];
  return passwordArray.push(item);
};

form.on("submit", function (e) {
  e.preventDefault();

  // browser handles scroll top----
  scrollTo(0, 0);

  //   https://stackoverflow.com/a/23053203
  // how to grab the value of a checked radio button
  // console.log($('input[name="inlineRadioOptions"]:checked').val());

  pathChecked = $('input[name="inlineRadioOptions"]:checked').val();
  passwordLength = item.val();

  try {
    if (pathChecked == "special-characters" && passwordLength.length !== 0) {
      for (let i = 0; i < passwordLength; i++) {
        generatePassword(sampleWithXitcsList);
      }
    } else if (
      pathChecked == "no-special-characters" &&
      passwordLength.length !== 0
    ) {
      for (let i = 0; i < passwordLength; i++) {
        generatePassword(sampleWithoutXitcsList);
      }
    } else {
      passwordMsg = "Make a request by passing a password length";
      passwordArray = Array.from(passwordMsg);
    }
  } catch {
    passwordMsg = "Make a request by passing a password length";
    passwordArray = Array.from(passwordMsg);
  }
  passwordString = passwordArray.join("");
  console.log(passwordString);
  // --------------------------------
  //   create new li element
  var li = $("<li></li>");

  // create new span element
  var spanOne = $("<span></span>");
  spanOne.addClass("textToCopy");

  //   add password to span
  spanOne.text(passwordString);

  // password set to empty------------------------------------
  // not to append previous ones to it----------------------
  passwordArray = [];

  //   append span to li
  li.append(spanOne);

  //   create li tag to hold font awesome
  var iTag = $("<i></i>");
  iTag.addClass("fas fa-clipboard fa-1x");

  //   span three for font awesome span
  var spanThree = $("<span></span>");
  spanThree.addClass("copy");
  spanThree.append(iTag);

  // https://stackoverflow.com/a/24655395
  // enable tooltip on dynamic html elements (dynamic html elements)----
  $("body").tooltip({
    selector: ".tt",
  });

  //    span two for tool tool tip
  var spanTwo = $(
    "<span class='tt float-end' data-bs-placement = 'left' title ='Copy'></span>"
  );
  spanTwo.append(spanThree);

  //   append tool tip and font awesome to li
  li.append(spanTwo);

  //   add class
  li.addClass("list-group-item float-end");

  itemList.prepend(li);
});

// flter passwords ----------------------------------------
$("#filter").on("keyup", function (e) {
  var value = $(this).val().toLowerCase();
  $("#items li").filter(function (e) {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

// copy functionality
// enable tool tip
// tooltip for normal html (static html)----------------------
const tooltips = document.querySelectorAll(".tt");
tooltips.forEach((t) => {
  new bootstrap.Tooltip(t);
});

// disable and enable  tool tip
// applied jquery event delegation
// that helped alot
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

// copy to clipboard------------------------------------------------

// https://codepen.io/bharatramnani94/post/copy-text-to-clipboard-using-vanilla-javascript
// helped with clipboard script

// applied javascript event delegation-------------------------------------
// that helped alot

// event listener
document.querySelector("#items").addEventListener("click", copyToClipboard);

//  call back function -----------
function copyToClipboard(e) {
  if (e.target.classList.contains("fas")) {
    // var textToCopy = this.firstElementChild.innerText;

    var textToCopy =
      e.target.parentElement.parentElement.parentElement.firstElementChild
        .innerText;
    console.log(textToCopy);
    console.log(e.target);

    var myTemporaryInputElement = document.createElement("input");
    myTemporaryInputElement.type = "text";
    myTemporaryInputElement.value = textToCopy;
    document.body.appendChild(myTemporaryInputElement);
    myTemporaryInputElement.select();
    document.execCommand("Copy");
    document.body.removeChild(myTemporaryInputElement);
  }
}

// passord generator button animation------------
// https://stackoverflow.com/a/51810568
$(".btn").on("click", function () {
  setTimeout(function () {
    $(".btn").addClass("shadow-none");
  }, 150);
  $(this).removeClass("shadow-none");
});
