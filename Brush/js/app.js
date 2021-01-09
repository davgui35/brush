const menuBurger = document.querySelector('.menu-burger');
const overlay = document.querySelector('.overlay');
const bar1 = document.querySelector('.bar1');
const bar2 = document.querySelector('.bar2');
const bar3 = document.querySelector('.bar3');
overlay.style.display = "none";

const navElements = document.querySelectorAll('nav ul li a');

navElements.forEach(element =>{
  element.addEventListener('click', ()=>{
    deleteClicked();
  })
})
menuBurger.addEventListener('click', ()=>{
  if(overlay.style.display === "none") {
    addClicked()
  }else{
    deleteClicked();
  }
})

// FUNCTIONS

function addClicked(){
  bar1.classList.add('clicked-bar1');
    bar2.classList.add('clicked-bar2');
    bar3.classList.add('clicked-bar3');
    overlay.style.display = "block";
}

function deleteClicked(){
  bar1.classList.remove('clicked-bar1');
  bar2.classList.remove('clicked-bar2');
  bar3.classList.remove('clicked-bar3');
  overlay.style.display = "none";
}



