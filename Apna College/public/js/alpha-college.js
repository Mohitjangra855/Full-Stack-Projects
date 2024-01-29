let ul = document.querySelector(".dr-show");

ul.addEventListener("click", (e) => {
    let li = e.target.closest('li'); // Find the closest parent li element

   li.classList.toggle("show");

});
let ul2 = document.querySelector(".dr-show2");

ul2.addEventListener("click", (e) => {
    let li = e.target.closest('li'); // Find the closest parent li element

   li.classList.toggle("show");

});
