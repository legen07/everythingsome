/////////////////////////////////
//! THE DOINGS WHEN THE PAGE IS LOADED //
/////////////////////////////////////////
switch (true) {
  case window.location.hash === "":
    window.location.hash = "blender";
}

let proPrice_TC;

let cartList = [];
const hashLocation = window.location.hash.replace("#", "");
import { productList } from "./module.js";

//! Carousel Manipulations ///////////
const mcardOverlay = $(".mcard-images-overlay > *:not(ul)");
const mcardImagesList = $(".mcard-images-overlay ul");

let j = 0;

let currentProduct = {};
let proImgs = [...productList.products[hashLocation].images];
function carouselplace(prev_next) {
  let popedImg = prev_next === "next" ? proImgs.shift() : proImgs.pop();
  prev_next === "next" ? proImgs.push(popedImg) : proImgs.unshift(popedImg);

  let slicedImgs = proImgs.slice(0, 3);
  for (let i = 0; i < 3; i++) {
    mcardOverlay[
      i
    ].innerHTML = `<img src="images/products/${slicedImgs[i]}" alt="${productList.products[hashLocation].proName}">`;
    $(mcardOverlay[i]).first().toggleClass("js");
  }
  $($(".mcard-images-overlay ul > *")[j]).removeClass("active");
  if (j == 0 && prev_next === "prev") {
    j = proImgs.length;
  }
  j =
    (prev_next === "prev" ? j - 1 : j + 1) %
    (prev_next === "prev" ? -proImgs.length : proImgs.length);
  $($(".mcard-images-overlay ul > *")[j]).addClass("active");
}
for (let k = 0; k < proImgs.length; k++) {
  let li = document.createElement("li");
  li.className = k;
  mcardImagesList.after(li);
}
$($(".mcard-images-overlay ul > *")[j]).addClass("active");

carouselplace("prev");
/*        End or Carousel           */

/////////////////////////////////////
// navigation bottom animations /////
function changePage() {
  let naviNav1Content = $(".navi-nav1").text();
  let naviNav1Span = $(".navi-nav1 span");
  naviNav1Span.text(naviNav1Content === "learn more" ? "back" : "learn more");
  $(".navigator").toggleClass("js");

  $(".article-card").toggleClass("article-come-js");
  $(".main-card").toggleClass("main-go-js");
}

///!  Form manipulations ////////

const form = $(".form-card");
let divInp = $("div input:not(#array)");
divInp = [...Object.values(divInp)];
divInp.shift();

function formOpener() {
  form.addClass("js");
  $("body").addClass("js");
  cartList.length < 1 && cartManipulation();

  !$(".form-brief #" + hashLocation)[0] &&
    !$(".form-brief .brief-add-to-cart")[0] &&
    briefAddToCart();
}

function formCloser() {
  form.removeClass("js");
  $("body").removeClass("js");
}

let requiredField = $("input[required]");
requiredField.each((index, each) => {
  let span = $("<span></span>");
  span.addClass("required-field");
  $(each).parent().before(span);
  span.text("required");
});

///////////////////////////////////
//// header expansion function ////
///////////////////////////////////
let headerAccessed = !1;
function headExpandFoo() {
  $("header").toggleClass("js");
  $(".navi-nav1").parent().toggleClass("remove");
  $(".close-click").toggleClass("js");
  $(".close-click .icon").html($("header a").html())
  showNotify();

  headerAccessed = !0;
}

// Add current product to cart
function briefAddToCart() {
  $(".form-brief").append(
    `<div class="brief-add-to-cart">
      <button class="remove-batc">x</button>
      <div class="image batc">
        <img src='images/products/${currentProduct.images[0]}' />
        <strong> + </strong>
      </div>
      <div class="text">
        <span> Add ${currentProduct.proName}</span>
      </div>
    </div>`
  );

  $(".brief-add-to-cart")[0].scrollIntoView({ behavior: "instant" });
}

