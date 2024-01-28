////////////////////////////////////////////////////////////////////
////////// THE DOINGS WHEN THE PAGE IS LOADED //////////////////////
////////////////////////////////////////////////////////////////////
switch (true) {
  case window.location.hash === "":
    window.location.hash = "blender";
}/*
window.onload = function () {
  
};*/

let cartList, mcardOverlay, form, proPrice_TC, formProName_TC;
cartList = [];
let hashLocation = window.location.hash.replace("#", "");
import { productList } from "./module.js";

function doc(param) {
  return document.querySelector(param);
}
function docs(param) {
  return document.querySelectorAll(param);
}

///////////////////////////////////////////////////////////////
/////////// Carousel Manupulations ////////////////////////////
mcardOverlay = docs(".mcard-images-overlay > *:not(dl)");
let mcardImagesList = doc(".mcard-images-overlay dl");

let j = 0;


let proImgs = productList.products[hashLocation].images;
function carouselplace(prev_next) {
  let popedImg = prev_next === "next" ? proImgs.shift() : proImgs.pop();
  prev_next === "next" ? proImgs.push(popedImg) : proImgs.unshift(popedImg);

  let slicedImgs = proImgs.slice(0, 3);
  for (let i = 0; i < 3; i++) {
    mcardOverlay[i].innerHTML = `<img src="images/products/${slicedImgs[i]}">`;
    mcardOverlay[i].firstElementChild.classList.toggle("js");
  }
  docs(".mcard-images-overlay dl > *")[j].classList.remove("active");
  if (j == 0 && prev_next === "prev") {
    j = proImgs.length;
  }
  j =
    (prev_next === "prev" ? j - 1 : j + 1) %
    (prev_next === "prev" ? -proImgs.length : proImgs.length);
  docs(".mcard-images-overlay dl > *")[j].classList.add("active");
}
for (let k = 0; k < proImgs.length; k++) {
  let li = document.createElement("li");
  li.className = k;
  mcardImagesList.insertAdjacentElement("afterbegin", li);
}
docs(".mcard-images-overlay dl > *")[j].classList.add("active");

carouselplace("prev");
/*        End or Carousel                                  */

//////////////////////////////////////////////////////////////////
// navigation bottom animations //////////////////////////////////
//////////////////////////////////////////////////////////////////
function changePage() {
  let naviNav1Content = doc(".navi-nav1").textContent;
  let naviNav1Span = doc(".navi-nav1 span");
  naviNav1Span.textContent =
    naviNav1Content === "learn more" ? "back" : "learn more";
  doc(".navigator").classList.toggle("js");

  doc(".article-card").classList.toggle("article-come-js");
  doc(".main-card").classList.toggle("main-go-js");
  console.log(naviNav1Content);
}

///////////////////////////////////////////////////////////////////
// Form manupulations//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

form = doc(".form-card");
let divInp = docs("div input");
divInp = [...divInp];
divInp.shift();

function formOpener() {
  form.classList.add("js");
  document.body.classList.add("js");
  if (cartList.length < 1) cartManupulation();
  // console.log(cartList.indexOf(window.location.hash.replace('#', '')))
}

function formCloser() {
  if (doc(".pro-from-none")) {
    cartList.shift();
    doc(".pro-from-none").remove();
  }
  form.classList.remove("js");
  // console.log(cartList);
}

let dateInput = doc(".form-date input");
let dateBtn = doc("a.fd");
function dateFunction() {
  let todayDate = Date();
  let slicedDate = todayDate.slice(0, 11);
  if (dateBtn.textContent === "today") {
    dateInput.toggleAttribute("type");
    dateInput.setAttribute("placeholder", slicedDate);
    dateBtn.textContent = "select date";
    dateInput.setAttribute("disabled", "true");
  } else if (dateBtn.textContent === "select date") {
    dateInput.toggleAttribute("placeholder");
    dateBtn.textContent = "today";
    dateInput.setAttribute("type", "date");
    dateInput.removeAttribute("disabled");
  }
}

let requiredField = docs("input[required]");
requiredField.forEach((each) => {
  let span = document.createElement("span");
  span.className = "required-field";
  each.parentElement.insertAdjacentElement("beforeend", span);
  span.textContent = "required";
});

//////////////////////////////////////////////////////////////
///////// header expansion function /////////////////////////
//////////////////////////////////////////////////////////////

function headExpandFoo() {
  console.log('was runned')
  doc("header").classList.toggle('js');
  doc(".navi-nav1").parentElement.classList.toggle("remove");
}

