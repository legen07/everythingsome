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


let cartList = [];
let form = doc('.form-card');
let divInp = docsAll("div input");
divInp = [...divInp];
divInp.shift();

function formOpener() {
  form.classList.add('js');

  console.log(cartList.length);

  if (cartList.length < 1) {
  
  let createDivBrief = document.createElement('div');
  createDivBrief.classList.add('form-brief-content');
  createDivBrief.innerHTML = `<div class="brief-brief"> ${doc('.mcard-images-overlay div').innerHTML} <div class="brief-side"><h3>${doc('.article-content .art-head h1').textContent}</h3><div><span>₵ </span><span class="digit"> </span></div><div class="price-maths"><button class="minus" style="color: rgb(170, 170, 170);">-</button><div>1</div><button class="plus">+</button></div></div></div><div class="brief-total"> <b>Total = ₵ &nbsp;</b><strong>${doc('.mcard-price strong').textContent}</strong></div>`;

  formBriefContent.insertAdjacentElement('afterbegin', createDivBrief);
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

let requiredField = docsAll('input[required]')
requiredField.forEach( each => {
  let span = document.createElement('span');
  span.className = "required-field";
  each.parentElement.insertAdjacentElement('beforeend', span);
  span.textContent = 'required';
});

//////////////////////////////////////////////////////////////
///////// header expansion function //////////////////////////
//////////////////////////////////////////////////////////////
let navigation = doc('.navi-overlay');
let header = doc('header');

function headExpandFoo() {

  // if (naviNav1.classList.contains('nl')){
    header.classList.toggle('js');

    window.scrollTo( {
      top: -1000, 
      behavior: 'instant'
    })

    setTimeout( function () {
      naviNav2.parentElement.classList.toggle('scroll-js');
    }, 200);
  // }
}


//////////////////////////////////////////////////////////////
////// PLUS AND MINUS FUNCTION  //////////////////////////////
//////////////////////////////////////////////////////////////


function plusAndMinus(pnmParam, d) {
  
  if (cartList.length > 0) {
  
    let digit = d.parentElement.parentElement.querySelector('.brief-side .digit');
    let units = d.parentElement.parentElement.querySelector('.brief-side .price-maths div');
    let total = d.parentElement.parentElement.parentElement.parentElement.querySelector('.brief-total strong');
    let unitNum = 1;
    let bulkErrMsg =  doc('.bulk-err-msg');
    form.appendChild(bulkErrMsg);

  console.log('plus and minus function');
  
  let digitNum = Number(digit.textContent);
  unitNum = Number(units.textContent);
  let totalNum = Number(total.textContent);
  
  if(pnmParam === 'plus' && unitNum < 4) {
    total.textContent = totalNum + digitNum;
    units.textContent = unitNum + 1;
    if (unitNum >= 3) {
      units.nextElementSibling.style.color = '#aaa';
      bulkErrMsg.classList.add('js');
      setTimeout( function() {
        bulkErrMsg.classList.remove('js');
      }, 9000)
    }
    units.previousElementSibling.style.color = '#000';
  } else if (pnmParam === 'minus' && unitNum > 1) {
    if(unitNum <= 2) {
      units.previousElementSibling.style.color = '#aaa';
    }
    units.nextElementSibling.style.color = '#000';
    total.textContent = totalNum - digitNum;
    units.textContent = unitNum - 1;
  }
} else {
  console.log('nothing nothing');
}
}

try{
  if (unitNum < 2) {
    units.previousElementSibling.style.color = '#aaa';
  }
} catch {}




function copiedToCart(d) {
  
  let createDivBrief = document.createElement('div');
  createDivBrief.classList.add('form-brief-content');
  createDivBrief.innerHTML ='<div class="brief-brief"><div class="brief-side"><h3></h3><div><span>₵ </span><span class="digit"> </span></div><div class="price-maths"><button class="minus" style="color: rgb(170, 170, 170);">-</button><div>1</div><button class="plus">+</button></div></div></div><div class="brief-total"> <b>Total = ₵ &nbsp;</b><strong></strong></div>';
  
  function dF(ele) {
    return d.parentElement.parentElement.querySelector(ele);
  }
  function cF(ele) {
    return createDivBrief.querySelector(ele);
  }  


  let proNameContent = dF('.pro-name h2').textContent;

  let clonedProImg = dF('.pro-img img').cloneNode(true);
  cF('.brief-brief').insertAdjacentElement('afterbegin', clonedProImg);
  cF('.brief-brief h3').textContent = proNameContent;
  let priceProduct = dF('.pro-price strong').textContent.slice(1, 6);
  cF('.brief-brief span.digit').textContent = priceProduct;
  cF('.brief-total strong').textContent = priceProduct;

  if ( Number(doc('.brief-brief .digit')) > 3) {
      bulkErrMsg.classList.add('js');
      setTimeout( function() {
        bulkErrMsg.classList.remove('js');
      }, 9000);
      return;
  } else if (!cartList.includes(proNameContent)) {
    doc('.form-brief').insertAdjacentElement("afterbegin", createDivBrief);
  } else {
    docsAll('.form-brief').forEach(each => {
      if (each.querySelector('.brief-brief h3').textContent === proNameContent) {
        plusAndMinus('plus', doc('.brief-brief .plus'));
      }
    })
  }
  cartList.unshift(proNameContent);


  naviNav2.classList.add('cart'); 
  naviNav2.lastElementChild.textContent =  cartList.length;
}















/////////////////////////////////////////////////
///// Click event Listener //////////////////////
document.addEventListener( 'click', e =>{
  let d = e.target;

  // MAIN PAGE IMAGES MANUPULATIONS EVENTS
  if(d.classList.contains('m-east') )
    estWstFunction("east");

  else if(d.classList.contains('m-west'))
    estWstFunction("west");


// bottom navigation event and animation
  if(d.classList.contains('nl'))
    changePage("left");

  // else if(d.classList.contains('nr'))
    // changePage("right");


/// Opening forms 
  if (d.classList.contains('fo') || d.classList.contains('fo1'))
    formOpener();

  else if (d.classList.contains("fc"))
    form.classList.remove('js');

  if (d.classList.contains('fd'))
    dateFunction();

  /// Plus and minus inside the briefed form information. 
  if (d.classList.contains('minus')) {
    plusAndMinus('minus', d);
  } else if (d.classList.contains('plus')) {
    plusAndMinus('plus', d);
  }


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

  ///////////////////////////////////////////////
  //hahmburger move's event
  if(d.classList.contains('ho'))
    headExpandFoo();

  if(d.classList.contains('pc')) 
    copiedToCart(d);

  if(d.classList.contains('po')) {
    productOpener(d);
  }
});
////// CLICK EVENTS END HERE 
////////////////////////////////////////////////////////


////////////////////////////////////
//Scroll event Listener ////////////

window.addEventListener('scroll', scrol => {
  let fortyMedia = window.matchMedia("(max-height: 700px)");
  if (fortyMedia.matches && window.scrollY > 100) {
    naviNav2.parentElement.classList.add('scroll-js');
  } else if (window.scrollY < 110) {
    try{
      naviNav2.parentElement.classList.remove('scroll-js');
    }  catch{}
  }
})


import {productList} from './module.js';

// console.log(productList.products);

Object.entries(productList.products).map( ([keys, element]) => {
  let name = element.proName;
  let price = element.proPrice;
  let brief = element.proBrief;
  let images = element.images;

  let div = document.createElement('div');
  div.classList.add('product', 'po');
  div.setAttribute('id', keys);
  div.innerHTML = `<div class="product-back"> <div class="pro-img"> <img class="po" src="images/products/${images[0]}"><div class="pro-name"><h2>${name}</h2></div></div> <div class="pro-price"><strong>${price}</strong></div><div class="pro-cart pc"><div class="pc">+</div></div></div>`;

  doc('.header-content').appendChild(div);
});


function productOpener(d) {
  let clickedProduct = d.parentElement.parentElement.parentElement;
  let clickedId = clickedProduct.getAttribute('id');

  let _PPC = productList.products[clickedId];

  let mCardElements = [...docsAll(' .art-head h1, .mcard-price strong, .mcard-description p, .article-content article p, .vit-material')];

  for(let i = 0; i < _PPC.images.length; i++) {
    let eachEle = document.createElement('img');
    let eachPPC = _PPC.images[i];
    eachEle.setAttribute('src', `./images/products/${eachPPC}`);
    mcardOverlay[i].replaceChildren(eachEle);

    mCardElements[i].innerHTML = Object.values(_PPC)[i];
    console.log(Object.values(_PPC)[i]);
    // console.log(mCardElements[i]);
  }

  headExpandFoo();
}