////////////////////////////////////
//// ADDING FORM BRIEF TO FORM /////
function formBriefCreation(c) {
  proPrice_TC = [...$(".mcard-price strong").text()];
  proPrice_TC = proPrice_TC.splice(2, Infinity).join("");

  let createDivBrief = $("<div></div>");
  createDivBrief.attr("id", `${c[0]?.id ?? hashLocation}`);
  createDivBrief.addClass("form-brief-content");
  createDivBrief.addClass("--fc");
  createDivBrief.html(
    `<div class="brief-brief opo">
  ${
    ((src) => (src ? "<img src='" + src + "' />" : false))(
      c?.closest(".product").find(".pro-img img").attr("src")
    ) || $(".mcard-images-overlay div").html()
  }"

  <div class="brief-side --fc">
    <h3>${
      c?.closest(".product").find(".pro-name h2").text() ||
      $(".article-content .art-head h1").text()
    }</h3>
    <div>
      <span class="digit">${
        c?.closest(".product").find(".pro-price strong").text() || proPrice_TC
      }</span>
    </div>
    <div class="price-maths">
      <button class="minus">remove</button>
      <div>1</div>
      <button class="plus">+</button>
    </div>
  </div>

  <div class="brief-total">
    <b>Total = &nbsp;Gh&#8373; </b>
    <strong>${
      c
        ?.closest(".product")
        .find(".pro-price strong")
        .text()
        .replace(/\D/g, "") || proPrice_TC.replace(/\D/g, "")
    }</strong>
  </div>
</div>`
  );

  $(".form-brief").append(createDivBrief);
  !c[0]?.id && $(".form-brief-content").addClass("pro-from-none");
}

const naviNav2 = $(".navi-nav2");

////////////////////////////////
// PLUS AND MINUS OPERATIONS ///
////////////////////////////////
function plus_minus(c, param) {
  const overallTotal = $(".overall-total");
  overallTotal.addClass("js");
  let proFromNone = $(".pro-from-none");
  let bulkErrMsg = $(".bulk-err-msg");
  let index = cartList.indexOf(c?.closest(".form-brief-content")?.id);
  let cost =
    c?.closest(".form-brief-content")?.find(".brief-side .digit") ||
    $(`.form-brief #${c?.id} .digit`);

  let unit =
    c?.closest(".form-brief-content")?.find(".brief-side .price-maths div") ||
    $(`.form-brief #${c?.id} .brief-side .price-maths div`);

  let total =
    c?.closest(".form-brief-content")?.find(".brief-total strong") ||
    $(`.form-brief #${c?.id} .brief-total strong`);

  if (param === "plus" && unit.text() < 4) {
    cartList.push(c?.closest(".form-brief-content")?.id || c?.id);
    unit.text(Number(unit.text()) + 1);
    total.text(Number(cost.text().replace(/\D/g, "")) * Number(unit.text()));
    unit.prev().text("-");
    unit.prev().css("font-size: 1.5rem; padding: 0 6px; color: #111");
    if (unit.text() > 3) {
      unit.next("color", "#aaa");
      bulkErrMsg.addClass("js");
      setTimeout(function () {
        bulkErrMsg.removeClass("js");
      }, 9000);
    }
    if (proFromNone) {
      proFromNone.removeClass("pro-from-none");
    }
  } else if (param === "minus") {
    cartList.splice(index, 1);
    if (unit.text() > 1) {
      unit.text(Number(unit.text()) - 1);
      total.text(Number(cost.text().replace(/\D/g, "")) * Number(unit.text()));
      unit.next("color", "#111");
      if (unit.text() < 2) {
        unit.prev().css("color", "#f44");
        unit.prev().text("remove");
      }
    } else if (unit.text() <= 1) {
      c.closest(".form-brief-content").remove();
      if (cartList.length < 1) {
        form.removeClass("js");
      }
    }
  }

  naviNav2.addClass("cart");
  naviNav2.find(":last-child").text(cartList.length);
  let overallAmount = 0;

  $(".brief-total strong").each((index, each) => {
    overallAmount += Number(
      $(each)
        .text()
        .replace(/[^\d.]/gi, "")
    );
  });
  $(".done-js .overall").text(overallAmount);
  setTimeout(() => {
    overallTotal.removeClass("js");
  }, 200);
}

let headerOverlay = $(".header-overlay");
let notifications = $("<div></div>");
notifications.addClass("notifications");
let metaColor = $("<meta />");
metaColor.attr("name", "theme-color");
metaColor.attr("content", "#fdbb00");
metaColor.addClass("you");
function showNotify() {
  $(".notifications")?.remove();
  headerOverlay.removeClass("noti-added");
  $("head .you")?.remove();
}

