let mainCard = document.querySelector('.mcard-contents');
let mcardImages = document.querySelectorAll('.mcard-images > *');
let eastWest = document.querySelector('.mcard-images .m-east-west');


// console.log(Array.from(mcardImages).filter(index => index !==1));

eastWest.firstElementChild.addEventListener('click', function(){

  let withoutfirst = [];
  mcardImages.forEach(function(eachElement, index) {
    // let withoutfirst = eachElement.filter((item, index) => index !== 0);

    if(index !== 0){
      withoutfirst.push(eachElement);
      console.log(eachElement.previousElementSibling);
      eachElement.previousElementSibling.appendChild(firstElementChild);
    }

    // console.log(eachElement.previousElementSibling);
  })

  for(let i=0; i < mcardImages.length; i++) {
  }
})

mcardImages.forEach(function(eachMImage) {

});


mcardImages[1-1].style.left = "40%";
mcardImages[1+1].style.left = "60%";