const logo = document.getElementById("logo");
const logoClicked = document.getElementById("logoclicked");
const layer1 = document.getElementByClassName("layer1");

function openSoftware() {
    logo.style.display = "none";
    logoClicked.style.display = "block";
    layer1.style.display = "block";
}
