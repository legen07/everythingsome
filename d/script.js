let cartList = [];


function doc(param) {
  return document.querySelector(param);
}
function docs(param) {
  return document.querySelectorAll(param);
}

let mcardOverlay = docs('.mcard-images-overlay > *');
let estWst = docs('.m-east-west > *');
mcardOverlay[0].classList = 'index-js';

function estWstFunction(estWstParam) {
  for(let i = 0; i< mcardOverlay.length; i++){
    let indexClass = mcardOverlay[i].className === 'index-js';


    if (indexClass) {

      try{
        if(mcardOverlay[i].previousElementSibling.previousElementSibling === null) {
          estWst[0].classList.toggle('hidden-js');
        } else if (mcardOverlay[i].nextElementSibling.nextElementSibling === null) {
          estWst[1].classList.toggle('hidden-js');
        }
      } catch {};

    }

    if(indexClass && estWstParam === "east") {
      mcardOverlay[i].className = '';
      mcardOverlay[i].previousElementSibling.className = 'index-js';
      estWst[1].classList.add('hidden-js');

      return;
    }
    else if(indexClass && estWstParam === "west") {
      mcardOverlay[i].className = '';
      mcardOverlay[i].nextElementSibling.className = 'index-js';
      estWst[0].classList.add('hidden-js');
      return;
    } 
  }
};

estWst[1].classList.add('hidden-js');


//////////////////////////////////////////////////////////////////
// navigation bottom animations //////////////////////////////////
//////////////////////////////////////////////////////////////////

let articleCard = doc('.article-card');
let mainCard = doc('.main-card');
let naviNav2 = doc('.navi-nav2');
let naviNav1 = doc('.navi-nav1');
let bottomLeft = doc(".navi-bottom .left"); 
let bottomRight = doc(".navi-bottom .right"); 

function changePage(pageParam) {
  if(pageParam === "left" && naviNav1.firstElementChild.innerHTML === 'learn more'){
    articleCard.classList.toggle("article-come-js");
    mainCard.classList.toggle("main-go-js");
    naviNav1.parentElement.className = '';
    naviNav1.parentElement.classList.add("navi-overlay", "js");
    naviNav1.classList.toggle("js");
    naviNav2.classList.toggle("js");
    naviNav1.firstElementChild.innerHTML = 'back';
    bottomLeft.classList.remove('js');
    bottomRight.classList.add('js');

    setTimeout( () => {
      naviNav1.parentElement.insertAdjacentElement("afterbegin", naviNav1);
    }, 600)
    
  } else if(pageParam === "left" && naviNav1.firstElementChild.innerHTML === 'back'){
    articleCard.classList.toggle("article-come-js");
    mainCard.classList.toggle("main-go-js");
    naviNav1.parentElement.className = '';
    naviNav1.parentElement.classList.add("navi-overlay", "go-js");
    naviNav1.classList.toggle("js");
    naviNav2.classList.toggle("js");
    naviNav1.firstElementChild.innerHTML = 'learn more';
    bottomLeft.classList.add('js');
    bottomRight.classList.remove('js');
    
    setTimeout( () => {
      naviNav1.parentElement.insertAdjacentElement("beforeend", naviNav1);
    }, 600);
  }
}

bottomLeft.classList.toggle('js');


///////////////////////////////////////////////////////////////////////
// Form manupulations//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////



let form = doc('.form-card');
let divInp = docs("div input");
divInp = [...divInp];
divInp.shift();
let formBrief = doc('.form-brief');

let proPrice_TC = [...doc('.mcard-price strong').textContent];
proPrice_TC = proPrice_TC.splice(2, Infinity).join('');

function formOpener() {
  form.classList.add('js');

  if (cartList.length < 1) {
  
    let createDivBrief = document.createElement('div');
    createDivBrief.classList.add('form-brief-content', 'pro-from-none');
    createDivBrief.innerHTML = `<div class="brief-brief"> ${doc('.mcard-images-overlay div').innerHTML} <div class="brief-side"><h3>${doc('.article-content .art-head h1').textContent}</h3><div><span class="digit">${proPrice_TC}</span></div><div class="price-maths"><button class='minus'>remove</button><div>1</div><button class="plus">+</button></div></div></div><div class="brief-total"> <b>Total = &nbsp;</b><strong>${proPrice_TC}</strong></div>`;

    formBrief.appendChild(createDivBrief);
    cartList.push(doc('.article-content .art-head h1').textContent);
  }
}




let dateInput = doc('.form-date input');
let dateBtn = doc('a.fd');
function dateFunction () {
  let todayDate = Date();
  let slicedDate = todayDate.slice(0, 11);
  if(dateBtn.textContent === "today") {
    dateInput.toggleAttribute("type");
    dateInput.setAttribute('placeholder', slicedDate)
    dateBtn.textContent = 'select date';
    dateInput.setAttribute('disabled', 'true')
  }
  else if (dateBtn.textContent === "select date") {
    dateInput.toggleAttribute("placeholder");
    dateBtn.textContent = 'today';
    dateInput.setAttribute('type', 'date')
    dateInput.removeAttribute('disabled')
  }
}

