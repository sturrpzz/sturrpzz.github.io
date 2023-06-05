// Canvas properties
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Brush size slider
let strokeWidthSlider = document.getElementById("strokeWidthSlider");
let resetCanvas= document.getElementById("resetCanvas");


//Properties of default brush that is activated automatically when the website is opened.
let colour = "#ffffff";
let strokeWidth = 20;
ctx.strokeStyle = colour;
ctx.lineWidth = strokeWidth;
ctx.lineCap = "round"; //To make ends of line rounded.
ctx.lineJoin = "round"; //To round off the corners of the line drawn, to create a smooth brush stroke.

let drawing = false;
let brush = 'default';

let lastX = 0;
let lastY = 0;
let direction = true;
let hue = 0;

//Properties for brush size slider
strokeWidthSlider.addEventListener("input",(e) => {newBrushsize(e.target.value)});

function newBrushsize(newStrokewidth) {
  ctx.lineWidth = newStrokewidth;
}

function draw(e) {
  if (!drawing) {
    return;
  } //Stop the function from drawing when mouse is not held down.
  else {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  //Starts at lastX, lastY, moves to e.offsetX, e.offsetY. 
  }

  if (brush == 'hue') {
    ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`; //Stroke changes color as it goes, with saturation of 100% and lightness at 60% for vibrance.
    hue++; //As the stroke goes, hue degree increments by 1.
    if (hue >= 360) {hue = 0;} //When hue degree reaches 360, it resets back to 0. This creates a smooth loop and transition of color throughout the stroke.
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) { //Limit size of line from 1 to 100.
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth--;
    }
    else {
        ctx.lineWidth++;
    }
  }
  else {
      newBrushsize(strokeWidthSlider.value); //So that the brush size is the value on the slider, not the value of the last point of the stroke of hue brush.
  }

 }

 // Brush options

function selectDefault() {
    ctx.strokeStyle = colour;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    brush = 'default';
}

function selectRandom() {
    ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`; //The color of this brush is the last color used in hue brush.
    ctx.lineCap = "round"; 
    ctx.lineJoin = "round";
    brush = 'random';
}

function selectHue() {
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    // ctx.globalCompositeOperation = 'multiply';
    // I wanted to use globalCompositeOperation to create the transparent effect, but it would malfunction the eraser brush for some reason.
    brush = 'hue';
}


//Reset canvas button

function selectReset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; 
});

canvas.addEventListener('mousemove', function() {
    //This is used instead of clearRect because clearRect would make the circles disappear but the branches still spreads out after they disappear.
    ctx.fillStyle = 'rgba(0,0,0,0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});
  
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('mousout', () => drawing = false);
    