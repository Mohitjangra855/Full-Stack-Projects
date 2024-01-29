let ul = document.querySelector(".notes");

ul.addEventListener("click", (e)=>{
    console.dir(e.target);
    console.dir(e.target.firstElementChild);
    
    if(e.target.matches("li")){
      e.target.classList.toggle("active");
    }
})