let requiredField = docs('input[required]')
requiredField.forEach( each => {
  let span = document.createElement('span');
  span.className = "required-field";
  each.parentElement.insertAdjacentElement('beforeend', span);
  span.textContent = 'required';
});

//////////////////////////////////////////////////////////////
///////// header expansion function /////////////////////////
//////////////////////////////////////////////////////////////
let header = doc('header');

function headExpandFoo() {

  window.scrollTo( {
    top: -1000,
    behavior: 'instant'
  })

  setTimeout( function () {
    header.classList.toggle('js');
    naviNav1.parentElement.classList.toggle('remove');
    document.body.classList.toggle('js');
  }, 200);
}


//////////////////////////////////////////////////////////////
////// PLUS AND MINUS FUNCTION  //////////////////////////////
//////////////////////////////////////////////////////////////

function plusAndMinus(pnmParam, d) {
  let fourParents = d.parentElement.parentElement.parentElement.parentElement;
  let index = cartList.findIndex(item => item = fourParents.querySelector('.brief-brief h3').textContent);
  if (cartList.length > 0) {
    
    let digit = d.parentElement.parentElement.querySelector('.brief-side .digit');
    let units = d.parentElement.parentElement.querySelector('.brief-side .price-maths div');
    let total = fourParents.querySelector('.brief-total strong');
    let unitNum = 1;
    let bulkErrMsg =  doc('.bulk-err-msg');
    form.appendChild(bulkErrMsg);
    
    let digitNum = Number(digit.textContent.replace(/\D/g, ''));
    unitNum = Number(units.textContent);
    let totalNum = Number(total.textContent.replace(/\D/g, ''));
    
    
    if(pnmParam === 'plus' && unitNum < 4) {
      total.textContent = `₵ ${totalNum + digitNum}`;
      units.textContent = unitNum + 1;
      units.previousElementSibling.textContent = '-';
      units.previousElementSibling.style.cssText = 'font-size: 1.5rem; padding: 0 6px';
      if (unitNum >= 3) {
        units.nextElementSibling.style.color = '#aaa';
        bulkErrMsg.classList.add('js');
        setTimeout( function() {
          bulkErrMsg.classList.remove('js');
        }, 9000)
      }
      cartList.unshift(fourParents.querySelector('.brief-brief h3').textContent)
      units.previousElementSibling.style.color = '#000';
    } else if (pnmParam === 'minus' && unitNum > 1) {
      // removeFromCart();
      units.nextElementSibling.style.color = '#000';
      total.textContent = totalNum - digitNum;
      units.textContent = unitNum - 1;
      if (unitNum <= 2) {
        units.previousElementSibling.style.cssText ='#f44';
        units.previousElementSibling.textContent = 'remove';
      }

      cartList.splice(index, 1)

    } else if (unitNum <= 1) {
      fourParents.remove();
      cartList.splice(index, 1)

      if (cartList.length < 1) {
        form.classList.remove('js');
      }
    }
  }
}

function copiedToCart(d) {
  
  function dF(ele) {
    return d.parentElement.parentElement.querySelector(ele);
  }
  let eachPrice_tC = Number(dF('.pro-price strong').textContent.replace(/\D/g, ''));
  let proNameContent = dF('.pro-name h2').textContent;
  let createDivBrief = document.createElement('div');
  createDivBrief.classList.add('form-brief-content');
  createDivBrief.innerHTML =`<div class="brief-brief">${dF('.pro-img img').outerHTML}<div class="brief-side"><h3>${proNameContent}</h3><div><span> </span><span class="digit">${eachPrice_tC}</span></div><div class="price-maths"><button class="minus">remove</button><div>1</div><button class="plus">+</button></div></div></div><div class="brief-total"> <b>Total = &nbsp;</b><strong>${eachPrice_tC}</strong></div>`;

  docs('.form-brief-content').forEach(each => {

    if (each.querySelector('.brief-side h3').textContent === proNameContent) {
      plusAndMinus('plus', doc('.brief-brief .plus'));
    }
  })

  if (!cartList.includes(proNameContent)) {
    doc('.form-brief').insertAdjacentElement("afterbegin", createDivBrief);
    cartList.unshift(proNameContent);
  }

  naviNav2.classList.add('cart');
  naviNav2.lastElementChild.textContent =  cartList.length;
}






