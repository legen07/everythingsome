
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
      } catch {}

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
    naviNav1.parentElement.classList.replace("*", "navi-overlay js");
    naviNav1.classList.toggle("js");
    naviNav2.classList.toggle("js");
    naviNav1.firstElementChild.innerHTML = 'back';
    bottomRight.classList.toggle('js');

    setTimeout( () => {
      naviNav1.parentElement.insertAdjacentElement("afterbegin", naviNav1);
    }, 700)
  } else if(pageParam === "left" && naviNav1.firstElementChild.innerHTML === 'back'){
    naviNav1.parentElement.classList.replace("*", "navi-overlay go-js" );
    // naviNav1.classList.toggle("js");
    // naviNav2.classList.toggle("js");
    naviNav1.firstElementChild.innerHTML = 'learn more';
    bottomRight.classList.toggle('js');

    setTimeout( () => {
      naviNav1.parentElement.insertAdjacentElement("beforeend", naviNav1);
    }, 700)
  }
}









// parent to get to kids. 

document.addEventListener( 'click', e =>{
  let d = e.target;

  // console.log(pToKid(e.target.className));
  if(d.classList.contains('m-east')) {
    estWstFunction("east");
  } else if(d.classList.contains('m-west')) {
    estWstFunction("west");
  }
  
  else if(d.classList.contains('navi-nav1')) {
    changePage("left");
  } else if(d.classList.contains('navi-nav2')) {
    console.log('ohh my goodness');
    changePage("right");
  }
});
console.log(naviNav1.firstElementChild.innerHTML);