
let mcardOverlay = document.querySelectorAll(".mcard-images-overlay > *");
let mcardLength = mcardOverlay.length;
let estWst = document.querySelectorAll('.m-east-west > *');
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

let articleCard = document.querySelector('.article-card');
let mainCard = document.querySelector('.main-card');
let naviNav2 = document.querySelector('.navi-nav2');
let naviNav1 = document.querySelector('.navi-nav1');
let bottomLeft = document.querySelector(".navi-bottom .left"); 
let bottomRight = document.querySelector(".navi-bottom .right"); 

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
let form = document.querySelector('.form-card');
let divInp = document.querySelectorAll("div input");

// Clonging an first image in carousel then shortcuting it into the form brief 
let formBrief = document.querySelector('.form-brief-content');
let mImgCloned = mcardOverlay[0].firstElementChild.cloneNode(true);
  mImgCloned.className = 'cloned-img';

  formBrief.insertAdjacentElement('afterbegin', mImgCloned);

let dateInput = document.querySelector('.form-date input');
let dateBtn = document.querySelector('a.fd');
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
  if(d.classList.contains('navi-nav1') || d.classList.contains('nav-e'))
    changePage("left");

  else if(d.classList.contains('navi-nav2') || d.classList.contains('nav-e'))
    changePage("right");


/// Opening forms 
  if (d.classList.contains('fo') || d.classList.contains('fo1'))
    form.classList.add('js');

  else if (d.classList.contains("fc"))
    form.classList.remove('js');

  if (d.classList.contains('fd'))
    dateFunction();

  /// input styles 

  divInp.forEach((each, index) => {
    
    if (d.classList.contains('di'))
      d.parentElement.classList.add('js');
    if (each.parentElement.classList.contains('js'))
      each.parentElement.classList.remove('js');

    if (each.value.length >= 1) {
      console.log('shitty sthiity bad bitch', each)
      each.parentElement.className = 'done-js';
    } else if (each.value.length < 1){
      each.parentElement.className = '';
    }
  })

  // while
});