//! Cart Manipulations
let y = !1;
function cartManipulation(c, plus_minus_Param) {
  c = c?.closest(".product")?.id;
  c = $("#" + c);

  switch (true) {
    case !cartList.includes(c[0]?.id):
      formBriefCreation(c);
      cartList.push(c[0]?.id || hashLocation);
      break;

    case cartList.includes(c[0]?.id):
      plus_minus(c, "plus");
      break;

    default:
      break;
  }
  naviNav2.addClass("cart");
  naviNav2.find(":last-child").text(cartList.length);
  let overallAmount = 0;
  $(".brief-total strong").each((index, each) => {
    overallAmount += Number(
      $(each)
        .text()
        .replace(/[^\d.]/gi, "")
    );
  });
  $(".done-js .overall").text(overallAmount);

  ////// Added to cart notifications
  if (c[0] === undefined) {
    notifications.addClass("js");
    notifications.html(
      `<div> Current product in cart </div> <a href='javascript:void(0)' class='no'>x<a>`
    );
    form.before(notifications);
    setTimeout(() => {
      notifications.removeClass("js");
    }, 3500);
    setTimeout(() => {
      notifications.remove();
    }, 4000);
  } else {
    notifications.html(
      `<span> '${Object.values(productList.products[c[0]?.id].proName).join(
        ""
      )}' <span style="color: #a70">added to cart</span></span>`
    );
    headerOverlay.addClass("noti-added");
    headerOverlay.before(notifications);

    $("head").after(metaColor);
    const s = setTimeout(() => {
      showNotify();
    }, 6000);
    if (y) {
      clearTimeout(s);

      // setTimeout(showNotify,5000);
    }
    y = true;
  }
}
//..................//

function dateFunction() {
  const date = new Date();
  const day = /\d+/.exec(date)[0];
  const month = /(?<=\w+ )\w+/.exec(date)[0];

  $("#session-month li").each((i, each) => {
    if ($(each).text().toLowerCase().includes(month.toLowerCase())) {
      changeDate($(each));
    }
  });

  $("#session-date li").each((i, each) => {
    if (i + 1 == day) {
      changeDate($(each));
    }
  });
}

function changeDate(c) {
  const granny = c.closest("[modal*='session']");

  granny.find("span").text(c.text());
  granny.find("li.js").removeClass("js");
  c.addClass("js");
}

$("input").on("keyup", (e) => {
  const c = e.target;

  formTextCheck($(c));
});

//! Form Validation
const isValid = [];
function formTextCheck(c) {
  const cName = c.attr("name");
  !!(isValid.indexOf(cName) + 1) && isValid.splice(isValid.indexOf(cName), 1);

  function fine() {
    c.parent().addClass("fine");
    !isValid.includes(cName) && isValid.unshift(cName);
  }

  c.parent().removeClass();
  // Expand when not empty
  c.val().length > 0 && c.parent().addClass("js");

  // Trim and remove space from val
  const val =
    c
      .val()
      .trim()
      .match(/[^\s]+/g)
      ?.join("") || "";

  // Name, City, Address
  if (c.prop("type") !== "tel" && val.length > 2) {
    if (c.prop("type") !== "address".trim() && /[\W\d]/.exec(val) === null) {
      fine();
    } else if (c.prop("type").trim() === "address") {
      fine();
    } else {
      c.parent().addClass("bad");
    }
  } else if (
    c.prop("type").trim() === "tel" &&
    val?.length > 9 &&
    !/[^\d+]/g.test(val)
  ) {
    if (/^\+/.test(val) && val.length < 13) {
      // start with + but less than 1#
      c.parent().addClass("bad");
    } else {
      fine();
    }
  } else {
    c.parent().addClass("bad");
  }
}
//....................///

function copiedToCart(c) {
  cartManipulation(c, "plus");
}

function toggleForm(c) {
  let objName = c.attr("modal") || c.attr("close");
  if (c.attr("modal")) {
    c.attr("close", objName);
    c.removeAttr("modal");
  } else {
    c.attr("modal", objName);
    c.removeAttr("close");
  }
}

function proForm(modal, c) {
  $("#" + modal)[0].style.setProperty(
    "--my-height",
    $("#" + modal)[0].scrollHeight + "px"
  );
}

//////////////////////////////////////////////
// Auto modal open and close
let modal;
let modalOpened = [];
function modOpener(c) {
  modal = c.attr("modal");
  $(`[close="${modal}"]`).addClass("js");
  $(`#${modal}`)[0].classList.add("js");

  // Same element to toggle if modal also has dp at attribute  property.
  if (c.is("[dp]")) {
    toggleForm(c);
  }

  const modFunc = /^(\b\w+\b).*(\b\w+\b)/m.exec(modal);
  let funcName = modFunc[1] + modFunc[2][0].toUpperCase() + modFunc[2].slice(1);
  try {
    eval(funcName + "(modal, c)");
  } catch {}

  modalOpened.push(modal);
}
function modCloser(c) {
  modal = c.attr("close");
  $(`#${modal}`)[0]?.classList.remove("js");
  c.removeClass("js");

  if (c.is("[dp]")) {
    toggleForm(c);
  }
}