/////////////////////////////////////////////////
///// Click event Listener //////////////////////
document.addEventListener( 'click', e =>{
  let d = e.target;

  switch (true) {
    case d.classList.contains("m-west"):
      estWstFunction("west");
      break
    case d.classList.contains("m-east"):
      estWstFunction('east');
      break

    case d.classList.contains("nl"):
      changePage("left");
      break

    /// form Opener and Closing event
    case d.classList.contains("fo") || d.classList.contains("fo1"):
      formOpener();
      break;
    case d.classList.contains("fc"):
      if (doc('.pro-from-none')) {
        cartList.shift();
        doc('.pro-from-none').remove();
      }
      form.classList.remove('js');
      break

    /// form date event
    case d.classList.contains("fd"):
      dateFunction();
      break
    
    /// Plus and minus inside the brief form information
    case d.classList.contains("minus"):
      plusAndMinus("minus", d);
      break
    case d.classList.contains("plus"):
      plusAndMinus("plus", d);
      break

      ///////////////////////////////////////////////
      //hahmburger move's event
    case d.classList.contains("ho"):
      headExpandFoo();
      break
    case d.classList.contains("pc"):
      copiedToCart(d);
      break

    case d.classList.contains("po"):
      productOpener(d);
      break


    default: 
      break;
  }
  ///////////////////////////////////////////////
  /// input styles 
  divInp.forEach((each, index) => {
    
    if (d.classList.contains('di'))
      d.parentElement.classList.add('js');
    if (each.parentElement.classList.contains('js'))
      each.parentElement.classList.remove('js');

    if (each.value.length >= 1) {
      each.parentElement.className = 'done-js';
    } else if (each.value.length < 1){
      each.parentElement.className = '';
    }
  })

});
////// CLICK EVENTS END HERE 
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


////////////////////////////////////
//Scroll event Listener ////////////

window.addEventListener('scroll', scrol => {
  let fortyMedia = window.matchMedia("(max-height: 700px)");
  if (fortyMedia.matches && window.scrollY > 1) {
    naviNav2.parentElement.classList.add('scroll-js');
  } else if (window.scrollY < 2) {
    try{
      naviNav2.parentElement.classList.remove('scroll-js');
    }  catch{}
  }
})


import {productList} from './module.js';

Object.entries(productList.products).map( ([keys, element]) => {
  let name = element.proName;
  let price = element.proPrice;
  let brief = element.proBrief;
  let images = element.images;

  let div = document.createElement('d');
  div.classList.add('product', 'po');
  div.setAttribute('id', keys);
  div.innerHTML = `<div class="product-back"> <div class="pro-img"> <img class="po" src="images/products/${images[0]}"><div class="pro-name"><h2>${name}</h2></div></div> <div class="pro-price"><strong>${price}</strong></div><div class="pro-cart pc"><div class="pc">+</div></div></div>`;
  
  doc('.header-content').appendChild(div);
});

let product = docs(".header-content .product");


function productOpener(d) {
  let clickedProduct = d.parentElement.parentElement.parentElement;
  let clickedId = clickedProduct.getAttribute('id');

  let _PPC = productList.products[clickedId];
  
  let mCardElements = [...docs('.art-head h1, .mcard-price strong, .mcard-description p, .article-content article p, .vit-material, .vit-brand')];
  
  for(let i = 0; i < 6; i++) {
    let eachEle = document.createElement('img');
    let eachPPC = _PPC.images[i];
    eachEle.setAttribute('src', `./images/products/${eachPPC}`);
    if (mcardOverlay[i] !==  undefined)
      mcardOverlay[i].replaceChildren(eachEle);

    mCardElements[i].innerHTML = Object.values(_PPC)[i];
  }
  let ghc = [...doc('.mcard-price strong').textContent]
  ghc.unshift('Gh');
  doc('.mcard-price strong').textContent = ghc.join('');
  window.location.hash = clickedId;

  doc('.mcard-description h1').textContent = (doc('.art-head h1').textContent);
  headExpandFoo();
  artPricechange();

  product.forEach(each => {
    if (each.classList.contains('js')) {
      each.classList.remove('js');
    }
  });
  clickedProduct.classList.add('js');
}

//////////////////////////////////////////////////////////////////////
function artPricechange() {
  doc('.vit-price .ran2').textContent = ` ${doc('.mcard-price strong').textContent.replace(/Gh/g, '')}`;

  doc('.vit-price span').textContent = doc('.vit-price span').textContent.replace(/\b\d+\b/g, Number(doc('.vit-price .ran2').textContent.replace(/\D/g, '')) + 30);
}


/////////////////////////////////////////////////////////////////////////////////////////
////////// THE DOINGS WHEN THE PAGE IS LOADED ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
window.onload = function() {
  switch (true) {
    case window.location.hash === "":
      window.location.hash = 'blender';
      break

    default: 
      break;
  }

  productOpener(doc((window.location.hash)).querySelector('img'));
  setTimeout(function() {headExpandFoo()}, 600);

  artPricechange();
}