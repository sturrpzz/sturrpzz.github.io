
let nightSound = document.getElementById("nightSound");
let slider = document.querySelector(".slider input");
let img = document.querySelector(".images .window-open");
let dragLine = document.querySelector(".slider .drag-line");
let laptop = document.getElementById("laptop");
let laptopopened = document.getElementById("laptopopened");
let laserbeam = document.getElementById("laserbeam");
let normalcanvas = document.getElementById("normalcanvas");
let star = document.getElementById("star");
let sliderVal;
let windowSound;

let laptopOpen = false;

slider.addEventListener("input",(e) => {newVolume(e.target.value)});

function newVolume(windowSound) {
    sliderVal = slider.value;
    windowSound = "0." + slider.value;
  dragLine.style.left = sliderVal + "%";
  img.style.width = sliderVal + "%";
  console.log(slider.value);
  console.log(windowSound);
    nightSound.volume = windowSound;
    console.log(nightSound.volume);
}

laptop.addEventListener("click",(e) => {laptopChange()});

function laptopChange() {
    if (laptopOpen == false) {
        laptop.style.display = 'none';
        laptopopened.style.display = 'inline-block';
        laserbeam.style.display = "inline-block";
        normalcanvas.style.display = "inline-block";
        star.style.display = "inline-block";
    }
}

laptopopened.addEventListener("click",(e) => {laptopDefault()});

function laptopDefault() {
    if (laptopOpen == false) {
        laptop.style.display = 'inline-block';
        laptopopened.style.display = 'none';
        normalcanvas.style.display = "none";
        laserbeam.style.display = "none";
        star.style.display = "none";
    }
    }