/////////////////////////////////////////
//// UNIVERSAL DOCUMENT EVENT lISTENER //
$(document).on("click", (e) => {
  let d = e.target;
  d.tagName === "path" && (d = $(d).parent("svg")[0]);
  d.tagName === "svg" &&
    $(d).parent("button")[0] &&
    (d = $(d).parent("button")[0]);

  d.tagName === "svg" &&
    $(d).parent("label")[0] &&
    (d = $(d).parent("label")[0]);

  let c = $(d);

  let clickCount = 0;
  const clickSwitch = () => {
    clickCount += 1;

    switch (true) {
      // close opened modal
      case modalOpened.length > 0 &&
        !c.is(`[id="${modalOpened[0]}"]`) &&
        c.closest(`[id="${modalOpened[0]}"]`).attr("id") !== modalOpened[0]:
        modCloser($(`<span close="${modalOpened[0]}"> </>`));
        modalOpened.shift();
        break;

      case c.is("[modal]"):
        modOpener(c);
        break;

      case c.hasClass("close"):
        modCloser(c);
        break;

      case d.classList.contains("m-west"):
        carouselplace("prev");
        break;
      case d.classList.contains("m-east"):
        carouselplace("next");
        break;

      case d.classList.contains("nl"):
        changePage();
        break;

      /// form Opener and Closing event
      case c.hasClass("fo") || c.hasClass("fo1"):
        formOpener();
        break;
      case c.hasClass("fc"):
        formCloser();
        break;

      /// form date event
      case c.hasClass("fd"):
        dateFunction();
        break;

      case c.hasClass("atd"):
        changeDate(c);
        break;

      case c.is('input:not([type="submit"])'):
        formTextCheck(c);
        break;

      /// Plus and minus inside the brief form information
      case c.hasClass("minus"):
        plus_minus(c, "minus");
        break;
      case c.hasClass("plus"):
        plus_minus(c, "plus");
        break;

      //hamburger move's event
      case d.classList.contains("ho"):
        headExpandFoo();
        break;
      case d.classList.contains("pc"):
        copiedToCart(d);
        break;

      case c.hasClass("po"):
        productOpener(c);
        break;

      case d.classList.contains("no"):
        d.parentElement.remove();
        headerOverlay.removeClass("noti-added");
        break;

      case c.hasClass("batc"):
        cartManipulation();
        c.parent().remove();
        break;

      case c.hasClass("remove-batc"):
        c.parent().remove();
        break;

      case c.hasClass("opo"):
        productOpener($(".header-content #" + c.parent().attr("id") + " img"));
        formCloser();
        break;

      default:
        if (clickCount > 1) {
          break;
        }
        c = c.parent();
        clickSwitch();
    }
  };

  clickSwitch();
});
/*......................................*/

// Form submition
$("form").on("submit", function (e) {
  e.preventDefault();

  const requiredInputs = $("#myForm #name, #myForm #tel, #myForm #location");

  const inputsArr = [];

  requiredInputs.each((index, f) => {
    const c = $(f);

    inputsArr.push(c.prop("name"));

    if (!isValid.includes(c.attr("name"))) {
      formTextCheck(c);
      return;
    }
  });

  isValid.sort().join("") === inputsArr.sort().join("") &&
    $("#myForm")[0].submit();
});
//...................../

////////////////////////////////////
//Scroll event Listener ////////////

window.addEventListener(
  "scroll",
  (scroll) => {
    scroll.preventDefault();
    let fortyMedia = window.matchMedia("(max-height: 800px)");
    if (fortyMedia.matches && window.scrollY > 10) {
      naviNav2.parentElement.addClass("scroll-js");
    } else if (window.scrollY < 2) {
      try {
        naviNav2.parentElement.removeClass("scroll-js");
      } catch {}
    }
  },
  { passive: false }
);

// Add all products to the products page.
// (Header Products)
Object.entries(productList.products).map(([keys, element]) => {
  const div = $("<div></div>");
  div.addClass("product", "po");
  div.attr("id", keys);
  div.html(
    `<div class="product-back"> <div class="pro-img"> <img class="po" src="images/products/${element.images[0]}" alt="${element.proName}"></div> <div class="price-cart"><div class="pro-price"><strong>${element.proPrice}</strong></div><div class="pro-cart pc"><div class="pc">+</div></div></div><div class="pro-name"><h2>${element.proName}</h2></div</div>`
  );

  $(".header-content").append(div);
});
//................................/

const proThingsMeta = $("<meta />");
const proDesMeta = $("<meta />");