/////////////////////////////////////////////////////////////////
/////// ADDING FORM BRIEF TO FORM ///////////////////////////////
/////////////////////////////////////////////////////////////////
function formBriefCreation(d) {
  proPrice_TC = [...doc(".mcard-price strong").textContent];
  proPrice_TC = proPrice_TC.splice(2, Infinity).join("");

  let createDivBrief = document.createElement("div");
  createDivBrief.setAttribute("id", `${d?.id ?? hashLocation}`);
  createDivBrief.classList.add("form-brief-content");
  createDivBrief.innerHTML = `<div class="brief-brief"> ${
    d?.closest(".product").querySelector(".pro-img img").outerHTML ||
    doc(".mcard-images-overlay div").innerHTML
  } <div class="brief-side"><h3>${
    d?.closest(".product").querySelector(".pro-name h2").textContent ||
    doc(".article-content .art-head h1").textContent
  }</h3><div><span class="digit">${
    d?.closest(".product").querySelector(".pro-price strong").textContent ||
    proPrice_TC
  }</span></div><div class="price-maths"><button class='minus'>remove</button><div>1</div><button class="plus">+</button></div></div></div><div class="brief-total"> <b>Total = &nbsp;Gh&#8373; </b><strong> ${
    d
      ?.closest(".product")
      .querySelector(".pro-price strong")
      .textContent.replace(/\D/g, "") || proPrice_TC.replace(/\D/g, "")
  } </strong></div>`;

  doc(".form-brief").insertAdjacentElement("afterbegin", createDivBrief);
  if (d?.id) doc(".form-brief-content").classList.add("pro-from-none");
}

let naviNav2 = doc(".navi-nav2");

/////////////////////////////////////////////////////////////
/////////// PLUS AND MINUS OPERATIONS ///////////////////////
/////////////////////////////////////////////////////////////
function plus_minus(d, param) {
  let proFromNone = doc(".pro-from-none");
  let bulkErrMsg = document.querySelector(".bulk-err-msg");
  let index = cartList.indexOf(d?.closest(".form-brief-content")?.id);
  let cost =
    d?.closest(".form-brief-content")?.querySelector(".brief-side .digit") ||
    document.querySelector(`.form-brief #${d?.id} .digit`);

  let unit =
    d
      ?.closest(".form-brief-content")
      ?.querySelector(".brief-side .price-maths div") ||
    document.querySelector(
      `.form-brief #${d?.id} .brief-side .price-maths div`
    );

  let total =
    d?.closest(".form-brief-content")?.querySelector(".brief-total strong") ||
    document.querySelector(`.form-brief #${d?.id} .brief-total strong`);

  if (param === "plus" && unit.textContent < 4) {
    cartList.push(d?.closest(".form-brief-content")?.id || d?.id);
    unit.textContent = Number(unit.textContent) + 1;
    total.textContent =
      Number(cost.textContent.replace(/\D/g, "")) * Number(unit.textContent);

    unit.previousElementSibling.textContent = "-";
    unit.previousElementSibling.style.cssText =
      "font-size: 1.5rem; padding: 0 6px; color: #111";
    if (unit.textContent > 3) {
      unit.nextElementSibling.style.color = "#aaa";
      bulkErrMsg.classList.add("js");
      setTimeout(function () {
        bulkErrMsg.classList.remove("js");
      }, 9000);
    }
    if (proFromNone) {
      proFromNone.classList.remove("pro-from-none");
    }
  } else if (param === "minus") {
    cartList.splice(index, 1);
    if (unit.textContent > 1) {
      unit.textContent = Number(unit.textContent) - 1;
      total.textContent =
        Number(cost.textContent.replace(/\D/g, "")) * Number(unit.textContent);
      unit.nextElementSibling.style.color = "#111";
      if (unit.textContent < 2) {
        unit.previousElementSibling.style.cssText = "#f44";
        unit.previousElementSibling.textContent = "remove";
      }
    } else if (unit.textContent <= 1) {
      d.closest(".form-brief-content").remove();
      if (cartList.length < 1) {
        form.classList.remove("js");
      }
    }
  }
  naviNav2.classList.add("cart");
  naviNav2.lastElementChild.textContent = cartList.length;
  let overallAmount = 0;
  docs(".brief-total strong").forEach((each) => {
    overallAmount += Number(each.textContent.replace(/[^\d.]/gi, ""));
  });
  doc(".done-js .overall").textContent = overallAmount;
}

let headerOverlay = doc('.header-overlay');
let notifications = document.createElement('div');
notifications.classList.add('notifications');

function cartManupulation(d, plus_minus_Param) {
  d = d?.closest(".product")?.id;
  d = document.querySelector(`#${d}`);

  switch (true) {
    case !cartList.includes(d?.id):
      formBriefCreation(d);
      cartList.push(d?.id || hashLocation);
      break;

    case cartList.includes(d?.id):
      console.log("greater thing is about to happen");
      plus_minus(d, "plus");
      break;

    default:
      break;
  }

  naviNav2.classList.add("cart");
  naviNav2.lastElementChild.textContent = cartList.length;
  let overallAmount = 0;
  docs(".brief-total strong").forEach((each) => {
    overallAmount += Number(each.textContent.replace(/[^\d.]/gi, ""));
  });
  doc(".done-js .overall").textContent = overallAmount;

  ////// Added to cart notifications
  notifications.innerHTML = `<span> ${(Object.values(productList.products[d?.id || hashLocation].proName)).join('')} <span style="color: #222">was added to cart</span></span>`;
  notifications.insertAdjacentHTML('beforeend', `<a href="javascript:void(0)" class="no">x</a>`);
  headerOverlay.insertAdjacentElement('afterbegin', notifications);
  headerOverlay.classList.add("noti-added");
  setTimeout(function(){
    doc('.notifications')?.remove();
    headerOverlay.classList.remove('noti-added');
  }, 3000)
}

