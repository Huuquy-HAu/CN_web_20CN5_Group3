let ex2 = document.querySelector('.ex2-header');

let handleHide = () => { ex2.setAttribute("style", "display: none;")}


let handleShow = () => { ex2.setAttribute("style", "display: block;")}

let handleFadeOut = () => { 
    ex2.classList.add("hidden") 
    ex2.classList.add("fade-out")
}
let handleFadeIn = () => {
    ex2.classList.remove("hidden")
    ex2.classList.remove("fade-out")
    ex2.classList.add("fade-in");

    ex2.addEventListener("transitionend", function () {
        element.classList.remove("fade-in");
    });
}

let handleChangeColorRed = () => {ex2.setAttribute("style", "color: red;")}

let handleChangeColorBlue = () => {ex2.setAttribute("style", "color: blue;")}

let handleDoubleClick = () => {alert("Dương Hữu Quý - 20CN5 - 2055010222")}