function productOpener(c) {
  const clickedId = c.closest(".product")[0].id;

  const mCardElements = [
    ...$(
      ".art-head h1, .mcard-price strong, .mcard-description p, .article-content article p, .vit-material, .vit-brand"
    ),
  ];

  currentProduct = productList.products[clickedId];

  proImgs = Object.values(currentProduct.images);
  const proName = currentProduct.proName;

  for (let i = 0; i < 6; i++) {
    $(mCardElements[i]).html(Object.values(currentProduct)[i]);
  }
  carouselplace("prev");

  $(".mcard-description h1").text($(".art-head h1").text());

  $("header").hasClass("js") && headExpandFoo();
  $(".headerContent .product.js").removeClass("js");
  c.closest(".product").addClass("js");

  window.location.hash = clickedId;
  proThingsMeta.attr("name", "description");
  proDesMeta.attr("name", "description");
  proThingsMeta.attr(
    "content",
    ` product: ${proName}, category: home appliance, price: ${Object.values(
      currentProduct.proPrice
    ).join("")}`
  );
  proDesMeta.attr(
    "content",
    `${Object.values(currentProduct.proBrief).join("")}`
  );
  $("head").append(proThingsMeta);
  $("head").append(proDesMeta);

  artPriceChange();
}

productOpener($(window.location.hash).find("img"));
function artPriceChange() {
  $(".vit-price .ran2").text($(".mcard-price strong").text());

  $(".vit-price .price-delivery").text(
    Number($(".vit-price .ran2").text().replace(/\D/g, "")) + 30
  );
}

let formHead = $(".form-content h2");
let formContent = $(".form-content");

let touchStart = 0;
let touchtop = 0;
let touchEnd = 0;
let touchleft = 0;
document.ontouchstart = function (e) {
  touchStart = e.touches[0].pageX;
};
document.ontouchmove = function (e) {
  if (e.target.classList.contains("--fc")) {
    formContent.style.transform = `translateY(${e.target.offsetTop + 10}%)`;
  }
  touchEnd = e.touches[0].pageY;
  touchleft = e.touches[0].pageX;
};

document.ontouchend = function (e) {
  let d = e.target;
  switch (true) {
    case d.classList.contains("--fc"):
      touchEnd >= 320 ? formCloser() : false;
      formContent.style.transform = "";
      break;

    case d.classList.contains("--fo"):
      touchEnd < 460 ? formOpener() : false;
      touchStart - 120 > touchleft ? changePage() : false;
      break;

    case d.classList.contains("--cp"):
      touchStart + 180 < touchleft ? changePage() : false;
      break;

    case d.classList.contains("ic"):
      if (touchStart + 100 < touchleft) {
        carouselplace("next");
      } else if (touchStart - 100 > touchleft) {
        carouselplace("prev");
      } else if (touchtop + 600 < touchEnd) {
        headExpandFoo();
      }
      break;
  }
};

/// Close Click

/// Usage tutorial
const birds = $(
  ".header-overlay :where(img, strong), .mcard-contents > div, .navi-overlay, .article-content > :where(div, article)"
);

const howManyTimes = localStorage.getItem("no-of-visits");

const noOfVisits =
  howManyTimes === null
    ? "first time"
    : howManyTimes === "first time"
    ? "second time"
    : "third time";

localStorage.setItem("no-of-visits", noOfVisits);
const moreTutText = $(
  "<div class='more-tut-text'><p>Click here for more products. ^</p></div>"
);

const setFlyers = () => {
  birds.toggleClass("fly");
  $("header").toggleClass("fly");
  $(".mcard-contents .mcard-images").after(moreTutText);

  setTimeout(() => {
    $(".close-click").toggleClass("js ct");
    $(".close-click .icon").text("Skip");
  }, 100);
};

const startFlyPromise = new Promise((response) => {
  setTimeout(() => {
    response(!headerAccessed);
  }, 6000);
});

const stopFlyPromise = new Promise((response) => {
  setTimeout(() => {
    response(!headerAccessed);
  }, 9000);
});

function usageTutorial() {
  startFlyPromise.then((res) => {
    res && setFlyers();
  });

  stopFlyPromise.then((res) => {
    if (res) {
      setFlyers();
      moreTutText.remove();
    }
  });
}

window.addEventListener("preloaderDone", () => {
  localStorage.getItem("no-of-visits") !== "third time" && usageTutorial();
});

const observer = new ResizeObserver((e) => {
  moreTutText[0].style.setProperty(
    "--more-y",
    Math.floor(
      moreTutText[0].getBoundingClientRect().y - e[0].contentRect.height
    ) + "px"
  );
});

observer.observe($("header")[0]);