function copiedToCart(d) {
  cartManupulation(d, "plus");
}

/////////////////////////////////////////////////
///// Click event Listener //////////////////////
document.addEventListener("click", (e) => {
  let d = e.target;

  switch (true) {
    case d.classList.contains("m-west"):
      carouselplace("next");
      break;
    case d.classList.contains("m-east"):
      carouselplace("prev");
      break;

    case d.classList.contains("nl"):
      changePage();
      break;

    /// form Opener and Closing event
    case d.classList.contains("fo") || d.classList.contains("fo1"):
      formOpener();
      break;
    case d.classList.contains("fc"):
      formCloser();
      break;

    /// form date event
    case d.classList.contains("fd"):
      dateFunction();
      break;

    /// Plus and minus inside the brief form information
    case d.classList.contains("minus"):
      plus_minus(d, "minus");
      // cartList.splice(indexOf(d.closest('.form-brief-content')), 1)
      // console.log(cartList);
      break;
    case d.classList.contains("plus"):
      plus_minus(d, "plus");
      break;

    ///////////////////////////////////////////////
    //hahmburger move's event
    case d.classList.contains("ho"):
      headExpandFoo();
      break;
    case d.classList.contains("pc"):
      copiedToCart(d);
      break;

    case d.classList.contains("po"):
      productOpener(d);
      break;

    case d.classList.contains('no'):
      d.parentElement.remove();
      headerOverlay.classList.remove('noti-added');
      break

    default:
      break;
  }
  ///////////////////////////////////////////////
  /// input styles
  divInp.forEach((each, index) => {
    if (d.classList.contains("di")) d.parentElement.classList.add("js");
    if (each.parentElement.classList.contains("js"))
      each.parentElement.classList.remove("js");

    if (each.value.length >= 1) {
      each.parentElement.className = "done-js";
    } else if (each.value.length < 1) {
      each.parentElement.className = "";
    }
  });
});
////// CLICK EVENTS END HERE
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

////////////////////////////////////
//Scroll event Listener ////////////

window.addEventListener("scroll", (scrol) => {
  let fortyMedia = window.matchMedia("(max-height: 800px)");
  if (fortyMedia.matches && window.scrollY > 10) {
    naviNav2.parentElement.classList.add("scroll-js");
  } else if (window.scrollY < 2) {
    try {
      naviNav2.parentElement.classList.remove("scroll-js");
    } catch {}
  }
});

Object.entries(productList.products).map(([keys, element]) => {
  let div = document.createElement("div");
  div.classList.add("product", "po");
  div.setAttribute("id", keys);
  div.innerHTML = `<div class="product-back"> <div class="pro-img"> <img class="po" src="images/products/${element.images[0]}" alt="${element.proName}"></div> <div class="price-cart"><div class="pro-price"><strong>${element.proPrice}</strong></div><div class="pro-cart pc"><div class="pc">+</div></div></div><div class="pro-name"><h2>${element.proName}</h2></div</div>`;

  doc(".header-content").appendChild(div);
});

function productOpener(d) {
  let product = docs(".header-content .product");
  let clickedId = d.closest('.product').id;

  let mCardElements = [
    ...docs(
      ".art-head h1, .mcard-price strong, .mcard-description p, .article-content article p, .vit-material, .vit-brand"
    ),
  ];
  for (let i = 0; i < 6; i++) {
    mCardElements[i].innerHTML = Object.values(productList.products[clickedId])[i];
  }
  proImgs = Object.values(productList.products[clickedId].images);
  carouselplace('prev')
  window.location.hash = clickedId;

  doc(".mcard-description h1").textContent = doc(".art-head h1").textContent;

  doc('header').classList.contains('js') ? headExpandFoo() : console.log('does not');
  
  product.forEach((each) => {
    if (each.classList.contains("js")) {
      each.classList.remove("js");
    }
  });
  d.closest('.product').classList.add("js");

  artPricechange();
}

productOpener(doc(window.location.hash).querySelector("img"));
function artPricechange() {
  doc(".vit-price .ran2").textContent = doc('.mcard-price strong').textContent;

  doc(".vit-price .price-delivery").textContent = 
    Number(doc(".vit-price .ran2").textContent.replace(/\D/g, "")) + 30;
}