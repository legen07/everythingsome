let mainCard = document.querySelector('.mcard-contents');
let mcardImages = document.querySelectorAll('.mcard-images-overlay > *');
let eastWest = document.querySelector('.mcard-images .m-east-west');

function estWstFunction(estWstParam){
  let iLenght = mcardImages.length;
  mcardImages.forEach(function(eachElement, index, all) {
    let withoutfirst = [];
    let elem = eachElement;

    // if elements inside mcardImage does not have the index '0' and also children lenght === 0
    if(eachElement.previousElementSibling && estWstParam === 'previous' && eachElement.childElementCount !== 0){

      let withoutfirst = eachElement.splice
      //take the firstElementChild of those elements and put them into their previous parent Sibblings
      // eachElement.previousElementSibling.insertBefore(eachElement.firstElementChild, eachElement.previousElementSibling.firstChild);
      // console.log('true');
    } else if (estWstParam === 'next' && eachElement.childElementCount !== 0) {

      
      // console.log(mcardImages[0].previousElementSibling);
      // eachElement.insertBefore(eachElement.previousElementSibling.firstElementChild, eachElement.firstChild);
    } /*else if (index === iLenght + 1){
      // eastWest.firstElementChild.style.visibility = 'hidden';
      // eastWest.lastElementChild.style.visibility = '';
    } else if (mcardImages[iLenght-2].children.length === 0) {
      eastWest.lastElementChild.style.visibility = 'hidden';
      eastWest.firstElementChild.style.visibility = '';
    }*/
  })
}

// let arr = [1, 2, 3, 4, 5, 6];
// console.log(arr.shift());
/*function estWstFunction() {

  for(let i = 0; i < mcardImages.length; i++) {
    console.log(mcardImages[i=i]);
  }
}

console.log(estWstFunction());

*/

document.addEventListener('click', function (e) {
  
  if(e.target.id === "m-east") {
    estWstFunction('next');
  } else if(e.target.id === 'm-west') {
    estWstFunction('previous');
  }
});


mcardImages[2-1].style.left = "40%";
mcardImages[2+1].style.left = "60%";